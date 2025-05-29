"use client";

import { useState, useCallback } from 'react';
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
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

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

interface DraggableCourseCurriculumBuilderProps {
  initialData?: Curriculum;
  onChange: (curriculum: Curriculum) => void;
}

// Sortable Section component
function SortableSection({ section, sectionIndex, onDelete, onToggleExpand, children }: { 
  section: Section; 
  sectionIndex: number;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="border rounded-md overflow-hidden mb-4">
      <div className="bg-muted/50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Section {sectionIndex + 1}</p>
            <h4 className="font-medium">{section.title}</h4>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(section.id)}
          >
            {section.isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(section.id)}
          >
            <Trash2 size={16} className="text-destructive" />
          </Button>
        </div>
      </div>
      
      {section.isExpanded && children}
    </div>
  );
}

// Sortable Lesson component
function SortableLesson({ lesson, lessonIndex, sectionId, onDelete }: { 
  lesson: LessonContent; 
  lessonIndex: number;
  sectionId: string;
  onDelete: (sectionId: string, lessonId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${sectionId}-${lesson.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const getLessonIcon = (type: LessonContent['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-primary" />;
      case 'text':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4 text-primary" />;
      case 'link':
        return <LinkIcon className="h-4 w-4 text-primary" />;
      case 'download':
        return <Download className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="border rounded flex items-center p-3 bg-background mb-2"
    >
      <div className="flex items-center flex-1">
        <div {...attributes} {...listeners} className="flex-shrink-0 mr-3 cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
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
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(sectionId, lesson.id)}
      >
        <Trash2 size={16} className="text-destructive" />
      </Button>
    </div>
  );
}

export function DraggableCourseCurriculumBuilder({ initialData, onChange }: DraggableCourseCurriculumBuilderProps) {
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
  
  // Drag and drop state
  const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'section' | 'lesson' | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
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
  
  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragId(active.id);
    
    // Determine if we're dragging a section or a lesson
    if (typeof active.id === 'string') {
      if (active.id.includes('-')) {
        setActiveType('lesson');
      } else {
        setActiveType('section');
      }
    }
  };
  
  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveDragId(null);
      setActiveType(null);
      return;
    }
    
    if (active.id !== over.id) {
      // Handle section reordering
      if (!active.id.toString().includes('-') && !over.id.toString().includes('-')) {
        const oldIndex = curriculum.sections.findIndex(section => section.id === active.id);
        const newIndex = curriculum.sections.findIndex(section => section.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const updatedCurriculum = {
            ...curriculum,
            sections: arrayMove(curriculum.sections, oldIndex, newIndex),
          };
          
          setCurriculum(updatedCurriculum);
          onChange(updatedCurriculum);
        }
      } 
      // Handle lesson reordering
      else if (active.id.toString().includes('-') && over.id.toString().includes('-')) {
        const [activeSectionId, activeLessonId] = active.id.toString().split('-');
        const [overSectionId, overLessonId] = over.id.toString().split('-');
        
        // If lessons are in the same section
        if (activeSectionId === overSectionId) {
          const sectionIndex = curriculum.sections.findIndex(section => section.id === activeSectionId);
          
          if (sectionIndex !== -1) {
            const lessons = [...curriculum.sections[sectionIndex].lessons];
            const oldIndex = lessons.findIndex(lesson => lesson.id === activeLessonId);
            const newIndex = lessons.findIndex(lesson => lesson.id === overLessonId);
            
            if (oldIndex !== -1 && newIndex !== -1) {
              const updatedSections = curriculum.sections.map((section, index) => {
                if (index === sectionIndex) {
                  return {
                    ...section,
                    lessons: arrayMove(lessons, oldIndex, newIndex),
                  };
                }
                return section;
              });
              
              const updatedCurriculum = {
                ...curriculum,
                sections: updatedSections,
              };
              
              setCurriculum(updatedCurriculum);
              onChange(updatedCurriculum);
            }
          }
        }
        // If lessons are in different sections (future enhancement)
        // This would require a more complex implementation to move lessons between sections
      }
    }
    
    setActiveDragId(null);
    setActiveType(null);
  };
  
  // Find active item for drag overlay
  const getActiveItem = useCallback(() => {
    if (!activeDragId) return null;
    
    if (activeType === 'section') {
      return curriculum.sections.find(section => section.id === activeDragId);
    } else if (activeType === 'lesson' && typeof activeDragId === 'string') {
      const [sectionId, lessonId] = activeDragId.split('-');
      const section = curriculum.sections.find(s => s.id === sectionId);
      return section?.lessons.find(lesson => lesson.id === lessonId);
    }
    
    return null;
  }, [activeDragId, activeType, curriculum.sections]);
  
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={curriculum.sections.map(section => section.id)}
              strategy={verticalListSortingStrategy}
            >
              {curriculum.sections.map((section, sectionIndex) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  sectionIndex={sectionIndex}
                  onDelete={handleDeleteSection}
                  onToggleExpand={toggleSectionExpand}
                >
                  <div className="p-4 space-y-4">
                    {section.description && (
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium">Lessons</h5>
                        <Dialog open={isAddingLessonOpen && currentSectionId === section.id} onOpenChange={(open) => {
                          setIsAddingLessonOpen(open);
                          if (open) setCurrentSectionId(section.id);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-1 h-3 w-3" />
                              Add Lesson
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Lesson</DialogTitle>
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
                              <Button onClick={handleAddLesson} disabled={!newLesson.title.trim() || !newLesson.content.trim()}>
                                Add Lesson
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {section.lessons.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No lessons yet.</p>
                      ) : (
                        <SortableContext
                          items={section.lessons.map(lesson => `${section.id}-${lesson.id}`)}
                          strategy={verticalListSortingStrategy}
                        >
                          {section.lessons.map((lesson, lessonIndex) => (
                            <SortableLesson
                              key={`${section.id}-${lesson.id}`}
                              lesson={lesson}
                              lessonIndex={lessonIndex}
                              sectionId={section.id}
                              onDelete={handleDeleteLesson}
                            />
                          ))}
                        </SortableContext>
                      )}
                    </div>
                  </div>
                </SortableSection>
              ))}
            </SortableContext>
            
            {/* Drag overlay for visual feedback */}
            <DragOverlay>
              {activeDragId && activeType === 'section' && getActiveItem() && (
                <div className="border rounded-md overflow-hidden bg-background opacity-80">
                  <div className="bg-muted/50 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">{(getActiveItem() as Section).title}</h4>
                    </div>
                  </div>
                </div>
              )}
              
              {activeDragId && activeType === 'lesson' && getActiveItem() && (
                <div className="border rounded flex items-center p-3 bg-background opacity-80">
                  <div className="flex items-center">
                    <GripVertical className="h-5 w-5 text-muted-foreground mr-3" />
                    <div className="font-medium">{(getActiveItem() as LessonContent).title}</div>
                  </div>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
} 