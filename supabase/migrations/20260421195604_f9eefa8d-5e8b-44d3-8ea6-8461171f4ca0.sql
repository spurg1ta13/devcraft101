-- Bookings table for "Book a meeting" feature
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  booking_date DATE NOT NULL,
  booking_hour SMALLINT NOT NULL CHECK (booking_hour >= 10 AND booking_hour <= 18),
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT bookings_unique_slot UNIQUE (booking_date, booking_hour)
);

CREATE INDEX idx_bookings_date ON public.bookings(booking_date);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a booking (validated server-side & by unique constraint)
CREATE POLICY "Anyone can insert bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) > 0 AND length(name) <= 200
  AND length(email) > 0 AND length(email) <= 320
  AND (phone IS NULL OR length(phone) <= 50)
  AND (message IS NULL OR length(message) <= 2000)
  AND booking_hour BETWEEN 10 AND 18
  AND booking_date >= CURRENT_DATE
);

-- Anyone can read ONLY date+hour of upcoming bookings (to show taken slots).
-- We restrict columns at the app layer by selecting only date+hour; RLS allows the row read.
-- To prevent leaking PII, we expose a SECURITY DEFINER function instead and DENY anon SELECT.
CREATE POLICY "Admins can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public-safe function to list taken slots (no PII)
CREATE OR REPLACE FUNCTION public.get_taken_slots(_from DATE, _to DATE)
RETURNS TABLE(booking_date DATE, booking_hour SMALLINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT booking_date, booking_hour
  FROM public.bookings
  WHERE booking_date >= _from AND booking_date <= _to
$$;

GRANT EXECUTE ON FUNCTION public.get_taken_slots(DATE, DATE) TO anon, authenticated;