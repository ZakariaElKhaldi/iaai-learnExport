"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Code,
  FileText,
  HelpCircle,
  Image,
  Video
} from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'code' | 'quiz' | 'file' | 'video' | 'image';
  content: any;
  settings?: Record<string, any>;
}

interface CourseSection {
  id: string;
  title: string;
  lessons: Array<{
    id: string;
    title: string;
    type: string;
    duration?: number;
  }>;
}

interface CourseData {
  basic: any;
  curriculum: {
    sections: CourseSection[];
  };
  settings: any;
  analytics: any;
  contentBlocks: ContentBlock[];
  materials: Array<{url: string, type: string, name: string}>;
}

interface CoursePreviewGeneratorProps {
  courseData: CourseData;
  className?: string;
}

export function CoursePreviewGenerator({ courseData, className }: CoursePreviewGeneratorProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  // Extract basic info
  const title = courseData.basic.title || 'Untitled Course';
  const subtitle = courseData.basic.subtitle || '';
  const category = courseData.basic.category || 'Uncategorized';
  const level = courseData.basic.level || 'All Levels';
  const thumbnailUrl = courseData.basic.thumbnailUrl || '/placeholders/course-thumbnail.jpg';
  
  // Extract content blocks
  const contentBlocks = courseData.contentBlocks || [];
  
  // Find description block (first text block or empty string)
  const descriptionBlock = contentBlocks.find(block => block.type === 'text') || { content: '' };
  const description = typeof descriptionBlock.content === 'string' ? descriptionBlock.content : '';
  
  // Count interactive elements
  const codeExamples = contentBlocks.filter(block => block.type === 'code').length;
  const quizzes = contentBlocks.filter(block => block.type === 'quiz').length;
  const files = contentBlocks.filter(block => block.type === 'file').length;
  const videos = contentBlocks.filter(block => block.type === 'video').length;
  const images = contentBlocks.filter(block => block.type === 'image').length;
  
  // Calculate course stats
  const totalLessons = courseData.curriculum.sections.reduce(
    (total, section) => total + section.lessons.length, 
    0
  );
  
  // Estimate course duration (in minutes)
  const estimatedDuration = courseData.curriculum.sections.reduce(
    (total, section) => 
      total + section.lessons.reduce(
        (sectionTotal, lesson) => sectionTotal + (lesson.duration || 10), 
        0
      ), 
    0
  );
  
  // Format duration as hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 
      ? `${hours} hour${hours !== 1 ? 's' : ''} ${mins > 0 ? `${mins} min` : ''}` 
      : `${mins} min`;
  };
  
  // Generate AI preview
  const handleGeneratePreview = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };
  
  // Render content block preview
  const renderContentBlockPreview = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
        );
      
      case 'code':
        return (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Code Example</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {block.settings?.language || 'javascript'}
              </span>
            </div>
            <pre className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md overflow-x-auto text-sm font-mono">
              <code>{block.content}</code>
            </pre>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="mb-4 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Quiz Question</span>
            </div>
            <p className="font-medium mb-3">{block.content?.question || 'Question preview'}</p>
            <ul className="space-y-2">
              {(block.content?.options || []).map((option: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center">
                    {option.isCorrect && (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'file':
        return (
          <div className="mb-4 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-500" />
              <span className="font-medium">
                {block.content?.name || 'File resource'}
              </span>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="mb-4 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-4 w-4 text-red-500" />
              <span className="font-medium">Video Content</span>
            </div>
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center">
              <span className="text-sm text-slate-500">Video Preview</span>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Image className="h-4 w-4 text-green-500" />
              <span className="font-medium">Image</span>
            </div>
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center">
              <span className="text-sm text-slate-500">Image Preview</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className={className}>
      {isGenerated ? (
        <div className="space-y-6">
          {/* Course Header */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
            
            <div className="flex flex-wrap gap-2">
              {level && (
                <Badge variant="outline" className="capitalize">
                  {level}
                </Badge>
              )}
              {category && (
                <Badge variant="outline">
                  {category}
                </Badge>
              )}
              <Badge variant="outline">
                {totalLessons} lessons
              </Badge>
              <Badge variant="outline">
                {formatDuration(estimatedDuration)}
              </Badge>
            </div>
          </div>
          
          {/* Course Content */}
          <Card>
            <CardHeader className="pb-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="content">Content Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                </TabsContent>
                
                <TabsContent value="curriculum">
                  {courseData.curriculum.sections.length > 0 ? (
                    <div className="space-y-4">
                      {courseData.curriculum.sections.map((section, index) => (
                        <div key={section.id} className="border rounded-md overflow-hidden">
                          <div className="bg-muted p-3 flex items-center justify-between">
                            <h3 className="font-medium">Section {index + 1}: {section.title}</h3>
                            <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                          </div>
                          <div className="p-3">
                            <ul className="space-y-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <li key={lesson.id} className="flex items-center justify-between">
                                  <span>{lessonIndex + 1}. {lesson.title}</span>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize">{lesson.type}</Badge>
                                    {lesson.duration && <span className="text-sm text-muted-foreground">{lesson.duration} min</span>}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No curriculum sections have been added yet.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-6">
                    {contentBlocks.length > 0 ? (
                      contentBlocks.map(block => (
                        <div key={block.id}>
                          {renderContentBlockPreview(block)}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No content blocks added yet.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Sparkles className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Generate Course Preview</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Click the button below to generate a preview of how your course will appear to students.
          </p>
          <button
            onClick={handleGeneratePreview}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Preview...
              </>
            ) : (
              'Generate Preview'
            )}
          </button>
        </div>
      )}
    </div>
  );
}