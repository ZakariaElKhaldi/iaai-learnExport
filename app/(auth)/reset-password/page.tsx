"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Check, X, CheckCircle2, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

// Form validation schema
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(
      (password) => /[A-Z]/.test(password),
      { message: "Password must contain at least one uppercase letter" }
    )
    .refine(
      (password) => /[0-9]/.test(password),
      { message: "Password must contain at least one number" }
    )
    .refine(
      (password) => /[^A-Za-z0-9]/.test(password),
      { message: "Password must contain at least one special character" }
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenError, setTokenError] = useState('');
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Get token from URL
  const token = searchParams.get('token');
  
  useEffect(() => {
    // In a real app, you would verify the token with your backend
    // For demo purposes, we'll simulate token validation
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        setTokenError('Missing reset token. Please request a new password reset link.');
        return;
      }

      try {
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, we'll consider any token valid except "invalid"
        if (token === 'invalid') {
          throw new Error('Invalid or expired token');
        }
        
        setTokenValid(true);
        
        // Focus password input after token validation
        setTimeout(() => {
          if (passwordInputRef.current) {
            passwordInputRef.current.focus();
          }
        }, 100);
      } catch (error) {
        setTokenValid(false);
        setTokenError('Your password reset link is invalid or has expired. Please request a new one.');
      }
    };

    validateToken();
  }, [token]);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const passwordStrength = getPasswordStrength(formData.password);
  
  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };
  
  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'bg-gray-200';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      resetPasswordSchema.parse(formData);
      
      // Show loading state
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your API to reset the password
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token,
      //     password: formData.password,
      //   }),
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
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle API errors
        setErrors({ form: 'Failed to reset password. Please try again.' });
      }
    }
  };

  // Animation variants
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

  // Show loading state while validating token
  if (tokenValid === null) {
    return (
      <div className="flex flex-col justify-center items-center py-8 space-y-4">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        <span className="text-gray-600 font-medium">Verifying your reset link...</span>
      </div>
    );
  }

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <motion.div 
        className="space-y-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <X className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-xl font-medium text-gray-900">Invalid Reset Link</h3>
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <p className="text-red-800">{tokenError}</p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => router.push('/forgot-password')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Request a new reset link
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  }

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
          <h3 className="text-xl font-medium text-gray-900">Password reset successful</h3>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-center text-green-800">
              Your password has been reset successfully.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            You can now log in with your new password.
          </p>
          <div className="pt-4">
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Go to login
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Error message */}
          {errors.form && (
            <motion.div 
              className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{errors.form}</span>
            </motion.div>
          )}
          
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Please enter your new password below.
            </p>
          </motion.div>
          
          {/* Reset password form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            variants={itemVariants}
          >
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New password
              </label>
              <div className={`relative rounded-md shadow-sm ${errors.password ? 'shadow-red-100' : ''}`}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  ref={passwordInputRef}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 border ${errors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center" id="password-error">
                  <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                  {errors.password}
                </p>
              )}
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500">Password strength:</div>
                    <div className={`text-xs font-medium ${
                      passwordStrength === 1 ? 'text-red-500' : 
                      passwordStrength === 2 ? 'text-yellow-500' : 
                      passwordStrength === 3 ? 'text-blue-500' : 
                      passwordStrength === 4 ? 'text-green-500' : ''
                    }`}>
                      {getStrengthLabel(passwordStrength)}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-300 ease-in-out`} 
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Password requirements */}
                  <ul className="mt-3 space-y-1.5 text-xs text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
                    <li className="flex items-center">
                      {/[A-Z]/.test(formData.password) ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      {/[0-9]/.test(formData.password) ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      At least one number
                    </li>
                    <li className="flex items-center">
                      {/[^A-Za-z0-9]/.test(formData.password) ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      At least one special character
                    </li>
                    <li className="flex items-center">
                      {formData.password.length >= 8 ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      Minimum 8 characters
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm new password
              </label>
              <div className={`relative rounded-md shadow-sm ${errors.confirmPassword ? 'shadow-red-100' : ''}`}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 border ${errors.confirmPassword ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center" id="confirm-password-error">
                  <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                  {errors.confirmPassword}
                </p>
              )}
              
              {/* Password match indicator */}
              {formData.confirmPassword && formData.password && (
                <p className={`mt-1.5 text-xs flex items-center ${formData.confirmPassword === formData.password ? 'text-green-600' : 'text-gray-500'}`}>
                  {formData.confirmPassword === formData.password ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                      Passwords must match
                    </>
                  )}
                </p>
              )}
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
                    Resetting password...
                  </>
                ) : (
                  'Reset password'
                )}
              </button>
            </motion.div>
          </motion.form>
        </>
      )}
    </motion.div>
  );
} 