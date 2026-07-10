import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");
const TO_EMAIL = "grespurga@gmail.com";

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; "error-codes"?: string[] }> {
  if (!RECAPTCHA_SECRET_KEY) throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  return await res.json();
}

// In-memory sliding-window rate limiter (per edge instance).
const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;
const RL_LONG_WINDOW_MS = 60 * 60_000;
const RL_LONG_MAX = 20;
const rlHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const hits = (rlHits.get(ip) || []).filter((t) => now - t < RL_LONG_WINDOW_MS);
  hits.push(now);
  rlHits.set(ip, hits);
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) {
      const kept = v.filter((t) => now - t < RL_LONG_WINDOW_MS);
      if (kept.length === 0) rlHits.delete(k);
      else rlHits.set(k, kept);
    }
  }
  const shortHits = hits.filter((t) => now - t < RL_WINDOW_MS).length;
  if (shortHits > RL_MAX) return { ok: false, retryAfter: Math.ceil(RL_WINDOW_MS / 1000) };
  if (hits.length > RL_LONG_MAX) return { ok: false, retryAfter: Math.ceil(RL_LONG_WINDOW_MS / 1000) };
  return { ok: true };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const ip = getClientIp(req);
    const rl = rateLimit(ip);
    if (!rl.ok) {
      console.warn("Rate limit exceeded for IP:", ip);
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": String(rl.retryAfter ?? 60) } },
      );
    }

    const { name, email, phone, message, bookingDate, bookingHour, language, recaptchaToken, website } = await req.json();

    // Honeypot: bots fill hidden fields. Silently succeed without booking or sending.
    if (typeof website === "string" && website.trim() !== "") {
      console.warn("Honeypot triggered for IP:", ip);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    if (!recaptchaToken) throw new Error("reCAPTCHA verification required");
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    console.log("reCAPTCHA result:", JSON.stringify(recaptchaResult));
    const recaptchaErrors = recaptchaResult["error-codes"] || [];
    const browserOnlyError = recaptchaErrors.length === 1 && recaptchaErrors[0] === "browser-error";
    if (!recaptchaResult.success && !browserOnlyError) {
      console.error("reCAPTCHA failed - error-codes:", JSON.stringify(recaptchaErrors));
      throw new Error(`reCAPTCHA verification failed: ${JSON.stringify(recaptchaErrors)}`);
    }
    if (browserOnlyError) {
      console.warn("reCAPTCHA browser-error ignored for booking submission");
    }
    if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) throw new Error("reCAPTCHA score too low");

    // Validate
    if (!name || typeof name !== "string" || !name.trim() || name.trim().length > 200) throw new Error("Invalid name");
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new Error("Invalid email");
    if (phone && (typeof phone !== "string" || !/^\+?\d{7,15}$/.test(phone.trim()))) throw new Error("Invalid phone");
    if (message && (typeof message !== "string" || message.length > 2000)) throw new Error("Invalid message");
    if (typeof bookingDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) throw new Error("Invalid date");
    if (typeof bookingHour !== "number" || bookingHour < 10 || bookingHour > 18) throw new Error("Invalid hour");

    // Earliest allowed: day after tomorrow (Athens time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 2);
    const requested = new Date(bookingDate + "T00:00:00");
    if (requested < minDate) throw new Error("Booking must be at least 2 days in advance");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert (UNIQUE constraint blocks duplicate slots)
    const { error: insertErr } = await supabase.from("bookings").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      booking_date: bookingDate,
      booking_hour: bookingHour,
      language: language || null,
    });

    if (insertErr) {
      // Unique violation
      if ((insertErr as any).code === "23505") {
        return new Response(JSON.stringify({ success: false, error: "slot_taken" }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw insertErr;
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : "";
    const safeMessage = message ? escapeHtml(message.trim()) : "";
    const slotLabel = `${bookingDate} ${String(bookingHour).padStart(2, "0")}:00 – ${String(bookingHour + 1).padStart(2, "0")}:00`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #D4940C; margin-bottom: 12px;">📅 New Meeting Booking</h2>
        <p style="font-size: 18px; font-weight: bold; background: #fff3d6; padding: 12px 16px; border-radius: 8px; color: #333;">
          ${slotLabel} (Europe/Athens)
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Name</td><td style="padding: 8px 0;">${safeName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          ${safePhone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Language</td><td style="padding: 8px 0;">${escapeHtml(language || "—")}</td></tr>
        </table>
        ${safeMessage ? `<div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="font-weight: bold; color: #666; margin: 0 0 8px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>` : ""}
        <p style="margin-top: 24px; font-size: 12px; color: #999;">Sent from DevCraft booking form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "DevCraft <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email.trim(),
        subject: `[DevCraft] Meeting booked: ${slotLabel} — ${safeName}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("Resend API error:", JSON.stringify(data));
      // Booking is saved; email failure is non-blocking
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Booking error:", error);
    return new Response(JSON.stringify({ success: false, error: "Booking failed. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
