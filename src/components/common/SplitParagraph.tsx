"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface SplitParagraphProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitParagraph({ text, className = "", delay = 0 }: SplitParagraphProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: 'lines' });

    // Wrap each line in an overflow-hidden wrapper so they slide out of nowhere
    if (split.lines) {
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "line-wrapper";
        wrapper.style.overflow = "hidden";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.fromTo(
        split.lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: delay,
        }
      );
    }

    return () => {
      split.revert();
    };
  }, [delay]);

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
}
