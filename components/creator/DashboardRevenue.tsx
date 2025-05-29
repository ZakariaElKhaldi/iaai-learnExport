"use client";

import { DollarSign, Calendar, LineChart, Users } from 'lucide-react';
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

// Mock revenue data
const revenueData = {
  monthly: {
    data: [1200, 1350, 1100, 1450, 1800, 1650, 1950, 2100, 1900, 2250, 2400, 2600],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  courseRevenue: {
    data: [3200, 2450, 1800, 1200, 950, 650],
    labels: ['Web Dev', 'React', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  revenueBreakdown: {
    data: [4200, 1850, 1200, 850],
    labels: ['Course Sales', 'Subscriptions', 'Consultations', 'Other']
  },
  revenueVsExpenses: {
    revenue: [1200, 1350, 1100, 1450, 1800, 1650, 1950, 2100, 1900, 2250, 2400, 2600],
    expenses: [800, 950, 780, 1050, 1200, 1100, 1300, 1450, 1350, 1550, 1650, 1800],
    profit: [400, 400, 320, 400, 600, 550, 650, 650, 550, 700, 750, 800],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

interface DashboardRevenueProps {
  className?: string;
}

export function DashboardRevenue({ className }: DashboardRevenueProps) {
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
  
  const revenueVsExpensesData = convertMultiSeriesData(
    {
      revenue: revenueData.revenueVsExpenses.revenue,
      expenses: revenueData.revenueVsExpenses.expenses,
      profit: revenueData.revenueVsExpenses.profit
    },
    revenueData.revenueVsExpenses.labels
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="$5,350" 
          icon={<DollarSign className="h-4 w-4" />}
          color="green"
        />
        
        <StatCard 
          title="Monthly Revenue" 
          value="$2,450"
          trend={{ value: 12, isPositive: true, label: "vs last month" }}
          icon={<Calendar className="h-4 w-4" />}
          color="blue"
        />
        
        <StatCard 
          title="Refund Rate" 
          value="0.5%"
          trend={{ value: 0.2, isPositive: false }}
          icon={<LineChart className="h-4 w-4" />}
        />
        
        <StatCard 
          title="Avg. Revenue Per Student" 
          value="$38.40"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RechartsPieChart
          title="Revenue Breakdown"
          data={revenueBreakdownData}
          dataKey="value"
          height={300}
          donut={true}
        />
        
        <RechartsMultiChart
          title="Revenue vs Expenses"
          data={revenueVsExpensesData}
          series={[
            { dataKey: 'revenue', name: 'Revenue', color: '#3b82f6', type: 'line' },
            { dataKey: 'expenses', name: 'Expenses', color: '#ef4444', type: 'line' },
            { dataKey: 'profit', name: 'Profit', color: '#10b981', type: 'area' }
          ]}
          height={300}
          legend={true}
        />
      </div>
    </div>
  );
} 