"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronDown, Code, Database, PenTool, Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  exercises: Exercise[];
}

// Exercise categories with sample exercises
const categories: Category[] = [
  {
    id: "html",
    name: "HTML",
    icon: Code,
    color: "#E44D26",
    exercises: [
      {
        id: "html-1",
        title: "HTML Elements",
        description: "Practice adding basic HTML elements to a document",
        difficulty: "beginner",
        completed: true
      },
      {
        id: "html-2",
        title: "HTML Attributes",
        description: "Learn how to use HTML attributes to modify elements",
        difficulty: "beginner"
      },
      {
        id: "html-3",
        title: "HTML Lists",
        description: "Create ordered and unordered lists in HTML",
        difficulty: "beginner"
      },
      {
        id: "html-4",
        title: "HTML Tables",
        description: "Build and structure tables using HTML",
        difficulty: "intermediate"
      },
      {
        id: "html-5",
        title: "HTML Forms",
        description: "Create input forms with various field types",
        difficulty: "intermediate"
      },
      {
        id: "html-6",
        title: "HTML Semantic Elements",
        description: "Use semantic elements to improve page structure",
        difficulty: "intermediate"
      },
      {
        id: "html-7",
        title: "HTML5 Audio and Video",
        description: "Embed media content in your HTML pages",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: "css",
    name: "CSS",
    icon: PenTool,
    color: "#264de4",
    exercises: [
      {
        id: "css-1",
        title: "CSS Selectors",
        description: "Practice using different types of CSS selectors",
        difficulty: "beginner",
        completed: true
      },
      {
        id: "css-2",
        title: "CSS Box Model",
        description: "Work with margins, padding, and borders",
        difficulty: "beginner"
      },
      {
        id: "css-3",
        title: "CSS Colors and Backgrounds",
        description: "Apply colors and background styles to elements",
        difficulty: "beginner"
      },
      {
        id: "css-4",
        title: "CSS Layout with Flexbox",
        description: "Create flexible layouts using Flexbox",
        difficulty: "intermediate"
      },
      {
        id: "css-5",
        title: "CSS Grid Layout",
        description: "Build complex grid-based layouts",
        difficulty: "intermediate"
      },
      {
        id: "css-6",
        title: "CSS Transitions and Animations",
        description: "Create smooth transitions and engaging animations",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: Code,
    color: "#F7DF1E",
    exercises: [
      {
        id: "js-1",
        title: "JavaScript Variables",
        description: "Declare and use variables in JavaScript",
        difficulty: "beginner"
      },
      {
        id: "js-2",
        title: "JavaScript Functions",
        description: "Create and call functions in JavaScript",
        difficulty: "beginner"
      },
      {
        id: "js-3",
        title: "JavaScript Arrays",
        description: "Work with arrays and array methods",
        difficulty: "beginner"
      },
      {
        id: "js-4",
        title: "JavaScript DOM Manipulation",
        description: "Modify HTML elements using JavaScript",
        difficulty: "intermediate"
      },
      {
        id: "js-5",
        title: "JavaScript Events",
        description: "Handle user interactions with event listeners",
        difficulty: "intermediate"
      },
      {
        id: "js-6",
        title: "JavaScript Promises",
        description: "Work with asynchronous code using Promises",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: "python",
    name: "Python",
    icon: Code,
    color: "#3776AB",
    exercises: [
      {
        id: "py-1",
        title: "Python Basics",
        description: "Practice Python syntax and basic operations",
        difficulty: "beginner"
      },
      {
        id: "py-2",
        title: "Python Functions",
        description: "Define and call functions in Python",
        difficulty: "beginner"
      },
      {
        id: "py-3",
        title: "Python Lists and Dictionaries",
        description: "Work with Python data structures",
        difficulty: "beginner"
      },
      {
        id: "py-4",
        title: "Python File Handling",
        description: "Read and write files in Python",
        difficulty: "intermediate"
      },
      {
        id: "py-5",
        title: "Python Classes and Objects",
        description: "Create object-oriented programs in Python",
        difficulty: "intermediate"
      }
    ]
  },
  {
    id: "sql",
    name: "SQL",
    icon: Database,
    color: "#F29111",
    exercises: [
      {
        id: "sql-1",
        title: "SQL SELECT Statements",
        description: "Query data from a database using SELECT",
        difficulty: "beginner"
      },
      {
        id: "sql-2",
        title: "SQL Filtering Data",
        description: "Filter query results with WHERE clauses",
        difficulty: "beginner"
      },
      {
        id: "sql-3",
        title: "SQL JOIN Operations",
        description: "Combine data from multiple tables using JOINs",
        difficulty: "intermediate"
      },
      {
        id: "sql-4",
        title: "SQL Aggregation",
        description: "Use aggregate functions to summarize data",
        difficulty: "intermediate"
      }
    ]
  }
];

const difficultyOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const getDifficultyBadgeClass = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'advanced':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ExercisesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(["all"]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter exercises based on search and difficulty
  const getFilteredExercises = (categoryExercises: Exercise[]) => {
    return categoryExercises.filter(exercise => {
      // Apply search filter
      const matchesSearch = searchQuery === "" || 
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply difficulty filter
      const matchesDifficulty = selectedDifficulty.includes("all") || 
        selectedDifficulty.includes(exercise.difficulty);
      
      return matchesSearch && matchesDifficulty;
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coding Exercises</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Practice your coding skills with these interactive exercises
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search exercises..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      
      {/* Tab Navigation by Category */}
      <Tabs defaultValue={categories[0].id}>
        <TabsList className="w-full flex overflow-x-auto mb-8 justify-start">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="min-w-max"
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Exercise Lists by Category */}
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredExercises(category.exercises).length > 0 ? (
                getFilteredExercises(category.exercises).map(exercise => (
                  <Link 
                    key={exercise.id} 
                    href={`/learn/${category.id}/exercises/${exercise.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{exercise.title}</CardTitle>
                          {exercise.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between pt-0">
                        <div>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full ${getDifficultyBadgeClass(exercise.difficulty)}`}>
                            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button size="sm" className="w-full">Start Exercise</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">No exercises match your filters</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDifficulty(["all"]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Banner for Creating Account */}
      <div className="mt-16 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Create a free account to save your progress, unlock more exercises, and earn certificates as you learn
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg">
            Sign Up Free
          </Button>
          <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
} 