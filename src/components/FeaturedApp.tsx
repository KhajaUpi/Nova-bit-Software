import { motion } from "motion/react";
import { ArrowRight, Monitor } from "lucide-react";

export function FeaturedApp() {
  return (
    <section id="featured" className="w-full max-w-5xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-sm font-semibold tracking-widest text-zinc-500 uppercase mb-8"
      >
        Featured Release
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="group relative bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-xl hover:shadow-2xl transition-all"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg">
               <Monitor className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-medium text-white tracking-tight mb-3">Zenith Screensaver</h2>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                A beautiful, minimalist screensaver crafted to turn your idle displays into elegant ambient focal points. Features dynamic clock modes, smooth transitions, and subtle spatial effects.
              </p>
            </div>
            
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent px-6 py-3 rounded-full transition-all cursor-pointer shadow-lg shadow-indigo-600/20">
              Download Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="flex-1 w-full bg-zinc-950 rounded-2xl aspect-video border border-zinc-800 flex items-center justify-center relative overflow-hidden shadow-inner">
             {/* Abstract visual for screensaver */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-zinc-950" />
             <div className="relative text-zinc-800 font-mono text-sm uppercase tracking-[0.25em]">Idle state</div>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-64 h-64 border border-zinc-900 rounded-full opacity-30"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-48 h-48 border border-zinc-900 rounded-full opacity-30"
             />
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute w-32 h-32 bg-indigo-500 rounded-full blur-3xl"
             />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
