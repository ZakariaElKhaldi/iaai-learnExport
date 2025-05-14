"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Award, Clock, BookOpenCheck, BarChart2 } from 'lucide-react';

export default function UserDashboardPage() {
  // Mock data for the dashboard
  const courseInProgress = {
    id: "course-1",
    title: "Advanced JavaScript Patterns",
    module: "Module 4: Advanced Patterns",
    progress: 45,
    lessonsCompleted: 5,
    totalLessons: 12,
    level: "Intermediate"
  };

  // Statistics data
  const stats = [
    { 
      id: "courses-in-progress", 
      title: "Courses in Progress", 
      value: 2, 
      icon: <BookOpen className="text-blue-500 h-6 w-6" /> 
    },
    { 
      id: "completed-courses", 
      title: "Completed Courses", 
      value: 1, 
      icon: <BookOpenCheck className="text-green-500 h-6 w-6" /> 
    },
    { 
      id: "hours-learned", 
      title: "Hours Learned", 
      value: 14, 
      icon: <Clock className="text-purple-500 h-6 w-6" /> 
    },
    { 
      id: "certificates", 
      title: "Certificates", 
      value: 1, 
      icon: <Award className="text-yellow-500 h-6 w-6" /> 
    }
  ];

  // Notification data
  const notifications = [
    {
      id: "notif-1",
      type: "module",
      title: "New module released",
      description: "Advanced JavaScript Patterns has a new module available",
      isNew: true,
      time: "2h ago"
    },
    {
      id: "notif-2",
      type: "certificate",
      title: "Certificate ready",
      description: "Your certificate for CSS Fundamentals is ready to download",
      isNew: false,
      time: "3d ago"
    },
    {
      id: "notif-3",
      type: "reply",
      title: "Reply to your question",
      description: "An instructor has replied to your question in React Performance Optimization",
      isNew: true,
      time: "1d ago"
    }
  ];

  // In-progress courses data for tab content
  const inProgressCoursesData = [
    {
      id: "course-1",
      title: "Advanced JavaScript Patterns",
      level: "Intermediate",
      progress: 45
    },
    {
      id: "course-2",
      title: "React Performance Optimization",
      level: "Advanced",
      progress: 20
    }
  ];

  // Resources data
  const resources = [
    {
      id: "resource-1",
      title: "JavaScript Cheat Sheet",
      type: "Quick reference",
      icon: <BookOpen className="text-primary h-4 w-4" />
    },
    {
      id: "resource-2",
      title: "React Documentation",
      type: "External resource",
      icon: <BookOpen className="text-primary h-4 w-4" />
    }
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Main content area - Removed the action buttons section completely */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left content area (2/3 width on desktop) */}
        <div className="md:col-span-2 space-y-6">
          {/* Continue Learning Card */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative h-32 sm:h-auto sm:w-40 bg-slate-200 rounded-md flex items-center justify-center">
                  {/* Placeholder image */}
                  <div className="text-slate-400">Course thumbnail</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold">{courseInProgress.title}</h3>
                    <Badge className="self-start sm:self-auto mt-1 sm:mt-0" variant="secondary">{courseInProgress.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{courseInProgress.module}</p>
                  <div className="space-y-2">
                    <Progress value={courseInProgress.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{courseInProgress.lessonsCompleted}/{courseInProgress.totalLessons} completed</span>
                      <span>{courseInProgress.progress}%</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" asChild>
                      <Link href={`/courses/${courseInProgress.id}/learn`}>Continue</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(stat => (
              <Card key={stat.id} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Courses Tabs */}
          <Tabs defaultValue="in-progress" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="in-progress" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inProgressCoursesData.map(course => (
                  <Card key={course.id}>
                    <CardContent className="p-4">
                      <div className="relative h-32 bg-slate-200 rounded-md flex items-center justify-center mb-3">
                        {/* Placeholder image */}
                        <div className="text-slate-400">Course thumbnail</div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <div className="space-y-1.5">
                        <Progress value={course.progress} className="h-1.5" />
                        <div className="flex justify-end">
                          <span className="text-xs text-muted-foreground">{course.progress}% complete</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="py-8 text-center text-muted-foreground">
                <BookOpenCheck className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                <p>You've completed 1 course</p>
              </div>
            </TabsContent>
            <TabsContent value="recommended">
              <div className="py-8 text-center text-muted-foreground">
                <BookOpen className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                <p>Browse more courses recommended for you</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Notifications Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Notifications</CardTitle>
              <Badge variant="secondary">{notifications.filter(n => n.isNew).length}</Badge>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 border rounded-md relative ${notification.isNew ? 'bg-muted/20' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {notification.isNew && (
                        <span className="w-2 h-2 bg-primary rounded-full ml-2 block flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full">View all</Button>
            </CardFooter>
          </Card>

          {/* Learning Resources Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resources.map(resource => (
                  <div 
                    key={resource.id}
                    className="p-2 hover:bg-muted rounded flex items-center gap-3 cursor-pointer"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      {resource.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full">View all resources</Button>
            </CardFooter>
          </Card>

          {/* Learning Goals Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Learning Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">Complete 3 courses</span>
                    </div>
                    <span className="text-xs">1/3</span>
                  </div>
                  <Progress value={33.33} className="h-1.5" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">Earn 5 certificates</span>
                    </div>
                    <span className="text-xs">1/5</span>
                  </div>
                  <Progress value={20} className="h-1.5" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">Study 50 hours</span>
                    </div>
                    <span className="text-xs">14/50</span>
                  </div>
                  <Progress value={28} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}