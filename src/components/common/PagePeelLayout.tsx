"use client";

import { useState, useEffect, useCallback } from "react";
import CornerButton, { CornerPosition } from "./CornerButton";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PagePeelLayoutProps {
  topLayer: React.ReactNode;
  sections: {
    "top-left": React.ReactNode;
    "top-right": React.ReactNode;
    "bottom-left": React.ReactNode;
    "bottom-right": React.ReactNode;
  };
  labels: {
    "top-left": string;
    "top-right": string;
    "bottom-left": string;
    "bottom-right": string;
  };
}

export default function PagePeelLayout({ topLayer, sections, labels }: PagePeelLayoutProps) {
  const [openedSection, setOpenedSection] = useState<CornerPosition | null>(null);
  
  const handleOpen = useCallback((pos: CornerPosition) => {
    setOpenedSection(pos);
  }, []);

  const handleClose = useCallback(() => {
    setOpenedSection(null);
  }, []);

  useEffect(() => {
    if (!openedSection) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openedSection]);

  // Framer Motion peel animations
  const peelVariants = {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    peel_top_left: {
      clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      transition: { duration: 1.2 }
    },
    peel_top_right: {
      clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
      transition: { duration: 1.2 }
    },
    peel_bottom_left: {
      clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)",
      transition: { duration: 1.2 }
    },
    peel_bottom_right: {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
      transition: { duration: 1.2 }
    }
  };

  const currentVariant = openedSection ? `peel_${openedSection.replace("-", "_")}` : "initial";

  return (
    <div className="relative w-full min-h-screen bg-syedhaziq-bg">
      
      {/* Background Layer */}
      <div className="w-full min-h-screen z-0 bg-syedhaziq-bg">
        {openedSection && (
          <div className="w-full min-h-screen">
            {sections[openedSection]}
          </div>
        )}
      </div>

      {/* Top Layer: The Home Page */}
      <motion.div 
        className="absolute inset-0 w-full h-screen z-10 origin-center bg-syedhaziq-bg overflow-hidden pointer-events-none"
        variants={peelVariants}
        initial="initial"
        animate={currentVariant}
      >
        <div className="pointer-events-auto h-full w-full">
          {topLayer}
        </div>
      </motion.div>

      {/* Render the 4 corners */}
      <AnimatePresence>
        {!openedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            {(["top-left", "top-right", "bottom-left", "bottom-right"] as CornerPosition[]).map((pos) => (
              <div key={pos} className="pointer-events-auto">
                <CornerButton 
                  position={pos} 
                  label={labels[pos]} 
                  onOpen={handleOpen}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close Button */}
      <AnimatePresence>
        {openedSection && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleClose}
            className="fixed top-8 right-8 z-50 p-3 bg-syedhaziq-bg text-syedhaziq-text rounded-full hover:bg-syedhaziq-gold hover:text-syedhaziq-bg transition-colors shadow-lg pointer-events-auto"
          >
            <X size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
