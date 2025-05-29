"use client";

import { DollarSign, Users, ThumbsUp, Star } from 'lucide-react';
import { StatCard } from '@/components/creator/StatCard';

interface KeyMetricsRowProps {
  metrics: {
    totalRevenue: string;
    totalStudents: string;
    completionRate: string;
    avgRating: string;
  };
  onMetricClick?: (tab: string) => void;
}

export function KeyMetricsRow({
  metrics,
  onMetricClick
}: KeyMetricsRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="Total Revenue" 
        value={metrics.totalRevenue}
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: 15, isPositive: true, label: "vs last month" }}
        color="green"
        onClick={onMetricClick ? () => onMetricClick('revenue') : undefined}
      />
      
      <StatCard 
        title="Total Students" 
        value={metrics.totalStudents}
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 8, isPositive: true }}
        color="blue"
        onClick={onMetricClick ? () => onMetricClick('students') : undefined}
      />
      
      <StatCard 
        title="Completion Rate" 
        value={metrics.completionRate}
        icon={<ThumbsUp className="h-4 w-4" />}
        trend={{ value: 3, isPositive: true }}
        color="purple"
        onClick={onMetricClick ? () => onMetricClick('engagement') : undefined}
      />
      
      <StatCard 
        title="Average Rating" 
        value={metrics.avgRating}
        icon={<Star className="h-4 w-4" />}
        color="amber"
        onClick={onMetricClick ? () => onMetricClick('content') : undefined}
      />
    </div>
  );
} 