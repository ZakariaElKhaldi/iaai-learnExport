"use client";

import { useState } from 'react';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  GripVertical,
  FileText,
  Video,
  FileQuestion,
  Link as LinkIcon,
  Download,
  Move,
  Edit,
  Copy,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

export interface LessonContent {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'link' | 'download';
  content: string;
  duration?: string;
  description?: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  lessons: LessonContent[];
  isExpanded?: boolean;
}

export interface Curriculum {
  sections: Section[];
}

interface CourseCurriculumBuilderProps {
  initialData?: Curriculum;
  onChange: (curriculum: Curriculum) => void;
}

export function CourseCurriculumBuilder({ initialData, onChange }: CourseCurriculumBuilderProps) {
  const [curriculum, setCurriculum] = useState<Curriculum>(initialData || { sections: [] });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [isAddingLessonOpen, setIsAddingLessonOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
  });
  
  const [newLesson, setNewLesson] = useState<{
    title: string;
    type: LessonContent['type'];
    content: string;
    duration: string;
    description: string;
  }>({
    title: '',
    type: 'video',
    content: '',
    duration: '',
    description: '',
  });
  
  // Generate a unique ID
  const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  const handleAddSection = () => {
    const section: Section = {
      id: generateId(),
      title: newSection.title,
      description: newSection.description,
      lessons: [],
      isExpanded: true,
    };
    
    const updatedCurriculum = {
      ...curriculum,
      sections: [...curriculum.sections, section],
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
    setNewSection({ title: '', description: '' });
    setIsAddingSectionOpen(false);
    setActiveSection(section.id);
  };
  
  const handleAddLesson = () => {
    if (!currentSectionId) return;
    
    const lesson: LessonContent = {
      id: generateId(),
      title: newLesson.title,
      type: newLesson.type,
      content: newLesson.content,
      duration: newLesson.duration,
      description: newLesson.description,
    };
    
    const updatedCurriculum = {
      ...curriculum,
      sections: curriculum.sections.map(section => {
        if (section.id === currentSectionId) {
          return {
            ...section,
            lessons: [...section.lessons, lesson],
          };
        }
        return section;
      }),
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
    setNewLesson({
      title: '',
      type: 'video',
      content: '',
      duration: '',
      description: '',
    });
    setIsAddingLessonOpen(false);
  };
  
  const handleDeleteSection = (sectionId: string) => {
    const updatedCurriculum = {
      ...curriculum,
      sections: curriculum.sections.filter(section => section.id !== sectionId),
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
    
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };
  
  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    const updatedCurriculum = {
      ...curriculum,
      sections: curriculum.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.filter(lesson => lesson.id !== lessonId),
          };
        }
        return section;
      }),
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
  };
  
  const toggleSectionExpand = (sectionId: string) => {
    setCurriculum({
      ...curriculum,
      sections: curriculum.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            isExpanded: !section.isExpanded,
          };
        }
        return section;
      }),
    });
  };
  
  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    
    const sections = [...curriculum.sections];
    const temp = sections[index];
    sections[index] = sections[index - 1];
    sections[index - 1] = temp;
    
    const updatedCurriculum = {
      ...curriculum,
      sections,
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
  };
  
  const moveSectionDown = (index: number) => {
    if (index === curriculum.sections.length - 1) return;
    
    const sections = [...curriculum.sections];
    const temp = sections[index];
    sections[index] = sections[index + 1];
    sections[index + 1] = temp;
    
    const updatedCurriculum = {
      ...curriculum,
      sections,
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
  };
  
  const moveLessonUp = (sectionId: string, index: number) => {
    if (index === 0) return;
    
    const updatedCurriculum = {
      ...curriculum,
      sections: curriculum.sections.map(section => {
        if (section.id === sectionId) {
          const lessons = [...section.lessons];
          const temp = lessons[index];
          lessons[index] = lessons[index - 1];
          lessons[index - 1] = temp;
          
          return {
            ...section,
            lessons,
          };
        }
        return section;
      }),
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
  };
  
  const moveLessonDown = (sectionId: string, index: number) => {
    const section = curriculum.sections.find(s => s.id === sectionId);
    if (!section || index === section.lessons.length - 1) return;
    
    const updatedCurriculum = {
      ...curriculum,
      sections: curriculum.sections.map(section => {
        if (section.id === sectionId) {
          const lessons = [...section.lessons];
          const temp = lessons[index];
          lessons[index] = lessons[index + 1];
          lessons[index + 1] = temp;
          
          return {
            ...section,
            lessons,
          };
        }
        return section;
      }),
    };
    
    setCurriculum(updatedCurriculum);
    onChange(updatedCurriculum);
  };
  
  const getLessonIcon = (type: LessonContent['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Course Curriculum</h3>
          <Dialog open={isAddingSectionOpen} onOpenChange={setIsAddingSectionOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="section-title">Section Title</Label>
                  <Input
                    id="section-title"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                    placeholder="Enter section title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="section-description">Description (optional)</Label>
                  <Textarea
                    id="section-description"
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                    placeholder="Enter section description"
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddSection} disabled={!newSection.title.trim()}>
                  Add Section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {curriculum.sections.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">No sections yet. Add a section to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {curriculum.sections.map((section, sectionIndex) => (
              <div key={section.id} className="border rounded-md overflow-hidden">
                <div className="bg-muted/50 p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <div>
                      <p className="text-xs text-muted-foreground">Section {sectionIndex + 1}</p>
                      <h4 className="font-medium">{section.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSectionExpand(section.id)}
                    >
                      {section.isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSectionUp(sectionIndex)}
                      disabled={sectionIndex === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSectionDown(sectionIndex)}
                      disabled={sectionIndex === curriculum.sections.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                
                {section.isExpanded && (
                  <div className="p-4 space-y-4">
                    {section.description && (
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    )}
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Lessons</h5>
                      
                      {section.lessons.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No lessons yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div 
                              key={lesson.id}
                              className="border rounded flex items-center p-3 bg-background"
                            >
                              <div className="flex items-center flex-1">
                                <div className="flex-shrink-0 h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                  {getLessonIcon(lesson.type)}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{lesson.title}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <span className="capitalize">{lesson.type}</span>
                                    {lesson.duration && (
                                      <>
                                        <span className="px-1">•</span>
                                        <span>{lesson.duration}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveLessonUp(section.id, lessonIndex)}
                                  disabled={lessonIndex === 0}
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveLessonDown(section.id, lessonIndex)}
                                  disabled={lessonIndex === section.lessons.length - 1}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteLesson(section.id, lesson.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Dialog 
                        open={isAddingLessonOpen && currentSectionId === section.id} 
                        onOpenChange={(open) => {
                          setIsAddingLessonOpen(open);
                          if (open) {
                            setCurrentSectionId(section.id);
                          } else {
                            setCurrentSectionId(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => {
                              setCurrentSectionId(section.id);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Lesson
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Lesson to {section.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="lesson-title">Lesson Title</Label>
                              <Input
                                id="lesson-title"
                                value={newLesson.title}
                                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                placeholder="Enter lesson title"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lesson-type">Lesson Type</Label>
                              <Select
                                value={newLesson.type}
                                onValueChange={(value: LessonContent['type']) => 
                                  setNewLesson({ ...newLesson, type: value })
                                }
                              >
                                <SelectTrigger id="lesson-type" className="mt-1">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="text">Text/Article</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="link">External Link</SelectItem>
                                  <SelectItem value="download">Downloadable Resource</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="lesson-content">
                                {newLesson.type === 'video' && 'Video URL'}
                                {newLesson.type === 'text' && 'Content'}
                                {newLesson.type === 'quiz' && 'Quiz ID/Reference'}
                                {newLesson.type === 'link' && 'External URL'}
                                {newLesson.type === 'download' && 'File URL/Reference'}
                              </Label>
                              <Input
                                id="lesson-content"
                                value={newLesson.content}
                                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                                placeholder={`Enter ${newLesson.type} content`}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lesson-duration">Duration (optional)</Label>
                              <Input
                                id="lesson-duration"
                                value={newLesson.duration}
                                onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                placeholder="e.g. 10:30 or 1h 30m"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lesson-description">Description (optional)</Label>
                              <Textarea
                                id="lesson-description"
                                value={newLesson.description}
                                onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                                placeholder="Enter lesson description"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              onClick={handleAddLesson} 
                              disabled={!newLesson.title.trim() || !newLesson.content.trim()}
                            >
                              Add Lesson
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 