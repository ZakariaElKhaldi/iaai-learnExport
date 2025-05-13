"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Chip, Button, Tooltip } from '@nextui-org/react';
import { FiSearch, FiHelpCircle, FiMessageCircle, FiArrowRight, FiCheck } from 'react-icons/fi';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
  category: string;
  tags?: string[];
}

export default function FaqSection() {
  // State for active FAQs and filtering
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FaqItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Toggle function for FAQs
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Enhanced FAQs data with tags for search
  const faqs: FaqItem[] = [
    {
      question: "What is LearnExpert and how does it work?",
      answer: (
        <>
          <p>LearnExpert is a comprehensive learning platform designed for technical professionals looking to advance their careers. Our platform offers:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Expert-led video courses with hands-on projects</li>
            <li>1-on-1 consultations with industry professionals</li>
            <li>Interactive coding exercises and challenges</li>
            <li>Career guidance and professional development resources</li>
            <li>An active community of learners and experts</li>
          </ul>
          <p className="mt-2">You can access all features through our web platform or mobile app, learn at your own pace, and track your progress over time.</p>
        </>
      ),
      category: 'platform',
      tags: ['about', 'getting started', 'features', 'platform overview']
    },
    {
      question: "How much does LearnExpert cost?",
      answer: (
        <>
          <p>LearnExpert offers several subscription plans to meet different needs:</p>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-blue-700">Basic Plan</span>
                  <p className="text-sm text-blue-600">Perfect for beginners and casual learners</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-700">$29<span className="text-sm font-normal">/month</span></div>
                  <div className="text-xs text-blue-500">or $290/year (save 20%)</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-purple-700">Pro Plan</span>
                  <p className="text-sm text-purple-600">For serious career advancement</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-700">$79<span className="text-sm font-normal">/month</span></div>
                  <div className="text-xs text-purple-500">or $790/year (save 20%)</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-indigo-700">Enterprise Plan</span>
                  <p className="text-sm text-indigo-600">For teams and organizations</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-700">$199<span className="text-sm font-normal">/month</span></div>
                  <div className="text-xs text-indigo-500">or $1,990/year (save 20%)</div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 flex items-center text-green-600">
            <FiCheck className="mr-1" /> All plans include a 7-day free trial with no credit card required. You can cancel at any time.
          </p>
        </>
      ),
      category: 'pricing',
      tags: ['pricing', 'cost', 'subscription', 'plans', 'free trial']
    },
    {
      question: "What skills can I learn on LearnExpert?",
      answer: (
        <>
          <p>LearnExpert offers courses across a wide range of technical disciplines, including:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
            <div className="space-y-2">
              <div className="flex items-center px-3 py-2 bg-blue-50 rounded-md border border-blue-100">
                <span className="text-xl mr-2">💻</span>
                <span className="text-blue-700">Software Development</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-purple-50 rounded-md border border-purple-100">
                <span className="text-xl mr-2">📊</span>
                <span className="text-purple-700">Data Science & Analytics</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-green-50 rounded-md border border-green-100">
                <span className="text-xl mr-2">☁️</span>
                <span className="text-green-700">DevOps & Cloud Computing</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-red-50 rounded-md border border-red-100">
                <span className="text-xl mr-2">🔒</span>
                <span className="text-red-700">Cybersecurity</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center px-3 py-2 bg-yellow-50 rounded-md border border-yellow-100">
                <span className="text-xl mr-2">🧠</span>
                <span className="text-yellow-700">Artificial Intelligence/ML</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-pink-50 rounded-md border border-pink-100">
                <span className="text-xl mr-2">🎨</span>
                <span className="text-pink-700">UX/UI Design</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-indigo-50 rounded-md border border-indigo-100">
                <span className="text-xl mr-2">⛓️</span>
                <span className="text-indigo-700">Blockchain & Web3</span>
              </div>
              <div className="flex items-center px-3 py-2 bg-teal-50 rounded-md border border-teal-100">
                <span className="text-xl mr-2">👥</span>
                <span className="text-teal-700">Technical Leadership</span>
              </div>
            </div>
          </div>
          <p className="mt-3">Each course is designed with practical applications in mind, focusing on skills that are in high demand in the job market.</p>
        </>
      ),
      category: 'courses',
      tags: ['courses', 'skills', 'learning', 'topics', 'curriculum']
    },
    {
      question: "How do the consultation sessions work?",
      answer: (
        <div>
          <p>Consultation sessions are one-on-one video calls with industry experts who can provide personalized guidance, code reviews, career advice, or help with specific technical challenges.</p>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 mb-2">How our consultation process works:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-indigo-700">
              <li>Choose an expert based on their specialty and reviews</li>
              <li>Select an available time slot from their calendar</li>
              <li>Provide details about what you'd like to discuss</li>
              <li>Join the video call at the scheduled time</li>
              <li>Follow up with the expert through our messaging system</li>
            </ol>
          </div>
          
          <p className="mt-4">The number of sessions available depends on your subscription plan. Each session typically lasts 30-60 minutes and can be focused on whatever technical or career challenge you're facing.</p>
        </div>
      ),
      category: 'consultations',
      tags: ['consultations', 'mentoring', 'expert sessions', 'one-on-one', 'guidance']
    },
    {
      question: "Are there any certificates upon course completion?",
      answer: (
        <div>
          <p>Yes, LearnExpert provides certificates of completion for all courses. These certificates can be added to your LinkedIn profile or résumé to demonstrate your skills to potential employers.</p>
          
          <div className="mt-4 flex items-start space-x-4">
            <div className="flex-1 p-3 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-700 mb-1">Course Completion Certificates</h4>
              <p className="text-sm text-green-600">Available for all courses</p>
              <p className="text-sm text-green-600 mt-1">Perfect for showcasing your continuous learning</p>
            </div>
            
            <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-700 mb-1">Industry-Recognized Certifications</h4>
              <p className="text-sm text-blue-600">Requires passing comprehensive assessments</p>
              <p className="text-sm text-blue-600 mt-1">Validates expertise in specific domains</p>
            </div>
          </div>
          
          <p className="mt-4">Our industry-recognized certifications carry more weight in the job market and demonstrate your mastery of specific technologies and practices.</p>
        </div>
      ),
      category: 'courses',
      tags: ['certificates', 'certification', 'credentials', 'recognition', 'completion']
    },
    {
      question: "Can I access the content offline?",
      answer: (
        <div>
          <p>Yes, our mobile app allows you to download courses for offline viewing. This feature is available on all subscription plans and makes it convenient to learn on-the-go, even without an internet connection.</p>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
            <p className="text-yellow-700 flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Please note that interactive exercises, community features, and consultation sessions require an online connection.</span>
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">Available on iOS & Android</span>
            </div>
            <Button color="primary" variant="flat" size="sm" radius="full">
              Download App
            </Button>
          </div>
        </div>
      ),
      category: 'platform',
      tags: ['offline', 'mobile app', 'download', 'accessibility', 'on the go']
    },
    {
      question: "How does the enterprise plan work for teams?",
      answer: (
        <div>
          <p>Our Enterprise plan is designed for teams and organizations. It includes all features of the Pro plan, plus:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-indigo-700">Centralized billing</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-indigo-700">Team management dashboard</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-indigo-700">Progress tracking for team members</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-indigo-700">Custom learning paths</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-indigo-700">Priority support</span>
              </div>
            </div>
          </div>
          
          <p className="mt-4">You can add team members as needed and assign specific courses or learning tracks to align with your organization's skill development needs. Contact our sales team for custom pricing based on team size.</p>
          
          <div className="mt-4 flex justify-center">
            <Button color="primary" endContent={<FiArrowRight />}>
              Contact Sales for Custom Pricing
            </Button>
          </div>
        </div>
      ),
      category: 'pricing',
      tags: ['enterprise', 'teams', 'organizations', 'team management', 'business']
    },
    {
      question: "What is your refund policy?",
      answer: (
        <div>
          <div className="flex items-start mb-4">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">30-Day Money-Back Guarantee</h4>
              <p className="text-gray-600">We offer a 30-day money-back guarantee on all subscription plans. If you're not satisfied with LearnExpert for any reason, you can request a full refund within the first 30 days of your paid subscription.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">How to Request a Refund</h4>
              <p className="text-gray-600">Simply contact our support team, and we'll process your refund with no questions asked. After the 30-day period, you can still cancel your subscription at any time to prevent future billing, but previous charges won't be refunded.</p>
            </div>
          </div>
        </div>
      ),
      category: 'pricing',
      tags: ['refund', 'money-back', 'guarantee', 'cancellation', 'policy']
    },
  ];
  
  // Filter FAQs based on search and category
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    
    const results = faqs.filter(faq => {
      const questionMatch = faq.question.toLowerCase().includes(query);
      const categoryMatch = faq.category.toLowerCase().includes(query);
      const tagsMatch = faq.tags ? faq.tags.some(tag => tag.toLowerCase().includes(query)) : false;
      
      return questionMatch || categoryMatch || tagsMatch;
    });
    
    setSearchResults(results);
  }, [searchQuery]);
  
  // Get categories for filter tabs
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs based on active category
  const categorizedFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  const displayedFaqs = isSearching ? searchResults : categorizedFaqs;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/40 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/40 rounded-full opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Support & Help
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about LearnExpert's platform, pricing, and features.
          </p>
        </motion.div>
        
        {/* Search bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <Input
            classNames={{
              base: "mb-6",
              inputWrapper: "shadow-md bg-white/80 backdrop-blur-sm"
            }}
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<FiSearch className="text-gray-400" />}
            endContent={
              searchQuery && (
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchQuery('')}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )
            }
            size="lg"
            radius="lg"
          />
        </motion.div>
        
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              {searchResults.length === 0 
                ? `No results found for "${searchQuery}". Try a different search term.` 
                : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`}
            </p>
            {searchResults.length === 0 && (
              <Button 
                color="primary" 
                variant="flat" 
                startContent={<FiMessageCircle />}
                className="mt-4"
              >
                Ask Our Support Team
              </Button>
            )}
          </motion.div>
        )}
        
        {!isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <Chip
              variant={activeCategory === 'all' ? 'solid' : 'bordered'}
              color={activeCategory === 'all' ? 'primary' : 'default'}
              className="cursor-pointer text-sm capitalize"
              onClick={() => setActiveCategory('all')}
            >
              All Questions
            </Chip>
            
            {categories.map((category, idx) => (
              <Chip
                key={idx}
                variant={activeCategory === category ? 'solid' : 'bordered'}
                color={activeCategory === category ? 'primary' : 'default'}
                className="cursor-pointer text-sm capitalize"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Chip>
            ))}
          </motion.div>
        )}
        
        {/* FAQs accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {displayedFaqs.length === 0 && !isSearching ? (
              <div className="p-10 text-center">
                <FiHelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-500">Try selecting a different category</p>
              </div>
            ) : (
              displayedFaqs.map((faq, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className={`border-b border-gray-200 ${idx === displayedFaqs.length - 1 ? 'border-b-0' : ''}`}
                >
                  <button
                    className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none group"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 bg-gradient-to-b from-indigo-50/30 to-transparent">
                          {faq.answer}
                          
                          {/* Tags for each FAQ */}
                          {faq.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIdx) => (
                                <Chip 
                                  key={tagIdx} 
                                  size="sm" 
                                  variant="flat" 
                                  color="default"
                                  className="capitalize text-xs"
                                >
                                  {tag}
                                </Chip>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
          
          {/* Contact support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-100/50"
          >
            <FiMessageCircle className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Our support team is here to help you with any questions or concerns you may have about LearnExpert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                as="a"
                href="/contact" 
                color="primary"
                className="font-medium"
                endContent={<FiArrowRight />}
                size="lg"
              >
                Contact Support
              </Button>
              <Tooltip content="Get an instant response from our help center">
                <Button 
                  as="a"
                  href="/help" 
                  variant="bordered"
                  color="secondary"
                  className="font-medium"
                  endContent={<FiHelpCircle />}
                  size="lg"
                >
                  Browse Help Center
                </Button>
              </Tooltip>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 