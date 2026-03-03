import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const AnimatedCounter = ({ value, suffix, delay }: { value: number; suffix: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
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
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-6xl font-bold text-gradient-gold tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-card border border-border rounded-3xl p-10 md:p-20 overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-px h-[200px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-px h-[200px] bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 relative">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.15} />
                <div className="text-muted-foreground text-sm font-medium mt-3">{stat.label}</div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
