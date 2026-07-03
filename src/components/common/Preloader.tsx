"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    let timeoutId: NodeJS.Timeout;
    
    const updateProgress = () => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setPercentage(100);
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, 1200); // Give time to read "WELCOME"
      } else {
        setPercentage(Math.floor(currentProgress));
        timeoutId = setTimeout(updateProgress, Math.random() * 100 + 50);
      }
    };

    updateProgress();

    return () => clearTimeout(timeoutId);
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div id="preloader-mount">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-rora-bg"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-center">
              {/* Text indicator */}
              <div className="h-10 flex items-center justify-center mb-4">
                <AnimatePresence mode="wait">
                  {percentage < 100 ? (
                    <motion.div 
                      key="percentage"
                      className="text-[#603434] text-2xl md:text-3xl font-bold tracking-widest font-display uppercase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {percentage}%
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="welcome"
                      className="text-[#603434] text-2xl md:text-3xl font-bold tracking-[0.3em] md:tracking-[0.4em] font-display uppercase ml-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      Heyyyyy
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Horizontal Line Progress */}
              <div className="w-64 md:w-80 h-[3px] bg-[#603434]/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#603434]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
