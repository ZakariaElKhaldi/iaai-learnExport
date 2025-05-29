"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyMetricsRow } from '@/components/creator/KeyMetricsRow';
import { TopCoursesGrid } from '@/components/creator/TopCoursesGrid';
import { 
  performanceMetrics, 
  topCoursesData, 
  topRatedContentData,
  revenueData,
  enrollmentData
} from '@/components/creator/AnalyticsData';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { RechartsPieChart } from '@/components/creator/RechartsPieChart';
import { 
  convertTimeSeriesData, 
  convertCategoryData, 
  convertPieData 
} from '@/components/creator/RechartsDataAdapter';

interface OverviewTabContentProps {
  className?: string;
  onMetricClick?: (tab: string) => void;
}

export function OverviewTabContent({ className, onMetricClick }: OverviewTabContentProps) {
  // Convert data for Recharts
  const revenueChartData = convertTimeSeriesData(
    revenueData.monthly.data,
    revenueData.monthly.labels,
    'revenue'
  );
  
  const enrollmentChartData = convertTimeSeriesData(
    enrollmentData.newStudents.data,
    enrollmentData.newStudents.labels,
    'students'
  );
  
  const courseRevenueData = convertCategoryData(
    revenueData.courseRevenue.data,
    revenueData.courseRevenue.labels,
    'revenue'
  );
  
  const revenueBreakdownData = convertPieData(
    revenueData.revenueBreakdown.data,
    revenueData.revenueBreakdown.labels,
    'value'
  );
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Key metrics row */}
      <KeyMetricsRow 
        metrics={{
          totalRevenue: performanceMetrics.totalRevenue,
          totalStudents: performanceMetrics.totalStudents,
          completionRate: performanceMetrics.completionRate,
          avgRating: performanceMetrics.avgRating
        }}
        onMetricClick={onMetricClick}
      />
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RechartsLineChart
          title="Revenue Growth"
          data={revenueChartData}
          dataKey="revenue"
          height={250}
          color="#3b82f6"
          trend={{ value: 15, isPositive: true, label: "vs last month" }}
        />
        
        <RechartsBarChart
          title="Student Enrollment"
          data={enrollmentChartData}
          dataKey="students"
          height={250}
          color="#10b981"
          trend={{ value: 8, isPositive: true, label: "vs last month" }}
        />
      </div>
      
      {/* Additional metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RechartsBarChart
          title="Revenue by Course"
          data={courseRevenueData}
          dataKey="revenue"
          height={250}
          horizontal={true}
          showValues={true}
          color="#8b5cf6"
        />
        
        <RechartsPieChart
          title="Revenue Breakdown"
          data={revenueBreakdownData}
          dataKey="value"
          height={250}
          donut={true}
        />
      </div>
      
      {/* Top courses and content */}
      <TopCoursesGrid 
        courses={topCoursesData}
        content={topRatedContentData}
      />
    </div>
  );
} 