'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollState {
  scrollY: number;
  vh: number;
  phase: 'hero' | 'gallery' | 'outro';
  progress: number; // 0-1 progress within current phase
}

export function useScrollAnimation(
  panelRef: React.RefObject<HTMLElement>,
  cardsRef: React.RefObject<HTMLElement[]>,
  maxScroll: number = 0
) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    vh: typeof window !== 'undefined' ? window.innerHeight : 0,
    phase: 'hero',
    progress: 0,
  });

  const rafRef = useRef<number>();
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const vh = window.innerHeight;
    const computedMaxScroll = maxScroll || Math.max(
      cardsRef.current?.length || 0 * 300 - vh,
      vh * 4
    );

    const handleScroll = () => {
      const scrollY = window.scrollY;
      lastScrollRef.current = scrollY;

      let phase: 'hero' | 'gallery' | 'outro' = 'hero';
      let progress = 0;

      if (scrollY < vh) {
        phase = 'hero';
        progress = scrollY / vh;
      } else if (scrollY < vh + computedMaxScroll) {
        phase = 'gallery';
        progress = (scrollY - vh) / computedMaxScroll;
      } else {
        phase = 'outro';
        progress = Math.min(1, (scrollY - vh - computedMaxScroll) / vh);
      }

      setScrollState({
        scrollY,
        vh,
        phase,
        progress,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardsRef, maxScroll]);

  // RAF-based card scaling and panel animation
  useEffect(() => {
    if (typeof window === 'undefined' || !panelRef.current || !cardsRef.current) return;

    const vh = window.innerHeight;

    const updateCards = () => {
      const scrollY = lastScrollRef.current;
      const phase = scrollY < vh ? 'hero' : scrollY < vh * 5 ? 'gallery' : 'outro';

      // Update panel position (phase 1: slide up)
      if (phase === 'hero' && panelRef.current) {
        const panelTransform = Math.min(1, scrollY / vh);
        panelRef.current.style.transform = `translateY(${(1 - panelTransform) * 100}vh)`;
      }

      // Update card scales based on viewport position
      cardsRef.current?.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardBottom = rect.bottom;

        // Enter scale: 0 -> 1 as card enters bottom of viewport
        const enterScale = Math.max(0, Math.min(1, (vh - cardTop) / (vh * 0.6)));
        // Exit scale: 1 -> 0 as card exits top of viewport
        const exitScale = Math.max(0, Math.min(1, cardBottom / (vh * 0.4)));

        const scale = Math.min(enterScale, exitScale);
        const transformOrigin = card.dataset.transformOrigin || 'center';

        card.style.transformOrigin = transformOrigin;
        card.style.transform = `scale(${scale})`;
      });

      rafRef.current = requestAnimationFrame(updateCards);
    };

    rafRef.current = requestAnimationFrame(updateCards);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [panelRef, cardsRef]);

  return scrollState;
}
