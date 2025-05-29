"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CourseCard } from '@/components/creator/CourseCard';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { convertCategoryData } from '@/components/creator/RechartsDataAdapter';
import { Course } from '@/types';
import { Search, Plus } from 'lucide-react';

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
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis and machine learning.',
    thumbnailUrl: '/placeholders/course-4.jpg',
    status: 'published',
    category: 'Data Science',
    level: 'intermediate',
    studentsCount: 650,
    rating: 4.6,
    lastUpdated: '2 weeks ago',
    revenue: 1850,
  },
  {
    id: '5',
    title: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and user experience design.',
    thumbnailUrl: '/placeholders/course-5.jpg',
    status: 'draft',
    category: 'Design',
    level: 'beginner',
    studentsCount: 0,
    lastUpdated: '3 days ago',
    progress: 30,
  },
];

// Course performance data
const coursePerformanceData = {
  students: {
    data: [1245, 873, 650, 425, 320],
    labels: ['Web Dev', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  revenue: {
    data: [3200, 2150, 1850, 1200, 950],
    labels: ['Web Dev', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  }
};

interface DashboardCoursesProps {
  className?: string;
}

export function DashboardCourses({ className }: DashboardCoursesProps) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleEditCourse = (id: string) => {
    console.log(`Edit course ${id}`);
  };
  
  const handleViewCourse = (id: string) => {
    console.log(`View course ${id}`);
  };
  
  const handleAnalyticsCourse = (id: string) => {
    console.log(`View analytics for course ${id}`);
  };
  
  // Filter courses based on status and search query
  const filteredCourses = mockCourses.filter(course => {
    const matchesFilter = filter === 'all' || course.status === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Convert data for Recharts
  const studentsChartData = convertCategoryData(
    coursePerformanceData.students.data,
    coursePerformanceData.students.labels,
    'students'
  );
  
  const revenueChartData = convertCategoryData(
    coursePerformanceData.revenue.data,
    coursePerformanceData.revenue.labels,
    'revenue'
  );
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Course performance charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <RechartsBarChart
          title="Students by Course"
          data={studentsChartData}
          dataKey="students"
          height={250}
          color="#3b82f6"
          showValues={true}
        />
        
        <RechartsBarChart
          title="Revenue by Course"
          data={revenueChartData}
          dataKey="revenue"
          height={250}
          color="#10b981"
          showValues={true}
        />
      </div>
      
      {/* Courses list with filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold">Your Courses</h2>
          <Button asChild>
            <Link href="/creator-courses/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onView={handleViewCourse}
              onAnalytics={handleAnalyticsCourse}
            />
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 