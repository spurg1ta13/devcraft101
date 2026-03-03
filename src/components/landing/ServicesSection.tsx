import { motion } from "framer-motion";
import { Code2, Palette, ShieldCheck, Layers, Zap, Globe } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    subtitle: "Full-Stack Applications",
    description: "Scalable apps with React, Node.js, and cloud-native architecture. We write code that lasts.",
    tags: ["React", "TypeScript", "APIs", "Cloud"],
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "Pixel-Perfect Interfaces",
    description: "User-centered design that converts. Research-driven decisions, not guesswork.",
    tags: ["Figma", "Prototyping", "Systems"],
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "QA Testing",
    subtitle: "ISTQB Certified",
    description: "Rigorous testing by certified engineers. We catch bugs before your users do.",
    tags: ["Manual", "Automation", "Security"],
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Zap,
    title: "Performance",
    subtitle: "Optimization & Speed",
    description: "Sub-second load times, perfect Lighthouse scores. We make things fly.",
    tags: ["Core Vitals", "Audits"],
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Globe,
    title: "Deployment",
    subtitle: "Launch & Scale",
    description: "CI/CD pipelines, cloud infrastructure, and monitoring from day one.",
    tags: ["AWS", "Docker", "CI/CD"],
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
];

const ServicesSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-wider uppercase block mb-4"
            >
              [01] — Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.02em] leading-[1]"
            >
              What we
              <br />
              <span className="text-gradient-cool">do best</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed"
          >
            End-to-end development services with obsessive attention to quality at every stage.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-default ${service.span} ${
                service.featured ? "min-h-[360px] md:min-h-[440px]" : "min-h-[200px] md:min-h-[220px]"
              }`}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-card border border-border/50 rounded-2xl md:rounded-3xl group-hover:border-primary/15 transition-all duration-700" />
              
              {/* Corner glow on hover */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/[0.06] blur-3xl"
                animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1.5 : 1 }}
                transition={{ duration: 0.6 }}
              />

              <div className={`relative h-full flex flex-col justify-between ${service.featured ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`${service.featured ? "w-14 h-14" : "w-11 h-11"} rounded-2xl bg-secondary flex items-center justify-center border border-border/50`}
                      whileHover={{ rotate: -8 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <service.icon className={`${service.featured ? "h-6 w-6" : "h-5 w-5"} text-primary`} />
                    </motion.div>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold tracking-tight mb-1 ${service.featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
                    {service.title}
                  </h3>
                  <p className="font-mono text-[11px] text-primary/80 tracking-wide mb-4">{service.subtitle}</p>
                  <p className={`text-muted-foreground leading-relaxed ${service.featured ? "text-sm md:text-base max-w-sm" : "text-xs"}`}>
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider text-muted-foreground/70 px-2.5 py-1 rounded-lg bg-secondary/60 border border-border/30 group-hover:border-primary/10 transition-colors duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
