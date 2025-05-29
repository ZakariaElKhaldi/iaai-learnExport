"use client";

import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Course {
  name: string;
  students: number;
  growth: number;
}

interface Content {
  name: string;
  rating: number;
  views: number;
}

interface TopCoursesGridProps {
  courses: Course[];
  content: Content[];
}

export function TopCoursesGrid({ courses, content }: TopCoursesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Courses Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Courses</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{course.name}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{course.students}</span>
                    <span className={`text-xs ${course.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {course.growth >= 0 ? '+' : ''}{course.growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${(course.students / 1200) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Top Rated Content Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Rated Content</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {content.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="text-sm">{item.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, j) => (
                      <Star 
                        key={j} 
                        className={`h-3.5 w-3.5 ${j < Math.floor(item.rating) ? 'text-amber-500' : 'text-gray-200'}`} 
                        fill={j < Math.floor(item.rating) ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Rates Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Completion Rates</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {courses.map((course, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div>{course.name}</div>
                  <div className="font-medium">{85 - i * 10}%</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full" 
                    style={{ width: `${85 - i * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 