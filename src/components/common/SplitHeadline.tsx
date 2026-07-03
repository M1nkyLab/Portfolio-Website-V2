"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface SplitHeadlineProps {
  text: string;
  className?: string;
}

export default function SplitHeadline({ text, className = "" }: SplitHeadlineProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Use SplitType to split the text into lines, words, chars
    const split = new SplitType(textRef.current, { types: 'lines,words,chars' });

    // Animate the characters
    gsap.fromTo(
      split.chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1, // brief delay for layout calculation
      }
    );

    // Revert on unmount
    return () => {
      split.revert();
    };
  }, []);

  return (
    <h1 ref={textRef} className={className}>
      {text}
    </h1>
  );
}
