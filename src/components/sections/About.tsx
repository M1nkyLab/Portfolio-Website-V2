"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/common/ScrollReveal";

const hobbies = [
  {
    title: "Mechanical Keyboards",
    description: "Swapping out switches, tuning stabilizers, and chasing the perfect thock.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Running & Fitness",
    description: "Tracking my latest route on Strava and constantly pushing my personal records.",
    image: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Game Modding",
    description: "Tinkering under the hood of my favorite video games to see how they tick.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "K-Pop",
    description: "Expanding my photocard collection and analyzing the newest album drops.",
    image: "https://images.unsplash.com/photo-1615962122149-ba64e1fa6252?q=80&w=800&auto=format&fit=crop"
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up scroll triggers for each hobby item on the right
    const items = document.querySelectorAll('.hobby-item');
    
    items.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
        onLeaveBack: () => {
          if (index === 0) setActiveIndex(-1); // Back to intro text when scrolling up past the first item
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" data-cursor-invert="true" ref={sectionRef} className="relative bg-syedhaziq-gold text-syedhaziq-bg font-body">
      
      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto relative">
        
        {/* Left Side: Sticky Intro & Dynamic Content */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 md:px-12 lg:pl-24 lg:pr-12 py-24 z-10">
          
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={8} 
            containerClassName="!my-0 mb-8"
            textClassName="text-5xl md:text-6xl lg:text-[5rem] font-display font-bold !leading-[1.1] text-syedhaziq-bg"
          >
            Hi, I'm Syed Haziq.
          </ScrollReveal>
          
          <ScrollReveal 
            baseOpacity={0} 
            enableBlur={true} 
            baseRotation={2} 
            blurStrength={8} 
            containerClassName="!my-0 mb-12"
            textClassName="text-xl md:text-2xl leading-relaxed opacity-90 max-w-xl"
          >
            I'm a developer obsessed with creating sleek, AI-driven web experiences using tools like Webflow, Claude, and Cursor.
          </ScrollReveal>
          
          {/* Dynamic Changing Text Block */}
          <div className="hidden lg:block h-32 overflow-hidden relative border-l-2 border-syedhaziq-bg/30 pl-8">
            <div 
              className="absolute w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col"
              style={{ transform: `translateY(-${(activeIndex + 1) * 8}rem)` }}
            >
               
               {/* Default State (Index -1) */}
               <div className="h-32 flex flex-col justify-center">
                 <p className="text-xl font-display text-syedhaziq-bg italic tracking-widest uppercase opacity-60 font-bold">
                   Scroll to explore my world &darr;
                 </p>
               </div>
               
               {/* Hobby States (Index 0 to 3) */}
               {hobbies.map((hobby, i) => (
                 <div key={i} className="h-32 flex flex-col justify-center">
                   <h3 className="text-3xl font-display font-bold text-syedhaziq-bg mb-2 leading-tight tracking-tight drop-shadow-sm">
                     {hobby.title}
                   </h3>
                   <p className="text-lg opacity-80 leading-snug">
                     {hobby.description}
                   </p>
                 </div>
               ))}
            </div>
          </div>
          
        </div>

        {/* Right Side: Scrollable Hobbies Visuals */}
        <div className="w-full lg:w-[55%] px-6 md:px-12 lg:pr-24 lg:pl-12 py-12 lg:py-48 flex flex-col gap-32 lg:gap-64">
          <div className="lg:hidden mb-4">
            <h3 className="text-3xl font-display font-bold text-syedhaziq-bg opacity-70">When I'm off the clock...</h3>
          </div>
          
          {hobbies.map((hobby, index) => (
            <div key={index} className="hobby-item flex flex-col gap-8 group">
              <div className="w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl bg-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative">
                <img 
                  src={hobby.image} 
                  alt={hobby.title} 
                  className={`w-full h-full object-cover transition-all duration-[1.5s] ${activeIndex === index ? 'scale-105 filter-none' : 'scale-110 grayscale-[30%] blur-[1px]'}`}
                />
                {/* Subtle dark gradient overlay to ensure text pops if we ever added text over it, and to set mood */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1717]/40 to-transparent mix-blend-multiply opacity-50"></div>
              </div>
              
              {/* Mobile text fallback since the dynamic left column hides on mobile */}
              <div className="lg:hidden">
                <h4 className="text-3xl font-display font-bold mb-3 text-syedhaziq-bg">{hobby.title}</h4>
                <p className="text-lg opacity-80 leading-relaxed">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Massive bottom text */}
      <div className="w-full flex justify-between items-end overflow-hidden pt-24 px-6 md:px-12 pb-12">
        {"SYEDHAZIQ".split("").map((char, i) => (
          <h2 
            key={i} 
            className="text-[11.5vw] leading-[0.75] font-display font-bold text-syedhaziq-bg uppercase opacity-30"
          >
            {char}
          </h2>
        ))}
      </div>
    </section>
  );
}
