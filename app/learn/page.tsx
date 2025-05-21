"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Code, 
  Database, 
  PenTool, 
  LineChart, 
  Layers, 
  Server, 
  BookOpen, 
  Globe, 
  Search, 
  Clock 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
  const searchParams = useSearchParams();
  const topicParam = searchParams.get('topic');
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainTopics, setMainTopics] = useState<MainTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

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
        
        // Set selected topic from URL parameter
        if (topicParam) {
          setSelectedTopic(topicParam);
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

  // Get currently selected topic data
  const currentTopic = mainTopics.find(topic => topic.id === selectedTopic);

  // Handle tutorial click - for tracking or analytics in the future
  const handleTutorialClick = (tutorialId: string) => {
    // Future tracking logic could go here
    console.log(`Tutorial clicked: ${tutorialId}`);
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
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

  // Show search results if there's a search term
  if (searchTerm) {
    const searchResults = mainTopics.flatMap(topic => 
      topic.tutorials.filter(tutorial => 
        tutorial.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="container mx-auto p-6">
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

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Search Results for &quot;{searchTerm}&quot;</h2>
          <p className="text-slate-600 dark:text-slate-400">Found {searchResults.length} results</p>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try different keywords or browse topics from the sidebar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((tutorial) => (
              <Link
                href={`/learn/${tutorial.slug}`}
                key={tutorial.id}
                onClick={() => handleTutorialClick(tutorial.id)}
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
        )}
      </div>
    );
  }

  // Show selected topic page
  if (currentTopic) {
    return (
      <div className="container mx-auto p-6">
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
              onClick={() => handleTutorialClick(tutorial.id)}
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
      </div>
    );
  }

  // Welcome screen / no topic selected
  return (
    <div className="container mx-auto p-6">
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
      
      <div className="text-center py-12 space-y-6">
        <Globe className="h-16 w-16 mx-auto text-primary mb-4" />
        <h2 className="text-2xl font-bold">Welcome to the Learning Platform</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Select a topic from the sidebar to start exploring tutorials, or search
          for specific content using the search bar above.
        </p>
        
        {/* Popular tutorials section */}
        {mainTopics.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-left">Popular Tutorials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mainTopics
                .flatMap((topic) => topic.tutorials)
                .filter((tutorial) => tutorial.popular)
                .slice(0, 6)
                .map((tutorial) => (
                  <Link
                    href={`/learn/${tutorial.slug}`}
                    key={tutorial.id}
                    onClick={() => handleTutorialClick(tutorial.id)}
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
          </div>
        )}
      </div>
    </div>
  );
}