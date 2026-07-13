'use client';

import { useEffect, useRef } from 'react';

interface VideoScrubOptions {
  leftVideoRef: React.RefObject<HTMLVideoElement>;
  rightVideoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLElement>;
  enabled?: boolean;
}

export function useVideoScrub({
  leftVideoRef,
  rightVideoRef,
  containerRef,
  enabled = true,
}: VideoScrubOptions) {
  const activeSideRef = useRef<'left' | 'right' | null>(null);
  const rafRef = useRef<number>();
  const mouseXRef = useRef(0);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const updateVideos = () => {
      if (!leftVideoRef.current || !rightVideoRef.current || !container) {
        rafRef.current = requestAnimationFrame(updateVideos);
        return;
      }

      const containerWidth = container.offsetWidth;
      const centerX = containerWidth / 2;
      const deadZone = Math.max(30, containerWidth * 0.05);

      const distanceFromCenter = mouseXRef.current - centerX;

      // Determine which side to show
      if (Math.abs(distanceFromCenter) < deadZone) {
        // In dead zone: keep current video at 0
        if (activeSideRef.current === null || !activeSideRef.current) {
          leftVideoRef.current.currentTime = 0;
          rightVideoRef.current.currentTime = 0;
          leftVideoRef.current.style.display = 'block';
          rightVideoRef.current.style.display = 'none';
        }
      } else if (distanceFromCenter < 0) {
        // Left of center: show right video
        activeSideRef.current = 'right';
        leftVideoRef.current.style.display = 'none';
        rightVideoRef.current.style.display = 'block';

        const distanceFromEdge = Math.abs(distanceFromCenter) - deadZone;
        const maxDistance = centerX - deadZone;
        const progress = Math.max(0, Math.min(1, distanceFromEdge / maxDistance));

        if (!rightVideoRef.current.seeking) {
          rightVideoRef.current.currentTime = progress * rightVideoRef.current.duration;
        }
      } else {
        // Right of center: show left video
        activeSideRef.current = 'left';
        leftVideoRef.current.style.display = 'block';
        rightVideoRef.current.style.display = 'none';

        const distanceFromEdge = distanceFromCenter - deadZone;
        const maxDistance = centerX - deadZone;
        const progress = Math.max(0, Math.min(1, distanceFromEdge / maxDistance));

        if (!leftVideoRef.current.seeking) {
          leftVideoRef.current.currentTime = progress * leftVideoRef.current.duration;
        }
      }

      rafRef.current = requestAnimationFrame(updateVideos);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateVideos);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, leftVideoRef, rightVideoRef, containerRef]);
}
