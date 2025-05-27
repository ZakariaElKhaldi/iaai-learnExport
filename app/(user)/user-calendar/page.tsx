"use client";

import { useState, useRef, useEffect } from 'react';
import { format, addDays, subDays, isSameDay, isSameMonth, addMonths, subMonths, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CalendarIcon, 
  Clock, 
  ChevronDown,
  Search,
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

// Mock events data - in a real app, this would come from an API
const mockEvents = [
  {
    id: 1,
    title: 'React Workshop',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '10:00 AM - 12:00 PM',
    type: 'workshop',
    description: 'Learn the fundamentals of React and build your first component'
  },
  {
    id: 2,
    title: 'Team Meeting',
    date: new Date(),
    time: '2:00 PM - 3:00 PM',
    type: 'meeting',
    description: 'Weekly team sync to discuss project progress'
  },
  {
    id: 3,
    title: 'Next.js Conference',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '9:00 AM - 5:00 PM',
    type: 'conference',
    description: 'Annual Next.js conference with workshops and talks'
  },
  {
    id: 4,
    title: 'Project Deadline',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: 'All day',
    type: 'deadline',
    description: 'Final submission deadline for the current project'
  },
];

export default function UserCalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'selected'>('upcoming');
  const [showEventDetails, setShowEventDetails] = useState<number | null>(null);
  const { toast } = useToast();
  const calendarRef = useRef<HTMLDivElement>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!calendarRef.current) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          setSelectedDate(prev => subDays(prev, 1));
          break;
        case 'ArrowRight':
          setSelectedDate(prev => addDays(prev, 1));
          break;
        case 'ArrowUp':
          setSelectedDate(prev => subDays(prev, 7));
          break;
        case 'ArrowDown':
          setSelectedDate(prev => addDays(prev, 7));
          break;
        case 'Enter':
          setActiveTab('selected');
          break;
        case 'Home':
          setSelectedDate(new Date());
          break;
      }
    };

    calendarRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      calendarRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarRef]);

  // Function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      isSameDay(event.date, date)
    );
  };

  // Function to handle month navigation
  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  // Upcoming events (next 7 days)
  const upcomingEvents = mockEvents
    .filter(event => 
      event.date >= new Date() && 
      event.date <= addDays(new Date(), 7)
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Total days in the month
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Previous month's days to show
    const prevMonthDays = [];
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(year, month - 1, daysInPrevMonth - i));
    }
    
    // Current month's days
    const currentMonthDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      currentMonthDays.push(new Date(year, month, day));
    }
    
    // Next month's days to show
    const nextMonthDays = [];
    const totalCells = 42; // 6 rows of 7 days
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    
    for (let day = 1; day <= remainingCells; day++) {
      nextMonthDays.push(new Date(year, month + 1, day));
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const handleAddEvent = () => {
    toast({
      title: "Create New Event",
      description: `Creating event for ${format(selectedDate, 'MMMM d, yyyy')}`,
    });
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleEventClick = (eventId: number) => {
    setShowEventDetails(prevId => prevId === eventId ? null : eventId);
  };

  const calendarDays = generateCalendarDays();
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full sm:w-[200px] pl-8 rounded-md bg-background"
            />
          </div>
          <Button size="sm" variant="outline" className="h-9" onClick={handleToday}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button size="sm" variant="default" className="h-9" onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar card */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border rounded-lg overflow-hidden">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                {isLoading ? (
                  <Skeleton className="h-8 w-40" />
                ) : (
                  format(currentDate, 'MMMM yyyy')
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleMonthChange('prev')}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleMonthChange('next')}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex border rounded-md">
                  <Button 
                    variant={view === 'month' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-r-none h-8"
                    onClick={() => setView('month')}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={view === 'week' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-l-none h-8 border-l"
                    onClick={() => setView('week')}
                  >
                    Week
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0" ref={calendarRef} tabIndex={0}>
              {isLoading ? (
                <div className="space-y-2 p-4">
                  <Skeleton className="h-8 w-full" />
                  <div className="grid grid-cols-7 gap-2">
                    {Array(35).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full" />
                    ))}
                  </div>
                </div>
              ) : (
                /* Custom calendar implementation */
                <div className="w-full">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 text-xs text-center border-b py-2 bg-muted/30">
                    {daysOfWeek.map((day, i) => (
                      <div key={i} className="text-muted-foreground font-medium">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div 
                    className="grid grid-cols-7 auto-rows-fr"
                    role="grid"
                    aria-label="Calendar"
                  >
                    {calendarDays.map((day, i) => {
                      const isCurrentMonth = isSameMonth(day, currentDate);
                      const isSelected = isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, new Date());
                      const eventsForDay = getEventsForDate(day);
                      const hasEvents = eventsForDay.length > 0;
                      
                      return (
                        <motion.button
                          key={i}
                          className={`
                            h-14 p-1 border flex flex-col items-center justify-start relative
                            transition-colors duration-200 
                            hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                            ${!isCurrentMonth ? 'text-muted-foreground/50' : ''}
                            ${isSelected ? 'bg-primary/10 border-primary/20' : ''}
                            ${isToday ? 'font-bold' : ''}
                          `}
                          onClick={() => {
                            setSelectedDate(day);
                            setActiveTab('selected');
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          role="gridcell"
                          aria-label={format(day, 'MMMM d, yyyy')}
                          aria-selected={isSelected}
                          aria-current={isToday ? 'date' : undefined}
                          data-date={format(day, 'yyyy-MM-dd')}
                        >
                          <span className={`
                            text-sm rounded-full w-7 h-7 flex items-center justify-center
                            ${isToday ? 'bg-primary text-primary-foreground' : ''}
                          `}>
                            {format(day, 'd')}
                          </span>
                          {hasEvents && (
                            <div className="flex gap-0.5 mt-1">
                              {eventsForDay.length > 2 ? (
                                <>
                                  <div className={`w-1.5 h-1.5 rounded-full bg-primary`}></div>
                                  <div className={`w-1.5 h-1.5 rounded-full bg-primary`}></div>
                                  <div className={`w-1.5 h-1.5 rounded-full bg-primary`}></div>
                                </>
                              ) : (
                                eventsForDay.map((event, idx) => (
                                  <div 
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      event.type === 'workshop' ? 'bg-blue-500' :
                                      event.type === 'meeting' ? 'bg-green-500' :
                                      event.type === 'conference' ? 'bg-purple-500' :
                                      event.type === 'deadline' ? 'bg-red-500' : 'bg-primary'
                                    }`}
                                    aria-hidden="true"
                                  ></div>
                                ))
                              )}
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Events card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border rounded-lg overflow-hidden h-full">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Events</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter events</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                View and manage your upcoming events
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Tabs */}
              <div className="flex border-b">
                <Button 
                  variant="ghost" 
                  className={`flex-1 rounded-none h-10 text-sm ${activeTab === 'upcoming' ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </Button>
                <Button 
                  variant="ghost" 
                  className={`flex-1 rounded-none h-10 text-sm ${activeTab === 'selected' ? 'border-b-2 border-primary' : ''}`}
                  onClick={() => setActiveTab('selected')}
                >
                  {format(selectedDate, 'MMM d')}
                </Button>
              </div>
              
              {/* Event list */}
              <div className="divide-y max-h-[calc(100vh-380px)] overflow-y-auto">
                {isLoading ? (
                  <div className="space-y-4 p-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-6" />
                          <Skeleton className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {activeTab === 'upcoming' ? (
                      upcomingEvents.length > 0 ? (
                        upcomingEvents.map(event => (
                          <motion.div 
                            key={event.id} 
                            className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => handleEventClick(event.id)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground uppercase">
                                  {format(event.date, 'EEE')}
                                </span>
                                <span className="text-xl font-semibold">
                                  {format(event.date, 'd')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{event.title}</h3>
                                  <EventTypeBadge type={event.type} />
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {event.time}
                                </div>
                                {showEventDetails === event.id && (
                                  <motion.div 
                                    className="mt-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    <p>{event.description}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Button size="sm" variant="outline" className="h-7 text-xs">Edit</Button>
                                      <Button size="sm" variant="destructive" className="h-7 text-xs">Delete</Button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 rounded-full" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event.id);
                                }}
                              >
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform ${showEventDetails === event.id ? 'rotate-180' : ''}`} 
                                />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                          <p>No upcoming events</p>
                          <Button 
                            onClick={handleAddEvent}
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add your first event
                          </Button>
                        </div>
                      )
                    ) : (
                      // Selected date events
                      getEventsForDate(selectedDate).length > 0 ? (
                        getEventsForDate(selectedDate).map(event => (
                          <motion.div 
                            key={event.id} 
                            className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => handleEventClick(event.id)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground uppercase">
                                  {format(event.date, 'EEE')}
                                </span>
                                <span className="text-xl font-semibold">
                                  {format(event.date, 'd')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{event.title}</h3>
                                  <EventTypeBadge type={event.type} />
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {event.time}
                                </div>
                                {showEventDetails === event.id && (
                                  <motion.div 
                                    className="mt-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    <p>{event.description}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Button size="sm" variant="outline" className="h-7 text-xs">Edit</Button>
                                      <Button size="sm" variant="destructive" className="h-7 text-xs">Delete</Button>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 rounded-full" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event.id);
                                }}
                              >
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform ${showEventDetails === event.id ? 'rotate-180' : ''}`} 
                                />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground">
                          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                          <p>No events on {format(selectedDate, 'MMMM d, yyyy')}</p>
                          <Button 
                            onClick={handleAddEvent}
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add event
                          </Button>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function EventTypeBadge({ type }: { type: string }) {
  const variants: Record<string, { color: string, label: string, bgColor: string }> = {
    workshop: { 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      label: 'Workshop' 
    },
    meeting: { 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      label: 'Meeting' 
    },
    conference: { 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-100',
      label: 'Conference' 
    },
    deadline: { 
      color: 'text-red-600', 
      bgColor: 'bg-red-100',
      label: 'Deadline' 
    },
  };

  const variant = variants[type] || { 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100',
    label: type 
  };

  return (
    <Badge 
      variant="secondary" 
      className={`text-xs rounded-full px-2 py-0.5 ${variant.color} ${variant.bgColor}`}
    >
      {variant.label}
    </Badge>
  );
}
