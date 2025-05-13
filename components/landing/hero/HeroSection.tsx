"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'; // Added useReducedMotion
import { Button } from '@nextui-org/react';
import { FaRocket, FaBookOpen, FaStar, FaChevronLeft, FaChevronRight, FaApple, FaAmazon, FaWindows, FaGoogle, FaSpotify, FaLinkedin } from 'react-icons/fa';
import { SiMeta, SiOracle, SiTesla, SiAdobe, SiNetflix, SiShopify } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplineScene } from '@/components/ui/splite';

// Register the ScrollTrigger plugin (assuming it's used elsewhere or for future advanced scroll effects)
gsap.registerPlugin(ScrollTrigger);

// --- Animation Constants ---
const DURATION_NORMAL = 0.6;
const DURATION_FAST = 0.4;
const DURATION_SLOW = 0.8;
const DELAY_INCREMENT = 0.15; // Base delay increment for staggered animations

// Add types for AnimatedText props
interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements; // Allow specifying the HTML tag
  words?: boolean;
  letters?: boolean;
  staggerChildren?: number;
  delay?: number;
  duration?: number;
  animationType?: "fade" | "slide-up" | "slide-down" | "scale-in";
  ease?: any; // Framer Motion ease type
}

// Animated text component with improved animation options
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  as: Component = "h2", // Default to h2, but can be overridden
  words = false,
  letters = false,
  staggerChildren = 0.02,
  delay = 0,
  duration = DURATION_NORMAL,
  animationType = "fade",
  ease = "easeOut" // Default easing
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getAnimationVariants = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0, delay: 0, staggerChildren: 0 }
      };
    }
    switch (animationType) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        };
      case 'slide-down':
        return {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
        };
      case 'scale-in':
        return {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
        };
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  };

  const commonTransition = { duration, ease, staggerChildren, delayChildren: delay };

  const variants = getAnimationVariants();

  if (words) {
    const wordsArray = text.split(' ');
    return (
      <Component className={className} aria-label={text}>
        <motion.span // Wrapper for staggerChildren to work correctly on the parent
          variants={{ animate: { transition: { staggerChildren, delayChildren: delay } } }}
          initial="initial"
          animate="animate"
          className="inline-block" // Needed for layout
        >
          {wordsArray.map((word: string, i: number) => (
            <motion.span
              key={i}
              className="inline-block" // Keep words on the same line if possible
              variants={variants}
              transition={{duration, ease}} // Individual word transition
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  if (letters) { // Similar structure for letters
    return (
      <Component className={className} aria-label={text}>
        <motion.span
          variants={{ animate: { transition: { staggerChildren, delayChildren: delay }}}}
          initial="initial"
          animate="animate"
          className="inline-block"
        >
        {Array.from(text).map((letter: string, i: number) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={variants}
            transition={{duration, ease}}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
        </motion.span>
      </Component>
    );
  }

  return (
    <motion.div // Using div for simple text container, Component tag passed via 'as' prop
        initial="initial"
        animate="animate"
        variants={variants}
        transition={commonTransition}
    >
        <Component className={className}>
            {text}
        </Component>
    </motion.div>
  );
};


import { FloatingElements } from '../animations'; // Assuming FloatingElements respects reduced motion internally or can be configured

const floatingEmojis = [
  { emoji: "💻", delay: 0, duration: 18, size: 25 }, // Slightly adjusted durations for variety
  { emoji: "🚀", delay: 2, duration: 28, size: 20 },
  { emoji: "📊", delay: 6, duration: 20, size: 22 },
  { emoji: "🔍", delay: 4, duration: 23, size: 24 },
  { emoji: "📱", delay: 1, duration: 25, size: 21 },
  { emoji: "⚙️", delay: 3, duration: 19, size: 23 }
];

// Reviews carousel component
const ReviewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const reviews = [
    {
      name: "Sarah J.",
      role: "Frontend Developer",
      company: "Google",
      text: "The courses transformed my career trajectory completely.",
      rating: 5
    },
    {
      name: "Mike T.",
      role: "Data Scientist",
      company: "Microsoft",
      text: "The mentorship program was worth every penny.",
      rating: 5
    },
    {
      name: "Priya K.",
      role: "Cloud Architect",
      company: "Amazon",
      text: "Incredible depth of content and expert guidance.",
      rating: 4
    }
  ];

  useEffect(() => {
    if (shouldReduceMotion) return; // Don't auto-play if reduced motion is preferred

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, shouldReduceMotion]);

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };
  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  return (
    <div className="relative overflow-hidden min-h-[10rem] mt-6 w-full max-w-sm" aria-label="Testimonials carousel"> {/* Changed to min-h, added aria-label */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
          transition={{ duration: shouldReduceMotion ? 0 : DURATION_FAST, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-live="polite" // Announce changes to screen readers
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 h-full flex flex-col justify-center">
            <div className="flex gap-1 mb-2">
              {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {[...Array(5 - reviews[activeIndex].rating)].map((_, i) => ( // Show empty stars
                <FaStar key={`empty-${i}`} className="text-gray-500" />
              ))}
            </div>
            <p className="text-white text-sm mb-2 leading-relaxed">"{reviews[activeIndex].text}"</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="text-xs">
                <p className="text-white font-medium">{reviews[activeIndex].name}</p>
                <p className="text-gray-300">{reviews[activeIndex].role}, {reviews[activeIndex].company}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out ${i === activeIndex ? 'bg-white scale-125 ring-2 ring-white/50' : 'bg-white/40 hover:bg-white/70'}`}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
      {/* Visually Hidden Navigation Buttons for Accessibility */}
        <button
            onClick={handlePrev}
            className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-1/2 focus:-translate-y-1/2 focus:p-2 focus:bg-white/20 focus:rounded-full"
            aria-label="Previous review"
        >
            <FaChevronLeft className="text-white"/>
        </button>
        <button
            onClick={handleNext}
            className="sr-only focus:not-sr-only focus:absolute focus:right-2 focus:top-1/2 focus:-translate-y-1/2 focus:p-2 focus:bg-white/20 focus:rounded-full"
            aria-label="Next review"
        >
            <FaChevronRight className="text-white"/>
        </button>
    </div>
  );
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false); // For initial mount animation
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const splineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax values: slightly more subtle
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "-3%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]); // Fade out a bit later

  // Handle mouse movement for the 3D model - make it more subtle
  const handleSplineMouseMove = (e: MouseEvent) => {
    if (shouldReduceMotion) return;
    
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate normalized coordinates (-1 to 1) with reduced sensitivity
    const x = ((clientX / windowWidth) * 2 - 1) * 0.3; // Reduced by factor of 0.3
    const y = (-((clientY / windowHeight) * 2 - 1)) * 0.3; // Reduced by factor of 0.3
    
    setMousePosition({ x, y });
    
    // If we have access to the Spline API, we can directly control it
    if (splineRef.current) {
      try {
        // @ts-ignore - Spline API methods
        // For a cube model, rotating would be more appropriate than lookAt
        if (splineRef.current.rotate) {
          // Rotate the cube based on mouse position with more subtle movement
          splineRef.current.rotate(0, y * 0.2, -x * 0.2); // Reduced rotation factor
        } else if (splineRef.current.lookAt) {
          // Fallback to lookAt if rotate isn't available, with more subtle movement
          splineRef.current.lookAt(x * 2, y * 2, 10); // Increased z-value and reduced x,y factors
        }
      } catch (error) {
        // Silent fail if the method isn't available
      }
    }
  };

  // Add easing to mouse tracking for 3D model
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let requestId: number | null = null;
    const easing = 0.05; // Lower value for smoother, slower movement
    
    const smoothMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate normalized coordinates with reduced intensity
      targetX = ((clientX / windowWidth) * 2 - 1) * 0.3;
      targetY = (-((clientY / windowHeight) * 2 - 1)) * 0.3;
    };
    
    const updateSplinePosition = () => {
      // Apply easing to create smoother movement
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      
      if (splineRef.current) {
        try {
          // @ts-ignore
          if (splineRef.current.rotate) {
            splineRef.current.rotate(0, currentY * 0.2, -currentX * 0.2);
          } else if (splineRef.current.lookAt) {
            splineRef.current.lookAt(currentX * 2, currentY * 2, 10);
          }
        } catch (error) {
          // Silent fail
        }
      }
      
      requestId = requestAnimationFrame(updateSplinePosition);
    };
    
    window.addEventListener('mousemove', smoothMouseMove);
    requestId = requestAnimationFrame(updateSplinePosition);
    
    return () => {
      window.removeEventListener('mousemove', smoothMouseMove);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [shouldReduceMotion]);
  
  // Remove the old mouse tracking code since we replaced it with the smooth version
  useEffect(() => {
    setIsVisible(true); // Trigger entrance animations

    if (shouldReduceMotion || !imageRef.current) return; // Skip mouse move if reduced motion or no ref

    let requestId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const easing = 0.08; // Smoother, slightly slower easing

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // Reduced movement intensity further
      targetX = ((clientX / windowWidth) - 0.5) * 8;
      targetY = ((clientY / windowHeight) - 0.5) * 8;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      if (imageRef.current) {
        imageRef.current.style.transform = `perspective(1200px) rotateY(${currentX * 0.2}deg) rotateX(${-currentY * 0.2}deg) scale(1.01)`; // Slightly smaller rotation, added subtle scale
      }
      requestId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [shouldReduceMotion]); // Add shouldReduceMotion to dependency array

  const initialAnimProps = (delayIndex: number = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: shouldReduceMotion ? 0 : DURATION_NORMAL, delay: shouldReduceMotion ? 0 : delayIndex * DELAY_INCREMENT, ease: "circOut" }
  });


  return (
    <section
      ref={heroRef}
      className="relative w-full bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-24 md:py-32 overflow-x-clip" // overflow-x-clip to prevent horizontal scroll from intense blurs
      aria-labelledby="hero-headline" // For better screen reader context
    >
      {/* 3D Model Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60" aria-hidden="true">
        <SplineScene 
          scene="https://prod.spline.design/R0R85zmHiTGs2qls/scene.splinecode" 
          className="w-full h-full"
          // @ts-ignore - Passing ref and custom props to control the model
          onLoad={(spline) => {
            splineRef.current = spline;
            console.log("Spline scene loaded", spline);
            // Initial orientation
            try {
              if (spline.rotate) {
                spline.rotate(0, 0, 0);
              } else if (spline.lookAt) {
                spline.lookAt(0, 0, 5);
              }
            } catch (error) {
              console.error("Could not initialize 3D model orientation", error);
            }
          }}
        />
      </div>

      {/* Background elements */}
      <motion.div
        className="absolute inset-0 opacity-10" // Reduced opacity for more subtlety
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/70 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/70 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/70 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/50 rounded-full filter blur-3xl opacity-[0.05]"></div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500/50 rounded-full filter blur-3xl opacity-[0.05] animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      </motion.div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:45px_45px] opacity-30" aria-hidden="true"></div> {/* Slightly larger grid, reduced opacity */}

      {/* Floating elements */}
      {!shouldReduceMotion && ( // Conditionally render floating elements
        <FloatingElements
          elements={floatingEmojis}
          className="absolute inset-0 pointer-events-none opacity-30" // Reduced opacity
        />
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24"> {/* Increased gap */}
          {/* Text content */}
          <motion.div
            className="flex flex-col w-full md:w-[60%] text-center md:text-left" // Adjusted to take more width since we removed the right side content
            style={{ opacity: shouldReduceMotion ? 1 : opacity, y: textY }} // Apply shouldReduceMotion to scroll effects
          >
            <motion.div {...initialAnimProps(0)}>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/40 text-indigo-300 text-sm font-semibold mb-5 shadow-md">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2.5 animate-pulse"></span> {/* Brighter pulse for better visibility */}
                LearnExpert Platform
              </span>
            </motion.div>

            <div id="hero-headline">
              <AnimatedText
                text="Accelerate Your Tech Career Through Expert-Led Learning"
                as="h1" // Changed to h1 for semantic correctness (main page heading)
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-indigo-300 leading-tight"
                animationType="slide-up"
                duration={shouldReduceMotion ? 0 : DURATION_NORMAL}
                delay={shouldReduceMotion ? 0 : 0.2} // Slightly adjusted delay
                staggerChildren={0.04}
                words
                ease="circOut"
              />
            </div>

            <motion.p
              {...initialAnimProps(1)}
              className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed" // Added leading-relaxed
            >
              Access hands-on courses, personalized coaching, and a supportive community to master in-demand technical skills and advance your career.
            </motion.p>

            <motion.div
              {...initialAnimProps(2)}
              className="flex flex-col sm:flex-row gap-4 mt-2 justify-center md:justify-start"
            >
              <Button
                as={Link}
                href="/register"
                color="primary"
                variant="shadow"
                size="lg"
                startContent={<FaRocket className="text-white text-xl" />} // Slightly larger icon
                className="font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl shadow-purple-500/40 active:scale-95" // Enhanced hover, added active state
              >
                Start Learning Now
              </Button>

              <Button
                as={Link}
                href="/courses"
                variant="bordered"
                size="lg"
                startContent={<FaBookOpen className="text-xl" />} // Slightly larger icon
                className="text-white border-white/40 font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300 transform hover:scale-[1.03] active:scale-95" // Enhanced hover, added active state
              >
                Browse Courses
              </Button>
            </motion.div>

            <motion.div
              {...initialAnimProps(3)}
              className="mt-10 flex items-center justify-center md:justify-start"
            >
              <div className="flex -space-x-2.5"> {/* Slightly increased negative space */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden transform transition-transform hover:scale-110 hover:z-10 shadow-md">
                    <Image
                      src={`/assets/avatar-${i}.jpg`} // Ensure these paths are correct
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold transform transition-transform hover:scale-110 hover:z-10 shadow-md">
                  +2K
                </div>
              </div>
              <div className="ml-4">
                <div className="text-white font-semibold">Join 12,000+ learners</div>
                <div className="flex items-center text-indigo-300 text-sm mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs mr-0.5" /> // Reduced margin
                  ))}
                  <span className="ml-1.5">4.9/5 average rating</span>
                </div>
              </div>
            </motion.div>

            {/* Reviews carousel */}
            <motion.div
              {...initialAnimProps(4)}
              className="mt-8 max-w-sm mx-auto md:mx-0"
            >
              <ReviewsCarousel />
            </motion.div>
          </motion.div>
        </div>

        {/* Trusted companies section */}
        <motion.div
          className="mt-28 md:mt-36 text-center relative overflow-hidden"
          {...initialAnimProps(5)}
          aria-labelledby="trusted-by-heading"
        >
          {/* Subtle dividers */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
          
          <h3 id="trusted-by-heading" className="text-gray-400 mb-12 text-xl font-medium">
            Trusted by professionals from global tech leaders
          </h3>

          <div className="mx-auto max-w-6xl px-4 pb-16 relative">
            {shouldReduceMotion ? (
              // Static grid for reduced motion preference
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
                {[
                  { name: "Google", icon: <FaGoogle className="text-[#4285F4]" /> },
                  { name: "Microsoft", icon: <FaWindows className="text-[#00A4EF]" /> },
                  { name: "Amazon", icon: <FaAmazon className="text-[#FF9900]" /> },
                  { name: "Meta", icon: <SiMeta className="text-[#0668E1]" /> },
                  { name: "LinkedIn", icon: <FaLinkedin className="text-[#0077B5]" /> },
                  { name: "Oracle", icon: <SiOracle className="text-[#F80000]" /> },
                  { name: "Apple", icon: <FaApple className="text-white" /> },
                  { name: "Tesla", icon: <SiTesla className="text-[#E82127]" /> },
                  { name: "Spotify", icon: <FaSpotify className="text-[#1DB954]" /> },
                  { name: "Adobe", icon: <SiAdobe className="text-[#FF0000]" /> },
                  { name: "Netflix", icon: <SiNetflix className="text-[#E50914]" /> },
                  { name: "Shopify", icon: <SiShopify className="text-[#7AB55C]" /> }
                ].map((company, index) => (
                  <div
                    key={company.name}
                    className="flex flex-col items-center justify-center w-full group"
                  >
                    <div className="text-4xl mb-2.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform">
                      {company.icon}
                    </div>
                    <span className="text-gray-500 text-xs font-medium opacity-70 group-hover:opacity-100 group-hover:text-gray-300 transition-all duration-300">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Animated continuous carousel
              <div className="w-full inline-flex flex-nowrap overflow-hidden">
                {/* First set of items */}
                <motion.div
                  className="flex items-center space-x-16 md:space-x-24"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    x: { duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }
                  }}
                  aria-hidden="true"
                >
                  {[
                    { name: "Google", icon: <FaGoogle className="text-[#4285F4]" /> },
                    { name: "Microsoft", icon: <FaWindows className="text-[#00A4EF]" /> },
                    { name: "Amazon", icon: <FaAmazon className="text-[#FF9900]" /> },
                    { name: "Meta", icon: <SiMeta className="text-[#0668E1]" /> },
                    { name: "LinkedIn", icon: <FaLinkedin className="text-[#0077B5]" /> },
                    { name: "Oracle", icon: <SiOracle className="text-[#F80000]" /> },
                    { name: "Apple", icon: <FaApple className="text-white" /> },
                    { name: "Tesla", icon: <SiTesla className="text-[#E82127]" /> },
                    { name: "Spotify", icon: <FaSpotify className="text-[#1DB954]" /> },
                    { name: "Adobe", icon: <SiAdobe className="text-[#FF0000]" /> },
                    { name: "Netflix", icon: <SiNetflix className="text-[#E50914]" /> },
                    { name: "Shopify", icon: <SiShopify className="text-[#7AB55C]" /> },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col items-center justify-center group flex-shrink-0">
                      <div className="text-4xl mb-2.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform">
                        {company.icon}
                      </div>
                      <span className="text-gray-400 text-xs font-medium whitespace-nowrap">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
                
                {/* Duplicate set of items for seamless looping */}
                <motion.div
                  className="flex items-center space-x-16 md:space-x-24"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    x: { duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }
                  }}
                  aria-hidden="true"
                >
                  {[
                    { name: "Google", icon: <FaGoogle className="text-[#4285F4]" /> },
                    { name: "Microsoft", icon: <FaWindows className="text-[#00A4EF]" /> },
                    { name: "Amazon", icon: <FaAmazon className="text-[#FF9900]" /> },
                    { name: "Meta", icon: <SiMeta className="text-[#0668E1]" /> },
                    { name: "LinkedIn", icon: <FaLinkedin className="text-[#0077B5]" /> },
                    { name: "Oracle", icon: <SiOracle className="text-[#F80000]" /> },
                    { name: "Apple", icon: <FaApple className="text-white" /> },
                    { name: "Tesla", icon: <SiTesla className="text-[#E82127]" /> },
                    { name: "Spotify", icon: <FaSpotify className="text-[#1DB954]" /> },
                    { name: "Adobe", icon: <SiAdobe className="text-[#FF0000]" /> },
                    { name: "Netflix", icon: <SiNetflix className="text-[#E50914]" /> },
                    { name: "Shopify", icon: <SiShopify className="text-[#7AB55C]" /> },
                  ].map((company) => (
                    <div key={company.name} className="flex flex-col items-center justify-center group flex-shrink-0">
                      <div className="text-4xl mb-2.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform">
                        {company.icon}
                      </div>
                      <span className="text-gray-400 text-xs font-medium whitespace-nowrap">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* Fallback for text content (SR only) */}
            <div className="sr-only">
              Our platform is trusted by professionals from companies such as Google, Microsoft, Amazon, Meta, LinkedIn, Oracle, Apple, Tesla, Spotify, Adobe, Netflix, and Shopify.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator with slightly different animation */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: DURATION_NORMAL, delay: 2.5 }} // Delayed appearance
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm mb-2.5 font-medium">Scroll Down</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center items-start pt-1.5">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 14, 0] }} // Increased travel distance
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}