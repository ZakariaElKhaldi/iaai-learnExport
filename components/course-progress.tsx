"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Play, PauseCircle } from 'lucide-react';
import { useLearningProgress } from '@/hooks/use-learning-progress';

interface CourseProgressProps {
  courseId: string | number;
  courseName: string;
  estimatedTime?: number;
}

export function CourseProgress({ courseId, courseName, estimatedTime }: CourseProgressProps) {
  const { progress, markTutorialCompleted, setLastVisited } = useLearningProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  
  // Convert courseId to string to ensure consistent type
  const courseIdString = String(courseId);
  
  useEffect(() => {
    // Check if this course is completed or started
    const completed = progress.completedTutorials.includes(courseIdString);
    const started = progress.lastVisited === courseIdString && !completed;
    
    setIsCompleted(completed);
    setIsStarted(started);
    
    // Set progress percentage based on completed status
    setProgressPercent(completed ? 100 : started ? 25 : 0);
  }, [courseIdString, progress]);
  
  const handleMarkCompleted = () => {
    markTutorialCompleted(courseIdString);
    setIsCompleted(true);
    setIsStarted(false);
    setProgressPercent(100);
  };
  
  const handleMarkStarted = () => {
    if (isStarted) return; // Already started
    setLastVisited(courseIdString);
    setIsStarted(true);
    setProgressPercent(25);
  };
  
  // When the user visits the page, automatically mark it as started
  useEffect(() => {
    if (!isCompleted && !isStarted) {
      handleMarkStarted();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, isStarted]);
  
  return (
    <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col">
          <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400">Your Progress</h3>
          <div className="flex items-center gap-2 mt-1">
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : isStarted ? (
              <Play className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-slate-300" />
            )}
            <span className="font-medium">
              {isCompleted 
                ? 'Completed' 
                : isStarted 
                  ? 'In Progress' 
                  : 'Not Started'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <button 
              onClick={handleMarkCompleted}
              className="px-3 py-1.5 text-sm rounded-md bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-center gap-1.5"
            >
              <CheckCircle className="h-4 w-4" />
              Mark as Completed
            </button>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      {estimatedTime && (
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">
          Estimated completion time: {estimatedTime} minutes
        </div>
      )}
    </div>
  );
} 