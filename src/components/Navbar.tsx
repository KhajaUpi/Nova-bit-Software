import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100/50"
    >
      <div className="text-xl font-semibold tracking-tight text-gray-100 cursor-pointer flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-mono text-base shadow-lg shadow-indigo-500/20">
          N
        </div>
        <span>Nova <span className="text-indigo-500">Bit</span></span>
      </div>
      <div className="flex gap-6 text-sm font-medium text-gray-400">
        <a href="#featured" className="hover:text-white transition-colors">Screensaver</a>
        <a href="#android-apps" className="hover:text-white transition-colors whitespace-nowrap">Android Apps</a>
        <a href="#feedback" className="hover:text-indigo-400 transition-colors">Feedback & Ideas</a>
      </div>
    </motion.nav>
  );
}
