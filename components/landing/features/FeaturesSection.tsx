"use client";

import React from 'react';
import { Card, CardBody, CardFooter, Button, Chip } from '@nextui-org/react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TechTracksSection from './TechTracksSection';
import StatsSection from './StatsSection';

// --- Types ---
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

interface TechnologyItem {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface LearningPathStep {
  step: string;
  title: string;
  description: string;
}

// --- SVG Icons ---
const Icons = {
  ExpertLed: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6.75H7.75C6.23122 6.75 5 7.98122 5 9.5V18.25C5 19.7688 6.23122 21 7.75 21H16.25C17.7688 21 19 19.7688 19 18.25V9.5C19 7.98122 17.7688 6.75 16.25 6.75H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V4.75C9 4.19772 9.44772 3.75 10 3.75H14C14.5523 3.75 15 4.19772 15 4.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 16.25H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12.25H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Consultation: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 6.5C16.5 7.05228 16.0523 7.5 15.5 7.5C14.9477 7.5 14.5 7.05228 14.5 6.5C14.5 5.94772 14.9477 5.5 15.5 5.5C16.0523 5.5 16.5 5.94772 16.5 6.5Z" fill="currentColor"/>
      <path d="M18.5 6.5C18.5 8.15685 17.1569 9.5 15.5 9.5C13.8431 9.5 12.5 8.15685 12.5 6.5C12.5 4.84315 13.8431 3.5 15.5 3.5C17.1569 3.5 18.5 4.84315 18.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 13.5C9.5 14.0523 9.05228 14.5 8.5 14.5C7.94772 14.5 7.5 14.0523 7.5 13.5C7.5 12.9477 7.94772 12.5 8.5 12.5C9.05228 12.5 9.5 12.9477 9.5 13.5Z" fill="currentColor"/>
      <path d="M11.5 13.5C11.5 15.1569 10.1569 16.5 8.5 16.5C6.84315 16.5 5.5 15.1569 5.5 13.5C5.5 11.8431 6.84315 10.5 8.5 10.5C10.1569 10.5 11.5 11.8431 11.5 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.5817 12.9572C13.4162 12.4618 11.8515 12.5471 10.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.5 18.5C21.5 19.6046 20.6046 20.5 19.5 20.5H4.5C3.39543 20.5 2.5 19.6046 2.5 18.5V5.5C2.5 4.39543 3.39543 3.5 4.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  InteractiveProjects: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 6.5C3.5 4.84315 4.84315 3.5 6.5 3.5H17.5C19.1569 3.5 20.5 4.84315 20.5 6.5V17.5C20.5 19.1569 19.1569 20.5 17.5 20.5H6.5C4.84315 20.5 3.5 19.1569 3.5 17.5V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9.5L9.5 12L7 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 15.5H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  CareerAdvancement: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.5L18.5 12.5L14.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 12.5H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 20.5V3.5C3.5 3.5 9.5 3.5 12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  PeerCommunity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 7.5C13.5 8.05228 13.0523 8.5 12.5 8.5C11.9477 8.5 11.5 8.05228 11.5 7.5C11.5 6.94772 11.9477 6.5 12.5 6.5C13.0523 6.5 13.5 6.94772 13.5 7.5Z" fill="currentColor"/>
      <path d="M15.5 7.5C15.5 9.15685 14.1569 10.5 12.5 10.5C10.8431 10.5 9.5 9.15685 9.5 7.5C9.5 5.84315 10.8431 4.5 12.5 4.5C14.1569 4.5 15.5 5.84315 15.5 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 17.5C7.5 14.7386 9.73858 12.5 12.5 12.5C15.2614 12.5 17.5 14.7386 17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.75 14.5C19.8567 14.928 21.25 16.1176 21.25 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.25 14.5C5.14331 14.928 3.75 16.1176 3.75 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Certification: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 16.5V20.5L15.5 18.5L18.5 20.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.5 10.5C15.5 11.0523 15.0523 11.5 14.5 11.5C13.9477 11.5 13.5 11.0523 13.5 10.5C13.5 9.94772 13.9477 9.5 14.5 9.5C15.0523 9.5 15.5 9.94772 15.5 10.5Z" fill="currentColor"/>
      <path d="M18.5 10.5C18.5 12.9853 16.4853 15 14 15C11.5147 15 9.5 12.9853 9.5 10.5C9.5 8.01472 11.5147 6 14 6C16.4853 6 18.5 8.01472 18.5 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V18.5C3.5 19.6046 4.39543 20.5 5.5 20.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// --- Static Data ---
const featuresData: Feature[] = [
  {
    id: 1,
    title: "Expert-Led Courses",
    description: "Learn from industry veterans with courses designed for practical skill development and real-world application.",
    icon: <Icons.ExpertLed />,
    accent: "bg-indigo-100 text-indigo-800",
  },
  {
    id: 2,
    title: "1-on-1 Consultations",
    description: "Get personalized guidance and feedback from experienced professionals through direct, one-on-one consultation sessions.",
    icon: <Icons.Consultation />,
    accent: "bg-purple-100 text-purple-800",
  },
  {
    id: 3,
    title: "Interactive Projects",
    description: "Build real-world projects with guided exercises that reinforce learning and create portfolio-worthy examples of your skills.",
    icon: <Icons.InteractiveProjects />,
    accent: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    title: "Career Advancement",
    description: "Access specialized tracks and guidance to help you navigate your career path and achieve your professional goals.",
    icon: <Icons.CareerAdvancement />,
    accent: "bg-green-100 text-green-800",
  },
  {
    id: 5,
    title: "Peer Community",
    description: "Connect with like-minded professionals, share insights, collaborate on projects, and expand your network.",
    icon: <Icons.PeerCommunity />,
    accent: "bg-pink-100 text-pink-800",
  },
  {
    id: 6,
    title: "Certification",
    description: "Earn recognized credentials that validate your skills to employers and highlight your expertise in specific domains.",
    icon: <Icons.Certification />,
    accent: "bg-red-100 text-red-800",
  },
];

const techStackData: TechnologyItem[] = [
  { id: 1, name: "Web Development", icon: "🌐", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: 2, name: "JavaScript", icon: "⚡", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: 3, name: "React", icon: "⚛️", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  { id: 4, name: "Node.js", icon: "🟢", color: "bg-green-100 text-green-800 border-green-200" },
  { id: 5, name: "AWS Cloud", icon: "☁️", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: 6, name: "Data Science", icon: "📊", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: 7, name: "DevOps", icon: "🔄", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { id: 8, name: "Machine Learning", icon: "🧠", color: "bg-pink-100 text-pink-800 border-pink-200" },
  { id: 9, name: "Python", icon: "🐍", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: 10, name: "UI/UX Design", icon: "🎨", color: "bg-rose-100 text-rose-800 border-rose-200" },
];

const learningPathSteps: LearningPathStep[] = [
  { step: "01", title: "Skill Assessment", description: "Identify your strengths and areas for growth" },
  { step: "02", title: "Personalized Learning Path", description: "Customized curriculum based on your goals" },
  { step: "03", title: "Hands-on Practice", description: "Apply concepts through real-world projects" },
  { step: "04", title: "Expert Feedback", description: "Receive guidance from industry professionals" }
];

// --- Framer Motion Variants ---
const animations = {
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  fadeInWithDelay: (delay: number = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay }
    }
  }),
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    }
  },
  staggerItem: {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    }
  }
};

// --- Reusable Components ---
const SectionHeader = ({ subtitle, title, description }: { subtitle: string, title: React.ReactNode, description?: string }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={animations.fadeInWithDelay(0)}
      viewport={{ once: true, amount: 0.5 }}
      className="inline-block mb-4"
    >
      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium shadow-sm">
        <span aria-hidden="true" className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
        {subtitle}
      </span>
    </motion.div>
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={animations.fadeInWithDelay(0.1)}
      viewport={{ once: true, amount: 0.5 }}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={animations.fadeInWithDelay(0.2)}
        viewport={{ once: true, amount: 0.5 }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <Card
    className="bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-none overflow-hidden h-full group"
    isPressable
    radius="lg"
  >
    <CardBody className="p-6">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.accent} text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
          {feature.icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </CardBody>
    <CardFooter className="pb-4 px-6 pt-0">
      <Button
        as="span"
        variant="light"
        color="primary"
        className="text-sm px-0 font-medium group-hover:text-indigo-700 transition-colors duration-300"
        size="sm"
        endContent={<span className="group-hover:translate-x-1 transition-transform duration-300"><Icons.ArrowRight /></span>}
      >
        Learn more
      </Button>
    </CardFooter>
  </Card>
);

const LearningStepItem = ({ step, title, description, index }: LearningPathStep & { index: number }) => (
  <motion.div
    className="relative w-full md:w-1/4 flex flex-col items-center text-center z-10"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.2 + (index * 0.15), duration: 0.7, ease: "easeOut" }
      }
    }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="relative mb-5 transform transition-transform duration-300 hover:scale-110">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 blur-md opacity-60 animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="relative bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-300 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shadow-md">
        {step}
      </div>
    </div>

    <h4 className="font-semibold text-gray-900 mb-3 relative text-lg">
      {title}
      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-70 mx-auto w-16 rounded-full"></span>
    </h4>

    <p className="text-sm text-gray-600 max-w-[220px] leading-relaxed">{description}</p>
  </motion.div>
);

// --- Main Component ---
export default function FeaturesSection() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div aria-hidden="true" className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full opacity-60 blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div aria-hidden="true" className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full opacity-60 blur-3xl animate-pulse" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full opacity-40 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
      <div aria-hidden="true" className="absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-l from-indigo-50 to-blue-100 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDuration: '18s', animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader 
          subtitle="Learning Platform Features"
          title={<>Comprehensive Learning <span className="text-indigo-600">Experience</span></>}
          description="LearnExpert provides a complete ecosystem for your technical growth with features designed to accelerate your learning and career advancement."
        />

        {/* Learning path visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animations.fadeIn}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="relative max-w-5xl mx-auto mb-28"
        >
          <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
            {/* Gradient border effect */}
            <div aria-hidden="true" className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-6 md:p-10">
              {/* Custom header with glowing dot */}
              <div className="flex flex-col md:flex-row items-center md:justify-start mb-8 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                    <div className="w-4 h-4 rounded-full bg-white animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Your Learning Journey</h3>
              </div>

              <p className="text-gray-600 mb-10 max-w-2xl mx-auto md:mx-0 text-center md:text-left leading-relaxed">
                Our platform guides you through a structured learning path that combines theoretical knowledge
                with hands-on practice to ensure mastery of complex technical concepts and accelerate your career growth.
              </p>

              {/* Learning path steps with connecting lines */}
              <div className="relative mt-16 px-4">
                {/* Horizontal connecting line (desktop) */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 hidden md:block rounded-full"></div>

                {/* Vertical connecting line (mobile) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 md:hidden rounded-full"></div>

                <div className="flex flex-col md:flex-row items-start justify-between space-y-16 md:space-y-0 md:space-x-4">
                  {learningPathSteps.map((item, index) => (
                    <LearningStepItem key={item.step} {...item} index={index} />
                  ))}
                </div>
              </div>

              {/* Learning path image */}
              <div className="mt-16 relative group">
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-xl group-hover:from-indigo-500/15 group-hover:to-purple-500/15 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="/assets/learning-path.png"
                    alt="Diagram illustrating the four steps of the Learning Expert learning journey"
                    width={960}
                    height={500}
                    loading="eager"
                    priority
                    className="rounded-xl w-full h-auto shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating elements */}
          
        </motion.div>

        {/* Feature cards - Using Framer Motion stagger */}
        <motion.div
          className="mb-24"
          variants={animations.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-1.5"></span>
              Platform Highlights
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block">
              Our Core Features
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-70 rounded-full"></span>
            </h2>
          </div>

          {/* Honeycomb-inspired layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* First row - offset */}
            <div className="flex flex-wrap justify-center mb-4 md:mb-0">
              {featuresData.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`w-full sm:w-[320px] md:w-[340px] ${index === 1 ? 'md:mt-16' : ''} px-3 mb-8`}
                  variants={animations.staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                >
                  <FeatureCard feature={feature} />
                </motion.div>
              ))}
            </div>

            {/* Second row */}
            <div className="flex flex-wrap justify-center">
              {featuresData.slice(3).map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`w-full sm:w-[320px] md:w-[340px] ${index === 1 ? 'md:mt-16' : ''} px-3 mb-8`}
                  variants={animations.staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                >
                  <FeatureCard feature={feature} />
                </motion.div>
              ))}
            </div>

            {/* Connecting elements */}
            {isClient && (
              <div className="absolute inset-0 pointer-events-none opacity-40 hidden md:block">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-indigo-200 rounded-full" style={{ transform: 'translate(-25%, -25%)' }}></div>
                <div className="absolute top-1/3 left-2/3 w-32 h-32 border-2 border-dotted border-purple-200 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
                <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border-2 border-dashed border-indigo-100 rounded-full" style={{ transform: 'translate(25%, 25%)' }}></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tech tracks section */}
        <TechTracksSection />

        {/* Stats section - added proper spacing and id for navigation */}
        <div id="stats" className="mt-20">
          <StatsSection />
        </div>
      </div>
    </section>
  );
}
