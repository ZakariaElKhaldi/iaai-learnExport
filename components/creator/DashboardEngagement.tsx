"use client";

import { Clock, MessageSquare, BookOpen, Star } from 'lucide-react';
import { StatCard } from '@/components/creator/StatCard';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { RechartsPieChart } from '@/components/creator/RechartsPieChart';
import { RechartsMultiChart } from '@/components/creator/RechartsMultiChart';
import { 
  convertTimeSeriesData, 
  convertCategoryData, 
  convertPieData,
  convertMultiSeriesData
} from '@/components/creator/RechartsDataAdapter';

// Mock engagement data
const engagementData = {
  studentActivity: {
    data: [45, 52, 48, 57, 62, 58, 65, 72, 68, 75, 82, 78],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  completionRates: {
    data: [85, 75, 65, 55, 45, 35],
    labels: ['Web Dev', 'React', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  sessionDuration: {
    data: [35, 42, 38, 45, 50, 48, 52, 58, 55, 60, 65, 62],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  engagementByDay: {
    data: [68, 75, 82, 78, 85, 65, 55],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  contentEngagement: {
    data: [42, 35, 28, 22, 18],
    labels: ['Videos', 'Quizzes', 'Readings', 'Exercises', 'Projects']
  },
  engagementMetrics: {
    watchTime: [42, 48, 45, 52, 58, 55, 60, 65, 62, 68, 72, 70],
    quizAttempts: [85, 95, 90, 100, 110, 105, 115, 125, 120, 130, 140, 135],
    comments: [25, 30, 28, 32, 35, 33, 38, 42, 40, 45, 48, 46],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

interface DashboardEngagementProps {
  className?: string;
}

export function DashboardEngagement({ className }: DashboardEngagementProps) {
  // Convert data for Recharts
  const studentActivityData = convertTimeSeriesData(
    engagementData.studentActivity.data,
    engagementData.studentActivity.labels,
    'activity'
  );
  
  const completionRatesData = convertCategoryData(
    engagementData.completionRates.data,
    engagementData.completionRates.labels,
    'completion'
  );
  
  const sessionDurationData = convertTimeSeriesData(
    engagementData.sessionDuration.data,
    engagementData.sessionDuration.labels,
    'duration'
  );
  
  const engagementByDayData = convertCategoryData(
    engagementData.engagementByDay.data,
    engagementData.engagementByDay.labels,
    'engagement'
  );
  
  const contentEngagementData = convertPieData(
    engagementData.contentEngagement.data,
    engagementData.contentEngagement.labels,
    'value'
  );
  
  const engagementMetricsData = convertMultiSeriesData(
    {
      watchTime: engagementData.engagementMetrics.watchTime,
      quizAttempts: engagementData.engagementMetrics.quizAttempts,
      comments: engagementData.engagementMetrics.comments
    },
    engagementData.engagementMetrics.labels
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Avg. Watch Time" 
          value="45 min" 
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true, label: "vs last month" }}
          color="blue"
        />
        
        <StatCard 
          title="Completion Rate" 
          value="72%"
          trend={{ value: 5, isPositive: true }}
          icon={<BookOpen className="h-4 w-4" />}
          color="green"
        />
        
        <StatCard 
          title="Student Satisfaction" 
          value="92%"
          trend={{ value: 3, isPositive: true }}
          icon={<Star className="h-4 w-4" />}
          color="amber"
        />
        
        <StatCard 
          title="Comments" 
          value="245"
          trend={{ value: 12, isPositive: true }}
          icon={<MessageSquare className="h-4 w-4" />}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RechartsLineChart
          title="Student Activity"
          data={studentActivityData}
          dataKey="activity"
          height={300}
          color="#3b82f6"
          trend={{ value: 8, isPositive: true, label: "vs last month" }}
        />
        
        <RechartsBarChart
          title="Completion Rates by Course"
          data={completionRatesData}
          dataKey="completion"
          height={300}
          color="#10b981"
          showValues={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RechartsMultiChart
          title="Engagement Metrics"
          data={engagementMetricsData}
          series={[
            { dataKey: 'watchTime', name: 'Watch Time (min)', color: '#3b82f6', type: 'line' },
            { dataKey: 'quizAttempts', name: 'Quiz Attempts', color: '#8b5cf6', type: 'bar' },
            { dataKey: 'comments', name: 'Comments', color: '#10b981', type: 'bar' }
          ]}
          height={300}
          legend={true}
        />
        
        <RechartsPieChart
          title="Content Type Engagement"
          data={contentEngagementData}
          dataKey="value"
          height={300}
          donut={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RechartsLineChart
          title="Session Duration"
          data={sessionDurationData}
          dataKey="duration"
          height={250}
          color="#8b5cf6"
        />
        
        <RechartsBarChart
          title="Engagement by Day of Week"
          data={engagementByDayData}
          dataKey="engagement"
          height={250}
          color="#f59e0b"
          showValues={true}
        />
      </div>
    </div>
  );
} 