import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedButtonSlideProps {
  isActive: boolean;
}

const STAGE_DESCRIPTIONS = [
  {
    step: "Step 0: Component Initialization",
    title: "",
    desc: ""
  },
  {
    step: "Step 1: Border Drawing (Vector Path Drawing)",
    title: "Vector Path Drawing",
    desc: "Dynamic calculation and border drawing of the rectangle outline via the Remote Compose renderer."
  },
  {
    step: "Step 2: Rounded Corners (Border Radius Modifier)",
    title: "Symmetrical Corner Rounding",
    desc: "Dynamic corner radius calculation (cornerRadius) to transition the rectangle into a button."
  },
  {
    step: "Step 3: Background Color Fill",
    title: "Google Blue Background Fill",
    desc: "Filling the inner element area with #4285F4 color using smooth alpha transitions."
  },
  {
    step: "Step 4: Typography Overlay",
    title: "Interactive Call to Action",
    desc: "Gradual fading and rendering the text at the center of the viewport."
  },
  {
    step: "Step 5: Drop Shadow Elevation",
    title: "Glow & Elevation Shadows",
    desc: "Applying dynamic spatial drop shadows to elevate the button above the default UI drawing plane."
  },
];

export default function AnimatedButtonSlide({ isActive }: AnimatedButtonSlideProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStage(0);
      return;
    }

    setStage(0);

    // Timeline trigger states matching user's requests precisely
    const timer1 = setTimeout(() => setStage(1), 3000);   // 3s: Draw border (starts going top-left -> right -> down -> left -> up)
    const timer2 = setTimeout(() => setStage(2), 6000);   // 6s: Add rounded corners
    const timer3 = setTimeout(() => setStage(3), 9000);   // 9s: Add blue color fill
    const timer4 = setTimeout(() => setStage(4), 12000);  // 12s: Dissolve/fade in text "press me"
    const timer5 = setTimeout(() => setStage(5), 15000);  // 15s: Add box shadow (and standard glow transitions)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isActive]);

  // Total Perimeter of a 240x64 rect inset by 2 pixels (width=236, height=60) is (236 + 60) * 2 = 592
  const perimeter = 592;

  const currentDesc = STAGE_DESCRIPTIONS[stage] || STAGE_DESCRIPTIONS[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-white select-none overflow-hidden py-16 px-6 gap-12">
      
      {/* Animated Step-by-Step Title Block */}
      <div className="w-full max-w-2xl h-[60px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center absolute"
          >
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              {currentDesc.title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Centered Button Animation Workspace */}
      <div className="flex items-center justify-center h-[200px]">
        <div 
          className="relative w-[240px] h-[64px] flex items-center justify-center transition-all duration-1000"
          style={{
            // Set shadow dynamically based on stage 5
            boxShadow: stage >= 5 
              ? "0 20px 40px -10px rgba(66, 133, 244, 0.45), 0 12px 24px -12px rgba(66, 133, 244, 0.3)" 
              : "0 0px 0px rgba(0,0,0,0)",
            borderRadius: stage >= 2 ? "32px" : "0px",
          }}
        >
          {/* SVG Border Drawing Layer */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 240 64">
            <motion.rect
              x="2"
              y="2"
              width="236"
              height="60"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={perimeter}
              initial={{ strokeDashoffset: perimeter, rx: 0, ry: 0, fill: "rgba(66, 133, 244, 0)", stroke: "#000000" }}
              animate={{
                // Draw border at Stage 1, completely empty before
                strokeDashoffset: stage >= 1 ? 0 : perimeter,
                // Round corners at Stage 2
                rx: stage >= 2 ? 30 : 0,
                ry: stage >= 2 ? 30 : 0,
                // Color fill at Stage 3
                fill: stage >= 3 ? "#4285F4" : "rgba(66, 133, 244, 0)",
                // Border color to blue is introduced at Stage 3
                stroke: stage >= 3 ? "#4285F4" : "#000000"
              }}
              transition={{
                strokeDashoffset: { duration: 3, ease: "linear" }, // takes exactly 3 seconds (starts at 3s, ends at 6s)
                rx: { duration: 1.5, ease: "easeInOut" },          // smooth rounding animation starts at 6s
                ry: { duration: 1.5, ease: "easeInOut" },
                fill: { duration: 1.5, ease: "easeInOut" },        // color fill transition starts at 9s
                stroke: { duration: 1.5, ease: "easeInOut" }       // stroke color transition starts at 9s
              }}
            />
          </svg>

          {/* Text Layer: Press Me */}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 text-white font-sans font-bold text-lg uppercase tracking-wider select-none pointer-events-none"
              >
                press me
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
