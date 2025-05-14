"use client";

import React from 'react';
import { ChevronDown, Filter, Search, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import CodeExampleCard, { CodeLanguage, DifficultyLevel } from '@/components/marketing/CodeExampleCard';

// Sample code examples data
const codeExamples = [
  {
    id: "201",
    title: "Interactive Todo App",
    description: "A complete todo application with React hooks and local storage.",
    code: `import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setTodos([...todos, { 
      id: Date.now(), 
      text: input, 
      completed: false 
    }]);
    setInput('');
  };

  // ... more code ...
}`,
    language: "javascript" as CodeLanguage,
    difficulty: "intermediate" as DifficultyLevel,
    tags: ["React", "Hooks", "Frontend"],
  },
  {
    id: "202",
    title: "Python Data Analysis",
    description: "Analyze a dataset using pandas with practical examples.",
    code: `import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv('sales_data.csv')

# Display basic information
print(df.info())
print(df.describe())

# Clean the data
df = df.dropna()
df['date'] = pd.to_datetime(df['date'])

# Group by month and calculate sales
monthly_sales = df.groupby(df['date'].dt.strftime('%Y-%m')).sum()

# Plot the results
plt.figure(figsize=(12, 6))
monthly_sales['revenue'].plot(kind='bar')
plt.title('Monthly Sales Revenue')
plt.ylabel('Revenue ($)')
plt.xlabel('Month')
plt.tight_layout()
plt.show()`,
    language: "python" as CodeLanguage,
    difficulty: "beginner" as DifficultyLevel,
    tags: ["Python", "Pandas", "Data Analysis"],
  },
  {
    id: "203",
    title: "Node.js REST API",
    description: "Create a RESTful API with Express.js, including routes and middleware.",
    code: `const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    language: "javascript" as CodeLanguage,
    difficulty: "intermediate" as DifficultyLevel,
    tags: ["Node.js", "Express", "API", "Backend"],
  },
  {
    id: "204",
    title: "CSS Flexbox Layout",
    description: "Learn how to create responsive layouts using CSS Flexbox.",
    code: `.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.card {
  flex: 1 1 300px;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.content {
  line-height: 1.5;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .card {
    max-width: 100%;
  }
}`,
    language: "css" as CodeLanguage,
    difficulty: "beginner" as DifficultyLevel,
    tags: ["CSS", "Flexbox", "Responsive Design"],
  },
  {
    id: "205",
    title: "Java Spring REST Controller",
    description: "Create a RESTful controller in Spring Boot for a user resource.",
    code: `package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        Optional<User> existingUser = userService.findById(id);
        if (existingUser.isPresent()) {
            user.setId(id);
            return new ResponseEntity<>(userService.save(user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            userService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}`,
    language: "java" as CodeLanguage,
    difficulty: "advanced" as DifficultyLevel,
    tags: ["Java", "Spring Boot", "REST API"],
  },
  {
    id: "206",
    title: "TypeScript Interface & Generic Types",
    description: "Learn how to use TypeScript interfaces and generics for type-safe code.",
    code: `// Define interfaces for our domain models
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

// Generic repository interface
interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

// Implementation for User repository
class UserRepository implements Repository<User> {
  private users: User[] = [];
  
  async findAll(): Promise<User[]> {
    return [...this.users];
  }
  
  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
  
  async create(entity: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...entity,
      id: Date.now(),
    };
    
    this.users.push(newUser);
    return newUser;
  }
  
  async update(id: number, entity: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    const updatedUser = {
      ...this.users[index],
      ...entity
    };
    
    this.users[index] = updatedUser;
    return updatedUser;
  }
  
  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }
}`,
    language: "typescript" as CodeLanguage,
    difficulty: "intermediate" as DifficultyLevel,
    tags: ["TypeScript", "Interfaces", "Generics"],
  },
];

// Get all unique tags from examples
const allTags = Array.from(
  new Set(
    codeExamples.flatMap(example => example.tags || [])
  )
).sort();

// Get all languages used in examples
const allLanguages = Array.from(
  new Set(
    codeExamples.map(example => example.language)
  )
).sort();

const difficultyOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function CodeExamplesPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string[]>(["all"]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle language filter change
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
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
  
  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLanguage("all");
    setSelectedDifficulty(["all"]);
    setSelectedTags([]);
  };
  
  // Filter examples based on all criteria
  const filteredExamples = codeExamples.filter(example => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply language filter
    const matchesLanguage = selectedLanguage === "all" || example.language === selectedLanguage;
    
    // Apply difficulty filter
    const matchesDifficulty = selectedDifficulty.includes("all") || 
      selectedDifficulty.includes(example.difficulty);
    
    // Apply tag filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => example.tags?.includes(tag));
    
    return matchesSearch && matchesLanguage && matchesDifficulty && matchesTags;
  });

  return (
    <main className="container mx-auto px-4 py-16 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Interactive Code Examples</h1>
        <p className="text-lg text-muted-foreground">
          Browse and run code examples in our interactive playground
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search examples..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {allLanguages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
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
        
        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Active filters summary and clear button */}
        {(searchQuery || selectedLanguage !== "all" || !selectedDifficulty.includes("all") || selectedTags.length > 0) && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{filteredExamples.length}</span> examples found
              {selectedLanguage !== "all" && (
                <span className="ml-1">in <span className="font-medium">{selectedLanguage}</span></span>
              )}
              {!selectedDifficulty.includes("all") && (
                <span className="ml-1">with difficulty <span className="font-medium">{selectedDifficulty.join(", ")}</span></span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Code Examples Grid */}
      {filteredExamples.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredExamples.map(example => (
            <CodeExampleCard
              key={example.id}
              id={example.id}
              title={example.title}
              description={example.description}
              code={example.code}
              language={example.language}
              difficulty={example.difficulty}
              tags={example.tags}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 mb-16">
          <h3 className="text-xl font-medium mb-2">No examples found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
        </div>
      )}
      
      {/* Submit Example Section */}
      <Separator className="my-16" />
      
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Submit Your Code Example</h2>
        <p className="text-muted-foreground mb-8">
          Have a useful code snippet to share with the community? Submit your example and help others learn!
        </p>
        <Button size="lg">Submit an Example</Button>
      </section>
    </main>
  );
} 