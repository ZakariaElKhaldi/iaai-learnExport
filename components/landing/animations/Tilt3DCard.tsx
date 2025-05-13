"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  glareOpacity?: number;
  glarePosition?: 'top' | 'full';
  disabled?: boolean;
  borderRadius?: string;
  shadow?: boolean;
  backgroundGradient?: boolean;
  borderHighlight?: boolean;
}

export default function Tilt3DCard({
  children,
  className = '',
  perspective = 1000,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  springConfig = {
    stiffness: 400,
    damping: 40,
    mass: 0.5,
  },
  glareOpacity = 0.15,
  glarePosition = 'top',
  disabled = false,
  borderRadius = '12px',
  shadow = true,
  backgroundGradient = false,
  borderHighlight = false,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for card rotation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Springs for smoother motion
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Additional values for glare effect
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);
  const springGlareX = useSpring(glareX, springConfig);
  const springGlareY = useSpring(glareY, springConfig);
  const glareOpacityFactor = useTransform(
    springGlareX,
    [-0.5, 0, 0.5],
    [glareOpacity * 0.7, glareOpacity, glareOpacity * 0.9]
  );

  // Background gradient effect based on tilt
  const gradientX = useTransform(
    springRotateY,
    [-tiltMaxAngleY, 0, tiltMaxAngleY],
    [0, 50, 100]
  );
  
  const gradientY = useTransform(
    springRotateX,
    [tiltMaxAngleX, 0, -tiltMaxAngleX],
    [0, 50, 100]
  );
  
  // Combined gradient position
  const gradientPosition = useTransform(
    [gradientX, gradientY],
    ([x, y]) => `${x}% ${y}%`
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !disabled) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Get mouse position relative to card center (values from -0.5 to 0.5)
      const centerX = (e.clientX - rect.left) / rect.width - 0.5;
      const centerY = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Set rotation values (inverted for natural feeling)
      rotateX.set(-centerY * tiltMaxAngleX);
      rotateY.set(centerX * tiltMaxAngleY);
      
      // Set glare position
      glareX.set(centerX);
      glareY.set(centerY);
    }
  };
  
  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovering(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!disabled) {
      // Reset all values
      rotateX.set(0);
      rotateY.set(0);
      glareX.set(0);
      glareY.set(0);
      setIsHovering(false);
    }
  };
  
  // Generate transform CSS for glare gradient
  const glareTransform = useTransform(
    [springGlareX, springGlareY],
    ([x, y]) => {
      // Map -0.5 to 0.5 range to 0 to 100 percentage for gradient position
      const posX = (x as number + 0.5) * 100;
      const posY = (y as number + 0.5) * 100;
      return `${posX}% ${posY}%`;
    }
  );
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        borderRadius,
        boxShadow: shadow && isHovering 
          ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)' 
          : shadow ? '0 10px 30px rgba(0, 0, 0, 0.07)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'relative',
          borderRadius,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: isHovering ? scale : 1,
          transition: !isHovering ? 'all 0.5s ease' : 'none',
        }}
      >
        {/* Background gradient overlay (optional) */}
        {backgroundGradient && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0))',
              backgroundPosition: gradientPosition,
              backgroundSize: '200% 200%',
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        
        {/* Border highlight effect (optional) */}
        {borderHighlight && isHovering && (
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              borderRadius,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        
        {/* Actual content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Glare effect overlay */}
        {!disabled && (
          <motion.div
            style={{
              position: 'absolute',
              top: glarePosition === 'top' ? '-100%' : '0',
              left: '0',
              right: '0',
              bottom: glarePosition === 'top' ? '100%' : '0',
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 80%)',
              opacity: isHovering ? glareOpacityFactor : 0,
              backgroundPosition: glareTransform,
              backgroundSize: '200% 200%',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
              borderRadius,
              zIndex: 20,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
} 