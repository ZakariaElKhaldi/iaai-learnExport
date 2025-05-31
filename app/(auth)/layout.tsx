"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine which auth page we're on
  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  const isForgotPasswordPage = pathname === '/forgot-password';
  const isResetPasswordPage = pathname === '/reset-password';
  
  // Set the title based on the current page
  const getPageTitle = () => {
    if (isLoginPage) return 'Welcome back';
    if (isRegisterPage) return 'Create your account';
    if (isForgotPasswordPage) return 'Forgot your password?';
    if (isResetPasswordPage) return 'Reset your password';
    return 'Authentication';
  };

  // Subtle background animation
  const backgroundVariants = {
    initial: { backgroundPosition: '0% 0%' },
    animate: { 
      backgroundPosition: '100% 100%',
      transition: { 
        duration: 30, 
        ease: "linear", 
        repeat: Infinity, 
        repeatType: "reverse" as const
      } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Branding with animation */}
      <motion.div 
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 flex-col justify-between relative overflow-hidden"
        initial="initial"
        animate="animate"
        variants={backgroundVariants}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">IAAI Learning Platform</h1>
          <p className="mt-2 text-blue-100">Expand your knowledge and skills with our comprehensive learning resources.</p>
        </div>
        
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute top-[50%] left-[5%] w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-[10%] right-[20%] w-52 h-52 rounded-full bg-white"></div>
        </div>
        
        <div className="relative z-10">
          <div className="bg-blue-700/30 backdrop-blur-sm p-6 rounded-lg border border-blue-400/20">
            <blockquote className="text-xl italic">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </blockquote>
            <p className="mt-4 font-semibold">— Malcolm X</p>
          </div>
        </div>
        
        <div className="text-sm relative z-10">
          <p>© {new Date().getFullYear()} IAAI Learning. All rights reserved.</p>
          <div className="flex mt-2 space-x-4">
            <Link href="/terms" className="text-blue-100 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </motion.div>
      
      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 bg-white">
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="flex justify-center md:hidden mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white h-14 w-14 rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
                IAAI
              </div>
            </div>
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {getPageTitle()}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {isLoginPage && (
                <p className="mt-2 text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Sign up
                  </Link>
                </p>
              )}
              {isRegisterPage && (
                <p className="mt-2 text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Sign in
                  </Link>
                </p>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {children}
          </motion.div>
          
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {isLoginPage && (
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot your password?
              </Link>
            )}
            {(isForgotPasswordPage || isResetPasswordPage) && (
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Back to login
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
