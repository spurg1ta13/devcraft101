import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const services = [
  {
    number: "01",
    title: "Development",
    scope: "Full-Stack Web Applications",
    description: "React, TypeScript, Node.js, cloud-native architecture. Code that scales with your ambition.",
    image: showcase1,
  },
  {
    number: "02",
    title: "Design",
    scope: "Custom UI/UX Interfaces",
    description: "Research-driven design that converts. Not templates — bespoke digital experiences.",
    image: showcase2,
  },
  {
    number: "03",
    title: "Quality",
    scope: "ISTQB-Certified Testing",
    description: "Certified engineers test every feature before it touches your users. Zero-defect launches.",
    image: showcase3,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative section-rhythm">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6">
            What we do
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Three things.
            <br />
            <span className="text-gradient">Done right.</span>
          </h2>
        </motion.div>

        {/* Service rows — hover-reveal with floating image */}
        <div className="border-t border-border/30">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="service-row relative border-b border-border/30 py-8 md:py-10 flex items-center gap-6 md:gap-12 cursor-pointer group hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] rounded-2xl">
                {/* Number */}
                <span className="service-number font-mono text-xs text-muted-foreground/40 transition-colors duration-500 w-8 shrink-0">
                  {service.number}
                </span>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-5xl font-black tracking-[-0.04em] group-hover:text-gradient transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="font-mono text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-[0.1em]">
                    {service.scope}
                  </p>
                </div>

                {/* Description - visible on md+ */}
                <p className="hidden lg:block text-sm text-foreground/70 max-w-xs leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <ArrowUpRight className="service-arrow h-5 w-5 text-muted-foreground/30 transition-all duration-500 shrink-0" />

                {/* Floating image on hover */}
                <div className="service-image absolute right-20 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-3xl overflow-hidden opacity-0 scale-90 transition-all duration-700 pointer-events-none hidden lg:block z-0">
                  <img src={service.image} alt="" className="w-full h-full object-cover opacity-30" style={{ mixBlendMode: "screen" }} />
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
