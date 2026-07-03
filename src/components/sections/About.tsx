"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" data-cursor-invert="true" ref={sectionRef} className="min-h-screen pt-24 pb-0 md:pt-32 bg-[#603434] flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 w-full px-6 md:px-12 lg:px-24">
        <div className="md:w-1/3">
        </div>
        
        <div ref={textRef} className="md:w-2/3 flex flex-col gap-6 text-lg md:text-xl text-[#f4f3ef]/80 font-body leading-relaxed">
          <p>
            I&apos;m Haziq, a frontend developer based in Kuala Lumpur with a thing for interfaces that actually feel like something.
          </p>
          <p>
            As an intern at Instamedia, I worked on real products for real clients, and I&apos;ve carried that same standard into everything I create under Rora, my personal label where development and design share one aesthetic.
          </p>
        </div>
      </div>

      {/* Massive bottom text */}
      <div className="mt-auto pt-24 w-full flex justify-between items-end overflow-hidden">
        {"SYEDHAZIQ".split("").map((char, i) => (
          <h2 
            key={i} 
            className="text-[11.5vw] leading-[0.75] font-display font-bold text-[#f4f3ef] uppercase"
          >
            {char}
          </h2>
        ))}
      </div>
    </section>
  );
}
