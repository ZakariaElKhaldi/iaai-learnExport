"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Database, PenTool, LineChart, Layers, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LearningHubHero from '@/components/marketing/LearningHubHero';
import TopicGrid from '@/components/marketing/TopicGrid';
import TutorialCard, { TutorialDifficulty } from '@/components/marketing/TutorialCard';
import CodeExampleCard, { DifficultyLevel as CodeDifficultyLevel } from '@/components/marketing/CodeExampleCard';
import { DifficultyLevel } from '@/components/marketing/TopicCard';
import { CodeLanguage } from '@/components/marketing/CodeExampleCard';

// Sample topics data
const sampleTopics = [
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
];

// Sample featured tutorials data
const featuredTutorials = [
  {
    id: "101",
    slug: "javascript-async-await",
    topicSlug: "javascript",
    title: "Mastering Async/Await in JavaScript",
    description: "Learn how to write asynchronous code that's more readable and easier to maintain.",
    difficulty: "intermediate" as TutorialDifficulty,
    durationMinutes: 25,
    hasInteractiveExamples: true,
  },
  {
    id: "102",
    slug: "react-hooks-intro",
    topicSlug: "reactjs",
    title: "Introduction to React Hooks",
    description: "Discover how to use React Hooks to manage state and side effects in functional components.",
    difficulty: "intermediate" as TutorialDifficulty,
    durationMinutes: 30,
    hasInteractiveExamples: true,
  },
  {
    id: "103",
    slug: "python-data-visualization",
    topicSlug: "python",
    title: "Data Visualization with Python",
    description: "Create compelling visualizations using matplotlib and seaborn libraries.",
    difficulty: "beginner" as TutorialDifficulty,
    durationMinutes: 40,
    hasInteractiveExamples: true,
  },
];

// Sample popular examples data
const popularExamples = [
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
    difficulty: "intermediate" as CodeDifficultyLevel,
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
    difficulty: "beginner" as CodeDifficultyLevel,
    tags: ["Python", "Pandas", "Data Analysis"],
  },
];

export default function LearningHubPage() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real app, this would navigate to search results
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <LearningHubHero
        title="Master New Skills with Free Tutorials"
        subtitle="Explore our comprehensive library of tutorials, examples, and resources to enhance your knowledge and skills."
        onSearch={handleSearch}
        backgroundImage="/images/learning-hub-bg.jpg"
      />

      {/* Main Content (with top padding to account for fixed header) */}
      <div className="container mx-auto px-4 py-16 pt-24 flex-grow">
        {/* Topics Grid */}
        <section className="mb-16">
          <TopicGrid 
            topics={sampleTopics}
            title="Popular Learning Topics"
            subtitle="Discover our most popular learning paths and start your journey"
            showFilters={true}
            showViewAll={true}
          />
        </section>

        {/* Getting Started Section */}
        <section className="mb-16 bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">New to Coding? Start Here</h2>
            <p className="text-muted-foreground mb-8">
              If you're new to programming, these beginner-friendly tutorials will help you get started with the fundamentals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose a language</h3>
                <p className="text-sm text-muted-foreground">
                  Start with Python or JavaScript, both beginner-friendly languages with wide applications.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Follow tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Work through step-by-step tutorials that teach concepts with practical examples.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Practice coding</h3>
                <p className="text-sm text-muted-foreground">
                  Use our interactive code editor to practice and experiment with what you've learned.
                </p>
              </div>
            </div>
            
            <Button asChild size="lg">
              <Link href="/learn/topics/javascript">
                Start with JavaScript
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="ml-4">
              <Link href="/learn/topics/python">
                Try Python
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Tutorials Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Tutorials</h2>
              <p className="text-muted-foreground mt-1">Hand-picked tutorials to level up your skills</p>
            </div>
            <Link 
              href="/learn/topics" 
              className="flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
            >
              Browse all tutorials
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                id={tutorial.id}
                slug={tutorial.slug}
                topicSlug={tutorial.topicSlug}
                title={tutorial.title}
                description={tutorial.description}
                difficulty={tutorial.difficulty}
                durationMinutes={tutorial.durationMinutes}
                hasInteractiveExamples={tutorial.hasInteractiveExamples}
              />
            ))}
          </div>
        </section>

        {/* Popular Examples Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Popular Code Examples</h2>
              <p className="text-muted-foreground mt-1">Try out these interactive examples in our code playground</p>
            </div>
            <Link 
              href="/learn/examples" 
              className="flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
            >
              Browse all examples
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {popularExamples.map((example) => (
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
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 p-8 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Learners Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">JD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-xs text-muted-foreground">Web Developer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The JavaScript tutorials are incredibly clear and practical. I was able to apply what I learned immediately in my projects."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">AS</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Alex Smith</h4>
                  <p className="text-xs text-muted-foreground">Data Analyst</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The Python data analysis tutorials helped me transition into a data science role. The examples are real-world and relevant."
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">MJ</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Maria Johnson</h4>
                  <p className="text-xs text-muted-foreground">UX Designer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "The interactive examples make learning so much easier. Being able to experiment with code in real-time has been a game-changer."
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Your Skills to the Next Level?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our premium courses provide in-depth knowledge with hands-on projects, expert guidance, and certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/courses">Explore Premium Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 hover:bg-white/10">
              <Link href="/consultations">Book a Consultation</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
} 