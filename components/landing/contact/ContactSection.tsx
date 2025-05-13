"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Textarea, Select, SelectItem, Button, Checkbox } from '@nextui-org/react';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheck, FiAlertCircle, FiClock } from 'react-icons/fi';
import { FaTwitter, FaLinkedinIn, FaGithub, FaYoutube, FaDiscord } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false,
  });
  
  // Form status and errors
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: (e.target as HTMLInputElement).checked 
      }));
    } else {
    setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!formData.subject) {
      errors.subject = "Please select a subject";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // 95% chance of success
      if (Math.random() > 0.05) {
      setFormStatus('success');
        
        // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
            subscribe: false,
        });
        setFormStatus('idle');
      }, 3000);
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };
  
  // Auto-focus on name input on mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);
  
  // Load map
  useEffect(() => {
    // Simulating map load
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Contact information
  const contactInfo = [
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "group-hover:bg-blue-100"
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      info: "support@learnexpert.com",
      link: "mailto:support@learnexpert.com",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "group-hover:bg-purple-100"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Office",
      info: "Office 2ème étage B7, Résidence Génial office, Ave Mohamed Taieb Naciri, Casablanca 20180",
      link: "https://maps.google.com/?q=Avenue+Mohamed+Taieb+Naciri+Casablanca+Morocco",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "group-hover:bg-indigo-100"
    },
  ];
  
  // Social media links
  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter className="w-5 h-5" />, color: 'hover:bg-[#1DA1F2] hover:text-white', url: '#twitter' },
    { name: 'LinkedIn', icon: <FaLinkedinIn className="w-5 h-5" />, color: 'hover:bg-[#0A66C2] hover:text-white', url: '#linkedin' },
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, color: 'hover:bg-[#333333] hover:text-white', url: '#github' },
    { name: 'YouTube', icon: <FaYoutube className="w-5 h-5" />, color: 'hover:bg-[#FF0000] hover:text-white', url: '#youtube' },
    { name: 'Discord', icon: <FaDiscord className="w-5 h-5" />, color: 'hover:bg-[#5865F2] hover:text-white', url: '#discord' }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    idle: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  // Character count percentage for message
  const messageCharCount = formData.message.length;
  const idealMessageLength = 200;
  const messagePercentage = Math.min(100, (messageCharCount / idealMessageLength) * 100);
  
  return (
    <section id="contact" className="py-24 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50 to-white pointer-events-none"></div>
      <div aria-hidden="true" className="absolute -top-40 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
      <div aria-hidden="true" className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            We're here to help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our platform or need personalized assistance? Our team is ready to help you get started on your learning journey.
            </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact form - Now comes first on mobile for better UX */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100 relative"
            >
              {/* Background gradient element */}
              <div aria-hidden="true" className="absolute -top-5 -right-5 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <div aria-hidden="true" className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
              
              {/* Form header */}
              <div className="relative mb-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-2"
                  variants={itemVariants}
                >
                  Send us a message
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  variants={itemVariants}
                >
                  Our team will get back to you within 24 hours
                </motion.p>
            </div>
            
              {/* Success message */}
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-600">
                      <FiCheck className="w-5 h-5" />
              </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-green-800">Message Sent Successfully!</h4>
                      <p className="mt-1 text-sm text-green-700">
                        Thank you for contacting us. We've received your message and will respond shortly.
                      </p>
            </div>
                  </motion.div>
                )}
              </AnimatePresence>
          
              {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                      placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  required
                />
                    {formErrors.name && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                    )}
              </div>
              
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                      placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  required
                />
                    {formErrors.email && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>
              </div>
              
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.subject ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white`}
                  required
                >
                    <option value="" disabled>Select a subject</option>
                  <option value="General Question">General Question</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing Inquiry">Billing Inquiry</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="Career Information">Career Information</option>
                </select>
                  {formErrors.subject && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.subject}</p>
                  )}
              </div>
              
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                    placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  required
                ></textarea>
                  {formErrors.message && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.message}</p>
                  )}
                  
                  {messageCharCount > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <div className="text-gray-500">
                        {messageCharCount} characters
                      </div>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            messageCharCount < 10 
                              ? 'bg-red-400' 
                              : messageCharCount < 50 
                                ? 'bg-yellow-400' 
                                : 'bg-green-400'
                          }`}
                          style={{ width: `${messagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscribe: e.target.checked }))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-600">
                    I'd like to receive updates about new courses and features
                  </label>
              </div>
              
                <button
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full py-4 px-4 flex items-center justify-center text-white font-medium rounded-xl transition-all ${
                    formStatus === 'success' 
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } ${formStatus === 'submitting' || formStatus === 'success' ? 'opacity-90 cursor-not-allowed' : ''}`}
                >
                  {formStatus === 'submitting' && (
                    <span className="mr-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    </span>
                  )}
                  {formStatus === 'success' && (
                    <span className="mr-2">
                      <FiCheck className="w-5 h-5" />
                    </span>
                  )}
                  {!formStatus || formStatus === 'idle' ? (
                    <>
                      <FiSend className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  ) : formStatus === 'submitting' ? (
                    'Sending...'
                  ) : (
                    'Message Sent!'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
          
          {/* Contact Information & Map - Now second on mobile */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 order-1 lg:order-2 space-y-8"
          >
            {/* Contact Information */}
            <motion.div 
              variants={itemVariants} 
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block">
                Contact Information
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 opacity-70 rounded-full"></span>
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 3 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-start group"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${item.color} border border-indigo-100 shadow-sm group-hover:shadow-md ${item.hoverColor} transition-all duration-300`}>
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-700">{item.title}</h4>
                      <a 
                        href={item.link} 
                        className="text-gray-600 hover:text-indigo-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.info}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">Connect with us</span>
                  <div className="h-px flex-grow bg-gradient-to-r from-indigo-200 to-transparent"></div>
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, idx) => (
                    <motion.a 
                      key={idx}
                      href={social.url}
                      aria-label={social.name}
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${social.color} transform hover:scale-110 transition-all duration-300 shadow-sm`}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Interactive Map - Updated location to Casablanca */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-[350px] rounded-2xl overflow-hidden shadow-xl relative"
            >
              {isMapLoaded ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.2059686264687!2d-7.6309256!3d33.5731627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d39a4a7adbe5%3A0x6d66e53c5359edba!2sAve%20Mohamed%20Taieb%20Naciri%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1696254348860!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="border-0 opacity-95"
                  allowFullScreen
                  loading="lazy"
                  title="LearnExpert Office Location in Casablanca"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin mb-3"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 pointer-events-none border border-indigo-200 rounded-2xl"></div>
              
              {/* Map hover overlay with directions link */}
              <div className="absolute inset-0 bg-indigo-900/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <a 
                  href="https://maps.google.com/?q=Avenue+Mohamed+Taieb+Naciri+Casablanca+Morocco" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-lg font-medium flex items-center transform hover:scale-105 transition-transform duration-200"
                >
                  <FiMapPin className="mr-2" />
                  Get Directions
                </a>
              </div>
            </motion.div>
            
            {/* Business Hours */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiClock className="w-5 h-5 mr-2" />
                Business Hours
              </h3>
              
              <div className="space-y-3 font-medium relative z-10">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", active: true },
                  { day: "Saturday", hours: "10:00 AM - 4:00 PM", active: true },
                  { day: "Sunday", hours: "Closed", active: false }
                ].map((schedule, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className={`flex justify-between items-center p-2 rounded-lg ${
                      schedule.active ? 'bg-white/10' : 'opacity-70'
                    }`}
                  >
                    <span>{schedule.day}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      schedule.active 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {schedule.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                <div className="flex items-center text-indigo-100 bg-white/10 p-3 rounded-lg">
                  <svg className="w-5 h-5 mr-2 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    Our support team is available 24/7 via email and chat support.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 