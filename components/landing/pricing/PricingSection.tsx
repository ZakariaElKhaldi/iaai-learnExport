"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText } from '@/components/landing/animations';
import { Tooltip, Button, Badge } from '@nextui-org/react';
import { FiCheck, FiX, FiInfo, FiArrowRight } from 'react-icons/fi';

// Define price plan type
interface PricePlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    included: boolean;
    tooltip?: string;
  }[];
  popular: boolean;
  ctaText: string;
  ctaLink: string;
  color: string;
  icon: React.ReactNode;
}

export default function PricingSection() {
  // Toggle between monthly and yearly pricing
  const [isYearly, setIsYearly] = useState(false);
  // Animation state for number counters
  const [animatePrice, setAnimatePrice] = useState(false);
  
  // Trigger price animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatePrice(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('pricing-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  // Enhanced price plans with icons, tooltips, and color themes
  const plans: PricePlan[] = [
    {
      name: "Basic",
      description: "Perfect for individuals just starting their learning journey",
      price: {
        monthly: 29,
        yearly: 290, // ~10 months cost for yearly
      },
      features: [
        { 
          text: "Access to 50+ courses", 
          included: true,
          tooltip: "Includes fundamental courses across multiple tech disciplines"
        },
        { 
          text: "Interactive coding exercises", 
          included: true,
          tooltip: "Hands-on practice with instant feedback"
        },
        { 
          text: "Basic practice projects", 
          included: true,
          tooltip: "Build simple portfolio projects with guided instructions"
        },
        { 
          text: "Community forum access", 
          included: true,
          tooltip: "Connect with fellow learners and get help"
        },
        { 
          text: "1-on-1 Expert consultations", 
          included: false,
          tooltip: "Available with Pro and Enterprise plans"
        },
        { 
          text: "Career coaching sessions", 
          included: false,
          tooltip: "Available with Pro and Enterprise plans"
        },
        { 
          text: "Advanced project reviews", 
          included: false,
          tooltip: "Available with Pro and Enterprise plans"
        },
        { 
          text: "Personalized learning paths", 
          included: false,
          tooltip: "Available with Enterprise plan"
        },
      ],
      popular: false,
      ctaText: "Start Basic Plan",
      ctaLink: "/register?plan=basic",
      color: "blue",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: "Pro",
      description: "Ideal for professionals aiming to advance their career",
      price: {
        monthly: 79,
        yearly: 790, // ~10 months cost for yearly
      },
      features: [
        { 
          text: "Access to all 200+ courses", 
          included: true,
          tooltip: "Full access to our entire course library"
        },
        { 
          text: "Interactive coding exercises", 
          included: true,
          tooltip: "Hands-on practice with instant feedback"
        },
        { 
          text: "Advanced practice projects", 
          included: true,
          tooltip: "Build complex portfolio-ready projects"
        },
        { 
          text: "Community forum access", 
          included: true,
          tooltip: "Premium status in our community forums"
        },
        { 
          text: "3 monthly 1-on-1 consultations", 
          included: true,
          tooltip: "Schedule sessions with experts of your choice"
        },
        { 
          text: "Monthly career coaching", 
          included: true,
          tooltip: "One session per month with a career advisor"
        },
        { 
          text: "Project code reviews", 
          included: true,
          tooltip: "Get professional feedback on your work"
        },
        { 
          text: "Personalized learning paths", 
          included: false,
          tooltip: "Available with Enterprise plan"
        },
      ],
      popular: true,
      ctaText: "Get Pro Access",
      ctaLink: "/register?plan=pro",
      color: "indigo",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: "Enterprise",
      description: "For teams and companies requiring comprehensive solutions",
      price: {
        monthly: 199,
        yearly: 1990, // ~10 months cost for yearly
      },
      features: [
        { 
          text: "Access to all 200+ courses", 
          included: true,
          tooltip: "Full access for all team members"
        },
        { 
          text: "Interactive coding exercises", 
          included: true,
          tooltip: "Enhanced team exercises and challenges"
        },
        { 
          text: "Advanced practice projects", 
          included: true,
          tooltip: "Team collaboration on complex projects"
        },
        { 
          text: "Priority community support", 
          included: true,
          tooltip: "Dedicated community managers for your team"
        },
        { 
          text: "Unlimited 1-on-1 consultations", 
          included: true,
          tooltip: "Book as many expert sessions as needed"
        },
        { 
          text: "Weekly career coaching", 
          included: true,
          tooltip: "Regular career development for team members"
        },
        { 
          text: "Comprehensive code reviews", 
          included: true,
          tooltip: "Detailed reviews with actionable feedback"
        },
        { 
          text: "Custom learning paths", 
          included: true,
          tooltip: "Tailored learning journeys for each team member"
        },
      ],
      popular: false,
      ctaText: "Contact Sales",
      ctaLink: "/contact-sales",
      color: "purple",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Function to animate number counting
  const AnimatedPrice = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!animatePrice) return;
      
      let start = 0;
      const end = parseInt(value.toString());
      const duration = 1500;
      const increment = end / 30;
      
      const timer = setInterval(() => {
        start += increment;
        setCount(Math.min(start, end));
        if (start >= end) clearInterval(timer);
      }, duration / 30);
      
      return () => clearInterval(timer);
    }, [value, animatePrice]);
    
    return <>{Math.round(count)}</>;
  };

  return (
    <section id="pricing-section" className="py-24 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/50 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100/50 rounded-full opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Flexible Pricing
          </div>
          <AnimatedText
            text="Choose the Perfect Plan for Your Goals"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            animationType="fade"
            delay={0.1}
            duration={0.8}
          />
          <p className="text-lg text-gray-600 mb-8">
            Get started with a 7-day free trial. No credit card required. Cancel anytime.
          </p>
          
          {/* Enhanced billing toggle with animations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center mt-12"
          >
            <span className={`mr-3 text-base font-medium ${!isYearly ? 'text-indigo-700' : 'text-gray-500'} transition-colors duration-300`}>
              Monthly
            </span>
            <label htmlFor="billing-toggle" className="relative inline-block w-14 h-7 cursor-pointer group">
              <input 
                id="billing-toggle" 
                type="checkbox" 
                className="sr-only" 
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
              />
              <div className={`w-14 h-7 bg-gradient-to-r ${isYearly ? 'from-indigo-500 to-purple-500' : 'from-gray-300 to-gray-400'} rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-200`}></div>
              <div className={`dot absolute left-1 top-1 w-5 h-5 rounded-full transition-all duration-300 bg-white shadow-md transform ${isYearly ? 'translate-x-7' : ''}`}></div>
            </label>
            <span className={`ml-3 text-base font-medium ${isYearly ? 'text-indigo-700' : 'text-gray-500'} transition-colors duration-300`}>
              Annual
            </span>
            <Badge color="success" variant="flat" className="absolute -right-16 -top-1 animate-pulse">
              Save 20%
            </Badge>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`
                bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300
                ${plan.popular ? `border-2 border-${plan.color}-500 relative md:scale-105 md:-translate-y-1` : 'border border-gray-100'}
                hover:shadow-2xl hover:shadow-${plan.color}-100
              `}
            >
              {plan.popular && (
                <div className={`absolute top-0 right-0 bg-${plan.color}-500 text-white text-xs font-bold px-3 py-1.5 uppercase`}>
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className={`w-12 h-12 rounded-lg bg-${plan.color}-100 text-${plan.color}-600 flex items-center justify-center mb-4`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-1 min-h-[50px]">{plan.description}</p>
                
                <div className="mt-6 mb-8">
                  <div className="flex items-end">
                    <span className={`text-4xl font-bold text-${plan.color}-600`}>$</span>
                    <span className={`text-5xl font-bold text-${plan.color}-600 ml-1`}>
                      {animatePrice ? (
                        <AnimatedPrice value={isYearly ? plan.price.yearly : plan.price.monthly} />
                      ) : (
                        isYearly ? plan.price.yearly : plan.price.monthly
                      )}
                    </span>
                    <span className="text-gray-600 ml-2 mb-1">{isYearly ? '/year' : '/month'}</span>
                  </div>
                  {isYearly && (
                    <div className="text-green-600 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Save ${plan.price.monthly * 12 - plan.price.yearly} annually
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 my-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      {feature.included ? (
                        <div className={`mt-0.5 w-5 h-5 rounded-full bg-${plan.color}-100 text-${plan.color}-600 flex-shrink-0 flex items-center justify-center`}>
                          <FiCheck className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex-shrink-0 flex items-center justify-center">
                          <FiX className="w-3 h-3" />
                        </div>
                      )}
                      <span className={`ml-2 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                      {feature.tooltip && (
                        <Tooltip content={feature.tooltip} placement="right">
                          <button className="ml-1.5 text-gray-400 hover:text-gray-600">
                            <FiInfo className="w-3.5 h-3.5" />
                          </button>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
                
                <Button
                  href={plan.ctaLink}
                  as="a"
                  className={`
                    w-full py-6 rounded-xl font-medium text-md shadow-md
                    ${plan.popular 
                      ? `bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 text-white hover:shadow-lg hover:shadow-${plan.color}-200` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }
                  `}
                  endContent={<FiArrowRight className="ml-1" />}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
              </div>
              
              <dl className="space-y-6">
                {[
                  {
                    question: "Can I switch plans later?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately."
                  },
                  {
                    question: "Is there a free trial available?",
                    answer: "We offer a 7-day free trial on all plans so you can explore our platform before committing."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and various local payment methods depending on your region."
                  },
                  {
                    question: "Can I get a refund if I'm not satisfied?",
                    answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with our service."
                  }
                ].map((faq, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <dt className="flex items-center text-lg font-medium text-gray-900 mb-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 flex items-center justify-center mr-2">
                        <span className="text-sm">Q</span>
                      </div>
                      {faq.question}
                    </dt>
                    <dd className="text-gray-600 ml-7">{faq.answer}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
        
        {/* New CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-10 lg:p-12 text-white relative z-10">
            <div className="absolute top-0 right-0 opacity-10">
              <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.7502 108.5C55.9167 97.5 91.4002 58.4 111 39C130.6 19.6 161.333 12.3333 174.5 11L178 28.5L189 108.5C184.333 125.667 173.5 161.9 168.5 170.5C163.5 179.1 143.5 185.333 134 186C125.6 169.2 104.333 135.167 92 118.5C79.6667 101.833 50.3333 113.333 42.7502 108.5Z" fill="white"/>
              </svg>
            </div>
            
            <div className="max-w-xl relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to accelerate your learning journey?</h3>
              <p className="text-indigo-100 text-lg mb-8">
                Join thousands of successful professionals who have advanced their careers with LearnExpert.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/register"
                  as="a"
                  color="default"
                  className="font-medium bg-white text-indigo-600 shadow-lg shadow-indigo-900/20"
                  size="lg"
                  endContent={<FiArrowRight />}
                >
                  Get Started Now
                </Button>
                <Button
                  href="/demo"
                  as="a"
                  variant="flat"
                  color="default"
                  className="font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  size="lg"
                >
                  Schedule a Demo
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden">
                      <img
                        src={`/assets/avatar-${i}.png`}
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/men/${i+10}.jpg`;
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-indigo-100">Trusted by 50,000+ learners worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 