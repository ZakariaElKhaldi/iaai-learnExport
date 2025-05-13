import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="space-x-4 mb-2">
        {/* Informational Links Placeholder */}
        <Link href="/about" className="hover:underline">About Us</Link>
        <Link href="/contact" className="hover:underline">Contact Support</Link>
        <Link href="/faq" className="hover:underline">FAQ</Link>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      </div>
      {/* Copyright Information */}
      <p>&copy; {new Date().getFullYear()} LearnExpert Connect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
