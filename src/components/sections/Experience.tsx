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
    <section ref={sectionRef} className="min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-syedhaziq-surface">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Column: Title */}
        <div className="md:w-1/3 mb-12 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-syedhaziq-gold mb-4">Where I&apos;ve been</h2>
        </div>

        {/* Right Column: Timeline & Certs */}
        <div ref={itemsRef} className="md:w-2/3 flex flex-col gap-16">
          
          {/* Experience Item */}
          <div className="relative pl-8 md:pl-10 border-l border-syedhaziq-gold-dim/30 pb-16">
            <div className="absolute left-[-17px] top-0 bg-syedhaziq-surface p-1 rounded-full text-syedhaziq-gold">
              <Briefcase size={24} />
            </div>
            <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h3 className="text-2xl font-display text-syedhaziq-text">Vibe Coding Intern</h3>
              <span className="font-mono text-sm text-syedhaziq-gold shrink-0">December 2025 — April 2026</span>
            </div>
            <h4 className="text-lg text-syedhaziq-text/80 mb-4">IM Interactive Solution (Instamedia)</h4>
            
            <p className="text-syedhaziq-text font-body leading-relaxed mb-4">
              Built and maintained interactive websites, event microsites, and CRUD analytics dashboards for high-profile clients.
            </p>

            <ul className="list-disc list-outside ml-4 text-syedhaziq-muted font-body space-y-2 mb-6">
              <li><strong className="text-syedhaziq-text font-medium">Web & Dashboard Development:</strong> Developed custom event microsites and responsive analytics dashboards for major brands including Victoria&apos;s Secret, Fila, Muji, and KLCC.</li>
              <li><strong className="text-syedhaziq-text font-medium">Figma to Webflow:</strong> Translated UI/UX designs into fully animated, production-ready Webflow sites and managed daily CMS updates.</li>
              <li><strong className="text-syedhaziq-text font-medium">AI-Powered Workflows:</strong> Leveraged AI tools like Claude, Cursor, and Lovable to accelerate Webflow implementation, generate video assets, and optimize SEO.</li>
              <li><strong className="text-syedhaziq-text font-medium">Deployment & QA:</strong> Handled cross-platform UI bug fixes, staging environments, and final production deployments.</li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {['Webflow', 'Figma', 'Claude Code', 'Cursor', 'Lovable', 'OpenAI'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-syedhaziq-gold/10 text-syedhaziq-gold text-xs font-mono rounded-full border border-syedhaziq-gold/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Education Item */}
          <div className="relative pl-8 md:pl-10 border-l border-syedhaziq-gold-dim/30">
            <div className="absolute left-[-17px] top-0 bg-syedhaziq-surface p-1 rounded-full text-syedhaziq-gold">
              <GraduationCap size={24} />
            </div>
            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-2xl font-display text-syedhaziq-text">Diploma in Computer Science</h3>
              <span className="font-mono text-sm text-syedhaziq-gold">2024 — 2026</span>
            </div>
            <p className="text-syedhaziq-muted font-body leading-relaxed">
              Focused on software engineering principles, data structures, and web technologies. Developed various full-stack applications as final year projects.
            </p>
          </div>

          {/* Certifications */}
          <div className="relative pl-8 md:pl-10 border-l border-transparent">
            <div className="absolute left-[-17px] top-0 bg-syedhaziq-surface p-1 rounded-full text-syedhaziq-gold">
              <Award size={24} />
            </div>
            <h3 className="text-2xl font-display text-syedhaziq-text mb-6">Certifications</h3>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-syedhaziq-bg px-4 py-3 rounded-card border border-syedhaziq-gold-dim/30 hover:border-syedhaziq-gold transition-colors">
                <span className="font-mono text-sm text-syedhaziq-text">CompTIA Cloud+</span>
              </div>
              <div className="flex items-center gap-3 bg-syedhaziq-bg px-4 py-3 rounded-card border border-syedhaziq-gold-dim/30 hover:border-syedhaziq-gold transition-colors">
                <span className="font-mono text-sm text-syedhaziq-text">freeCodeCamp Frontend</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
