"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Check, X, AlertCircle, UserPlus, Mail, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Form validation schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
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
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  
  // Steps configuration
  const steps = [
    { title: "Account", description: "Your basic info" },
    { title: "Security", description: "Set your password" },
    { title: "Confirm", description: "Review and submit" }
  ];

  // Focus first input of current step
  useEffect(() => {
    if (currentStep === 0 && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (currentStep === 1 && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [currentStep]);

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Reset form status
    if (formStatus !== 'idle') {
      setFormStatus('idle');
    }
  };

  const validateCurrentStep = () => {
    try {
      if (currentStep === 0) {
        // Validate name and email
        const { name, email } = formData;
        const result = z.object({
          name: z.string().min(2, { message: "Name must be at least 2 characters" }),
          email: z.string().email({ message: "Please enter a valid email address" }),
        }).parse({ name, email });
        return { valid: true, errors: {} };
      } else if (currentStep === 1) {
        // Validate password and confirmPassword
        const { password, confirmPassword } = formData;
        const result = z.object({
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
        }).parse({ password, confirmPassword });
        return { valid: true, errors: {} };
      }
      return { valid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        return { valid: false, errors: fieldErrors };
      }
      return { valid: false, errors: { form: 'Validation failed' } };
    }
  };

  const handleNextStep = () => {
    const validation = validateCurrentStep();
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      registerSchema.parse(formData);
      
      // Show loading state
      setIsLoading(true);
      setFormStatus('idle');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would register the user with your backend here
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message);
      // }
      
      // Show success state
      setFormStatus('success');
      
      // Delay redirect to show success state
      setTimeout(() => {
        // Redirect to login page on success
        router.push('/login');
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      setFormStatus('error');
      
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
        setErrors({ form: 'Registration failed. Please try again.' });
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Status message */}
      {formStatus === 'success' && (
        <motion.div 
          className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Account created successfully! Redirecting to login...</span>
        </motion.div>
      )}
      
      {/* Error message */}
      {formStatus === 'error' && errors.form && (
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
        className="text-center mb-2"
        variants={itemVariants}
      >
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </motion.div>
      
      {/* Progress steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === index 
                    ? 'bg-blue-600 text-white' 
                    : currentStep > index 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > index ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div className="text-xs mt-1 font-medium text-gray-700">{step.title}</div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Registration form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-5"
        variants={itemVariants}
      >
        <AnimatePresence mode="wait" custom={currentStep}>
          {currentStep === 0 && (
            <motion.div
              key="step1"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.name ? 'shadow-red-100' : ''}`}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    ref={nameInputRef}
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border ${errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="John Doe"
                    disabled={isLoading}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center" id="name-error">
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    {errors.name}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.email ? 'shadow-red-100' : ''}`}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    ref={emailInputRef}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 border ${errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="name@example.com"
                    disabled={isLoading}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center" id="email-error">
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    {errors.email}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step2"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm password
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
              </motion.div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Account Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Name:</div>
                  <div className="font-medium">{formData.name}</div>
                  <div className="text-gray-500">Email:</div>
                  <div className="font-medium">{formData.email}</div>
                </div>
              </div>

              <motion.div variants={itemVariants} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors ${errors.acceptTerms ? 'border-red-300' : ''}`}
                    disabled={isLoading}
                    aria-invalid={errors.acceptTerms ? 'true' : 'false'}
                    aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center" id="terms-error">
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0 || isLoading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !formData.acceptTerms}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
} 