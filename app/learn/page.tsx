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
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Filter,
  ChevronRight,
  Users,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Featured categories
const featuredCategories = ['javascript', 'python', 'html', 'css', 'react', 'typescript'];

// Colors for different categories
const categoryColors: Record<string, string> = {
  javascript: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  python: 'bg-blue-100 text-blue-800 border-blue-200',
  html: 'bg-orange-100 text-orange-800 border-orange-200',
  css: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  react: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  typescript: 'bg-blue-100 text-blue-800 border-blue-200',
  sql: 'bg-green-100 text-green-800 border-green-200',
  vue: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  default: 'bg-slate-100 text-slate-800 border-slate-200'
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
  const [activeTab, setActiveTab] = useState('all');

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

  // Get featured tutorials
  const featuredTutorials = React.useMemo(() => {
    const featured: Tutorial[] = [];
    mainTopics.forEach(topic => {
      if (featuredCategories.includes(topic.id)) {
        // Add 1-2 popular tutorials from each featured category
        const topTutorials = topic.tutorials
          .filter(t => t.popular || t.name.toLowerCase().includes('introduction') || t.name.toLowerCase().includes('getting started'))
          .slice(0, 2);
        featured.push(...topTutorials);
      }
    });
    return featured.slice(0, 6); // Limit to 6 featured tutorials
  }, [mainTopics]);

  // Handle tutorial click - for tracking or analytics in the future
  const handleTutorialClick = (tutorialId: string) => {
    // Future tracking logic could go here
    console.log(`Tutorial clicked: ${tutorialId}`);
  };

  // Get category color
  const getCategoryColor = (categoryId: string): string => {
    return categoryColors[categoryId] || categoryColors.default;
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-64 w-full mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
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
                            <Clock className="h-3 w-3 mr-1" /> 5-10 min
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
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-lg mr-4 ${getCategoryColor(currentTopic.id)}`}>
              {IconMap[currentTopic.icon as keyof typeof IconMap] ? (
                React.createElement(IconMap[currentTopic.icon as keyof typeof IconMap], {
                  className: "h-6 w-6"
                })
              ) : (
                <Code className="h-6 w-6" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{currentTopic.name}</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {currentTopic.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="outline" className="px-3 py-1">{currentTopic.difficulty}</Badge>
            <Badge variant="outline" className="px-3 py-1">{currentTopic.tutorialCount} tutorials</Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTopic('')} className="ml-auto">
              Back to all topics
            </Button>
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
                    <div className={`p-2 rounded-lg mr-3 ${getCategoryColor(currentTopic.id)}`}>
                      {IconMap[tutorial.icon as keyof typeof IconMap] ? (
                        React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], {
                          className: "h-5 w-5"
                        })
                      ) : (
                        <Code className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{tutorial.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{tutorial.level}</Badge>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 5-10 min
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

  // Show main landing page with all topics
  return (
    <div className="container mx-auto p-6">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl mb-10">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-6 md:mb-0 md:pr-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Level up your coding skills</h1>
            <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
              Browse our comprehensive collection of tutorials, exercises, and guides to master web development and programming.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute top-3 left-3 h-5 w-5 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search tutorials, languages, or technologies..." 
                className="pl-10 py-6 w-full text-base shadow-sm focus:ring-2 focus:ring-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md">
                  <Code className="h-7 w-7 text-primary" />
                  <p className="text-sm font-medium mt-1">Web Development</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md">
                  <Server className="h-7 w-7 text-orange-500" />
                  <p className="text-sm font-medium mt-1">Backend</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md">
                  <Database className="h-7 w-7 text-blue-500" />
                  <p className="text-sm font-medium mt-1">Databases</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md">
                  <Globe className="h-7 w-7 text-green-500" />
                  <p className="text-sm font-medium mt-1">Web APIs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured tutorials section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Tutorials</h2>
            <p className="text-slate-600 dark:text-slate-400">Hand-picked learning paths to get you started</p>
          </div>
          <Button variant="ghost" className="gap-1 flex items-center">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTutorials.map((tutorial) => {
            const topicData = mainTopics.find(t => t.id === tutorial.category);
            return (
              <Link
                href={`/learn/${tutorial.slug}`}
                key={tutorial.id}
                onClick={() => handleTutorialClick(tutorial.id)}
                className="block h-full"
              >
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-2 w-full ${getCategoryColor(tutorial.category)}`}></div>
                    <div className="p-5">
                      <div className="flex items-start mb-3">
                        <div className={`p-2 rounded-lg mr-3 ${getCategoryColor(tutorial.category)}`}>
                          {IconMap[tutorial.icon as keyof typeof IconMap] ? (
                            React.createElement(IconMap[tutorial.icon as keyof typeof IconMap], {
                              className: "h-5 w-5"
                            })
                          ) : (
                            <Code className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{tutorial.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`text-xs ${getCategoryColor(tutorial.category)}`}>
                              {topicData?.name || tutorial.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{tutorial.level}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {tutorial.description || `Learn about ${tutorial.name}`}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 pb-4 pt-0 flex justify-between items-center border-t mt-2 pt-3">
                    <span className="text-xs text-slate-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> 5-10 min read
                    </span>
                    <span className="text-xs text-primary flex items-center font-medium">
                      Start learning <ChevronRight className="h-3 w-3 ml-1" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* All learning paths */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Learning Paths</h2>
            <p className="text-slate-600 dark:text-slate-400">Browse all our tutorial categories</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="database">Databases</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainTopics.map(topic => (
                <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                  <CardHeader className={`pb-2 ${getCategoryColor(topic.id)}`}>
                    <div className="flex items-center">
                      {IconMap[topic.icon as keyof typeof IconMap] ? (
                        React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                          className: "h-5 w-5 mr-2"
                        })
                      ) : (
                        <Code className="h-5 w-5 mr-2" />
                      )}
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className="text-xs">{topic.tutorialCount} tutorials</Badge>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                        Explore <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frontend" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainTopics
                .filter(topic => ['html', 'css', 'javascript', 'react', 'vue', 'typescript'].includes(topic.id))
                .map(topic => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                    <CardHeader className={`pb-2 ${getCategoryColor(topic.id)}`}>
                      <div className="flex items-center">
                        {IconMap[topic.icon as keyof typeof IconMap] ? (
                          React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                            className: "h-5 w-5 mr-2"
                          })
                        ) : (
                          <Code className="h-5 w-5 mr-2" />
                        )}
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">{topic.tutorialCount} tutorials</Badge>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                          Explore <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="backend" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainTopics
                .filter(topic => ['python', 'node', 'java', 'php'].includes(topic.id))
                .map(topic => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                    <CardHeader className={`pb-2 ${getCategoryColor(topic.id)}`}>
                      <div className="flex items-center">
                        {IconMap[topic.icon as keyof typeof IconMap] ? (
                          React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                            className: "h-5 w-5 mr-2"
                          })
                        ) : (
                          <Code className="h-5 w-5 mr-2" />
                        )}
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">{topic.tutorialCount} tutorials</Badge>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                          Explore <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainTopics
                .filter(topic => ['sql', 'mongodb', 'databases'].includes(topic.id))
                .map(topic => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                    <CardHeader className={`pb-2 ${getCategoryColor(topic.id)}`}>
                      <div className="flex items-center">
                        {IconMap[topic.icon as keyof typeof IconMap] ? (
                          React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                            className: "h-5 w-5 mr-2"
                          })
                        ) : (
                          <Code className="h-5 w-5 mr-2" />
                        )}
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">{topic.tutorialCount} tutorials</Badge>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                          Explore <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="frameworks" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mainTopics
                .filter(topic => ['react', 'vue', 'angular', 'django', 'flask', 'express'].includes(topic.id))
                .map(topic => (
                  <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedTopic(topic.id)}>
                    <CardHeader className={`pb-2 ${getCategoryColor(topic.id)}`}>
                      <div className="flex items-center">
                        {IconMap[topic.icon as keyof typeof IconMap] ? (
                          React.createElement(IconMap[topic.icon as keyof typeof IconMap], {
                            className: "h-5 w-5 mr-2"
                          })
                        ) : (
                          <Code className="h-5 w-5 mr-2" />
                        )}
                        <CardTitle className="text-lg">{topic.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs">{topic.tutorialCount} tutorials</Badge>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                          Explore <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning resources section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 bg-primary/10 p-3 w-fit rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Forums</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Join our community forums to ask questions, share projects, and connect with other learners.
              </p>
              <Button variant="outline" className="w-full">Join the community</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 bg-orange-100 p-3 w-fit rounded-lg">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Challenges</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Test your skills with our collection of coding challenges and projects with real-time feedback.
              </p>
              <Button variant="outline" className="w-full">Start practicing</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 bg-blue-100 p-3 w-fit rounded-lg">
                <Bookmark className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learning Paths</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Follow structured learning paths from beginner to advanced with guided courses and projects.
              </p>
              <Button variant="outline" className="w-full">Explore paths</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-8 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Stay updated with new tutorials</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Get notified when we release new tutorials, courses, and learning resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}