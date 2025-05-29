"use client";

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AnalyticsHeader } from '@/components/creator/AnalyticsHeader';
import { AnalyticsTabs } from '@/components/creator/AnalyticsTabs';
import { OverviewTabContent } from '@/components/creator/OverviewTabContent';
import { RevenueTabContent } from '@/components/creator/RevenueTabContent';
import { 
  revenueData, 
  performanceMetrics, 
  engagementData,
  contentData,
  enrollmentData
} from '@/components/creator/AnalyticsData';
import { RechartsMultiChart } from '@/components/creator/RechartsMultiChart';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { RechartsPieChart } from '@/components/creator/RechartsPieChart';
import { 
  convertMultiSeriesData, 
  convertTimeSeriesData,
  convertCategoryData,
  convertPieData
} from '@/components/creator/RechartsDataAdapter';

export default function CreatorAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('This month');
  
  const handleDownloadReport = () => {
    console.log('Downloading analytics report...');
  };
  
  // Convert data for the multi-series charts
  const revenueVsExpensesData = convertMultiSeriesData(
    {
      revenue: revenueData.revenueVsExpenses.revenue,
      expenses: revenueData.revenueVsExpenses.expenses,
      profit: revenueData.revenueVsExpenses.profit
    },
    revenueData.revenueVsExpenses.labels
  );
  
  const enrollmentVsCompletionData = convertMultiSeriesData(
    {
      enrollment: enrollmentData.enrollmentVsCompletion.enrollment,
      completion: enrollmentData.enrollmentVsCompletion.completion
    },
    enrollmentData.enrollmentVsCompletion.labels
  );
  
  const contentPerformanceData = convertMultiSeriesData(
    {
      views: contentData.contentPerformance.views,
      likes: contentData.contentPerformance.likes,
      shares: contentData.contentPerformance.shares
    },
    contentData.contentPerformance.labels
  );
  
  const engagementMetricsData = convertMultiSeriesData(
    {
      watchTime: engagementData.engagementMetrics.watchTime,
      quizAttempts: engagementData.engagementMetrics.quizAttempts,
      comments: engagementData.engagementMetrics.comments
    },
    engagementData.engagementMetrics.labels
  );
  
  const contentTypeData = convertMultiSeriesData(
    {
      completion: contentData.contentTypePerformance.completion,
      engagement: contentData.contentTypePerformance.engagement,
      satisfaction: contentData.contentTypePerformance.satisfaction
    },
    contentData.contentTypePerformance.labels
  );
  
  const engagementByDayData = convertTimeSeriesData(
    engagementData.engagementByDay.data,
    engagementData.engagementByDay.labels,
    'engagement'
  );
  
  const enrollmentByDeviceData = convertPieData(
    enrollmentData.enrollmentByDevice.data,
    enrollmentData.enrollmentByDevice.labels,
    'value'
  );
  
  const enrollmentByRegionData = convertPieData(
    enrollmentData.enrollmentByRegion.data,
    enrollmentData.enrollmentByRegion.labels,
    'value'
  );
  
  return (
    <div className="space-y-4">
      {/* Top bar with filters and actions */}
      <AnalyticsHeader 
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        onDownloadReport={handleDownloadReport}
      />
      
      <Tabs value={activeTab} className="space-y-4">
        <AnalyticsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
        <TabsContent value="overview" className="mt-0">
          <OverviewTabContent onMetricClick={setActiveTab} />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <RevenueTabContent />
          
          <div className="mt-4">
            <RechartsMultiChart
              title="Revenue vs Expenses"
              data={revenueVsExpensesData}
              series={[
                { dataKey: 'revenue', name: 'Revenue', color: '#3b82f6', type: 'line' },
                { dataKey: 'expenses', name: 'Expenses', color: '#ef4444', type: 'line' },
                { dataKey: 'profit', name: 'Profit', color: '#10b981', type: 'area' }
              ]}
              height={400}
              brush={true}
              trend={{ value: 15, isPositive: true, label: "profit growth" }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="col-span-4">
              <RechartsMultiChart
                title="Engagement Metrics"
                data={engagementMetricsData}
                series={[
                  { dataKey: 'watchTime', name: 'Watch Time (min)', color: '#3b82f6', type: 'line' },
                  { dataKey: 'quizAttempts', name: 'Quiz Attempts', color: '#8b5cf6', type: 'bar' },
                  { dataKey: 'comments', name: 'Comments', color: '#10b981', type: 'bar' }
                ]}
                height={350}
                trend={{ value: 12, isPositive: true, label: "vs last month" }}
              />
            </div>
      </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RechartsBarChart
              title="Engagement by Day of Week"
              data={engagementByDayData}
              dataKey="engagement"
              height={300}
              color="#8b5cf6"
              showValues={true}
            />
            
            <RechartsLineChart
              title="Session Duration"
              data={convertTimeSeriesData(
                engagementData.sessionDuration.data,
                engagementData.sessionDuration.labels,
                'duration'
              )}
              dataKey="duration"
              height={300}
              color="#10b981"
              trend={{ value: 8, isPositive: true, label: "vs last month" }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="col-span-4">
              <RechartsMultiChart
                title="Content Performance"
                data={contentPerformanceData}
                series={[
                  { dataKey: 'views', name: 'Views', color: '#3b82f6', type: 'line' },
                  { dataKey: 'likes', name: 'Likes', color: '#10b981', type: 'line' },
                  { dataKey: 'shares', name: 'Shares', color: '#8b5cf6', type: 'bar' }
                ]}
                height={350}
                trend={{ value: 15, isPositive: true, label: "view growth" }}
              />
            </div>
      </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RechartsMultiChart
              title="Content Type Performance"
              data={contentTypeData}
              series={[
                { dataKey: 'completion', name: 'Completion', color: '#3b82f6', type: 'bar' },
                { dataKey: 'engagement', name: 'Engagement', color: '#10b981', type: 'bar' },
                { dataKey: 'satisfaction', name: 'Satisfaction', color: '#8b5cf6', type: 'bar' }
              ]}
              height={300}
              stacked={false}
            />
            
            <RechartsPieChart
              title="Rating Distribution"
              data={convertPieData(
                contentData.ratingDistribution.data,
                contentData.ratingDistribution.labels,
                'value'
              )}
              dataKey="value"
              height={300}
              donut={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="col-span-4">
              <RechartsMultiChart
                title="Enrollment vs Completion"
                data={enrollmentVsCompletionData}
                series={[
                  { dataKey: 'enrollment', name: 'New Enrollments', color: '#3b82f6', type: 'bar' },
                  { dataKey: 'completion', name: 'Course Completions', color: '#10b981', type: 'line' }
                ]}
                height={350}
                trend={{ value: 8, isPositive: true, label: "completion rate" }}
              />
            </div>
      </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RechartsPieChart
              title="Enrollment by Device"
              data={enrollmentByDeviceData}
              dataKey="value"
              height={300}
              donut={true}
            />
            
            <RechartsPieChart
              title="Enrollment by Region"
              data={enrollmentByRegionData}
              dataKey="value"
              height={300}
              donut={false}
            />
      </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 