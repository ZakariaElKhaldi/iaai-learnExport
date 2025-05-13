"use client";

import React from 'react';
import { MagneticButton } from '@/components/landing/animations';

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Technical Career?
          </h2>
          
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who are advancing their skills, building impressive portfolios, and securing better positions through LearnExpert.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <MagneticButton strength={30} className="inline-block">
              <a href="/register" className="inline-block px-8 py-4 bg-white text-indigo-800 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-300 hover:shadow-xl text-center">
                Start Free Trial
              </a>
            </MagneticButton>
            
            <a href="/schedule-demo" className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white/10 text-center">
              Schedule Demo
            </a>
          </div>
          
          <div className="mt-10 text-indigo-200">
            <p className="mb-4">No credit card required for trial. Cancel anytime.</p>
            
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>7-day trial</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Full platform access</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized demo</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial quote */}
        <div className="mt-16 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <blockquote className="text-white">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-3 text-white/80 text-sm">Over 2,500 5-star reviews</span>
            </div>
            <p className="text-lg italic">
              &ldquo;LearnExpert completely transformed my career trajectory. The practical projects and expert consultations gave me the confidence to apply for roles I previously thought were out of reach. Within 3 months, I secured a position that doubled my previous salary.&rdquo;
            </p>
            <footer className="mt-3 text-white/80">
              <div className="flex items-center">
                <span className="font-medium">Jason Martinez</span>
                <span className="mx-2">•</span>
                <span>Full Stack Developer at FinTech Solutions</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
} 