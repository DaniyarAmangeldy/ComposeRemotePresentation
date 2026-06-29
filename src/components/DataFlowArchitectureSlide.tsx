import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Globe, 
  Wifi, 
  Cloud,
  ChevronLeft
} from "lucide-react";

interface DataFlowArchitectureSlideProps {
  isActive: boolean;
}

export default function DataFlowArchitectureSlide({ isActive }: DataFlowArchitectureSlideProps) {
  const [localTime, setLocalTime] = useState(0);
  const isFirstRun = useRef(true);

  // High-fidelity infinite frame clock (12 seconds loop)
  useEffect(() => {
    if (!isActive) {
      setLocalTime(0);
      isFirstRun.current = true;
      return;
    }

    let frameId: number;
    let lastStamp = performance.now();

    const tick = (now: number) => {
      const delta = now - lastStamp;
      lastStamp = now;

      setLocalTime((prev) => {
        const next = prev + delta;
        if (next >= 14200) {
          isFirstRun.current = false;
          return 0; // Seamless loop restart
        }
        return next;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isActive]);

  // Fast-paced derived timeline stages (14200ms Cycle)
  // Scene 1: Server Code Editor Focus (0ms to 3000ms)
  // Scene 2: Serialization & Network Focus (3000ms to 7500ms)
  //   - Subphase A: Laser transmission (3000ms to 4600ms)
  //   - Subphase B: Zoom / Focus on Document (4600ms to 6800ms)
  //   - Subphase C: Cool down & move to phone (6800ms to 7500ms)
  // Scene 3: Smartphone Render Focus (7500ms to 10500ms)
  // Scene 4: Combined Harmony View (10500ms to 13500ms)
  // Scene 5: Fast Fadeout Reset (13500ms to 14200ms)

  const isScene1 = localTime < 3000;
  const isScene2 = localTime >= 3000 && localTime < 7500;
  const isScene3 = localTime >= 7500 && localTime < 10500;
  const isScene4 = localTime >= 10500 && localTime < 13500;
  const isScene5 = localTime >= 13500;

  const isDocFocused = isScene2 && localTime >= 4600 && localTime < 6800;

  // Snappy coordinates with fast springs
  let serverX = -280;
  let serverScale = 0.9;
  let serverOpacity = 1.0;

  let transX = 0;
  let transScale = 0.9;
  let transOpacity = 1.0;

  let clientX = 280;
  let clientScale = 0.9;
  let clientOpacity = 1.0;

  if (isScene1) {
    // Focus Kotlin Server code editor in center
    serverX = 0;
    serverScale = 1.15;
    // Hide the center coordinate jump on reset, then fade in beautifully
    serverOpacity = isFirstRun.current ? 1.0 : (localTime < 350 ? 0.0 : 1.0);

    transX = 0;
    transScale = 0.5;
    transOpacity = 0.0;

    clientX = 280;
    clientScale = 0.5;
    clientOpacity = 0.0;
  } else if (isScene2) {
    if (isDocFocused) {
      // Document Zoom Focus - Centers at scale 2.4, scaling down code & phone
      serverX = -280;
      serverScale = 0.65;
      serverOpacity = 0.08;

      transX = 0;
      transScale = 2.4;
      transOpacity = 1.0;

      clientX = 280;
      clientScale = 0.65;
      clientOpacity = 0.08;
    } else {
      // Normal serialization view setup & cool down
      serverX = -280;
      serverScale = 0.85;
      serverOpacity = 0.4;

      transX = 0;
      transScale = 1.15;
      transOpacity = 1.0;
      
      clientX = 280;
      clientScale = 0.8;
      clientOpacity = 0.3;
    }
  } else if (isScene3) {
    // Smartphone rendered client viewport focus
    serverX = -280;
    serverScale = 0.75;
    serverOpacity = 0.1;

    transX = 0;
    transScale = 0.75;
    transOpacity = 0.1;

    clientX = 0;
    clientScale = 1.25;
    clientOpacity = 1.0;
  } else if (isScene4) {
    // Overview
    serverX = -280;
    serverScale = 0.9;
    serverOpacity = 1.0;

    transX = 0;
    transScale = 0.9;
    transOpacity = 1.0;

    clientX = 280;
    clientScale = 0.9;
    clientOpacity = 1.0;
  } else {
    // Seamless dissolve reset
    serverX = -280;
    serverScale = 0.9;
    serverOpacity = 0.0;

    transX = 0;
    transScale = 0.9;
    transOpacity = 0.0;

    clientX = 280;
    clientScale = 0.9;
    clientOpacity = 0.0;
  }

  // Laser beam coordinates
  const isTransmitting = isScene2 && (localTime >= 3000 && localTime < 4600);
  const laserProgress = isTransmitting ? (localTime - 3000) / 1600 : 0;
  const showDocumentFile = localTime >= 2400 && localTime < 13500;

  // UI state inside the smartphone mockup
  const isSkeletonPhase = isScene3 && (localTime < 8900);
  const isRenderedPhase = (isScene3 && (localTime >= 8900)) || isScene4;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white text-slate-800 select-none overflow-hidden px-4">
      
      {/* High-Fi Cinematic Animation stage frame */}
      <div className="w-full max-w-5xl h-[460px] flex items-center justify-center relative bg-white">
        
        {/* Horizontal rail vector path */}
        {localTime < 13500 && (
          <div className="absolute inset-x-0 w-full flex justify-between items-center px-16 text-neutral-100 pointer-events-none">
            <div className="w-full h-px bg-slate-100" />
          </div>
        )}

        <div className="w-full relative h-full flex items-center justify-center">
          
          {/* COLUMN 1: KOTLIN COMPOSE SERVER DSL EDITOR (Aligned down in size) */}
          <motion.div 
            initial={{
              x: 0,
              scale: 1.15,
              opacity: 1.0
            }}
            animate={{
              x: serverX,
              scale: serverScale,
              opacity: serverOpacity,
              zIndex: isScene1 ? 30 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 17,
              mass: 0.8
            }}
            className="absolute w-[320px] flex-shrink-0 flex flex-col items-start font-sans"
          >
            <div className="w-full h-[310px] bg-[#0A0B10] rounded-2xl p-5 shadow-[0_15px_35px_rgba(10,11,16,0.1)] border border-slate-900/65 flex flex-col justify-start relative overflow-hidden">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[#1F2937]/50 pb-2.5 mb-3.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider ml-1">RemoteTree.kt</span>
                </div>
                <div className="flex items-center gap-1 opacity-75">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-blue-500 uppercase font-bold tracking-widest">Compiling</span>
                </div>
              </div>

              {/* JETPACK COMPOSE SOURCE */}
              <div className="flex-grow font-mono text-[9px]/[12.5px] text-zinc-300 flex flex-col space-y-0.5 overflow-hidden pointer-events-auto">
                <div>
                  <span className="text-zinc-500">@Composable</span>
                </div>
                <div>
                  <span className="text-[#F18C8E]">fun</span> <span className="text-[#FFCD90]">DefaultDetailContent</span>(
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">modifier: </span>
                  <span className="text-[#86E3CE]">RemoteModifier</span> = 
                  <span className="text-[#FFCD90]"> Modifier</span>
                </div>
                <div>
                  ) {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-[#86E3CE]">Column</span>(
                </div>
                <div className="pl-8 text-zinc-400">
                  modifier
                </div>
                <div className="pl-12 text-[#9AD3BC]">
                  .fillMaxWidth()
                </div>
                <div className="pl-12 text-[#9AD3BC]">
                  .padding(<span className="text-[#F18C8E]">20.dp</span>, <span className="text-[#F18C8E]">8.dp</span>, <span className="text-[#F18C8E]">20.dp</span>, <span className="text-[#F18C8E]">8.dp</span>),
                </div>
                <div className="pl-8 text-zinc-400">
                  horizontalAlignment = <span className="text-[#FFCD90]">Alignment</span>.CenterHorizontally
                </div>
                <div className="pl-4">
                  ) {"{"}
                </div>

                <div className="pl-8 text-zinc-400">
                  <span className="text-[#86E3CE]">Text</span>(
                </div>
                <div className="pl-12 text-teal-300">
                  "Under Construction"<span className="text-zinc-400">,</span>
                </div>
                <div className="pl-12 text-zinc-400">
                  color = <span className="text-[#86E3CE]">COLOR_ON_SURFACE</span>.rc,
                </div>
                <div className="pl-12 text-zinc-400">
                  fontSize = <span className="text-[#F18C8E]">20.sp</span>,
                </div>
                <div className="pl-12 text-zinc-400">
                  fontWeight = <span className="text-[#FFCD90]">FontWeight</span>.Bold,
                </div>
                <div className="pl-12 text-zinc-400">
                  fontFamily = <span className="text-teal-300">"Geist"</span>
                </div>
                <div className="pl-8">
                  )
                </div>
                <div className="pl-4">{"}"}</div>
              </div>

            </div>
          </motion.div>

          {/* COLUMN 2: SERIALLY ENCODED FILE & VECTOR PIPELINE */}
          <motion.div 
            initial={{
              x: 0,
              scale: 0.5,
              opacity: 0.0
            }}
            animate={{
              x: transX,
              scale: transScale,
              opacity: transOpacity,
              zIndex: isScene2 ? 30 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 17,
              mass: 0.8
            }}
            className="absolute w-[180px] flex flex-col items-center justify-center h-full"
          >
            {/* Cable Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-4 h-[1px] bg-neutral-100" />

            {/* LASER BEAM */}
            {isTransmitting && (
              <div 
                className="absolute top-1/2 -translate-y-[18px] h-[3px] rounded-full bg-gradient-to-r from-transparent via-sky-400 to-blue-500 shadow-[0_0_15px_#38bdf8,_0_0_25px_#4f46e5] pointer-events-none transition-all duration-75"
                style={{
                  left: `calc(${laserProgress * 100}% - 40px)`,
                  width: '80px'
                }}
              />
            )}

            {/* Micro bubbles of transmission flow */}
            <AnimatePresence>
              {isScene2 && (
                <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 25, scale: 0.5 }}
                    animate={{ opacity: [0, 0.5, 0], y: -35, x: -10 }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.1 }}
                    className="absolute text-sky-400/70"
                    style={{ left: "20%", top: "40%" }}
                  >
                    <Globe className="w-3 h-3" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 25, scale: 0.5 }}
                    animate={{ opacity: [0, 0.5, 0], y: -40, x: 10 }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.2 }}
                    className="absolute text-cyan-400/70"
                    style={{ left: "50%", top: "35%" }}
                  >
                    <Cloud className="w-3 h-3" />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 25, scale: 0.4 }}
                    animate={{ opacity: [0, 0.6, 0], y: -35, x: 15 }}
                    transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 0.3 }}
                    className="absolute text-blue-400/70"
                    style={{ left: "75%", top: "45%" }}
                  >
                    <Wifi className="w-3 h-3" />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* COMPACT SERIAL BINARY DOCUMENT */}
            <AnimatePresence>
              {showDocumentFile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: isScene3 ? -10 : 0,
                    boxShadow: isScene2 ? "0 12px 28px rgba(56,189,248,0.25)" : "0 3px 8px rgba(0,0,0,0.02)"
                  }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{ type: "spring", stiffness: 95, damping: 15 }}
                  className="z-10 bg-white border border-neutral-200/80 w-[48px] h-[64px] rounded-lg p-1.5 flex flex-col justify-between relative shadow-md overflow-hidden"
                >
                  {/* Folded Top-Right Corner */}
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-sky-500 rounded-bl-md border-b border-l border-white/40" 
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)", transform: "rotate(90deg)", transformOrigin: "top right" }}
                  />

                  {/* Document lines */}
                  <div className="space-y-1.5 pr-2 mt-1">
                    <div className="w-full h-0.5 bg-sky-100 rounded-full" />
                    <div className="w-4/5 h-0.5 bg-sky-100 rounded-full" />
                  </div>

                  {/* Scanning Highlight bar on focus */}
                  {isDocFocused && (
                    <motion.div 
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_8px_#38bdf8] opacity-80 pointer-events-none"
                    />
                  )}

                  <div className="bg-sky-50 border border-sky-100 px-0.5 py-0.5 rounded text-[5px] font-mono font-black text-sky-500 text-center uppercase">
                    UI.bin
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* COLUMN 3: NORMAL MINIMAL DESIGN SMARTPHONE VIEWPORT */}
          <motion.div 
            initial={{
              x: 280,
              scale: 0.5,
              opacity: 0.0
            }}
            animate={{
              x: clientX,
              scale: clientScale,
              opacity: clientOpacity,
              zIndex: isScene3 ? 30 : 10
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 17,
              mass: 0.8
            }}
            className="absolute w-[200px] flex-shrink-0 flex flex-col items-center justify-center font-sans"
          >
            {/* SMARTPHONE DEVICE CARD FRAME (Minimal, standard, no high tech blueprint border) */}
            <div className="relative w-[185px] h-[260px] bg-slate-100 rounded-[32px] p-2 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border-[4px] border-slate-900 flex flex-col justify-between overflow-hidden">
              
              {/* Internal Bezel Phone Screen Canvas */}
              <div className="w-full h-full bg-slate-50 rounded-[25px] overflow-hidden relative flex flex-col justify-between border border-slate-200">
                
                {/* Standard OS Status Bar */}
                <div className="w-full h-5 bg-white border-b border-neutral-100 flex items-center justify-between px-3 text-[7px] font-bold text-slate-500 font-sans z-30">
                  <div className="flex items-center gap-1">
                    <span>15:30</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-2 h-2 text-slate-500" />
                    <div className="w-3 h-1.5 border border-slate-500 rounded-2xs relative flex items-center p-px">
                      <div className="w-1.5 h-full bg-slate-500 rounded-3xs" />
                    </div>
                  </div>
                </div>

                {/* Styled App Frame Header */}
                <div className="w-full px-3 py-1.5 bg-white border-b border-neutral-100 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 text-[8px] font-extrabold text-[#1F2937] uppercase font-sans">
                    <button className="text-gray-500 hover:text-black">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span>Акции</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* VIEWPORT GRAPHIC STATIONS (NORMAL CLEAN MODERN DESIGN, NO BLUEPRINTS) */}
                <div className="flex-grow w-full p-2.5 relative flex flex-col justify-between bg-[#F9FAFB] overflow-hidden">
                  
                  {/* Empty Awaiting state */}
                  {localTime < 5600 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 opacity-30 bg-slate-50">
                      <div className="w-5 h-5 rounded-full border border-slate-300 border-t-slate-600 animate-spin" />
                    </div>
                  )}

                  {/* Active view */}
                  {localTime >= 5600 && (
                    <div className="w-full h-full flex flex-col justify-between relative">
                      
                      {/* Standard Skeleton View (Subtle Gray Bars) */}
                      {isSkeletonPhase && (
                        <div className="flex-grow flex flex-col justify-between space-y-2.5">
                          
                          {/* Banner Skeletal Frame (Gray rounded card) */}
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full h-[60px] bg-slate-200/60 rounded-xl p-2 flex flex-col justify-between"
                          >
                            <div className="w-16 h-2 bg-slate-300/80 rounded" />
                            <div className="w-4/5 h-2.5 bg-slate-300 rounded mt-1" />
                            <div className="w-1/2 h-1.5 bg-slate-300/40 rounded mt-1" />
                          </motion.div>

                          {/* List items skeletons */}
                          <div className="grid grid-cols-2 gap-2">
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="h-[34px] bg-slate-200/50 rounded-lg p-1.5 space-y-1"
                            >
                              <div className="w-1/2 h-1.5 bg-slate-300/80 rounded" />
                              <div className="w-3/4 h-2 bg-slate-300/40 rounded" />
                            </motion.div>

                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="h-[34px] bg-slate-200/50 rounded-lg p-1.5 space-y-1"
                            >
                              <div className="w-1/2 h-1.5 bg-slate-300/80 rounded" />
                              <div className="w-3/4 h-2 bg-slate-300/40 rounded" />
                            </motion.div>
                          </div>

                          {/* Dynamic button skeleton */}
                          <motion.div 
                            initial={{ scaleX: 0 }} 
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full h-[24px] bg-slate-200 rounded-lg"
                          />

                        </div>
                      )}

                      {/* Fully Rendered Client Design (Clean UI, nice colors, no engineering details) */}
                      {isRenderedPhase && (
                        <motion.div 
                          initial={{ opacity: 0, filter: "blur(3px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          transition={{ duration: 0.4 }}
                          className="flex-grow flex flex-col justify-between space-y-2.5"
                        >
                          {/* Fully Colored Clean Premium Card */}
                          <motion.div 
                            initial={{ y: 6 }}
                            animate={{ y: 0 }}
                            className="w-full h-[60px] bg-gradient-to-br from-[#EBF5FF] to-[#DBEAFE] border border-blue-100 rounded-xl p-2 flex flex-col justify-between shadow-xs"
                          >
                            <span className="w-fit bg-[#2563EB] text-white text-[6.5px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                              Эксклюзив
                            </span>
                            
                            <p className="text-[9px] font-extrabold text-slate-800 leading-none mt-1">
                              Кэшбек 26% на всё
                            </p>
                            
                            <span className="text-[6px] text-blue-600 font-semibold">
                              Действует до 30.06
                            </span>
                          </motion.div>

                          {/* Detailed outline items cards */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white border border-slate-100 shadow-2xs rounded-lg p-1.5 text-left space-y-0.5">
                              <span className="text-[5.5px] text-slate-400 block font-medium">Карта вклада</span>
                              <span className="text-[7.5px] font-bold text-slate-700 leading-none">12,082 ₸</span>
                            </div>
                            <div className="bg-white border border-slate-100 shadow-2xs rounded-lg p-1.5 text-left space-y-0.5">
                              <span className="text-[5.5px] text-slate-400 block font-medium">Кэшбэк</span>
                              <span className="text-[7.5px] font-bold text-emerald-600 leading-none">+3,450 ₸</span>
                            </div>
                          </div>

                          {/* Beautiful Native Action Button */}
                          <button className="w-full bg-[#34A853] hover:bg-[#2e9349] text-white font-sans text-[7.5px] font-black py-1.5 rounded-lg active:scale-95 transition-all shadow-xs cursor-pointer">
                            КУПИТЬ В 1 КЛИК
                          </button>

                        </motion.div>
                      )}

                    </div>
                  )}

                </div>

              </div>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  );
}
