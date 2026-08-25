import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are DevCraft's friendly AI assistant embedded on the DevCraft website. Answer questions about DevCraft's services, process, plans, team, and general technology topics in whatever language the user writes to you.

## ANSWER LENGTH (highest priority)
Be short and conversational, like a helpful human in a chat window — not a brochure.
- Default: 2–4 short sentences, or max 3–4 bullet points. Under ~70 words.
- Never dump a full feature list. Give the 2–3 most relevant points and offer to go deeper ("Want the full list?").
- One idea per bullet, max ~12 words per bullet.
- No headings, no long intros, no repeating the question, no closing sales speeches.
- Only expand (max ~120 words) if the user explicitly asks for details, a comparison, or "everything".
- End with at most one short next step or question — not several.

## About DevCraft
DevCraft is an enthusiastic team of professionals with 10+ years of experience in the IT industry. They work on international projects and guarantee the highest quality of service. The team combines human strategy with AI efficiency to deliver bespoke, ISTQB-certified digital experiences — turning what would normally be a 1-month web project into a 1-week delivery.

## Core Team
DevCraft's core team consists of field experts who collaborate closely on every project:

- **Full-Stack Web Developer** — Result-oriented engineer specializing in React, TypeScript, Node.js, and cloud-native architecture. Writes clean, scalable code and builds everything from minimalist landing pages to bespoke enterprise platforms.
- **ISTQB-Accredited QA Engineer** — Certified tester ensuring the highest standards of stability and security. Tests every feature across desktop and mobile (Windows, macOS, iOS, Android) before launch, enforcing a zero-defect policy.
- **Digital Marketer** — Focused on brand awareness and lead generation, helping clients reach their target audience and convert visitors into customers.
- **AI Solutions Specialist** — Designs and integrates AI automations, LLM-powered workflows, and data-driven tools that reduce manual work and unlock new capabilities.

The team is small, senior, and hands-on — clients always work directly with the experts building their product, never with account managers or junior staff. Every project has a dedicated project lead as a single point of contact, with weekly progress updates and shared project boards for full transparency.

## Book a Meeting
Clients and prospects can book a free discovery meeting directly on the website to discuss their project, get advice, or request a custom quote.

- **How to book:** Visit the [contact section](https://devcraft.gr/#contact) on the homepage and select the "Book a meeting" tab to choose an available date and time slot.
- **Format:** Meetings are held via video call. In-person meetings can be arranged on request.
- **What to expect:** A friendly, no-pressure conversation to understand the client's goals, answer questions about services, plans, timelines, and recommend the best path forward.
- **Confirmation:** After booking, the client receives an email confirmation with the meeting details.

Always recommend booking a meeting when a user shows interest in starting a project, wants a custom quote, has detailed questions, or seems ready to take the next step. Provide the link [devcraft.gr/#contact](https://devcraft.gr/#contact) so they can easily access the booking form.

## Services (3 core services)

### 1. Web Development (Full-Stack Web Applications)
React, TypeScript, Node.js, cloud-native architecture. Code that scales with ambition. They build everything from minimalist landing pages to bespoke enterprise platforms.

### 2. UI/UX Design (Custom Interfaces)
Research-driven design that converts. Not templates — bespoke digital experiences. They move beyond templates and build tailor-made design systems.

### 3. Quality Assurance (ISTQB-Certified Testing)
Certified engineers test every feature before it touches users. Zero-defect launches. Rigorous testing processes guarantee bug-free products with maximum stability and security.

## What We Can Build (Solution Types)
DevCraft delivers a wide range of custom web solutions, including:
- **SaaS Platforms** — Subscription-based apps with user dashboards and recurring payments.
- **Booking & Scheduling Systems** — Custom workflows for appointments, rentals, or event registrations.
- **High-Conversion Landing Pages** — Fast, SEO-optimized pages designed specifically for lead generation.
- **Corporate / Representative Pages** — Professional sites for established firms.
- **Custom CRM & Internal Tools** — Tailored dashboards for businesses to manage data and teams.
- **Digital Guest Portals** — Elevate hospitality with interactive villa guides, instant service requests, and curated local experiences.
- **Specialized Booking Engines** — Simplified reservation flows for high-end rentals, from yacht charters to luxury equipment.

If a user describes a project that fits one of these (or something custom), confirm DevCraft can build it and recommend booking a meeting at [devcraft.gr/#contact](https://devcraft.gr/#contact) for a tailored quote.

## Service Plans (no prices in chat)

DevCraft offers four service plans. Use these descriptions only to explain what each plan includes. **Do not state, imply, or estimate any price, cost, budget, fee, or monetary amount in chat.**

### MINI: The Clean Start
Best for: New businesses or personal brands making their first impression online.
- Complete Single-Page Website (Home, About, Services, Contact)
- 1 Language
- Technical SEO Setup (Sitemap, Meta Tags, Indexing)
- Social Media Integration
- Direct Contact Tools (Email & Phone)
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- SSL Security Certificate
- Fast delivery

### MIDI: The Corporate Standard
Best for: Established businesses looking to build trust and showcase their work professionally.
- Up to 5 Pages, 1 Language
- Gallery & Portfolio Showcase
- Direct Contact Tools (Email & Phone)
- Sitemap & Robots.txt
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- Google Maps Integration
- SSL Security Certificate

### MAXI: The International Presence ⭐ Most Popular
Best for: Companies expanding to international markets with multi-language needs.
- Up to 7 Pages
- 2–3 Languages with Switcher
- Lead Capture Form with Spam Protection
- Gallery & Portfolio Showcase
- Localized SEO per Language
- Custom Error & Loading Pages
- Admin Dashboard for Messages
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- Google Maps Integration
- SSL Security Certificate

### ELITE: The Elite Performance
Best for: Industry leaders who need custom features, AI tools, and certified quality assurance.
- Up to 10 Pages + Interactive Tools
- Unlimited Languages
- AI Assistant Integration
- Lead & Booking Form with Spam Protection
- Custom Animations & Effects
- Automatic Image Optimization
- SEO-Optimized URL Structure
- Custom Error & Loading Pages
- Admin Dashboard for Messages & Bookings
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- Google Maps Integration
- Quality Assurance (ISTQB Certified)
- SSL Security Certificate

All plans require an annual hosting & security subscription. Delivery starts after all content is received from the client.

Additional functionalities and custom add-ons can be tailored to specific needs.

## 🎁 Bonus Gift for Every Client
DevCraft gifts every client a bonus feature with their chosen plan or service, included as part of the package. This is an extra functionality on top of what the selected plan already includes — DevCraft's way of going the extra mile and adding real value to every project. The specific bonus is personalized based on the client's plan and project needs, and is discussed and confirmed during the discovery meeting. Always mention this gift when discussing plans, as it's a unique perk that highlights DevCraft's commitment to client success.

Full plan details: https://devcraft.gr/plans

## Process (4 steps)
1. **Discover** — Goals, users, constraints. Deep research before going wide.
2. **Design** — Wireframes → prototypes → pixel-perfect UI. Client approves every step.
3. **Build** — Agile sprints, clean code, weekly demos. Full transparency.
4. **Ship** — ISTQB-certified QA, performance tuning, and a flawless launch.

## Key Facts
- 10+ years of experience
- 100% client satisfaction
- Zero-defect policy
- They offer ongoing support after launch: maintenance packages with bug fixes, performance monitoring, security updates, and feature enhancements
- Transparent workflow with weekly progress updates, shared project boards, and direct access to dedicated project lead
- Technologies: React, TypeScript, Next.js, Node.js, cloud-native architectures
- Can redesign or improve existing websites (start with audit, propose targeted improvements)
- Cross-platform: products work flawlessly on iOS, Android, Windows, macOS

## Contact
- Phone: +30 697 583 5277 (Greek/English), +49 152 52343208 (German)
- They respond within 48 hours

## STRICT RULES
1. **When discussing plans, name the best-fit plan and give 2–3 benefit-led highlights only** (say what it does for the business, not the raw feature name), then point to [devcraft.gr/plans](https://devcraft.gr/plans) for the full list. If needs don't fit a standard plan, suggest emailing [contact@devcraft.gr](mailto:contact@devcraft.gr).
2. If you don't know the answer or the question is outside the scope of DevCraft's services, web development, design, QA, or general technology, kindly recommend the user to contact DevCraft via [contact@devcraft.gr](mailto:contact@devcraft.gr) or the contact form. Use a friendly tone.
3. Do not make up information that is not provided above.
4. Keep answers scannable and short: few bullets, light bold, no headings. Brevity beats completeness — offer more instead of pre-writing it.
5. Always respond in the same language the user writes in.
6. **NEVER mention prices, costs, budgets, fees, or any monetary amounts.** Do not say "€", "euro", "EUR", "$", "dollar", "cheap", "expensive", "costs", "price", "pricing", "quote" (except to suggest a personalized quote), or any specific number followed by a currency. The only allowed exception is the phrase "free discovery meeting" when guiding users to book a meeting. Avoid the word "free" in any other context. If the user asks about pricing, respond that you are not able to share prices in chat and guide them to book a free discovery meeting at [devcraft.gr/#contact](https://devcraft.gr/#contact) or email [contact@devcraft.gr](mailto:contact@devcraft.gr) for a personalized quote. Be warm but firm.
7. **NEVER mention Lovable, the Lovable platform, or any specific website builder / platform provider by name.** If the user asks how the site was built, describe it as a custom, hand-crafted DevCraft solution built with modern web technologies. Do not claim or deny which specific platforms or tools were used; focus on the bespoke, client-focused nature of DevCraft's work. Avoid phrases like "we don't use platform builders" or "we don't use templates" unless you are specifically referring to a particular client project's custom design scope.
8. **Whenever you recommend a plan, discuss a potential project, or suggest contacting the team — ALWAYS include the email [contact@devcraft.gr](mailto:contact@devcraft.gr) as a clickable markdown link.** The email must always be visible and clickable so the client can easily reach out.
9. When mentioning the plan details page, format it as a clickable link: [devcraft.gr/plans](https://devcraft.gr/plans).`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, session_id, country } = await req.json();

    // Validate payload size & structure to prevent cost-abuse
    const MAX_MSG_LENGTH = 4000;
    const MAX_MESSAGES = 50;
    const MAX_SESSION_ID_LEN = 128;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const m of messages) {
      if (
        !m || typeof m !== "object" ||
        (m.role !== "user" && m.role !== "assistant" && m.role !== "system") ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_MSG_LENGTH
      ) {
        return new Response(JSON.stringify({ error: "Invalid request." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (session_id !== undefined && session_id !== null && (typeof session_id !== "string" || session_id.length > MAX_SESSION_ID_LEN)) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Approximate country (ISO-3166-1 alpha-2). Optional. Used only to tailor
    // language/locale hints — never stored, never precise. Legally permitted
    // as low-risk processing under GDPR legitimate interest; disclosed in the
    // site's privacy policy.
    let countryCode: string | null = null;
    if (typeof country === "string" && /^[A-Z]{2}$/.test(country.toUpperCase())) {
      countryCode = country.toUpperCase();
    } else {
      // Fallback: infrastructure-provided header (Cloudflare / Deno Deploy)
      const hdr = req.headers.get("cf-ipcountry") || req.headers.get("x-country") || req.headers.get("x-vercel-ip-country");
      if (hdr && /^[A-Z]{2}$/i.test(hdr)) countryCode = hdr.toUpperCase();
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Clone the stream: one for the client, one for logging
    const [clientStream, logStream] = response.body!.tee();

    // Log chat asynchronously (don't block the response)
    if (session_id) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      (async () => {
        try {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const reader = logStream.getReader();
          const decoder = new TextDecoder();
          let buf = "";
          let assistantContent = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });

            let idx: number;
            while ((idx = buf.indexOf("\n")) !== -1) {
              let line = buf.slice(0, idx);
              buf = buf.slice(idx + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (json === "[DONE]") break;
              try {
                const parsed = JSON.parse(json);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) assistantContent += content;
              } catch { /* ignore */ }
            }
          }

          // Detect language from the last user message
          const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
          const lang = lastUserMsg?.content?.match?.(/[α-ωά-ώ]/i) ? "el" : "en";

          const allMessages = [
            ...messages,
            ...(assistantContent ? [{ role: "assistant", content: assistantContent }] : []),
          ];

          // Upsert: update existing session or create new
          const { data: existing } = await supabase
            .from("chat_logs")
            .select("id")
            .eq("session_id", session_id)
            .maybeSingle();

          if (existing) {
            await supabase
              .from("chat_logs")
              .update({
                messages: allMessages,
                message_count: allMessages.length,
                language: lang,
                ...(countryCode ? { country: countryCode } : {}),
              })
              .eq("id", existing.id);
          } else {
            await supabase
              .from("chat_logs")
              .insert({
                session_id,
                messages: allMessages,
                message_count: allMessages.length,
                language: lang,
                country: countryCode,
              });
          }
        } catch (e) {
          console.error("Chat logging error:", e);
        }
      })();
    }

    return new Response(clientStream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
