"use client";

import React from 'react';
import LandingPageNavBar from '@/components/landing/LandingPageNavBar';
import HeroSection from '@/components/landing/hero/HeroSection';
import FeaturesSection from '@/components/landing/features/FeaturesSection';
import TestimonialsSection from '@/components/landing/testimonials/TestimonialsSection';
import PricingSection from '@/components/landing/pricing/PricingSection';
import CtaSection from '@/components/landing/cta/CtaSection';
import FaqSection from '@/components/landing/faq/FaqSection';
import ContactSection from '@/components/landing/contact/ContactSection';
import Footer from '@/components/landing/Footer';
import LearningHubSection from '@/components/landing/learning-hub/LearningHubSection';

export default function LandingPage() {
  // Use a timestamp as a key to force re-rendering
  const timestamp = Date.now();
  
  return (
    <>
      <LandingPageNavBar />
      <main>
        <HeroSection />
        <FeaturesSection key={`features-section-${timestamp}`} />
        <LearningHubSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
