"use client";

import React from 'react';
import { BellIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Sample notification type - will be replaced with actual API data later
type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  link?: string;
};

// Sample notifications data - will be fetched from API
const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Course Available',
    description: 'A new course "Advanced React Patterns" is now available in your catalog.',
    date: '1 hour ago',
    read: false,
    link: '/courses'
  },
  {
    id: '2',
    title: 'Session Reminder',
    description: 'Reminder: You have a consultation session scheduled tomorrow at 10:00 AM.',
    date: '3 hours ago',
    read: false,
    link: '/consultations'
  },
  {
    id: '3',
    title: 'Certificate Earned',
    description: 'Congratulations! You\'ve earned a certificate for completing "JavaScript Fundamentals".',
    date: '2 days ago',
    read: true,
    link: '/certificates'
  },
  {
    id: '4',
    title: 'Course Update',
    description: 'The course "Introduction to Machine Learning" has been updated with new content.',
    date: '1 week ago',
    read: true,
    link: '/courses'
  }
];

interface NotificationPanelProps {
  className?: string;
}

export default function NotificationPanel({ className }: NotificationPanelProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>(dummyNotifications);
  const [isOpen, setIsOpen] = React.useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn("relative", className)}
          aria-label="Open notifications"
        >
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-2 font-medium">
          <span className="text-sm">Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div key={notification.id} className="group">
                  <div
                    className={cn(
                      "flex gap-2 p-4 transition-colors hover:bg-muted/50 cursor-pointer",
                      !notification.read && "bg-muted/30"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-sm font-medium",
                          !notification.read && "font-semibold"
                        )}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <CheckIcon className="h-3 w-3" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                      <span className="text-xs text-muted-foreground mt-1">{notification.date}</span>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 px-4 text-center">
              <BellIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">We'll notify you when something important happens</p>
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
} 