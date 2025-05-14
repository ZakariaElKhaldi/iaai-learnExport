import React from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type TutorialItemType = 'tutorial' | 'exercise' | 'quiz' | 'project';

export interface TutorialItem {
  id: string;
  slug: string;
  title: string;
  type: TutorialItemType;
  isCompleted?: boolean;
  isLocked?: boolean;
  durationMinutes?: number;
  index: number;
}

interface TutorialsListProps {
  tutorials: TutorialItem[];
  topicSlug: string;
  activeTutorialId?: string;
  className?: string;
  showIndexNumbers?: boolean;
  isCollapsible?: boolean;
  maxHeight?: string;
}

const getTypeLabel = (type: TutorialItemType) => {
  switch (type) {
    case 'tutorial':
      return null; // No label for regular tutorials
    case 'exercise':
      return (
        <Badge variant="outline" className="ml-2 border-blue-500 text-blue-600 bg-blue-50">
          Exercise
        </Badge>
      );
    case 'quiz':
      return (
        <Badge variant="outline" className="ml-2 border-amber-500 text-amber-600 bg-amber-50">
          Quiz
        </Badge>
      );
    case 'project':
      return (
        <Badge variant="outline" className="ml-2 border-purple-500 text-purple-600 bg-purple-50">
          Project
        </Badge>
      );
    default:
      return null;
  }
};

const TutorialsList: React.FC<TutorialsListProps> = ({
  tutorials,
  topicSlug,
  activeTutorialId,
  className,
  showIndexNumbers = true,
  isCollapsible = false,
  maxHeight = '500px',
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const baseStyle = "w-full border rounded-lg overflow-hidden bg-card";
  const collapsibleStyle = isCollapsible ? (isCollapsed ? `max-h-[200px]` : `max-h-[${maxHeight}]`) : '';
  
  return (
    <div className={cn(baseStyle, className)}>
      <div className={cn("flex flex-col divide-y", collapsibleStyle, isCollapsible && "overflow-y-auto transition-all duration-300")}>
        {tutorials.map((tutorial) => {
          const isActive = tutorial.id === activeTutorialId;
          const href = `/learn/topics/${topicSlug}/${tutorial.slug}`;
          
          return (
            <Link
              key={tutorial.id}
              href={tutorial.isLocked ? "#" : href}
              className={cn(
                "flex items-center py-3 px-4 hover:bg-muted/50 transition-colors",
                isActive && "bg-primary/10 hover:bg-primary/10",
                tutorial.isLocked && "cursor-not-allowed opacity-70"
              )}
            >
              <div className="flex-shrink-0 mr-3">
                {tutorial.isCompleted ? (
                  <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : showIndexNumbers ? (
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {tutorial.index + 1}
                  </div>
                ) : null}
              </div>
              
              <div className="flex-grow mr-2">
                <div className="flex items-center">
                  <span className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary"
                  )}>
                    {tutorial.title}
                  </span>
                  {getTypeLabel(tutorial.type)}
                </div>
                
                {tutorial.durationMinutes && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {tutorial.durationMinutes} min
                  </div>
                )}
              </div>
              
              {tutorial.isLocked ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className={cn(
                  "h-4 w-4 text-muted-foreground",
                  isActive && "text-primary"
                )} />
              )}
            </Link>
          );
        })}
      </div>
      
      {isCollapsible && tutorials.length > 5 && (
        <div className="p-2 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs" 
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? `Show all (${tutorials.length})` : 'Show less'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TutorialsList; 