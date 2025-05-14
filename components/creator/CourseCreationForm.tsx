"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Book, 
  Plus, 
  X, 
  FileText, 
  Video, 
  Upload, 
  Check,
  ChevronDown,
  Save,
  Clock,
  DollarSign,
  Tag
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Course schema
const courseSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  subtitle: z.string().max(150).optional(),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  level: z.enum(["beginner", "intermediate", "advanced", "all-levels"]),
  price: z.coerce.number().min(0),
  isPublished: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  estimatedDuration: z.coerce.number().min(0).optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export interface CourseCreationFormProps {
  onSave: (data: CourseFormValues) => Promise<void>;
  onPublish: (data: CourseFormValues) => Promise<void>;
  onCancel: () => void;
  defaultValues?: Partial<CourseFormValues>;
  className?: string;
}

export default function CourseCreationForm({
  onSave,
  onPublish,
  onCancel,
  defaultValues,
  className,
}: CourseCreationFormProps) {
  // State for tags and prerequisites
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [prerequisites, setPrerequisites] = useState<string[]>(defaultValues?.prerequisites || []);
  const [prerequisiteInput, setPrerequisiteInput] = useState('');
  const [targetAudience, setTargetAudience] = useState<string[]>(defaultValues?.targetAudience || []);
  const [targetAudienceInput, setTargetAudienceInput] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  
  // Initialize form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      subtitle: defaultValues?.subtitle || '',
      description: defaultValues?.description || '',
      category: defaultValues?.category || '',
      level: defaultValues?.level || 'all-levels',
      price: defaultValues?.price || 0,
      isPublished: defaultValues?.isPublished || false,
      tags: defaultValues?.tags || [],
      prerequisites: defaultValues?.prerequisites || [],
      targetAudience: defaultValues?.targetAudience || [],
      estimatedDuration: defaultValues?.estimatedDuration || 0,
    },
  });

  // Handle form submission
  const onSubmit = async (data: CourseFormValues) => {
    const formData = {
      ...data,
      tags,
      prerequisites,
      targetAudience,
    };
    
    await onSave(formData);
  };
  
  // Handle form publish
  const handlePublish = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      const formData = {
        ...data,
        tags,
        prerequisites,
        targetAudience,
        isPublished: true,
      };
      
      await onPublish(formData);
    }
  };
  
  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tagInput.trim() !== '') {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  // Handle prerequisite input
  const handlePrerequisiteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && prerequisiteInput) {
      e.preventDefault();
      if (!prerequisites.includes(prerequisiteInput.trim()) && prerequisiteInput.trim() !== '') {
        setPrerequisites([...prerequisites, prerequisiteInput.trim()]);
        setPrerequisiteInput('');
      }
    }
  };
  
  const removePrerequisite = (prerequisite: string) => {
    setPrerequisites(prerequisites.filter(p => p !== prerequisite));
  };
  
  // Handle target audience input
  const handleTargetAudienceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && targetAudienceInput) {
      e.preventDefault();
      if (!targetAudience.includes(targetAudienceInput.trim()) && targetAudienceInput.trim() !== '') {
        setTargetAudience([...targetAudience, targetAudienceInput.trim()]);
        setTargetAudienceInput('');
      }
    }
  };
  
  const removeTargetAudience = (audience: string) => {
    setTargetAudience(targetAudience.filter(a => a !== audience));
  };
  
  // Categories for select dropdown
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Business",
    "Marketing",
    "Design",
    "Photography",
    "Music",
    "Health & Fitness",
    "Language Learning",
    "Personal Development",
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Create New Course
          </CardTitle>
          <CardDescription>
            Fill in the details to create your new course. You can save as draft and continue later.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="basic" className="space-y-6">
                  {/* Basic Course Information */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Complete Web Development Bootcamp" {...field} />
                        </FormControl>
                        <FormDescription>
                          A clear, specific title will attract more students.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Learn HTML, CSS, JavaScript, React, Node and more!" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A compelling subtitle can help with course discovery.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what students will learn in this course..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Clearly explain what students will be able to do after taking your course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the category that best fits your course.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Level*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="all-levels">All Levels</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Specify the experience level required for this course.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Tags Input */}
                  <div className="space-y-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="py-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tags (press Enter to add)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
                            setTags([...tags, tagInput.trim()]);
                            setTagInput('');
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>
                      Add relevant tags to help students discover your course.
                    </FormDescription>
                  </div>
                  
                  {/* Upload Course Thumbnail */}
                  <div className="space-y-2">
                    <FormLabel>Course Thumbnail</FormLabel>
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <h3 className="font-medium">Upload a thumbnail image</h3>
                        <p className="text-sm text-muted-foreground">
                          Recommended size: 1280x720px (16:9 ratio)
                        </p>
                        <Button type="button" variant="outline" className="mt-2">
                          Select Image
                        </Button>
                      </div>
                    </div>
                    <FormDescription>
                      A compelling thumbnail can significantly increase enrollment rates.
                    </FormDescription>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  {/* Prerequisites */}
                  <div className="space-y-2">
                    <FormLabel>Prerequisites</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {prerequisites.map((prerequisite) => (
                        <Badge key={prerequisite} variant="secondary" className="py-1">
                          {prerequisite}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removePrerequisite(prerequisite)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add prerequisites (press Enter to add)"
                        value={prerequisiteInput}
                        onChange={(e) => setPrerequisiteInput(e.target.value)}
                        onKeyDown={handlePrerequisiteKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (prerequisiteInput.trim() !== '' && !prerequisites.includes(prerequisiteInput.trim())) {
                            setPrerequisites([...prerequisites, prerequisiteInput.trim()]);
                            setPrerequisiteInput('');
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>
                      List any skills, knowledge, or courses that students should have before taking this course.
                    </FormDescription>
                  </div>
                  
                  {/* Target Audience */}
                  <div className="space-y-2">
                    <FormLabel>Target Audience</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {targetAudience.map((audience) => (
                        <Badge key={audience} variant="secondary" className="py-1">
                          {audience}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-1"
                            onClick={() => removeTargetAudience(audience)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add target audience (press Enter to add)"
                        value={targetAudienceInput}
                        onChange={(e) => setTargetAudienceInput(e.target.value)}
                        onKeyDown={handleTargetAudienceKeyDown}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (targetAudienceInput.trim() !== '' && !targetAudience.includes(targetAudienceInput.trim())) {
                            setTargetAudience([...targetAudience, targetAudienceInput.trim()]);
                            setTargetAudienceInput('');
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>
                      Specify who would benefit most from taking this course.
                    </FormDescription>
                  </div>
                  
                  {/* Estimated Duration */}
                  <FormField
                    control={form.control}
                    name="estimatedDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Duration (hours)</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 items-center">
                            <Input 
                              type="number" 
                              min="0" 
                              {...field}
                            />
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Provide an estimate of the total hours to complete the course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Course Sections Preview */}
                  <div className="space-y-2">
                    <FormLabel>Course Structure</FormLabel>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center py-6">
                          <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <h3 className="font-medium">No sections added yet</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            After saving your course, you can add sections and lessons
                          </p>
                          <Button type="button" disabled>
                            Add Sections
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <FormDescription>
                      You'll be able to add course sections and lessons after saving the course.
                    </FormDescription>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-6">
                  {/* Course Pricing */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Price*</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 items-center">
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01"
                              {...field}
                            />
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set to 0 for a free course. Price should reflect the value and depth of your content.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Pricing Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Pricing Options</h3>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Enable Discounts</h4>
                        <p className="text-sm text-muted-foreground">
                          Offer promotional pricing for your course
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Subscription Access</h4>
                        <p className="text-sm text-muted-foreground">
                          Include this course in the platform subscription
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium">Bulk Pricing</h4>
                        <p className="text-sm text-muted-foreground">
                          Offer discounted rates for group enrollments
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  {/* Payment and Revenue */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Revenue Estimate</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Course Price</span>
                        <span>${form.watch('price') || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Fee (15%)</span>
                        <span>-${((form.watch('price') || 0) * 0.15).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Processing (3%)</span>
                        <span>-${((form.watch('price') || 0) * 0.03).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Your Revenue (per sale)</span>
                        <span>${((form.watch('price') || 0) * 0.82).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  {/* Course Settings */}
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between py-2">
                        <div>
                          <FormLabel className="font-medium">Course Status</FormLabel>
                          <FormDescription className="text-sm text-muted-foreground">
                            Toggle between draft and published state
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Enable Discussion</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow students to discuss the course content
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Enable Certificate</h4>
                      <p className="text-sm text-muted-foreground">
                        Provide certificates upon course completion
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Course Preview Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="free-preview" />
                        <label
                          htmlFor="free-preview"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Allow free preview of selected lessons
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="preview-time" />
                        <label
                          htmlFor="preview-time"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Limit preview to first 10 minutes of videos
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Privacy Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="course-visibility" defaultChecked />
                        <label
                          htmlFor="course-visibility"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          List this course in the public catalog
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="instructor-profile" defaultChecked />
                        <label
                          htmlFor="instructor-profile"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Show instructor profile on course page
                        </label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Form Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handlePublish}
                    variant="default"
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Publish Course
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 