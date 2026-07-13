'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useVideoScrub } from '@/hooks/useVideoScrub';

const STAGGER_DELAYS = {
  logo: 0,
  nav: 0.15,
  tagline: 0.3,
  heroInfo: 0.45,
};

const ANIMATION_DURATION = 0.6;
const EASING = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface HeroProps {
  onScroll?: (scrollY: number) => void;
}

export default function LandingHero({ onScroll }: HeroProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const mousePos = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);

  // Video scrubbing on desktop
  useVideoScrub({
    leftVideoRef,
    rightVideoRef,
    containerRef: mainCanvasRef,
    enabled: isDesktop && !isTouchDevice,
  });

  // Update custom cursor position
  useEffect(() => {
    if (!customCursorRef.current || !isDesktop) return;

    customCursorRef.current.style.left = `${mousePos.x}px`;
    customCursorRef.current.style.top = `${mousePos.y}px`;
  }, [mousePos, isDesktop]);

  // Detect device type
  useEffect(() => {
    const isTouch = () =>
      window.matchMedia('(max-width: 1023px)').matches ||
      window.matchMedia('(hover: none)').matches;

    setIsDesktop(window.innerWidth >= 1024);
    setIsTouchDevice(isTouch());

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsTouchDevice(isTouch());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (onScroll) onScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  // Mobile video autoplay
  useEffect(() => {
    if (videoLoaded && isTouchDevice) {
      if (leftVideoRef.current && rightVideoRef.current) {
        leftVideoRef.current.play();
        rightVideoRef.current.style.display = 'none';

        const handleVideoEnd = (video: HTMLVideoElement, other: HTMLVideoElement) => {
          video.style.display = 'none';
          other.style.display = 'block';
          other.play();
        };

        leftVideoRef.current.onended = () =>
          handleVideoEnd(leftVideoRef.current!, rightVideoRef.current!);
        rightVideoRef.current.onended = () =>
          handleVideoEnd(rightVideoRef.current!, leftVideoRef.current!);
      }
    }
  }, [videoLoaded, isTouchDevice]);

  const containerVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_DURATION, ease: EASING },
  };

  return (
    <div
      id="scroll-spacer"
      ref={containerRef}
      className="relative user-select-none bg-white"
      style={{
        height: `${5 * 100}vh`,
        cursor: isDesktop ? 'none' : 'auto',
      }}
    >
      {/* Custom Cursor (Desktop Only) */}
      {isDesktop && !isTouchDevice && (
        <div
          ref={customCursorRef}
          className="custom-cursor fixed pointer-events-none z-50"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'exclusion',
          }}
        >
          <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            className="w-full h-full"
          >
            <circle
              cx="24"
              cy="24"
              r="22.75"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M24 12 L28 20 L24 18 L20 20 Z"
              fill="white"
              opacity="0.8"
            />
          </svg>
        </div>
      )}

      {/* Hero Content Container */}
      <div className="fixed inset-0 z-20 pointer-events-none">


        {/* Navigation */}
        <motion.div
          className="fixed top-4 right-4 md:top-8 md:right-8 z-20 pointer-events-none flex items-center gap-6 md:gap-12"
          initial="initial"
          animate="animate"
          variants={containerVariants}
          transition={{ ...containerVariants.transition, delay: STAGGER_DELAYS.nav }}
          style={{ mixBlendMode: 'exclusion' }}
        >
          <span className="hidden md:inline text-white font-display font-medium text-sm tracking-widest uppercase">
            WORK
          </span>
          <button className="w-6 h-6 md:w-8 md:h-8 flex flex-col justify-center gap-1">
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
          </button>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="fixed left-4 md:left-8 top-24 md:top-56 z-20 pointer-events-none max-w-lg md:max-w-2xl"
          initial="initial"
          animate="animate"
          variants={containerVariants}
          transition={{ ...containerVariants.transition, delay: STAGGER_DELAYS.tagline }}
          style={{ mixBlendMode: 'exclusion' }}
        >
          <p className="text-white font-body text-xs md:text-xs leading-relaxed tracking-tight">
            Scroll to explore an interactive portfolio experience. Scroll-driven animations reveal project gallery.
          </p>
        </motion.div>

        {/* Hero Info */}
        <motion.div
          id="hero-info"
          className="fixed right-4 md:right-8 bottom-16 md:bottom-20 z-20 pointer-events-none text-center"
          initial="initial"
          animate="animate"
          variants={containerVariants}
          transition={{ ...containerVariants.transition, delay: STAGGER_DELAYS.heroInfo }}
          style={{ mixBlendMode: 'exclusion' }}
        >
          <div className="mb-4">
            <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 rounded-full border border-white flex items-center justify-center">
              <span className="text-white font-display text-xs md:text-sm font-medium">8</span>
            </div>
          </div>
          <h2 className="text-white font-display font-medium text-lg md:text-3xl tracking-tight leading-none mb-3 uppercase">
            Digital<br />Portfolio
          </h2>
          <p className="text-white font-display font-medium text-2xl md:text-4xl tracking-tight">2024</p>
        </motion.div>

        {/* Explore Button */}
        <motion.div
          id="hero-cta"
          className="fixed right-4 md:right-8 bottom-4 md:bottom-8 z-20 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 0 }}
          style={{ transformOrigin: 'right bottom' }}
        >
          <button className="w-32 md:w-48 h-20 md:h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-black font-display font-medium text-3xl md:text-5xl tracking-tight">
              Explore
            </span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          id="hero-footer"
          className="fixed left-4 md:left-8 bottom-4 md:bottom-8 z-20 pointer-events-none flex gap-12 md:gap-20 text-white font-display font-medium text-xs md:text-xs tracking-wider uppercase opacity-0"
          initial="initial"
          animate="animate"
          variants={{ initial: { opacity: 0 }, animate: { opacity: 0 } }}
          style={{ mixBlendMode: 'exclusion' }}
        >
          <span>SYED HAZIQ © 2025</span>
          <span>PRIVACY POLICY</span>
        </motion.div>
      </div>

      {/* Video Background Container */}
      <div
        ref={mainCanvasRef}
        id="main-canvas"
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 0,
          opacity: videoLoaded ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
        }}
      >
        <video
          ref={leftVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4"
            type="video/mp4"
          />
        </video>
        <video
          ref={rightVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ display: 'none' }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* White Overlay */}
      <div
        id="hero-overlay"
        className="fixed inset-0 pointer-events-none z-12 bg-white opacity-0"
      />
    </div>
  );
}
