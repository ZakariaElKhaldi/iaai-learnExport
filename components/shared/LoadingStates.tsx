"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonProps {
  className?: string;
}

// Card skeleton with image, title and text placeholders
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <Skeleton className="h-[180px] w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// Grid of card skeletons
export function CardGridSkeleton({ 
  className, 
  count = 4 
}: SkeletonProps & { count?: number }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

// Table row skeletons
export function TableRowSkeleton({ 
  className,
  columnCount = 5
}: SkeletonProps & { columnCount?: number }) {
  return (
    <div className={cn("flex items-center space-x-4 py-3", className)}>
      {Array.from({ length: columnCount }).map((_, index) => (
        <Skeleton 
          key={index} 
          className={cn(
            "h-4 rounded",
            index === 0 ? "w-[20%]" :
            index === columnCount - 1 ? "ml-auto w-[80px]" :
            "w-[15%]"
          )} 
        />
      ))}
    </div>
  );
}

// Table with multiple row skeletons
export function TableSkeleton({ 
  className, 
  rowCount = 5,
  columnCount = 5
}: SkeletonProps & { rowCount?: number; columnCount?: number }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center space-x-4 py-3 border-b">
        {Array.from({ length: columnCount }).map((_, index) => (
          <Skeleton 
            key={index} 
            className={cn(
              "h-5 rounded bg-muted/70",
              index === 0 ? "w-[20%]" :
              index === columnCount - 1 ? "ml-auto w-[80px]" :
              "w-[15%]"
            )} 
          />
        ))}
      </div>
      
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRowSkeleton key={index} columnCount={columnCount} />
      ))}
    </div>
  );
}

// Dashboard stats/metrics placeholder
export function DashboardStatsSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <Skeleton className="h-5 w-[120px] mb-2" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-4 w-[80px] mt-2" />
        </div>
      ))}
    </div>
  );
}

// Form field skeleton
export function FormFieldSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className="h-4 w-[120px]" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Form with multiple fields
export function FormSkeleton({ 
  className, 
  rowCount = 4 
}: SkeletonProps & { rowCount?: number }) {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: rowCount }).map((_, index) => (
        <FormFieldSkeleton key={index} />
      ))}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  );
}

// Profile skeleton with avatar and details
export function ProfileSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-3 flex-1">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// Video player placeholder
export function VideoPlayerSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="aspect-video w-full bg-muted/60 rounded-md overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-[90%] flex items-center justify-between">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-2 w-[70%] rounded-full" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Calendar/schedule skeleton
export function CalendarSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-[150px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={`header-${index}`} className="h-8 rounded" />
        ))}
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={`day-${index}`} className="aspect-square p-1">
            <Skeleton className="h-full w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
} 