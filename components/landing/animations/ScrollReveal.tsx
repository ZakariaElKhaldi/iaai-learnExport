"use client";

import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  threshold?: number;
  animateOpacity?: boolean;
  scale?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 50,
  once = true,
  threshold = 0.1,
  animateOpacity = true,
  scale = 1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Generate motion variants based on direction
  const getVariants = () => {
    let initial = { opacity: animateOpacity ? 0 : 1, scale: scale < 1 ? scale : 1 };

    // Add translation based on direction
    switch (direction) {
      case 'up':
        initial.y = distance;
        break;
      case 'down':
        initial.y = -distance;
        break;
      case 'left':
        initial.x = distance;
        break;
      case 'right':
        initial.x = -distance;
        break;
      case 'none':
      default:
        break;
    }

    return {
      hidden: initial,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1], // Smooth easing function
        },
      },
    };
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
} 