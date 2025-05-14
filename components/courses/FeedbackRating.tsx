"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Edit,
  Trash2,
  AlertCircle,
  Check,
  X
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
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Schema for the feedback form
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3, { message: "Comment must be at least 3 characters." }).max(1000),
});

// Types for the component
export interface FeedbackAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
}

export interface FeedbackItem {
  id: string;
  author: FeedbackAuthor;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  isVerifiedPurchase?: boolean;
  helpfulCount?: number;
  unhelpfulCount?: number;
}

export interface FeedbackRatingProps {
  courseId: string;
  feedbackItems: FeedbackItem[];
  averageRating: number;
  totalRatings: number;
  ratingDistribution: number[];
  canAddFeedback?: boolean;
  currentUser?: FeedbackAuthor;
  onAddFeedback?: (data: z.infer<typeof feedbackSchema>) => Promise<void>;
  onEditFeedback?: (id: string, data: z.infer<typeof feedbackSchema>) => Promise<void>;
  onDeleteFeedback?: (id: string) => Promise<void>;
  onMarkHelpful?: (id: string) => Promise<void>;
  onMarkUnhelpful?: (id: string) => Promise<void>;
  className?: string;
}

export default function FeedbackRating({
  courseId,
  feedbackItems,
  averageRating,
  totalRatings,
  ratingDistribution,
  canAddFeedback = false,
  currentUser,
  onAddFeedback,
  onEditFeedback,
  onDeleteFeedback,
  onMarkHelpful,
  onMarkUnhelpful,
  className,
}: FeedbackRatingProps) {
  // State for the feedback form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (editingFeedbackId && onEditFeedback) {
        await onEditFeedback(editingFeedbackId, data);
      } else if (onAddFeedback) {
        await onAddFeedback(data);
      }
      
      // Reset form after submission
      form.reset();
      setEditingFeedbackId(null);
      setShowFeedbackForm(false);
    } catch (error) {
      setSubmitError('There was a problem submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing a feedback
  const handleEditFeedback = (feedback: FeedbackItem) => {
    form.setValue('rating', feedback.rating);
    form.setValue('comment', feedback.comment);
    setEditingFeedbackId(feedback.id);
    setShowFeedbackForm(true);
  };

  // Handle delete confirmation
  const handleDeleteFeedback = async (id: string) => {
    if (onDeleteFeedback) {
      try {
        await onDeleteFeedback(id);
      } catch (error) {
        setSubmitError('There was a problem deleting your feedback. Please try again.');
      }
    }
  };

  // Calculate percentage for rating bars
  const getRatingPercentage = (index: number) => {
    if (totalRatings === 0) return 0;
    return (ratingDistribution[index] / totalRatings) * 100;
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Ratings & Reviews
          </CardTitle>
          <CardDescription>
            See what students are saying about this course
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Summary section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                <div className="flex flex-col">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(averageRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
                  </span>
                </div>
              </div>
              
              {/* Rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-2">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${getRatingPercentage(5 - rating)}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-10">
                      {ratingDistribution[5 - rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Add Feedback Button or Form */}
            <div className="flex flex-col justify-center items-center">
              {canAddFeedback && !showFeedbackForm && (
                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">
                    Share your experience with other students
                  </p>
                  <Button 
                    onClick={() => setShowFeedbackForm(true)}
                    className="gap-2"
                  >
                    Write a Review
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {canAddFeedback && showFeedbackForm && (
                <div className="w-full">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Rating</FormLabel>
                            <FormControl>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Button
                                    key={star}
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-8 w-8"
                                    onClick={() => field.onChange(star)}
                                  >
                                    <Star
                                      className={cn(
                                        "h-6 w-6",
                                        star <= field.value
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      )}
                                    />
                                  </Button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your experience with this course..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Your review will help other students make better decisions.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {submitError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{submitError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowFeedbackForm(false);
                            setEditingFeedbackId(null);
                            form.reset();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : editingFeedbackId ? (
                            "Update Review"
                          ) : (
                            "Submit Review"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Feedback list */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">
              {feedbackItems.length > 0 
                ? `${feedbackItems.length} Reviews` 
                : "No reviews yet"}
            </h3>
            
            {feedbackItems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Be the first to review this course!
                </p>
              </div>
            )}
            
            {feedbackItems.map((feedback) => (
              <div key={feedback.id} className="pb-6 border-b last:border-0">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={feedback.author.avatarUrl} alt={feedback.author.name} />
                      <AvatarFallback>{feedback.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{feedback.author.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(feedback.createdAt)}
                        {feedback.updatedAt && feedback.updatedAt > feedback.createdAt && 
                          ` (edited ${formatDate(feedback.updatedAt)})`}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= feedback.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                
                {feedback.isVerifiedPurchase && (
                  <Badge variant="outline" className="mt-2">
                    <Check className="h-3 w-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
                
                <p className="mt-2 text-sm">{feedback.comment}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkHelpful && onMarkHelpful(feedback.id)}
                      className="h-8 text-xs gap-1"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      Helpful
                      {feedback.helpfulCount !== undefined && feedback.helpfulCount > 0 && 
                        ` (${feedback.helpfulCount})`}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkUnhelpful && onMarkUnhelpful(feedback.id)}
                      className="h-8 text-xs gap-1"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      Not helpful
                      {feedback.unhelpfulCount !== undefined && feedback.unhelpfulCount > 0 && 
                        ` (${feedback.unhelpfulCount})`}
                    </Button>
                  </div>
                  
                  {currentUser && currentUser.id === feedback.author.id && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditFeedback(feedback)}
                        className="h-8 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFeedback(feedback.id)}
                        className="h-8 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        {feedbackItems.length > 5 && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
} 