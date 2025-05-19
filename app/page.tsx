"use client";

import React, { lazy, Suspense } from 'react';
import LandingPageNavBar from '@/components/landing/LandingPageNavBar';
import HeroSection from '@/components/landing/hero/HeroSection';
import Footer from '@/components/landing/Footer';

// Lazy-loaded sections
const FeaturesSection = lazy(() => import('@/components/landing/features/FeaturesSection'));
const LearningHubSection = lazy(() => import('@/components/landing/learning-hub/LearningHubSection'));
const TestimonialsSection = lazy(() => import('@/components/landing/testimonials/TestimonialsSection'));
const PricingSection = lazy(() => import('@/components/landing/pricing/PricingSection'));
const CtaSection = lazy(() => import('@/components/landing/cta/CtaSection'));
const FaqSection = lazy(() => import('@/components/landing/faq/FaqSection'));
const ContactSection = lazy(() => import('@/components/landing/contact/ContactSection'));

export default function LandingPage() {
  // Use a timestamp as a key to force re-rendering
  const timestamp = Date.now();
  
  return (
    <>
      <LandingPageNavBar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <FeaturesSection key={`features-section-${timestamp}`} />
        </Suspense>
        <Suspense fallback={null}>
          <LearningHubSection />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={null}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={null}>
          <CtaSection />
        </Suspense>
        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
