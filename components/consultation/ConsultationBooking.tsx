"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, CreditCard, CheckCircle2, Users, Video } from "lucide-react";
import { cn } from "@/lib/utils";

// Time slot utilities
const AVAILABLE_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const TIME_SLOT_DURATION = 30; // minutes

type TimeSlot = {
  hour: number;
  minute: number;
  formatted: string;
  available: boolean;
};

const generateTimeSlots = (
  availableHours: number[],
  blockedSlots: string[] = []
): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  availableHours.forEach((hour) => {
    // Add :00 and :30 slots for each hour
    [0, 30].forEach((minute) => {
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        hour,
        minute,
        formatted: formattedTime,
        available: !blockedSlots.includes(formattedTime),
      });
    });
  });

  return slots;
};

// Define form schema
const bookingFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot",
  }),
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }).max(100, {
    message: "Topic must not be longer than 100 characters.",
  }),
  message: z.string().max(500, {
    message: "Message must not be longer than 500 characters.",
  }).optional(),
  callType: z.enum(["video", "audio"], {
    required_error: "Please select a call type",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Define component props
interface ConsultationBookingProps {
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  instructorTitle?: string;
  instructorRating?: number;
  duration?: number; // in minutes
  price?: number;
  currency?: string;
  blockedDates?: Date[];
  blockedSlots?: Record<string, string[]>; // Format: { "YYYY-MM-DD": ["09:00", "09:30", ...] }
  onBookingSubmit: (bookingData: BookingFormValues) => Promise<void>;
}

export default function ConsultationBooking({
  instructorId,
  instructorName,
  instructorAvatar,
  instructorTitle = "Instructor",
  instructorRating,
  duration = 30,
  price,
  currency = "USD",
  blockedDates = [],
  blockedSlots = {},
  onBookingSubmit,
}: ConsultationBookingProps) {
  // State for booking status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Fetch slots when date changes
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Format price
  const formattedPrice = price 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)
    : 'Free';

  // Configuring form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      topic: "",
      message: "",
      callType: "video",
    },
  });

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    // Update selected date
    setSelectedDate(date);
    form.setValue("date", date);
    
    // Clear selected time slot when date changes
    form.setValue("timeSlot", "");
    
    // Get blocked slots for the selected date
    const dateStr = format(date, "yyyy-MM-dd");
    const dateBlockedSlots = blockedSlots[dateStr] || [];
    
    // Generate available time slots for the selected date
    const slots = generateTimeSlots(AVAILABLE_HOURS, dateBlockedSlots);
    setAvailableSlots(slots);
  };

  // Handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      await onBookingSubmit(data);
      setBookingComplete(true);
    } catch (error) {
      console.error("Booking failed:", error);
      // Handle error appropriately here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // If booking is complete, show confirmation
  if (bookingComplete) {
    const bookingData = form.getValues();
    const bookingDate = format(bookingData.date, "EEEE, MMMM do, yyyy");
    
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle>Booking Confirmed!</CardTitle>
          <CardDescription>
            Your consultation has been successfully booked.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Consultation Details</h3>
            <p className="text-sm">
              <span className="font-medium">Date:</span> {bookingDate}
            </p>
            <p className="text-sm">
              <span className="font-medium">Time:</span> {bookingData.timeSlot}
            </p>
            <p className="text-sm">
              <span className="font-medium">Duration:</span> {duration} minutes
            </p>
            <p className="text-sm">
              <span className="font-medium">Call Type:</span> {bookingData.callType === "video" ? "Video Call" : "Audio Call"}
            </p>
            {price && (
              <p className="text-sm">
                <span className="font-medium">Price:</span> {formattedPrice}
              </p>
            )}
          </div>
          
          <Separator />
          
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={instructorAvatar} alt={instructorName} />
              <AvatarFallback>{getInitials(instructorName)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">{instructorName}</h3>
              <p className="text-xs text-muted-foreground">{instructorTitle}</p>
            </div>
          </div>
          
          {bookingData.topic && (
            <div className="bg-muted p-3 rounded-md">
              <h3 className="text-sm font-medium mb-1">Consultation Topic</h3>
              <p className="text-sm">{bookingData.topic}</p>
              {bookingData.message && (
                <>
                  <h3 className="text-sm font-medium mt-2 mb-1">Additional Information</h3>
                  <p className="text-sm">{bookingData.message}</p>
                </>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button className="w-full">View in Calendar</Button>
        </CardFooter>
      </Card>
    );
  }

  // Render booking form
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book a Consultation</CardTitle>
        <CardDescription>
          Schedule a {duration}-minute consultation with {instructorName}.
        </CardDescription>
        
        <div className="flex items-center space-x-3 mt-4">
          <Avatar>
            <AvatarImage src={instructorAvatar} alt={instructorName} />
            <AvatarFallback>{getInitials(instructorName)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{instructorName}</h3>
            <div className="flex items-center">
              <p className="text-xs text-muted-foreground">{instructorTitle}</p>
              {instructorRating && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {instructorRating} ★
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Date Picker */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateChange}
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || // Past dates
                          blockedDates.some(blockedDate => 
                            blockedDate.getFullYear() === date.getFullYear() &&
                            blockedDate.getMonth() === date.getMonth() &&
                            blockedDate.getDate() === date.getDate()
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select an available day for your consultation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Slot Picker */}
            {selectedDate && (
              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Slot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableSlots.map((slot) => (
                          <SelectItem
                            key={slot.formatted}
                            value={slot.formatted}
                            disabled={!slot.available}
                          >
                            {slot.formatted} {!slot.available && "(Unavailable)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a time that works for you. All times are in your local timezone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Call Type */}
            <FormField
              control={form.control}
              name="callType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select call type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video" className="flex items-center">
                        <div className="flex items-center">
                          <Video className="mr-2 h-4 w-4" />
                          <span>Video Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="audio">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Audio Call</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Topic */}
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation Topic</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What would you like to discuss?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe what you'd like to discuss during the consultation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional details or questions..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share any additional information that might help the instructor prepare.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Booking Summary */}
            <Card className="bg-muted">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Booking Summary</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Duration
                    </span>
                    <span>{duration} minutes</span>
                  </div>
                  {price !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Price
                      </span>
                      <span className="font-medium">{formattedPrice}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 