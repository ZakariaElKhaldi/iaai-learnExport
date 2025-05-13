"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  once?: boolean;
  threshold?: number;
  startOnView?: boolean;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
  easing = 'easeOut',
  once = true,
  threshold = 0.1,
  startOnView = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once, amount: threshold });
  const countingStarted = useRef(false);

  // For easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeIn: (t: number) => t * t * t,
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  useEffect(() => {
    // Only start counting if in view or if startOnView is false
    if ((startOnView && isInView) || (!startOnView && !countingStarted.current)) {
      // Set flag to avoid restarting animation
      countingStarted.current = true;
      
      // Start animation after the specified delay
      const timer = setTimeout(() => {
        let startTime: number | null = null;
        let animationFrameId: number;
        
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          
          // Apply easing function
          const easedProgress = easingFunctions[easing](progress);
          const currentCount = easedProgress * end;
          
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animateCount);
          }
        };
        
        animationFrameId = requestAnimationFrame(animateCount);
        
        return () => cancelAnimationFrame(animationFrameId);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay, easing, startOnView]);

  // Format the number with commas and decimals
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div ref={nodeRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
} 