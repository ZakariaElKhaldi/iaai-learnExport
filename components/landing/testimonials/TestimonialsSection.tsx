"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatedText } from '@/components/landing/animations';

// Define the testimonial type
interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  achievement: string;
}

export default function TestimonialsSection() {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Full Stack Developer",
      company: "TechCorp Inc.",
      image: "/assets/testimonial-1.jpg",
      quote: "The expert-led courses on LearnExpert transformed my coding skills. The interactive projects and personal feedback helped me land my dream job as a full stack developer.",
      rating: 5,
      achievement: "Landed a senior developer position within 6 months"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Data Scientist",
      company: "Analytics Pro",
      image: "/assets/testimonial-2.jpg",
      quote: "The specialized data science track gave me practical experience with real-world datasets. The 1-on-1 consultations with industry experts were invaluable for my career growth.",
      rating: 5,
      achievement: "Increased salary by 35% after certification"
    },
    {
      id: 3,
      name: "Jessica Williams",
      position: "Product Manager",
      company: "InnovateTech",
      image: "/assets/testimonial-3.jpg",
      quote: "As someone transitioning into tech, LearnExpert's structured learning paths and supportive community made all the difference. The mentorship helped me navigate my career change successfully.",
      rating: 5,
      achievement: "Successfully transitioned from marketing to product management"
    },
    {
      id: 4,
      name: "David Rodriguez",
      position: "Cloud Architect",
      company: "CloudSphere Solutions",
      image: "/assets/testimonial-4.jpg",
      quote: "The cloud certification program on LearnExpert is comprehensive and practical. The hands-on labs and expert guidance prepared me for real-world challenges I now face daily.",
      rating: 5,
      achievement: "Implemented enterprise cloud migration for a Fortune 500 company"
    },
  ];

  // State to keep track of the active testimonial
  const [activeIndex, setActiveIndex] = useState(0);

  // Handler for next testimonial
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Handler for previous testimonial
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get current testimonial
  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="What Our Learners Say"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            animationType="fade"
            delay={0.1}
            duration={0.8}
          />
          <p className="text-lg text-gray-600">
            Stories from professionals who transformed their careers with LearnExperts platform.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured testimonial */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-lg p-6 lg:p-0">
            <div className="lg:p-12 order-2 lg:order-1">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-xl font-medium text-gray-800 mb-8 relative">
                <svg className="absolute -top-6 -left-8 w-16 h-16 text-indigo-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="relative">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </div>
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-600">{currentTestimonial.position} at {currentTestimonial.company}</p>
                </div>
              </div>
              
              <div className="mt-6 bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <div className="text-sm font-medium text-indigo-900">Achievement:</div>
                <div className="text-indigo-700">{currentTestimonial.achievement}</div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        idx === activeIndex ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative h-64 lg:h-full order-1 lg:order-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl lg:rounded-none overflow-hidden">
              {/* Stats overlay */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">94%</div>
                  <div className="text-sm text-gray-600">Career Advancement</div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
              
              <div className="h-full w-full overflow-hidden relative">
                <Image
                  src="/assets/success-stories.jpg"
                  alt="Success Stories"
                  fill
                  className="object-cover object-center opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Testimonial logos */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-8">Join thousands of learners from these organizations</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6'].map((company, idx) => (
                <div key={idx} className="h-8">
                  <div className="text-gray-400 font-semibold">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 