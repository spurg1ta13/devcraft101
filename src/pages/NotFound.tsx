import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const t = {
    title: lang === "el" ? "Η σελίδα δεν βρέθηκε" : "Page Not Found",
    desc: lang === "el"
      ? "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί. Ας σας επαναφέρουμε στη σωστή διαδρομή."
      : "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    cta: lang === "el" ? "Πίσω στην Αρχική" : "Back to Home",
    explore: lang === "el" ? "Εξερευνήστε Υπηρεσίες" : "Explore Services",
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
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

      {/* Ambient glow */}
      <div className="pointer-events-none fixed -top-24 -right-12 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-24 -left-12 h-72 w-72 rounded-full bg-primary/8 blur-[120px]" />

      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(6rem,20vw,10rem)] font-extrabold leading-none tracking-[-0.06em]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(36 90% 45%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto my-6 h-[3px] w-16 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-3 text-xl font-semibold text-foreground sm:text-2xl"
        >
          {t.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-8 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base"
        >
          {t.desc}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.4)]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.cta}
          </Link>

          <Link
            to="/#services"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-7 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/60"
          >
            <Search className="h-4 w-4" />
            {t.explore}
          </Link>
        </motion.div>

        {/* Attempted path */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-xs text-muted-foreground/50 font-mono break-all"
        >
          {location.pathname}
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
