"use client";

import LoopingHeadline from "../common/LoopingHeadline";
import HoverGrid from "../common/HoverGrid";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-24 bg-syedhaziq-bg">
      {/* Noise Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Interactive Background Grid */}
      <HoverGrid />
      {/* Corner Navigation Words removed: PagePeelLayout injects them */}

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center">
        
        <LoopingHeadline 
          texts={["Syed Haziq", "Frontend Developer", "UI Engineer"]} 
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black text-syedhaziq-text leading-[1.05] tracking-tight mb-8 text-center" 
        />
        

        

      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
