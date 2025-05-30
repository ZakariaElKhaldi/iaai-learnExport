"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserPlus, 
  BookOpen, 
  Building, 
  CreditCard, 
  Users, 
  BookCheck, 
  DollarSign,
  Server,
  Database,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  Bell,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Filter,
  RefreshCw,
  ExternalLink,
  ArrowUpRight,
  MoreHorizontal,
  Download
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data for metrics cards
  const metricsData = [
    {
      title: "Total Users",
      value: "1,243",
      change: { value: "+12%", positive: true },
      icon: <Users className="h-5 w-5 text-blue-600" aria-hidden="true" />,
      href: "/admin-users"
    },
    {
      title: "Active Companies",
      value: "28",
      change: { value: "+3", positive: true },
      icon: <Building className="h-5 w-5 text-green-600" aria-hidden="true" />,
      href: "/admin-companies"
    },
    {
      title: "Course Enrollments",
      value: "5,428",
      change: { value: "+24%", positive: true },
      icon: <BookCheck className="h-5 w-5 text-purple-600" aria-hidden="true" />,
      href: "/admin-courses"
    },
    {
      title: "Platform Revenue",
      value: "$48,290",
      change: { value: "+18%", positive: true },
      icon: <DollarSign className="h-5 w-5 text-amber-600" aria-hidden="true" />,
      href: "/admin-subscriptions"
    }
  ];

  // Data for alerts and notifications
  const alertsData = [
    { 
      id: 'alert-1',
      title: 'High server load detected',
      description: 'Server load has exceeded 80% for the past 30 minutes',
      severity: 'warning',
      time: '15 minutes ago',
      action: 'View Details'
    },
    { 
      id: 'alert-2',
      title: 'New user verification requests',
      description: '12 users are waiting for verification',
      severity: 'info',
      time: '1 hour ago',
      action: 'Review',
      href: '/admin-users'
    },
    { 
      id: 'alert-3',
      title: 'Content flagged for moderation',
      description: '3 new items require moderation review',
      severity: 'urgent',
      time: '2 hours ago',
      action: 'Review',
      href: '/admin-moderation'
    }
  ];

  // Data for pending actions
  const pendingActionsData = [
    { 
      label: "Course Approvals", 
      count: 8, 
      href: "/admin-courses", 
      description: "New courses awaiting approval",
      icon: <BookOpen className="h-4 w-4 text-purple-600" />,
      badgeColor: "bg-orange-100", 
      badgeTextColor: "text-orange-800" 
    },
    { 
      label: "User Verifications", 
      count: 12, 
      href: "/admin-users", 
      description: "Identity verification requests",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      badgeColor: "bg-orange-100", 
      badgeTextColor: "text-orange-800" 
    },
    { 
      label: "Content Moderation", 
      count: 3, 
      href: "/admin-moderation", 
      description: "Flagged content requiring review",
      icon: <ShieldCheck className="h-4 w-4 text-red-600" />,
      badgeColor: "bg-red-100", 
      badgeTextColor: "text-red-800" 
    },
    { 
      label: "Support Tickets", 
      count: 5, 
      href: "/admin-support", 
      description: "Unresolved customer support tickets",
      icon: <MessageSquare className="h-4 w-4 text-amber-600" />,
      badgeColor: "bg-orange-100", 
      badgeTextColor: "text-orange-800" 
    }
  ];

  // Data for system status
  const systemStatusData = [
    { label: "Server Uptime", value: "99.9%", status: "healthy" },
    { label: "Database Status", value: "Healthy", status: "healthy" },
    { label: "API Response Time", value: "120ms", status: "healthy" },
    { label: "Last Backup", value: "Today, 03:00 AM", status: "neutral" }
  ];

  // Data for recent activities
  const recentActivitiesData = [
    { 
      title: "New company registered: TechSolutions Inc.",
      timestamp: "Today, 10:23 AM",
      icon: <Briefcase className="h-4 w-4" />,
      iconColor: "text-blue-500",
      href: "/admin-companies"
    },
    { 
      title: "New course published: Advanced React Patterns",
      timestamp: "Yesterday, 4:17 PM",
      icon: <BookOpen className="h-4 w-4" />,
      iconColor: "text-purple-500",
      href: "/admin-courses"
    },
    { 
      title: "Payment gateway configuration updated",
      timestamp: "Yesterday, 11:05 AM",
      icon: <CreditCard className="h-4 w-4" />,
      iconColor: "text-green-500",
      href: "/admin-subscriptions"
    },
    { 
      title: "System update deployed: v2.4.0",
      timestamp: "Oct 12, 2023, 2:30 AM",
      icon: <Server className="h-4 w-4" />,
      iconColor: "text-amber-500"
    }
  ];

  // Helper function for alert severity styling
  const getAlertStyles = (severity: string) => {
    switch(severity) {
      case 'urgent':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800'
        };
      case 'warning':
        return {
          icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          badge: 'bg-amber-100 text-amber-800'
        };
      case 'info':
      default:
        return {
          icon: <Bell className="h-5 w-5 text-blue-600" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Time range filter */}
      <div className="flex justify-end gap-2">
        <div className="bg-white border rounded-md p-1 flex" role="group" aria-label="Time range filter">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-sm ${
                timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-pressed={timeRange === range}
              aria-label={`Show data for the last ${range}`}
            >
              {range}
            </button>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="Refresh data"
          className="focus:ring-2 focus:ring-blue-500"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      
      {/* Alerts and Notifications Section */}
      <section aria-labelledby="alerts-heading">
        <div className="space-y-3">
          {alertsData.map((alert) => {
            const styles = getAlertStyles(alert.severity);
            return (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg flex items-start gap-3 ${styles.bg} ${styles.border}`}
                role="alert"
                aria-live={alert.severity === 'urgent' ? 'assertive' : 'polite'}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {styles.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{alert.title}</h3>
                    <Badge className={`${styles.badge}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    {alert.href ? (
                      <Link 
                        href={alert.href} 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        aria-label={`${alert.action} for ${alert.title}`}
                      >
                        {alert.action}
                      </Link>
                    ) : (
                      <button 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        aria-label={`${alert.action} for ${alert.title}`}
                      >
                        {alert.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {metricsData.map((metric) => (
            <Card key={metric.title}>
              <Link href={metric.href} className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-full">
                      {metric.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className={`${metric.change.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {metric.change.value}
                    </Badge>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </section>
        
        {/* Pending Actions */}
        <section className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingActionsData.map((action) => (
                  <div key={action.label} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${action.badgeColor} flex-shrink-0 mt-0.5`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{action.label}</h3>
                        <Badge className={`${action.badgeColor} ${action.badgeTextColor}`}>
                          {action.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      <Link 
                        href={action.href} 
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 mt-2 inline-block"
                        aria-label={`View ${action.count} ${action.label.toLowerCase()}`}
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* System Status */}
        <section className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatusData.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`h-2 w-2 rounded-full ${
                          item.status === 'healthy' ? 'bg-green-500' : 
                          item.status === 'warning' ? 'bg-amber-500' : 
                          item.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        aria-hidden="true"
                      ></span>
                      <span>{item.label}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                aria-label="View detailed system status report"
              >
                <Server className="h-4 w-4 mr-2" aria-hidden="true" />
                View Details
              </Button>
            </CardContent>
          </Card>
        </section>
        
        {/* Recent Activities */}
        <section className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivitiesData.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 flex-shrink-0 mt-0.5`}>
                      <span className={activity.iconColor}>{activity.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      {activity.href && (
                        <Link 
                          href={activity.href} 
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 mt-1 inline-block"
                          aria-label={`View details of ${activity.title}`}
                        >
                          View details
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                aria-label="View all activity logs"
              >
                <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                View All
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
} 