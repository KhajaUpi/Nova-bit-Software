import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Smartphone, Download, Clock, Play, Pause, RefreshCw, 
  Tv, Waves, ShieldCheck, Check, ChevronRight, Info
} from "lucide-react";

interface AndroidApp {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  version: string;
  size: string;
  features: string[];
}

export function AndroidApps() {
  const [activeApp, setActiveApp] = useState<string>("screensaver");
  const [copiedApp, setCopiedApp] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<"phone" | "tablet" | "tv">("phone");

  // App Simulator States
  const [screensaverTheme, setScreensaverTheme] = useState<"ambient" | "nordic" | "cyber">("ambient");
  const [simTime, setSimTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSimTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [timerPosition, setTimerPosition] = useState<{ x: number; y: number }>({ x: 90, y: 160 });
  const simulatorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let t: any;
    if (timerRunning && timerSeconds > 0) {
      t = setInterval(() => {
        setTimerSeconds(s => Math.max(0, s - 1));
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(t);
  }, [timerRunning, timerSeconds]);

  const handleTimerMouseDown = (e: React.MouseEvent) => {
    if (!simulatorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !simulatorRef.current) return;
      const parentRect = simulatorRef.current.getBoundingClientRect();
      let newX = e.clientX - parentRect.left - dragOffset.current.x;
      let newY = e.clientY - parentRect.top - dragOffset.current.y;
      
      const maxX = deviceType === "phone" ? 180 : deviceType === "tablet" ? 320 : 400;
      const maxY = deviceType === "phone" ? 320 : deviceType === "tablet" ? 220 : 180;

      newX = Math.max(10, Math.min(maxX, newX));
      newY = Math.max(50, Math.min(maxY, newY));
      setTimerPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, deviceType]);

  const [playingWaves, setPlayingWaves] = useState<boolean>(false);
  const [waveFrequency, setWaveFrequency] = useState<"delta" | "theta" | "solfeggio">("theta");

  const apps: AndroidApp[] = [
    {
      id: "screensaver",
      title: "Zenith Android Screensaver",
      tagline: "Pure ambient tranquility for idle tablets, phones, and Android TVs.",
      description: "Breathe life into your television or resting device. Zenith brings elegant digital canvases, interactive OLED protection, customized multi-timezone modern typography clocks, and beautiful particle flows to Android.",
      icon: <Tv className="w-5 h-5 text-indigo-400" />,
      version: "v1.2.0",
      size: "4.8 MB",
      features: ["OLED Burn-in protection (pixel shifting)", "Google TV Daydream integration", "Custom font scaling and weight sliders", "Dynamic background gravity generators"]
    },
    {
      id: "timer",
      title: "Float Timer Tracker",
      tagline: "Picture-in-picture dynamic floating overlays, decoupled from boundaries.",
      description: "The ultimate multitasking powerhouse. Place customizable count-up and countdown timer overlays on top of your Zoom meetings, gaming platforms, reading modules, or guides. Simply touch and drag anyway on your screen.",
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      version: "v2.0.4",
      size: "3.2 MB",
      features: ["Fully physics-based dragging overlays", "System-alert window level layering", "Multiple concurrent active streams", "Compact micro widget format"]
    },
    {
      id: "waves",
      title: "Nova Waves Synthesizer",
      tagline: "Pocket-sized real-time customized brainwave frequency modular waves.",
      description: "Designed for micro-breaks, sensory adjustments, or deep resting states. Synthesize customized binaural beats and ambient textures directly on key frequencies. No streaming data required: runs fully natively off-grid.",
      icon: <Waves className="w-5 h-5 text-cyan-400" />,
      version: "v1.0.1",
      size: "8.5 MB",
      features: ["Real-time synth oscillator rendering", "Delta, Theta, and Alpha sound tuning", "Subtle neon color field visual feedback", "Sleep timer built into system logs"]
    }
  ];

  const handleInstallClick = (appId: string) => {
    setCopiedApp(appId);
    setTimeout(() => setCopiedApp(null), 3000);
  };

  const activeAppObj = apps.find(a => a.id === activeApp) || apps[0];

  const nextDevice = () => {
    const sequence: ("phone" | "tablet" | "tv")[] = ["phone", "tablet", "tv"];
    const currentIndex = sequence.indexOf(deviceType);
    setDeviceType(sequence[(currentIndex + 1) % sequence.length]);
  };

  return (
    <section id="android-apps" className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Layout Description and App Selection */}
        <div className="flex-1 space-y-8 w-full">
          <div>
            <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">
              Designed for Mobile & TV
            </div>
            <h2 className="text-4xl font-sans font-medium tracking-tight text-white leading-tight">
              Android Applications
            </h2>
            <p className="mt-4 text-zinc-400 font-light text-base leading-relaxed">
              Premium, single-purpose utilities built specifically for performance, privacy, and visual elegance. Tap an app below to view specifications and interact with the live simulator model.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  activeApp === app.id
                    ? "bg-zinc-900 border-indigo-500 shadow-lg shadow-indigo-500/10"
                    : "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-xl border transition-colors duration-300 ${
                    activeApp === app.id 
                      ? "bg-indigo-500/10 border-indigo-500/20" 
                      : "bg-zinc-950 border-zinc-800"
                  }`}>
                    {app.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm md:text-base">{app.title}</h4>
                    <p className="text-xs text-zinc-500 font-light mt-0.5">{app.tagline}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform ${
                  activeApp === app.id ? "text-indigo-400 font-bold" : ""
                }`} />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAppObj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl shadow-sm space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono bg-zinc-950 text-zinc-400 px-2 py-1 rounded border border-zinc-800">{activeAppObj.version}</span>
                  <span className="text-xs font-mono bg-zinc-950 text-zinc-400 px-2 py-1 rounded border border-zinc-800">{activeAppObj.size}</span>
                  <span className="text-xs flex items-center gap-1 font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Checked Secure
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {activeAppObj.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Core Parameters</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-400">
                  {activeAppObj.features.map(f => (
                    <li key={f} className="flex items-center gap-2 font-light">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleInstallClick(activeAppObj.id)}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download APK File
                </button>
                <div className="text-xs text-zinc-500 font-light flex items-center gap-1 p-2">
                  <Info className="w-4 h-4 text-zinc-600 inline" />
                  Supports Android 10.0+
                </div>
              </div>

              <AnimatePresence>
                {copiedApp === activeAppObj.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-xl flex items-center gap-2 mt-2"
                  >
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span><strong>Setup started successfully:</strong> APK package bundle initialized for local transfer! Direct GitHub releases branch ready.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Device Carousel */}
        <div className="flex-1 w-full flex flex-col items-center justify-center lg:sticky lg:top-8 py-4 overflow-hidden min-h-[600px]">
          <div className="flex items-center justify-between w-full mb-8">
            <div className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse inline-block" /> Live Device Simulator
            </div>
            
            <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-full">
              {(["phone", "tablet", "tv"] as const).map(t => (
                <button
                   key={t}
                   onClick={() => setDeviceType(t)}
                   className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full font-medium transition-all ${
                     deviceType === t ? "bg-indigo-600 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                   }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full flex items-center justify-center">
             <AnimatePresence mode="wait">
               <motion.div
                 key={deviceType}
                 initial={{ opacity: 0, scale: 0.8, rotateY: -30, x: 50 }}
                 animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                 exit={{ opacity: 0, scale: 0.8, rotateY: 30, x: -50 }}
                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 onClick={nextDevice}
                 className="relative group cursor-pointer perspective-1000"
               >
                 {/* 3D-ish Frame */}
                 <div className={`relative bg-neutral-900 p-1 border-[4px] border-neutral-800 shadow-2xl transition-all duration-500 ${
                   deviceType === "phone" ? "w-[240px] h-[480px] rounded-[2.5rem]" :
                   deviceType === "tablet" ? "w-[400px] h-[280px] rounded-[1.5rem]" :
                   "w-[500px] h-[300px] rounded-[0.5rem] border-zinc-800 bg-zinc-900"
                 }`}>
                   {/* Notch/Camera for Phone only */}
                   {deviceType === "phone" && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black w-20 h-4 rounded-full flex items-center justify-center z-50">
                      <div className="w-6 h-0.5 bg-neutral-800 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-neutral-900 border border-indigo-950/40 rounded-full ml-1.5" />
                    </div>
                   )}

                   {/* Screen Canvas */}
                   <div 
                     ref={simulatorRef}
                     className={`w-full h-full bg-zinc-950 overflow-hidden flex flex-col relative transition-all duration-500 ${
                       deviceType === "phone" ? "rounded-[2.25rem] pt-7" :
                       deviceType === "tablet" ? "rounded-[1.25rem] pt-4" :
                       "rounded-[0.25rem] pt-4"
                     }`}
                   >
                     {/* Status Bar */}
                     <div className="absolute top-1 left-0 right-0 px-6 flex justify-between items-center text-[9px] font-mono text-zinc-500 z-40">
                        <span>09:41</span>
                        <div className="flex items-center gap-1">
                          <span>5G</span>
                          <div className="w-3 h-1.5 border border-zinc-600 rounded-sm" />
                        </div>
                     </div>

                     {/* App Content */}
                     <div className="flex-1 relative">
                       {/* Same Logic as before but responsive to width */}
                       <AnimatePresence mode="wait">
                         {activeApp === "screensaver" && (
                           <motion.div className="absolute inset-0 flex flex-col justify-between p-4 pb-6 overflow-hidden">
                             <div className={`absolute inset-0 transition-all duration-700 ${
                                screensaverTheme === "ambient" ? "bg-gradient-to-br from-indigo-950 via-zinc-950 to-purple-950/80" :
                                screensaverTheme === "nordic" ? "bg-gradient-to-br from-slate-900 via-neutral-950 to-sky-950/60" :
                                "bg-gradient-to-br from-rose-950/60 via-zinc-950 to-violet-950"
                             }`} />
                             
                             <div className="relative text-center text-[8px] font-mono tracking-widest text-[#a5b4fc]/40 mt-2 uppercase">
                               Zenith Ambient Hub
                             </div>

                             <div className="relative my-auto flex flex-col items-center">
                               <h3 className="text-3xl lg:text-4xl font-light tracking-tighter text-white tabular-nums">
                                 {simTime || "12:45:00"}
                               </h3>
                               <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-1">May 31 • Sunday</p>
                             </div>

                             <div className="relative z-20 flex gap-1 justify-center">
                               {(["ambient", "nordic", "cyber"] as const).map(t => (
                                 <button
                                   key={t}
                                   onClick={(e) => { e.stopPropagation(); setScreensaverTheme(t); }}
                                   className={`p-1.5 rounded-lg text-[7px] font-mono transition-all ${
                                     screensaverTheme === t ? "bg-white text-black font-bold" : "bg-white/5 text-zinc-500 hover:bg-white/10"
                                   }`}
                                 >
                                   {t.toUpperCase()}
                                 </button>
                               ))}
                             </div>
                           </motion.div>
                         )}

                         {activeApp === "timer" && (
                           <motion.div className="absolute inset-0 bg-zinc-950 flex flex-col p-4 overflow-hidden">
                             <div className="absolute inset-0 grid grid-cols-6 gap-2 p-2 opacity-10">
                               {Array.from({ length: 30 }).map((_, i) => (
                                 <div key={i} className="aspect-square bg-zinc-700 rounded-lg" />
                               ))}
                             </div>
                             
                             <div 
                               onMouseDown={handleTimerMouseDown}
                               style={{ left: timerPosition.x, top: timerPosition.y }}
                               className="absolute z-30 bg-emerald-950/90 text-emerald-300 p-2 py-3 rounded-2xl border border-emerald-500/30 shadow-xl cursor-grab text-center flex flex-col gap-1 w-20 pointer-events-auto"
                               onClick={(e) => e.stopPropagation()}
                             >
                                <span className="text-[10px] font-bold tabular-nums">
                                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
                                </span>
                                <div className="flex justify-center gap-1">
                                  <div className="bg-emerald-800 p-0.5 rounded cursor-pointer" onClick={() => setTimerRunning(!timerRunning)}>
                                     {timerRunning ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                                  </div>
                                  <div className="bg-emerald-800 p-0.5 rounded cursor-pointer" onClick={() => setTimerSeconds(25*60)}>
                                     <RefreshCw className="w-2.5 h-2.5" />
                                  </div>
                                </div>
                             </div>
                           </motion.div>
                         )}

                         {activeApp === "waves" && (
                           <motion.div className="absolute inset-0 bg-slate-950 flex flex-col p-4 overflow-hidden">
                              <div className="flex-1 flex flex-col items-center justify-center relative">
                                <motion.div 
                                  animate={{ scale: playingWaves ? [1, 1.2, 1] : 1, opacity: playingWaves ? [0.3, 0.6, 0.3] : 0.3 }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                  className="w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl absolute"
                                />
                                <div className="text-center z-10">
                                   <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">{waveFrequency}</span>
                                   <button 
                                      onClick={(e) => { e.stopPropagation(); setPlayingWaves(!playingWaves); }}
                                      className={`mt-4 px-4 py-1.5 rounded-full text-[9px] font-bold transition-all flex items-center gap-1 mx-auto ${
                                        playingWaves ? "bg-cyan-500 text-black" : "bg-white/10 text-white"
                                      }`}
                                   >
                                      {playingWaves ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                                      {playingWaves ? "STOP" : "START"}
                                   </button>
                                </div>
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                     
                     <div className="h-1 w-1/3 bg-zinc-800 mx-auto mb-1.5 rounded-full" />
                   </div>
                 </div>

                 {/* Decorative elements to show "Carousel" depth */}
                 <div className="absolute -z-10 -right-8 top-1/2 -translate-y-1/2 w-full h-[80%] bg-zinc-900/40 rounded-3xl blur-xl" />
               </motion.div>
             </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
             <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
                Tap device to rotate carousel
             </div>
             <div className="flex gap-1.5">
               {(["phone", "tablet", "tv"] as const).map(t => (
                 <div key={t} className={`h-1 rounded-full transition-all duration-300 ${deviceType === t ? "w-6 bg-indigo-500" : "w-1.5 bg-zinc-800"}`} />
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
