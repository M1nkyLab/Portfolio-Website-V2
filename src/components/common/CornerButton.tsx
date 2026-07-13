"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerButtonProps {
  position: CornerPosition;
  label: string;
  onOpen: (pos: CornerPosition) => void;
}

export default function CornerButton({ position, label, onOpen }: CornerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // CSS classes for absolute positioning
  const posClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

  const textClasses = {
    "top-left": "top-8 left-8 md:top-12 md:left-12 origin-top-left",
    "top-right": "top-8 right-8 md:top-12 md:right-12 origin-top-right",
    "bottom-left": "bottom-8 left-8 md:bottom-12 md:left-12 origin-bottom-left",
    "bottom-right": "bottom-8 right-8 md:bottom-12 md:right-12 origin-bottom-right",
  }[position];

  return (
    <div 
      className={`absolute ${posClasses} w-32 h-32 md:w-48 md:h-48 z-50 cursor-pointer flex items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(position)}
    >
      <motion.div 
        className={`absolute ${textClasses} z-40 pointer-events-none`}
        animate={{ 
          scale: isHovered ? 1.05 : 1, 
          color: isHovered ? "var(--syedhaziq-gold)" : "var(--syedhaziq-text)" 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span className="text-xs md:text-sm font-body font-medium tracking-[0.2em] uppercase transition-colors">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
