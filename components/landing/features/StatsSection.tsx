"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@nextui-org/react';
import { FiTrendingUp, FiUsers, FiAward, FiDollarSign } from 'react-icons/fi';

interface Statistic {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  growth?: string;
}

// Enhanced stats data with additional information
const stats: Statistic[] = [
  {
    value: "100K+",
    label: "Active Learners",
    description: "Global community of professionals and students actively engaging with our courses",
    icon: <FiUsers className="w-6 h-6" />,
    color: "text-blue-300",
    gradient: "from-blue-500 to-sky-400",
    growth: "+22% from last year"
  },
  {
    value: "94%",
    label: "Completion Rate",
    description: "Our learners consistently finish their courses, compared to industry average of 5-15%",
    icon: <FiAward className="w-6 h-6" />,
    color: "text-indigo-300",
    gradient: "from-indigo-500 to-violet-400",
    growth: "+8% from last year"
  },
  {
    value: "87%",
    label: "Career Advancement",
    description: "Percentage of learners who reported career growth within 6 months of completion",
    icon: <FiTrendingUp className="w-6 h-6" />,
    color: "text-purple-300",
    gradient: "from-purple-500 to-fuchsia-400",
    growth: "+12% from last year"
  },
  {
    value: "+45%",
    label: "Avg. Salary Hike",
    description: "Average increase in compensation reported by professionals after certification",
    icon: <FiDollarSign className="w-6 h-6" />,
    color: "text-cyan-300",
    gradient: "from-cyan-500 to-emerald-400",
    growth: "+5% from last year"
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function StatsSection() {
  // Add counter animation effect
  const [countUp, setCountUp] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountUp(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <motion.div
      id="stats-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="my-20 max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Decorative background elements */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform hover:shadow-[0_20px_80px_-10px_rgba(79,70,229,0.3)] transition-all duration-500">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-[url('/assets/stats-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-blue-900/80 to-slate-900/90"></div>
        
        <div className="relative p-8 md:p-12">
          {/* Header with animated underline */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4"
            >
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
              Impact Metrics
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block"
            >
              Real Results, Real Impact
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-blue-100/80 max-w-2xl mx-auto"
            >
              Our platform delivers measurable outcomes that help professionals achieve their career goals
            </motion.p>
          </div>
          
          {/* Stats grid with enhanced design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-lg border border-white/10"
              >
                <Tooltip content={stat.description} placement="top" className="max-w-xs">
                  <div className="text-center sm:text-left">
                    {/* Icon with gradient background */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br to-white/10 from-white/5 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center bg-gradient-to-r ${stat.gradient}`}>
                        {stat.icon}
                      </div>
                    </div>
                    
                    {/* Value with animated counter */}
                    <h3 className={`text-4xl sm:text-5xl font-bold mb-1 ${stat.color} flex justify-center sm:justify-start items-baseline`}>
                      {stat.value}
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={countUp ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="ml-2 text-sm font-normal text-blue-300/70"
                      >
                        {stat.growth && <span className="flex items-center gap-1"><FiTrendingUp /> {stat.growth}</span>}
                      </motion.span>
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-2">{stat.label}</p>
                    
                    {/* Animated progress bar */}
                    <div className="w-full bg-gray-700/30 h-1 rounded-full overflow-hidden mt-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={countUp ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.2 * index, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${stat.gradient}`}
                      />
                    </div>
                  </div>
                </Tooltip>
              </motion.div>
            ))}
          </div>
          
          {/* Footer with verification info */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12 pt-6 border-t border-white/10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 text-blue-200/80 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Data verified by LearnExpert Research - Updated May 2025
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
