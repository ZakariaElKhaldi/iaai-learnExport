"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ExternalLink, LucideIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';

interface TopicCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: DifficultyLevel;
  lessonCount: number;
  progress?: number; // 0-100 percentage
  isNew?: boolean;
  isPopular?: boolean;
}

const getDifficultyColor = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-emerald-500 hover:bg-emerald-600';
    case 'intermediate':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'advanced':
      return 'bg-purple-500 hover:bg-purple-600';
    case 'all-levels':
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const getDifficultyLabel = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'beginner':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'all-levels':
    default:
      return 'All Levels';
  }
};

const TopicCard: React.FC<TopicCardProps> = ({
  id,
  slug,
  title,
  description,
  icon: Icon,
  difficulty,
  lessonCount,
  progress,
  isNew = false,
  isPopular = false,
}) => {
  const hasProgress = typeof progress === 'number' && progress > 0;
  const difficultyColor = getDifficultyColor(difficulty);
  const difficultyLabel = getDifficultyLabel(difficulty);
  const href = `/learn/topics/${slug}`;

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50">
      <Link href={href} className="block h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-lg ${difficultyColor} text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{lessonCount} lessons</span>
                  <span>•</span>
                  <span>{difficultyLabel}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {isNew && (
                <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                  New
                </Badge>
              )}
              {isPopular && (
                <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[3em]">
            {description}
          </p>

          {hasProgress && (
            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium">Your progress</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center text-sm font-medium text-primary">
            {hasProgress ? 'Continue Learning' : 'Start Learning'}
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </div>
          
          {hasProgress && progress === 100 && (
            <div className="flex items-center">
              <CheckCircle className="text-green-500 h-5 w-5 mr-1.5" />
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default TopicCard; 