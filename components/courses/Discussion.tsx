"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  ThumbsUp,
  MoreVertical,
  Flag,
  CheckCircle2,
  Edit,
  Trash2,
  Send,
  Search,
  User,
  Filter,
  BookOpenText,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define comment types and interfaces
export type CommentType = 'question' | 'discussion' | 'note';

export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: 'student' | 'instructor' | 'admin' | 'moderator';
}

export interface CommentReaction {
  type: 'like' | 'helpful';
  count: number;
  reacted: boolean;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  type: CommentType;
  createdAt: Date;
  updatedAt?: Date;
  reactions: Record<string, CommentReaction>;
  isAnswer?: boolean;
  markedAsAnswerBy?: string;
  replies?: Comment[];
  lessonTimestamp?: number; // In seconds, for referencing specific video parts
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

export interface DiscussionProps {
  courseId: string;
  lessonId?: string;
  comments: Comment[];
  currentUser: CommentAuthor;
  onAddComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'reactions'>) => Promise<Comment>;
  onAddReply: (commentId: string, reply: Omit<Comment, 'id' | 'createdAt' | 'reactions'>) => Promise<Comment>;
  onReaction: (commentId: string, reactionType: string, add: boolean) => Promise<void>;
  onMarkAsAnswer: (commentId: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onReportComment?: (commentId: string, reason: string) => Promise<void>;
  isInstructor?: boolean;
  className?: string;
}

// Form validation schema
const commentFormSchema = z.object({
  content: z.string().min(2, {
    message: "Comment must be at least 2 characters."
  }).max(1000, {
    message: "Comment must not be longer than 1000 characters."
  }),
  type: z.enum(['question', 'discussion', 'note']),
  lessonTimestamp: z.number().optional(),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

// Filter tab type
type FilterTab = 'all' | 'questions' | 'discussions' | 'notes' | 'answered' | 'unanswered' | 'mine';

export default function Discussion({
  courseId,
  lessonId,
  comments,
  currentUser,
  onAddComment,
  onAddReply,
  onReaction,
  onMarkAsAnswer,
  onDeleteComment,
  onEditComment,
  onReportComment,
  isInstructor = false,
  className,
}: DiscussionProps) {
  // State management
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'mostLiked'>('newest');
  
  // Initialize form with React Hook Form and Zod validation
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
      type: 'discussion',
      lessonTimestamp: undefined,
    },
  });
  
  // Initialize edit form
  const editForm = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
  });
  
  // Initialize reply form
  const replyForm = useForm<{ content: string }>({
    defaultValues: {
      content: '',
    },
  });
  
  // Filter comments based on active filter and search query
  const filteredComments = comments.filter(comment => {
    // Text search filter
    const matchesSearch = !searchQuery || 
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Tab filters
    switch (activeFilter) {
      case 'questions':
        return comment.type === 'question';
      case 'discussions':
        return comment.type === 'discussion';
      case 'notes':
        return comment.type === 'note';
      case 'answered':
        return comment.type === 'question' && comment.isAnswer;
      case 'unanswered':
        return comment.type === 'question' && !comment.isAnswer;
      case 'mine':
        return comment.author.id === currentUser.id;
      case 'all':
      default:
        return true;
    }
  });
  
  // Sort comments based on selected order
  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'mostLiked':
        const aLikes = a.reactions['like']?.count || 0;
        const bLikes = b.reactions['like']?.count || 0;
        return bLikes - aLikes;
      default:
        return 0;
    }
  });
  
  // Handle new comment submission
  const onSubmit = async (data: CommentFormValues) => {
    try {
      await onAddComment({
        content: data.content,
        type: data.type,
        author: currentUser,
        lessonTimestamp: data.lessonTimestamp,
        replies: [],
      });
      
      form.reset();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
  
  // Handle reply submission
  const handleReply = async (commentId: string, data: { content: string }) => {
    try {
      await onAddReply(commentId, {
        content: data.content,
        type: 'discussion',
        author: currentUser,
        replies: [],
      });
      
      setReplyingTo(null);
      replyForm.reset();
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };
  
  // Handle comment editing
  const handleEdit = async (commentId: string, data: { content: string }) => {
    try {
      await onEditComment(commentId, data.content);
      setEditingCommentId(null);
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };
  
  // Handle reaction toggle
  const handleReaction = async (commentId: string, reactionType: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;
    
    const reaction = comment.reactions[reactionType];
    const newState = !reaction?.reacted;
    
    try {
      await onReaction(commentId, reactionType, newState);
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
    }
  };
  
  // Set comment to be edited
  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
    editForm.setValue('content', comment.content);
  };
  
  // Handle marking a comment as the answer
  const handleMarkAsAnswer = async (commentId: string) => {
    try {
      await onMarkAsAnswer(commentId);
    } catch (error) {
      console.error('Failed to mark as answer:', error);
    }
  };
  
  // Helper function to get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (diff < dayInMs) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (diff < 7 * dayInMs) {
      return format(date, 'EEEE') + ' at ' + format(date, 'p');
    } else {
      return format(date, 'PPP');
    }
  };
  
  // Get icon for comment type
  const getCommentTypeIcon = (type: CommentType): LucideIcon => {
    switch (type) {
      case 'question':
        return MessageSquare;
      case 'discussion':
        return BookOpenText;
      case 'note':
        return ArrowUpRight;
      default:
        return MessageSquare;
    }
  };
  
  // Render comment
  const renderComment = (comment: Comment, isReply = false) => {
    const TypeIcon = getCommentTypeIcon(comment.type);
    const isEditing = editingCommentId === comment.id;
    const isOwnComment = comment.author.id === currentUser.id;
    const canModerate = isInstructor || currentUser.role === 'admin' || currentUser.role === 'moderator';
    
    return (
      <div key={comment.id} className={cn("mb-4", isReply && "ml-8 mt-4")}>
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
            <AvatarFallback>{getUserInitials(comment.author.name)}</AvatarFallback>
          </Avatar>
          
          {/* Comment content */}
          <div className="flex-1 space-y-1.5">
            {/* Comment header */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {comment.author.name}
                {comment.author.role === 'instructor' && (
                  <span className="ml-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                    Instructor
                  </span>
                )}
              </span>
              
              {!isReply && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TypeIcon className="h-3 w-3" />
                  <span className="capitalize">{comment.type}</span>
                </div>
              )}
              
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
                {comment.updatedAt && comment.updatedAt > comment.createdAt && " (edited)"}
              </span>
            </div>
            
            {/* Comment body */}
            {isEditing ? (
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(data => handleEdit(comment.id, data))} className="space-y-2">
                  <FormField
                    control={editForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Edit your comment..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm">Save</Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="text-sm">
                {comment.lessonTimestamp !== undefined && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-primary mb-1"
                  >
                    {Math.floor(comment.lessonTimestamp / 60)}:{(comment.lessonTimestamp % 60).toString().padStart(2, '0')}
                  </Button>
                )}
                <p className="whitespace-pre-line">{comment.content}</p>
              </div>
            )}
            
            {/* Comment footer with actions */}
            {!isEditing && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                {/* Like button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "h-auto p-0 flex items-center gap-1",
                    comment.reactions['like']?.reacted && "text-primary"
                  )}
                  onClick={() => handleReaction(comment.id, 'like')}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.reactions['like']?.count || 0}</span>
                </Button>
                
                {/* Reply button - only if not itself a reply */}
                {!isReply && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0" 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    Reply
                  </Button>
                )}
                
                {/* Mark as answer - only for questions and instructors/moderators */}
                {comment.type === 'question' && !isReply && (canModerate || isOwnComment) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-auto p-0 flex items-center gap-1",
                      comment.isAnswer && "text-green-600"
                    )}
                    onClick={() => handleMarkAsAnswer(comment.id)}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{comment.isAnswer ? "Marked as Answer" : "Mark as Answer"}</span>
                  </Button>
                )}
                
                {/* Actions dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {isOwnComment && (
                      <>
                        <DropdownMenuItem onClick={() => startEditing(comment)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteComment(comment.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    
                    {onReportComment && !isOwnComment && (
                      <DropdownMenuItem onClick={() => onReportComment(comment.id, 'inappropriate content')}>
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Reply form */}
            {replyingTo === comment.id && (
              <div className="mt-4">
                <Form {...replyForm}>
                  <form onSubmit={replyForm.handleSubmit(data => handleReply(comment.id, data))} className="space-y-2">
                    <FormField
                      control={replyForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Write your reply..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" size="sm">Reply</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {/* Display replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-4">
                {comment.replies.map(reply => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Course Discussion
          </CardTitle>
          <CardDescription>
            Ask questions, share insights, and engage with your peers and instructors.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Comment form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-wrap gap-2">
                      <Label
                        htmlFor="type-question"
                        className={cn(
                          "flex items-center gap-1 rounded-lg border px-3 py-2 cursor-pointer",
                          field.value === 'question' ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}
                      >
                        <input
                          type="radio"
                          id="type-question"
                          value="question"
                          className="sr-only"
                          checked={field.value === 'question'}
                          onChange={() => field.onChange('question')}
                        />
                        <MessageSquare className="h-4 w-4" />
                        <span>Question</span>
                      </Label>
                      
                      <Label
                        htmlFor="type-discussion"
                        className={cn(
                          "flex items-center gap-1 rounded-lg border px-3 py-2 cursor-pointer",
                          field.value === 'discussion' ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}
                      >
                        <input
                          type="radio"
                          id="type-discussion"
                          value="discussion"
                          className="sr-only"
                          checked={field.value === 'discussion'}
                          onChange={() => field.onChange('discussion')}
                        />
                        <BookOpenText className="h-4 w-4" />
                        <span>Discussion</span>
                      </Label>
                      
                      <Label
                        htmlFor="type-note"
                        className={cn(
                          "flex items-center gap-1 rounded-lg border px-3 py-2 cursor-pointer",
                          field.value === 'note' ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}
                      >
                        <input
                          type="radio"
                          id="type-note"
                          value="note"
                          className="sr-only"
                          checked={field.value === 'note'}
                          onChange={() => field.onChange('note')}
                        />
                        <ArrowUpRight className="h-4 w-4" />
                        <span>Note</span>
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts, questions, or notes about the lesson..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.watch('type') === 'question'
                        ? "Be specific and provide details to get better answers."
                        : form.watch('type') === 'note'
                          ? "Take notes for yourself or to share with others."
                          : "Share your perspectives with other learners."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-end gap-2">
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  {form.watch('type') === 'question' ? 'Ask Question' : 'Post'}
                </Button>
              </div>
            </form>
          </Form>
          
          <Separator />
          
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs
              value={activeFilter}
              onValueChange={(value) => setActiveFilter(value as FilterTab)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="answered">Answered</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="mine">My Posts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOrder('newest')}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('oldest')}>
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('mostLiked')}>
                    Most Liked
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      <div>
        {sortedComments.length > 0 ? (
          <div className="space-y-4">
            {sortedComments.map(comment => renderComment(comment))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-muted p-4 mb-4">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No discussions yet</h3>
              <p className="text-sm text-muted-foreground text-center mt-1 max-w-md">
                {searchQuery
                  ? "No discussions match your search criteria. Try a different search term."
                  : activeFilter !== 'all'
                    ? `No ${activeFilter} discussions found. Try a different filter or start the conversation.`
                    : "Be the first to start a discussion or ask a question about this course."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 