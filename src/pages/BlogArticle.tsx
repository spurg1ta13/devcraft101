import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";
import { t } from "@/i18n/translations";
import { blogTranslations, blogArticles } from "@/i18n/blogTranslations";
import { lazy, Suspense, useEffect } from "react";
import LandingPageAnimation from "@/components/blog/LandingPageAnimation";

const Footer = lazy(() => import("@/components/landing/Footer"));

const BlogArticleSchema = ({ article, lang }: { article: typeof blogArticles[0]; lang: string }) => {
  // Estimate word count from content
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
    image: {
      "@type": "ImageObject",
      url: "https://devcraft.gr/og-image.jpg",
      width: 1920,
      height: 1080,
    },
    author: {
      "@type": "Organization",
      name: "DevCraft",
      url: "https://devcraft.gr",
    },
    publisher: {
      "@type": "Organization",
      name: "DevCraft",
      logo: {
        "@type": "ImageObject",
        url: "https://devcraft.gr/devcraft-logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devcraft.gr/blog/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
    inLanguage: lang === "el" ? "el-GR" : "en-US",
    articleSection: t(article.category, lang as "en" | "el"),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const b = blogTranslations;

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
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
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
          publishedTime: article.date,
          modifiedTime: article.date,
          author: "DevCraft",
          section: t(article.category, lang),
          tags: article.keywords,
        }}
      />
      <BlogArticleSchema article={article} lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://devcraft.gr/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://devcraft.gr/blog" },
              { "@type": "ListItem", position: 3, name: t(article.title, lang as "en" | "el"), item: `https://devcraft.gr/blog/${article.slug}` },
            ],
          }),
        }}
      />
      <Navbar />
      <main id="main-content" className="pt-32 lg:pt-28 pb-20">
        <div className="container px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                <LandingPageAnimation />
              )}
              {renderContent(article.content[lang])}
            </article>

            <div className="mt-16 pt-8 border-t border-border/30">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:brightness-110 transition-all font-mono text-sm min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                {t(b.backToBlog, lang)}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BlogArticle;
