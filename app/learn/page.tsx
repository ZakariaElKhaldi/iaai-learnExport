"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Code, Database, PenTool, LineChart, Layers, 
  Server, BookOpen, Globe, CheckCircle, ExternalLink, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LearningProgress } from "@/components/learning-progress";
import { useLearningProgress } from "@/hooks/use-learning-progress";

// Define tutorial categories
const categories = [
  {
    id: "html-css",
    name: "HTML & CSS",
    color: "#E44D26",
    tutorials: [
      { id: "html", name: "HTML", icon: Code, description: "The language for building web pages", level: "beginner", popular: true },
      { id: "css", name: "CSS", icon: PenTool, description: "The language for styling web pages", level: "beginner", popular: true },
      { id: "rwd", name: "Responsive Web Design", icon: Globe, description: "Make your websites look good on all devices", level: "intermediate" },
      { id: "bootstrap", name: "Bootstrap", icon: Layers, description: "Popular CSS framework for responsive websites", level: "intermediate" },
      { id: "sass", name: "Sass", icon: PenTool, description: "CSS preprocessor for more powerful styling", level: "intermediate" },
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    tutorials: [
      { id: "javascript", name: "JavaScript", icon: Code, description: "The language for programming web pages", level: "beginner", popular: true },
      { id: "react", name: "React", icon: Layers, description: "A JavaScript library for building user interfaces", level: "intermediate", popular: true },
      { id: "nodejs", name: "Node.js", icon: Server, description: "JavaScript runtime for server-side programming", level: "intermediate" },
      { id: "typescript", name: "TypeScript", icon: Code, description: "JavaScript with added type safety", level: "intermediate" },
      { id: "jquery", name: "jQuery", icon: Code, description: "Fast and feature-rich JavaScript library", level: "beginner" },
    ]
  },
  {
    id: "backend",
    name: "Backend",
    color: "#3776AB",
    tutorials: [
      { id: "python", name: "Python", icon: Code, description: "A popular programming language", level: "beginner", popular: true },
      { id: "sql", name: "SQL", icon: Database, description: "Language for managing databases", level: "beginner", popular: true },
      { id: "php", name: "PHP", icon: Code, description: "Server scripting language for web development", level: "intermediate" },
      { id: "java", name: "Java", icon: Code, description: "Object-oriented programming language", level: "intermediate" },
      { id: "csharp", name: "C#", icon: Code, description: "Language for building Windows applications", level: "intermediate" },
    ]
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    color: "#4CAF50",
    tutorials: [
      { id: "data-science", name: "Data Science", icon: LineChart, description: "Extracting knowledge from data", level: "intermediate" },
      { id: "machine-learning", name: "Machine Learning", icon: BookOpen, description: "Making computers learn from data", level: "advanced" },
      { id: "numpy", name: "NumPy", icon: LineChart, description: "Library for scientific computing in Python", level: "intermediate" },
      { id: "pandas", name: "Pandas", icon: LineChart, description: "Data analysis library for Python", level: "intermediate" },
      { id: "statistics", name: "Statistics", icon: LineChart, description: "Collection and analysis of data", level: "beginner" },
    ]
  }
];

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

// Calculate total tutorials
const totalTutorials = categories.reduce((total, category) => total + category.tutorials.length, 0);

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const { setLastVisited } = useLearningProgress();

  // Filter tutorials based on search term
  const filteredTutorials = searchTerm 
    ? categories.flatMap(category => 
        category.tutorials.filter(tutorial => 
          tutorial.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

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
              onClick={() => scrollToSection('categories')}
              className="flex items-center gap-1"
            >
              <Layers className="h-4 w-4" /> Categories
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
                  {filteredTutorials.length > 0 ? (
                    <ul className="py-2 max-h-[250px] overflow-y-auto">
                      {filteredTutorials.map((tutorial) => (
                        <li key={tutorial.id} className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                          <Link 
                            href={`/learn/${tutorial.id}`} 
                            className="flex items-center justify-between"
                            onClick={() => handleTutorialClick(tutorial.id)}
                          >
                            <div className="flex items-center">
                              <tutorial.icon className="h-4 w-4 mr-2 text-primary" />
                              <span>{tutorial.name}</span>
                            </div>
                            {getLevelBadge(tutorial.level)}
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
                {categories.flatMap(category => 
                  category.tutorials.filter(tutorial => tutorial.popular)
                ).map((tutorial) => (
                  <Link 
                    href={`/learn/${tutorial.id}`} 
                    key={tutorial.id}
                    onClick={() => handleTutorialClick(tutorial.id)}
                  >
                    <Card className="h-full hover:border-primary hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg mr-3">
                              <tutorial.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold">{tutorial.name}</h3>
                          </div>
                          <div>
                            {getLevelBadge(tutorial.level)}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-primary">
                          Start Learning <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Tabs for different categories */}
            <section id="categories" className="mb-16 scroll-mt-20">
              <div className="flex items-center mb-6">
                <Layers className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-2xl font-bold">Browse by Category</h2>
              </div>
              
              <Tabs defaultValue={categories[0].id} value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
                  ))}
                </TabsList>
                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.tutorials.map((tutorial) => (
                        <Link 
                          href={`/learn/${tutorial.id}`} 
                          key={tutorial.id} 
                          className="block"
                          onClick={() => handleTutorialClick(tutorial.id)}
                        >
                          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="flex items-center mb-3">
                              <tutorial.icon className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{tutorial.name}</h3>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {tutorial.description}
                            </p>
                            <div className="flex justify-between items-center">
                              {getLevelBadge(tutorial.level)}
                              <span className="text-sm text-primary">Learn →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
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