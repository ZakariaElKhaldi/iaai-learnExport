"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Clock, GraduationCap, Star, Trophy } from "lucide-react";

export default function LearningPathPage() {
  const [pathLevel, setPathLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Learning Path</h1>
          <p className="text-muted-foreground">Track your progress and plan your learning journey</p>
        </div>
        
        <div className="inline-flex p-1 bg-muted rounded-lg">
          <Button 
            variant={pathLevel === 'beginner' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('beginner')}
          >
            Beginner
          </Button>
          <Button 
            variant={pathLevel === 'intermediate' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('intermediate')}
          >
            Intermediate
          </Button>
          <Button 
            variant={pathLevel === 'advanced' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('advanced')}
          >
            Advanced
          </Button>
        </div>
      </div>

      {/* Progress overview */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Frontend Development Path</h2>
                <p className="text-muted-foreground">32% Complete • 12 of 38 lessons completed</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                History
              </Button>
              <Button className="gap-2">
                Continue Learning
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-muted h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '32%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning modules */}
      <h2 className="text-lg font-medium mb-4">Current Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "HTML & CSS Fundamentals",
            description: "Learn the basics of web structure and styling",
            progress: 80,
            lessons: 8,
            completed: 6,
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            title: "JavaScript Essentials",
            description: "Master the core concepts of JavaScript",
            progress: 45,
            lessons: 12,
            completed: 5,
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            title: "Responsive Web Design",
            description: "Create websites that work on any device",
            progress: 10,
            lessons: 6,
            completed: 1,
            icon: <BookOpen className="h-5 w-5" />
          }
        ].map((module, i) => (
          <Card key={i} className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {module.icon}
                </div>
                <span className="text-sm font-medium">
                  {module.completed}/{module.lessons} lessons
                </span>
              </div>
              
              <h3 className="text-lg font-medium mb-1">{module.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium">{module.progress}% complete</span>
                </div>
                <div className="bg-muted h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-lg font-medium mb-4">Your Achievements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <Trophy className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Completed</span>
              <h3 className="text-xl font-bold">3 Courses</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Learning Time</span>
              <h3 className="text-xl font-bold">24 Hours</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Earned</span>
              <h3 className="text-xl font-bold">450 Points</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommended next steps */}
      <h2 className="text-lg font-medium mb-4">Recommended Next Steps</h2>
      
      <div className="space-y-4 mb-8">
        {[
          {
            title: "Complete JavaScript Basics",
            description: "Finish the remaining 7 lessons in JavaScript Essentials",
            icon: <ChevronRight className="h-5 w-5" />
          },
          {
            title: "Take Front-end Assessment",
            description: "Test your knowledge with a comprehensive quiz",
            icon: <ChevronRight className="h-5 w-5" />
          },
          {
            title: "Start React Framework Course",
            description: "Begin the introduction to React development",
            icon: <ChevronRight className="h-5 w-5" />
          }
        ].map((step, i) => (
          <Card key={i} className="shadow-sm hover:shadow cursor-pointer transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {step.icon}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 