"use client";

import React, { useState, useEffect } from 'react';

type TimeUnit = {
  value: number;
  label: string;
};

interface CountdownTimerProps {
  endDate: Date | string;
  className?: string;
  unitClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  showSeconds?: boolean;
  showLabels?: boolean;
  separator?: string;
  onComplete?: () => void;
  colorClasses?: {
    regular: string;
    urgent: string;
  };
  urgentThreshold?: number; // Time in seconds when countdown becomes urgent
}

export default function CountdownTimer({
  endDate,
  className = '',
  unitClassName = '',
  labelClassName = '',
  valueClassName = '',
  showSeconds = true,
  showLabels = true,
  separator = ':',
  onComplete,
  colorClasses = {
    regular: 'text-blue-600',
    urgent: 'text-red-600'
  },
  urgentThreshold = 3600, // 1 hour in seconds
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    // Convert string to Date if needed
    const targetDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // If time is up
      if (difference <= 0) {
        if (onComplete) onComplete();
        return [];
      }
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Set urgent flag if under threshold
      const totalSeconds = Math.floor(difference / 1000);
      setIsUrgent(totalSeconds <= urgentThreshold);
      
      const timeUnits: TimeUnit[] = [
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
      ];
      
      if (showSeconds) {
        timeUnits.push({ value: seconds, label: 'Seconds' });
      }
      
      return timeUnits;
    };
    
    // Calculate initial time left
    setTimeLeft(calculateTimeLeft());
    
    // Update timer every second
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      
      // Clear interval if countdown is complete
      if (updatedTimeLeft.length === 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    // Clean up interval
    return () => clearInterval(timer);
  }, [endDate, showSeconds, onComplete, urgentThreshold]);
  
  // Helper to pad numbers with leading zero
  const padNumber = (num: number): string => num.toString().padStart(2, '0');
  
  // If countdown is complete and no units to display
  if (timeLeft.length === 0) {
    return <div className={className}>Offer has ended</div>;
  }
  
  return (
    <div className={`flex items-center ${className} ${isUrgent ? colorClasses.urgent : colorClasses.regular}`}>
      {timeLeft.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className={`flex flex-col items-center ${unitClassName}`}>
            <span className={valueClassName}>
              {padNumber(unit.value)}
            </span>
            {showLabels && (
              <span className={`text-xs ${labelClassName}`}>
                {unit.label}
              </span>
            )}
          </div>
          
          {/* Add separator except after the last unit */}
          {index < timeLeft.length - 1 && (
            <span className="mx-1 font-bold">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 