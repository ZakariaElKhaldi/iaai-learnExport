"use client";

import React, { useState } from 'react';
import { AnimatedText } from '@/components/landing/animations';

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
  }[];
  popular: boolean;
  ctaText: string;
  ctaLink: string;
}

export default function PricingSection() {
  // Toggle between monthly and yearly pricing
  const [isYearly, setIsYearly] = useState(false);
  
  // Price plans
  const plans: PricePlan[] = [
    {
      name: "Basic",
      description: "Perfect for individuals just starting their learning journey",
      price: {
        monthly: 29,
        yearly: 290, // ~10 months cost for yearly
      },
      features: [
        { text: "Access to 50+ courses", included: true },
        { text: "Interactive coding exercises", included: true },
        { text: "Basic practice projects", included: true },
        { text: "Community forum access", included: true },
        { text: "1-on-1 Expert consultations", included: false },
        { text: "Career coaching sessions", included: false },
        { text: "Advanced project reviews", included: false },
        { text: "Personalized learning paths", included: false },
      ],
      popular: false,
      ctaText: "Start Basic Plan",
      ctaLink: "/register?plan=basic",
    },
    {
      name: "Pro",
      description: "Ideal for professionals aiming to advance their career",
      price: {
        monthly: 79,
        yearly: 790, // ~10 months cost for yearly
      },
      features: [
        { text: "Access to all 200+ courses", included: true },
        { text: "Interactive coding exercises", included: true },
        { text: "Advanced practice projects", included: true },
        { text: "Community forum access", included: true },
        { text: "3 monthly 1-on-1 consultations", included: true },
        { text: "Monthly career coaching", included: true },
        { text: "Project code reviews", included: true },
        { text: "Personalized learning paths", included: false },
      ],
      popular: true,
      ctaText: "Get Pro Access",
      ctaLink: "/register?plan=pro",
    },
    {
      name: "Enterprise",
      description: "For teams and companies requiring comprehensive solutions",
      price: {
        monthly: 199,
        yearly: 1990, // ~10 months cost for yearly
      },
      features: [
        { text: "Access to all 200+ courses", included: true },
        { text: "Interactive coding exercises", included: true },
        { text: "Advanced practice projects", included: true },
        { text: "Priority community support", included: true },
        { text: "Unlimited 1-on-1 consultations", included: true },
        { text: "Weekly career coaching", included: true },
        { text: "Comprehensive code reviews", included: true },
        { text: "Custom learning paths", included: true },
      ],
      popular: false,
      ctaText: "Contact Sales",
      ctaLink: "/contact-sales",
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="Flexible Plans for Your Learning Journey"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            animationType="fade"
            delay={0.1}
            duration={0.8}
          />
          <p className="text-lg text-gray-600 mb-8">
            Choose the plan that fits your goals and take your skills to the next level.
          </p>
          
          {/* Billing toggle */}
          <div className="relative flex items-center justify-center mt-12">
            <span className={`mr-3 text-base ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
            <label htmlFor="billing-toggle" className="relative inline-block w-14 h-7 cursor-pointer">
              <input 
                id="billing-toggle" 
                type="checkbox" 
                className="sr-only" 
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
              />
              <div className={`w-14 h-7 bg-gray-200 rounded-full transition ${isYearly ? 'bg-indigo-600' : ''}`}></div>
              <div className={`dot absolute left-1 top-1 w-5 h-5 rounded-full transition-all bg-white transform ${isYearly ? 'translate-x-7' : ''}`}></div>
            </label>
            <span className={`ml-3 text-base ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Annual</span>
            <span className="absolute -right-12 -top-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">20% off</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`
                bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300
                ${plan.popular ? 'border-2 border-indigo-500 relative md:scale-105 md:-translate-y-1' : 'border border-gray-100'}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-1 min-h-[50px]">{plan.description}</p>
                
                <div className="mt-6 mb-8">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                    <span className="text-gray-600 ml-2 mb-1">{isYearly ? '/year' : '/month'}</span>
                  </div>
                  {isYearly && (
                    <div className="text-green-600 text-sm mt-1">
                      Save ${plan.price.monthly * 12 - plan.price.yearly} annually
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 my-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <svg 
                        className={`mt-1.5 mr-2 w-4 h-4 flex-shrink-0 ${feature.included ? 'text-indigo-600' : 'text-gray-400'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        {feature.included ? (
                          <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        ) : (
                          <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                        )}
                      </svg>
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <a 
                    href={plan.ctaLink} 
                    className={`
                      block text-center py-3 px-6 rounded-lg font-medium transition-all
                      ${plan.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }
                    `}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              
              <dl className="space-y-6">
                <div>
                  <dt className="text-lg font-medium text-gray-900 mb-2">Can I switch plans later?</dt>
                  <dd className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately.</dd>
                </div>
                
                <div>
                  <dt className="text-lg font-medium text-gray-900 mb-2">Is there a free trial available?</dt>
                  <dd className="text-gray-600">We offer a 7-day free trial on all plans so you can explore our platform before committing.</dd>
                </div>
                
                <div>
                  <dt className="text-lg font-medium text-gray-900 mb-2">What payment methods do you accept?</dt>
                  <dd className="text-gray-600">We accept all major credit cards, PayPal, and various local payment methods depending on your region.</dd>
                </div>
                
                <div>
                  <dt className="text-lg font-medium text-gray-900 mb-2">Can I get a refund if I&apos;m not satisfied?</dt>
                  <dd className="text-gray-600">We offer a 30-day money-back guarantee if you&apos;re not completely satisfied with our service.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 