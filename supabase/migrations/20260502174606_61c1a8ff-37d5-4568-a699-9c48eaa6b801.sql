-- Phone click tracking
CREATE TABLE public.phone_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  visitor_id text,
  page_path text,
  source text,
  user_agent text
);

ALTER TABLE public.phone_clicks ENABLE ROW LEVEL SECURITY;

-- Anyone can record a click
CREATE POLICY "Anyone can insert phone clicks"
ON public.phone_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (page_path IS NULL OR length(page_path) <= 500)
  AND (source IS NULL OR length(source) <= 50)
  AND (visitor_id IS NULL OR length(visitor_id) <= 100)
  AND (user_agent IS NULL OR length(user_agent) <= 2000)
);

-- Admins can view individual rows
CREATE POLICY "Admins can view phone clicks"
ON public.phone_clicks
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public count function (no row data exposed)
CREATE OR REPLACE FUNCTION public.get_phone_click_count()
RETURNS bigint
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) FROM public.phone_clicks;
$$;

GRANT EXECUTE ON FUNCTION public.get_phone_click_count() TO anon, authenticated;