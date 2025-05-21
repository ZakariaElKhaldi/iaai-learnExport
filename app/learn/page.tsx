"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, Database, PenTool, LineChart, Layers, 
  Server, BookOpen, Globe, CheckCircle, ExternalLink, Search, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LearningProgress } from "@/components/learning-progress";
import { useLearningProgress } from "@/hooks/use-learning-progress";

import { useLearningContent } from '@/hooks/use-learning-content';

// Define types for our data structure
type Tutorial = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  level: string;
  popular: boolean;
  category: string;
};

type MainTopic = {
  id: string;
  name: string;
  color?: string;
  icon: string;
  description: string;
  tutorialCount: number;
  tutorials: Tutorial[];
  difficulty: string;
};

// Icon mapping for dynamic icons
const IconMap: { [key: string]: React.ComponentType<any> } = {
  Code,
  PenTool,
  Globe,
  Layers,
  Server,
  BookOpen,
  Database,
  LineChart
};

// Function to get level badge
const getLevelBadge = (level: string) => {
  const colors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors[level as keyof typeof colors]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { setLastVisited } = useLearningProgress();

  useEffect(() => {
    const fetchMainTopics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/learn');
        if (!response.ok) {
          throw new Error('Failed to fetch main topics');
        }
        const data = await response.json();
        setMainTopics(data);
        if (data.length > 0 && !selectedTopic) {
          setSelectedTopic(data[0].id);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load learning content. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching main topics:', err);
      }
    };

    fetchMainTopics();
  }, [selectedTopic]);

  // Calculate total tutorials
  const totalTutorials = mainTopics.reduce((total, topic) => total + topic.tutorials.length, 0);

  // Filter main topics based on search term
  const filteredTopics = mainTopics.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasTutorialsMatchingSearch = topic.tutorials.some((tutorial) =>
      tutorial.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearch || hasTutorialsMatchingSearch;
  });

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle tutorial click
  const handleTutorialClick = (tutorialId: string) => {
    setLastVisited(tutorialId);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 px-4 py-8 md:px-8 overflow-y-auto">
        {/* Quick Navigation - Sticky */}
        <div className="sticky top-0 z-10 mb-6 bg-white dark:bg-slate-900 pt-2 pb-4 border-b">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => scrollToSection('popular')}
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" /> Popular
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => scrollToSection('learning-path')}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" /> Learning Path
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => scrollToSection('exercises')}
              className="flex items-center gap-1"
            >
              <PenTool className="h-4 w-4" /> Exercises
            </Button>
          </div>
        </div>

        {/* Mobile tutorial menu button */}
        <div className="md:hidden mb-6">
          <Button variant="outline" className="w-full flex justify-between items-center">
            <span>Browse Tutorials</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
          </Button>
        </div>

        {/* Grid layout for content and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Search bar */}
            <div className="relative mb-6">
              <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search tutorials" 
                className="pl-10 w-full transition-all focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {/* Search results */}
              {searchTerm && (
                <div className="absolute z-10 mt-2 w-full bg-white dark:bg-slate-800 shadow-lg rounded-md border">
                  {filteredTopics.length > 0 ? (
                    <ul className="py-2 max-h-[250px] overflow-y-auto">
                      {filteredTopics.map((topic) => (
                        <li key={topic.id} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                          <Link 
                            href={`/learn/${topic.id}`} 
                            className="flex items-center justify-between"
                            onClick={() => handleTutorialClick(topic.id)}
                          >
                            <div className="flex items-center">
                              {/* Fixed: Assuming topic.icon is a React component */}
                              {React.createElement(IconMap[topic.icon as keyof typeof IconMap], { className: "h-4 w-4 mr-2 text-primary" })}
                              <span>{topic.name}</span>
                            </div>
                            <Badge variant="outline" className="mr-2">{topic.tutorialCount} tutorials</Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                      No tutorials found for &quot;{searchTerm}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hero section */}
            <div className="text-center mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8">
              <h1 className="text-4xl font-bold mb-4 tracking-tight">Learn to Code</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                With our free, interactive tutorials and exercises
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleTutorialClick('html')}
                >
                  <Link href="/learn/html">Start Learning HTML</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/learn/where-to-start">Where To Start?</Link>
                </Button>
              </div>
            </div>

            {/* Popular tutorials section */}
            <section id="popular" className="mb-16 scroll-mt-20">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Popular Tutorials</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {mainTopics.flatMap((topic) => topic.tutorials).filter((tutorial) => tutorial.popular).slice(0, 6).map((tutorial, index) => (
                  <Link 
                    href={`/learn/${tutorial.slug}`} 
                    key={`popular-${tutorial.id}-${index}`} 
                    onClick={() => handleTutorialClick(tutorial.id)}
                  >
                    <div className="flex items-center">
                      {typeof tutorial.icon === 'string' && IconMap[tutorial.icon as keyof typeof IconMap] ? (
                        React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], {
                          className: "h-4 w-4 mr-2 text-primary"
                        })
                      ) : typeof tutorial.icon !== 'string' ? (
                        React.createElement(tutorial.icon, {
                          className: "h-4 w-4 mr-2 text-primary"
                        })
                      ) : (
                        <Code className="h-4 w-4 mr-2 text-primary" />
                      )}
                      <span>{tutorial.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Categories section - Commented out as it's similar to Main Topics Grid and might be redundant */}
            {/*
            <section id="categories" className="mb-16 scroll-mt-20">
              <div className="flex items-center mb-6">
                <Layers className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Categories</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Click on a topic to see all related tutorials and exercises.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {mainTopics.map((topic, index) => (
                  <Link 
                    href={`/learn/${topic.id}`} 
                    key={`category-${topic.id}-${index}`} 
                    // onClick={() => handleTutorialClick(topic.id)} // This onClick seems incorrect for a main topic link
                  >
                    <Card className="h-full hover:border-primary hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg mr-3">
                              {IconMap[topic.icon as keyof typeof IconMap] ? 
                                React.createElement(IconMap[topic.icon as keyof typeof IconMap], { className: "h-6 w-6 text-primary" }) : 
                                <Code className="h-6 w-6 text-primary" />
                              }
                            </div>
                            <h3 className="font-bold">{topic.name}</h3>
                          </div>
                          <Badge variant="outline">{topic.tutorialCount} tutorials</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{topic.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
            */}

            {/* Main Topics Grid */}
            <section id="topics" className="mb-16 scroll-mt-20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Layers className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-2xl font-bold">All Topics</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">
                    {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'} available
                  </span>
                </div>
              </div>
              
              {filteredTopics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                  {filteredTopics.map((topic, index) => (
                    <div key={`maintopic-${topic.id}-${index}`} className="group relative h-full">
                      <div className="border dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.01] hover:border-primary/40 dark:hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col bg-white dark:bg-slate-800">
                        {/* Colorful top border */}
                        <div className="relative">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20"></div>
                        </div>
                        
                        {/* Card content */}
                        <div className="p-3 sm:p-4 md:p-5 flex-grow">
                          <div className="flex flex-wrap items-start justify-between mb-2.5 sm:mb-3 md:mb-4">
                            <div className="flex items-start flex-shrink mr-2">
                              <div className="bg-slate-100 dark:bg-slate-700 p-1.5 sm:p-2 md:p-2.5 rounded-lg mr-2 sm:mr-2.5 shadow-sm transform group-hover:bg-primary/10 transition-colors duration-300">
                                {IconMap[topic.icon as keyof typeof IconMap] ? (
                                  React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                                    className: "h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6 text-primary"
                                  })
                                ) : (
                                  <Layers className="h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6 text-primary" /> 
                                )}
                              </div>
                              <div className="pt-1">
                                <h3 className="text-sm sm:text-base font-semibold leading-tight group-hover:text-primary transition-colors duration-200">{topic.name}</h3>
                                <div className="flex items-center mt-1">
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ 
                                    topic.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : 
                                    topic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300' :
                                    'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
                                  }`}>
                                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-1 sm:mt-0.5">
                              <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                {topic.tutorialCount} {topic.tutorialCount === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4 line-clamp-2 min-h-[2.5rem] overflow-hidden">
                            {topic.description}
                          </p>
                          
                          {topic.tutorials && topic.tutorials.length > 0 && (
                            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                              <p className="text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">Key Tutorials:</p>
                              <ul className="space-y-1 sm:space-y-1.5 bg-slate-50 dark:bg-slate-700/20 rounded-lg p-1.5 sm:p-2">
                                {topic.tutorials.slice(0, 2).map((tutorial, subIndex) => (
                                  <li key={`keytutorial-${topic.id}-${tutorial.id}-${subIndex}`} className="truncate">
                                    <Link 
                                      href={`/learn/${tutorial.slug}`} 
                                      onClick={() => handleTutorialClick(tutorial.id)} 
                                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-150 flex items-center group rounded-md py-1 px-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/40"
                                    >
                                      {IconMap[tutorial.icon as keyof typeof IconMap] ? (
                                        React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], { className: "h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 flex-shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors duration-150" })
                                      ) : (
                                        <Code className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 flex-shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors duration-150" />
                                      )}
                                      <span className="truncate">{tutorial.name}</span>
                                    </Link>
                                  </li>
                                ))}
                                {topic.tutorials.length > 2 && (
                                   <li className="text-xs text-slate-400 dark:text-slate-500 px-1.5 pt-0.5">+ {topic.tutorials.length - 2} more</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        {/* Card footer */}
                        <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-800/50 border-t dark:border-slate-700/50 flex justify-center items-center">
                          <Link 
                            href={`/learn?topic=${topic.id}`}
                            onClick={() => {
                              // Potentially set selectedTopic here
                            }}
                            className="text-primary text-xs sm:text-sm font-medium flex items-center hover:underline w-full justify-center"
                          >
                            View Topic <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform group-hover:translate-x-1.5 duration-300" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Make the entire card clickable with an overlay, but exclude the links inside */}
                      <div 
                        onClick={() => {
                          window.location.href = `/learn?topic=${topic.id}`;
                        }}
                        className="absolute inset-0 z-10 cursor-pointer"
                        aria-hidden="true"
                        style={{ pointerEvents: 'auto' }}
                      ></div>
                      
                      {/* Restore pointer events for links inside the card */}
                      <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="p-2 sm:p-3 md:p-4 lg:p-5 h-full flex flex-col">
                          <div className="mt-auto">
                            <div className="pt-3 sm:pt-4 md:pt-4 opacity-0">
                              {/* This keeps the spacing correct for the overlay */}
                              <span className="text-xs">Placeholder</span> 
                            </div>
                            
                            {/* Key tutorials area - make links clickable */}
                            {topic.tutorials && topic.tutorials.length > 0 && (
                              <div className="relative mt-auto">
                                <div style={{ marginBottom: '3rem' }} className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                                  <div className="h-5 opacity-0">Placeholder</div>
                                  <ul className="space-y-1 sm:space-y-2 rounded-lg p-1.5 sm:p-2 md:p-2.5">
                                    {topic.tutorials.slice(0, 2).map((tutorial, subIndex) => (
                                      <li key={`clickable-tutorial-${topic.id}-${tutorial.id}`} className="pointer-events-auto relative z-30">
                                        <div className="h-7 opacity-0">Placeholder</div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Restore pointer events for the View Topic link */}
                      <div className="absolute bottom-0 right-0 z-30 pointer-events-auto p-2 sm:p-3 md:p-4">
                        <div className="opacity-0 text-xs sm:text-sm">
                          View Topic <ArrowRight className="inline h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Layers className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No Topics Found</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    {searchTerm ? `No topics match your search for "${searchTerm}". Try a different term.` : 'There are currently no topics available.'}
                  </p>
                </div>
              )}
            </section>

            {/* Learning path section */}
            <section id="learning-path" className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8 scroll-mt-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-2xl md:text-3xl font-bold">Not Sure Where to Begin?</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  Follow our recommended learning path to become a web developer:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                      <span className="font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">HTML</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Start with HTML to build the structure of your web pages.
                    </p>
                    <Button 
                      asChild 
                      variant="link" 
                      className="mt-4 p-0"
                      onClick={() => handleTutorialClick('html')}
                    >
                      <Link href="/learn/html">Learn HTML →</Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                      <span className="font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">CSS</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Learn CSS to style your web pages with colors, layouts, and fonts.
                    </p>
                    <Button 
                      asChild 
                      variant="link" 
                      className="mt-4 p-0"
                      onClick={() => handleTutorialClick('css')}
                    >
                      <Link href="/learn/css">Learn CSS →</Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                      <span className="font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">JavaScript</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Add JavaScript to create dynamic and interactive web pages.
                    </p>
                    <Button 
                      asChild 
                      variant="link" 
                      className="mt-4 p-0"
                      onClick={() => handleTutorialClick('javascript')}
                    >
                      <Link href="/learn/javascript">Learn JavaScript →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Exercises and Quizzes section */}
            <section id="exercises" className="mb-16 scroll-mt-20">
              <div className="flex items-center mb-6">
                <PenTool className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Test Your Skills</h2>
              </div>
              
              <div className="bg-white dark:bg-slate-800 border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
                    Practice what you&apos;ve learned with interactive exercises and quizzes
                  </p>
                  <div className="flex space-x-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/learn/exercises">All Exercises</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/learn/quizzes">All Quizzes</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/learn/resources">Learning Resources</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/learn/community">Join Community</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        HTML Basics Exercise
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Practice creating HTML elements and structure
                      </p>
                      <Badge variant="outline" className="mr-2">Beginner</Badge>
                      <Badge variant="outline">10 mins</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <PenTool className="h-4 w-4 mr-2 text-primary" />
                        CSS Styling Quiz
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Test your knowledge of CSS properties
                      </p>
                      <Badge variant="outline" className="mr-2">Beginner</Badge>
                      <Badge variant="outline">15 mins</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16 text-center">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Ready to start your coding journey?</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                    Join thousands of students who are already learning to code with our comprehensive tutorials and hands-on exercises.
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="shadow-md"
                    onClick={() => handleTutorialClick('html')}
                  >
                    <Link href="/learn/html">Start Learning Today</Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-20">
              {/* Learning Progress Card */}
              <LearningProgress totalTutorials={totalTutorials} />

              {/* Recently Viewed */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/learn/exercises">Practice Exercises</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/learn/quizzes">Take a Quiz</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/learn/resources">Learning Resources</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href="/learn/community">Join Community</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}