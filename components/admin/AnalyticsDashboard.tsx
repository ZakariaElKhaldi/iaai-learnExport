"use client";

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  BookOpenCheck,
  BookOpen,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Filter,
  Download
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Types for analytics data
interface EnrollmentStats {
  totalEnrollments: number;
  percentChange: number;
  isPositive: boolean;
}

interface RevenueStats {
  totalRevenue: number;
  percentChange: number;
  isPositive: boolean;
}

interface CompletionStats {
  totalCompletions: number;
  percentChange: number;
  isPositive: boolean;
}

interface ActivityStats {
  activeUsers: number;
  percentChange: number;
  isPositive: boolean;
}

interface CoursePerformance {
  id: string;
  title: string;
  enrollments: number;
  completionRate: number;
  revenue: number;
  rating: number;
}

interface UserEngagement {
  date: string;
  activeUsers: number;
  newUsers: number;
}

interface RevenueData {
  date: string;
  revenue: number;
}

interface EnrollmentData {
  date: string;
  enrollments: number;
}

interface CategoryDistribution {
  name: string;
  value: number;
}

export interface AnalyticsDashboardProps {
  enrollmentStats: EnrollmentStats;
  revenueStats: RevenueStats;
  completionStats: CompletionStats;
  activityStats: ActivityStats;
  coursePerformance: CoursePerformance[];
  userEngagement: UserEngagement[];
  revenueData: RevenueData[];
  enrollmentData: EnrollmentData[];
  categoryDistribution: CategoryDistribution[];
  className?: string;
}

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AnalyticsDashboard({
  enrollmentStats,
  revenueStats,
  completionStats,
  activityStats,
  coursePerformance,
  userEngagement,
  revenueData,
  enrollmentData,
  categoryDistribution,
  className,
}: AnalyticsDashboardProps) {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('30days');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Format large numbers with k/m suffix
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform performance and track key metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            value={timePeriod}
            onValueChange={setTimePeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="allTime">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(enrollmentStats.totalEnrollments)}
            </div>
            <p className="text-xs text-muted-foreground">
              {enrollmentStats.isPositive ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {enrollmentStats.percentChange}% increase
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  {Math.abs(enrollmentStats.percentChange)}% decrease
                </span>
              )}
              <span className="text-muted-foreground"> compared to previous period</span>
            </p>
          </CardContent>
        </Card>
        
        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(revenueStats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {revenueStats.isPositive ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {revenueStats.percentChange}% increase
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  {Math.abs(revenueStats.percentChange)}% decrease
                </span>
              )}
              <span className="text-muted-foreground"> compared to previous period</span>
            </p>
          </CardContent>
        </Card>
        
        {/* Course Completions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completions
            </CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(completionStats.totalCompletions)}
            </div>
            <p className="text-xs text-muted-foreground">
              {completionStats.isPositive ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {completionStats.percentChange}% increase
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  {Math.abs(completionStats.percentChange)}% decrease
                </span>
              )}
              <span className="text-muted-foreground"> compared to previous period</span>
            </p>
          </CardContent>
        </Card>
        
        {/* Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(activityStats.activeUsers)}
            </div>
            <p className="text-xs text-muted-foreground">
              {activityStats.isPositive ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {activityStats.percentChange}% increase
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  {Math.abs(activityStats.percentChange)}% decrease
                </span>
              )}
              <span className="text-muted-foreground"> compared to previous period</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart - Spans 4 columns */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Revenue generated over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value).split('.')[0]}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Category Distribution - Spans 3 columns */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Course Category Distribution</CardTitle>
            <CardDescription>
              Enrollment distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} enrollments`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Enrollment Chart - Spans 4 columns */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
            <CardDescription>
              Course enrollments over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={enrollmentData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} enrollments`, 'Enrollments']} />
                <Bar dataKey="enrollments" fill="#0088FE" name="Enrollments" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* User Engagement Chart - Spans 3 columns */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>
              Active and new users over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userEngagement}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#0088FE"
                  name="Active Users"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#00C49F"
                  name="New Users"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Course Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>
            Detailed performance metrics for all courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Enrollments</TableHead>
                <TableHead className="text-right">Completion Rate</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursePerformance.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="text-right">{course.enrollments}</TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      course.completionRate >= 70 ? "text-green-600" :
                      course.completionRate >= 40 ? "text-amber-600" : "text-red-600"
                    )}>
                      {formatPercentage(course.completionRate)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(course.revenue)}</TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      course.rating >= 4.5 ? "text-green-600" :
                      course.rating >= 3.5 ? "text-amber-600" : "text-red-600"
                    )}>
                      {course.rating.toFixed(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing top {coursePerformance.length} courses by revenue
          </p>
          <Button variant="outline" size="sm">
            View All Courses
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 