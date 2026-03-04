import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We may collect the following types of information when you visit our website or use our services:\n\n• **Personal Information**: Name, email address, phone number, and other contact details you voluntarily provide through forms or email.\n• **Usage Data**: Browser type, IP address, pages visited, time spent on the site, and referring URLs.\n• **Cookies & Tracking**: Small data files stored on your device to improve functionality and analyze traffic patterns.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the collected information for the following purposes:\n\n• To provide, maintain, and improve our services\n• To respond to inquiries and communicate with you\n• To analyze website usage and optimize user experience\n• To comply with legal obligations\n• To send occasional updates about our services (with your consent)`,
  },
  {
    title: "3. Cookies",
    content: `Our website uses cookies to:\n\n• Remember your preferences and settings\n• Understand how you interact with our site\n• Improve website performance and functionality\n\nYou can control cookie settings through your browser. Disabling cookies may affect some website features.`,
  },
  {
    title: "4. Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share data with:\n\n• **Service providers** who assist in operating our website and services\n• **Legal authorities** when required by law or to protect our rights\n• **Analytics partners** (e.g., Google Analytics) in anonymized form`,
  },
  {
    title: "5. Data Security",
    content: `We implement industry-standard security measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "6. Your Rights",
    content: `Under applicable data protection laws (including GDPR), you have the right to:\n\n• Access, correct, or delete your personal data\n• Withdraw consent at any time\n• Object to or restrict data processing\n• Request data portability\n\nTo exercise these rights, contact us at contact@devcraft.gr.`,
  },
  {
    title: "7. Third-Party Links",
    content: `Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these external websites.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have questions about this Privacy Policy, please contact us:`,
    contactInfo: true,
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="Privacy Policy | DevCraft"
        description="DevCraft Privacy Policy — how we collect, use, and protect your personal information. GDPR compliant."
        canonical="/privacy-policy"
      />
      <Navbar />
      <main>

      <section className="relative pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] amber-drift" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-10 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-6">
              Privacy
              <br />
              <span className="text-gradient">Policy.</span>
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container max-w-3xl">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-foreground mb-3">
                {section.title}
              </h2>
              <div className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                {section.content.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-foreground/80 font-semibold">{part}</strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </div>
              {section.contactInfo && (
                <div className="mt-4 flex flex-col gap-2 text-sm md:text-base text-muted-foreground">
                  <p>• <strong className="text-foreground/80 font-semibold">Email</strong>: <a href="mailto:contact@devcraft.gr" className="text-primary hover:underline transition-colors">contact@devcraft.gr</a></p>
                  <p>• <strong className="text-foreground/80 font-semibold">Phone</strong>: <a href="tel:+306974776057" className="text-primary hover:underline transition-colors">+30 697 477 6057</a></p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
