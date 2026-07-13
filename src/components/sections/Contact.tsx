"use client";

import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" data-cursor-invert="true" className="min-h-screen bg-syedhaziq-gold text-syedhaziq-bg px-6 py-12 md:p-12 flex flex-col justify-between">
      
      {/* Invisible spacer to maintain the vertical centering gap */}
      <div aria-hidden="true" className="h-10 mt-8"></div>
      {/* Center Huge Text */}
      <div className="flex flex-col items-center justify-center flex-1 my-16 text-center">
        <h2 className="text-[10vw] leading-[0.85] font-display font-bold tracking-wide">
          Say hello,<br />
          I don&apos;t bite.
        </h2>

        <a 
          href="mailto:syedhaziq457@gmail.com"
          className="mt-12 group flex items-center gap-4 bg-syedhaziq-bg text-syedhaziq-gold px-8 py-4 rounded-full text-lg md:text-xl font-display font-medium hover:scale-105 transition-transform"
        >
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          Talk to me
        </a>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-12 md:gap-0 text-sm md:text-base font-body w-full">
        
        {/* Left: Social */}
        <div className="md:w-1/3">
          <h4 className="uppercase font-bold mb-4 tracking-widest">SOCIAL</h4>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/M1nkyLab" target="_blank" rel="noopener noreferrer" className="border border-syedhaziq-bg rounded-full px-4 py-1 hover:bg-syedhaziq-bg hover:text-syedhaziq-gold transition-colors">GH</a>
            <a href="https://flowcv.com/resume/15q6rasuhf0t" target="_blank" rel="noopener noreferrer" className="border border-syedhaziq-bg rounded-full px-4 py-1 hover:bg-syedhaziq-bg hover:text-syedhaziq-gold transition-colors">RESUME</a>
          </div>
        </div>

        {/* Right: Location */}
        <div className="md:w-1/3 md:text-right">
          <h4 className="uppercase font-bold mb-4 tracking-widest">LOCATION</h4>
          <div className="flex flex-col gap-2 opacity-80">
            <p>Kuala Lumpur,</p>
            <p>Malaysia</p>
          </div>
        </div>

      </div>

    </footer>
  );
}
