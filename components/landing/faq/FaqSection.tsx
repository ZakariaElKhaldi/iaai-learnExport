"use client";

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

export default function FaqSection() {
  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // State to track active category
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Toggle function for opening/closing FAQs
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // FAQs data
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
    },
    {
      question: "How much does LearnExpert cost?",
      answer: (
        <>
          <p>LearnExpert offers several subscription plans to meet different needs:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Basic Plan:</strong> $29/month or $290/year (save 20%)</li>
            <li><strong>Pro Plan:</strong> $79/month or $790/year (save 20%)</li>
            <li><strong>Enterprise Plan:</strong> $199/month or $1,990/year (save 20%)</li>
          </ul>
          <p className="mt-2">All plans include a 7-day free trial with no credit card required. You can cancel at any time.</p>
        </>
      ),
      category: 'pricing',
    },
    {
      question: "What skills can I learn on LearnExpert?",
      answer: (
        <>
          <p>LearnExpert offers courses across a wide range of technical disciplines, including:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Software Development</li>
              <li>Data Science & Analytics</li>
              <li>DevOps & Cloud Computing</li>
              <li>Cybersecurity</li>
            </ul>
            <ul className="list-disc pl-5 space-y-1">
              <li>Artificial Intelligence/ML</li>
              <li>UX/UI Design</li>
              <li>Blockchain & Web3</li>
              <li>Technical Leadership</li>
            </ul>
          </div>
          <p className="mt-2">Each course is designed with practical applications in mind, focusing on skills that are in high demand in the job market.</p>
        </>
      ),
      category: 'courses',
    },
    {
      question: "How do the consultation sessions work?",
      answer: (
        <p>Consultation sessions are one-on-one video calls with industry experts who can provide personalized guidance, code reviews, career advice, or help with specific technical challenges. The number of sessions available depends on your subscription plan. You can book sessions through our platform, selecting a time slot that works for you from the expert&apos;s availability calendar. Each session typically lasts 30-60 minutes and can be focused on whatever technical or career challenge you&apos;re facing.</p>
      ),
      category: 'consultations',
    },
    {
      question: "Are there any certificates upon course completion?",
      answer: (
        <p>Yes, LearnExpert provides certificates of completion for all courses. These certificates can be added to your LinkedIn profile or résumé to demonstrate your skills to potential employers. For certain specialized tracks, we also offer industry-recognized certifications that require passing a comprehensive assessment. These certifications carry more weight in the job market and validate your expertise in specific domains.</p>
      ),
      category: 'courses',
    },
    {
      question: "Can I access the content offline?",
      answer: (
        <p>Yes, our mobile app allows you to download courses for offline viewing. This feature is available on all subscription plans and makes it convenient to learn on-the-go, even without an internet connection. Please note that interactive exercises, community features, and consultation sessions require an online connection.</p>
      ),
      category: 'platform',
    },
    {
      question: "How does the enterprise plan work for teams?",
      answer: (
        <p>Our Enterprise plan is designed for teams and organizations. It includes all features of the Pro plan, plus: centralized billing, team management dashboard, progress tracking for team members, custom learning paths aligned with your organization&apos;s goals, and priority support. You can add team members as needed and assign specific courses or learning tracks to align with your organization&apos;s skill development needs. Contact our sales team for custom pricing based on team size.</p>
      ),
      category: 'pricing',
    },
    {
      question: "What is your refund policy?",
      answer: (
        <p>We offer a 30-day money-back guarantee on all subscription plans. If you&apos;re not satisfied with LearnExpert for any reason, you can request a full refund within the first 30 days of your paid subscription. Simply contact our support team, and we&apos;ll process your refund with no questions asked. After the 30-day period, you can still cancel your subscription at any time to prevent future billing, but previous charges won&apos;t be refunded.</p>
      ),
      category: 'pricing',
    },
  ];
  
  // Get categories for filter tabs
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about LearnExpert.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm bg-white p-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQs accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border-b border-gray-200 ${idx === filteredFaqs.length - 1 ? 'border-b-0' : ''}`}
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact support */}
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Still have questions? We&apos;re here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center mt-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Support
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 