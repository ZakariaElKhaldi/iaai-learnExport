"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiVideo, FiGlobe } from 'react-icons/fi';

import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatItem {
  id: number;
  value: number; // Changed to number for animation
  displayValue: string; // Added for display string like "500+"
  label: string;
  icon: React.ElementType;
  color: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    value: 500,
    displayValue: "500+",
    label: "Courses Offered",
    icon: FiBookOpen,
    color: "text-blue-500",
  },
  {
    id: 2,
    value: 150,
    displayValue: "150+",
    label: "Expert Instructors",
    icon: FiUsers,
    color: "text-green-500",
  },
  {
    id: 3,
    value: 2000,
    displayValue: "2000+",
    label: "Hours of Video Content",
    icon: FiVideo,
    color: "text-purple-500",
  },
  {
    id: 4,
    value: 120,
    displayValue: "120+",
    label: "Countries Reached",
    icon: FiGlobe,
    color: "text-red-500",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

// AnimatedNumber component
function AnimatedNumber({ to, displaySuffix = "" }: { to: number, displaySuffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const controls = animate(0, to, {
              duration: 1.5,
              ease: "easeOut",
              onUpdate(value) {
                node.textContent = Math.round(value).toLocaleString();
              },
              onComplete() {
                node.textContent = to.toLocaleString() + displaySuffix;
                setHasAnimated(true); 
              }
            });
            // Disconnect observer after animation starts to prevent re-triggering
            observer.disconnect(); 
            return () => controls.stop();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [to, displaySuffix, hasAnimated]);

  return <span ref={nodeRef}>0</span>;
}


export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-slate-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden="true" className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div aria-hidden="true" className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
          }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-3 shadow-sm">
            <FiGlobe className="w-4 h-4 mr-1.5" /> Platform Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Join a <span className="text-indigo-600">Thriving</span> Global Community
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform empowers learners and professionals worldwide, fostering growth and innovation.
            See the numbers that reflect our commitment to excellence.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger when 10% is visible for earlier animation start
          variants={sectionVariants}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center group transition-all duration-300 hover:shadow-2xl hover:bg-white"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-5 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${stat.color.replace('text-', 'bg-').replace('500', '100')}`}
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 + (stat.id * 0.1), type: "spring", stiffness: 200, damping: 15 }}
              >
                {React.createElement(stat.icon, { className: `w-8 h-8 ${stat.color}` })}
              </motion.div>
              <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>
                <AnimatedNumber to={stat.value} displaySuffix={stat.displayValue.includes('+') ? '+' : ''} />
              </h3>
              <p className="text-gray-700 text-md font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
