import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface AnimateOnScrollOptions {
  target: string | HTMLElement | Element | Element[]; // The element(s) to animate
  direction?: AnimationDirection;
  distance?: number; // How far to animate from
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  trigger?: Element | string; // Trigger element (if different from target)
  start?: string; // ScrollTrigger start position
  end?: string; // ScrollTrigger end position
  scrub?: boolean | number;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Create a scroll-triggered animation
 */
export function animateOnScroll({
  target,
  direction = 'up',
  distance = 100,
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  ease = 'power2.out',
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  toggleActions = 'play none none none',
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack
}: AnimateOnScrollOptions) {
  // Exit early if not in browser
  if (typeof window === 'undefined') return null;

  // Set initial state based on direction
  const initialProps: gsap.TweenVars = { opacity: 0 };
  const animateProps: gsap.TweenVars = { opacity: 1, duration, ease };

  if (direction === 'up') {
    initialProps.y = distance;
    animateProps.y = 0;
  } else if (direction === 'down') {
    initialProps.y = -distance;
    animateProps.y = 0;
  } else if (direction === 'left') {
    initialProps.x = -distance;
    animateProps.x = 0;
  } else if (direction === 'right') {
    initialProps.x = distance;
    animateProps.x = 0;
  } else if (direction === 'scale') {
    initialProps.scale = 0.8;
    animateProps.scale = 1;
  }

  // Set delay and stagger
  if (delay) animateProps.delay = delay;
  if (stagger) animateProps.stagger = stagger;

  // Set the initial state
  gsap.set(target, initialProps);

  // Create the animation
  const tween = gsap.to(target, animateProps);

  // Create the scrollTrigger
  const scrollTrigger = ScrollTrigger.create({
    trigger: trigger || target,
    start,
    end,
    toggleActions,
    scrub,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    animation: tween,
    // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
  });

  return { tween, scrollTrigger };
}

/**
 * Animate elements sequentially as they come into view
 */
export function animateStaggeredElements(
  containerSelector: string,
  elementsSelector: string,
  options: Partial<AnimateOnScrollOptions> = {}
) {
  // Exit early if not in browser
  if (typeof window === 'undefined') return null;

  const containers = document.querySelectorAll(containerSelector);
  
  containers.forEach(container => {
    const elementsNodeList = container.querySelectorAll(elementsSelector);
    // Convert NodeList to Array to fix type error
    const elements = Array.from(elementsNodeList);
    
    if (elements.length) {
      animateOnScroll({
        target: elements,
        stagger: 0.1,
        direction: 'up',
        trigger: container,
        ...options
      });
    }
  });
}

/**
 * Create a parallax scrolling effect
 */
export function createParallaxEffect(
  element: string | HTMLElement | Element,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) {
  // Exit early if not in browser
  if (typeof window === 'undefined') return null;

  const propToAnimate = direction === 'vertical' ? 'y' : 'x';
  
  return ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.to(element, {
        [propToAnimate]: `${self.progress * 100 * speed}px`,
        ease: "none",
        duration: 0.5
      });
    }
  });
} 