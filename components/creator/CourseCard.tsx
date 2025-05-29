"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Edit, 
  BarChart2, 
  Eye, 
  Trash2, 
  Clock, 
  Users, 
  Star 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: {
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
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onAnalytics?: (id: string) => void;
}

export function CourseCard({ course, onEdit, onDelete, onView, onAnalytics }: CourseCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-amber-100 text-amber-800';
      case 'archived': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  // Helper function to get level badge color
  const getLevelColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'all-levels': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="p-4 pb-2 relative">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(course.status)}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
          </Badge>
          
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(course.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              )}
              {onView && (
                <DropdownMenuItem onClick={() => onView(course.id)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
              )}
              {onAnalytics && (
                <DropdownMenuItem onClick={() => onAnalytics(course.id)}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
              )}
              {onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onDelete(course.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-2">
          <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline">{course.category}</Badge>
          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-400" />
            <span>{course.studentsCount} students</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>Updated {course.lastUpdated}</span>
          </div>
          
          {course.rating !== undefined && (
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{course.rating.toFixed(1)} rating</span>
            </div>
          )}
          
          {course.revenue !== undefined && (
            <div className="flex items-center gap-1.5 font-medium text-green-600">
              ${course.revenue.toLocaleString()}
            </div>
          )}
        </div>
        
        {course.progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Course completion</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end gap-2 border-t mt-2">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(course.id)}>
            <Edit className="mr-2 h-3.5 w-3.5" />
            Edit
          </Button>
        )}
        {onView && (
          <Button variant="outline" size="sm" onClick={() => onView(course.id)}>
            <Eye className="mr-2 h-3.5 w-3.5" />
            Preview
          </Button>
        )}
        {onAnalytics && (
          <Button variant="default" size="sm" onClick={() => onAnalytics(course.id)}>
            <BarChart2 className="mr-2 h-3.5 w-3.5" />
            Analytics
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 