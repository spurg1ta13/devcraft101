CREATE POLICY "Allow service role insert" ON public.contact_messages FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Allow service role select" ON public.contact_messages FOR SELECT TO service_role USING (true);