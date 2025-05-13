"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  opacity?: number;
  mixBlendMode?: string;
  className?: string;
  useTrail?: boolean;
  trailCount?: number;
  springConfig?: {
    mass?: number;
    stiffness?: number;
    damping?: number;
  };
  borderWidth?: number;
  hideNativeCursor?: boolean;
  trailDelay?: number;
  mode?: 'default' | 'minimal' | 'elegant' | 'gaming' | 'creative';
  hoverScale?: number;
  clickEffect?: boolean;
  disableOnMobile?: boolean;
}

export default function CustomCursor({
  color = 'rgba(99, 102, 241, 0.8)', // Indigo with better visibility
  size = 8,
  ringSize = 24,
  opacity = 0.6, // Increased for better visibility
  mixBlendMode = 'normal',
  className = '',
  useTrail = false,
  trailCount = 5,
  springConfig = {
    mass: 0.4,
    stiffness: 200, // More responsive
    damping: 18,    // Slightly less damping for smoother movement
  },
  borderWidth = 1.5, // Slightly thicker border for better visibility
  hideNativeCursor = true,
  trailDelay = 0.015, // Faster trail for more responsive feel
  mode = 'default',
  hoverScale = 1.5, // Scale factor when hovering over clickable elements
  clickEffect = true, // Enable click animation effect
  disableOnMobile = true, // Disable custom cursor on mobile devices
}: CustomCursorProps) {
  // Position values for the cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animation for smoother cursor movement
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // State to manage cursor visibility and interaction states
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Store past positions for trail effect with useRef to prevent unnecessary rerenders
  const trailPositionsRef = useRef<{x: number, y: number}[]>([]);
  const [trailElements, setTrailElements] = useState<{x: number, y: number}[]>([]);
  
  // Refs for tracking hover elements and animation frames
  const hoverElementsRef = useRef<NodeListOf<Element> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  
  // Create motion values for hover and click states
  const hoverMotionValue = useMotionValue(0);
  const clickMotionValue = useMotionValue(0);
  
  // Update motion values when states change
  useEffect(() => {
    hoverMotionValue.set(isHovering ? 1 : 0);
  }, [isHovering, hoverMotionValue]);

  useEffect(() => {
    clickMotionValue.set(isClicking ? 1 : 0);
  }, [isClicking, clickMotionValue]);
  
  // Apply mode-specific styles
  useEffect(() => {
    let modeColor = color;
    let modeSize = size;
    let modeRingSize = ringSize;
    let modeOpacity = opacity;
    let modeBorderWidth = borderWidth;
    
    switch (mode) {
      case 'minimal':
        modeColor = 'rgba(200, 200, 200, 0.6)';
        modeSize = 6;
        modeRingSize = 20;
        modeOpacity = 0.4;
        modeBorderWidth = 1;
        break;
      case 'elegant':
        modeColor = 'rgba(255, 255, 255, 0.7)';
        modeSize = 4;
        modeRingSize = 30;
        modeOpacity = 0.5;
        modeBorderWidth = 1;
        break;
      case 'gaming':
        modeColor = 'rgba(255, 0, 128, 0.8)';
        modeSize = 10;
        modeRingSize = 35;
        modeOpacity = 0.7;
        modeBorderWidth = 2;
        break;
      case 'creative':
        modeColor = 'rgba(255, 165, 0, 0.8)';
        modeSize = 8;
        modeRingSize = 40;
        modeOpacity = 0.6;
        modeBorderWidth = 1.5;
        break;
    }
    
    // Set CSS variables for potential use elsewhere
    document.documentElement.style.setProperty('--cursor-color', modeColor);
    document.documentElement.style.setProperty('--cursor-size', `${modeSize}px`);
    document.documentElement.style.setProperty('--cursor-ring-size', `${modeRingSize}px`);
    document.documentElement.style.setProperty('--cursor-opacity', `${modeOpacity}`);
    document.documentElement.style.setProperty('--cursor-border-width', `${modeBorderWidth}px`);
    
    return () => {
      // Reset variables
      document.documentElement.style.removeProperty('--cursor-color');
      document.documentElement.style.removeProperty('--cursor-size');
      document.documentElement.style.removeProperty('--cursor-ring-size');
      document.documentElement.style.removeProperty('--cursor-opacity');
      document.documentElement.style.removeProperty('--cursor-border-width');
    };
  }, [mode, color, size, ringSize, opacity, borderWidth]);
  
  // Check if device is mobile - disable custom cursor on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(disableOnMobile && (isTouchDevice || isSmallScreen));
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [disableOnMobile]);
  
  // Hide native cursor if requested and not on mobile
  useEffect(() => {
    if (hideNativeCursor && !isMobile) {
      document.documentElement.classList.add('cursor-hidden');
      document.body.style.cursor = 'none';
      
      // Add style to head for all clickable elements
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        a, button, [role="button"], input, select, textarea, label[for], 
        .clickable, [data-cursor-pointer], [data-clickable] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleTag);
      
      return () => {
        document.documentElement.classList.remove('cursor-hidden');
        document.body.style.cursor = '';
        document.head.removeChild(styleTag);
      };
    }
  }, [hideNativeCursor, isMobile]);
  
  // Initialize and update hover elements for interactive cursor
  const initializeHoverElements = useCallback(() => {
    hoverElementsRef.current = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, label[for], .clickable, [data-cursor-pointer], [data-clickable]'
    );
    
    // Add mouseenter/mouseleave listeners to all hover elements
    hoverElementsRef.current.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true));
      el.addEventListener('mouseleave', () => setIsHovering(false));
    });
    
    return () => {
      if (hoverElementsRef.current) {
        hoverElementsRef.current.forEach(el => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      }
    };
  }, []);

  // Setup mutation observer to detect DOM changes and update hover elements
  useEffect(() => {
    if (isMobile) return;
    
    // Initialize hover elements
    const cleanup = initializeHoverElements();
    
    // Setup mutation observer to detect new clickable elements
    const observer = new MutationObserver(() => {
      // Debounce the reinitialize function to prevent performance issues
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        cleanup();
        initializeHoverElements();
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      cleanup();
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [initializeHoverElements, isMobile]);
  
  // Handle click effects
  useEffect(() => {
    if (clickEffect && !isMobile) {
      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);
      
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [clickEffect, isMobile]);
  
  // Update cursor position and trail with useCallback to prevent unnecessary re-renders
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    if (useTrail && !isMobile) {
      // Add current position to trail history using ref
      trailPositionsRef.current = [
        { x: e.clientX, y: e.clientY },
        ...trailPositionsRef.current.slice(0, trailCount - 1)
      ];
      
      // Update state less frequently to improve performance
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      rafIdRef.current = requestAnimationFrame(() => {
        setTrailElements([...trailPositionsRef.current]);
      });
    }
  }, [cursorX, cursorY, useTrail, trailCount, isMobile]);
  
  // Handle mouse enter/leave for visibility
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  
  // Setup event listeners for cursor movement and visibility
  useEffect(() => {
    if (isMobile) return; // Don't set up events on mobile
    
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Make cursor visible if mouse is already on page when component mounts
    if (document.hasFocus()) {
      setIsVisible(true);
      
      // Initialize cursor at current mouse position if available
      const initialMouseEvent = new MouseEvent('mousemove');
      updateCursorPosition(initialMouseEvent);
    }
    
    // Initialize trail positions if using trail
    if (useTrail) {
      const initialPositions = Array(trailCount).fill({ x: 0, y: 0 });
      trailPositionsRef.current = initialPositions;
      setTrailElements(initialPositions);
    }
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [
    updateCursorPosition, 
    handleMouseEnter, 
    handleMouseLeave, 
    useTrail, 
    trailCount,
    isMobile
  ]);
  
  // If on mobile or disabled, don't render the custom cursor
  if (isMobile) {
    return null;
  }
  
  // Get current mode colors and sizes based on the applied CSS variables
  const computedStyle = getComputedStyle(document.documentElement);
  const currentColor = computedStyle.getPropertyValue('--cursor-color').trim() || color;
  const currentSize = parseInt(computedStyle.getPropertyValue('--cursor-size')) || size;
  const currentRingSize = parseInt(computedStyle.getPropertyValue('--cursor-ring-size')) || ringSize;
  const currentOpacity = parseFloat(computedStyle.getPropertyValue('--cursor-opacity')) || opacity;
  const currentBorderWidth = parseFloat(computedStyle.getPropertyValue('--cursor-border-width')) || borderWidth;
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] ${className}`}
        style={{
          x: springX,
          y: springY,
          width: currentSize,
          height: currentSize,
          backgroundColor: currentColor,
          opacity: isVisible ? currentOpacity : 0,
          mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity, scale',
          scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
          transition: 'opacity 0.15s ease, scale 0.15s ease',
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] ${className}`}
        style={{
          x: springX,
          y: springY,
          width: currentRingSize,
          height: currentRingSize,
          border: `${currentBorderWidth}px solid ${currentColor}`,
          opacity: isVisible ? currentOpacity * 0.8 : 0,
          mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, scale, opacity',
          scale: isClicking ? 0.9 : isHovering ? hoverScale : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Click ripple effect */}
      {clickEffect && isClicking && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
          style={{
            x: springX,
            y: springY,
            backgroundColor: 'transparent',
            border: `${currentBorderWidth}px solid ${currentColor}`,
            opacity: currentOpacity * 0.5,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity, width, height',
          }}
          initial={{ width: currentRingSize, height: currentRingSize }}
          animate={{ 
            width: currentRingSize * 1.8, 
            height: currentRingSize * 1.8,
            opacity: 0 
          }}
          transition={{ duration: 0.4 }}
        />
      )}
      
      {/* Trail effect */}
      {useTrail && trailElements.map((pos, index) => (
        <motion.div
          key={`trail-${index}`}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
          style={{
            x: pos.x,
            y: pos.y,
            width: currentSize * (1 - index / trailCount * 0.7), // Less reduction for more visible trail
            height: currentSize * (1 - index / trailCount * 0.7),
            backgroundColor: currentColor,
            opacity: isVisible ? 
              currentOpacity * (1 - index / trailCount) * 0.8 : 0,
            mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
            transition: `opacity ${trailDelay * (index + 1)}s ease-out`,
          }}
        />
      ))}
    </>
  );
}