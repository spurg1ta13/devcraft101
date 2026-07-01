import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLang } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVisualViewport } from "@/hooks/useVisualViewport";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
const HISTORY_KEY = "devcraft_chat_history";
const HISTORY_TTL_MS = 5 * 60 * 1000; // 5 minutes

const getSessionId = () => {
  const key = "devcraft_chat_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
};

const loadHistory = (): Msg[] => {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { expiresAt: number; sessionId?: string; messages: Msg[] };
    if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(HISTORY_KEY);
      return [];
    }
    // Only restore if it belongs to the current session
    if (parsed.sessionId && parsed.sessionId !== getSessionId()) {
      sessionStorage.removeItem(HISTORY_KEY);
      return [];
    }
    return Array.isArray(parsed.messages) ? parsed.messages : [];
  } catch {
    return [];
  }
};

const saveHistory = (messages: Msg[]) => {
  try {
    sessionStorage.setItem(
      HISTORY_KEY,
      JSON.stringify({
        expiresAt: Date.now() + HISTORY_TTL_MS,
        sessionId: getSessionId(),
        messages,
      }),
    );
  } catch { /* ignore */ }
};

const clearHistory = () => {
  try { sessionStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
};

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
  de: {
    title: "Hallo! 👋",
    subtitle: "Fragen Sie mich alles über unsere Leistungen.",
    placeholder: "Geben Sie Ihre Frage ein…",
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
      body: JSON.stringify({ messages, session_id: getSessionId() }),
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

interface AIChatWidgetProps {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AIChatWidget = ({ defaultOpen = false, onOpenChange }: AIChatWidgetProps) => {
  const [open, setOpenState] = useState(defaultOpen);
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenState(next);
    onOpenChange?.(next);
  };
  const [messages, setMessages] = useState<Msg[]>(() => loadHistory());
  const expiryTimerRef = useRef<number | null>(null);

  // Allow parent to programmatically open the chat (e.g. from hero CTA)
  useEffect(() => {
    if (defaultOpen) setOpenState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen]);

  // Persist messages with rolling 5-minute TTL
  useEffect(() => {
    if (messages.length === 0) {
      clearHistory();
    } else {
      saveHistory(messages);
    }
  }, [messages]);

  // When chat closes, schedule cleanup after 5 minutes (cancel if reopened)
  useEffect(() => {
    if (open) {
      if (expiryTimerRef.current) {
        window.clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
      // Refresh TTL on open if there's history
      if (messages.length > 0) saveHistory(messages);
      return;
    }
    if (messages.length === 0) return;
    expiryTimerRef.current = window.setTimeout(() => {
      clearHistory();
      setMessages([]);
    }, HISTORY_TTL_MS);
    return () => {
      if (expiryTimerRef.current) {
        window.clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const viewport = useVisualViewport(open && isMobile);
  const w = WELCOME[lang] || WELCOME.en;

  // Prevent background scroll on mobile when chat is open
  useEffect(() => {
    if (!open || !isMobile) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.dataset.chatOpen = "true";

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      delete body.dataset.chatOpen;
      window.scrollTo(0, scrollY);
    };
  }, [isMobile, open]);

  const isStreamingRef = useRef(false);
  const assistantMsgTopRef = useRef<number | null>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      container.scrollTop = container.scrollHeight;
    });
  }, []);

  const scrollToAssistantStart = useCallback(() => {
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      // Find the last assistant message element
      const msgs = container.querySelectorAll("[data-role]");
      const lastAssistant = Array.from(msgs).reverse().find(el => el.getAttribute("data-role") === "assistant");
      if (lastAssistant) {
        const containerRect = container.getBoundingClientRect();
        const msgRect = lastAssistant.getBoundingClientRect();
        const offset = msgRect.top - containerRect.top + container.scrollTop - 8;
        container.scrollTop = offset;
      }
    });
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role === "user") {
      // User just sent a message — scroll to bottom so they see loading indicator
      scrollToBottom();
    } else if (last.role === "assistant" && isStreamingRef.current) {
      // On first assistant chunk — align start of message to top
      if (assistantMsgTopRef.current === null) {
        assistantMsgTopRef.current = 1;
        scrollToAssistantStart();
      } else {
        // Subsequent chunks — keep scrolling to bottom so latest text stays visible
        scrollToBottom();
      }
    }
  }, [messages, scrollToBottom, scrollToAssistantStart]);
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (open && !loading) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError("");

    const userMsg: Msg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    isStreamingRef.current = true;
    assistantMsgTopRef.current = null;
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
      () => { isStreamingRef.current = false; setLoading(false); },
      (errMsg) => { isStreamingRef.current = false; setError(errMsg); setLoading(false); },
    );
  };

  const sanitizeAssistantContent = (content: string) => {
    return (
      content
        // Never mention Lovable or the platform it was built on
        .replace(/\blovable\b/gi, "DevCraft")
        // Rewrite obsolete /prices path to /plans
        .replace(/devcraft\.gr\/prices/gi, "devcraft.gr/plans")
        .replace(/(^|[^a-z])\/prices\b/gi, "$1/plans")
        // Preserve the allowed phrase "free discovery meeting"
        .replace(/\bfree discovery meeting\b/gi, "{{FREE_DISCOVERY_MEETING}}")
        // Remove standalone price-related words (free, cheap, expensive) when used in monetary senses
        .replace(/\b(?:free|cheap|expensive)\b/gi, "")
        // Restore the allowed phrase
        .replace(/\{\{FREE_DISCOVERY_MEETING\}\}/gi, "free discovery meeting")
        // Remove price ranges and currency amounts (e.g. €600–€700, €1,200, $300)
        .replace(/(?:€|\$|£|USD|EUR|euro|euros?)\s*[\d,.\s]+(?:\s*[–—-]\s*[\d,.\s]+)?(?:\s*(?:€|\$|£|USD|EUR|euro|euros?))?/gi, "")
        // Remove stray price/pricing/cost/quote mentions near numbers or currency symbols
        .replace(/\b(?:price|pricing|cost|costs|quote|budget|fee|fees)\s*(?:starts?|from|is|range|amount)?\s*:?\s*(?:€|\$|£|\d)/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
    );
  };

  const processContent = (content: string) => {
    return sanitizeAssistantContent(content).replace(
      /\[contact\s*(?:us\s*)?(?:form)?\]/gi,
      "[contact form](#contact)"
    );
  };

  // On mobile (no sm: breakpoint), use visualViewport height to avoid keyboard overlap
  // On desktop, use fixed dimensions via CSS
  const mobileStyle: React.CSSProperties = isMobile && viewport.height != null
    ? {
        height: `${viewport.height}px`,
        minHeight: `${viewport.height}px`,
        maxHeight: `${viewport.height}px`,
        top: `${viewport.offsetTop}px`,
        left: `${viewport.offsetLeft}px`,
        width: viewport.width != null ? `${viewport.width}px` : undefined,
      }
    : {};

  return (
    <>
      {/* Floating button */}
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

      {/* Chat panel */}
      <div
        style={mobileStyle}
        className={`fixed z-[100] overflow-hidden bg-[hsl(220_20%_8%)] border border-primary/30 shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.25)] transition-opacity duration-300 sm:transition-[opacity,transform] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[360px] sm:max-w-[calc(100vw-2rem)] sm:h-auto sm:rounded-2xl sm:shadow-[0_16px_60px_-12px_hsl(var(--primary)/0.3),0_0_0_1px_hsl(var(--primary)/0.15)] sm:origin-bottom-right ${
          open ? "sm:scale-100" : "sm:scale-90"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col sm:h-[500px]">
          {/* Header */}
          <div className="bg-[hsl(220_20%_11%)] px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 border-b border-primary/20 shrink-0">
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

          {/* Messages — flex-1 fills remaining space between header and input */}
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 sm:h-[min(360px,calc(100vh-280px))]"
          >
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">{w.title.split(" ").pop()}</p>
                <p className="text-lg font-bold text-foreground mb-1">{w.title.replace(/\s*👋$/, "")}</p>
                <p className="text-sm text-muted-foreground">{w.subtitle}</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} data-role={msg.role} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                            let internalPath: string | null = null;
                            let internalHash: string | null = null;
                            if (href) {
                              try {
                                const url = new URL(href, window.location.origin);
                                const isInternal =
                                  url.origin === window.location.origin ||
                                  /(^|\.)devcraft\.gr$/i.test(url.hostname);
                                if (isInternal) {
                                  internalPath = url.pathname || "/";
                                  internalHash = url.hash ? url.hash.slice(1) : null;
                                }
                              } catch { /* ignore */ }
                            }

                            if (internalPath !== null) {
                              const path = internalPath;
                              const hash = internalHash;
                              return (
                                <a
                                  href={href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    const scrollToHash = () => {
                                      if (!hash) {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                        return;
                                      }
                                      const tryScroll = (attempt = 0) => {
                                        const el = document.getElementById(hash);
                                        if (el) {
                                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                                        } else if (attempt < 20) {
                                          setTimeout(() => tryScroll(attempt + 1), 100);
                                        }
                                      };
                                      tryScroll();
                                    };
                                    if (path === window.location.pathname) {
                                      scrollToHash();
                                    } else {
                                      window.history.pushState({}, "", path + (hash ? `#${hash}` : ""));
                                      window.dispatchEvent(new PopStateEvent("popstate"));
                                      setTimeout(scrollToHash, 250);
                                    }
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

          {/* Input — always pinned to bottom */}
          <div className="border-t border-primary/20 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0 bg-[hsl(220_20%_8%)]">
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
                enterKeyHint="send"
                autoComplete="off"
                autoCorrect="off"
                className="flex-1 bg-secondary border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 min-h-[44px]"
                style={{ fontSize: "16px" }}
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
