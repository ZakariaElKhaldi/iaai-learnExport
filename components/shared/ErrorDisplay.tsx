"use client";

import React from 'react';
import { AlertCircle, XCircle, WifiOff, Ban, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ErrorType = 'default' | 'connection' | 'permission' | 'notFound' | 'serverError';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  type?: ErrorType;
  retry?: () => void;
  className?: string;
  fullPage?: boolean;
}

export default function ErrorDisplay({
  title,
  message,
  type = 'default',
  retry,
  className,
  fullPage = false,
}: ErrorDisplayProps) {
  // Determine icon based on error type
  const getIcon = () => {
    switch (type) {
      case 'connection':
        return WifiOff;
      case 'permission':
        return Ban;
      case 'notFound':
        return XCircle;
      case 'serverError':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  // Determine title based on error type if not provided
  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'connection':
        return 'Connection Error';
      case 'permission':
        return 'Access Denied';
      case 'notFound':
        return 'Not Found';
      case 'serverError':
        return 'Server Error';
      default:
        return 'Error';
    }
  };

  const Icon = getIcon();
  const errorTitle = getTitle();

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="max-w-md text-center p-6">
          <Icon className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{errorTitle}</h2>
          <p className="mb-6 text-muted-foreground">{message}</p>
          <div className="flex justify-center gap-4">
            {retry && (
              <Button onClick={retry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Alert 
      variant="destructive" 
      className={cn("flex flex-col sm:flex-row sm:items-center", className)}
    >
      <div className="flex-1">
        <AlertTitle className="mb-1">{errorTitle}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {retry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={retry}
          className="mt-3 sm:mt-0 sm:ml-3 bg-background/90 hover:bg-background flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Retry
        </Button>
      )}
    </Alert>
  );
}

// Pre-configured error components for common use cases
export function ConnectionError({ retry, ...props }: Omit<ErrorDisplayProps, 'type' | 'title' | 'message'>) {
  return (
    <ErrorDisplay
      type="connection"
      message="Could not connect to the server. Please check your internet connection and try again."
      retry={retry}
      {...props}
    />
  );
}

export function PermissionError({ ...props }: Omit<ErrorDisplayProps, 'type' | 'title' | 'message'>) {
  return (
    <ErrorDisplay
      type="permission"
      message="You don't have permission to access this resource."
      {...props}
    />
  );
}

export function NotFoundError({ ...props }: Omit<ErrorDisplayProps, 'type' | 'title' | 'message'>) {
  return (
    <ErrorDisplay
      type="notFound"
      message="The requested resource could not be found."
      {...props}
    />
  );
}

export function ServerError({ retry, ...props }: Omit<ErrorDisplayProps, 'type' | 'title' | 'message'>) {
  return (
    <ErrorDisplay
      type="serverError"
      message="An unexpected error occurred on the server. Please try again later."
      retry={retry}
      {...props}
    />
  );
} 