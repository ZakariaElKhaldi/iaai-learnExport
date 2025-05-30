"use client";

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  RefreshCw,
  FileEdit,
  Trash2,
  Eye,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock course data
  const courses = [
    {
      id: 'CRS-1234',
      title: 'Introduction to Web Development',
      category: 'web-development',
      instructor: 'John Smith',
      status: 'published',
      rating: 4.7,
      students: 1243,
      createdAt: 'Jan 15, 2023',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 'CRS-5678',
      title: 'Advanced JavaScript Concepts',
      category: 'javascript',
      instructor: 'Emily Davis',
      status: 'published',
      rating: 4.9,
      students: 876,
      createdAt: 'Mar 3, 2023',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 'CRS-9012',
      title: 'Python for Data Science',
      category: 'python',
      instructor: 'Robert Johnson',
      status: 'draft',
      rating: 0,
      students: 0,
      createdAt: 'May 22, 2023',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 'CRS-3456',
      title: 'UI/UX Design Principles',
      category: 'design',
      instructor: 'Sarah Wilson',
      status: 'published',
      rating: 4.5,
      students: 532,
      createdAt: 'Jun 5, 2023',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 'CRS-7890',
      title: 'Cloud Computing Fundamentals',
      category: 'cloud',
      instructor: 'Michael Brown',
      status: 'review',
      rating: 0,
      students: 0,
      createdAt: 'Apr 12, 2023',
      thumbnail: '/placeholder.jpg'
    }
  ];
  
  // Filter courses based on search query and filters
  const filteredCourses = courses.filter(course => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Helper function for category badge styling
  const getCategoryBadgeStyles = (category: string) => {
    switch(category) {
      case 'web-development':
        return 'bg-blue-100 text-blue-800';
      case 'javascript':
        return 'bg-yellow-100 text-yellow-800';
      case 'python':
        return 'bg-green-100 text-green-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'cloud':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function for status badge styling
  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'review':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle course action (edit, delete, etc.)
  const handleCourseAction = (action: string, courseId: string) => {
    console.log(`Performing ${action} on course ${courseId}`);
    // In a real app, this would make an API call to perform the action
  };
  
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Download course data"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Refresh course list"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button asChild className="focus:ring-2 focus:ring-blue-500">
            <Link href="/creator-courses/create">
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Course
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Course stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <FileEdit className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published Courses</p>
              <p className="text-2xl font-bold">{courses.filter(c => c.status === 'published').length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Eye className="h-5 w-5 text-green-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
              <p className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Users className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search courses by title, instructor, or ID..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
                aria-controls="filter-panel"
                aria-label="Toggle filter options"
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span>Filters</span>
                {(categoryFilter !== 'all' || statusFilter !== 'all') && (
                  <Badge className="ml-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {(categoryFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              {filteredCourses.length > 0 && (
                <Button 
                  variant="outline"
                  aria-label={`Export ${filteredCourses.length} filtered courses`}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export
                </Button>
              )}
            </div>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div id="filter-panel" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Filter options">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter" className="w-full">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="cloud">Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Courses table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <table className="w-full text-sm" aria-label="Courses list">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th scope="col" className="px-4 py-3 text-left font-medium">Course</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden md:table-cell">Category</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden lg:table-cell">Instructor</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden sm:table-cell">Status</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium hidden lg:table-cell">Students</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium hidden md:table-cell">Rating</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No courses found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600">
                              {course.title.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">{course.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge className={getCategoryBadgeStyles(course.category)}>
                          {course.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {course.instructor}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge className={getStatusBadgeStyles(course.status)}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <div className="flex items-center justify-end gap-1">
                          <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        {course.rating > 0 ? (
                          <div className="flex items-center justify-end gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                            <span>{course.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 focus:ring-2 focus:ring-blue-500"
                              aria-label={`Actions for ${course.title}`}
                            >
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleCourseAction('view', course.id)}
                              className="focus:bg-gray-100"
                            >
                              <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                              View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleCourseAction('edit', course.id)}
                              className="focus:bg-gray-100"
                            >
                              <FileEdit className="h-4 w-4 mr-2" aria-hidden="true" />
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {course.status === 'published' ? (
                              <DropdownMenuItem 
                                onClick={() => handleCourseAction('unpublish', course.id)}
                                className="focus:bg-gray-100"
                              >
                                Unpublish
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleCourseAction('publish', course.id)}
                                className="focus:bg-gray-100"
                              >
                                Publish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleCourseAction('duplicate', course.id)}
                              className="focus:bg-gray-100"
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleCourseAction('delete', course.id)}
                              className="text-red-600 focus:bg-gray-100 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={true}
                aria-label="Previous page"
                className="focus:ring-2 focus:ring-blue-500"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={true}
                aria-label="Next page"
                className="focus:ring-2 focus:ring-blue-500"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 