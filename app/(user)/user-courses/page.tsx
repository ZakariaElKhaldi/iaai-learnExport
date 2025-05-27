"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  BarChart, 
  Search, 
  Clock,
  BookMarked,
  Calendar,
  ChevronRight,
  Award,
  GraduationCap,
  CheckCircle2,
  ChevronUp,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Visual design constants
const CATEGORY_STYLES = {
  javascript: { 
    bg: 'bg-amber-50', 
    border: 'border-amber-200', 
    icon: 'text-amber-500',
    gradient: 'from-amber-500/20 to-amber-400/5'
  },
  react: { 
    bg: 'bg-cyan-50', 
    border: 'border-cyan-200', 
    icon: 'text-cyan-500',
    gradient: 'from-cyan-500/20 to-cyan-400/5'
  },
  html: { 
    bg: 'bg-orange-50', 
    border: 'border-orange-200', 
    icon: 'text-orange-500',
    gradient: 'from-orange-500/20 to-orange-400/5'
  },
  css: { 
    bg: 'bg-blue-50', 
    border: 'border-blue-200', 
    icon: 'text-blue-500',
    gradient: 'from-blue-500/20 to-blue-400/5'
  },
  default: { 
    bg: 'bg-slate-50', 
    border: 'border-slate-200', 
    icon: 'text-slate-500',
    gradient: 'from-slate-500/20 to-slate-400/5'
  }
};

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Mock course data with visuals
  const inProgressCourses = [
    {
      id: "js-001",
      title: "Advanced JavaScript Patterns",
      module: "Module 4: Advanced Patterns",
      progress: 45,
      lastAccessed: "2 hours ago",
      nextLesson: "Factory Patterns Implementation",
      level: "Intermediate",
      category: "javascript",
      visualIcon: "BookMarked",
      estimatedCompletion: "2 weeks",
      rating: 4.8,
      totalStudents: 1240,
      instructor: "Sarah Johnson"
    },
    {
      id: "react-002",
      title: "React Performance Optimization",
      module: "Module 2: Component Rendering",
      progress: 25,
      lastAccessed: "Yesterday",
      nextLesson: "Memoization Techniques",
      level: "Advanced",
      category: "react",
      visualIcon: "BookMarked",
      estimatedCompletion: "3 weeks",
      rating: 4.9,
      totalStudents: 980,
      instructor: "Michael Chen"
    }
  ];
  
  const completedCourses = [
    {
      id: "html-001",
      title: "HTML & CSS Fundamentals",
      completedDate: "Jan 15, 2023",
      level: "Beginner",
      category: "html",
      visualIcon: "CheckCircle2",
      rating: 4.7,
      totalStudents: 2350,
      instructor: "Alex Rodriguez",
      certificateId: "CERT-HTML-001"
    },
    {
      id: "js-basics",
      title: "JavaScript Basics",
      completedDate: "Mar 22, 2023",
      level: "Beginner",
      category: "javascript",
      visualIcon: "CheckCircle2",
      rating: 4.6,
      totalStudents: 3120,
      instructor: "David Wilson",
      certificateId: "CERT-JS-001"
    },
    {
      id: "responsive-web",
      title: "Responsive Web Design",
      completedDate: "May 5, 2023",
      level: "Intermediate",
      category: "css",
      visualIcon: "CheckCircle2",
      rating: 4.8,
      totalStudents: 1860,
      instructor: "Emma Parker",
      certificateId: "CERT-RWD-001"
    }
  ];

  // Learning stats
  const stats = {
    coursesInProgress: inProgressCourses.length,
    completedCourses: completedCourses.length,
    hoursLearned: 24,
    certificatesEarned: 2
  };

  // Get level badge color
  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  // Get style for a category
  const getCategoryStyle = (category: string) => {
    return CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES.default;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search courses..."
              className="pl-9 h-10 border-slate-200 focus-visible:ring-blue-500 bg-slate-50 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => router.push('/user-explore')}
            className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white"
          >
            Browse More
          </Button>
        </div>
      </div>
      
      {/* Stats Overview - More Visual */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="group hover:shadow-md transition-all">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-400/5 p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="p-3 rounded-full bg-blue-100 mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-blue-700">{stats.coursesInProgress}</h3>
              <p className="text-sm text-blue-700 mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-green-500/20 to-green-400/5 p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="p-3 rounded-full bg-green-100 mb-3 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-700">{stats.completedCourses}</h3>
              <p className="text-sm text-green-700 mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-400/5 p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="p-3 rounded-full bg-purple-100 mb-3 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-purple-700">{stats.hoursLearned}</h3>
              <p className="text-sm text-purple-700 mt-1">Hours Learned</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-400/5 p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="p-3 rounded-full bg-yellow-100 mb-3 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-yellow-700">{stats.certificatesEarned}</h3>
              <p className="text-sm text-yellow-700 mt-1">Certificates</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Course Tabs */}
      <Tabs defaultValue="in-progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        {/* In Progress Courses Tab - More Visual */}
        <TabsContent value="in-progress" className="space-y-6">
          {inProgressCourses.length > 0 ? (
            <div className="grid gap-6">
              {inProgressCourses.map(course => {
                const style = getCategoryStyle(course.category);
                
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all border group">
                    <div className={`bg-gradient-to-r ${style.gradient} border-b ${style.border}`}>
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className={`relative h-28 sm:h-auto sm:w-36 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                              <BookMarked className={`h-12 w-12 ${style.icon}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                                <div>
                                  <h3 className="text-xl font-semibold">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground">{course.module}</p>
                                </div>
                                <Badge className={`self-start sm:self-auto ${getLevelBadgeColor(course.level)}`}>
                                  {course.level}
                                </Badge>
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Next: <span className="font-medium">{course.nextLesson}</span></span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Est. completion: <span className="font-medium">{course.estimatedCompletion}</span></span>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm">{course.rating} ({course.totalStudents} students)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Last accessed: <span className="font-medium">{course.lastAccessed}</span></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-5 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-medium">Progress</span>
                                  <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`absolute top-0 left-0 h-full rounded-full ${course.category === 'javascript' ? 'bg-amber-500' : course.category === 'react' ? 'bg-cyan-500' : 'bg-blue-500'}`}
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="mt-5">
                                <Button 
                                  onClick={() => router.push(`/courses/${course.id}/learn`)}
                                  className={`${course.category === 'javascript' ? 'bg-amber-600 hover:bg-amber-700' : course.category === 'react' ? 'bg-cyan-600 hover:bg-cyan-700' : ''}`}
                                >
                                  Continue Learning
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 flex flex-col items-center text-center">
                <div className="p-6 rounded-full bg-white/70 shadow-sm mb-6">
                  <BookOpen className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3">No courses in progress</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  You haven't started any courses yet. Browse our catalog to find courses that interest you.
                </p>
                <Button 
                  size="lg"
                  onClick={() => router.push('/user-explore')}
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                >
                  Browse Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        {/* Completed Courses Tab - More Visual */}
        <TabsContent value="completed" className="space-y-6">
          {completedCourses.length > 0 ? (
            <div className="grid gap-6">
              {completedCourses.map(course => {
                const style = getCategoryStyle(course.category);
                
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all border group">
                    <div className={`bg-gradient-to-r ${style.gradient} border-b ${style.border}`}>
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className={`relative h-28 sm:h-auto sm:w-36 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                              <div className="relative">
                                <CheckCircle2 className={`h-12 w-12 ${style.icon}`} />
                                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                                <div>
                                  <h3 className="text-xl font-semibold">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                                </div>
                                <Badge className={`self-start sm:self-auto ${getLevelBadgeColor(course.level)}`}>
                                  {course.level}
                                </Badge>
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Completed: <span className="font-medium">{course.completedDate}</span></span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm">Certificate ID: <span className="font-medium">{course.certificateId}</span></span>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm">{course.rating} ({course.totalStudents} students)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-green-600 border-green-200">
                                      100% Complete
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-5 flex gap-3 flex-wrap">
                                <Button 
                                  variant="outline"
                                  onClick={() => router.push(`/courses/${course.id}`)}
                                  className="border-slate-200"
                                >
                                  View Course
                                </Button>
                                <Button 
                                  onClick={() => router.push(`/user-certificates`)}
                                  className="bg-yellow-600 hover:bg-yellow-700"
                                >
                                  View Certificate
                                  <Award className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-10 flex flex-col items-center text-center">
                <div className="p-6 rounded-full bg-white/70 shadow-sm mb-6">
                  <Award className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium mb-3">No completed courses yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Keep learning to complete your enrolled courses and earn certificates.
                </p>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const tabElement = document.querySelector('[data-value="in-progress"]') as HTMLElement;
                    if (tabElement) tabElement.click();
                  }}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  View In-Progress Courses
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
        
        {/* Recommended Courses Tab - More Visual */}
        <TabsContent value="recommended" className="space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-10 flex flex-col items-center text-center">
              <div className="p-6 rounded-full bg-white/70 shadow-sm mb-6">
                <GraduationCap className="h-12 w-12 text-violet-500" />
              </div>
              <h3 className="text-2xl font-medium mb-3">Personalized recommendations coming soon</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We're analyzing your learning patterns to suggest the best courses for you.
              </p>
              <Button 
                size="lg"
                onClick={() => router.push('/user-explore')}
                className="bg-violet-600 hover:bg-violet-700 px-8"
              >
                Browse All Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Call-to-Action Section - More Visual */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-0">
          <CardContent className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="sm:w-1/4 flex justify-center order-2 sm:order-1">
                <div className="p-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="flex-1 text-white order-1 sm:order-2">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to expand your skills?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Explore our learning paths and specialized courses to take your career to the next level.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => router.push('/user-learning-path')} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    View Learning Paths
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/user-certificates')} size="lg" className="border-white/30 text-white hover:bg-white/10">
                    My Certificates
                    <Award className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
} 