import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tight text-white leading-tight mb-6">
          Crafting tools <br className="hidden md:block"/> for the modern canvas.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
          Welcome to <strong>Nova Bit Software</strong>. This is the centralized home and portfolio for all my upcoming utility applications, focus widgets, and interactive screen modules—starting with our ambient screensavers.
        </p>
      </motion.div>
    </section>
  );
}
