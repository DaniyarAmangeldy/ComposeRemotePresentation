import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  Wifi, 
  Battery, 
  ChevronRight, 
  Search, 
  Phone, 
  MessageSquare, 
  Compass, 
  Settings, 
  CheckSquare, 
  Bot,
  Keyboard,
  ArrowRight
} from "lucide-react";

interface AIGeniPhoneSlideProps {
  isActive: boolean;
}

export default function AIGeniPhoneSlide({ isActive }: AIGeniPhoneSlideProps) {
  // Stages:
  // 0: Idle Gemini screen, blinking cursor (1000ms)
  // 1: Keyboard animates up, letters type out: "Create a habit tracker with a chart..."
  // 2: Send click, keyboard slides down, spinning sparkling loader (1600ms)
  // 3: Transition to Launcher Home screen with standard grid apps (800ms)
  // 4: Habit Tracker icon installs, finishes with a spring bounce animation (keeps visible for 5000ms, then resets to 0)
  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState("");
  const promptToType = "Create a habit tracker with a chart...";

  useEffect(() => {
    if (!isActive) {
      setStage(0);
      setTypedText("");
      return;
    }

    let isMounted = true;
    let timeoutIds: NodeJS.Timeout[] = [];

    const runAnimationSequence = async () => {
      // Step 0: Idle for 1.2s
      if (!isMounted) return;
      setStage(0);
      setTypedText("");
      
      await new Promise((resolve) => {
        const t = setTimeout(resolve, 1200);
        timeoutIds.push(t);
      });

      // Step 1: Start typing
      if (!isMounted) return;
      setStage(1);
      
      for (let i = 0; i <= promptToType.length; i++) {
        if (!isMounted) return;
        setTypedText(promptToType.slice(0, i));
        await new Promise((resolve) => {
          const t = setTimeout(resolve, 60); // typings speed
          timeoutIds.push(t);
        });
      }

      // Briefly wait after typing finished before submitting
      await new Promise((resolve) => {
        const t = setTimeout(resolve, 600);
        timeoutIds.push(t);
      });

      // Step 2: Trigger submission
      if (!isMounted) return;
      setStage(2);

      // Loading duration
      await new Promise((resolve) => {
        const t = setTimeout(resolve, 2400); // loading loader
        timeoutIds.push(t);
      });

      // Step 3: Switch to launcher home screen
      if (!isMounted) return;
      setStage(3);

      await new Promise((resolve) => {
        const t = setTimeout(resolve, 900);
        timeoutIds.push(t);
      });

      // Step 4: Install new icon with bounce
      if (!isMounted) return;
      setStage(4);

      // Wait 5 seconds before repeating the whole loop
      await new Promise((resolve) => {
        const t = setTimeout(resolve, 4500);
        timeoutIds.push(t);
      });

      if (isMounted) {
        runAnimationSequence(); // Loop
      }
    };

    runAnimationSequence();

    return () => {
      isMounted = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      
      {/* Smartphone Outer Metallic Frame */}
      <div className="relative w-[238px] h-[525px] bg-[#1c1c1e] rounded-[44px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-[3.5px] border-neutral-700/80 flex flex-col overflow-hidden">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          <div className="w-8 h-1 bg-neutral-900/60 rounded-full" />
        </div>

        {/* Smartphone Screen Core Container */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white flex flex-col text-slate-900 font-sans">
          
          {/* Top Status Bar Decor */}
          <div className="h-8 pt-1 px-5 flex justify-between items-center bg-transparent z-40 text-[9.5px] font-semibold text-slate-800 pointer-events-none font-mono">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5 text-slate-800" />
              <span className="text-[8.5px] font-bold">5G</span>
              <Battery className="w-3.5 h-2.5 text-slate-800 mt-[1px]" />
            </div>
          </div>

          {/* APPLICATION VIEWS SWITCHER */}
          <div className="flex-1 w-full relative overflow-hidden bg-neutral-50 flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* STAGES 0, 1, 2: GEMINI MOBILE INTELLIGENCE SYSTEM */}
              {(stage === 0 || stage === 1 || stage === 2) && (
                <motion.div
                  key="gemini-app"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col bg-white"
                >
                  {/* Gemini App Header */}
                  <div className="px-4 py-2 flex items-center justify-between border-b border-neutral-100 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold font-sans tracking-tight leading-3">Gemini Nano</div>
                        <span className="text-[9px] font-semibold text-sky-500 uppercase tracking-widest leading-none font-mono">Active</span>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>

                  {/* Gemini Workspace Conversation Stream */}
                  <div className="flex-grow p-4 flex flex-col justify-end space-y-3 pb-2 w-full overflow-hidden">
                    {/* Welcome Message / Initial Prompt Card */}
                    {stage < 2 ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-left"
                      >
                        <h4 className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                          Hello, Daniyar <span className="animate-bounce">👋</span>
                        </h4>
                        <p className="text-[10px] text-neutral-500 mt-1 font-medium leading-relaxed">
                          What application would you like to generate and launch right now?
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex-grow flex flex-col justify-center items-center px-4 space-y-4">
                        {/* Interactive Sparkle Loader during Gemini Synthesis */}
                        <div className="relative">
                          {/* Pulsing Outer Ring */}
                          <motion.div
                            animate={{ scale: [1, 1.25, 1], rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                            className="w-12 h-12 rounded-full border-2 border-dashed border-sky-400/80 p-1 flex items-center justify-center"
                          />
                          {/* Central Sparkle Sphere */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ scale: [0.9, 1.15, 0.9] }}
                              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                              className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Loading States text stream */}
                        <div className="text-center space-y-1">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[11px] font-black text-neutral-800"
                          >
                            Generating UI Layout...
                          </motion.div>
                          <p className="text-[8.5px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
                            Compiling via Remote Compose
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Right-aligned prompt typing simulator block */}
                    {typedText.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-sky-50 border border-sky-100 text-sky-900 rounded-2xl rounded-tr-none p-2.5 max-w-[85%] self-end text-left shadow-sm"
                      >
                        <p className="text-[11px] font-semibold leading-relaxed">
                          {typedText}
                          {stage === 1 && (
                            <span className="w-1.5 h-3.5 bg-sky-500 inline-block align-middle ml-0.5 animate-pulse" />
                          )}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* BOTTOM INPUT BAR FRAME */}
                  <div className="px-3 pb-3 pt-1 border-t border-neutral-100 bg-white">
                    <div className="w-full h-8.5 bg-neutral-100 rounded-full flex items-center px-4 justify-between border border-neutral-200/50">
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {stage === 0 ? "Ask Gemini anything..." : ""}
                      </span>
                      <div className="flex items-center gap-1 text-sky-500">
                        <Send className={`w-3 h-3 ${stage === 1 ? "opacity-100 scale-110" : "opacity-43"}`} />
                      </div>
                    </div>
                  </div>

                  {/* RETRACTABLE MOBILE VIRTUAL KEYBOARD GRAPHIC */}
                  <AnimatePresence>
                    {stage === 1 && (
                      <motion.div
                        initial={{ y: 150 }}
                        animate={{ y: 0 }}
                        exit={{ y: 150 }}
                        transition={{ type: "spring", stiffness: 120, damping: 16 }}
                        className="bg-[#d1d5db] p-1 flex flex-col gap-0.5 border-t border-neutral-300 z-30 select-none pb-4"
                      >
                        {/* Simulation rows */}
                        <div className="flex gap-0.5 justify-center">
                          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(k => (
                            <span key={k} className="flex-1 bg-white rounded-[3px] text-[8.5px] py-1 shadow-sm font-semibold text-center">{k}</span>
                          ))}
                        </div>
                        <div className="flex gap-0.5 justify-center px-1">
                          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map(k => (
                            <span key={k} className="flex-1 bg-white rounded-[3px] text-[8.5px] py-1 shadow-sm font-semibold text-center">{k}</span>
                          ))}
                        </div>
                        <div className="flex gap-0.5 justify-center px-2">
                          <span className="bg-neutral-400 flex-[1.4] rounded-[3px] text-[8.5px] py-1 shadow-sm font-bold text-center">⇧</span>
                          {["Z", "X", "C", "V", "B", "N", "M"].map(k => (
                            <span key={k} className="flex-1 bg-white rounded-[3px] text-[8.5px] py-1 shadow-sm font-semibold text-center">{k}</span>
                          ))}
                          <span className="bg-neutral-400 flex-[1.4] rounded-[3px] text-[8.5px] py-1 shadow-sm font-bold text-center">⌫</span>
                        </div>
                        <div className="flex gap-0.5 justify-center px-4">
                          <span className="bg-neutral-400 flex-[1.2] rounded-[3px] text-[7.5px] py-1 shadow-sm font-semibold text-center">123</span>
                          <span className="bg-white flex-5 rounded-[3px] text-[8.5px] py-1 shadow-sm font-medium text-neutral-500 text-center uppercase tracking-wide">space</span>
                          <span className="bg-sky-500 text-white flex-[1.4] rounded-[3px] text-[8.5px] py-1 shadow-sm font-bold text-center">Go</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* STAGE 3, 4: SMARTPHONE LAUNCHER HOME SCREEN */}
              {(stage === 3 || stage === 4) && (
                <motion.div
                  key="launcher-desktop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-between p-5 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(56,189,248,0.1) 0%, rgba(30,27,75,0.7) 100%), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80')`
                  }}
                >
                  
                  {/* Top Launcher Clock & Date */}
                  <div className="text-center mt-2.5">
                    <div className="text-2xl font-extralight text-white font-sans tracking-tight leading-none">09:41</div>
                    <span className="text-[8px] uppercase font-bold text-sky-100/90 tracking-widest block mt-0.5">Thursday, May 28</span>
                  </div>

                  {/* APPLICATION GRID */}
                  <div className="grid grid-cols-4 gap-x-2.5 gap-y-4 flex-grow content-start mt-5 px-1">
                    
                    {/* Exisiting App Icons */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-[7.5px] font-semibold text-white/90 text-center tracking-tight truncate w-full mt-1.5">Phone</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-md">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-[7.5px] font-semibold text-white/90 text-center tracking-tight truncate w-full mt-1.5">Chat</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-to-tr from-rose-400 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="text-[7.5px] font-semibold text-white/90 text-center tracking-tight truncate w-full mt-1.5">Maps</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-to-tr from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Settings className="w-4 h-4" />
                      </div>
                      <span className="text-[7.5px] font-semibold text-white/90 text-center tracking-tight truncate w-full mt-1.5">Settings</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-to-tr from-orange-400 via-amber-500 to-yellow-500 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                      <span className="text-[7.5px] font-semibold text-white/90 text-center tracking-tight truncate w-full mt-1.5">Gemini</span>
                    </div>

                    {/* NEW CUSTOM "INSTALLED" HABIT APP ICON AND ANIMATION */}
                    <AnimatePresence>
                      {stage === 4 && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 140,
                            damping: 10,
                            delay: 0.25
                          }}
                          className="flex flex-col items-center col-start-2"
                        >
                          <div className="relative">
                            {/* Sparkling visual background glow effect for the newly installed app */}
                            <motion.div
                              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.8 }}
                              className="absolute -inset-1 rounded-lg bg-gradient-to-tr from-[#3B82F6] via-[#A855F7] to-[#EC4899] blur-md pointer-events-none"
                            />
                            
                            {/* App Icon Body */}
                            <div className="relative w-8 h-8 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-xl border border-white/20">
                              <CheckSquare className="w-4 h-4 text-white" />
                              <Sparkles className="absolute -top-1.5 -right-1.5 w-3 h-3 text-yellow-300 drop-shadow-md animate-pulse" />
                            </div>
                          </div>
                          
                          <span className="text-[7.5px] font-black text-white/100 text-center tracking-tight truncate w-full mt-1.5 drop-shadow">
                            Habits
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* BOTTOM RECENT BAR DOCK APP */}
                  <div className="w-full bg-white/20 backdrop-blur-md rounded-xl py-1 px-2 flex items-center justify-around gap-1.5 mb-1 border border-white/10">
                    <div className="w-7 h-7 rounded-md bg-green-500 flex items-center justify-center text-white"><Phone className="w-3.5 h-3.5" /></div>
                    <div className="w-7 h-7 rounded-md bg-sky-400 flex items-center justify-center text-white"><MessageSquare className="w-3.5 h-3.5" /></div>
                    <div className="w-7 h-7 rounded-md bg-rose-400 flex items-center justify-center text-white"><Compass className="w-3.5 h-3.5" /></div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Screen Pill Handle Decor */}
          <div className="h-6.5 w-full flex items-center justify-center bg-transparent z-40 pointer-events-none pb-1.5">
            <div className="w-24 h-1 bg-slate-900/40 rounded-full" />
          </div>

        </div>
      </div>

    </div>
  );
}
