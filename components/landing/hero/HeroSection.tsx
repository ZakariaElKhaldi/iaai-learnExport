"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'; // Added useReducedMotion
import { Button } from '@nextui-org/react';
import { FaRocket, FaBookOpen, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Added Chevron icons
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax values: slightly more subtle
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "-3%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]); // Fade out a bit later

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
            className="flex flex-col w-full md:w-[55%] text-center md:text-left" // Slightly more space for text
            style={{ opacity: shouldReduceMotion ? 1 : opacity, y: textY }} // Apply shouldReduceMotion to scroll effects
          >
            <motion.div {...initialAnimProps(0)}>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/40 text-indigo-300 text-sm font-semibold mb-5 shadow-md">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2.5 animate-pulse"></span> {/* Brighter pulse for better visibility */}
                LearnExpert Platform
              </span>
            </motion.div>

            <AnimatedText
              text="Accelerate Your Tech Career Through Expert-Led Learning"
              as="h1" // Changed to h1 for semantic correctness (main page heading)
              id="hero-headline" // For aria-labelledby
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-indigo-300 leading-tight"
              animationType="slide-up"
              duration={shouldReduceMotion ? 0 : DURATION_NORMAL}
              delay={shouldReduceMotion ? 0 : 0.2} // Slightly adjusted delay
              staggerChildren={0.04}
              words
              ease="circOut"
            />

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

          {/* Hero image - improved dashboard display */}
          <motion.div
            className="w-full md:w-[45%] relative mt-10 md:mt-0" // Adjusted width
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION_SLOW, delay: shouldReduceMotion ? 0 : 0.3, ease: "circOut" }}
          >
            <div
              ref={imageRef}
              className="relative w-full aspect-[16/11] max-w-xl mx-auto transition-transform duration-500 ease-out group" // Added group for badge hover effects, adjusted aspect ratio slightly for more realistic dashboard feel
            >
              {/* Dashboard frame glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" // Wider glow, hover effect
                animate={shouldReduceMotion ? {} : {
                  opacity: [0.2, 0.35, 0.2],
                  scale: [1, 1.015, 1],
                }}
                transition={shouldReduceMotion ? {duration: 0} : {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "mirror" // mirror is often smoother than reverse
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-white/15 bg-gray-900/70 backdrop-blur-md shadow-2xl transform transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-purple-500/30"> {/* Slightly less roundness, increased blur, subtle group hover */}
                <div className="bg-gray-800/80 h-9 flex items-center px-4 border-b border-white/10"> {/* Slightly taller header */}
                  <div className="flex space-x-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="mx-auto text-white/70 text-xs font-medium tracking-wide"> {/* Added tracking */}
                    LearnExpert Dashboard
                  </div>
                </div>

                <div className="relative h-[calc(100%-2.25rem)]"> {/* Adjusted height for new header */}
                  <Image
                    src="/assets/hero-image.jpg" // Ensure this path is correct and image is optimized
                    alt="LearnExpert Platform Interactive Dashboard"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes prop
                  />
                </div>

                {/* Badges: Enhanced styling and hover effects */}
                {[
                  {
                    id: 'live-mentoring',
                    position: "top-12 right-5",
                    icon: <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse mr-2"></div>,
                    text: "Live Mentoring",
                    colorClasses: "bg-black/70 border-green-500/30 shadow-green-500/20",
                    delayIndex: 5
                  },
                  {
                    id: 'progress-badge',
                    position: "top-12 left-5",
                    content: (
                      <>
                        <div className="text-xs text-indigo-200 mb-1">Progress</div>
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-500 to-indigo-400 rounded-full"
                            initial={shouldReduceMotion ? { width: '75%' } : { width: 0 }}
                            animate={isVisible ? { width: '75%' } : {}}
                            transition={{ duration: shouldReduceMotion ? 0 : 1.5, delay: shouldReduceMotion ? 0 : 1.2 + (0 * DELAY_INCREMENT), ease: "easeOut" }}
                          />
                        </div>
                        <div className="text-white text-xs mt-1.5 font-medium">75% Complete</div>
                      </>
                    ),
                    colorClasses: "bg-indigo-900/80 border-indigo-500/40 shadow-indigo-500/20",
                    delayIndex: 6
                  },
                  {
                    id: 'new-lessons',
                    position: "bottom-5 right-5",
                    icon: (
                        <div className="relative mr-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 ring-1 ring-black/50"></div>
                            <svg className="w-4 h-4 text-purple-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                        </div>
                    ),
                    text: "New Lessons",
                    colorClasses: "bg-purple-900/80 border-purple-500/30 shadow-purple-500/20",
                    delayIndex: 7
                  },
                  // Removed one badge for less clutter, can be added back if needed
                ].map(badge => (
                  <motion.div
                    key={badge.id}
                    className={`absolute ${badge.position} backdrop-blur-sm rounded-lg p-2.5 border shadow-lg text-white text-xs font-medium
                                transition-all duration-300 group-hover:opacity-90 hover:!opacity-100 hover:scale-105 hover:shadow-2xl ${badge.colorClasses}`}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, y: shouldReduceMotion ? 0 : 10 }}
                    animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: shouldReduceMotion ? 0 : DURATION_FAST, delay: shouldReduceMotion ? 0: 0.6 + badge.delayIndex * (DELAY_INCREMENT / 2), ease: "backOut" }}
                  >
                    <div className="flex items-center">
                      {badge.icon}
                      {badge.text && <span className="leading-tight">{badge.text}</span>}
                      {badge.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trusted companies section */}
        <motion.div
          className="mt-28 md:mt-36 text-center pb-12" // Adjusted spacing
          {...initialAnimProps(5)} // Staggered animation for this section
          aria-labelledby="trusted-by-heading"
        >
          <h3 id="trusted-by-heading" className="text-gray-400 mb-8 text-lg font-medium">
            Trusted by professionals from global tech leaders
          </h3>

          <div className="relative h-auto py-4 mx-auto max-w-6xl overflow-hidden"> {/* Increased max-width */}
            {shouldReduceMotion ? (
                // Static display for reduced motion
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
                    {['Google', 'Microsoft', 'Amazon', 'Meta', 'IBM', 'Oracle', 'Apple', 'Tesla', 'Spotify', 'Adobe', 'Netflix', 'Shopify'].map(company => (
                        <div key={company} className="text-gray-400 text-lg font-semibold opacity-80">{company}</div>
                    ))}
                </div>
            ) : (
                // Marquee animation
                <>
                {[
                    { id: 'marquee1', items: ['Google', 'Microsoft', 'Amazon', 'Meta', 'IBM', 'Oracle', 'Apple'], direction: 'left', offset: 0 },
                    { id: 'marquee2', items: ['Tesla', 'Spotify', 'Adobe', 'Netflix', 'Shopify', 'Slack', 'Intel'], direction: 'right', offset: 'top-10 md:top-12' } // Adjusted offset
                ].map(marquee => (
                    <motion.div
                        key={marquee.id}
                        className={`flex absolute left-0 whitespace-nowrap ${marquee.offset || ''}`}
                        animate={{ x: marquee.direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
                        transition={{
                            x: { duration: 30, repeat: Infinity, repeatType: "loop", ease: "linear" }
                        }}
                        aria-hidden="true" // Marquee is decorative, content repeated
                    >
                        {[...Array(3)].map((_, setIndex) => ( // Increased repetition for smoother loop with wider marquee
                            <div key={`set-${marquee.id}-${setIndex}`} className="flex items-center">
                                {marquee.items.map((company, index) => (
                                    <div
                                        key={`${marquee.id}-${setIndex}-${index}`}
                                        className="mx-10 md:mx-14 text-gray-400/80 text-xl font-semibold opacity-70 hover:opacity-100 transition-opacity"
                                    >
                                        {company}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                ))}
                 {/* Visible list for screen readers, hidden visually when marquee is active */}
                <div className="sr-only">
                    Trusted by: Google, Microsoft, Amazon, Meta, IBM, Oracle, Apple, Tesla, Spotify, Adobe, Netflix, Shopify, Slack, Intel.
                </div>
                </>
            )}
            {/* Gradient fade edges - only if marquee is active */}
            {!shouldReduceMotion && (
              <>
                <div className="absolute left-0 top-0 h-full w-20 md:w-32 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-32 bg-gradient-to-l from-gray-900 via-gray-900 to-transparent z-10"></div>
              </>
            )}
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