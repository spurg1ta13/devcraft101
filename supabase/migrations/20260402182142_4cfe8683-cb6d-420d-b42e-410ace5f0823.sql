
CREATE TABLE public.chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  message_count INTEGER NOT NULL DEFAULT 0,
  language TEXT
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert chat logs"
  ON public.chat_logs FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update chat logs"
  ON public.chat_logs FOR UPDATE TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can view chat logs"
  ON public.chat_logs FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete chat logs"
  ON public.chat_logs FOR DELETE TO authenticated
  USING (true);
