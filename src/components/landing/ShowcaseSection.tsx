import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const projects = [
  { title: "Crystal Platform", tag: "Web App · React", image: showcase1 },
  { title: "Neural Architecture", tag: "Design System · Figma", image: showcase2 },
  { title: "Fluid Commerce", tag: "E-Commerce · Next.js", image: showcase3 },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = value / 30;
    const id = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 40);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

const ShowcaseSection = () => {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="container">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-28 md:mb-36"
        >
          {[
            { value: 150, suffix: "+", label: "Projects" },
            { value: 99, suffix: "%", label: "Retention" },
            { value: 12, suffix: "+", label: "Years" },
            { value: 50, suffix: "+", label: "Clients" },
          ].map((stat, i) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-gradient mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Showcase heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-6">
            Selected work
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Built to
            <br />
            <span className="text-muted-foreground">stand out.</span>
          </h2>
        </motion.div>

        {/* Project cards — staggered grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group cursor-pointer ${i === 1 ? "md:mt-12" : ""}`}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-5 bg-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-lg font-bold tracking-[-0.02em] group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
                {project.tag}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
