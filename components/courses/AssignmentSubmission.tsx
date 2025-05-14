"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Upload,
  FileText,
  File,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  HelpCircle,
  Download,
  Link,
  Send,
  RotateCcw,
  Calendar
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Schema for the assignment submission form
const submissionSchema = z.object({
  submissionText: z.string().optional(),
  submissionNotes: z.string().optional(),
});

// Types for the component
export type SubmissionStatus = 'not_submitted' | 'submitted' | 'late' | 'graded' | 'returned' | 'resubmit';

export interface AssignmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface InstructorFeedback {
  id: string;
  comment: string;
  createdAt: Date;
  grade?: number;
  attachments?: AssignmentFile[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxGrade: number;
  status: SubmissionStatus;
  attachments?: AssignmentFile[];
  submissionDate?: Date;
  submissionText?: string;
  submissionNotes?: string;
  submissionFiles?: AssignmentFile[];
  feedbacks?: InstructorFeedback[];
  grade?: number;
}

export interface AssignmentSubmissionProps {
  assignment: Assignment;
  onSubmit?: (data: any, files: File[]) => Promise<void>;
  onResubmit?: (data: any, files: File[]) => Promise<void>;
  className?: string;
}

export default function AssignmentSubmission({
  assignment,
  onSubmit,
  onResubmit,
  className,
}: AssignmentSubmissionProps) {
  // State for file upload
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Get submission status
  const getStatusDetails = (status: SubmissionStatus) => {
    switch (status) {
      case 'not_submitted':
        return {
          label: 'Not Submitted',
          color: 'bg-gray-200 text-gray-700',
          icon: <Clock className="h-4 w-4" />,
        };
      case 'submitted':
        return {
          label: 'Submitted',
          color: 'bg-blue-100 text-blue-700',
          icon: <CheckCircle2 className="h-4 w-4" />,
        };
      case 'late':
        return {
          label: 'Late Submission',
          color: 'bg-amber-100 text-amber-700',
          icon: <AlertTriangle className="h-4 w-4" />,
        };
      case 'graded':
        return {
          label: 'Graded',
          color: 'bg-green-100 text-green-700',
          icon: <CheckCircle2 className="h-4 w-4" />,
        };
      case 'returned':
        return {
          label: 'Returned',
          color: 'bg-purple-100 text-purple-700',
          icon: <FileText className="h-4 w-4" />,
        };
      case 'resubmit':
        return {
          label: 'Resubmit Required',
          color: 'bg-red-100 text-red-700',
          icon: <RotateCcw className="h-4 w-4" />,
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-200 text-gray-700',
          icon: <HelpCircle className="h-4 w-4" />,
        };
    }
  };
  
  // Check if assignment is overdue
  const isOverdue = () => {
    return new Date() > assignment.dueDate && assignment.status === 'not_submitted';
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Calculate time remaining until due date
  const getTimeRemaining = () => {
    const now = new Date();
    const timeRemaining = assignment.dueDate.getTime() - now.getTime();
    
    if (timeRemaining <= 0) {
      return 'Past due';
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ${hours} ${hours === 1 ? 'hour' : 'hours'} remaining`;
    } else {
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} remaining`;
    }
  };
  
  // Initialize the form
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      submissionText: assignment.submissionText || '',
      submissionNotes: assignment.submissionNotes || '',
    },
  });
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };
  
  // Remove file from list
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  // Handle form submission
  const handleSubmit = async (data: z.infer<typeof submissionSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (assignment.status === 'resubmit' || assignment.status === 'returned') {
        if (onResubmit) {
          await onResubmit(data, files);
        }
      } else {
        if (onSubmit) {
          await onSubmit(data, files);
        }
      }
    } catch (error) {
      setSubmitError('There was a problem submitting your assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>
                Due: {formatDate(assignment.dueDate)}
              </CardDescription>
            </div>
            
            <Badge 
              className={cn(
                "flex items-center gap-1 px-3 py-1 text-xs rounded-full",
                getStatusDetails(assignment.status).color
              )}
            >
              {getStatusDetails(assignment.status).icon}
              <span>{getStatusDetails(assignment.status).label}</span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Assignment details */}
          <Accordion type="single" collapsible defaultValue="details">
            <AccordionItem value="details">
              <AccordionTrigger>Assignment Details</AccordionTrigger>
              <AccordionContent className="text-sm space-y-4">
                <div dangerouslySetInnerHTML={{ __html: assignment.description }} />
                
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Assignment Materials:</h4>
                    <ul className="space-y-1">
                      {assignment.attachments.map((file) => (
                        <li key={file.id} className="flex items-center gap-2">
                          <File className="h-4 w-4 text-blue-500" />
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {file.name}
                          </a>
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(file.size)})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Max Grade: {assignment.maxGrade} points</span>
                  </div>
                </div>
                
                {isOverdue() && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Assignment Overdue</AlertTitle>
                    <AlertDescription>
                      This assignment was due on {formatDate(assignment.dueDate)}. 
                      Late submissions may incur a penalty. Check with your instructor.
                    </AlertDescription>
                  </Alert>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Separator />
          
          {/* Time indicator */}
          {assignment.status === 'not_submitted' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Time Remaining</span>
                <span 
                  className={cn(
                    "text-sm",
                    isOverdue() ? "text-red-600" : "text-muted-foreground"
                  )}
                >
                  {getTimeRemaining()}
                </span>
              </div>
              <Progress
                value={
                  isOverdue() 
                    ? 100 
                    : 100 - ((assignment.dueDate.getTime() - new Date().getTime()) / 
                    (assignment.dueDate.getTime() - (assignment.dueDate.getTime() - 7 * 24 * 60 * 60 * 1000))) * 100
                }
                className={isOverdue() ? "bg-red-200" : ""}
              />
            </div>
          )}
          
          {/* Submission section */}
          {(assignment.status === 'not_submitted' || 
            assignment.status === 'resubmit' || 
            assignment.status === 'returned') && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">
                {assignment.status === 'not_submitted' ? 'Submit Your Assignment' : 'Resubmit Your Assignment'}
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="submissionText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Text (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your submission text here..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can enter your assignment response directly here or upload files below.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormLabel>Attachments</FormLabel>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <h3 className="font-medium">
                          Click to upload or drag and drop
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Support for documents, images, and archives
                        </p>
                      </label>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Files to upload ({files.length})</h4>
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <File className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="submissionNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes to Instructor (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any notes for your instructor..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {submitError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : assignment.status === 'not_submitted' ? (
                        <>
                          Submit Assignment
                          <Send className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Resubmit Assignment
                          <RotateCcw className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
          
          {/* Previous submission */}
          {(assignment.status !== 'not_submitted') && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {assignment.status === 'submitted' || assignment.status === 'late' ? 
                  'Your Submission' : 
                  'Your Previous Submission'}
              </h3>
              
              {assignment.submissionDate && (
                <p className="text-sm text-muted-foreground">
                  Submitted on {formatDate(assignment.submissionDate)}
                  {assignment.status === 'late' && ' (Late)'}
                </p>
              )}
              
              {assignment.submissionText && (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm whitespace-pre-line">{assignment.submissionText}</p>
                </div>
              )}
              
              {assignment.submissionFiles && assignment.submissionFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Submitted Files</h4>
                  <ul className="space-y-1">
                    {assignment.submissionFiles.map((file) => (
                      <li key={file.id} className="flex items-center gap-2">
                        <File className="h-4 w-4 text-blue-500" />
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {file.name}
                        </a>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(file.size)})
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          asChild
                        >
                          <a href={file.url} download>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {assignment.submissionNotes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Notes to Instructor</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {assignment.submissionNotes}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Feedback section */}
          {assignment.feedbacks && assignment.feedbacks.length > 0 && (
            <div className="space-y-4">
              <Separator />
              
              <h3 className="text-lg font-medium">Instructor Feedback</h3>
              
              {assignment.grade !== undefined && (
                <div className="flex items-center gap-2 mb-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {assignment.grade} / {assignment.maxGrade}
                          </span>
                          <Badge 
                            className={cn(
                              "px-2 py-1",
                              assignment.grade / assignment.maxGrade >= 0.7 ? "bg-green-100 text-green-700" :
                              assignment.grade / assignment.maxGrade >= 0.5 ? "bg-amber-100 text-amber-700" :
                              "bg-red-100 text-red-700"
                            )}
                          >
                            {Math.round(assignment.grade / assignment.maxGrade * 100)}%
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your grade for this assignment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              
              {assignment.feedbacks.map((feedback, index) => (
                <div 
                  key={feedback.id} 
                  className={cn(
                    "p-4 rounded-md border",
                    index === 0 ? "bg-muted" : ""
                  )}
                >
                  <div className="mb-2 flex justify-between items-center">
                    <h4 className="font-medium">
                      {index === 0 ? 'Instructor Feedback' : `Additional Feedback ${index}`}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(feedback.createdAt)}
                    </p>
                  </div>
                  
                  <p className="text-sm whitespace-pre-line mb-4">{feedback.comment}</p>
                  
                  {feedback.attachments && feedback.attachments.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Attachments</h5>
                      <ul className="space-y-1">
                        {feedback.attachments.map((file) => (
                          <li key={file.id} className="flex items-center gap-2">
                            <File className="h-4 w-4 text-blue-500" />
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {file.name}
                            </a>
                            <span className="text-xs text-muted-foreground">
                              ({formatFileSize(file.size)})
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="ml-auto"
                              asChild
                            >
                              <a href={file.url} download>
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Last updated: {formatDate(new Date())}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 