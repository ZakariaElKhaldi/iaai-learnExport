"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Grid3X3, List, Search, BarChart4, FileText, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseList } from '@/components/creator/CourseList';
import { Course } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    description: 'Learn how to use Python for data analysis and visualization.',
    thumbnailUrl: '/placeholders/course-4.jpg',
    status: 'archived',
    category: 'Data Science',
    level: 'intermediate',
    studentsCount: 1532,
    rating: 4.8,
    lastUpdated: '3 months ago',
    revenue: 4500,
  },
];

export default function CreatorCoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const handleEditCourse = (id: string) => {
    console.log(`Edit course ${id}`);
  };
  
  const handleDeleteCourse = (id: string) => {
    console.log(`Delete course ${id}`);
  };
  
  const handleViewCourse = (id: string) => {
    console.log(`View course ${id}`);
  };
  
  const handleAnalyticsCourse = (id: string) => {
    console.log(`View analytics for course ${id}`);
  };
  
  // Filter and sort courses
  const filteredCourses = mockCourses
    .filter(course => {
      // Apply search filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (statusFilter !== 'all' && course.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'students':
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        case 'revenue':
          return (b.revenue || 0) - (a.revenue || 0);
        case 'newest':
        default:
          // Assuming newest is based on lastUpdated
          return 0; // In a real app, convert dates and compare
      }
    });
  
  // Calculate stats
  const stats = {
    published: mockCourses.filter(c => c.status === 'published').length,
    totalStudents: mockCourses.reduce((sum, course) => sum + (course.studentsCount || 0), 0),
    totalRevenue: mockCourses.reduce((sum, course) => sum + (course.revenue || 0), 0)
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
          <Link href="/creator-courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Link>
        </Button>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published Courses</p>
                <h3 className="text-2xl font-bold mt-1">{stats.published}</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalStudents.toLocaleString()}</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                <BarChart4 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="students">Most Students</SelectItem>
              <SelectItem value="revenue">Highest Revenue</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setViewMode('grid')}
              className="h-9 w-9 rounded-md"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setViewMode('list')}
              className="h-9 w-9 rounded-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Course List */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm">
        {filteredCourses.length > 0 ? (
          <CourseList 
            courses={filteredCourses}
            viewMode={viewMode}
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
            onViewCourse={handleViewCourse}
            onAnalyticsCourse={handleAnalyticsCourse}
          />
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mb-4">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any courses matching your search criteria. Try adjusting your filters or create a new course.
            </p>
            <Button asChild className="mt-6">
              <Link href="/creator-courses/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 