"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Award, Briefcase, GraduationCap } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (itemsRef.current) {
      gsap.fromTo(
        itemsRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-rora-surface">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column: Title */}
        <div className="md:w-1/3 mb-12 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-rora-gold mb-4">Where I&apos;ve been</h2>
        </div>

        {/* Right Column: Timeline & Certs */}
        <div ref={itemsRef} className="md:w-2/3 flex flex-col gap-16">
          
          {/* Experience Item */}
          <div className="relative pl-8 md:pl-10 border-l border-rora-gold-dim/30">
            <div className="absolute left-[-17px] top-0 bg-rora-surface p-1 rounded-full text-rora-gold">
              <Briefcase size={24} />
            </div>
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-2xl font-display text-rora-text">Vibe Coding Intern (Industrial Training)</h3>
              <span className="font-mono text-sm text-rora-gold">January 2024 — April 2026</span>
            </div>
            <h4 className="text-lg text-rora-text/80 mb-4">INSTAMEDIA, KL</h4>
            <p className="text-rora-muted font-body leading-relaxed mb-4">
              Worked on key projects including Dime-Android and ParkMate, focusing on UI performance, complex state management, and smooth user experiences.
            </p>
          </div>

          {/* Education Item */}
          <div className="relative pl-8 md:pl-10 border-l border-rora-gold-dim/30">
            <div className="absolute left-[-17px] top-0 bg-rora-surface p-1 rounded-full text-rora-gold">
              <GraduationCap size={24} />
            </div>
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-2xl font-display text-rora-text">Diploma in Computer Science</h3>
              <span className="font-mono text-sm text-rora-gold">2024 — 2026</span>
            </div>
            <p className="text-rora-muted font-body leading-relaxed">
              Focused on software engineering principles, data structures, and web technologies. Developed various full-stack applications as final year projects.
            </p>
          </div>

          {/* Certifications */}
          <div className="relative pl-8 md:pl-10 border-l border-transparent">
            <div className="absolute left-[-17px] top-0 bg-rora-surface p-1 rounded-full text-rora-gold">
              <Award size={24} />
            </div>
            <h3 className="text-2xl font-display text-rora-text mb-6">Certifications</h3>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-rora-bg px-4 py-3 rounded-card border border-rora-gold-dim/30 hover:border-rora-gold transition-colors">
                <span className="font-mono text-sm text-rora-text">CompTIA Cloud+</span>
              </div>
              <div className="flex items-center gap-3 bg-rora-bg px-4 py-3 rounded-card border border-rora-gold-dim/30 hover:border-rora-gold transition-colors">
                <span className="font-mono text-sm text-rora-text">freeCodeCamp Frontend</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
