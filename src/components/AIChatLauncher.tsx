import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { consumeChatOpenRequest } from "@/lib/chat";

// Heavy chat panel loaded ONLY when user clicks the button
const AIChatWidget = lazy(() => import("./AIChatWidget"));

/**
 * Lightweight launcher — renders only a small floating button on initial load.
 * The full chat widget (react-markdown, streaming logic, viewport hooks, etc.)
 * is dynamically imported on first interaction, keeping the main bundle minimal.
 *
 * Other components can open the chat by dispatching:
 *   window.dispatchEvent(new CustomEvent("devcraft:open-chat"))
 */
const AIChatLauncher = () => {
  const [activated, setActivated] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (!activated) {
      setActivated(true);
    }
    setOpen((prev) => !prev);
  }, [activated]);

  useEffect(() => {
    const openChat = () => {
      setActivated(true);
      setOpen(true);
    };
    window.addEventListener("devcraft:open-chat", openChat);
    return () => window.removeEventListener("devcraft:open-chat", openChat);
  }, []);


  // Before activation: render only the tiny floating button
  if (!activated) {
    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    );
  }

  // After first click: load the full widget
  return (
    <Suspense fallback={null}>
      <AIChatWidget defaultOpen={open} onOpenChange={setOpen} />
    </Suspense>
  );
};

export default AIChatLauncher;
