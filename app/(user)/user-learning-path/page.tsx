"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { BookOpen, ChevronRight, Clock, GraduationCap, Star, Trophy, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function LearningPathPage() {
  const [pathLevel, setPathLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  // Map path level to colors
  const pathColors = {
    beginner: {
      primary: 'from-green-500/20 to-emerald-400/5',
      accent: 'bg-green-100',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-800',
      progress: 'bg-green-500'
    },
    intermediate: {
      primary: 'from-blue-500/20 to-blue-400/5',
      accent: 'bg-blue-100',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      progress: 'bg-blue-600'
    },
    advanced: {
      primary: 'from-purple-500/20 to-violet-400/5',
      accent: 'bg-purple-100',
      icon: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800',
      progress: 'bg-purple-600'
    }
  };
  
  const currentColors = pathColors[pathLevel];
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 md:py-8 space-y-8">
      {/* Header with path selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${currentColors.accent}`}>
            <GraduationCap className={`h-6 w-6 ${currentColors.icon}`} />
          </div>
          <h2 className="text-xl font-semibold">Learning Path</h2>
        </div>
        
        <div className="inline-flex p-1 bg-slate-100 rounded-lg shadow-sm">
          <Button 
            variant={pathLevel === 'beginner' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('beginner')}
            className={pathLevel === 'beginner' ? 'bg-white text-green-700 shadow-sm' : ''}
          >
            Beginner
          </Button>
          <Button 
            variant={pathLevel === 'intermediate' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('intermediate')}
            className={pathLevel === 'intermediate' ? 'bg-white text-blue-700 shadow-sm' : ''}
          >
            Intermediate
          </Button>
          <Button 
            variant={pathLevel === 'advanced' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setPathLevel('advanced')}
            className={pathLevel === 'advanced' ? 'bg-white text-purple-700 shadow-sm' : ''}
          >
            Advanced
          </Button>
        </div>
      </div>

      {/* Progress overview */}
      <Card className="overflow-hidden shadow-md border-none">
        <div className={`bg-gradient-to-r ${currentColors.primary}`}>
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex items-start gap-5">
                <div className={`${currentColors.accent} p-4 rounded-2xl shrink-0`}>
                  <GraduationCap className={`h-10 w-10 ${currentColors.icon}`} />
                </div>
                <div>
                  <Badge className={`mb-2 ${currentColors.badge}`}>
                    {pathLevel.charAt(0).toUpperCase() + pathLevel.slice(1)}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-1">Frontend Development Path</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>32% Complete</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>12 of 38 lessons completed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 self-stretch md:self-center">
                <Button variant="outline" className="gap-2 border-slate-300 flex-1 md:flex-none">
                  <Clock className="h-4 w-4" />
                  History
                </Button>
                <Button className={`gap-2 flex-1 md:flex-none ${
                  pathLevel === 'beginner' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : pathLevel === 'intermediate'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}>
                  Continue Learning
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Your progress</span>
                <span>32%</span>
              </div>
              <div className="bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${currentColors.progress}`} 
                  style={{ width: '32%' }}
                ></div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Learning modules */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Current Modules</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-slate-600">
            View all modules
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "HTML & CSS Fundamentals",
              description: "Learn the basics of web structure and styling",
              progress: 80,
              lessons: 8,
              completed: 6,
              icon: <BookOpen className="h-5 w-5" />,
              label: "In progress",
              lastAccessed: "2 days ago"
            },
            {
              title: "JavaScript Essentials",
              description: "Master the core concepts of JavaScript",
              progress: 45,
              lessons: 12,
              completed: 5,
              icon: <BookOpen className="h-5 w-5" />,
              label: "Active",
              lastAccessed: "Today"
            },
            {
              title: "Responsive Web Design",
              description: "Create websites that work on any device",
              progress: 10,
              lessons: 6,
              completed: 1,
              icon: <BookOpen className="h-5 w-5" />,
              label: "Just started",
              lastAccessed: "Yesterday"
            }
          ].map((module, i) => (
            <Card 
              key={i} 
              className="group hover:shadow-md transition-all border cursor-pointer"
            >
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${currentColors.accent} p-2.5 rounded-lg transition-transform group-hover:scale-110`}>
                    {module.icon}
                  </div>
                  <Badge variant="outline" className={`text-xs font-normal ${
                    module.progress > 75 ? 'border-green-200 text-green-700 bg-green-50' :
                    module.progress > 25 ? 'border-blue-200 text-blue-700 bg-blue-50' :
                    'border-amber-200 text-amber-700 bg-amber-50'
                  }`}>
                    {module.label}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-medium mb-1 group-hover:text-blue-600 transition-colors">{module.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{module.description}</p>
                
                <div className="flex items-center text-xs text-slate-500 mb-3">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  <span>Last accessed: {module.lastAccessed}</span>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium">{module.completed}/{module.lessons} lessons</span>
                    <span className="text-xs font-medium">{module.progress}%</span>
                  </div>
                  <div className="bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        module.progress > 75 ? 'bg-green-500' :
                        module.progress > 25 ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-5">Your Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="hover:shadow-md transition-all group cursor-pointer">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-400/5 p-6 flex items-center gap-5 h-full">
                <div className="p-3 rounded-xl bg-amber-100 group-hover:scale-110 transition-transform">
                  <Trophy className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <span className="text-sm text-amber-700">Completed</span>
                  <h3 className="text-2xl font-bold text-amber-900">3 Courses</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all group cursor-pointer">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-400/5 p-6 flex items-center gap-5 h-full">
                <div className="p-3 rounded-xl bg-blue-100 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-blue-700">Learning Time</span>
                  <h3 className="text-2xl font-bold text-blue-900">24 Hours</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all group cursor-pointer">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-500/20 to-green-400/5 p-6 flex items-center gap-5 h-full">
                <div className="p-3 rounded-xl bg-green-100 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <span className="text-sm text-green-700">Earned</span>
                  <h3 className="text-2xl font-bold text-green-900">450 Points</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recommended next steps */}
      <div>
        <h2 className="text-xl font-semibold mb-5">Recommended Next Steps</h2>
        
        <div className="space-y-3">
          {[
            {
              title: "Complete JavaScript Basics",
              description: "Finish the remaining 7 lessons in JavaScript Essentials",
              icon: <BookOpen className="h-5 w-5" />,
              urgency: "high",
              estimate: "3-4 hours"
            },
            {
              title: "Take Front-end Assessment",
              description: "Test your knowledge with a comprehensive quiz",
              icon: <BookOpen className="h-5 w-5" />,
              urgency: "medium",
              estimate: "1 hour"
            },
            {
              title: "Start React Framework Course",
              description: "Begin the introduction to React development",
              icon: <BookOpen className="h-5 w-5" />,
              urgency: "low",
              estimate: "8-10 hours"
            }
          ].map((step, i) => (
            <Card 
              key={i} 
              className="hover:shadow-md cursor-pointer transition-all group overflow-hidden border"
            >
              <CardContent className="p-0">
                <div className={`p-4 flex items-center justify-between relative ${
                  i === 0 ? 'border-l-4 border-l-amber-500' :
                  i === 1 ? 'border-l-4 border-l-blue-500' :
                  'border-l-4 border-l-green-500'
                }`}>
                  <div className="flex gap-4 items-center">
                    <div className={`p-2.5 rounded-lg ${
                      i === 0 ? 'bg-amber-100' :
                      i === 1 ? 'bg-blue-100' :
                      'bg-green-100'
                    } group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <Badge variant="outline" className="text-xs font-normal">
                          Est. {step.estimate}
                        </Badge>
                        <span className={`text-xs ${
                          step.urgency === 'high' ? 'text-amber-600' :
                          step.urgency === 'medium' ? 'text-blue-600' :
                          'text-green-600'
                        }`}>
                          {step.urgency.charAt(0).toUpperCase() + step.urgency.slice(1)} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 