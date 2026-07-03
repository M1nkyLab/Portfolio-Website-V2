"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    // Use quickTo for better performance
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });
    
    const xToGlow = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const yToGlow = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      xToCursor(mouseX);
      yToCursor(mouseY);
      
      xToGlow(mouseX);
      yToGlow(mouseY);

      // Check if hovering over a deep red background section
      const target = e.target as HTMLElement;
      if (target.closest && target.closest('[data-cursor-invert="true"]')) {
        cursor.classList.add('border-[#f4f3ef]', 'bg-[#f4f3ef]/20');
        cursor.classList.remove('border-[#603434]', 'bg-[#603434]/10');
        glow.classList.add('bg-[#f4f3ef]');
        glow.classList.remove('bg-[#603434]');
      } else {
        cursor.classList.add('border-[#603434]', 'bg-[#603434]/10');
        cursor.classList.remove('border-[#f4f3ef]', 'bg-[#f4f3ef]/20');
        glow.classList.add('bg-[#603434]');
        glow.classList.remove('bg-[#f4f3ef]');
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[50] hidden h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#603434] opacity-[0.25] blur-[70px] transition-colors duration-500 md:block"
      />
      
      {/* Small dot cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#603434] bg-[#603434]/10 transition-colors duration-500 md:block"
      />
    </>
  );
}
