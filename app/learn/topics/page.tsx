"use client";

import React from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import TopicGrid from '@/components/marketing/TopicGrid';
import { DifficultyLevel } from '@/components/marketing/TopicCard';
import { Separator } from '@/components/ui/separator';

// Import icons for topics (same as used in the home page)
import { Code, Database, PenTool, LineChart, Layers, Terminal, Server, BookOpen, Globe, Shield } from 'lucide-react';

// Sample topics data - expanded from home page
const allTopics = [
  {
    id: "1",
    slug: "javascript",
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript, from variables and functions to advanced ES6+ features.",
    icon: Code,
    difficulty: "beginner" as DifficultyLevel,
    lessonCount: 12,
    isPopular: true,
  },
  {
    id: "2",
    slug: "reactjs",
    title: "React.js Development",
    description: "Learn React.js from the ground up and build modern, interactive web applications.",
    icon: Layers,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 15,
    isNew: true,
  },
  {
    id: "3",
    slug: "python",
    title: "Python Programming",
    description: "Get started with Python programming and explore its wide range of applications.",
    icon: Code,
    difficulty: "beginner" as DifficultyLevel,
    lessonCount: 10,
  },
  {
    id: "4",
    slug: "data-science",
    title: "Data Science & Analytics",
    description: "Dive into data science fundamentals using Python, pandas, and visualization tools.",
    icon: LineChart,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 14,
  },
  {
    id: "5",
    slug: "ui-design",
    title: "UI/UX Design",
    description: "Learn how to create beautiful, functional user interfaces with design principles and tools.",
    icon: PenTool,
    difficulty: "beginner" as DifficultyLevel,
    lessonCount: 8,
  },
  {
    id: "6",
    slug: "databases",
    title: "Database Management",
    description: "Understand database concepts, SQL, and how to design efficient database systems.",
    icon: Database,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 9,
  },
  {
    id: "7",
    slug: "web-development",
    title: "Full-Stack Web Development",
    description: "Build complete web applications with frontend, backend, and database integration.",
    icon: Globe,
    difficulty: "advanced" as DifficultyLevel,
    lessonCount: 18,
  },
  {
    id: "8",
    slug: "golang",
    title: "Go Programming",
    description: "Learn Go (Golang) for building fast, reliable, and efficient software applications.",
    icon: Code,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 11,
    isNew: true,
  },
  {
    id: "9",
    slug: "algorithms",
    title: "Algorithms & Data Structures",
    description: "Master fundamental algorithms and data structures for efficient problem-solving.",
    icon: BookOpen,
    difficulty: "advanced" as DifficultyLevel,
    lessonCount: 16,
  },
  {
    id: "10",
    slug: "devops",
    title: "DevOps & CI/CD",
    description: "Learn DevOps practices, tools, and continuous integration/deployment pipelines.",
    icon: Server,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 10,
  },
  {
    id: "11",
    slug: "linux",
    title: "Linux Command Line",
    description: "Master the Linux command line and shell scripting for system administration and automation.",
    icon: Terminal,
    difficulty: "beginner" as DifficultyLevel,
    lessonCount: 13,
  },
  {
    id: "12",
    slug: "security",
    title: "Cybersecurity Fundamentals",
    description: "Learn the essentials of cybersecurity, including threat detection and secure coding practices.",
    icon: Shield,
    difficulty: "intermediate" as DifficultyLevel,
    lessonCount: 12,
  },
];

const difficultyOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function TopicsPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string[]>(["all"]);
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle difficulty filter changes
  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(prev => {
      // Handle "All Levels" special case
      if (value === "all") {
        return ["all"];
      }
      
      // If "all" is already selected and we're selecting something else, remove "all"
      if (prev.includes("all")) {
        return [value];
      }
      
      // Toggle the selected value
      if (prev.includes(value)) {
        const newValues = prev.filter(item => item !== value);
        // If nothing is selected, default to "all"
        return newValues.length === 0 ? ["all"] : newValues;
      } else {
        return [...prev, value];
      }
    });
  };
  
  // Filter topics based on search and difficulty
  const filteredTopics = allTopics.filter(topic => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply difficulty filter
    const matchesDifficulty = selectedDifficulty.includes("all") || 
      selectedDifficulty.includes(topic.difficulty);
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <main className="container mx-auto px-4 py-16 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Learning Topics</h1>
        <p className="text-lg text-muted-foreground">
          Browse all available learning paths and start your journey
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search topics..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 min-w-[180px]">
              <Filter className="h-4 w-4" />
              <span>Difficulty</span>
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            {difficultyOptions.map(option => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedDifficulty.includes(option.value)}
                onCheckedChange={() => handleDifficultyChange(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Topic Grid */}
      {filteredTopics.length > 0 ? (
        <TopicGrid topics={filteredTopics} showFilters={false} />
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No topics found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
      
      {/* Learning Resources Section */}
      <Separator className="my-16" />
      
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Additional Learning Resources</h2>
        <p className="text-muted-foreground mb-8">
          Explore these complementary resources to enhance your learning journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resource Card 1 */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="text-primary mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Documentation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Access detailed documentation for all topics, including API references, examples, and best practices.
            </p>
            <Button variant="outline" className="w-full">
              Browse Documentation
            </Button>
          </div>
          
          {/* Resource Card 2 */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="text-primary mb-4">
              <PenTool className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Practice Exercises</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reinforce your learning with hands-on exercises, challenges, and coding problems for each topic.
            </p>
            <Button variant="outline" className="w-full">
              View Exercises
            </Button>
          </div>
          
          {/* Resource Card 3 */}
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <div className="text-primary mb-4">
              <Layers className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Project Tutorials</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Build real-world projects following our step-by-step tutorials that combine multiple skills.
            </p>
            <Button variant="outline" className="w-full">
              Explore Projects
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 