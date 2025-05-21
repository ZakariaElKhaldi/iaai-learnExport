import React from 'react';
import Link from 'next/link';
import { CheckSquare, Clock, PlayCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

export type TutorialDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface TutorialCardProps {
  id: string;
  slug: string;
  topicSlug?: string;
  title: string;
  description: string;
  difficulty: TutorialDifficulty;
  durationMinutes?: number;
  hasInteractiveExamples?: boolean;
  progress?: number; // 0-100 percentage
  isCompleted?: boolean;
  className?: string;
}

const getDifficultyBadge = (difficulty: TutorialDifficulty) => {
  switch (difficulty) {
    case 'beginner':
      return (
        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">
          Beginner
        </Badge>
      );
    case 'intermediate':
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
          Intermediate
        </Badge>
      );
    case 'advanced':
      return (
        <Badge variant="outline" className="border-purple-500 text-purple-600 bg-purple-50">
          Advanced
        </Badge>
      );
    default:
      return null;
  }
};

const TutorialCard: React.FC<TutorialCardProps> = ({
  id,
  slug,
  topicSlug,
  title,
  description,
  difficulty,
  durationMinutes = 5, // Default to 5 minutes if not provided
  hasInteractiveExamples = false,
  progress,
  isCompleted = false,
  className,
}) => {
  const hasProgress = typeof progress === 'number' && progress > 0;
  
  // Use a simpler URL structure that matches our [slug] page
  const href = `/learn/${slug}`;
  
  // Add debugging log
  console.log(`Tutorial card ${title} has slug: ${slug}, creating link to: ${href}`);
  
  const formattedDuration = durationMinutes < 60 
    ? `${durationMinutes} min` 
    : `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

  return (
    <Card className={cn("h-full hover:shadow-md transition-all", className)}>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {getDifficultyBadge(difficulty)}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {formattedDuration}
          </div>
          {hasInteractiveExamples && (
            <Badge variant="secondary" className="text-xs">
              Interactive
            </Badge>
          )}
        </div>

        <Link href={href} className="hover:underline" onClick={() => console.log(`Clicked tutorial title link: ${href}`)}>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {hasProgress && !isCompleted && (
          <div className="mt-4 mb-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        {isCompleted ? (
          <div className="flex items-center text-green-600">
            <CheckSquare className="h-4 w-4 mr-1.5" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <Button asChild className="w-full">
            <Link href={href} className="flex items-center justify-center" onClick={() => console.log(`Clicked tutorial button link: ${href}`)}>
              <PlayCircle className="h-4 w-4 mr-1.5" />
              {hasProgress ? 'Continue' : 'Start'} Tutorial
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TutorialCard; 