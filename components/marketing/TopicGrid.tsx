"use client";

import React from 'react';
import { Code, Database, LucideIcon, Pencil, LineChart, Layers, SlidersHorizontal, PenTool, ShieldCheck, Lightbulb } from 'lucide-react';
import TopicCard, { DifficultyLevel } from './TopicCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: DifficultyLevel;
  lessonCount: number;
  progress?: number;
  isNew?: boolean;
  isPopular?: boolean;
}

interface TopicGridProps {
  topics: Topic[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  showViewAll?: boolean;
  viewAllUrl?: string;
  maxItems?: number;
}

// Helper map of icon components
const iconMap: Record<string, LucideIcon> = {
  'code': Code,
  'database': Database,
  'pencil': Pencil,
  'lineChart': LineChart,
  'layers': Layers,
  'sliders': SlidersHorizontal,
  'penTool': PenTool,
  'shield': ShieldCheck,
  'lightbulb': Lightbulb,
};

const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  title = 'Popular Learning Topics',
  subtitle,
  showFilters = false,
  showViewAll = false,
  viewAllUrl = '/learn/topics',
  maxItems,
}) => {
  const [filteredTopics, setFilteredTopics] = React.useState<Topic[]>(topics);
  const [difficulty, setDifficulty] = React.useState<string>('all');

  React.useEffect(() => {
    if (difficulty === 'all') {
      setFilteredTopics(topics);
    } else {
      setFilteredTopics(topics.filter(topic => topic.difficulty === difficulty));
    }
  }, [difficulty, topics]);

  const displayTopics = maxItems ? filteredTopics.slice(0, maxItems) : filteredTopics;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1.5">{subtitle}</p>}
        </div>
        
        {showFilters && (
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Select 
              value={difficulty} 
              onValueChange={setDifficulty}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {displayTopics.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No topics match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTopics.map(topic => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              slug={topic.slug}
              title={topic.title}
              description={topic.description}
              icon={typeof topic.icon === 'string' ? iconMap[topic.icon as string] || Code : topic.icon}
              difficulty={topic.difficulty}
              lessonCount={topic.lessonCount}
              progress={topic.progress}
              isNew={topic.isNew}
              isPopular={topic.isPopular}
            />
          ))}
        </div>
      )}
      
      {showViewAll && filteredTopics.length > (maxItems || 0) && (
        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" size="lg">
            <a href={viewAllUrl}>View All Topics</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopicGrid; 