import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { blogTranslations, blogArticles } from "@/i18n/blogTranslations";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";

const Footer = lazy(() => import("@/components/landing/Footer"));

const ARTICLES_PER_PAGE = 10;

const Blog = () => {
  const { lang } = useLang();
  const b = blogTranslations;
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sortedArticles = useMemo(
    () => [...blogArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const visibleArticles = useMemo(
    () => sortedArticles.slice(0, visibleCount),
    [sortedArticles, visibleCount]
  );

  const hasMore = visibleCount < sortedArticles.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={{
          en: "Blog | Web Development, AI & QA Insights",
          el: "Ιστολόγιο | Ανάπτυξη Ιστοσελίδων, AI & QA",
          de: "Blog | Webentwicklung, KI & QA Einblicke",
        }}
        description={{
          en: "Practical articles on custom web development, AI-driven builds, ISTQB quality assurance, performance and green code from the DevCraft team.",
          el: "Πρακτικά άρθρα για custom ανάπτυξη ιστοσελίδων, AI, διασφάλιση ποιότητας ISTQB, ταχύτητα και green code από την ομάδα DevCraft.",
          de: "Praxisnahe Artikel zu individueller Webentwicklung, KI-gestützter Umsetzung, ISTQB-Qualitätssicherung, Performance und Green Code von DevCraft.",
        }}
        keywords={{
          en: "web development blog, AI development articles, ISTQB QA testing blog, website performance, green code, CSRD, SEO for websites",
          el: "blog κατασκευής ιστοσελίδων, άρθρα AI, ISTQB QA, ταχύτητα ιστοσελίδας, green code, SEO",
          de: "webentwicklung blog, KI artikel, ISTQB QA testing, website performance, green code, CSRD, SEO",
        }}
        canonical="/blog"
        type="website"
      />

      <Navbar />
      <main id="main-content" className="pt-32 lg:pt-28 pb-20">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-4">
              {t(b.heading, lang)}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t(b.subheading, lang)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {visibleArticles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i, 9) * 0.1 }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block h-full rounded-2xl border border-border/30 bg-card p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(38_100%_55%/0.2)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                    {t(article.category, lang)}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mt-3 mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(article.title, lang)}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {t(article.excerpt, lang)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground/60 text-xs font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {t(article.readTime, lang)} {t(b.minRead, lang)}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-primary text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className="font-mono text-sm"
              >
                {lang === "el" ? "Φόρτωση περισσότερων" : lang === "de" ? "Mehr laden" : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Blog;
