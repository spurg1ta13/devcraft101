REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_taken_slots(date, date) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_phone_click_count() FROM PUBLIC;

-- Re-grant only where intentionally public
GRANT EXECUTE ON FUNCTION public.get_taken_slots(date, date) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_phone_click_count() TO anon, authenticated;