
-- Fix 1: Restrict page_views SELECT to admins only
DROP POLICY IF EXISTS "Authenticated users can select page views" ON public.page_views;
CREATE POLICY "Admins can select page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Update user_roles SELECT policy to use has_role() consistently
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
CREATE POLICY "Admins can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
