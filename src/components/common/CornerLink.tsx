"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CornerLinkProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  text: string;
  href: string;
}

export default function CornerLink({ position, text, href }: CornerLinkProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  // Dragging state
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  // Calculate distances based on position
  const isTop = position.includes("top");
  const isLeft = position.includes("left");

  // Determine how the fold visual grows based on drag
  // Using useTransform to map drag distance to fold size
  const maxDrag = 150;
  
  const foldSize = useTransform(
    () => {
      // Base size when just hovered is 40px, 0 when not hovered
      const base = isHovered ? 40 : 0;
      
      // Add drag distance
      const dx = Math.abs(dragX.get());
      const dy = Math.abs(dragY.get());
      const dragDist = Math.min(Math.max(dx, dy), maxDrag);
      
      return base + dragDist;
    }
  );

  // When drag crosses threshold, trigger navigation
  useEffect(() => {
    const unsubscribeX = dragX.on("change", (latest) => {
      if (Math.abs(latest) > maxDrag * 0.8) {
        router.push(href);
      }
    });
    const unsubscribeY = dragY.on("change", (latest) => {
      if (Math.abs(latest) > maxDrag * 0.8) {
        router.push(href);
      }
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [dragX, dragY, router, href]);

  // Positioning classes
  const posClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

  // Drag constraints (can only drag inwards)
  const dragConstraints = {
    "top-left": { left: 0, top: 0, right: maxDrag, bottom: maxDrag },
    "top-right": { left: -maxDrag, top: 0, right: 0, bottom: maxDrag },
    "bottom-left": { left: 0, top: -maxDrag, right: maxDrag, bottom: 0 },
    "bottom-right": { left: -maxDrag, top: -maxDrag, right: 0, bottom: 0 },
  }[position];

  // Clip paths for the folded flap
  // The flap is a triangle. We will use a square div and clip it into a triangle.
  const flapClip = {
    "top-left": "polygon(100% 0, 0 100%, 100% 100%)", // bottom-right triangle
    "top-right": "polygon(0 0, 0 100%, 100% 100%)",   // bottom-left triangle
    "bottom-left": "polygon(100% 100%, 100% 0, 0 0)", // top-right triangle
    "bottom-right": "polygon(0 100%, 0 0, 100% 0)",   // top-left triangle
  }[position];

  return (
    <div 
      className={`absolute ${posClasses} z-50 w-32 h-32 md:w-48 md:h-48`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        dragX.set(0);
        dragY.set(0);
      }}
    >
      {/* Background reveal (The color of the next page) */}
      <motion.div
        className={`absolute ${posClasses} bg-syedhaziq-gold pointer-events-none`}
        style={{
          width: foldSize,
          height: foldSize,
        }}
      />
      
      {/* The Folded Paper Flap */}
      <motion.div
        className={`absolute ${posClasses} bg-syedhaziq-surface shadow-2xl pointer-events-none origin-center`}
        style={{
          width: foldSize,
          height: foldSize,
          clipPath: flapClip,
          // Subtle rotate to make it look like a real fold
          rotate: isHovered ? (isLeft ? (isTop ? -5 : 5) : (isTop ? 5 : -5)) : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Invisible Draggable Handle */}
      <motion.div
        className={`absolute ${posClasses} w-16 h-16 cursor-grab active:cursor-grabbing`}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum={false}
        style={{ x: dragX, y: dragY }}
      />

      {/* The Link Text */}
      <div className={`absolute ${isTop ? 'top-8 md:top-12' : 'bottom-8 md:bottom-12'} ${isLeft ? 'left-6 md:left-12' : 'right-6 md:right-12'} pointer-events-none`}>
        <span className="text-syedhaziq-text text-xs md:text-sm font-display font-medium tracking-[0.2em] uppercase transition-opacity">
          {text}
        </span>
      </div>
    </div>
  );
}
