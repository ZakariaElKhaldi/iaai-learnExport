"use client";

import React from 'react';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CardGridSkeleton } from '../shared/LoadingStates';
import CourseCard, { CourseCardProps } from './CourseCard';

type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseCategory = string;
type SortOption = 'newest' | 'popular' | 'rating' | 'title';

// Extended CourseCardProps with additional properties needed for filtering and sorting
interface ExtendedCourseProps extends Omit<CourseCardProps, 'className'> {
  category?: CourseCategory;
  createdAt?: number;
}

interface CourseGridProps {
  courses: ExtendedCourseProps[];
  isLoading?: boolean;
  categories?: CourseCategory[];
  className?: string;
  showFilters?: boolean;
}

export default function CourseGrid({
  courses,
  isLoading = false,
  categories = [],
  className,
  showFilters = true,
}: CourseGridProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLevels, setSelectedLevels] = React.useState<CourseLevel[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<CourseCategory[]>([]);
  const [sortBy, setSortBy] = React.useState<SortOption>('newest');
  
  // Filter and sort courses based on selected criteria
  const filteredCourses = React.useMemo(() => {
    return courses
      .filter(course => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.instructor.name.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .filter(course => {
        // Level filter
        if (selectedLevels.length > 0) {
          return selectedLevels.includes(course.level);
        }
        return true;
      })
      .filter(course => {
        // Category filter
        if (selectedCategories.length > 0 && course.category) {
          return selectedCategories.includes(course.category);
        }
        return true;
      })
      .sort((a, b) => {
        // Sort based on selected option
        switch (sortBy) {
          case 'newest':
            return ((b.createdAt || 0) - (a.createdAt || 0));
          case 'popular':
            return (b.enrollmentCount || 0) - (a.enrollmentCount || 0);
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [courses, searchQuery, selectedLevels, selectedCategories, sortBy]);

  // Handle level filter changes
  const handleLevelChange = (level: CourseLevel) => {
    setSelectedLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Handle category filter changes
  const handleCategoryChange = (category: CourseCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSortBy('newest');
  };

  return (
    <div className={className}>
      {showFilters && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Level</h4>
                    <div className="space-y-1">
                      <DropdownMenuCheckboxItem
                        checked={selectedLevels.includes('beginner')}
                        onCheckedChange={() => handleLevelChange('beginner')}
                      >
                        Beginner
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedLevels.includes('intermediate')}
                        onCheckedChange={() => handleLevelChange('intermediate')}
                      >
                        Intermediate
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedLevels.includes('advanced')}
                        onCheckedChange={() => handleLevelChange('advanced')}
                      >
                        Advanced
                      </DropdownMenuCheckboxItem>
                    </div>
                    
                    {categories.length > 0 && (
                      <>
                        <h4 className="mt-4 mb-2 text-sm font-medium">Category</h4>
                        <div className="space-y-1 max-h-60 overflow-y-auto">
                          {categories.map((category) => (
                            <DropdownMenuCheckboxItem
                              key={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                            >
                              {category}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select 
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active filters */}
          {(selectedLevels.length > 0 || selectedCategories.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {searchQuery && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  Search: {searchQuery}
                  <button 
                    className="ml-1 h-3 w-3 rounded-full"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {selectedLevels.map(level => (
                <Badge 
                  key={level} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  Level: {level.charAt(0).toUpperCase() + level.slice(1)}
                  <button 
                    className="ml-1 h-3 w-3 rounded-full"
                    onClick={() => handleLevelChange(level)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              {selectedCategories.map(category => (
                <Badge 
                  key={category} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {category}
                  <button 
                    className="ml-1 h-3 w-3 rounded-full"
                    onClick={() => handleCategoryChange(category)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <CardGridSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className={cn(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="font-medium text-lg">No courses found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filter criteria
          </p>
          {(selectedLevels.length > 0 || selectedCategories.length > 0 || searchQuery) && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 