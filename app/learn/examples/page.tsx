"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Code, Database, PenTool, Filter, ChevronDown, Tag, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

// Example categories with sample code examples
const categories = [
  {
    id: "html",
    name: "HTML",
    icon: Code,
    color: "#E44D26",
  },
  {
    id: "css",
    name: "CSS",
    icon: PenTool,
    color: "#264de4",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: Code,
    color: "#F7DF1E",
  },
  {
    id: "python",
    name: "Python",
    icon: Code,
    color: "#3776AB",
  },
  {
    id: "sql",
    name: "SQL",
    icon: Database,
    color: "#F29111",
  },
];

// Sample examples
const examples: Example[] = [
  {
    id: "html-1",
    title: "Basic HTML Document",
    description: "A simple HTML document with basic elements",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>`,
    category: "html",
    tags: ["html", "basics", "structure"],
    difficulty: "beginner"
  },
  {
    id: "html-2",
    title: "HTML Images",
    description: "How to display images in HTML",
    code: `<!DOCTYPE html>
<html>
<body>
  <h2>HTML Images</h2>
  <img src="example.jpg" alt="Example Image" width="500" height="333">
  <p>The image above is 500px wide and 333px high.</p>
</body>
</html>`,
    category: "html",
    tags: ["html", "images", "elements"],
    difficulty: "beginner"
  },
  {
    id: "html-3",
    title: "HTML Links",
    description: "Creating hyperlinks in HTML",
    code: `<!DOCTYPE html>
<html>
<body>
  <h2>HTML Links</h2>
  <p>This is a link to <a href="https://www.example.com">Example.com</a></p>
  <p>Open link in new tab: <a href="https://www.example.com" target="_blank">Example.com</a></p>
</body>
</html>`,
    category: "html",
    tags: ["html", "links", "elements"],
    difficulty: "beginner"
  },
  {
    id: "css-1",
    title: "CSS Box Model",
    description: "Understanding the CSS box model",
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  div {
    background-color: lightblue;
    width: 300px;
    padding: 25px;
    border: 5px solid navy;
    margin: 25px;
  }
</style>
</head>
<body>
  <h2>CSS Box Model</h2>
  <div>This element has padding, border, and margin.</div>
</body>
</html>`,
    category: "css",
    tags: ["css", "box model", "layout"],
    difficulty: "beginner"
  },
  {
    id: "css-2",
    title: "CSS Flexbox",
    description: "Creating flexible layouts with Flexbox",
    code: `<!DOCTYPE html>
<html>
<head>
<style>
  .flex-container {
    display: flex;
    background-color: #f1f1f1;
    flex-wrap: wrap;
  }
  
  .flex-container > div {
    background-color: DodgerBlue;
    color: white;
    width: 100px;
    margin: 10px;
    text-align: center;
    line-height: 75px;
    font-size: 24px;
  }
</style>
</head>
<body>
  <h2>CSS Flexbox</h2>
  <div class="flex-container">
    <div>1</div>
    <div>2</div>
    <div>3</div>  
    <div>4</div>
  </div>
</body>
</html>`,
    category: "css",
    tags: ["css", "flexbox", "layout"],
    difficulty: "intermediate"
  },
  {
    id: "js-1",
    title: "JavaScript Variables",
    description: "Declaring and using variables in JavaScript",
    code: `<!DOCTYPE html>
<html>
<body>
  <h2>JavaScript Variables</h2>
  
  <p id="demo"></p>
  
  <script>
    // Using let (block-scoped variable)
    let x = 5;
    let y = 6;
    let z = x + y;
    
    // Using const (constant)
    const name = "John";
    
    document.getElementById("demo").innerHTML =
    "The value of z is " + z + " and the name is " + name;
  </script>
</body>
</html>`,
    category: "javascript",
    tags: ["javascript", "variables", "basics"],
    difficulty: "beginner"
  },
  {
    id: "js-2",
    title: "JavaScript Functions",
    description: "Creating and calling functions in JavaScript",
    code: `<!DOCTYPE html>
<html>
<body>
  <h2>JavaScript Functions</h2>
  
  <button onclick="showMessage()">Click me</button>
  
  <p id="demo"></p>
  
  <script>
    // Function declaration
    function showMessage() {
      document.getElementById("demo").innerHTML = "Hello! You clicked the button.";
    }
    
    // Function with parameters
    function add(a, b) {
      return a + b;
    }
    
    // Arrow function
    const multiply = (a, b) => a * b;
  </script>
</body>
</html>`,
    category: "javascript",
    tags: ["javascript", "functions", "basics"],
    difficulty: "beginner"
  },
  {
    id: "python-1",
    title: "Python Basics",
    description: "Basic Python syntax and operations",
    code: `# Basic Python Syntax Example

# Variables and types
name = "John"
age = 25
height = 1.85
is_student = True

# Print values
print("Name:", name)
print("Age:", age)
print("Height:", height)
print("Is student:", is_student)

# Simple calculation
years_remaining = 65 - age
print("Years until retirement:", years_remaining)

# Conditional statement
if age < 30:
    print("You are young!")
else:
    print("You are getting older...")`,
    category: "python",
    tags: ["python", "basics", "variables"],
    difficulty: "beginner"
  },
  {
    id: "sql-1",
    title: "SQL SELECT Statement",
    description: "Basic SQL SELECT queries",
    code: `-- Basic SELECT statement
SELECT * FROM Customers;

-- SELECT with column specification
SELECT CustomerName, ContactName, Country 
FROM Customers;

-- SELECT with WHERE clause
SELECT * FROM Customers
WHERE Country = 'Germany';

-- SELECT with ORDER BY 
SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;

-- SELECT with LIMIT
SELECT * FROM Customers
LIMIT 5;`,
    category: "sql",
    tags: ["sql", "select", "query"],
    difficulty: "beginner"
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

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>(["all"]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(new Set(examples.flatMap(example => example.tags)));
  
  // Handle difficulty filter changes
  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(prev => {
      if (value === "all") {
        return ["all"];
      }
      
      if (prev.includes("all")) {
        return [value];
      }
      
      if (prev.includes(value)) {
        const newValues = prev.filter(item => item !== value);
        return newValues.length === 0 ? ["all"] : newValues;
      } else {
        return [...prev, value];
      }
    });
  };
  
  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  // Filter examples based on filters
  const getFilteredExamples = () => {
    return examples.filter(example => {
      // Apply category filter
      const matchesCategory = selectedCategory === "all" || example.category === selectedCategory;
      
      // Apply search filter
      const matchesSearch = searchQuery === "" || 
        example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply difficulty filter
      const matchesDifficulty = selectedDifficulty.includes("all") || 
        selectedDifficulty.includes(example.difficulty);
      
      // Apply tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => example.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesDifficulty && matchesTags;
    });
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const filteredExamples = getFilteredExamples();
  
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Code Examples</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Browse our collection of code examples to learn by example
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search examples..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Difficulty</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>Tags</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
              {allTags.map(tag => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagSelect(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tab Navigation by Category */}
      <Tabs 
        defaultValue="all" 
        value={selectedCategory} 
        onValueChange={setSelectedCategory}
      >
        <TabsList className="w-full flex overflow-x-auto mb-8 justify-start">
          <TabsTrigger value="all" className="min-w-max">
            All Examples
          </TabsTrigger>
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
      </Tabs>
      
      {/* Examples List */}
      {filteredExamples.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 mb-8">
          {filteredExamples.map((example) => (
            <Card key={example.id} className="overflow-hidden">
              <div className="p-6 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{example.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      {example.description}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${getDifficultyBadgeClass(example.difficulty)}`}>
                    {example.difficulty.charAt(0).toUpperCase() + example.difficulty.slice(1)}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <pre className="bg-slate-100 dark:bg-slate-900 border-y p-4 overflow-x-auto text-sm">
                  <code>{example.code}</code>
                </pre>
                <button
                  onClick={() => handleCopyCode(example.id, example.code)}
                  className="absolute top-3 right-3 p-1.5 rounded-md bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border"
                  aria-label="Copy code"
                >
                  {copiedId === example.id ? 
                    <Check className="h-4 w-4 text-green-500" /> : 
                    <Copy className="h-4 w-4" />
                  }
                </button>
              </div>
              
              <CardFooter className="flex justify-between p-4">
                <Button 
                  asChild 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  <Link href={`/learn/${example.category}`}>
                    View {categories.find(c => c.id === example.category)?.name} Tutorial
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/learn/examples/${example.id}`} className="flex items-center gap-1.5">
                    Try it Yourself
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-slate-50 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No examples match your filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDifficulty(["all"]);
              setSelectedTags([]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
} 