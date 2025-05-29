"use client";

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  color?: 'default' | 'blue' | 'green' | 'amber' | 'red' | 'purple';
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  color = 'default',
  onClick
}: StatCardProps) {
  // Color variants
  const colorVariants = {
    default: {
      background: 'bg-white',
      icon: 'bg-slate-100 text-slate-700',
      trend: {
        positive: 'text-green-600',
        negative: 'text-red-600'
      }
    },
    blue: {
      background: 'bg-gradient-to-br from-blue-50 to-blue-100/60',
      icon: 'bg-blue-100 text-blue-700',
      trend: {
        positive: 'text-blue-700',
        negative: 'text-red-600'
      }
    },
    green: {
      background: 'bg-gradient-to-br from-green-50 to-green-100/60',
      icon: 'bg-green-100 text-green-700',
      trend: {
        positive: 'text-green-700',
        negative: 'text-red-600'
      }
    },
    amber: {
      background: 'bg-gradient-to-br from-amber-50 to-amber-100/60',
      icon: 'bg-amber-100 text-amber-700',
      trend: {
        positive: 'text-amber-700',
        negative: 'text-red-600'
      }
    },
    red: {
      background: 'bg-gradient-to-br from-red-50 to-red-100/60',
      icon: 'bg-red-100 text-red-700',
      trend: {
        positive: 'text-green-600',
        negative: 'text-red-700'
      }
    },
    purple: {
      background: 'bg-gradient-to-br from-purple-50 to-purple-100/60',
      icon: 'bg-purple-100 text-purple-700',
      trend: {
        positive: 'text-green-600',
        negative: 'text-red-600'
      }
    }
  };

  const variant = colorVariants[color];

  return (
    <Card 
      className={cn(
        "overflow-hidden border transition-all", 
        variant.background,
        onClick && "cursor-pointer hover:shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {trend && (
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? variant.trend.positive : variant.trend.negative
                )}>
                  {trend.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(trend.value)}%
                  {trend.label && <span className="ml-1 text-muted-foreground">{trend.label}</span>}
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          {icon && (
            <div className={cn("p-2 rounded-md", variant.icon)}>
              {icon}
            </div>
          )}
        </div>
        
        {onClick && (
          <div className="flex items-center mt-4 pt-3 border-t text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            View details
            <ChevronRight className="h-3 w-3 ml-1" />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 