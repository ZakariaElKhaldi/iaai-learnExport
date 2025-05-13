"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

interface FloatingElementProps {
  children?: React.ReactNode;
  xOffset?: number;
  yOffset?: number;
  duration?: number;
  delay?: number;
  className?: string;
  rotationRange?: number;
  emoji?: string;
  size?: number;
}

// Static version of the floating element for server-side rendering
function StaticFloatingElement({ className = '', emoji, size }: { className?: string, emoji?: string, size?: number }) {
  // This component renders nothing visible on the server to prevent hydration mismatches
  if (emoji) {
    return <div className={`hidden ${className}`} />;
  }
  return <div className={`hidden ${className}`} />;
}

// Client-side only version of the floating element
function ClientFloatingElement({
  children,
  xOffset = 0,
  yOffset = 20,
  duration = 12,
  delay = 0,
  className = '',
  rotationRange = 5,
  emoji,
  size
}: FloatingElementProps) {
  // Animation variants
  const floatingAnimation = {
    initial: {
      y: 0,
      x: 0,
      rotate: 0,
      opacity: 0,
      transform: "translateY(-20px)"
    },
    animate: {
      y: [0, -yOffset, 0, yOffset, 0],
      x: [0, xOffset/2, xOffset, xOffset/2, 0],
      rotate: [0, rotationRange/2, 0, -rotationRange/2, 0],
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      }
    }
  };

  // If emoji is provided, render it with consistent styling
  if (emoji && size) {
    return (
      <motion.div
        className={`absolute ${className}`}
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <div 
          className="absolute pointer-events-none select-none"
          style={{
            fontSize: size,
            opacity: 0,
            transform: "translateY(-20px)"
          }}
        >
          {emoji}
        </div>
      </motion.div>
    );
  }
  
  // Regular children rendering
  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}

// Dynamic import of the client-side component to ensure it only runs on the client
const DynamicFloatingElement = dynamic(
  () => Promise.resolve(ClientFloatingElement),
  { ssr: false }
);

// Exported component that switches between static and client versions
export function FloatingElement(props: FloatingElementProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // On server or during hydration, use the static version
  if (!isClient) {
    return <StaticFloatingElement 
      className={props.className} 
      emoji={props.emoji} 
      size={props.size} 
    />;
  }
  
  // On client after hydration, use the dynamic version
  return <DynamicFloatingElement {...props} />;
}

interface FloatingElementsProps {
  elements?: Array<{
    emoji: string;
    delay: number;
    duration: number;
    size: number;
  }>;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  randomizeProps?: boolean;
  xOffset?: number;
  yOffset?: number;
  duration?: number;
  delay?: number;
  rotationRange?: number;
}

// Client-side only container component
function ClientFloatingElements({
  elements,
  children,
  className = '',
  containerClassName = '',
  xOffset = 10,
  yOffset = 20,
  rotationRange = 5
}: FloatingElementsProps) {
  // If we have a single child, we can just wrap it directly
  if (children && !elements) {
    return (
      <FloatingElement
        xOffset={xOffset}
        yOffset={yOffset}
        duration={12}
        delay={0}
        rotationRange={rotationRange}
        className={className}
      >
        {children}
      </FloatingElement>
    );
  }
  
  // If we have an array of elements, render each one with fixed properties
  return (
    <div className={`relative ${containerClassName}`}>
      {elements && elements.map((element, index) => (
        <FloatingElement
          key={index}
          duration={element.duration}
          delay={element.delay}
          yOffset={yOffset}
          xOffset={xOffset}
          rotationRange={rotationRange}
          className={className}
          emoji={element.emoji}
          size={element.size}
        />
      ))}
    </div>
  );
}

// Static version for server-side rendering
function StaticFloatingElements({ className = '', containerClassName = '' }: { className?: string, containerClassName?: string }) {
  // This component renders a hidden div on the server to prevent hydration mismatches
  return <div className={`hidden ${containerClassName}`} />;
}

// Dynamic import of the client-side component
const DynamicFloatingElements = dynamic(
  () => Promise.resolve(ClientFloatingElements),
  { ssr: false }
);

// Exported component that switches between static and client versions
export default function FloatingElements(props: FloatingElementsProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // On server or during hydration, use the static version
  if (!isClient) {
    return <StaticFloatingElements 
      className={props.className} 
      containerClassName={props.containerClassName} 
    />;
  }
  
  // On client after hydration, use the dynamic version
  return <DynamicFloatingElements {...props} />;
} 