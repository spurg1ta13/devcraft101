import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { blogTranslations, blogArticles } from "@/i18n/blogTranslations";
import { lazy, Suspense, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Blog animations are ONLY loaded via explicit user interaction (Play button inside component)
// They are lazy-loaded so framer-motion/heavy JS never enters the main bundle
const LandingPageAnimation = lazy(() => import("@/components/blog/LandingPageAnimation"));
const AIChatbotAnimation = lazy(() => import("@/components/blog/AIChatbotAnimation"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const BlogContactForm = lazy(() => import("@/components/blog/BlogContactForm"));

const BlogArticleSchema = ({ article, lang }: { article: typeof blogArticles[0]; lang: string }) => {
  const wordCount = article.content[lang as "en" | "el"]
    ?.join(" ")
    .split(/\s+/)
    .filter(Boolean).length || 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t(article.title, lang as "en" | "el"),
    description: t(article.metaDescription, lang as "en" | "el"),
    datePublished: article.date,
    dateModified: article.date,
    wordCount,
    image: { "@type": "ImageObject", url: "https://devcraft.gr/og-image.jpg", width: 1920, height: 1080 },
    author: { "@type": "Organization", name: "DevCraft", url: "https://devcraft.gr" },
    publisher: { "@type": "Organization", name: "DevCraft", logo: { "@type": "ImageObject", url: "https://devcraft.gr/devcraft-logo.svg" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://devcraft.gr/blog/${article.slug}` },
    keywords: article.keywords.join(", "),
    inLanguage: lang === "el" ? "el-GR" : "en-US",
    articleSection: t(article.category, lang as "en" | "el"),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

/** Lightweight static chat preview for mobile — matches AIChatbotAnimation style, language-aware */
const MobileChatPreview = () => {
  const { lang } = useLang();
  const isEl = lang === "el";
  const messages = [
    { from: "user", text: isEl ? "Γεια! Τι υπηρεσίες προσφέρετε;" : "Hi! What services do you offer?" },
    { from: "ai", text: isEl ? "Εξειδικευόμαστε σε ανάπτυξη ιστοσελίδων, σχεδιασμό UI/UX και πιστοποιημένο QA testing. Πώς μπορώ να βοηθήσω;" : "We specialize in custom web development, UI/UX design, and ISTQB-certified QA testing. How can I help you today?" },
    { from: "user", text: isEl ? "Πόσο γρήγορα μπορείτε να φτιάξετε landing page;" : "How fast can you build a landing page?" },
    { from: "ai", text: isEl ? "Συνήθως 1–2 εβδομάδες. Θέλετε link δωρεάν συμβουλευτικής;" : "Typically 1–2 weeks. Want me to send you a free consultation link?" },
  ];

  return (
    <figure className="my-8 select-none" role="img" aria-label={isEl ? "AI chatbot βοηθός — προεπισκόπηση" : "AI chatbot assistant — preview"}>
      <div className="mx-auto max-w-[320px]">
        <div className="rounded-[20px] border border-border/40 bg-card overflow-hidden shadow-[0_4px_24px_-8px_hsl(var(--primary)/0.10)]">
          <div className="bg-secondary/80 px-4 py-2.5 flex items-center gap-3 border-b border-border/20">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M10 21v1a2 2 0 0 0 4 0v-1" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">DevCraft AI</p>
              <p className="text-[10px] text-primary font-mono">Online 24/7</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="p-3 space-y-2.5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] px-3 py-2 text-[13px] leading-relaxed ${msg.from === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md" : "bg-muted/50 text-foreground rounded-2xl rounded-bl-md border border-border/20"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-card border border-border/20 px-2.5 py-2 text-center">
            <p className="text-base font-bold text-foreground tabular-nums">1.2s</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{isEl ? "Μέσος χρόνος" : "Avg. response"}</p>
          </div>
          <div className="rounded-lg bg-card border border-border/20 px-2.5 py-2 text-center">
            <p className="text-base font-bold text-foreground tabular-nums">97%</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{isEl ? "Ικανοποίηση" : "Satisfaction"}</p>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">{isEl ? "AI chatbot βοηθός σε ιστοσελίδα" : "AI chatbot assistant on a website"}</figcaption>
    </figure>
  );
};

/** Image placeholder for landing page article on mobile */
const MobileLandingPlaceholder = () => {
  const { lang } = useLang();
  const alt = lang === "el" ? "Σύγχρονη landing page σχεδίαση" : "Modern landing page design";
  return (
    <figure className="w-full rounded-xl overflow-hidden border border-border/30 mb-6">
      <img src="/images/blog-landing-page-demo.webp" alt={alt} loading="lazy" decoding="async" width={640} height={512} className="w-full h-auto object-cover" />
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const b = blogTranslations;

  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/blog" replace />;

  const renderContent = (paragraphs: string[]) =>
    paragraphs.map((p, i) => {
      if (p.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold tracking-[-0.02em] mt-10 mb-4 text-foreground">
            {p.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
      );
    });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        canonical={`/blog/${article.slug}`}
        type="article"
        articleMeta={{
          publishedTime: article.date, modifiedTime: article.date,
          author: "DevCraft", section: t(article.category, lang), tags: article.keywords,
        }}
      />
      <BlogArticleSchema article={article} lang={lang} />
      <Navbar />
      <main id="main-content" className="pt-32 lg:pt-28 pb-20">
        <div className="container px-4 sm:px-6 max-w-3xl mx-auto">
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm mb-8 min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t(b.backToBlog, lang)}
            </Link>

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary block mb-4">
              {t(article.category, lang)}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] mb-6">
              {t(article.title, lang)}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground/60 text-sm font-mono mb-10 pb-8 border-b border-border/30">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {t(b.publishedOn, lang)} {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {t(article.readTime, lang)} {t(b.minRead, lang)}
              </span>
            </div>

            <article className="prose-custom">
              {article.slug === "why-attractive-landing-page-is-important" && (
                isMobile ? <MobileLandingPlaceholder /> : (
                  <Suspense fallback={null}><LandingPageAnimation /></Suspense>
                )
              )}
              {article.slug === "why-ai-chatbot-assistant-boosts-your-website" && (
                isMobile ? <MobileChatPreview /> : (
                  <Suspense fallback={null}><AIChatbotAnimation /></Suspense>
                )
              )}
              {renderContent(article.content[lang])}
            </article>

            <Suspense fallback={null}>
              <BlogContactForm />
            </Suspense>

            <div className="mt-12 pt-8 border-t border-border/30">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:brightness-110 transition-all font-mono text-sm min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                {t(b.backToBlog, lang)}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BlogArticle;