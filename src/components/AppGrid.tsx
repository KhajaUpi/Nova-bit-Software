import { motion } from "motion/react";
import { Smartphone, Terminal, LayoutTemplate } from "lucide-react";

export function AppGrid() {
  const apps = [
    {
      title: "Focus Timer",
      status: "In Development",
      icon: <Smartphone className="w-5 h-5" />,
      desc: "A distraction-free pomodoro utility tailored for deep work."
    },
    {
      title: "Dev Notes",
      status: "Concept",
      icon: <Terminal className="w-5 h-5" />,
      desc: "Local-first markdown scratchpad for engineers and thinkers."
    },
    {
      title: "Portfolio Template",
      status: "Planned",
      icon: <LayoutTemplate className="w-5 h-5" />,
      desc: "An open-source minimal portfolio template for creatives."
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-sm font-semibold tracking-widest text-zinc-500 uppercase mb-8"
      >
        Upcoming Projects
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apps.map((app, i) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="group px-6 py-8 border border-zinc-800 rounded-[1.5rem] bg-zinc-900/40 hover:border-zinc-700 transition-colors cursor-default shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-zinc-400 bg-zinc-950 border border-zinc-800 p-2.5 rounded-[0.85rem]">{app.icon}</div>
              <span className="text-xs font-medium text-zinc-500 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-full">{app.status}</span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{app.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">{app.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
