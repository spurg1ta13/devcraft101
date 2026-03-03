import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projects Shipped" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 50, suffix: "+", label: "Global Clients" },
  { value: 5, suffix: "★", label: "Avg. Rating" },
];

const AnimatedCounter = ({ value, suffix, delay }: { value: number; suffix: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.03em] text-gradient-gold tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.12} />
              <p className="text-muted-foreground text-sm font-medium mt-2">{stat.label}</p>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
