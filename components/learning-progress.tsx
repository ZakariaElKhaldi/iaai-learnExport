"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Award, Zap } from 'lucide-react';
import { useLearningProgress } from '@/hooks/use-learning-progress';

interface LearningProgressProps {
  totalTutorials: number;
}

export function LearningProgress({ totalTutorials }: LearningProgressProps) {
  const { 
    progress, 
    isLoading,
    getCompletionPercentage
  } = useLearningProgress();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="h-24 flex items-center justify-center">
            <p className="text-slate-500">Loading progress...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completionPercentage = getCompletionPercentage(totalTutorials);
  const hasStreak = progress.streakDays > 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Your Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
            <span className="text-slate-600 dark:text-slate-400">Completed</span>
            <div className="flex items-center mt-1">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
              <span className="font-medium">{progress.completedTutorials.length} tutorials</span>
            </div>
          </div>
          
          <div className="flex flex-col p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
            <span className="text-slate-600 dark:text-slate-400">Streak</span>
            <div className="flex items-center mt-1">
              <Zap className="h-4 w-4 text-amber-500 mr-1.5" />
              <span className="font-medium">{progress.streakDays} days</span>
            </div>
          </div>
        </div>

        {/* Favorites */}
        {progress.favoriteTopics.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-primary mr-1.5" />
              <span className="text-sm font-medium">Favorite Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {progress.favoriteTopics.map(topic => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last visited */}
        {progress.lastVisited && (
          <div className="pt-1 text-sm">
            <span className="text-slate-600 dark:text-slate-400">Last visited: </span>
            <span className="font-medium">{progress.lastVisited}</span>
          </div>
        )}
        
        {/* Streak message */}
        {hasStreak && progress.streakDays >= 3 && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-3 text-sm flex items-start">
            <Zap className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <span>{progress.streakDays} day streak! Keep going to maintain your momentum.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 