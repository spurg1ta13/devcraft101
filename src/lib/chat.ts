/**
 * Shared chat open signal.
 *
 * Problem: AIChatLauncher is gated behind InteractionGate, so the first click
 * on a "Chat with AI" button dispatches the CustomEvent before the launcher's
 * listener is mounted. The event is lost and the panel doesn't open.
 *
 * Solution: set a pending flag alongside the event dispatch. AIChatLauncher
 * consumes the flag when it mounts and opens the chat even if it missed the
 * original event.
 */

let chatOpenPending = false;

export const requestChatOpen = () => {
  chatOpenPending = true;
  window.dispatchEvent(new CustomEvent("devcraft:open-chat"));
};

export const consumeChatOpenRequest = () => {
  const wasPending = chatOpenPending;
  chatOpenPending = false;
  return wasPending;
};
