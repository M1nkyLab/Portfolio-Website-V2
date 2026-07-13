"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-syedhaziq-bg text-syedhaziq-text flex flex-col items-center justify-center relative overflow-hidden font-body">
      
      {/* Glitchy Text Effect */}
      <motion.div
        initial={{ 
          opacity: 0, 
          filter: "url(#pixelate) blur(12px)", 
          scale: 0.9 
        }}
        animate={{ 
          opacity: [0, 0.5, 1],
          filter: [
            "url(#pixelate) blur(12px)", 
            "url(#pixelate) blur(4px)", 
            "url(#none) blur(0px)"
          ], 
          scale: [0.9, 0.98, 1]
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.5, 1],
          ease: "linear",
        }}
        className="flex flex-col items-center z-10"
      >
        <h1 className="text-8xl md:text-[10rem] font-display font-bold tracking-tighter mb-4 text-syedhaziq-gold">404</h1>
        <p className="text-xl md:text-2xl mb-8 uppercase tracking-widest text-syedhaziq-muted">Signal Lost / Sector Not Found</p>
        
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-syedhaziq-gold text-syedhaziq-gold hover:bg-syedhaziq-gold hover:text-syedhaziq-bg transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
          >
            Return to Base
          </motion.button>
        </Link>
      </motion.div>

      {/* Background Decorative Rings */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[1px] border-syedhaziq-text rounded-full absolute" />
        <div className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] border-[1px] border-syedhaziq-text rounded-full absolute" />
      </motion.div>
    </div>
  );
}
