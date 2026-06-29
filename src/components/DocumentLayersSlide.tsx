import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Sliders, Cpu, Activity, Zap } from "lucide-react";

interface DocumentLayersSlideProps {
  isActive: boolean;
}

const OPERATIONS_LIST = [
  "ACCESSIBILITY_SEMANTICS",
  "ANIMATED_FLOAT",
  "ANIMATION_SPEC",
  "ATTRIBUTE_COLOR",
  "ATTRIBUTE_IMAGE",
  "ATTRIBUTE_TEXT",
  "ATTRIBUTE_TIME",
  "BITMAP_TEXT_MEASURE",
  "CLICK_AREA",
  "CLIP_PATH",
  "CLIP_RECT",
  "COLOR_CONSTANT",
  "COLOR_EXPRESSIONS",
  "COLOR_THEME",
  "COMPONENT_START",
  "COMPONENT_VALUE",
  "CONDITIONAL_OPERATIONS",
  "CONTAINER_END",
  "CORE_TEXT",
  "DATA_BITMAP",
  "DATA_BITMAP_FONT",
  "DATA_BOOLEAN",
  "DATA_FLOAT",
  "DATA_FONT",
  "DATA_INT",
  "DATA_LONG",
  "DATA_MAP_LOOKUP",
  "DATA_PATH",
  "DATA_SHADER",
  "DATA_TEXT",
  "DEBUG_MESSAGE",
  "DRAW_ARC",
  "DRAW_BITMAP",
  "DRAW_BITMAP_INT",
  "DRAW_BITMAP_SCALED",
  "DRAW_BITMAP_TEXT_ANCHORED",
  "DRAW_BITMAP_FONT_TEXT_RUN",
  "DRAW_BITMAP_FONT_TEXT_RUN_ON_PATH",
  "DRAW_CIRCLE",
  "DRAW_CONTENT",
  "DRAW_LINE",
  "DRAW_OVAL",
  "DRAW_PATH",
  "DRAW_RECT",
  "DRAW_ROUND_RECT",
  "DRAW_SECTOR",
  "DRAW_TEXT_ANCHOR",
  "DRAW_TEXT_ON_CIRCLE",
  "DRAW_TEXT_ON_PATH",
  "DRAW_TEXT_RUN",
  "DRAW_TO_BITMAP",
  "DRAW_TWEEN_PATH",
  "DYNAMIC_FLOAT_LIST",
  "EXTENDED_OPCODE",
  "EXTENSION_RANGE_RESERVED_1",
  "EXTENSION_RANGE_RESERVED_2",
  "EXTENSION_RANGE_RESERVED_3",
  "EXTENSION_RANGE_RESERVED_4",
  "FLOAT_LIST",
  "FUNCTION_CALL",
  "FUNCTION_DEFINE",
  "HAPTIC_FEEDBACK",
  "HEADER",
  "HOST_ACTION",
  "HOST_METADATA_ACTION",
  "HOST_NAMED_ACTION",
  "ID_LIST",
  "ID_LOOKUP",
  "ID_MAP",
  "IMPULSE_PROCESS",
  "IMPULSE_START",
  "INCLUDE_REFERENCED_OPERATIONS",
  "INTEGER_EXPRESSION",
  "LAYOUT_BOX",
  "LAYOUT_CANVAS",
  "LAYOUT_CANVAS_CONTENT",
  "LAYOUT_COLLAPSIBLE_COLUMN",
  "LAYOUT_COLLAPSIBLE_ROW",
  "LAYOUT_COLUMN",
  "LAYOUT_COMPUTE",
  "LAYOUT_CONTENT",
  "LAYOUT_FIT_BOX",
  "LAYOUT_FLOW",
  "LAYOUT_IMAGE",
  "LAYOUT_ROOT",
  "LAYOUT_ROW",
  "LAYOUT_STATE",
  "LAYOUT_TEXT",
  "LOAD_BITMAP",
  "LOOP_START",
  "MACRO_ARGUMENT",
  "MACRO_BLOCK",
  "MACRO_CALL",
  "MACRO_DEFINE",
  "MACRO_FOR_EACH",
  "MATRIX_CONSTANT",
  "MATRIX_EXPRESSION",
  "MATRIX_FROM_PATH",
  "MATRIX_RESTORE",
  "MATRIX_ROTATE",
  "MATRIX_SAVE",
  "MATRIX_SCALE",
  "MATRIX_SET",
  "MATRIX_SKEW",
  "MATRIX_TRANSLATE",
  "MATRIX_VECTOR_MATH",
  "MODIFIER_ALIGN_BY",
  "MODIFIER_BACKGROUND",
  "MODIFIER_BORDER",
  "MODIFIER_CLICK",
  "MODIFIER_CLIP_RECT",
  "MODIFIER_COLLAPSIBLE_PRIORITY",
  "MODIFIER_DIMENSION_CONSTRAINTS",
  "MODIFIER_DRAW_CONTENT",
  "MODIFIER_GRAPHICS_LAYER",
  "MODIFIER_HEIGHT",
  "MODIFIER_HEIGHT_IN",
  "MODIFIER_MARQUEE",
  "MODIFIER_MULTI_CLICK",
  "MODIFIER_OFFSET",
  "MODIFIER_PADDING",
  "MODIFIER_RIPPLE",
  "MODIFIER_ROUNDED_CLIP_RECT",
  "MODIFIER_SCROLL",
  "MODIFIER_TOUCH_CANCEL",
  "MODIFIER_TOUCH_DOWN",
  "MODIFIER_TOUCH_UP",
  "MODIFIER_VISIBILITY",
  "MODIFIER_WIDTH",
  "MODIFIER_WIDTH_IN",
  "MODIFIER_ZINDEX",
  "NAMED_VARIABLE",
  "PAINT_VALUES",
  "PARTICLE_COMPARE",
  "PARTICLE_DEFINE",
  "PARTICLE_LOOP",
  "PARTICLE_PROCESS",
  "PATH_ADD",
  "PATH_COMBINE",
  "PATH_CREATE",
  "PATH_EXPRESSION",
  "PATH_TWEEN",
  "REFERENCED_OPERATIONS",
  "REM",
  "ROOT_CONTENT_BEHAVIOR",
  "ROOT_CONTENT_DESCRIPTION",
  "RUN_ACTION",
  "SKIP",
  "TEXT_FROM_FLOAT",
  "TEXT_LENGTH",
  "TEXT_LOOKUP",
  "TEXT_LOOKUP_INT",
  "TEXT_MEASURE",
  "TEXT_MERGE",
  "TEXT_STYLE",
  "TEXT_SUBTEXT",
  "TEXT_TRANSFORM",
  "THEME",
  "TOUCH_EXPRESSION",
  "UPDATE",
  "UPDATE_DYNAMIC_FLOAT_LIST",
  "VALUE_FLOAT_CHANGE_ACTION",
  "VALUE_FLOAT_EXPRESSION_CHANGE_ACTION",
  "VALUE_INTEGER_CHANGE_ACTION",
  "VALUE_INTEGER_EXPRESSION_CHANGE_ACTION",
  "VALUE_STRING_CHANGE_ACTION",
  "WAKE_IN"
];

// Seeded pseudorandom generator for identical positions across mounts
function createSeededRandom(seed: number) {
  return function() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

export default function DocumentLayersSlide({ isActive }: DocumentLayersSlideProps) {
  const [animationStage, setAnimationStage] = useState(0);
  const [count, setCount] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setAnimationStage(0);
      setCount(0);
      setHasReachedEnd(false);
      setHighlightedIndices([]);
      return;
    }

    // Sequence of animations:
    // 0: Initial flat document in center (0ms to 1200ms)
    // 1: Perspective Tilt & Stack separation begins (1200ms to 2400ms)
    // 2: Move to side & trigger counting operation text (2400ms onwards)
    const timers = [
      setTimeout(() => setAnimationStage(1), 1200),
      setTimeout(() => setAnimationStage(2), 2400),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isActive]);

  // Operations counter logic
  useEffect(() => {
    if (animationStage < 2) {
      setCount(0);
      setHasReachedEnd(false);
      return;
    }

    let start: number | null = null;
    const duration = 1400; // Counter rolls up in 1.4 seconds
    const startValue = 0;
    const endValue = 168;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(
        endValue,
        Math.floor(startValue + (progress / duration) * (endValue - startValue))
      );
      setCount(val);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
        setHasReachedEnd(true);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationStage]);

  // Generate constellation layout positions
  const customStars = useMemo(() => {
    const random = createSeededRandom(42);
    const cols = 13;
    const rows = 13;
    
    return OPERATIONS_LIST.map((name, index) => {
      const colIndex = index % cols;
      const rowIndex = Math.floor(index / cols);

      // Map to 1.5% - 98.5% to occupy more space (increasing cloud size)
      const baseLeft = 1.5 + (colIndex / (cols - 1)) * 97;
      const baseTop = 2.0 + (rowIndex / (rows - 1)) * 96;

      // Jitter offset
      const jitterX = (random() - 0.5) * 5; // max +/- 2.5%
      const jitterY = (random() - 0.5) * 5; // max +/- 2.5%

      return {
        name,
        index,
        left: Math.min(98.5, Math.max(1.5, baseLeft + jitterX)),
        top: Math.min(98.5, Math.max(2.0, baseTop + jitterY)),
        size: 0.75 + random() * 0.45,       // size multiplier
        baseOpacity: 0.16 + random() * 0.14, // resting opacity on white bg
        speed: 1.5 + random() * 2 // slight float timing speed
      };
    });
  }, []);

  // Soft shimmering effect for the constellation (only runs when hasReachedEnd is true)
  useEffect(() => {
    if (!hasReachedEnd || !isActive) {
      setHighlightedIndices([]);
      return;
    }

    const triggerTwinkle = () => {
      // Choose 3-5 random indices to highlight
      const countToHighlight = 3 + Math.floor(Math.random() * 3);
      const indices: number[] = [];
      for (let i = 0; i < countToHighlight; i++) {
        const randIdx = Math.floor(Math.random() * OPERATIONS_LIST.length);
        if (!indices.includes(randIdx)) {
          indices.push(randIdx);
        }
      }
      setHighlightedIndices(indices);
    };

    triggerTwinkle();
    const interval = setInterval(triggerTwinkle, 2500);
    return () => clearInterval(interval);
  }, [hasReachedEnd, isActive]);

  // 7 layered hierarchy detailing layout engine steps
  const layers = [
    {
      id: "opt-7",
      name: "Render Context",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      icon: <Cpu className="w-3.5 h-3.5 mr-1" />,
      desc: "Draw calls & Canvas nodes mapping",
      offsetZ: 150,
      offsetY: -60,
      offsetX: -30,
      delay: 0.48,
    },
    {
      id: "opt-6",
      name: "Layout Constraints",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      icon: <Zap className="w-3.5 h-3.5 mr-1" />,
      desc: "Calculating intrinsic widths & bounds coordinates",
      offsetZ: 125,
      offsetY: -40,
      offsetX: -20,
      delay: 0.40,
    },
    {
      id: "opt-5",
      name: "Modifier Applier",
      color: "bg-sky-500",
      textColor: "text-sky-500",
      icon: <Sliders className="w-3.5 h-3.5 mr-1" />,
      desc: "RemoteModifier layout & padding processing",
      offsetZ: 100,
      offsetY: -20,
      offsetX: -10,
      delay: 0.32,
    },
    {
      id: "opt-4",
      name: "Composable Operations",
      color: "bg-indigo-500",
      textColor: "text-indigo-500",
      icon: <Layers className="w-3.5 h-3.5 mr-1" />,
      desc: "Column, Row, Text tree structures translation",
      offsetZ: 75,
      offsetY: 0,
      offsetX: 0,
      delay: 0.24,
    },
    {
      id: "opt-3",
      name: "Dynamic Node Resolver",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      icon: <Cpu className="w-3.5 h-3.5 mr-1" />,
      desc: "Generating virtual DOM node structures",
      offsetZ: 50,
      offsetY: 20,
      offsetX: 10,
      delay: 0.16,
    },
    {
      id: "opt-2",
      name: "Schema Validator",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      icon: <Sliders className="w-3.5 h-3.5 mr-1" />,
      desc: "Inspecting semantic layout compatibility",
      offsetZ: 25,
      offsetY: 40,
      offsetX: 20,
      delay: 0.08,
    },
    {
      id: "opt-1",
      name: "Binary Protocol Parser",
      color: "bg-rose-500",
      textColor: "text-rose-500",
      icon: <Activity className="w-3.5 h-3.5 mr-1" />,
      desc: "Parsing protobuf UI.bin byte buffer stream",
      offsetZ: 0,
      offsetY: 60,
      offsetX: 30,
      delay: 0,
    }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white text-slate-800 select-none overflow-hidden px-12 py-6">
      
      {/* BACKGROUND: Space Stars Backdrop Dust (Visible always, slightly stronger on cloud reveal) */}
      <motion.div 
        animate={{ opacity: hasReachedEnd ? 0.35 : 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none z-0" 
      />

      {/* BACKGROUND: OPERATIONS GALAXY CLOUD (Fades in dynamically after count reaches 168) */}
      <AnimatePresence>
        {hasReachedEnd && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center p-6"
          >
            <div className="relative w-full h-full max-w-[1240px] max-h-[680px] overflow-hidden">
              {customStars.map((star) => {
                const isGlowing = highlightedIndices.includes(star.index);

                return (
                  <motion.div
                    key={star.name}
                    className="absolute whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${star.left}%`,
                      top: `${star.top}%`,
                    }}
                    animate={{
                      scale: isGlowing ? 1.55 : star.size,
                      opacity: isGlowing ? 1 : star.baseOpacity,
                      color: isGlowing ? "#1d4ed8" : "#94a3b8", // Blue-700 glow vs slate-400 baseline
                      textShadow: isGlowing 
                        ? "0 0 12px rgba(29, 78, 216, 0.45), 0 0 24px rgba(29, 78, 216, 0.2)" 
                        : "0 0 0px rgba(0,0,0,0)",
                    }}
                    transition={{
                      duration: isGlowing ? 0.6 : star.speed,
                      ease: "easeInOut",
                    }}
                  >
                    <span className={`transition-all duration-300 ${isGlowing ? "font-black text-xs tracking-tight" : "font-semibold text-[10px] tracking-tight opacity-75"}`}>
                      {star.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial soft gradient vignetting directly over the constellation for superb foreground legibility */}
      <motion.div
        animate={{ opacity: hasReachedEnd ? 0.75 : 0 }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,white_40%,rgba(255,255,255,0)_85%)] z-10"
      />

      {/* FOREGROUND SLIDE STAGE CONTAINER */}
      <div className="w-full max-w-5xl h-full flex items-center justify-center relative z-20">
        
        {/* Left/Center Document Stack Wrapper */}
        <motion.div
          animate={{
            x: animationStage >= 2 ? -240 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 18,
          }}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative w-[340px] h-[450px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: animationStage >= 1 ? 40 : 0,
              rotateY: animationStage >= 1 ? -32 : 0,
              rotateZ: animationStage >= 1 ? -5 : 0,
              y: animationStage >= 1 ? 15 : 0,
              scale: animationStage >= 1 ? 0.95 : 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 15,
              mass: 1.1
            }}
          >
            {/* STAGE 0: Default Single Document (Flat at center) */}
            {animationStage === 0 && (
              <motion.div
                layoutId="single-doc"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-50 bg-white border border-neutral-300/90 w-[210px] h-[280px] rounded-2xl p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* Folded Top-Right Corner */}
                <div 
                  className="absolute top-0 right-0 w-8 h-8 bg-sky-500/90 rounded-bl-xl border-b border-l border-white"
                  style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-sky-500" />
                    <div className="w-16 h-2 bg-neutral-200 rounded-full" />
                  </div>
                  <div className="space-y-1.5 mt-4">
                    <div className="w-4/5 h-1.5 bg-neutral-100 rounded-full" />
                    <div className="w-11/12 h-1.5 bg-neutral-100 rounded-full" />
                    <div className="w-2/3 h-1.5 bg-neutral-100 rounded-full" />
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-100 px-3 py-2 rounded-xl text-xs font-mono font-black text-sky-600 text-center uppercase tracking-wider">
                  UI.bin
                </div>
              </motion.div>
            )}

            {/* STAGE 1 & 2: Exploded/Separated 3D Layer Stack (7 Layers) */}
            {animationStage >= 1 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                {layers.map((layer) => (
                  <motion.div
                    key={layer.id}
                    initial={{ 
                      opacity: 0,
                      z: 0,
                      y: 0,
                      x: 0
                    }}
                    animate={{ 
                      opacity: 0.95 - (layers.indexOf(layer) * 0.04),
                      z: layer.offsetZ,
                      y: layer.offsetY,
                      x: layer.offsetX,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 65,
                      damping: 14,
                      delay: layer.delay
                    }}
                    className="absolute bg-white/95 border border-neutral-200/80 w-[230px] h-[175px] rounded-xl p-4 flex flex-col justify-between shadow-[0_12px_28px_rgba(0,0,0,0.06)] select-none hover:border-sky-500/40 transition-colors"
                    style={{ 
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Layer Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${layer.color}`} />
                        <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider">
                          Layer {7 - layers.indexOf(layer)}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold ${layer.textColor} flex items-center bg-gray-50/50 px-2 py-0.5 rounded-full border border-gray-100`}>
                        {layer.icon}
                        {layer.name.split(" ")[0]}
                      </span>
                    </div>

                    {/* Layer Inner Info */}
                    <div className="flex-grow my-1.5 border border-dashed border-neutral-200 rounded-lg p-2 flex flex-col justify-center space-y-0.5 bg-neutral-50/30">
                      <div className={`text-[11px] font-bold leading-tight ${layer.textColor}`}>
                        {layer.name}
                      </div>
                      <p className="text-[9px] text-neutral-500 font-medium leading-normal">
                        {layer.desc}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-neutral-100 pt-1 mt-0.5">
                      <span className="text-[7.5px] font-mono text-neutral-400">Z-DEPTH: +{layer.offsetZ}px</span>
                      <span className="text-[7.5px] font-mono text-sky-500 font-semibold bg-sky-50/60 px-1 py-0.2 rounded">PARSE_OK</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Symmetrical Sided Title & Counters */}
        <div className="absolute right-0 w-[460px] flex items-center justify-center h-full pointer-events-none">
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6"
              >
                {/* Operations counter with strong bounce */}
                <motion.div 
                  animate={hasReachedEnd ? { 
                    scale: [1, 1.25, 0.93, 1.05, 1],
                    y: [0, -15, 4, -2, 0]
                  } : { scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.75, 
                    ease: "easeOut"
                  }}
                  className="text-8xl font-black text-[#1A1A1A] font-mono tracking-tighter w-48 text-right pr-2"
                >
                  {count}
                </motion.div>

                {/* Elegant separator bar matching brand styling */}
                <div className="w-1.5 h-16 bg-[#1A1A1A] rounded-full flex-shrink-0" />

                {/* Right Text Block (Centered titles, layout aligned perfectly with counter) */}
                <div className="flex flex-col justify-center text-left">
                  <p className="text-[11px] font-mono text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-neutral-400" /> Layer Operations Engine
                  </p>
                  <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tighter leading-none mt-1.5 uppercase">
                    Operations
                  </h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
