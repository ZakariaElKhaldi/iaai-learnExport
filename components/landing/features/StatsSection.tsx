"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Statistic {
  value: string;
  label: string;
  color?: string;
}

// Stats data
const stats: Statistic[] = [
  {
    value: "100K+",
    label: "Active Learners",
    color: "text-blue-300"
  },
  {
    value: "94%",
    label: "Completion Rate",
    color: "text-indigo-300"
  },
  {
    value: "87%",
    label: "Career Advancement",
    color: "text-purple-300"
  },
  {
    value: "+45%",
    label: "Avg. Salary Hike",
    color: "text-cyan-300"
  },
];

export default function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      className="my-20 max-w-4xl mx-auto"
    >
      <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-900/70 to-blue-900/70 p-8 md:p-10">
          <h2 className="text-center text-2xl font-semibold text-blue-200 mb-12">
            LearnExpert Platform Impact
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-white">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.2,
                  ease: "easeOut" 
                }}
                className="text-center"
              >
                <h3 className={`text-4xl sm:text-5xl font-bold mb-1 ${stat.color || "text-white"}`}>
                  {stat.value}
                </h3>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Data verified - Updated May 2025
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
