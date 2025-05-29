"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Save, CheckCircle, ChevronRight, Lightbulb, Image, FileText, Video, File, Clock, Users, Plus, Code, HelpCircle, Pencil, GripVertical, X, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseFormBasic } from '@/components/creator/CourseFormBasic';
import { DraggableCourseCurriculumBuilder, Curriculum } from '@/components/creator/DraggableCourseCurriculumBuilder';
import { CourseSettings } from '@/components/creator/CourseSettings';
import { CourseAnalyticsSetup } from '@/components/creator/CourseAnalyticsSetup';
import { RichTextEditor } from '@/components/creator/RichTextEditor';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CourseContentUploader } from '@/components/creator/CourseContentUploader';
import { CoursePreviewGenerator } from '@/components/creator/CoursePreviewGenerator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// New interface for content blocks
interface ContentBlock {
  id: string;
  type: 'text' | 'code' | 'quiz' | 'file' | 'video' | 'image';
  content: any;
  settings?: Record<string, any>;
}

interface CourseData {
  basic: any;
  curriculum: Curriculum;
  settings: any;
  analytics: any;
  contentBlocks: ContentBlock[];
  materials: Array<{url: string, type: string, name: string}>;
}

// Block type options for the add block menu
const blockTypes = [
  { id: 'text', name: 'Text', icon: <Pencil className="h-4 w-4" /> },
  { id: 'code', name: 'Code', icon: <Code className="h-4 w-4" /> },
  { id: 'quiz', name: 'Quiz', icon: <HelpCircle className="h-4 w-4" /> },
  { id: 'file', name: 'File', icon: <File className="h-4 w-4" /> },
  { id: 'video', name: 'Video', icon: <Video className="h-4 w-4" /> },
  { id: 'image', name: 'Image', icon: <Image className="h-4 w-4" /> },
];

// Component for adding new blocks
function BlockAdder({ onAddBlock }: { onAddBlock: (type: string) => void }) {
  return (
    <div className="flex justify-center my-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Content Block
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <div className="grid grid-cols-2 gap-1">
            {blockTypes.map((type) => (
              <Button 
                key={type.id}
                variant="ghost" 
                size="sm" 
                className="flex items-center justify-start gap-2 h-9 px-2"
                onClick={() => onAddBlock(type.id)}
              >
                {type.icon}
                <span>{type.name}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Component for rendering a block based on its type
function ContentBlockRenderer({ 
  block, 
  onUpdate, 
  onDelete 
}: { 
  block: ContentBlock; 
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}) {
  switch (block.type) {
    case 'text':
      return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <Pencil className="h-5 w-5 mr-2 text-blue-600" />
              Text Content
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(block.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <RichTextEditor 
            initialContent={block.content || ''} 
            onChange={(html) => onUpdate(block.id, html)}
            placeholder="Enter content here..."
            className="min-h-[150px]"
          />
        </div>
      );
    
    case 'code':
      return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-600" />
              Code Example
            </h3>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDelete(block.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border rounded-md overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm border-b">
              <select 
                className="bg-transparent border-0 outline-none"
                value={block.settings?.language || 'javascript'}
                onChange={(e) => onUpdate(block.id, block.content, { ...block.settings, language: e.target.value })}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>
            <textarea 
              className="w-full min-h-[150px] p-3 font-mono text-sm resize-none outline-none"
              value={block.content || '// Enter code here'}
              onChange={(e) => onUpdate(block.id, e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>
      );
    
    case 'quiz':
      return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
              Quiz Question
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(block.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                value={block.content?.question || ''}
                onChange={(e) => onUpdate(block.id, { ...block.content, question: e.target.value })}
                placeholder="Enter your question here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Options</label>
              <div className="space-y-2">
                {(block.content?.options || []).map((option: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={option.isCorrect} 
                      onChange={() => {
                        const newOptions = block.content.options.map((opt: any, i: number) => ({
                          ...opt,
                          isCorrect: i === index
                        }));
                        onUpdate(block.id, { ...block.content, options: newOptions });
                      }}
                    />
                    <input 
                      type="text" 
                      className="flex-1 p-2 border rounded-md"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...block.content.options];
                        newOptions[index] = { ...option, text: e.target.value };
                        onUpdate(block.id, { ...block.content, options: newOptions });
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        const newOptions = block.content.options.filter((_: any, i: number) => i !== index);
                        onUpdate(block.id, { ...block.content, options: newOptions });
                      }}
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const newOptions = [...(block.content?.options || []), { text: '', isCorrect: false }];
                    onUpdate(block.id, { ...block.content, options: newOptions });
                  }}
                >
                  Add Option
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Explanation (Optional)</label>
              <textarea 
                className="w-full p-2 border rounded-md"
                value={block.content?.explanation || ''}
                onChange={(e) => onUpdate(block.id, { ...block.content, explanation: e.target.value })}
                placeholder="Explain the correct answer"
                rows={3}
              />
            </div>
          </div>
        </div>
      );
    
    case 'file':
      return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center">
              <File className="h-5 w-5 mr-2 text-blue-600" />
              File Upload
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(block.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CourseContentUploader 
            onFileUploaded={(fileUrl, fileType, fileName) => {
              onUpdate(block.id, { url: fileUrl, type: fileType, name: fileName });
            }} 
          />
        </div>
      );
    
    default:
      return (
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Unsupported Block Type</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(block.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">This block type is not supported yet.</p>
        </div>
      );
  }
}

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [courseData, setCourseData] = useState<CourseData>({
    basic: {},
    curriculum: { sections: [] },
    settings: {},
    analytics: {},
    contentBlocks: [
      {
        id: 'description',
        type: 'text',
        content: '',
      }
    ],
    materials: [],
  });
  
  const handleBasicInfoSave = (data: any) => {
    setCourseData(prev => ({ ...prev, basic: data }));
    toast({
      title: "Basic info saved",
      description: "Course information has been updated.",
    });
    setActiveTab("curriculum");
  };
  
  const handleCurriculumSave = (data: Curriculum) => {
    setCourseData(prev => ({ ...prev, curriculum: data }));
    toast({
      title: "Curriculum saved",
      description: "Course curriculum has been updated.",
    });
    setActiveTab("content");
  };
  
  const handleSettingsSave = (data: any) => {
    setCourseData(prev => ({ ...prev, settings: data }));
    toast({
      title: "Settings saved",
      description: "Course settings have been updated.",
    });
    setActiveTab("preview");
  };
  
  const handleFileUploaded = (fileUrl: string, fileType: string, fileName: string) => {
    setCourseData(prev => ({
      ...prev,
      materials: [...prev.materials, { url: fileUrl, type: fileType, name: fileName }]
    }));
    
    toast({
      title: "File uploaded",
      description: `${fileName} has been uploaded successfully.`,
    });
  };
  
  // Add a new content block
  const handleAddBlock = (type: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: type as ContentBlock['type'],
      content: type === 'quiz' ? { question: '', options: [{ text: '', isCorrect: true }], explanation: '' } : '',
    };
    
    setCourseData(prev => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, newBlock]
    }));
  };
  
  // Update a content block
  const handleUpdateBlock = (id: string, content: any, settings?: Record<string, any>) => {
    setCourseData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(block => 
        block.id === id 
          ? { ...block, content, settings: settings || block.settings } 
          : block
      )
    }));
  };
  
  // Delete a content block
  const handleDeleteBlock = (id: string) => {
    setCourseData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter(block => block.id !== id)
    }));
  };
  
  // Handle reordering blocks
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(courseData.contentBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setCourseData(prev => ({
      ...prev,
      contentBlocks: items
    }));
  };
  
  const handlePublish = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send data to the server
      console.log('Publishing course with data:', courseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Course published successfully!",
        description: "Your course is now live and available to students.",
      });
      
      // In a real implementation, redirect to the course page
      // router.push(`/creator-courses/${courseId}`);
    } catch (error) {
      toast({
        title: "Failed to publish course",
        description: "An error occurred while publishing your course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would send data to the server
      console.log('Saving draft with data:', courseData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Draft saved",
        description: "Your course draft has been saved.",
      });
    } catch (error) {
      toast({
        title: "Failed to save draft",
        description: "An error occurred while saving your course draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if enough sections are completed to enable publishing
  const canPublish = () => {
    const hasBasicInfo = Object.keys(courseData.basic).length > 0;
    const hasCurriculum = courseData.curriculum.sections.length > 0;
    const hasContent = courseData.contentBlocks.length > 0;
    
    return hasBasicInfo && hasCurriculum && hasContent;
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Simple Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/creator-courses" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Create New Course</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button 
            onClick={handlePublish}
            disabled={isSubmitting || !canPublish()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Publish Course
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Streamlined Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-lg grid grid-cols-4">
          <TabsTrigger value="basic" className="rounded-md">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-md">
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="content" className="rounded-md">
            Content
          </TabsTrigger>
          <TabsTrigger value="preview" className="rounded-md">
            Preview
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border">
          <TabsContent value="basic" className="m-0">
            <div className="p-6 border-b bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Enter the basic details about your course that will help students understand what they'll learn.
              </p>
            </div>
            <div className="p-6">
              <CourseFormBasic 
                initialData={courseData.basic}
                onSave={handleBasicInfoSave}
              />
            </div>
            <div className="flex justify-end p-4 border-t">
              <Button onClick={() => setActiveTab("curriculum")} className="bg-blue-600 hover:bg-blue-700">
                Continue to Curriculum
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum" className="m-0">
            <div className="p-6 border-b bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
              <h2 className="text-xl font-semibold">Course Curriculum</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Design your course structure by adding sections and lessons. Drag and drop to reorder.
              </p>
            </div>
            <div className="p-6">
              <DraggableCourseCurriculumBuilder 
                initialData={courseData.curriculum} 
                onChange={(curriculum) => setCourseData({ ...courseData, curriculum })}
              />
            </div>
            <div className="flex justify-between p-4 border-t">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("content")} className="bg-blue-600 hover:bg-blue-700">
                Continue to Content
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="m-0">
            <div className="p-6 border-b bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
              <h2 className="text-xl font-semibold">Course Content</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Create detailed descriptions, interactive elements, and upload course materials.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="content-blocks">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {courseData.contentBlocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="relative"
                            >
                              <div 
                                {...provided.dragHandleProps}
                                className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-8 cursor-grab"
                              >
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="pl-8">
                                <ContentBlockRenderer 
                                  block={block} 
                                  onUpdate={handleUpdateBlock} 
                                  onDelete={handleDeleteBlock} 
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <BlockAdder onAddBlock={handleAddBlock} />
            </div>
            <div className="flex justify-between p-4 border-t">
              <Button variant="outline" onClick={() => setActiveTab("curriculum")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("preview")} className="bg-blue-600 hover:bg-blue-700">
                Continue to Preview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="m-0">
            <div className="p-6 border-b bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
              <h2 className="text-xl font-semibold">Course Preview</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Preview how your course will appear to students before publishing.
              </p>
            </div>
            <div className="p-6">
              <CoursePreviewGenerator courseData={courseData} />
            </div>
            <div className="flex justify-between p-4 border-t">
              <Button variant="outline" onClick={() => setActiveTab("content")}>
                Back
              </Button>
              <Button 
                onClick={handlePublish} 
                disabled={isSubmitting || !canPublish()}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
              >
                {isSubmitting ? "Publishing..." : "Publish Course"}
              </Button>
            </div>
          </TabsContent>
        </div>
        
        {/* Quick Tips Box */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-400">Pro Tip</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                {activeTab === "basic" && "Courses with clear, descriptive titles and compelling thumbnails get more student interest."}
                {activeTab === "curriculum" && "Well-structured courses with clear progression help students stay engaged and complete the course."}
                {activeTab === "content" && "Interactive elements like code examples and quizzes significantly improve student engagement and learning outcomes."}
                {activeTab === "preview" && "Review your course from a student's perspective before publishing."}
              </p>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
} 