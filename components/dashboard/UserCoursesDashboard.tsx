"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, BarChart, BookOpen, Activity, PlusCircle } from 'lucide-react';
import CourseCard, { CourseCardProps } from '../courses/CourseCard';
import { Progress } from '@/components/ui/progress';

interface Activity {
  id: string;
  type: 'completed_lesson' | 'completed_quiz' | 'certificate' | 'started_course';
  courseId: string;
  courseTitle: string;
  timestamp: Date;
  details?: string;
}

interface UserCoursesProps {
  enrolledCourses: (Omit<CourseCardProps, 'className'> & { progress: number })[];
  recommendedCourses?: Omit<CourseCardProps, 'className'>[];
  recentActivity?: Activity[];
  stats?: {
    completedCourses: number;
    inProgressCourses: number;
    totalHoursLearned: number;
    certificatesEarned: number;
  };
}

export default function UserCoursesDashboard({
  enrolledCourses,
  recommendedCourses = [],
  recentActivity = [],
  stats = {
    completedCourses: 0,
    inProgressCourses: 0,
    totalHoursLearned: 0,
    certificatesEarned: 0,
  },
}: UserCoursesProps) {
  const router = useRouter();
  
  // Get in progress courses (not completed)
  const inProgressCourses = enrolledCourses.filter(course => course.progress < 100);
  
  // Get completed courses
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  
  // Format date for activity items
  const formatActivityDate = (date: Date): string => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
      });
    }
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'completed_lesson':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'completed_quiz':
        return <BarChart className="h-4 w-4 text-purple-500" />;
      case 'certificate':
        return <Badge variant="outline" className="h-4 px-1 text-xs text-green-500 border-green-500">Certificate</Badge>;
      case 'started_course':
        return <Activity className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  // Get activity text based on type
  const getActivityText = (activity: Activity): string => {
    switch (activity.type) {
      case 'completed_lesson':
        return `Completed lesson: ${activity.details}`;
      case 'completed_quiz':
        return `Passed quiz: ${activity.details}`;
      case 'certificate':
        return `Earned certificate for ${activity.courseTitle}`;
      case 'started_course':
        return `Started learning ${activity.courseTitle}`;
      default:
        return activity.details || '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground">Courses in Progress</p>
            <h3 className="text-3xl font-bold">{stats.inProgressCourses}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Badge variant="outline" className="p-2 mb-2 border-green-500">
              <BarChart className="h-6 w-6 text-green-500" />
            </Badge>
            <p className="text-sm text-muted-foreground">Completed Courses</p>
            <h3 className="text-3xl font-bold">{stats.completedCourses}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Clock className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-muted-foreground">Hours Learned</p>
            <h3 className="text-3xl font-bold">{stats.totalHoursLearned}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Badge variant="outline" className="p-2 mb-2 border-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-500"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </Badge>
            <p className="text-sm text-muted-foreground">Certificates</p>
            <h3 className="text-3xl font-bold">{stats.certificatesEarned}</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="in-progress" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="space-y-4">
          {inProgressCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map(course => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isEnrolled={true}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-full bg-muted mb-4">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No courses in progress</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't started any courses yet. Browse our catalog to find courses that interest you.
                </p>
                <Button onClick={() => router.push('/courses')}>
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map(course => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isEnrolled={true}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-full bg-muted mb-4">
                  <BarChart className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No completed courses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Keep learning to complete your enrolled courses and earn certificates.
                </p>
                {inProgressCourses.length > 0 ? (
                  <Button onClick={() => {
                    const tabElement = document.querySelector('[data-value="in-progress"]') as HTMLElement;
                    if (tabElement) tabElement.click();
                  }}>
                    View In-Progress Courses
                  </Button>
                ) : (
                  <Button onClick={() => router.push('/courses')}>
                    Browse Courses
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recommended" className="space-y-4">
          {recommendedCourses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedCourses.map(course => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isEnrolled={false}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-full bg-muted mb-4">
                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete more courses to get personalized recommendations based on your interests.
                </p>
                <Button onClick={() => router.push('/courses')}>
                  Browse All Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your learning activity from the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map(activity => (
                <li key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{getActivityText(activity)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatActivityDate(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => router.push(`/courses/${activity.courseId}/learn`)}
                  >
                    View
                  </Button>
                </li>
              ))}
            </ul>
            {recentActivity.length > 5 && (
              <Button variant="link" className="mt-4 mx-auto block">
                View All Activity
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 