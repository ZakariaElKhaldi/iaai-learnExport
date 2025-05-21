"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Code, Database, PenTool, LineChart, Layers, 
  Server, BookOpen, Globe, CheckCircle, Search, ArrowRight, Clock, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LearningProgress } from "@/components/learning-progress";
import { useLearningProgress } from "@/hooks/use-learning-progress";

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
const IconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  Code, PenTool, Globe, Layers, Server, BookOpen, Database, LineChart
};

export default function LearnPage() {
  // Router and URL params
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicParam = searchParams.get('topic');
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const { setLastVisited } = useLearningProgress();

  // Fetch topics data
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
        
        // Set selected topic from URL parameter or default to first topic
        if (topicParam) {
          setSelectedTopic(topicParam);
        } else if (data.length > 0 && !selectedTopic) {
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
  }, [topicParam]);

  // Calculate total tutorials
  const totalTutorials = mainTopics.reduce((total, topic) => total + topic.tutorials.length, 0);

  // Filter topics based on search term
  const filteredTopics = useMemo(() => {
    if (!searchTerm) return mainTopics;
    
    return mainTopics.filter((topic) => {
      const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasTutorialsMatchingSearch = topic.tutorials.some((tutorial) =>
        tutorial.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearch || hasTutorialsMatchingSearch;
    });
  }, [mainTopics, searchTerm]);

  // Get currently selected topic data
  const currentTopic = useMemo(() => {
    return mainTopics.find(topic => topic.id === selectedTopic);
  }, [mainTopics, selectedTopic]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle topic selection
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    router.push(`/learn?topic=${topicId}`);
  };

  // Handle tutorial click
  const handleTutorialClick = (tutorialId: string, slug: string) => {
    setLastVisited(tutorialId);
    // No need to use window.location - Next.js routing will handle navigation
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Skeleton className="h-[300px] w-full mb-4" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div className="md:col-span-3">
            <Skeleton className="h-12 w-full mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
        </div>
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
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Learn Programming</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Browse tutorials by topic or use the search to find specific content
        </p>
      </div>
      
      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
        <Input 
          type="search" 
          placeholder="Search tutorials" 
          className="pl-10 w-full transition-all focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Topics list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {mainTopics.map((topic) => (
                    <button 
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                      className={`w-full text-left px-4 py-3 flex items-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                        ${selectedTopic === topic.id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                    >
                      <div className="mr-3">
                        {IconMap[topic.icon as keyof typeof IconMap] ? (
                          React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                            className: "h-5 w-5 text-primary"
                          })
                        ) : (
                          <Code className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{topic.name}</div>
                        <div className="text-xs text-slate-500">{topic.tutorialCount} tutorials</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Learning Progress */}
            <LearningProgress totalTutorials={totalTutorials} />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-3">
          {currentTopic ? (
            <>
              {/* Topic header */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  {IconMap[currentTopic.icon as keyof typeof IconMap] ? (
                    React.createElement(IconMap[currentTopic.icon as keyof typeof IconMap], {
                      className: "h-6 w-6 mr-3 text-primary"
                    })
                  ) : (
                    <Code className="h-6 w-6 mr-3 text-primary" />
                  )}
                  <h2 className="text-2xl font-bold">{currentTopic.name}</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {currentTopic.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentTopic.difficulty}</Badge>
                  <Badge variant="outline">{currentTopic.tutorialCount} tutorials</Badge>
                </div>
              </div>
              
              {/* Tutorials grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTopic.tutorials.map((tutorial) => (
                  <Link
                    href={`/learn/${tutorial.slug}`}
                    key={tutorial.id}
                    onClick={() => handleTutorialClick(tutorial.id, tutorial.slug)}
                    className="block h-full"
                  >
                    <Card className="h-full hover:shadow-md transition-all hover:border-primary/50">
                      <CardContent className="p-5">
                        <div className="flex items-start mb-3">
                          <div className="bg-primary/10 p-2 rounded-lg mr-3">
                            {IconMap[tutorial.icon as keyof typeof IconMap] ? (
                              React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], {
                                className: "h-5 w-5 text-primary"
                              })
                            ) : (
                              <Code className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{tutorial.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{tutorial.level}</Badge>
                              <span className="text-xs text-slate-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> 5 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {tutorial.description || `Learn about ${tutorial.name}`}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : searchTerm ? (
            // Search results
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Search Results for "{searchTerm}"</h2>
              
              {filteredTopics.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Try different keywords or browse topics from the sidebar
                  </p>
                </div>
              ) : (
                filteredTopics.map(topic => (
                  <div key={topic.id} className="mb-6">
                    <div 
                      className="flex items-center mb-3 cursor-pointer"
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      {IconMap[topic.icon as keyof typeof IconMap] ? (
                        React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                          className: "h-5 w-5 mr-2 text-primary"
                        })
                      ) : (
                        <Code className="h-5 w-5 mr-2 text-primary" />
                      )}
                      <h3 className="text-lg font-semibold">{topic.name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topic.tutorials
                        .filter(tutorial => 
                          tutorial.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice(0, 4)
                        .map((tutorial) => (
                          <Link
                            href={`/learn/${tutorial.slug}`}
                            key={tutorial.id}
                            onClick={() => handleTutorialClick(tutorial.id, tutorial.slug)}
                            className="flex items-center gap-2 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                          >
                            <div className="bg-primary/10 p-1 rounded-md">
                              {IconMap[tutorial.icon as keyof typeof IconMap] ? (
                                React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], {
                                  className: "h-4 w-4 text-primary"
                                })
                              ) : (
                                <Code className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-sm">{tutorial.name}</div>
                              <div className="text-xs text-slate-500">{tutorial.level}</div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            // Welcome screen / no topic selected
            <div className="text-center py-12 space-y-4">
              <Globe className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold">Welcome to the Learning Platform</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6">
                Select a topic from the sidebar to start exploring tutorials, or search
                for specific content using the search bar above.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button onClick={() => scrollToSection('popular-topics')}>Popular Topics</Button>
                <Button variant="outline" onClick={() => handleTopicSelect('web-development')}>
                  Web Development
                </Button>
                <Button variant="outline" onClick={() => handleTopicSelect('python-programming')}>
                  Python
                </Button>
                <Button variant="outline" onClick={() => handleTopicSelect('javascript-basics')}>
                  JavaScript
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}