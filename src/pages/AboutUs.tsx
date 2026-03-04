import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, Code2, Palette, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const team = [
  {
    role: "Web Developer",
    icon: Code2,
    description: "Result-oriented full-stack developer with deep expertise in modern frameworks and cloud-native architecture.",
  },
  {
    role: "UI/UX Designer",
    icon: Palette,
    description: "Certified designer crafting intuitive interfaces that turn complex workflows into seamless user experiences.",
  },
  {
    role: "QA Engineer",
    icon: ShieldCheck,
    description: "ISTQB-accredited tester ensuring every product meets the highest standards of stability and security.",
  },
];

const CounterStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const isNumber = /^\d+/.test(value);
  const numericPart = parseInt(value) || 0;
  const suffix = value.replace(/^\d+/, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isNumber) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, numericPart, { duration: 1.5, delay, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, numericPart, delay, isNumber]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <span ref={ref} className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-primary">
        {isNumber ? (
          <>
            <motion.span>{rounded}</motion.span>
            {suffix}
          </>
        ) : (
          value
        )}
      </span>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
        {label}
      </p>
    </motion.div>
  );
};

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] amber-drift" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-10 hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-8">
              About
              <br />
              <span className="text-primary">us.</span>
            </h1>

            <div className="max-w-3xl">
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
                We are an enthusiastic team of professionals with 10 years of successful experience in the IT industry. A decade of working on international projects allows us to guarantee the highest quality of service.
              </p>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Our core team consists of field experts: a result-oriented Web developer, a certified UI/UX designer and an ISTQB-accredited tester. We strive to deliver modern, fast, and secure products, believing that the final result is our best calling card.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-rhythm border-t border-border/30">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "Zero", label: "Defect Policy" },
            ].map((stat, i) => (
              <CounterStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-rhythm border-t border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-6">
              The team
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
              Core
              <br />
              <span className="text-primary">expertise.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.role}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4 } }}
                  className="group relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-8 md:p-10 hover:border-primary/40 hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] transition-all duration-700"
                >
                  <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-radial from-primary/15 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-all duration-500">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 text-foreground">
                      {member.role}
                    </h3>

                    <p className="text-muted-foreground text-base leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-rhythm border-t border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-6">
              We believe the final result is our best <span className="text-primary">calling card.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every project we take on is a commitment to excellence. We combine technical expertise with creative vision to deliver solutions that exceed expectations.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
