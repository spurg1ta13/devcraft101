Implement AI assistant guardrails to remove prices and platform mentions.

1. Update the AI assistant system prompt in `supabase/functions/ai-chat/index.ts`:
   - Remove all specific plan prices and monetary details.
   - Add strict rules to never mention prices, costs, budgets, fees, or any currency amounts; redirect pricing questions to the contact/booking flow.
   - Add strict rules to never mention Lovable or the underlying platform/provider.
   - Keep the assistant broad enough to discuss general technology topics while staying focused on DevCraft's value.

2. Add a frontend defensive sanitizer in `src/components/AIChatWidget.tsx`:
   - Strip any remaining "Lovable" mentions and currency/price patterns from assistant messages before rendering.

3. Deploy the updated `ai-chat` Supabase Edge Function.

Note: This work was already implemented in the previous turn. This plan is for confirmation/approval.