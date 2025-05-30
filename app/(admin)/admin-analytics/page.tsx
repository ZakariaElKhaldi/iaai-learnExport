"use client";

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DownloadCloud, 
  Users, 
  BookOpen, 
  CreditCard, 
  Building, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Use components similar to creator analytics
import { RechartsMultiChart } from '@/components/creator/RechartsMultiChart';
import { RechartsLineChart } from '@/components/creator/RechartsLineChart';
import { RechartsBarChart } from '@/components/creator/RechartsBarChart';
import { RechartsPieChart } from '@/components/creator/RechartsPieChart';
import { 
  convertMultiSeriesData, 
  convertTimeSeriesData,
  convertPieData
} from '@/components/creator/RechartsDataAdapter';

// Admin-specific component
const AnalyticsTabs = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <div className="flex overflow-x-auto pb-2 -mb-2">
      {[
        { id: 'platform', label: 'Platform Overview' },
        { id: 'users', label: 'User Analytics' },
        { id: 'content', label: 'Content Performance' },
        { id: 'revenue', label: 'Revenue' },
        { id: 'operations', label: 'Operations' }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 font-medium text-sm rounded-md mr-2 whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Admin data for charts
const platformData = {
  activeUsers: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [1200, 1350, 1500, 1650, 1800, 2100, 2400, 2650, 2850, 3100, 3300, 3450]
  },
  signups: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [150, 180, 210, 195, 230, 250, 300, 310, 290, 320, 340, 360]
  },
  newCompanies: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [5, 7, 8, 6, 9, 11, 12, 10, 13, 15, 14, 16]
  },
  serverMetrics: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    cpuUsage: [45, 50, 48, 52, 55, 60, 65, 68, 72, 75, 70, 73],
    memoryUsage: [60, 62, 65, 68, 70, 75, 78, 80, 82, 85, 83, 84],
    apiRequests: [2500, 2800, 3000, 3200, 3500, 3800, 4000, 4300, 4500, 4700, 4900, 5100]
  },
  incidents: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    critical: [2, 1, 3, 0, 2, 1, 0, 1, 2, 0, 1, 0],
    major: [5, 4, 6, 3, 4, 2, 3, 4, 5, 2, 3, 2],
    minor: [8, 7, 9, 6, 7, 5, 6, 8, 7, 5, 6, 4]
  }
};

const userAnalyticsData = {
  usersByRole: {
    labels: ['Learners', 'Instructors', 'Admins', 'Consultants', 'Enterprise'],
    data: [75, 10, 3, 7, 5]
  },
  usersByStatus: {
    labels: ['Active', 'Inactive', 'Suspended', 'Pending Verification'],
    data: [80, 12, 3, 5]
  },
  usersByCountry: {
    labels: ['United States', 'India', 'UK', 'Canada', 'Germany', 'Australia', 'Others'],
    data: [35, 20, 15, 10, 8, 7, 5]
  },
  userRetention: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    data: [100, 85, 75, 68, 62, 58, 55, 52]
  },
  acquisitionChannels: {
    labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email', 'Paid Ads'],
    data: [30, 25, 15, 15, 10, 5]
  }
};

const contentAnalyticsData = {
  coursesByCategory: {
    labels: ['Programming', 'Data Science', 'Design', 'Business', 'Marketing', 'IT & Software', 'Others'],
    data: [28, 22, 18, 12, 10, 8, 2]
  },
  courseEnrollments: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [1800, 2100, 2300, 2500, 2700, 3000, 3200, 3500, 3700, 3900, 4100, 4300]
  },
  completionRates: {
    labels: ['Programming', 'Data Science', 'Design', 'Business', 'Marketing', 'IT & Software', 'Others'],
    data: [72, 68, 75, 82, 78, 70, 74]
  },
  ratings: {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    data: [45, 35, 12, 5, 3]
  }
};

const revenueAnalyticsData = {
  revenueByMonth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [45000, 52000, 58000, 63000, 69000, 75000, 82000, 88000, 93000, 99000, 105000, 112000]
  },
  revenueBySource: {
    labels: ['Course Sales', 'Subscriptions', 'Enterprise', 'Consultations', 'Other'],
    data: [45, 30, 15, 8, 2]
  },
  transactionVolume: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [850, 920, 980, 1050, 1120, 1200, 1280, 1350, 1420, 1500, 1580, 1650]
  },
  avgOrderValue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [55, 58, 60, 62, 65, 67, 69, 72, 74, 76, 78, 80]
  },
  revenueByCourseType: {
    labels: ['Free', 'One-time Purchase', 'Subscription', 'Enterprise'],
    data: [0, 55, 30, 15]
  }
};

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('platform');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 12 months');
  
  const handleDownloadReport = () => {
    console.log('Downloading analytics report...');
    // In a real application, this would generate and download a report
  };
  
  // Convert data for charts
  const activeUserData = convertTimeSeriesData(
    platformData.activeUsers.data,
    platformData.activeUsers.labels,
    'users'
  );
  
  const signupsData = convertTimeSeriesData(
    platformData.signups.data,
    platformData.signups.labels,
    'signups'
  );
  
  const newCompaniesData = convertTimeSeriesData(
    platformData.newCompanies.data,
    platformData.newCompanies.labels,
    'companies'
  );
  
  const serverMetricsData = convertMultiSeriesData(
    {
      cpu: platformData.serverMetrics.cpuUsage,
      memory: platformData.serverMetrics.memoryUsage,
      requests: platformData.serverMetrics.apiRequests
    },
    platformData.serverMetrics.labels
  );
  
  const incidentsData = convertMultiSeriesData(
    {
      critical: platformData.incidents.critical,
      major: platformData.incidents.major,
      minor: platformData.incidents.minor
    },
    platformData.incidents.labels
  );
  
  const usersByRoleData = convertPieData(
    userAnalyticsData.usersByRole.data,
    userAnalyticsData.usersByRole.labels,
    'value'
  );
  
  const usersByStatusData = convertPieData(
    userAnalyticsData.usersByStatus.data,
    userAnalyticsData.usersByStatus.labels,
    'value'
  );
  
  const usersByCountryData = convertPieData(
    userAnalyticsData.usersByCountry.data,
    userAnalyticsData.usersByCountry.labels,
    'value'
  );
  
  const userRetentionData = convertTimeSeriesData(
    userAnalyticsData.userRetention.data,
    userAnalyticsData.userRetention.labels,
    'retention'
  );
  
  const acquisitionChannelsData = convertPieData(
    userAnalyticsData.acquisitionChannels.data,
    userAnalyticsData.acquisitionChannels.labels,
    'value'
  );
  
  return (
    <div className="space-y-6">
      {/* Filter and Export Controls */}
      <div className="flex justify-end items-center gap-3">
        <select
          className="bg-transparent border rounded-md p-2 text-sm"
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
        >
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 12 months</option>
          <option>Year to date</option>
          <option>All time</option>
        </select>
        <Button variant="outline" size="sm" onClick={handleDownloadReport}>
          <DownloadCloud className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      
      <Tabs value={activeTab} className="space-y-6">
        <AnalyticsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Platform Overview Tab */}
        <TabsContent value="platform" className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <h3 className="text-2xl font-bold mt-1">3,450</h3>
                    <p className="text-sm text-green-600 mt-1">+12.5% vs last period</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                    <h3 className="text-2xl font-bold mt-1">485</h3>
                    <p className="text-sm text-green-600 mt-1">+8.2% vs last period</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">$112,000</h3>
                    <p className="text-sm text-green-600 mt-1">+15.3% vs last period</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Companies</p>
                    <h3 className="text-2xl font-bold mt-1">28</h3>
                    <p className="text-sm text-green-600 mt-1">+6.0% vs last period</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Building className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsLineChart
                  title="Active Users"
                  data={activeUserData}
                  dataKey="users"
                  height={300}
                  color="#3b82f6"
                  trend={{ value: 12.5, isPositive: true, label: "vs last period" }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsBarChart
                  title="New Signups"
                  data={signupsData}
                  dataKey="signups"
                  height={300}
                  color="#8b5cf6"
                  trend={{ value: 18.2, isPositive: true, label: "vs last period" }}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsBarChart
                  title="New Companies"
                  data={newCompaniesData}
                  dataKey="companies"
                  height={250}
                  color="#f59e0b"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsMultiChart
                  title="System Performance"
                  data={serverMetricsData}
                  series={[
                    { dataKey: 'cpu', name: 'CPU Usage (%)', color: '#ef4444', type: 'line' },
                    { dataKey: 'memory', name: 'Memory Usage (%)', color: '#3b82f6', type: 'line' },
                  ]}
                  height={250}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Incident Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <RechartsMultiChart
                title="Incident Tracking"
                data={incidentsData}
                series={[
                  { dataKey: 'critical', name: 'Critical', color: '#ef4444', type: 'bar' },
                  { dataKey: 'major', name: 'Major', color: '#f59e0b', type: 'bar' },
                  { dataKey: 'minor', name: 'Minor', color: '#3b82f6', type: 'bar' }
                ]}
                height={300}
                stacked={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Analytics Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Users by Role</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsPieChart
                  title="Users by Role"
                  data={usersByRoleData}
                  dataKey="value"
                  height={300}
                  donut={true}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsPieChart
                  title="User Status Distribution"
                  data={usersByStatusData}
                  dataKey="value"
                  height={300}
                  donut={false}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsLineChart
                  title="User Retention"
                  data={userRetentionData}
                  dataKey="retention"
                  height={300}
                  color="#10b981"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Acquisition Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <RechartsPieChart
                  title="Acquisition Channels"
                  data={acquisitionChannelsData}
                  dataKey="value"
                  height={300}
                  donut={true}
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <RechartsPieChart
                title="Geographic Distribution"
                data={usersByCountryData}
                dataKey="value"
                height={300}
                donut={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Performance Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Courses by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Enrollments</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Ratings</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Order Value</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Course Type</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]"></CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]"></CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Moderation Activities</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 