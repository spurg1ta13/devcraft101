import { motion } from "framer-motion";
import { Code2, Palette, ShieldCheck, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. Scalable architecture, clean code, and blazing-fast performance that grows with your business.",
    features: ["React & Next.js", "API Development", "Database Design", "Cloud Deployment"],
  },
  {
    icon: Palette,
    title: "Custom UI/UX Design",
    description:
      "Interfaces that users love. We blend aesthetics with usability to create designs that convert visitors into loyal customers.",
    features: ["User Research", "Wireframing", "Visual Design", "Design Systems"],
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "ISTQB-certified engineers rigorously test every feature before release. We catch bugs so your users never have to.",
    features: ["Functional Testing", "Performance Testing", "Security Audits", "Automation"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const ServicesSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
              Services
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Everything You Need
            <br />
            <span className="text-muted-foreground">Under One Roof.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative bg-gradient-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
