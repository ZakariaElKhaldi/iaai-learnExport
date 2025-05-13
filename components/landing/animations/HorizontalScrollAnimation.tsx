"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollAnimationProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  stagger?: number;
  scrub?: boolean | number;
  containerClassName?: string;
  itemsClassName?: string;
  triggerStart?: string;
  triggerEnd?: string;
};

export default function HorizontalScrollAnimation({
  children,
  direction = 'right',
  speed = 100,
  stagger = 0.1,
  scrub = true,
  containerClassName = '',
  itemsClassName = '',
  triggerStart = 'top bottom',
  triggerEnd = 'bottom top',
}: HorizontalScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;

    if (!container || !items) return;

    // Get all direct children of the items container
    const elements = Array.from(items.children);
    
    if (elements.length === 0) return;

    // Set up initial positions
    gsap.set(elements, {
      x: direction === 'right' ? -speed : speed,
      opacity: 0,
    });

    // Create the animation
    const animation = gsap.to(elements, {
      x: 0,
      opacity: 1,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        end: triggerEnd,
        scrub: scrub,
        // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
      }
    });

    return () => {
      // Clean up animation
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [direction, speed, stagger, scrub, triggerStart, triggerEnd]);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden ${containerClassName}`}
    >
      <div 
        ref={itemsRef} 
        className={`flex ${direction === 'right' ? 'justify-start' : 'justify-end'} ${itemsClassName}`}
      >
        {children}
      </div>
    </div>
  );
} 