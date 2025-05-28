"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpen, Star, Users, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: {
    name: string;
    avatarUrl?: string;
  };
  duration: string;
  lessonCount: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating?: number;
  enrollmentCount?: number;
  progress?: number;
  isEnrolled?: boolean;
  className?: string;
}

export default function CourseCard({
  id,
  title,
  description,
  imageUrl,
  instructor,
  duration,
  lessonCount,
  level,
  rating,
  enrollmentCount,
  progress,
  isEnrolled = false,
  className,
}: CourseCardProps) {
  // Format the level to display with proper capitalization
  const formatLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Get level badge color
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="aspect-video relative overflow-hidden">
        <Link href={`/courses/${id}`}>
          {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105"
          />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <BookOpen className="h-12 w-12 text-slate-400" />
            </div>
          )}
        </Link>
        <Badge 
          variant="secondary" 
          className={cn("absolute top-2 right-2", getLevelBadgeColor(level))}
        >
          {formatLevel(level)}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <Link 
          href={`/courses/${id}`}
          className="text-lg font-semibold line-clamp-1 hover:underline"
        >
          {title}
        </Link>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{instructor.name}</span>
          {instructor.avatarUrl && (
            <Image
              src={instructor.avatarUrl}
              alt={instructor.name}
              width={20}
              height={20}
              className="ml-2 rounded-full"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-1 h-3 w-3" />
            <span>{lessonCount} lessons</span>
          </div>
          {rating !== undefined && (
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          {enrollmentCount !== undefined && (
            <div className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              <span>{enrollmentCount} enrolled</span>
            </div>
          )}
        </div>
        
        {isEnrolled && progress !== undefined && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isEnrolled ? (
          <Button asChild className="w-full" variant="outline">
            <Link href={`/courses/${id}/learn`}>
              {progress === 0 ? 'Start Learning' : 'Continue Learning'}
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/courses/${id}`}>View Course</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
