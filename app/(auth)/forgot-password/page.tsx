"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Loader2, CheckCircle2, ArrowRight, AlertCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus email input on mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      forgotPasswordSchema.parse({ email });
      
      // Show loading state
      setIsLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API to send a password reset email
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message);
      // }
      
      // Show success state
      setIsSubmitted(true);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        setError(error.errors[0].message);
      } else {
        // Handle API errors
        setError('Failed to send reset email. Please try again.');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {isSubmitted ? (
        <motion.div 
          className="text-center space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900">Check your email</h3>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-blue-800">
            <p className="text-center text-sm">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Please check your inbox and follow the instructions to reset your password.
            If you don't see the email, check your spam folder.
          </p>
          <div className="pt-4">
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Return to login
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {error && (
            <motion.div 
              className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            variants={itemVariants}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className={`relative rounded-md shadow-sm ${error ? 'shadow-red-100' : ''}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailInputRef}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-3 py-2.5 border ${error ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="name@example.com"
                  disabled={isLoading}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? "email-error" : undefined}
                />
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </motion.div>
          </motion.form>
        </>
      )}
    </motion.div>
  );
} 