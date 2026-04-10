/**
 * DNS RECORDS FOR devcraft.gr (add at domain registrar - Papaki)
 * ──────────────────────────────────────────────────────────────
 * 1. SPF — TXT record on devcraft.gr:
 *    v=spf1 include:amazonses.com ~all
 *
 * 2. DKIM — 3 CNAME records (provided by Resend after domain verification):
 *    resend._domainkey.devcraft.gr → [value from Resend dashboard]
 *    s1._domainkey.devcraft.gr     → [value from Resend dashboard]
 *    s2._domainkey.devcraft.gr     → [value from Resend dashboard]
 *
 * 3. DMARC — TXT record on _dmarc.devcraft.gr:
 *    v=DMARC1; p=none; rua=mailto:contact@devcraft.gr
 *
 * After verifying domain in Resend, update "from" below:
 *    from: "DevCraft <info@devcraft.gr>"
 * ──────────────────────────────────────────────────────────────
 */
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

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  return await res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, phone, message, recaptchaToken } = await req.json();

    // Verify reCAPTCHA v3
    if (!recaptchaToken) {
      throw new Error("reCAPTCHA verification required");
    }
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    console.log("reCAPTCHA result:", JSON.stringify(recaptchaResult));
    if (!recaptchaResult.success) {
      console.error("reCAPTCHA failed - error-codes:", JSON.stringify(recaptchaResult["error-codes"]));
      throw new Error(`reCAPTCHA verification failed: ${JSON.stringify(recaptchaResult["error-codes"] || [])}`);
    }
    if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) {
      console.error("reCAPTCHA low score:", recaptchaResult.score);
      throw new Error("reCAPTCHA score too low");
    }

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
      throw new Error("Invalid name");
    }
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.trim().length > 1000) {
      throw new Error("Invalid message");
    }
    const hasEmail = email && typeof email === "string" && email.trim().length > 0;
    const hasPhone = phone && typeof phone === "string" && phone.trim().length > 0;
    if (!hasEmail && !hasPhone) {
      throw new Error("Email or phone required");
    }
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error("Invalid email format");
    }
    if (hasPhone && !/^\+?\d{7,15}$/.test(phone.trim())) {
      throw new Error("Invalid phone format");
    }

    // HTML-escape user inputs to prevent injection
    const escapeHtml = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    const safeName = escapeHtml(name.trim());
    const safeEmail = hasEmail ? escapeHtml(email.trim()) : "";
    const safePhone = hasPhone ? escapeHtml(phone.trim()) : "";
    const safeMessage = escapeHtml(message.trim());

    const contactInfo = [
      hasEmail ? `Email: ${safeEmail}` : "",
      hasPhone ? `Phone: ${safePhone}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #D4940C; margin-bottom: 24px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Name</td><td style="padding: 8px 0;">${safeName}</td></tr>
          ${hasEmail ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>` : ""}
          ${hasPhone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <p style="font-weight: bold; color: #666; margin: 0 0 8px;">Message</p>
          <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">Sent from DevCraft website contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DevCraft <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: hasEmail ? email.trim() : undefined,
        subject: `[DevCraft] New inquiry from ${safeName}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    // Save to database
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: hasEmail ? email.trim() : null,
        phone: hasPhone ? phone.trim() : null,
        message: message.trim(),
      });
    } catch (dbErr) {
      console.error("DB insert error (non-blocking):", dbErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
