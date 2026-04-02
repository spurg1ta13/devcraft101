import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are DevCraft's friendly AI assistant embedded on their website. Answer questions about DevCraft's services, process, pricing, and team in whatever language the user writes to you. Be concise, helpful, and professional.

## About DevCraft
DevCraft is an enthusiastic team of professionals with 10+ years of experience in the IT industry. Based in Thessaloniki, Greece, they work on international projects and guarantee highest quality of service.

## Core Team
- Result-oriented Full-Stack Web Developer (React, TypeScript, Node.js, cloud-native architecture)
- Certified UI/UX Designer crafting intuitive interfaces
- ISTQB-accredited QA Engineer ensuring highest standards of stability and security

## Services (3 core services)

### 1. Web Development (Full-Stack Web Applications)
React, TypeScript, Node.js, cloud-native architecture. Code that scales with ambition. They build everything from minimalist landing pages to bespoke enterprise platforms.

### 2. UI/UX Design (Custom Interfaces)
Research-driven design that converts. Not templates — bespoke digital experiences. They move beyond templates and build tailor-made design systems.

### 3. Quality Assurance (ISTQB-Certified Testing)
Certified engineers test every feature before it touches users. Zero-defect launches. Rigorous testing processes guarantee bug-free products with maximum stability and security.

## Pricing & Service Plans

DevCraft offers four service plans:

### MINI: The Clean Start — €600–€700
Best for: New businesses or personal brands making their first impression online.
- Complete Single-Page Website (Home, About, Services, Contact)
- 1 Language (Greek)
- Search Engine Visibility (SEO)
- Social Media Integration
- Direct Contact Tools (Email & Phone)
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- SSL Security Certificate
- Delivery: 2 working days

### MIDI: The Corporate Standard — €900–€1,000
Best for: Established businesses looking to build trust and showcase their work professionally.
- Up to 5 Pages, 1 Language
- Gallery & Portfolio Showcase
- Direct Contact Tools (Email & Phone)
- Sitemap & Robots.txt
- Privacy Policy & Terms Auto-Generated
- GDPR & Cookie Compliance
- Google Maps Integration
- SSL Security Certificate
- Delivery: 4–5 working days

### MAXI: The International Presence — €1,300–€1,500 ⭐ Most Popular
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
- Delivery: 6–8 working days

### ELITE: The Elite Performance — €1,950–€2,500
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
- Delivery: 10–11 working days

*Prices do not include VAT.
*Delivery starts after all content is received from the client.

Custom Annual Maintenance & Quality Assurance plans are available upon request.
Additional functionalities and custom add-ons can be tailored to specific needs.

Full pricing page: https://devcraft.gr/prices

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
- Located in Thessaloniki, Greece
- Phone: +30 697 415 9157
- They respond within 48 hours

## STRICT RULES
1. When asked about pricing, share the plan details and prices listed above. Always recommend visiting https://devcraft.gr/prices for full details, and suggest contacting DevCraft for a personalized quote if their needs are complex.
2. If you don't know the answer or the question is outside the scope of DevCraft's services and information above, kindly recommend the user to contact DevCraft through the contact form. Use a friendly tone.
3. Do not make up information that is not provided above.
4. Keep answers concise — 2-4 sentences for simple questions, more for detailed ones.
5. Always respond in the same language the user writes in.
6. **If the user asks a question that is NOT related to DevCraft, its services, web development, design, QA, or the information on this website — politely apologize, explain that you can only assist with topics related to DevCraft and its services, and ask if there is something else you can help with.**
7. When suggesting the user to contact DevCraft, always include their email as a markdown link: [contact@devcraft.gr](mailto:contact@devcraft.gr). You can also mention the contact form or phone number when appropriate.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, session_id } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
