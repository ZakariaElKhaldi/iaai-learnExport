"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardBody, CardFooter, Image, Link } from '@nextui-org/react';
import { FaArrowRight, FaCode, FaGraduationCap, FaBook, FaSearch } from 'react-icons/fa';
import { MdOutlineTopic } from 'react-icons/md';
import { BsCodeSquare } from 'react-icons/bs';

const FeatureCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  color: string 
}) => {
  return (
    <Card 
      className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white/[0.02] backdrop-blur-sm hover:scale-105"
      isHoverable
    >
      <CardBody className="p-6">
        <div className={`rounded-full p-3 mb-4 w-12 h-12 flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardBody>
    </Card>
  );
};

export default function LearningHubSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-950 to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 -left-60 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 -right-60 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:50px_50px] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/40 text-indigo-300 text-sm font-semibold mb-5 shadow-md">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
            Learning Resource Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-indigo-300">
            Discover Our Learning Hub
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Access free tutorials, interactive code examples, and expert resources to enhance your learning journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<MdOutlineTopic className="text-2xl text-white" />}
              title="Explore Topics"
              description="Browse through diverse topics covering front-end, back-end, AI, and more specializations."
              color="bg-gradient-to-br from-blue-500 to-blue-700"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<FaBook className="text-2xl text-white" />}
              title="Tutorial Library"
              description="Step-by-step tutorials to help you master various programming concepts and techniques."
              color="bg-gradient-to-br from-purple-500 to-purple-700"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FeatureCard 
              icon={<BsCodeSquare className="text-2xl text-white" />}
              title="Code Examples"
              description="Real-world interactive code examples you can experiment with directly in your browser."
              color="bg-gradient-to-br from-green-500 to-green-700"
            />
          </motion.div>
        </motion.div>

        {/* Example showcase */}
        <motion.div 
          className="mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative z-0 rounded-xl overflow-hidden border border-indigo-500/20 bg-gray-800">
            <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
              <div className="text-6xl text-gray-700">
                <BsCodeSquare />
              </div>
            </div>
          </div>
          
          <div className="relative z-20 mx-auto max-w-3xl -mt-24 text-center">
            <Card className="bg-gray-900/90 border border-gray-800 backdrop-blur-md">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Begin Your Learning Journey Today</h3>
                <p className="text-gray-300 mb-6">
                  The Learning Hub provides free access to quality educational content for developers at all levels.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    as={Link}
                    href="/learn"
                    color="primary"
                    endContent={<FaArrowRight />}
                    className="font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg shadow-indigo-500/20"
                  >
                    Explore the Hub
                  </Button>
                  
                  <Button 
                    as={Link}
                    href="/learn/examples"
                    variant="bordered"
                    className="font-medium text-white border-white/30 hover:bg-white/10"
                  >
                    Browse Code Examples
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: "120+", label: "Tutorials", icon: <FaBook className="text-indigo-400" /> },
            { number: "50+", label: "Topics", icon: <MdOutlineTopic className="text-purple-400" /> },
            { number: "200+", label: "Code Examples", icon: <FaCode className="text-blue-400" /> },
            { number: "15k+", label: "Monthly Users", icon: <FaGraduationCap className="text-green-400" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 