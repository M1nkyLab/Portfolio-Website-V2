"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", filter: "blur(10px)", y: 50 }}
      animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "blur(0px)", y: 0 }}
      transition={{ 
        duration: 0.9, 
        ease: [0.76, 0, 0.24, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
