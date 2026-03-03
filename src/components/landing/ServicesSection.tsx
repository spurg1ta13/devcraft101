import { motion } from "framer-motion";
import { Code2, Palette, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. Scalable architecture, clean code, and blazing-fast performance that grows with your business.",
    features: ["React & Next.js", "API Development", "Database Design", "Cloud Deployment"],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Palette,
    title: "Custom UI/UX Design",
    description:
      "Interfaces that users love. We blend aesthetics with usability to create designs that convert visitors into loyal customers.",
    features: ["User Research", "Wireframing", "Visual Design", "Design Systems"],
    gradient: "from-primary/15 to-primary/5",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "ISTQB-certified engineers rigorously test every feature before release. We catch bugs so your users never have to.",
    features: ["Functional Testing", "Performance Testing", "Security Audits", "Automation"],
    gradient: "from-primary/10 to-primary/5",
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-px bg-primary"
            />
            <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
              Services
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-muted-foreground mt-1">
            Under One Roof.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative rounded-2xl overflow-hidden hover-lift"
            >
              {/* Card background with border glow */}
              <div className="absolute inset-0 bg-gradient-card transition-all duration-500 group-hover:bg-gradient-card-hover" />
              <div className="absolute inset-0 rounded-2xl border border-border group-hover:border-primary/20 transition-colors duration-500" />
              
              {/* Hover glow effect */}
              <motion.div
                className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl`}
                animate={{
                  opacity: hoveredIndex === i ? 0.8 : 0,
                  scale: hoveredIndex === i ? 1 : 0.5,
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative p-8 lg:p-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="h-7 w-7 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: hoveredIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                </div>

                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-gradient-gold transition-all duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((f, fi) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + fi * 0.05 }}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground border border-border/50 group-hover:border-primary/10 transition-colors duration-300"
                    >
                      {f}
                    </motion.span>
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
