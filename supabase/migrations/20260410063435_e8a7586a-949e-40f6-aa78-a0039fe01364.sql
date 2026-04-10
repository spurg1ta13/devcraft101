
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles
CREATE POLICY "Admins can view roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
);

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop overly permissive policies on contact_messages
DROP POLICY IF EXISTS "Authenticated users can select" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete" ON public.contact_messages;

-- Replace with admin-only policies
CREATE POLICY "Admins can select contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop overly permissive policies on chat_logs
DROP POLICY IF EXISTS "Authenticated users can view chat logs" ON public.chat_logs;
DROP POLICY IF EXISTS "Authenticated users can delete chat logs" ON public.chat_logs;

-- Replace with admin-only policies
CREATE POLICY "Admins can view chat logs"
ON public.chat_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete chat logs"
ON public.chat_logs
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
