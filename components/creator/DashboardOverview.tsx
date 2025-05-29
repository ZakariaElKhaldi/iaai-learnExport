"use client";

import Link from 'next/link';
import { 
  DollarSign, 
  Users, 
  BookOpen, 
  Star, 
  Plus, 
  MessageSquare, 
  BarChart2, 
  FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/creator/StatCard';
import { CourseCard } from '@/components/creator/CourseCard';
import { Course } from '@/types';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { convertTimeSeriesData } from '@/components/creator/RechartsDataAdapter';

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    thumbnailUrl: '/placeholders/course-1.jpg',
    status: 'published',
    category: 'Web Development',
    level: 'beginner',
    studentsCount: 1245,
    rating: 4.7,
    lastUpdated: '2 days ago',
    revenue: 3200,
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns and build scalable applications.',
    thumbnailUrl: '/placeholders/course-2.jpg',
    status: 'draft',
    category: 'React',
    level: 'advanced',
    studentsCount: 0,
    lastUpdated: '1 week ago',
    progress: 65,
  },
  {
    id: '3',
    title: 'Node.js API Development',
    description: 'Build robust APIs with Node.js, Express, and MongoDB.',
    thumbnailUrl: '/placeholders/course-3.jpg',
    status: 'published',
    category: 'Backend',
    level: 'intermediate',
    studentsCount: 873,
    rating: 4.5,
    lastUpdated: '1 month ago',
    revenue: 2150,
  },
];

// Mock chart data
const revenueData = {
  data: [1200, 1350, 1100, 1450, 1800, 1650, 1950, 2100, 1900, 2250, 2400, 2600],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const studentsData = {
  data: [85, 95, 78, 105, 120, 112, 130, 142, 135, 155, 165, 178],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

interface DashboardOverviewProps {
  className?: string;
}

export function DashboardOverview({ className }: DashboardOverviewProps) {
  const handleEditCourse = (id: string) => {
    console.log(`Edit course ${id}`);
  };
  
  const handleViewCourse = (id: string) => {
    console.log(`View course ${id}`);
  };
  
  const handleAnalyticsCourse = (id: string) => {
    console.log(`View analytics for course ${id}`);
  };
  
  // Convert data for Recharts
  const revenueChartData = convertTimeSeriesData(
    revenueData.data,
    revenueData.labels,
    'revenue'
  );
  
  const studentsChartData = convertTimeSeriesData(
    studentsData.data,
    studentsData.labels,
    'students'
  );
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Key metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <StatCard 
          title="Total Revenue" 
          value="$5,350" 
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true, label: "vs last month" }}
          color="green"
          description="Lifetime earnings"
        />
        
        <StatCard 
          title="Total Students" 
          value="2,118" 
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
          color="blue"
          description="Across all courses"
        />
        
        <StatCard 
          title="Published Courses" 
          value="3"
          icon={<BookOpen className="h-4 w-4" />}
          description="Active courses"
        />
        
        <StatCard 
          title="Average Rating" 
          value="4.6"
          icon={<Star className="h-4 w-4" />}
          color="amber"
          description="From 56 reviews"
        />
      </div>
      
      {/* Analytics charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <RechartsLineChart
          title="Revenue"
          data={revenueChartData}
          dataKey="revenue"
          height={250}
          color="#3b82f6"
          trend={{ value: 12, isPositive: true, label: "vs last month" }}
        />
        
        <RechartsBarChart
          title="Students"
          data={studentsChartData}
          dataKey="students"
          height={250}
          color="#10b981"
          trend={{ value: 5, isPositive: true, label: "vs last month" }}
        />
      </div>
      
      {/* Recent courses */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Recent Courses</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/creator-courses">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onView={handleViewCourse}
              onAnalytics={handleAnalyticsCourse}
            />
          ))}
        </div>
      </div>
      
      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Plus className="h-5 w-5 text-blue-700" />
              </div>
              <CardTitle className="text-sm mb-1">Create New Course</CardTitle>
              <CardDescription className="text-xs">Start building a new course</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <MessageSquare className="h-5 w-5 text-amber-700" />
              </div>
              <CardTitle className="text-sm mb-1">Student Messages</CardTitle>
              <CardDescription className="text-xs">Respond to student questions</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <BarChart2 className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle className="text-sm mb-1">View Analytics</CardTitle>
              <CardDescription className="text-xs">Track your performance</CardDescription>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-purple-700" />
              </div>
              <CardTitle className="text-sm mb-1">Payout Reports</CardTitle>
              <CardDescription className="text-xs">View your earnings</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 