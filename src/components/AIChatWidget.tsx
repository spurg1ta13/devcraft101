import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/i18n/LanguageContext";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const WELCOME: Record<string, { title: string; subtitle: string; placeholder: string }> = {
  en: {
    title: "Hi there! 👋",
    subtitle: "Ask me anything about our services.",
    placeholder: "Type your question…",
  },
  el: {
    title: "Γεια σας! 👋",
    subtitle: "Ρωτήστε μας οτιδήποτε για τις υπηρεσίες μας.",
    placeholder: "Γράψτε την ερώτησή σας…",
  },
};

async function streamChat(
  messages: Msg[],
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => null);
      onError(data?.error || "Something went wrong. Please try again.");
      return;
    }

    if (!resp.body) { onError("No response body"); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

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
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* partial JSON, ignore */ }
      }
    }
    onDone();
  } catch {
    onError("Network error. Please check your connection.");
  }
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang } = useLang();
  const w = WELCOME[lang] || WELCOME.en;

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError("");

    const userMsg: Msg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    let assistantSoFar = "";
    const allMsgs = [...messages, userMsg];

    await streamChat(
      allMsgs,
      (chunk) => {
        assistantSoFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && prev.length === allMsgs.length + 1) {
            return [...prev.slice(0, -1), { role: "assistant", content: assistantSoFar }];
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      },
      () => setLoading(false),
      (errMsg) => { setError(errMsg); setLoading(false); },
    );
  };

  // Inject clickable contact link into assistant messages
  const processContent = (content: string) => {
    return content.replace(
      /\[contact\s*(?:us\s*)?(?:form)?\]/gi,
      "[contact form](#contact)"
    );
  };

  return (
    <>
      {/* Floating button — hidden when chat is open on mobile */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95 ${
          open
            ? "hidden sm:flex bg-secondary text-foreground border border-border/50"
            : "bg-primary text-primary-foreground shadow-glow hover:scale-105"
        }`}
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel — fullscreen on mobile, floating on desktop */}
      <div
        className={`fixed z-[100] bg-background overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[360px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border sm:border-border/60 sm:shadow-2xl sm:origin-bottom-right ${
          open ? "sm:scale-100" : "sm:scale-90"
        }`}
        style={{ height: "100dvh" }}
      >
        <div className="flex flex-col sm:h-auto" style={{ height: "100dvh" }}>
          {/* Header */}
          <div className="bg-secondary px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 border-b border-border/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground">DevCraft AI</p>
                <p className="text-[11px] text-muted-foreground font-mono tracking-wide">
                  {w.subtitle}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/50 active:scale-95 transition-all"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages — flex-1 fills available space on mobile */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 sm:h-[min(360px,calc(100vh-280px))]"
          >
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">{w.title.split(" ").pop()}</p>
                <p className="text-lg font-bold text-foreground mb-1">{w.title.replace(/\s*👋$/, "")}</p>
                <p className="text-sm text-muted-foreground">{w.subtitle}</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md border border-border/30"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_a]:text-primary [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-foreground">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children, ...props }) => {
                            if (href === "#contact") {
                              return (
                                <a
                                  href="#contact"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    const el = document.getElementById("contact");
                                    el?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="text-primary font-semibold hover:underline cursor-pointer"
                                  {...props}
                                >
                                  {children}
                                </a>
                              );
                            }
                            return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
                          },
                        }}
                      >
                        {processContent(msg.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 border border-border/30">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2 inline-block">{error}</p>
              </div>
            )}
          </div>

          {/* Input — stays at bottom, safe-area aware */}
          <div className="border-t border-border/30 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={w.placeholder}
                disabled={loading}
                className="flex-1 bg-secondary border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 min-h-[44px]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
