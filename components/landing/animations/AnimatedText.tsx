"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'typewriter' | 'wave' | 'gradient';

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  repeat?: boolean;
  repeatDelay?: number;
  once?: boolean;
  threshold?: number;
  words?: boolean;
  chars?: boolean;
  gradientColors?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  className = '',
  animationType = 'fade',
  duration = 0.5,
  delay = 0,
  staggerChildren = 0.04,
  repeat = false,
  repeatDelay = 3,
  once = false,
  threshold = 0.5,
  words = false,
  chars = false,
  gradientColors = 'from-blue-600 to-purple-600',
  style = {},
}: AnimatedTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, amount: threshold, margin: "-20px 0px" });
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Split text logic based on configuration
  const getTextContent = () => {
    const textContent = Array.isArray(text) ? text : [text];
    
    if (animationType === 'typewriter') {
      return [typedText];
    }
    
    return textContent;
  };
  
  // Animation variants configuration
  const getAnimationVariants = () => {
    // Animation for container
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    };

    // Animation for each element (word/character)
    const getElementVariants = (): { [key: string]: Variant } => {
      switch (animationType) {
        case 'slide-up':
          return {
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration, 
                ease: [0.2, 0.65, 0.3, 0.9] 
              }
            },
          };
        case 'slide-down':
          return {
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration, 
                ease: [0.2, 0.65, 0.3, 0.9] 
              }
            },
          };
        case 'slide-left':
          return {
            hidden: { opacity: 0, x: 20 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration, 
                ease: [0.2, 0.65, 0.3, 0.9] 
              }
            },
          };
        case 'slide-right':
          return {
            hidden: { opacity: 0, x: -20 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration, 
                ease: [0.2, 0.65, 0.3, 0.9] 
              }
            },
          };
        case 'wave':
          return {
            hidden: { opacity: 0, y: 20 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: {
                delay: i * staggerChildren,
                duration,
                repeat: repeat ? Infinity : 0,
                repeatType: 'mirror' as const,
                repeatDelay: repeatDelay / 2,
                ease: [0.2, 0.65, 0.3, 0.9],
              },
            }),
          };
        case 'gradient':
          return {
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration, 
                ease: "easeOut" 
              }
            },
          };
        case 'fade':
        default:
          return {
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration, 
                ease: "easeOut" 
              }
            },
          };
      }
    };

    return { containerVariants, elementVariants: getElementVariants() };
  };
  
  const { containerVariants, elementVariants } = getAnimationVariants();
  
  // Typewriter effect
  useEffect(() => {
    if (animationType === 'typewriter' && isInView) {
      const textToType = Array.isArray(text) ? text[0] : text;
      const typeNextChar = () => {
        if (currentIndex < textToType.length) {
          setTypedText(prevText => prevText + textToType[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else if (repeat) {
          setTimeout(() => {
            setTypedText('');
            setCurrentIndex(0);
          }, repeatDelay * 1000);
        }
      };
      
      const timer = setTimeout(typeNextChar, currentIndex === 0 ? delay * 1000 : 40);
      return () => clearTimeout(timer);
    }
  }, [animationType, currentIndex, delay, isInView, repeat, repeatDelay, text]);
  
  // Render content based on configuration
  const renderContent = () => {
    return getTextContent().map((textItem, index) => {
      // For gradient effect, wrap in a gradient span
      if (animationType === 'gradient') {
        return (
          <motion.div
            key={index}
            className={`inline-block bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={elementVariants}
          >
            {textItem}
          </motion.div>
        );
      }
      
      // For typewriter, don't split
      if (animationType === 'typewriter') {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {textItem}
            {currentIndex < (Array.isArray(text) ? text[0] : text).length && (
              <span className="inline-block w-[2px] h-[1em] bg-current animate-blink ml-0.5" />
            )}
          </motion.div>
        );
      }
      
      // For wave, use characters
      if (animationType === 'wave') {
        return (
          <motion.div key={index} className="inline-block">
            {textItem.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                custom={i}
                variants={elementVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        );
      }
      
      // For other animations, split by words or chars or just animate the whole text
      if (words) {
        return (
          <span key={index} className="inline">
            {textItem.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={elementVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {word}
              </motion.span>
            ))}
          </span>
        );
      } else if (chars) {
        return (
          <span key={index} className="inline">
            {textItem.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={elementVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        );
      } else {
        return (
          <motion.div
            key={index}
            variants={elementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {textItem}
          </motion.div>
        );
      }
    });
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={className}
      variants={containerVariants}
      style={style}
    >
      {renderContent()}
    </motion.div>
  );
} 