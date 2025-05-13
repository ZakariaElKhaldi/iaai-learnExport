"use client";

import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxEffectProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: [number, number];
}

export default function ParallaxEffect({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = [0, 1]
}: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });

  // Calculate transform property based on direction
  const getTransformProperty = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      default:
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);
    }
  };

  // Get the appropriate transform property
  const transform = getTransformProperty();

  // Apply the transform to the appropriate CSS property based on direction
  const style = direction === 'up' || direction === 'down'
    ? { y: transform }
    : { x: transform };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={style} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
} 