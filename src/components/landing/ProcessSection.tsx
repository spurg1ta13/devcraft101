import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discover", description: "We learn your goals, audience, and technical requirements through deep-dive sessions." },
  { number: "02", title: "Design", description: "Custom UI/UX designs crafted for your brand — wireframes to high-fidelity prototypes." },
  { number: "03", title: "Develop", description: "Clean, scalable code built with modern tech stacks. Iterative sprints with full transparency." },
  { number: "04", title: "Test & Deploy", description: "ISTQB-certified QA ensures zero surprises. We test, optimize, and launch with confidence." },
];

const ProcessSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="glow-line w-full mb-24" />
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
              Process
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            How We Work.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <span className="font-display text-6xl font-bold text-primary/10 mb-4 block">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
