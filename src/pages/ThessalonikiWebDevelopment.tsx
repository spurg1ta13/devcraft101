import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Phone, Check, ShieldCheck, Code2, Sparkles, Languages, MapPin } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { routeMeta } from "@/seo/routeMeta";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { PHONE_GR } from "@/lib/phone";
import { trackPhoneClick } from "@/lib/trackPhoneClick";
import { loadFooter } from "@/lib/lazyLanding";

const Footer = lazy(loadFooter);
const PlanBookingDialog = lazy(() => import("@/components/landing/PlanBookingDialog"));

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Πιστοποιημένο QA (ISTQB)",
    body: "Κάθε λειτουργία ελέγχεται από πιστοποιημένο ISTQB μηχανικό QA σε desktop και κινητά, σε Windows, macOS, iOS και Android, πριν φτάσει στους χρήστες σας.",
  },
  {
    icon: Code2,
    title: "Custom κώδικας, όχι templates",
    body: "Χτίζουμε με React, TypeScript και Tailwind CSS. Καμία βαριά πλατφόρμα με δεκάδες plugins — μόνο ο κώδικας που χρειάζεται η ιστοσελίδα σας.",
  },
  {
    icon: Sparkles,
    title: "Ανθρώπινη στρατηγική + AI ταχύτητα",
    body: "Χρησιμοποιούμε AI για να επιταχύνουμε την υλοποίηση, κρατώντας τις αποφάσεις σχεδιασμού και αρχιτεκτονικής στα χέρια έμπειρων μηχανικών.",
  },
  {
    icon: Languages,
    title: "Πολύγλωσσο από την αρχή",
    body: "Ελληνικά, Αγγλικά και Γερμανικά με σωστό SEO ανά γλώσσα — ιδανικό για επιχειρήσεις της Θεσσαλονίκης που απευθύνονται και σε επισκέπτες από το εξωτερικό.",
  },
];

const SERVICES = [
  {
    name: "Ανάπτυξη Ιστοσελίδων",
    body: "Από μονοσέλιδες landing pages μέχρι full-stack web εφαρμογές με React, TypeScript και Node.js.",
  },
  {
    name: "Σχεδιασμός UI/UX",
    body: "Tailor-made design systems βασισμένα σε έρευνα, χωρίς έτοιμα θέματα και χωρίς συμβιβασμούς στη χρηστικότητα.",
  },
  {
    name: "Λύσεις AI",
    body: "AI βοηθοί, αυτοματισμοί και έξυπνες φόρμες που απαντούν σε επισκέπτες και φιλτράρουν τα σοβαρά leads.",
  },
  {
    name: "Διασφάλιση Ποιότητας",
    body: "Αυστηρές διαδικασίες δοκιμών με στόχο launch χωρίς σφάλματα, μέγιστη σταθερότητα και ασφάλεια.",
  },
];

const BUILDS = [
  "Εταιρικές ιστοσελίδες για επιχειρήσεις της Θεσσαλονίκης",
  "Landing pages υψηλής μετατροπής για καμπάνιες",
  "Συστήματα κρατήσεων και ραντεβού",
  "Πλατφόρμες SaaS με dashboards χρηστών",
  "Custom CRM και εσωτερικά εργαλεία",
  "Ιστοσελίδες προσωπικού portfolio & βιογραφικού",
  "Ψηφιακά portals επισκεπτών για φιλοξενία",
];

const STEPS = [
  { i: "01", title: "Γνωριμία", body: "Δωρεάν συνάντηση γνωριμίας — online ή δια ζώσης στη Θεσσαλονίκη — για να καταλάβουμε τι πρέπει να πετύχει η ιστοσελίδα." },
  { i: "02", title: "Σχεδιασμός", body: "Δομή σελίδων, κείμενα και design system προσαρμοσμένα στη μάρκα σας και στο κοινό σας." },
  { i: "03", title: "Υλοποίηση", body: "Custom development με SEO, ταχύτητα και προσβασιμότητα ενσωματωμένα εξ αρχής." },
  { i: "04", title: "Έλεγχος & Launch", body: "Πιστοποιημένο QA, διορθώσεις και παράδοση — με υποστήριξη και μετά το launch." },
];

const PROJECTS = [
  { name: "Lotus Bloom", url: "https://lotusbloom.gr", note: "Ιστοσελίδα υπηρεσιών, Ελλάδα" },
  { name: "CleanUp SKG", url: "https://www.cleanupskg.gr", note: "Τοπική επιχείρηση υπηρεσιών, Θεσσαλονίκη" },
  { name: "Personal Portfolio", url: "https://gretagreta.eu", note: "Πολύγλωσση σελίδα προσωπικού brand" },
];

const FAQS = [
  {
    q: "Πόσο κοστίζει η κατασκευή ιστοσελίδας στη Θεσσαλονίκη;",
    a: "Το κόστος εξαρτάται από τον αριθμό σελίδων, τις γλώσσες και τις λειτουργίες που χρειάζεστε. Έχουμε τέσσερα πακέτα, από μια ολοκληρωμένη μονοσέλιδη παρουσία μέχρι πολύγλωσσες πλατφόρμες με διαδραστικά εργαλεία. Δείτε τι περιλαμβάνει κάθε πακέτο στη σελίδα των πακέτων μας και ζητήστε προσφορά για το δικό σας project.",
  },
  {
    q: "Σε πόσο χρόνο παραδίδετε μια ιστοσελίδα;",
    a: "Οι χρόνοι εξαρτώνται από το εύρος του έργου. Μια landing page μπορεί να παραδοθεί μέσα σε μία εβδομάδα, ενώ μια ολοκληρωμένη web εφαρμογή συνήθως χρειάζεται 3–12 εβδομάδες. Η παράδοση ξεκινά όταν λάβουμε το περιεχόμενό σας.",
  },
  {
    q: "Συνεργάζεστε δια ζώσης στη Θεσσαλονίκη;",
    a: "Ναι. Η βάση μας είναι η Θεσσαλονίκη, οπότε μπορούμε να συναντηθούμε από κοντά για τη γνωριμία και τα ορόσημα του έργου. Η καθημερινή συνεργασία γίνεται online, ώστε να προχωράει το project γρήγορα και οργανωμένα.",
  },
  {
    q: "Η ιστοσελίδα θα είναι έτοιμη για SEO και για κινητά;",
    a: "Ναι. Κάθε ιστοσελίδα παραδίδεται responsive για κινητά, tablet και desktop, με τεχνικό SEO (sitemap, meta tags, δομημένα δεδομένα), βελτιστοποιημένες εικόνες και ελέγχους ταχύτητας πριν το launch.",
  },
  {
    q: "Μπορείτε να αναλάβετε συντήρηση μετά την παράδοση;",
    a: "Ναι. Διατίθενται ετήσια πακέτα συντήρησης και διασφάλισης ποιότητας κατόπιν αιτήματος, ώστε η ιστοσελίδα να παραμένει ενημερωμένη, γρήγορη και ασφαλής.",
  },
];

const LocalSchemas = () => {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://devcraft.gr/kataskevi-istoselidon-thessaloniki#service",
    name: "Κατασκευή Ιστοσελίδων Θεσσαλονίκη",
    serviceType: "Κατασκευή ιστοσελίδων και web εφαρμογών",
    description:
      "Custom κατασκευή ιστοσελίδων και web εφαρμογών για επιχειρήσεις στη Θεσσαλονίκη, με React και TypeScript, πιστοποιημένο ISTQB QA και πολύγλωσσο SEO.",
    url: "https://devcraft.gr/kataskevi-istoselidon-thessaloniki",
    inLanguage: "el",
    provider: { "@id": "https://devcraft.gr/#organization" },
    areaServed: [
      { "@type": "City", name: "Θεσσαλονίκη" },
      { "@type": "Country", name: "Ελλάδα" },
    ],
    availableLanguage: ["el", "en", "de"],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "el",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
};

const ThessalonikiWebDevelopment = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        {...routeMeta["/kataskevi-istoselidon-thessaloniki"]}
        canonical="/kataskevi-istoselidon-thessaloniki"
        localeOnly="el"
      />
      <LocalSchemas />
      <Navbar />

      <main id="main-content" lang="el">
        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container px-4 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Αρχική
            </Link>

            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mt-6 mb-4 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Θεσσαλονίκη · Ελλάδα
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.1] max-w-4xl">
              Κατασκευή Ιστοσελίδων στη{" "}
              <span className="text-gradient">Θεσσαλονίκη</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mt-6">
              Χτίζουμε custom ιστοσελίδες και web εφαρμογές για επιχειρήσεις της Θεσσαλονίκης — με
              καθαρό κώδικα, πιστοποιημένο ISTQB QA και πολύγλωσσο SEO. Χωρίς έτοιμα templates,
              χωρίς περιττά plugins.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] font-bold text-primary-foreground bg-primary px-6 py-4 min-h-[48px] rounded-full hover:brightness-110 hover:shadow-[0_0_24px_4px_hsl(38_100%_55%/0.3)] transition-all"
              >
                Ζητήστε προσφορά
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href={`tel:${PHONE_GR.tel}`}
                onClick={() => trackPhoneClick("thessaloniki-hero")}
                className="inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] font-bold text-foreground bg-secondary border border-border/60 px-6 py-4 min-h-[48px] rounded-full hover:border-primary/50 transition-all"
                aria-label={`Καλέστε ${PHONE_GR.display}`}
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="whitespace-nowrap">{PHONE_GR.display}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-10">
              Γιατί οι επιχειρήσεις της Θεσσαλονίκης μας επιλέγουν
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REASONS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border/30 bg-card/50 p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-10">Υπηρεσίες</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES.map((s) => (
                <div key={s.name} className="rounded-2xl border border-border/30 bg-card/40 p-6">
                  <h3 className="text-lg font-bold mb-2">{s.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mt-16 mb-6">
              Τι μπορούμε να φτιάξουμε
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {BUILDS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-10">Η διαδικασία</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STEPS.map((s) => (
                <div key={s.i} className="rounded-2xl border border-border/30 bg-card/50 p-6">
                  <span className="font-mono text-xs text-primary tracking-[0.2em]">{s.i}</span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-4">Έργα μας</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Πραγματικές ιστοσελίδες που έχουμε παραδώσει. Δείτε περισσότερα στο{" "}
              <Link to="/#projects" className="text-primary hover:underline">
                portfolio
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border/30 bg-card/40 p-6 hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    {p.name}
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{p.note}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-10">
              Συχνές ερωτήσεις
            </h2>
            <div className="flex flex-col gap-5 max-w-3xl">
              {FAQS.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border/30 bg-card/40 p-6">
                  <h3 className="text-base md:text-lg font-bold mb-2">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-8">
              Δείτε τι περιλαμβάνει κάθε πακέτο στη σελίδα{" "}
              <Link to="/prices" className="text-primary hover:underline">
                πακέτων &amp; υπηρεσιών
              </Link>{" "}
              ή διαβάστε το{" "}
              <Link to="/blog" className="text-primary hover:underline">
                ιστολόγιό μας
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 border-t border-border/20">
          <div className="container px-4 sm:px-6">
            <div className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-8 md:p-12">
              <h2 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Ας μιλήσουμε για την ιστοσελίδα σας
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                Κλείστε μια δωρεάν συνάντηση γνωριμίας ή στείλτε μας μήνυμα. Απαντάμε στα Ελληνικά,
                Αγγλικά και Γερμανικά.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] font-bold text-primary-foreground bg-primary px-6 py-4 min-h-[48px] rounded-full hover:brightness-110 transition-all"
                >
                  Επικοινωνία
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <ObfuscatedEmail
                  user="contact"
                  domain="devcraft.gr"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] font-bold text-foreground bg-secondary border border-border/60 px-6 py-4 min-h-[48px] rounded-full hover:border-primary/50 transition-all"
                  ariaLabel="Email {email}"
                >
                  {(email) => <>{email}</>}
                </ObfuscatedEmail>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        {dialogOpen && <PlanBookingDialog open={dialogOpen} onOpenChange={setDialogOpen} />}
      </Suspense>
    </div>
  );
};

export default ThessalonikiWebDevelopment;
