
-- Replace the open INSERT policy with a validated one
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;

CREATE POLICY "Anyone can insert page views with validation"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(page_path) <= 500
  AND page_path ~ '^/'
  AND (referrer IS NULL OR length(referrer) <= 2000)
  AND (user_agent IS NULL OR length(user_agent) <= 2000)
  AND (visitor_id IS NULL OR length(visitor_id) <= 100)
  AND (country IS NULL OR length(country) <= 10)
);
