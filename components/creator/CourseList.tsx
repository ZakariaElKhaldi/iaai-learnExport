"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus,
  CheckCircle2,
  Clock,
  FileEdit,
  Archive
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CourseCard } from './CourseCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  level: string;
  studentsCount: number;
  rating?: number;
  lastUpdated: string;
  progress?: number;
  revenue?: number;
}

interface CourseListProps {
  courses: Course[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
  onCreateCourse?: () => void;
  onEditCourse?: (id: string) => void;
  onDeleteCourse?: (id: string) => void;
  onViewCourse?: (id: string) => void;
  onAnalyticsCourse?: (id: string) => void;
}

export function CourseList({ 
  courses, 
  isLoading = false,
  viewMode = 'grid',
  onCreateCourse,
  onEditCourse,
  onDeleteCourse,
  onViewCourse,
  onAnalyticsCourse
}: CourseListProps) {
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  
  // Get unique categories from courses
  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  
  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...courses];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(course => course.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(course => course.category === categoryFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'students':
          return b.studentsCount - a.studentsCount;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'revenue':
          return (b.revenue || 0) - (a.revenue || 0);
        case 'updated':
        default:
          // Assuming lastUpdated is in a format that can be compared
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });
    
    setFilteredCourses(result);
  }, [courses, searchQuery, statusFilter, categoryFilter, sortBy]);
  
  // Status filter options with icons
  const statusOptions = [
    { value: 'all', label: 'All Statuses', icon: ArrowUpDown },
    { value: 'published', label: 'Published', icon: CheckCircle2 },
    { value: 'draft', label: 'Draft', icon: FileEdit },
    { value: 'archived', label: 'Archived', icon: Archive }
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'updated', label: 'Last Updated' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'students', label: 'Student Count' },
    { value: 'rating', label: 'Rating' },
    { value: 'revenue', label: 'Revenue' }
  ];
  
  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Skeleton className="h-10 w-full sm:w-64" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-1" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-2 w-full mt-6" />
              </div>
              <div className="border-t p-4 flex justify-end gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Filters and actions row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <option.icon className="mr-2 h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {onCreateCourse && (
            <Button className="gap-1 ml-auto" onClick={onCreateCourse}>
              <Plus className="h-4 w-4" />
              <span>New Course</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Results count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredCourses.length}</span> of{" "}
          <span className="font-medium">{courses.length}</span> courses
        </div>
        
        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {statusFilter}
              <button 
                className="ml-1 hover:text-foreground"
                onClick={() => setStatusFilter('all')}
              >
                ×
              </button>
            </Badge>
          )}
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categoryFilter}
              <button 
                className="ml-1 hover:text-foreground"
                onClick={() => setCategoryFilter('all')}
              >
                ×
              </button>
            </Badge>
          )}
          {(statusFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Course grid */}
      {filteredCourses.length > 0 && (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={onEditCourse ? () => onEditCourse(course.id) : undefined}
                onDelete={onDeleteCourse ? () => onDeleteCourse(course.id) : undefined}
                onView={onViewCourse ? () => onViewCourse(course.id) : undefined}
                onAnalytics={onAnalyticsCourse ? () => onAnalyticsCourse(course.id) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map(course => (
              <div key={course.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 bg-white dark:bg-gray-900">
                {course.thumbnailUrl && (
                  <div className="w-full sm:w-48 h-32 rounded-md overflow-hidden">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <div>
                      {course.status === 'published' && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                          Published
                        </Badge>
                      )}
                      {course.status === 'draft' && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                          Draft
                        </Badge>
                      )}
                      {course.status === 'archived' && (
                        <Badge variant="outline" className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800">
                          Archived
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Level</p>
                      <p className="font-medium capitalize">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-medium">{course.studentsCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Updated</p>
                      <p className="font-medium">{course.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-end">
                    {onViewCourse && (
                      <Button variant="outline" size="sm" onClick={() => onViewCourse(course.id)}>
                        View
                      </Button>
                    )}
                    {onEditCourse && (
                      <Button variant="outline" size="sm" onClick={() => onEditCourse(course.id)}>
                        Edit
                      </Button>
                    )}
                    {onAnalyticsCourse && course.status === 'published' && (
                      <Button variant="outline" size="sm" onClick={() => onAnalyticsCourse(course.id)}>
                        Analytics
                      </Button>
                    )}
                    {onDeleteCourse && (
                      <Button variant="destructive" size="sm" onClick={() => onDeleteCourse(course.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
} 