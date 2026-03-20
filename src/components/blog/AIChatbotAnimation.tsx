import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const labels = {
  title: { en: "Live Demo: AI Assistant in Action", el: "Ζωντανό Demo: AI Βοηθός σε Δράση" },
  mobileLabel: { en: "Mobile", el: "Κινητό" },
  desktopLabel: { en: "Desktop", el: "Desktop" },
  typing: { en: "AI is typing", el: "Ο AI γράφει" },
  online: { en: "Online 24/7", el: "Online 24/7" },
  responseTime: { en: "Avg. response: 1.2s", el: "Μέσος χρόνος: 1.2δ" },
  satisfaction: { en: "Satisfaction", el: "Ικανοποίηση" },
  leadsCapture: { en: "Leads captured today", el: "Leads σήμερα" },
  conversations: { en: "Active conversations", el: "Ενεργές συνομιλίες" },
};

const chatFlow = {
  en: [
    { from: "user", text: "Hi! What services do you offer?" },
    { from: "ai", text: "We specialize in custom web development, UI/UX design, and ISTQB-certified QA testing. How can I help you today?" },
    { from: "user", text: "How fast can you build a landing page?" },
    { from: "ai", text: "Typically 1–2 weeks for a high-converting landing page. Want me to send you a free consultation link?" },
    { from: "user", text: "Yes please!" },
    { from: "ai", text: "Great! What's the best email to reach you? I'll send details right away 🚀" },
  ],
  el: [
    { from: "user", text: "Γεια! Τι υπηρεσίες προσφέρετε;" },
    { from: "ai", text: "Εξειδικευόμαστε σε ανάπτυξη ιστοσελίδων, σχεδιασμό UI/UX και πιστοποιημένο QA testing. Πώς μπορώ να βοηθήσω;" },
    { from: "user", text: "Πόσο γρήγορα μπορείτε να φτιάξετε landing page;" },
    { from: "ai", text: "Συνήθως 1–2 εβδομάδες για μια landing page υψηλής μετατροπής. Θέλετε να σας στείλω link δωρεάν συμβουλευτικής;" },
    { from: "user", text: "Ναι, παρακαλώ!" },
    { from: "ai", text: "Τέλεια! Ποιο είναι το καλύτερο email σας; Θα σας στείλω λεπτομέρειες αμέσως 🚀" },
  ],
};

const t = (obj: { en: string; el: string }, lang: string) =>
  (obj as Record<string, string>)[lang] || obj.en;

/* Counter that animates up */
const AnimCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * p));
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration]);

  return <>{val}</>;
};

const AIChatbotAnimation = () => {
  const { lang } = useLang();
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"mobile" | "desktop">("mobile");
  const flow = chatFlow[lang as "en" | "el"] || chatFlow.en;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleMessages(0);
    setShowTyping(false);

    const showNext = (index: number) => {
      if (index >= flow.length) {
        // Reset after a pause
        timerRef.current = setTimeout(() => {
          setVisibleMessages(0);
          setShowTyping(false);
          timerRef.current = setTimeout(() => showNext(0), 800);
        }, 4000);
        return;
      }

      // Show typing indicator for AI messages
      if (flow[index].from === "ai") {
        setShowTyping(true);
        timerRef.current = setTimeout(() => {
          setShowTyping(false);
          setVisibleMessages(index + 1);
          timerRef.current = setTimeout(() => showNext(index + 1), 1200);
        }, 1400);
      } else {
        setVisibleMessages(index + 1);
        timerRef.current = setTimeout(() => showNext(index + 1), 900);
      }
    };

    timerRef.current = setTimeout(() => showNext(0), 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lang, activeTab]);

  // Auto-scroll chat to bottom when new messages appear
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleMessages, showTyping]);

  return (
    <div className="my-12 select-none" aria-hidden="true">
      {/* Title */}
      <p className="text-center font-mono text-xs uppercase tracking-[0.15em] text-primary mb-6">
        {t(labels.title, lang)}
      </p>

      {/* Tab switcher */}
      <div className="flex justify-center gap-2 mb-6">
        {(["mobile", "desktop"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_-6px_hsl(var(--primary)/0.4)]"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {tab === "mobile" ? t(labels.mobileLabel, lang) : t(labels.desktopLabel, lang)}
          </button>
        ))}
      </div>

      {/* Animation container */}
      <div className={`mx-auto transition-all duration-500 ${activeTab === "mobile" ? "max-w-[320px]" : "max-w-[600px]"}`}>
        {/* Device frame */}
        <div
          className={`rounded-2xl border border-border/40 bg-card overflow-hidden shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.12)] transition-all duration-500 ${
            activeTab === "mobile" ? "rounded-[24px]" : "rounded-xl"
          }`}
        >
          {/* Chat header */}
          <div className="bg-secondary/80 px-4 py-3 flex items-center gap-3 border-b border-border/20">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M10 21v1a2 2 0 0 0 4 0v-1" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">DevCraft AI</p>
              <p className="text-[10px] text-primary font-mono">{t(labels.online, lang)}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Chat messages */}
          <div ref={chatScrollRef} className={`p-4 space-y-3 overflow-y-auto ${activeTab === "mobile" ? "h-[320px]" : "h-[280px]"}`}>
            {flow.slice(0, visibleMessages).map((msg, i) => (
              <div
                key={`${lang}-${activeTab}-${i}`}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                style={{
                  animation: "aiChatMsgIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
                }}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                      : "bg-muted/50 text-foreground rounded-2xl rounded-bl-md border border-border/20"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <div className="flex justify-start" style={{ animation: "aiChatMsgIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" }}>
                <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3 border border-border/20 flex items-center gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                      style={{
                        animation: `aiTypingDot 1.4s ease-in-out ${d * 0.2}s infinite`,
                      }}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground/60 ml-2 font-mono">
                    {t(labels.typing, lang)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { label: t(labels.responseTime, lang), value: "1.2s", isText: true },
            { label: t(labels.satisfaction, lang), value: 97, suffix: "%", isText: false },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl bg-card border border-border/20 px-3 py-3 text-center"
              style={{
                animation: `aiChatMsgIn 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s both`,
              }}
            >
              <p className="text-lg font-bold text-foreground tabular-nums">
                {stat.isText ? stat.value : <><AnimCounter target={stat.value as number} />{stat.suffix || ""}</>}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes aiChatMsgIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes aiTypingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIChatbotAnimation;
