"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface LottieAnimationProps {
  animationData: any;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  direction?: 1 | -1;
  className?: string;
  style?: React.CSSProperties;
  playOnHover?: boolean;
  playOnView?: boolean;
  viewThreshold?: number;
  animationControl?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  renderer?: 'svg' | 'canvas';
  width?: string | number;
  height?: string | number;
}

// Create a client-side only component
export default function LottieAnimation({
  animationData,
  autoplay = true,
  loop = true,
  speed = 1,
  direction = 1,
  className = '',
  style = {},
  playOnHover = false,
  playOnView = false,
  viewThreshold = 0.5,
  animationControl = false,
  onComplete,
  onLoopComplete,
  renderer = 'svg',
  width = '100%',
  height = '100%',
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(!autoplay || playOnHover || playOnView);
  const isInView = useInView(containerRef, { amount: viewThreshold });
  const [lottieInstance, setLottieInstance] = useState<any>(null);

  // Initialize lottie only on client side
  useEffect(() => {
    let animationInstance: any = null;
    let lottieLib: any = null;

    // Function to initialize Lottie
    const initLottie = async () => {
      try {
        // Dynamic import of lottie-web
        const lottieWeb = await import('lottie-web');
        lottieLib = lottieWeb.default;

        if (!containerRef.current) return;

        // Create animation instance
        animationInstance = lottieLib.loadAnimation({
          container: containerRef.current,
          renderer,
          loop,
          autoplay: autoplay && !playOnHover && !playOnView,
          animationData,
        });

        // Configure animation
        animationInstance.setSpeed(speed);
        animationInstance.setDirection(direction);

        // Set callbacks
        if (onComplete) {
          animationInstance.addEventListener('complete', onComplete);
        }

        if (onLoopComplete) {
          animationInstance.addEventListener('loopComplete', onLoopComplete);
        }

        // Store the instance
        setLottieInstance(animationInstance);
      } catch (error) {
        console.error('Error initializing Lottie animation:', error);
      }
    };

    // Only run in browser
    if (typeof window !== 'undefined') {
      initLottie();
    }

    // Cleanup
    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [animationData, autoplay, loop, renderer, speed, direction, onComplete, onLoopComplete]);

  // Handle view-based playback
  useEffect(() => {
    if (!playOnView || !lottieInstance) return;

    if (isInView) {
      lottieInstance.play();
      setIsPaused(false);
    } else if (!autoplay) {
      lottieInstance.pause();
      setIsPaused(true);
    }
  }, [isInView, lottieInstance, playOnView, autoplay]);

  // Handle hover interactions
  const handleMouseEnter = () => {
    if (playOnHover && lottieInstance) {
      lottieInstance.play();
      setIsPaused(false);
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && lottieInstance) {
      lottieInstance.pause();
      setIsPaused(true);
    }
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!lottieInstance) return;

    if (isPaused) {
      lottieInstance.play();
      setIsPaused(false);
    } else {
      lottieInstance.pause();
      setIsPaused(true);
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      ref={containerRef}
      onMouseEnter={playOnHover ? handleMouseEnter : undefined}
      onMouseLeave={playOnHover ? handleMouseLeave : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {animationControl && lottieInstance && (
        <button
          onClick={togglePlay}
          className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none z-10"
          aria-label={isPaused ? 'Play animation' : 'Pause animation'}
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          )}
        </button>
      )}
    </motion.div>
  );
} 