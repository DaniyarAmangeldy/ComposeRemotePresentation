import React, { useEffect, useRef, useState } from "react";

// @ts-ignore
import untitledWebm from "../../untitled.webm";

interface SmartphoneVideoDemoSlideProps {
  isActive: boolean;
}

export default function SmartphoneVideoDemoSlide({ isActive }: SmartphoneVideoDemoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure it's muted & ready for inline play
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay failed or prevented:", error);
        });
      }
    };

    if (isActive) {
      video.currentTime = 0;
      
      // Try to play immediately if already loaded
      if (video.readyState >= 3) {
        tryPlay();
      } else {
        video.load();
      }

      // Add listeners to play as soon as enough data loads
      video.addEventListener("canplay", tryPlay);
      video.addEventListener("canplaythrough", tryPlay);
      video.addEventListener("loadeddata", tryPlay);

      // Simple interval fallback to make extra sure it triggers when active
      const fallbackInterval = setInterval(() => {
        if (video.paused) {
          tryPlay();
        } else {
          clearInterval(fallbackInterval);
        }
      }, 250);

      return () => {
        clearInterval(fallbackInterval);
        video.removeEventListener("canplay", tryPlay);
        video.removeEventListener("canplaythrough", tryPlay);
        video.removeEventListener("loadeddata", tryPlay);
      };
    } else {
      video.pause();
    }
  }, [isActive]);

  const handlePhoneClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(err => console.log(err));
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white pointer-events-auto select-none">
      
      {/* Sleek, Centered Smartphone Frame Mockup */}
      <div 
        onClick={handlePhoneClick}
        className="relative w-[280px] h-[550px] md:w-[300px] md:h-[590px] bg-slate-950 rounded-[44px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-[5px] border-slate-900 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-[0.98]"
      >
        
        {/* Inner Screen Canvas Container */}
        <div className="w-full h-full bg-black rounded-[33px] overflow-hidden relative flex flex-col justify-between z-10 border border-slate-900">
          
          <video
            ref={videoRef}
            src={untitledWebm}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover rounded-[32px] absolute inset-0 z-20"
          >
            <source src={untitledWebm} type="video/webm" />
            <source src="/untitled.webm" type="video/webm" />
            <source src="untitled.webm" type="video/webm" />
          </video>

        </div>
      </div>

    </div>
  );
}

