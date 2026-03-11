import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEOHead
        title={{
          en: "Page Not Found | DevCraft",
          el: "Η Σελίδα δεν Βρέθηκε | DevCraft",
        }}
        description={{
          en: "The page you are looking for does not exist.",
          el: "Η σελίδα που αναζητάτε δεν υπάρχει.",
        }}
        canonical={location.pathname}
        noindex={true}
      />
      <div className="text-center px-6">
        <h1 className="mb-4 text-7xl font-black tracking-[-0.04em] text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          {lang === "el" ? "Η σελίδα δεν βρέθηκε" : "Page not found"}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {lang === "el" ? "Επιστροφή στην Αρχική" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
