import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "50+", label: "Happy Clients" },
  { value: "24/7", label: "Support Available" },
];

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="bg-gradient-card border border-border rounded-2xl p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
