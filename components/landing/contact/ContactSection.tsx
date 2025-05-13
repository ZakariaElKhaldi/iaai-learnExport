"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input, Textarea, Select, SelectItem, Button, Tooltip, Checkbox } from '@nextui-org/react';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';
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
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      info: "support@learnexpert.com",
      link: "mailto:support@learnexpert.com",
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Office",
      info: "123 Innovation Way, Tech City, CA 94103",
      link: "https://maps.google.com/?q=123+Innovation+Way,+Tech+City,+CA+94103",
    },
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
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
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-start group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-100 shadow-sm group-hover:shadow-md group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300">
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
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect with us</h4>
                <div className="flex space-x-3">
                  {[
                    { name: 'Twitter', icon: <FaTwitter className="w-5 h-5" />, color: 'hover:bg-[#1DA1F2] hover:text-white' },
                    { name: 'LinkedIn', icon: <FaLinkedinIn className="w-5 h-5" />, color: 'hover:bg-[#0A66C2] hover:text-white' },
                    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, color: 'hover:bg-[#333333] hover:text-white' },
                    { name: 'YouTube', icon: <FaYoutube className="w-5 h-5" />, color: 'hover:bg-[#FF0000] hover:text-white' },
                    { name: 'Discord', icon: <FaDiscord className="w-5 h-5" />, color: 'hover:bg-[#5865F2] hover:text-white' },
                  ].map((social, idx) => (
                    <Tooltip key={idx} content={social.name} placement="bottom">
                      <a 
                        href="#" 
                        aria-label={social.name}
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${social.color} transform hover:scale-110 transition-all duration-300 shadow-sm`}
                      >
                        {social.icon}
                      </a>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Interactive Map */}
            <motion.div 
              variants={itemVariants}
              className="h-80 rounded-2xl overflow-hidden shadow-xl relative"
            >
              {isMapLoaded ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6305.675511532213!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1631547639908!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="border-0 opacity-95"
                  allowFullScreen
                  loading="lazy"
                  title="LearnExpert Office Location"
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
            </motion.div>
            
            {/* Business Hours */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Business Hours
              </h3>
              
              <div className="space-y-2 font-medium">
                <div className="flex justify-between items-center">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center opacity-70">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-indigo-100">
                  Our support team is available 24/7 via email and chat support.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div 
            className="lg:col-span-3"
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
              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
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
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      isRequired
                      isInvalid={!!formErrors.name}
                      errorMessage={formErrors.name}
                      variant="bordered"
                      classNames={{
                        inputWrapper: "bg-white/50 backdrop-blur-sm",
                      }}
                      startContent={
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      }
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      label="Email Address"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      isRequired
                      isInvalid={!!formErrors.email}
                      errorMessage={formErrors.email}
                      variant="bordered"
                      classNames={{
                        inputWrapper: "bg-white/50 backdrop-blur-sm",
                      }}
                      startContent={
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      }
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants}>
                  <Select
                    id="subject"
                    name="subject"
                    label="Subject"
                    placeholder="Select a subject"
                    value={formData.subject}
                    onChange={handleChange}
                    isRequired
                    isInvalid={!!formErrors.subject}
                    errorMessage={formErrors.subject}
                    variant="bordered"
                    classNames={{
                      trigger: "bg-white/50 backdrop-blur-sm",
                    }}
                  >
                    <SelectItem key="General Question" value="General Question">General Question</SelectItem>
                    <SelectItem key="Technical Support" value="Technical Support">Technical Support</SelectItem>
                    <SelectItem key="Billing Inquiry" value="Billing Inquiry">Billing Inquiry</SelectItem>
                    <SelectItem key="Partnership Opportunity" value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                    <SelectItem key="Career Information" value="Career Information">Career Information</SelectItem>
                  </Select>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Textarea
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    isRequired
                    minRows={5}
                    isInvalid={!!formErrors.message}
                    errorMessage={formErrors.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-white/50 backdrop-blur-sm",
                    }}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center">
                  <Checkbox
                    id="subscribe"
                    name="subscribe"
                    isSelected={formData.subscribe}
                    onValueChange={(checked) => setFormData(prev => ({ ...prev, subscribe: checked }))}
                    color="primary"
                  >
                    <span className="text-sm text-gray-600">
                      I'd like to receive updates about new courses and features
                    </span>
                  </Checkbox>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className={`w-full py-3 shadow-sm font-medium text-md transition-all ${
                      formStatus === 'success' 
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                    }`}
                    startContent={
                      formStatus === 'submitting' ? (
                        <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                      ) : formStatus === 'success' ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        <FiSend className="w-5 h-5" />
                      )
                    }
                  >
                    {formStatus === 'submitting' && 'Sending...'}
                    {formStatus === 'success' && 'Message Sent!'}
                    {(formStatus === 'idle' || formStatus === 'error') && 'Send Message'}
                  </Button>
                  
                  {formStatus === 'error' && (
                    <div className="mt-3 flex items-center bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg">
                      <FiAlertCircle className="w-5 h-5 mr-2" />
                      <p className="text-sm">
                        There was an error sending your message. Please try again.
                      </p>
                    </div>
                  )}
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 