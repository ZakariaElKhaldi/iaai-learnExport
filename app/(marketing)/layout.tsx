import React from 'react';
import LandingPageNavBar from '@/components/landing/LandingPageNavBar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingPageNavBar />
      <main>{children}</main>
      {/* No footer included here, it will be handled separately in the landing pages */}
    </>
  );
} 