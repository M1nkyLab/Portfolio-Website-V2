"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface LoopingHeadlineProps {
  texts: string[];
  className?: string;
}

export default function LoopingHeadline({ texts, className = "" }: LoopingHeadlineProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    // Use SplitType to split the text into lines, words, chars
    const split = new SplitType(textRef.current, { types: 'lines,words,chars' });

    // Ensure initial state
    gsap.set(split.chars, { y: 40, opacity: 0 });
    
    // Reveal container if it was hidden during the text switch
    if (textRef.current) {
      textRef.current.style.opacity = '1';
    }

    // Animate the characters in
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait, then animate out
        gsap.to(split.chars, {
          y: -40,
          opacity: 0,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.inOut",
          delay: 2.5,
          onComplete: () => {
            if (textRef.current) {
              textRef.current.style.opacity = '0';
            }
            split.revert();
            setIndex((prev) => (prev + 1) % texts.length);
          }
        });
      }
    });

    tl.to(
      split.chars,
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    // Revert on unmount
    return () => {
      split.revert();
      tl.kill();
    };
  }, [index, texts]);

  return (
    <h1 ref={textRef} className={className}>
      {texts[index]}
    </h1>
  );
}
