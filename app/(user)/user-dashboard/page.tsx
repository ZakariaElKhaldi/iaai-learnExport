"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Award, 
  Clock, 
  BookOpenCheck, 
  BarChart2, 
  Calendar, 
  Bell, 
  Settings, 
  ChevronRight, 
  Zap,
  Search,
  BookMarked,
  BellPlus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Define a cohesive color system with semantic purpose
const colors = {
  // Primary blue - Used for main actions, navigation, and brand identity
  primary: {
    light: "bg-blue-50", 
    medium: "bg-blue-100",
    default: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    border: "border-blue-200",
    gradient: "from-blue-500/20 to-blue-400/10",
    icon: "text-blue-600"
  },
  secondary: {
    // Success green - Used for completion, achievements, positive indicators
    success: {
      light: "bg-emerald-50",
      medium: "bg-emerald-100",
      default: "text-emerald-600", 
      bg: "bg-emerald-600",
      icon: "text-emerald-600",
      border: "border-emerald-200"
    },
    // Warning amber - Used for alerts, deadlines, attention-required items
    warning: {
      light: "bg-amber-50",
      medium: "bg-amber-100",
      default: "text-amber-600",
      bg: "bg-amber-600", 
      icon: "text-amber-600",
      border: "border-amber-200"
    },
    // Info sky blue - Used for informational content, resources, helpful tips
    info: {
      light: "bg-sky-50",
      medium: "bg-sky-100", 
      default: "text-sky-600",
      bg: "bg-sky-600",
      icon: "text-sky-600",
      border: "border-sky-200"
    },
    // Neutral slate - Used for structural elements and non-interactive content
    neutral: {
      light: "bg-slate-50",
      medium: "bg-slate-100", 
      default: "text-slate-600",
      bg: "bg-slate-200",
      icon: "text-slate-600",
      border: "border-slate-200"
    },
    // Highlight violet - Used for important items, special features, attention-grabbers
    highlight: {
      light: "bg-violet-50",
      medium: "bg-violet-100", 
      default: "text-violet-600",
      bg: "bg-violet-600",
      icon: "text-violet-600",
      border: "border-violet-200"
    }
  }
};

// Type definitions for colors
type ColorSet = {
  light: string;
  medium: string;
  default: string;
  bg: string;
  icon: string;
  border: string;
  hover?: string;
  gradient?: string;
};

export default function UserDashboardPage() {
  // State for quick filters
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');
  
  // Mock data for the dashboard
  const courseInProgress = {
    id: "course-1",
    title: "Advanced JavaScript Patterns",
    module: "Module 4: Advanced Patterns",
    progress: 45,
    lessonsCompleted: 5,
    totalLessons: 12,
    level: "Intermediate",
    lastAccessed: "2 hours ago",
    nextLesson: "Factory Patterns Implementation"
  };

  // Statistics data - reorganized to show most important stats first
  const stats = [
    { 
      id: "courses-in-progress", 
      title: "In Progress", 
      value: 2, 
      icon: <BookOpen className={`h-6 w-6 ${colors.primary.icon}`} />,
      change: "+1 this week",
      trend: "up",
      color: "primary" // Primary color for the main learning status
    },
    { 
      id: "hours-learned", 
      title: "Hours Learned", 
      value: 14, 
      icon: <Clock className={`h-6 w-6 ${colors.secondary.info.icon}`} />,
      change: "+3 this week",
      trend: "up",
      color: "info" // Info color for knowledge acquisition metrics
    },
    { 
      id: "completed-courses", 
      title: "Completed", 
      value: 1, 
      icon: <BookOpenCheck className={`h-6 w-6 ${colors.secondary.success.icon}`} />,
      change: "Same as last week",
      trend: "neutral",
      color: "success" // Success color for achievement metrics
    },
    { 
      id: "certificates", 
      title: "Certificates", 
      value: 1, 
      icon: <Award className={`h-6 w-6 ${colors.secondary.highlight.icon}`} />,
      change: "Same as last week",
      trend: "neutral",
      color: "highlight" // Highlight color for special recognition
    }
  ];

  // Recent activity data with added type for color coding
  const recentActivity = [
    {
      id: "activity-1",
      action: "Completed lesson",
      title: "Introduction to Closures",
      course: "Advanced JavaScript Patterns",
      time: "2 hours ago",
      type: "completion" // For color coding
    },
    {
      id: "activity-2",
      action: "Quiz passed",
      title: "JavaScript Fundamentals Quiz",
      course: "Advanced JavaScript Patterns",
      time: "Yesterday",
      type: "achievement" // For color coding
    }
  ];

  // Notification data - prioritized by importance and recency
  const notifications = [
    {
      id: "notif-1",
      type: "module",
      title: "New module released",
      description: "Advanced JavaScript Patterns has a new module available",
      isNew: true,
      time: "2h ago",
      priority: "high",
      category: "content" // For color coding
    },
    {
      id: "notif-3",
      type: "reply",
      title: "Reply to your question",
      description: "An instructor has replied to your question in React Performance Optimization",
      isNew: true,
      time: "1d ago",
      priority: "high",
      category: "interaction" // For color coding
    },
    {
      id: "notif-2",
      type: "certificate",
      title: "Certificate ready",
      description: "Your certificate for CSS Fundamentals is ready to download",
      isNew: false,
      time: "3d ago",
      priority: "medium",
      category: "achievement" // For color coding
    }
  ];

  // In-progress courses data for tab content
  const inProgressCoursesData = [
    {
      id: "course-1",
      title: "Advanced JavaScript Patterns",
      level: "Intermediate",
      progress: 45,
      lastAccessed: "2 hours ago",
      nextLesson: "Factory Patterns Implementation",
      category: "javascript" // For color coding
    },
    {
      id: "course-2",
      title: "React Performance Optimization",
      level: "Advanced",
      progress: 20,
      lastAccessed: "3 days ago",
      nextLesson: "Memoization Techniques",
      category: "react" // For color coding
    }
  ];

  // Upcoming events data with added category for color coding
  const upcomingEvents = [
    {
      id: "event-1",
      title: "Live Q&A Session",
      description: "JavaScript Patterns with Senior Instructor",
      date: "Tomorrow",
      time: "2:00 PM",
      category: "interactive" // For color coding
    },
    {
      id: "event-2",
      title: "Assignment Deadline",
      description: "React Performance Project",
      date: "Oct 15",
      time: "11:59 PM",
      category: "deadline" // For color coding
    }
  ];
  
  // Helper function to get color for notification category
  const getNotificationColor = (category: string): ColorSet => {
    switch(category) {
      // Use info color for educational content notifications
      case 'content': return colors.secondary.info;
      // Use highlight color for interaction/engagement notifications
      case 'interaction': return colors.secondary.highlight;
      // Use success color for achievements/milestones notifications
      case 'achievement': return colors.secondary.success;
      default: return colors.secondary.neutral;
    }
  };

  // Helper function to get color for activity type
  const getActivityColor = (type: string): ColorSet => {
    switch(type) {
      // Use success color for completion activities
      case 'completion': return colors.secondary.success;
      // Use highlight color for achievements/rewards
      case 'achievement': return colors.secondary.highlight;
      default: return colors.secondary.neutral;
    }
  };

  // Helper function to get color for stat
  const getStatColor = (colorName: string): ColorSet => {
    switch(colorName) {
      case 'primary': return colors.primary;
      case 'success': return colors.secondary.success;
      case 'warning': return colors.secondary.warning;
      case 'info': return colors.secondary.info;
      case 'highlight': return colors.secondary.highlight;
      default: return colors.secondary.neutral;
    }
  };
  
  // Helper function to get color for event category
  const getEventColor = (category: string): ColorSet => {
    switch(category) {
      // Use info color for interactive learning events
      case 'interactive': return colors.secondary.info;
      // Use warning color for deadline-related events
      case 'deadline': return colors.secondary.warning;
      default: return colors.secondary.neutral;
    }
  };
  
  // Helper function to get badge color for course level
  const getLevelBadgeColor = (level: string): string => {
    switch(level) {
      // Success color for beginner - accessible starting point
      case 'Beginner': return 'bg-emerald-100 text-emerald-800';
      // Primary color for intermediate - core learning path
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      // Highlight color for advanced - specialized knowledge
      case 'Advanced': return 'bg-violet-100 text-violet-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="mx-auto px-4 pt-2 pb-6">
      {/* Continue Learning Section - Most important at top */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Welcome back, Zakaria</h1>
          <div className="flex gap-2">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full py-2 pl-8 pr-4 rounded-md border bg-background"
              />
            </div>
            <Button variant="outline" size="icon" asChild>
              <Link href="/user-notifications">
                <Bell className="h-5 w-5" />
                {notifications.filter(n => n.isNew).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        <Card className={`bg-gradient-to-r ${colors.primary.gradient}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Continue where you left off</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Last accessed {courseInProgress.lastAccessed}</span>
                </div>
              </div>
              <Button className="shrink-0" asChild>
                <Link href={`/courses/${courseInProgress.id}/learn`}>
                  Continue Learning
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-4 bg-background rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative h-32 sm:h-auto sm:w-40 bg-blue-50 rounded-md flex items-center justify-center">
                  {/* Course thumbnail with themed background */}
                  <BookMarked className="h-10 w-10 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                    <h3 className="font-semibold">{courseInProgress.title}</h3>
                      <p className="text-sm text-muted-foreground">{courseInProgress.module}</p>
                    </div>
                    <Badge className={`self-start sm:self-auto mt-1 sm:mt-0 ${getLevelBadgeColor(courseInProgress.level)}`}>
                      {courseInProgress.level}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Next: {courseInProgress.nextLesson}</span>
                      <span>{courseInProgress.lessonsCompleted}/{courseInProgress.totalLessons} lessons</span>
                    </div>
                    {/* Progress bar with better color and visual weight */}
                    <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full"
                        style={{ width: `${courseInProgress.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">Progress</span>
                      <span className="font-medium">{courseInProgress.progress}%</span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left content area (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Section - Completely redesigned */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Progress</h2>
              <div className="bg-white rounded-full shadow-sm p-1 flex text-xs">
                <button 
                  className={`px-4 py-1.5 rounded-full ${timeFilter === 'today' ? 'bg-gray-100 shadow-sm' : ''}`}
                  onClick={() => setTimeFilter('today')}
                >
                  Today
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full ${timeFilter === 'week' ? 'bg-gray-100 shadow-sm' : ''}`}
                  onClick={() => setTimeFilter('week')}
                >
                  This Week
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full ${timeFilter === 'month' ? 'bg-gray-100 shadow-sm' : ''}`}
                  onClick={() => setTimeFilter('month')}
                >
                  This Month
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(stat => {
                const statColor = getStatColor(stat.color);
                
                return (
                  <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className={statColor.icon}>
                    {stat.icon}
                      </div>
                      {stat.trend !== 'neutral' && (
                        <div className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {stat.change}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-5">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map(activity => {
                const activityColor = getActivityColor(activity.type);
                return (
                  <Card key={activity.id} className="border-l-4" style={{ 
                    borderLeftColor: activity.type === 'completion' ? '#10b981' : '#f59e0b'
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`${activityColor.light} p-2 rounded-full`}>
                          {activity.action.includes("Completed") ? 
                            <BookOpenCheck className={`h-4 w-4 ${activityColor.icon}`} /> : 
                            <Award className={`h-4 w-4 ${activityColor.icon}`} />
                          }
                      </div>
                        <div>
                          <p className="text-sm font-medium">{activity.action}: {activity.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Courses Tabs - Most frequently accessed content */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
            <Tabs defaultValue="in-progress" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="in-progress">In Progress (2)</TabsTrigger>
                <TabsTrigger value="completed">Completed (1)</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="in-progress" className="space-y-4">
                {inProgressCoursesData.map(course => {
                  // Different accent colors for different course categories
                  const courseColor = course.category === 'javascript' ? 'bg-amber-50 border-amber-200' : 
                                      course.category === 'react' ? 'bg-cyan-50 border-cyan-200' : 
                                      'bg-slate-50 border-slate-200';
                  const courseIconColor = course.category === 'javascript' ? 'text-amber-500' : 
                                         course.category === 'react' ? 'text-cyan-500' : 
                                         'text-slate-500';
                  
                  return (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow border">
                      <CardContent className="p-0">
                        <Link href={`/courses/${course.id}/learn`} className="block p-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className={`relative h-24 sm:h-auto sm:w-32 ${courseColor} rounded-md flex items-center justify-center`}>
                              {/* Course thumbnail with category-specific color */}
                              <BookMarked className={`h-8 w-8 ${courseIconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">Next: {course.nextLesson}</p>
                                  <p className="text-xs text-muted-foreground mt-2">Last accessed: {course.lastAccessed}</p>
                                </div>
                                <Badge className={getLevelBadgeColor(course.level)}>
                                  {course.level}
                                </Badge>
                              </div>
                              <div className="space-y-1.5 mt-3">
                                {/* Progress bar with color based on progress percentage */}
                                <div className="bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      course.progress < 25 ? 'bg-red-500' : 
                                      course.progress < 50 ? 'bg-amber-500' : 
                                      course.progress < 75 ? 'bg-blue-500' : 
                                      'bg-emerald-500'
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="font-medium">Progress</span>
                                  <span className={`font-medium ${
                                    course.progress < 25 ? 'text-red-600' : 
                                    course.progress < 50 ? 'text-amber-600' : 
                                    course.progress < 75 ? 'text-blue-600' : 
                                    'text-emerald-600'
                                  }`}>
                                    {course.progress}% complete
                                  </span>
                                </div>
                              </div>
                            </div>
              </div>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
            </TabsContent>
            <TabsContent value="completed">
                <Card>
                  <CardContent className="py-8 text-center">
                    <BookOpenCheck className="mx-auto h-10 w-10 mb-3 text-emerald-500" />
                    <h3 className="text-lg font-medium mb-1">CSS Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mb-4">Completed on October 1, 2023</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm">View Certificate</Button>
                      <Button size="sm">Review Course</Button>
              </div>
                  </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="recommended">
                <Card>
                  <CardContent className="py-8 text-center">
                    <Zap className="mx-auto h-10 w-10 mb-3 text-amber-500" />
                    <h3 className="text-lg font-medium mb-2">Recommended for you</h3>
                    <p className="text-sm text-muted-foreground mb-4">Based on your learning history</p>
                    <Button asChild>
                      <Link href="/user-explore">
                        Explore Recommendations
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
          </div>
        </div>

        {/* Right sidebar (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Upcoming Events Section - Redesigned to match the example */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Link href="/user-calendar">
                <Calendar className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
              </Link>
            </div>
            
            <div className="divide-y">
              {upcomingEvents.map(event => {
                const isLiveEvent = event.category === 'interactive';
                const bgColor = isLiveEvent ? 'bg-blue-50' : 'bg-amber-50';
                
                return (
                  <div key={event.id} className={`${bgColor} p-6`}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        isLiveEvent ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {event.time}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Link 
              href="/user-calendar"
              className="block text-center py-3 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium border-t"
            >
              View Full Schedule
            </Link>
          </div>

          {/* Notifications Section - Redesigned to match the example */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter(n => n.isNew).length}
                </span>
              </div>
              <Link href="/user-notifications">
                <BellPlus className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
              </Link>
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map((notification) => {
                const isNew = notification.isNew;
                
                // Determine border color based on notification category
                const borderColor = 
                  notification.category === 'content' ? 'border-l-blue-500' :
                  notification.category === 'interaction' ? 'border-l-violet-500' :
                  'border-l-emerald-500';
                
                return (
                  <div 
                    key={notification.id} 
                    className={`relative border-l-4 ${isNew ? borderColor : 'border-l-transparent'} p-6`}
                  >
                    {isNew && <div className="absolute top-6 right-6 w-2 h-2 bg-red-500 rounded-full"></div>}
                    <h3 className="font-semibold mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {notification.priority === 'high' && (
                        <span className="flex items-center text-xs text-amber-600">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Important
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            
            <Link 
              href="/user-notifications"
              className="block text-center py-3 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium border-t"
            >
              View All Notifications
            </Link>
                    </div>

          {/* Quick Links - Redesigned to match the example */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Quick Links</h2>
                  </div>
            
            <div className="grid grid-cols-2 divide-x divide-y">
              <Link 
                href="/user-learning-path" 
                className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-blue-600 mb-2">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">Learning Path</span>
              </Link>
              
              <Link 
                href="/user-certificates" 
                className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-amber-600 mb-2">
                  <Award className="h-6 w-6" />
                    </div>
                <span className="font-medium text-sm">Certificates</span>
              </Link>
              
              <Link 
                href="/user-consultations" 
                className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-sky-600 mb-2">
                  <Calendar className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">Book Session</span>
              </Link>
              
              <Link 
                href="/user-account" 
                className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="text-violet-600 mb-2">
                  <Settings className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">Settings</span>
              </Link>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}