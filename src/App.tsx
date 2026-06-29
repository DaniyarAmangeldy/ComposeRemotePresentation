import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import DataFlowArchitectureSlide from "./components/DataFlowArchitectureSlide";
import SmartphoneVideoDemoSlide from "./components/SmartphoneVideoDemoSlide";
import DocumentLayersSlide from "./components/DocumentLayersSlide";
import AIGeniPhoneSlide from "./components/AIGeniPhoneSlide";
import AnimatedButtonSlide from "./components/AnimatedButtonSlide";
import { 
  ChevronRight, 
  ChevronLeft, 
  Monitor, 
  Smartphone, 
  Play, 
  Pause, 
  HelpCircle, 
  Maximize2, 
  Minimize2, 
  Code, 
  Sparkles, 
  Cpu, 
  Layers, 
  Globe, 
  Terminal, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Workflow, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  GitBranch, 
  Zap,
  Keyboard,
  Compass,
  Link as LinkIcon,
  Cloud
} from "lucide-react";

// --- SYNTHESIZED AUDIO CHIME (Fully offline-safe) ---
const playChime = (muted: boolean) => {
  // Sound completely disabled on user request
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [scale, setScale] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showRemoteCompose, setShowRemoteCompose] = useState(false);
  const [showDock, setShowDock] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const slideFrameRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_SLIDES = 18;

  // Hover detection to show floating controls only at the bottom
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If the mouse is in the bottom 120 pixels, show the dock
      const threshold = window.innerHeight - 120;
      if (e.clientY >= threshold) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Reset showRemoteCompose when slide changes
  useEffect(() => {
    if (currentSlide !== 4) {
      setShowRemoteCompose(false);
    }
  }, [currentSlide]);

  // --- RESPONSIVE 16:9 SCALING LOGIC ---
  useEffect(() => {
    const handleResize = () => {
      if (!slideFrameRef.current) return;
      const parent = slideFrameRef.current.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      
      const targetWidth = 1280;
      const targetHeight = 720;
      
      const scaleX = parentWidth / targetWidth;
      const scaleY = parentHeight / targetHeight;
      
      // Choose the minimum scale factor to guarantee the element fits inside perfectly
      const finalScale = Math.min(scaleX, scaleY);
      setScale(finalScale * 0.95); // 5% margin to avoid edge bleeding
    };

    window.addEventListener("resize", handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (slideFrameRef.current.parentElement) {
      resizeObserver.observe(slideFrameRef.current.parentElement);
    }

    // Initial scale check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // --- ACTIONS ---
  const handleNext = () => {
    if (currentSlide === 4 && !showRemoteCompose) {
      setShowRemoteCompose(true);
      playChime(muted);
      return;
    }
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(prev => prev + 1);
      playChime(muted);
    }
  };

  const handlePrev = () => {
    if (currentSlide === 4 && showRemoteCompose) {
      setShowRemoteCompose(false);
      playChime(muted);
      return;
    }
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      playChime(muted);
    }
  };

  const handleJump = (index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES) {
      setCurrentSlide(index);
      setShowRemoteCompose(false);
      playChime(muted);
    }
  };

  // --- AUTOPLAY CONTROLS ---
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < TOTAL_SLIDES - 1) {
            playChime(muted);
            return prev + 1;
          } else {
            setIsAutoplay(false);
            return prev;
          }
        });
      }, 7000); // 7 seconds per slide
    } else {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    }

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, muted]);

  // --- KEYBOARD & CONTROLLER LISTENERS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when focusing input or code edits if any
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "Space":
        case " ":
        case "PageDown":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          handlePrev();
          break;
        case "Home":
          e.preventDefault();
          handleJump(0);
          break;
        case "End":
          e.preventDefault();
          handleJump(TOTAL_SLIDES - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          setMuted(m => !m);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, muted, showRemoteCompose]);

  // --- FULLSCREEN TOGGLER ---
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error shifting to fullscreen", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Monitor Escape or direct user exit from fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // --- MOBILE SWIPE DETECTOR ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swiped Left -> Go Next
      handleNext();
    } else if (diff < -50) {
      // Swiped Right -> Go Prev
      handlePrev();
    }
    setTouchStart(null);
  };

  // Regular slide background clicks to advance (if not clicking on interactive elements or controller)
  const handleSlideBackgroundClick = (e: React.MouseEvent) => {
    // Only trigger if clicking exactly on content and not interactive items
    const target = e.target as HTMLElement;
    if (target.closest(".interactive-element")) {
      return;
    }
    handleNext();
  };

  // --- TRANSITION ANIMATIONS CONFIG ---
  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    active: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden select-none"
      id="presentation-global-root"
    >
      {/* Background aesthetic grid removed to prevent gray lines on fullscreen */}

      {/* --- MASTER PRESENTATION VIEWPORT LOCK (16:9 CONTAINER) --- */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div 
          ref={slideFrameRef}
          style={{ width: "1280px", height: "720px", transform: `scale(${scale})` }}
          className={`relative bg-white overflow-hidden flex flex-col justify-between transition-transform duration-100 ease-out origin-center ${isFullscreen ? "" : "shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-[#E0E0E0] rounded-2xl"}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleSlideBackgroundClick}
        >
          {/* Subtle Fading Page Number in top-right corner */}
          <div className="absolute top-8 right-12 z-50 pointer-events-none select-none w-24 h-6">
            <div className="relative w-full h-full">
              <AnimatePresence>
                {currentSlide > 0 && (
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.25, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute right-0 top-0 text-xs font-mono text-[#1A1A1A] whitespace-nowrap"
                  >
                    {currentSlide + 1} / {TOTAL_SLIDES}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Core Slides Slideshow */}
          <div className="relative flex-grow w-full h-full p-12 overflow-hidden flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="initial"
                animate="active"
                exit="exit"
                className="w-full h-full flex flex-col justify-between"
              >
                {/* --- SLIDE SWITCHER --- */}
                {(() => {
                  switch (currentSlide) {
                    
                    // --- SLIDE 1: TITLE ---
                    case 0:
                      return (
                        <div className="grid grid-cols-12 gap-8 h-full items-center py-6">
                          <div className="col-span-8 flex flex-col justify-center h-full space-y-8 text-left">
                            <h1 className="text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight select-none">
                              Remote Compose: <br />
                              <span className="text-google-blue font-black bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">The Future of Dynamic Interfaces</span>
                            </h1>
                            
                            <div className="pt-8 border-t border-tint-border">
                              <h2 className="text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
                                Daniyar Amangeldy
                              </h2>
                            </div>
                          </div>

                          <div className="col-span-4 flex items-center justify-end h-full pr-10">
                            <motion.div 
                              className="flex flex-col items-center gap-3 cursor-pointer group"
                              animate={{ x: [0, 10, 0] }}
                              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                            >
                              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-google-blue to-google-green p-0.5 shadow-lg shadow-google-blue/25 flex items-center justify-center">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                                  <ChevronRight className="w-12 h-12 text-google-blue" />
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      );

                    // --- SLIDE 2: THE PROBLEM (EVOLUTION OF PAIN) ---
                    case 1:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="flex flex-col justify-center h-full py-4 text-center"
                        >
                          {/* 3 Blocks in row with big icons and no body text */}
                          <div className="grid grid-cols-3 gap-8 my-auto max-w-5xl mx-auto w-full pt-6">
                            {[
                              {
                                title: "WebView",
                                icon: <Globe className="w-20 h-20 text-google-blue" />,
                              },
                              {
                                title: "JSON SDUI",
                                icon: <Sliders className="w-20 h-20 text-google-yellow" />,
                              },
                              {
                                title: "Native",
                                icon: <Smartphone className="w-20 h-20 text-google-green" />,
                              }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center gap-6 h-[220px]"
                              >
                                <div className="flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">{item.title}</h3>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );

                    // --- NEW SLIDE: WE NEED FLUENT UX / AND FAST DELIVERY ---
                    case 2:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden"
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-blue/5 rounded-full blur-3xl" />
                          
                          <div className="space-y-6 relative z-10 antialiased">
                            {/* First text block: "We need fluent UX" */}
                            <motion.h1 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="text-7xl font-extrabold text-[#1A1A1A] tracking-tight leading-none uppercase font-sans select-none"
                            >
                              We need <span className="bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">fluent ux</span>
                            </motion.h1>

                            {/* Second text block with 2-second delay: "and fast delivery" */}
                            <div className="overflow-hidden">
                              <motion.h2 
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl font-black text-google-gray tracking-tight leading-none uppercase font-sans italic select-none"
                              >
                                and <span className="text-[#1A1A1A] not-italic font-extrabold font-sans">fast delivery</span>
                              </motion.h2>
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 3: INTRO TO TECHNOLOGY ---
                    case 3:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-between h-full py-4 text-center"
                        >
                          <div>
                            <h2 className="text-5xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              Remote Compose
                            </h2>
                          </div>

                          {/* 4 Cards Grid with customized animated icons */}
                          <div className="grid grid-cols-4 gap-8 my-auto max-w-5xl mx-auto w-full pt-8">
                            {[
                              {
                                title: "JSON Free",
                                icon: (
                                  <div className="relative w-20 h-20 flex items-center justify-center select-none">
                                    <div className="text-gray-400 opacity-40 font-extrabold text-sm font-mono tracking-tight bg-gray-50 border border-gray-200 p-3 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                                      <span className="text-xs font-mono">&lt;/&gt;</span>
                                      <span className="text-[10px] font-mono font-bold">JSON</span>
                                    </div>
                                    <div className="absolute w-[84px] h-[3px] bg-google-red/60 rounded-full rotate-45 transform origin-center" />
                                  </div>
                                )
                              },
                              {
                                title: "Binary Serialization",
                                icon: (
                                  <div className="w-20 h-20 bg-google-yellow/5 border border-google-yellow/20 rounded-2xl flex flex-col items-center justify-center p-3 font-mono text-[9px] gap-1 select-none leading-none shadow-xs font-black text-google-yellow/80">
                                    <div className="flex gap-1.5">
                                      <span>0</span><span>1</span><span>0</span><span>0</span>
                                    </div>
                                    <div className="flex gap-1.5 text-google-yellow">
                                      <span>1</span><span>0</span><span>1</span><span>1</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                      <span>0</span><span>1</span><span>1</span><span>0</span>
                                    </div>
                                    <div className="flex gap-1.5 text-google-yellow">
                                      <span>1</span><span>1</span><span>0</span><span>1</span>
                                    </div>
                                  </div>
                                )
                              },
                              {
                                title: "Compose declarative",
                                icon: (
                                  <div className="w-20 h-20 bg-google-blue/5 border border-google-blue/20 rounded-2xl flex items-center justify-center relative shadow-xs overflow-hidden">
                                    {/* Grid background to give a blueprint layout editor vibe */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,115,232,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,115,232,0.06)_1px,transparent_1px)] bg-[size:8px_8px]" />
                                    
                                    {/* Modern Declarative Composable Blocks */}
                                    <div className="relative w-12 h-12 flex flex-col gap-1 border border-google-blue/30 rounded-lg p-1.5 bg-white/95 shadow-xs">
                                      {/* Header row inside component */}
                                      <div className="h-3 w-full bg-google-blue/20 rounded-xs flex items-center px-1 gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-google-blue/60" />
                                        <div className="w-6 h-1 bg-google-blue/40 rounded-full" />
                                      </div>
                                      {/* Content body inside component representing Column/Row */}
                                      <div className="flex-1 flex gap-1">
                                        {/* Child Composable 1 */}
                                        <div className="flex-1 bg-google-blue/10 border border-dashed border-google-blue/30 rounded-xs flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-xs bg-google-blue/40" />
                                        </div>
                                        {/* Child Composable 2 */}
                                        <div className="w-3.5 bg-google-blue/5 border border-dashed border-google-blue/20 rounded-xs flex flex-col gap-0.5 p-0.5 justify-center">
                                          <div className="h-1 w-full bg-google-blue/30 rounded-xs" />
                                          <div className="h-1 w-2/3 bg-google-blue/30 rounded-xs" />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Decorative floating sparkly component badge */}
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-google-blue animate-pulse" />
                                  </div>
                                )
                              },
                              {
                                title: "Blazing fast",
                                icon: (
                                  <div className="w-20 h-20 bg-google-green/5 border border-google-green/20 rounded-2xl flex items-center justify-center relative shadow-xs">
                                    <Zap className="w-10 h-10 text-google-green fill-google-green/10" />
                                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-google-green animate-ping" />
                                  </div>
                                )
                              }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.6 + idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center gap-6 h-[220px]"
                              >
                                <div className="flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight text-center">{item.title}</h3>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 4: COORDINATE SYSTEM (MERGED GRAPH) ---
                    case 4:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-center items-center h-full text-center"
                        >
                          {/* Beautiful CSS coordinate plane */}
                          <div className="relative flex items-center justify-center w-full h-full my-auto">
                            <div className="relative w-[1040px] h-[480px] border-b-2 border-l-2 border-[#1A1A1A] px-2 pb-2">
                              {/* Y Axis Label */}
                              <div className="absolute -left-16 top-1/2 -rotate-90 origin-center text-xs font-semibold uppercase tracking-wider text-google-gray flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> Native Experience / UX Quality
                              </div>
                              {/* X Axis Label */}
                              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 text-xs font-semibold uppercase tracking-wider text-google-gray flex items-center gap-1">
                                Dynamism / Update Frequency <Zap className="w-3.5 h-3.5 text-google-yellow" />
                              </div>

                              {/* Target Coordinate Line Labels */}
                              <div className="absolute -left-10 top-0 text-[10px] font-mono text-google-gray">100%</div>
                              <div className="absolute -left-10 bottom-0 text-[10px] font-mono text-google-gray">0%</div>
                              <div className="absolute right-0 -bottom-5 text-[10px] font-mono text-google-gray">100%</div>

                              {/* Axis Subgrid lines */}
                              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-100" />
                              <div className="absolute top-0 bottom-0 left-1/2 border-r border-dashed border-gray-100" />

                              {/* Points */}
                              {/* 1. WebView */}
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: showRemoteCompose ? 0.35 : 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="absolute bottom-[20%] right-[10%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center select-none"
                              >
                                <div className="w-4 h-4 rounded-full bg-google-red animate-pulse shadow-md" />
                                <span className="text-xs font-bold text-[#1A1A1A] mt-1.5 p-1 bg-white border border-gray-200/60 rounded shadow-sm">
                                  WebView (90%, 20%)
                                </span>
                              </motion.div>

                              {/* 2. Custom JSON SDUI */}
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: showRemoteCompose ? 0.35 : 1 }}
                                transition={{ delay: 1.0, type: "spring" }}
                                className="absolute bottom-[55%] left-[45%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center select-none"
                              >
                                <div className="w-4 h-4 rounded-full bg-google-yellow shadow-md" />
                                <span className="text-xs font-bold text-[#1A1A1A] mt-1.5 p-1 bg-white border border-gray-200/60 rounded shadow-sm">
                                  SDUI (45%, 55%)
                                </span>
                              </motion.div>

                              {/* 3. Hardcoded Native App */}
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: showRemoteCompose ? 0.35 : 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="absolute top-[10%] left-[8%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center select-none"
                              >
                                <div className="w-4 h-4 rounded-full bg-google-gray shadow-md" />
                                <span className="text-xs font-bold text-[#1A1A1A] mt-1.5 p-1 bg-white border border-gray-200/60 rounded shadow-sm">
                                  Hardcoded UI (5%, 95%)
                                </span>
                              </motion.div>

                              {/* ULTIMATE WINNER: REMOTE COMPOSE - Appears on toggled showRemoteCompose */}
                              <AnimatePresence>
                                {showRemoteCompose && (
                                  <motion.div 
                                    initial={{ scale: 0.1, opacity: 0, y: 55 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.1, opacity: 0, y: 55 }}
                                    transition={{ 
                                      duration: 0.8, 
                                      ease: "easeOut",
                                      type: "spring",
                                      stiffness: 120,
                                      damping: 12
                                    }}
                                    className="absolute top-[8%] right-[8%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center select-none z-10"
                                  >
                                    <div className="relative">
                                      <div className="absolute -inset-4 bg-google-blue/40 rounded-full animate-ping opacity-60" />
                                      <div className="absolute -inset-1 bg-google-blue/20 rounded-full animate-pulse" />
                                      <div className="w-6 h-6 rounded-full bg-google-blue shadow-[0_0_20px_rgba(26,115,232,0.8)] flex items-center justify-center border-2 border-white">
                                        <Sparkles className="w-3 h-3 text-white" />
                                      </div>
                                    </div>
                                    <span className="text-[11px] font-extrabold text-[#1A1A1A] mt-2.5 p-1.5 bg-white border border-google-blue rounded shadow-md glow-selected">
                                      Remote Compose (95%, 95%)
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 5: DATA FLOW ARCHITECTURE ---
                    case 5:
                      return (
                        <DataFlowArchitectureSlide isActive={currentSlide === 5} />
                      );

                    // --- SLIDE 6: APP DEMO PLAYBACK (VIDEO PLAYER) ---
                    case 6:
                      return (
                        <SmartphoneVideoDemoSlide isActive={currentSlide === 6} />
                      );

                    // --- SLIDE 7: SERVER CODE BLOCK ---
                    case 7:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-around h-full py-4 text-left"
                        >
                          <header>
                            <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              <span style={{ color: '#A0A564' }}>@Composable</span> at Backend
                            </h2>
                          </header>

                          {/* Beautiful code presentation style */}
                          <div className="flex-grow flex flex-col justify-center my-4 overflow-hidden">
                            <div className="bg-[#1e1e24] rounded-lg overflow-hidden border border-gray-800 shadow-xl flex flex-col h-[500px]">
                              {/* Mock IDE Title */}
                              <div className="bg-[#121214] px-4 py-2 border-b border-gray-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-red" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-yellow" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-green" />
                                </div>
                                <span className="text-[11px] font-mono text-gray-400">ServerDashboardScreen.kt</span>
                                <div className="w-4" />
                              </div>

                              {/* Mono Code Block with high contrast mock colors */}
                              <pre className="p-6 overflow-auto text-base font-mono leading-relaxed text-[#f8f8f2] text-left flex-grow">
                                <code>
                                  <span className="text-[#cf8e5d]">@Composable</span><br />
                                  <span className="text-[#66d9ef]">fun</span> <span className="text-[#a6e22e]">DefaultDetailContent</span>(<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;modifier: RemoteModifier = Modifier<br />
                                  ) &#123;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;Column(<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modifier.fillMaxWidth().padding(<span className="text-[#ae81ff]">20</span>.dp, <span className="text-[#ae81ff]">8</span>.dp, <span className="text-[#ae81ff]">20</span>.dp, <span className="text-[#ae81ff]">8</span>.dp),<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;horizontalAlignment = Alignment.CenterHorizontally<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;) &#123;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Text(<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e6db74]">"Under Construction"</span>,<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color = COLOR_ON_SURFACE.rc,<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontSize = <span className="text-[#ae81ff]">20</span>.sp,<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontWeight = FontWeight.Bold,<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fontFamily = <span className="text-[#e6db74]">"Geist"</span><br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                                  &#125;</code>
                              </pre>
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 8: CLIENT CODE BLOCK ---
                    case 8:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-around h-full py-4 text-left"
                        >
                          <header>
                            <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              Client Player
                            </h2>
                          </header>

                          {/* Beautiful code presentation style */}
                          <div className="flex-grow flex flex-col justify-center my-4 overflow-hidden">
                            <div className="bg-[#1e1e24] rounded-lg overflow-hidden border border-gray-800 shadow-xl flex flex-col h-[500px]">
                              {/* Mock IDE Title */}
                              <div className="bg-[#121214] px-4 py-2 border-b border-gray-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-red" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-yellow" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-google-green" />
                                </div>
                                <span className="text-[11px] font-mono text-gray-400">MainActivity.kt</span>
                                <div className="w-4" />
                              </div>

                              {/* Mono Code Block with high contrast mock colors */}
                              <pre className="p-6 overflow-auto text-base font-mono leading-relaxed text-[#f8f8f2] text-left flex-grow">
                                <code>
                                  <span className="text-[#cf8e5d]">@Composable</span><br />
                                  <span className="text-[#66d9ef]">fun</span> <span className="text-[#a6e22e]">RemoteUiScreen</span>(payload: ByteArray) &#123;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;RemoteComposePlayer(<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modifier = Modifier.fillMaxSize(),<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;documentBytes = payload,<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onAction = &#123; name, args {"->"} <br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#cf8e5d]">when</span> (name) &#123;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e6db74]">"NAV_PROFILE"</span> {"->"} navController.navigate(<span className="text-[#e6db74]">"profile_route"</span>)<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e6db74]">"SHOW_DIALOG"</span> {"->"} showInteractiveDialog(args)<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                                  &nbsp;&nbsp;&nbsp;&nbsp;)<br />
                                  &#125;
                                </code>
                              </pre>
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 9: CODE DEMO INTRO TITLE ---
                    case 9:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col items-center justify-center h-full space-y-6 bg-gradient-to-br from-white to-gray-50 rounded-xl relative overflow-hidden text-center"
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-blue/5 rounded-full blur-3xl" />
                          
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-center space-y-4 relative z-10"
                          >
                            <div className="w-[72px] h-[72px] bg-google-blue/10 text-google-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-google-blue/15">
                              <Code className="w-8 h-8" />
                            </div>
                            <h1 className="text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
                              Deep Dive into Demo
                            </h1>
                          </motion.div>
                        </motion.div>
                      );

                    // --- SLIDE 10: DOCUMENT OPERATIONS LAYER STACK ---
                    case 10:
                      return (
                        <DocumentLayersSlide isActive={currentSlide === 10} />
                      );

                    // --- SLIDE 11: ANIMATED BUTTON DEMO ---
                    case 11:
                      return (
                        <AnimatedButtonSlide isActive={currentSlide === 11} />
                      );

                    // --- SLIDE 12: DRAWBACKS OF THE TECHNOLOGY ---
                    case 12:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="flex flex-col justify-center h-full py-4 text-center"
                        >
                          {/* 3 Blocks in a row with big number icons and no body text, animated in the style of slide 2 */}
                          <div className="grid grid-cols-3 gap-8 my-auto max-w-5xl mx-auto w-full pt-6">
                            {[
                              {
                                title: "Alpha Status",
                                num: "1",
                                colorClass: "text-google-blue bg-google-blue/5 border-google-blue/20",
                              },
                              {
                                title: "Complex Logic",
                                num: "2",
                                colorClass: "text-google-yellow bg-google-yellow/5 border-google-yellow/20",
                              },
                              {
                                title: "Limited Modifiers",
                                num: "3",
                                colorClass: "text-google-red bg-google-red/5 border-google-red/20",
                              }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center gap-6 h-[220px]"
                              >
                                <div className={`w-28 h-28 rounded-full border-3 flex items-center justify-center text-4xl font-extrabold ${item.colorClass} shadow-md`}>
                                  {item.num}
                                </div>
                                <h3 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">{item.title}</h3>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 13: RELEASE CADENCE & TIMELINE ---
                    case 13:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-center h-full py-4 text-center"
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-mono text-google-blue uppercase tracking-widest font-semibold">PRE-RELEASE MILESTONES</p>
                            <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                              Predictable Release Cadence
                            </h2>
                          </div>

                          {/* Centered container with full-width table matrix of alpha versions */}
                          <div className="max-w-5xl mx-auto w-full bg-white border border-gray-100 rounded-2xl p-6 h-[320px] overflow-y-auto relative my-auto mt-6">
                            <div className="grid grid-cols-4 gap-3 text-left">
                              {[
                                { ver: "1.0.0-alpha11", date: "May 19, 2026", active: true, desc: "Latest build iteration" },
                                { ver: "1.0.0-alpha10", date: "May 06, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha09", date: "Apr 22, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha08", date: "Apr 08, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha07", date: "Mar 25, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha06", date: "Mar 11, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha05", date: "Feb 25, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha04", date: "Feb 11, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha03", date: "Jan 28, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha02", date: "Jan 14, 2026", active: false, desc: "Alpha release cadence" },
                                { ver: "1.0.0-alpha01", date: "Dec 17, 2025", active: false, desc: "First initial alpha baseline" },
                              ].map((item, idx) => (
                                <motion.div
                                  key={item.ver}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + idx * 0.03 }}
                                  className={`relative p-3.5 rounded-xl border flex flex-col justify-between h-[75px] transition-all overflow-hidden ${
                                    item.active 
                                      ? "bg-google-blue/[0.03] border-google-blue/40 shadow-xs" 
                                      : "bg-gray-50/40 border-gray-100/80 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs font-mono font-bold ${item.active ? "text-google-blue" : "text-[#1A1A1A]"}`}>
                                      {item.ver}
                                    </span>
                                    {item.active && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[10px] text-google-gray font-medium">
                                      {item.date}
                                    </span>
                                    <span className="text-[9px] font-mono text-neutral-400 font-semibold tracking-tight">
                                      {item.desc}
                                    </span>
                                  </div>
                                  {item.active && (
                                    <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-google-blue text-white text-[7px] font-extrabold uppercase rounded-bl-lg font-mono tracking-widest leading-none">
                                      LATEST
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 14: THE FUTURE - COMPOSE MULTIPLATFORM (KMP) ---
                    case 14:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-around h-full py-4 text-left select-none"
                        >
                          <div>
                            <p className="text-xs font-mono text-google-blue uppercase tracking-widest font-semibold">Cross-Platform Capabilities</p>
                            <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              Remote Compose + Compose Multiplatform
                            </h2>
                          </div>

                          <div className="grid grid-cols-12 gap-12 my-auto items-center pt-2">
                            <div className="col-span-6 space-y-6">
                              <div className="space-y-3">
                                <h3 className="text-2xl font-bold text-[#1A1A1A] leading-snug">
                                  Platform-Independent Player
                                </h3>
                                <p className="text-[#5F6368] text-sm leading-relaxed">
                                  Jetpack Compose has long expanded beyond Android. The JetBrains <strong className="text-google-blue">(CMP-10013)</strong> initiative focuses on establishing a unified bytecode parser across runtime systems.
                                </p>
                              </div>
                              <div className="p-5 bg-gray-50 rounded-2xl space-y-3 border border-gray-100">
                                <span className="text-[10px] font-mono text-google-blue font-bold uppercase tracking-wider block">"One Server UI" Concept</span>
                                <p className="text-xs text-google-gray leading-relaxed">
                                  Compile your UI layout once on a Kotlin-backend — it renders natively and flawlessly on <strong className="text-[#1A1A1A]">Android, iOS, and Desktop</strong>.
                                </p>
                              </div>
                            </div>

                            <div className="col-span-6 border border-gray-100 rounded-2xl p-6 bg-gradient-to-tr from-gray-50 to-white relative overflow-hidden space-y-4">
                              <h4 className="text-xs font-mono text-[#1A1A1A] font-bold uppercase tracking-wider text-google-green">
                                Rendered using a Single Bytecode Source
                              </h4>
                              
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 text-xs text-google-gray">
                                  <div className="w-5 h-5 bg-google-blue text-white rounded flex items-center justify-center font-bold text-[10px]">A</div>
                                  <span><strong>Android:</strong> Fully native Canvas APIs</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 text-xs text-google-gray">
                                  <div className="w-5 h-5 bg-[#000000] text-white rounded flex items-center justify-center font-bold text-[10px]">i</div>
                                  <span><strong>iOS:</strong> Direct hardware-accelerated rendering via Skiko/Metal</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 text-xs text-google-gray">
                                  <div className="w-5 h-5 bg-[#3B82F6] text-white rounded flex items-center justify-center font-bold text-[10px]">D</div>
                                  <span><strong>Desktop:</strong> Skia shaders bypassing any web engine overhead</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 15: VISIONARY FINALE (AI + STREAMING) ---
                    case 15:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.8 }}
                          className="flex flex-col justify-around h-full py-2 text-left"
                        >
                          <div>
                            <p className="text-xs font-mono text-google-blue uppercase tracking-widest font-semibold">A Vision of the Future</p>
                            <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              Apps You Don't Even Have to Install
                            </h2>
                          </div>

                          <div className="grid grid-cols-2 gap-12 my-auto items-center pt-2">
                            <div className="space-y-5">
                              <h3 className="text-2xl font-bold text-google-blue leading-snug">
                                Custom Interfaces Generated by AI in Real Time for the User's Context
                              </h3>
                              <p className="text-sm text-[#5F6368] leading-relaxed">
                                Combining <strong className="text-[#1A1A1A]">backend AI + clientside Remote Compose</strong> opens an incredible horizon: an LLM (such as Gemini) runs on the server, understands the user's immediate request, instantly generates a custom UI layout, packages it into a binary payload, and streams it to the client.
                              </p>
                              
                              {/* Bottom Mini Metrics Stats */}
                              <div className="pt-3 border-t border-neutral-100 flex items-center gap-6">
                                <div>
                                  <div className="text-lg font-black text-neutral-800">~140 ms</div>
                                  <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">Build Latency</div>
                                </div>
                                <div className="w-px h-8 bg-neutral-200" />
                                <div>
                                  <div className="text-lg font-black text-google-blue">100% Native</div>
                                  <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">Render Target</div>
                                </div>
                              </div>
                            </div>

                            {/* Dynamic Smartphone Interactive Demonstration Container */}
                            <div className="flex justify-center items-center h-[410px]">
                              <AIGeniPhoneSlide isActive={currentSlide === 15} />
                            </div>
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 16: INTRO TO TECHNOLOGY DUPLICATE ---
                    case 16:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-between h-full py-4 text-center"
                        >
                          <div>
                            <h2 className="text-5xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">
                              Remote Compose
                            </h2>
                          </div>

                          {/* 4 Cards Grid with customized animated icons */}
                          <div className="grid grid-cols-4 gap-8 my-auto max-w-5xl mx-auto w-full pt-8">
                            {[
                              {
                                title: "JSON Free",
                                icon: (
                                  <div className="relative w-20 h-20 flex items-center justify-center select-none">
                                    <div className="text-gray-400 opacity-40 font-extrabold text-sm font-mono tracking-tight bg-gray-50 border border-gray-200 p-3 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                                      <span className="text-xs font-mono">&lt;/&gt;</span>
                                      <span className="text-[10px] font-mono font-bold">JSON</span>
                                    </div>
                                    <div className="absolute w-[84px] h-[3px] bg-google-red/60 rounded-full rotate-45 transform origin-center" />
                                  </div>
                                )
                              },
                              {
                                title: "Binary Serialization",
                                icon: (
                                  <div className="w-20 h-20 bg-google-yellow/5 border border-google-yellow/20 rounded-2xl flex flex-col items-center justify-center p-3 font-mono text-[9px] gap-1 select-none leading-none shadow-xs font-black text-google-yellow/80">
                                    <div className="flex gap-1.5">
                                      <span>0</span><span>1</span><span>0</span><span>0</span>
                                    </div>
                                    <div className="flex gap-1.5 text-google-yellow">
                                      <span>1</span><span>0</span><span>1</span><span>1</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                      <span>0</span><span>1</span><span>1</span><span>0</span>
                                    </div>
                                    <div className="flex gap-1.5 text-google-yellow">
                                      <span>1</span><span>1</span><span>0</span><span>1</span>
                                    </div>
                                  </div>
                                )
                              },
                              {
                                title: "Compose declarative",
                                icon: (
                                  <div className="w-20 h-20 bg-google-blue/5 border border-google-blue/20 rounded-2xl flex items-center justify-center relative shadow-xs overflow-hidden">
                                    {/* Grid background to give a blueprint layout editor vibe */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,115,232,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,115,232,0.06)_1px,transparent_1px)] bg-[size:8px_8px]" />
                                    
                                    {/* Modern Declarative Composable Blocks */}
                                    <div className="relative w-12 h-12 flex flex-col gap-1 border border-google-blue/30 rounded-lg p-1.5 bg-white/95 shadow-xs">
                                      {/* Header row inside component */}
                                      <div className="h-3 w-full bg-google-blue/20 rounded-xs flex items-center px-1 gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-google-blue/60" />
                                        <div className="w-6 h-1 bg-google-blue/40 rounded-full" />
                                      </div>
                                      {/* Content body inside component representing Column/Row */}
                                      <div className="flex-1 flex gap-1">
                                        {/* Child Composable 1 */}
                                        <div className="flex-1 bg-google-blue/10 border border-dashed border-google-blue/30 rounded-xs flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-xs bg-google-blue/40" />
                                        </div>
                                        {/* Child Composable 2 */}
                                        <div className="w-3.5 bg-google-blue/5 border border-dashed border-google-blue/20 rounded-xs flex flex-col gap-0.5 p-0.5 justify-center">
                                          <div className="h-1 w-full bg-google-blue/30 rounded-xs" />
                                          <div className="h-1 w-2/3 bg-google-blue/30 rounded-xs" />
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Decorative floating sparkly component badge */}
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-google-blue animate-pulse" />
                                  </div>
                                )
                              },
                              {
                                title: "Blazing fast",
                                icon: (
                                  <div className="w-20 h-20 bg-google-green/5 border border-google-green/20 rounded-2xl flex items-center justify-center relative shadow-xs">
                                    <Zap className="w-10 h-10 text-google-green fill-google-green/10" />
                                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-google-green animate-ping" />
                                  </div>
                                )
                              }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.6 + idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center gap-6 h-[220px]"
                              >
                                <div className="flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight text-center">{item.title}</h3>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );

                    // --- SLIDE 17: CONCLUSION AND QR CODE ---
                    case 17:
                      return (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className="flex flex-col justify-center items-center h-full text-center space-y-8 select-none"
                        >
                          <div className="space-y-2">
                            <p className="text-xs font-mono text-google-blue uppercase tracking-widest font-semibold">THE END</p>
                            <h1 className="text-6xl font-black text-[#1A1A1A] tracking-tight uppercase leading-none font-sans">
                              Thank You!
                            </h1>
                          </div>

                          <div className="flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden max-w-sm w-full mx-auto">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-google-blue/5 rounded-full blur-2xl font-bold" />
                            
                            {/* QR Code from qr.png */}
                            <div className="w-48 h-48 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-md flex items-center justify-center relative">
                              <img 
                                src="/qr.png" 
                                alt="QR Code" 
                                className="w-full h-full object-contain rounded-lg"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-5 py-2.5 bg-neutral-50/80 border border-neutral-100 rounded-full text-sm font-semibold text-[#1A1A1A] tracking-tight shadow-sm">
                            {/* SVG Telegram logo */}
                            <svg className="w-5 h-5 text-[#24A1DE]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.1.02-1.62 1.02-4.57 3.02-.43.3-.82.45-1.17.44-.39-.01-1.14-.22-1.7-.4-.69-.22-1.24-.34-1.19-.72.03-.2.3-.41.82-.62 3.18-1.38 5.3-2.29 6.36-2.73 3.03-1.26 3.66-1.48 4.07-1.48.09 0 .29.02.42.13.11.09.14.21.15.3l-.01.32z" />
                            </svg>
                            <span className="font-mono text-sm text-neutral-800 tracking-tight select-all">@daniyar_amangeldy</span>
                          </div>
                        </motion.div>
                      );

                    default:
                      return <div className="text-center p-8">Раздел настраивается</div>;
                  }
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- FLOATING KEYBOARD CONTROL HELP MODAL --- */}
      {showHelp && (
        <div 
          onClick={() => setShowHelp(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-2xl max-w-md w-full text-xs text-[#1A1A1A] space-y-4"
          >
            <h3 className="text-sm font-extrabold flex items-center gap-2 border-b border-gray-100 pb-2">
              <Keyboard className="w-4 h-4 text-google-blue" />
              <span>Горячие клавиши &amp; Управление</span>
            </h3>
            <div className="space-y-2.5 font-mono">
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ Пробел ] / [ ArrowRight ] / [ Клик по слайду ]</span>
                <span className="text-[#5F6368]">Вперед</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ ArrowLeft ] / [ Backspace ]</span>
                <span className="text-[#5F6368]">Назад</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ Shift+F ] или кнопка в углу</span>
                <span className="text-[#5F6368]">Полноэкранный режим</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ Автовоспроизведение ] кнопка</span>
                <span className="text-[#5F6368]">Показ каждые 7 секунд</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ Home ] / [ End ]</span>
                <span className="text-[#5F6368]">Старт / Финал презентации</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-semibold text-google-blue">[ Swipe на телефоне ]</span>
                <span className="text-[#5F6368]">Влево/Вправо (навигация)</span>
              </div>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="w-full bg-google-blue hover:bg-google-blue/90 text-white font-bold py-2 rounded shadow transition-all cursor-pointer text-center"
            >
              Закрыть памятку
            </button>
          </div>
        </div>
      )}

      {/* --- FLOATING CONTROL TOOLBAR --- */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-gray-100/80 interactive-element transition-all duration-300 ease-in-out ${
          showDock || showHelp ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
        id="presentation-floating-controls"
      >
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="p-1.5 rounded-full text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          title="Назад (ArrowLeft)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-gray-500 min-w-[50px] text-center font-mono select-none">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </span>

        <button
          onClick={handleNext}
          disabled={currentSlide === TOTAL_SLIDES - 1 && showRemoteCompose}
          className="p-1.5 rounded-full text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          title="Вперед (Space / ArrowRight)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="w-[1px] h-4 bg-gray-200 mx-1" />

        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${isAutoplay ? "text-google-blue bg-google-blue/10 hover:bg-google-blue/20" : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100"}`}
          title={isAutoplay ? "Пауза автовоспроизведения" : "Автовоспроизведение (7 сек)"}
        >
          {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-full text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 transition-all cursor-pointer"
          title={isFullscreen ? "Выйти из полноэкранного режима (F)" : "Полноэкранный режим (F)"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setShowHelp(true)}
          className="p-1.5 rounded-full text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 transition-all cursor-pointer"
          title="Помощь / Памятка"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* --- MOBILE SCREEN RESTRICTION OVERLAY --- */}
      <div className="md:hidden fixed inset-0 bg-[#1A1A1A] z-[9999] flex flex-col items-center justify-center p-8 text-center" id="mobile-restriction-overlay">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md max-w-sm space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-google-red/10 border border-google-red/20 text-google-red rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Smartphone className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Presentation Not Supported on Mobile
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Please open this presentation on a laptop or desktop computer for the proper scaling and interactive experience.
            </p>
          </div>
          <div className="pt-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[#5F6368] border border-[#5F6368]/20 px-3 py-1 rounded-full">
              Desktop Recommended
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
