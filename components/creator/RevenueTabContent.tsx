"use client";

import { DollarSign, Calendar, LineChart, Users } from 'lucide-react';
import { StatCard } from '@/components/creator/StatCard';
import { revenueData, performanceMetrics } from '@/components/creator/AnalyticsData';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { RechartsPieChart } from '@/components/creator/RechartsPieChart';
import { 
  convertTimeSeriesData, 
  convertCategoryData, 
  convertPieData 
} from '@/components/creator/RechartsDataAdapter';

interface RevenueTabContentProps {
  className?: string;
}

export function RevenueTabContent({ className }: RevenueTabContentProps) {
  // Convert data for Recharts
  const monthlyRevenueData = convertTimeSeriesData(
    revenueData.monthly.data,
    revenueData.monthly.labels,
    'revenue'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value={performanceMetrics.totalRevenue}
          icon={<DollarSign className="h-4 w-4" />}
          color="green"
        />
        
        <StatCard 
          title="Monthly Revenue" 
          value={performanceMetrics.monthlyRevenue}
          trend={{ value: 12, isPositive: true, label: "vs last month" }}
          icon={<Calendar className="h-4 w-4" />}
          color="blue"
        />
        
        <StatCard 
          title="Refund Rate" 
          value={performanceMetrics.refundRate}
          trend={{ value: 0.2, isPositive: false }}
          icon={<LineChart className="h-4 w-4" />}
        />
        
        <StatCard 
          title="Avg. Revenue Per Student" 
          value={performanceMetrics.avgRevenuePerStudent}
          trend={{ value: 5, isPositive: true }}
          icon={<Users className="h-4 w-4" />}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RechartsLineChart
          title="Monthly Revenue"
          data={monthlyRevenueData}
          dataKey="revenue"
          height={300}
          color="#3b82f6"
          trend={{ value: 12, isPositive: true, label: "vs last month" }}
          legend={true}
        />
        
        <RechartsBarChart
          title="Revenue by Course"
          data={courseRevenueData}
          dataKey="revenue"
          height={300}
          color="#10b981"
          showValues={true}
        />
      </div>
      
      <RechartsPieChart
        title="Revenue Breakdown"
        data={revenueBreakdownData}
        dataKey="value"
        height={350}
        donut={true}
        interactive={true}
      />
    </div>
  );
} 