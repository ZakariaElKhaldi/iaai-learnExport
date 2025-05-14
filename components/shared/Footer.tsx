"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:underline hover:text-foreground transition-colors">About Us</Link>
          <Link href="/contact" className="hover:underline hover:text-foreground transition-colors">Contact Support</Link>
          <Link href="/faq" className="hover:underline hover:text-foreground transition-colors">FAQ</Link>
          <Link href="/terms" className="hover:underline hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:underline hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LearnExpert Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
