"use client";

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  onClick?: () => void;
  hoverScale?: number;
  clickScale?: number;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 40,
  radius = 150,
  springConfig = {
    stiffness: 150,
    damping: 15,
  },
  onClick,
  hoverScale = 1.1,
  clickScale = 0.95,
  disabled = false,
}: MagneticButtonProps) {
  // Reference to the button element
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // State to track if the mouse is within the magnetic field
  const [isHovering, setIsHovering] = useState(false);
  
  // Spring animations for smoother movement
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);
  
  // Transform mouse position to movement distance based on strength
  const moveX = useTransform(springX, (x) => x * strength);
  const moveY = useTransform(springY, (y) => y * strength);
  
  // Reset position function
  const resetPosition = () => {
    springX.set(0);
    springY.set(0);
    setIsHovering(false);
  };
  
  // Handle mouse move to update position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (buttonRef.current && !disabled) {
      const rect = buttonRef.current.getBoundingClientRect();
      
      // Calculate the center of the button
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate the mouse position relative to the center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate the distance from the center
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      
      // Check if the mouse is within the magnetic radius
      if (distance < radius) {
        // Normalize the values between -1 and 1
        const normalizedX = mouseX / radius;
        const normalizedY = mouseY / radius;
        
        springX.set(normalizedX);
        springY.set(normalizedY);
        setIsHovering(true);
      } else {
        resetPosition();
      }
    }
  };
  
  // Handle mouse out to reset position
  const handleMouseOut = () => {
    resetPosition();
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      ref={buttonRef}
    >
      <motion.div
        className={`relative ${className}`}
        style={{
          x: moveX,
          y: moveY
        }}
        whileHover={!disabled ? { scale: hoverScale } : {}}
        whileTap={!disabled ? { scale: clickScale } : {}}
        onClick={!disabled ? onClick : undefined}
      >
        {children}
        
        {/* Subtle glow effect when hovering */}
        {isHovering && !disabled && (
          <motion.div 
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.2,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
            }}
            style={{
              zIndex: -1
            }}
          />
        )}
      </motion.div>
    </div>
  );
} 