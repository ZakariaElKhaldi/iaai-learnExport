"use client";

import { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Mail,
  MessageSquare,
  BellRing
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock notification templates data
  const templates = [
    {
      id: 'NTPL-001',
      name: 'Welcome Email',
      eventType: 'USER_REGISTERED',
      channels: ['email'],
      lastUpdated: 'Oct 10, 2023',
      status: 'active'
    },
    {
      id: 'NTPL-002',
      name: 'Course Enrollment Confirmation',
      eventType: 'COURSE_ENROLLED',
      channels: ['email', 'in-app'],
      lastUpdated: 'Sep 18, 2023',
      status: 'active'
    },
    {
      id: 'NTPL-003',
      name: 'Consultation Reminder',
      eventType: 'CONSULTATION_REMINDER',
      channels: ['email', 'in-app', 'push'],
      lastUpdated: 'Oct 5, 2023',
      status: 'active'
    },
    {
      id: 'NTPL-004',
      name: 'Payment Receipt',
      eventType: 'PAYMENT_SUCCEEDED',
      channels: ['email'],
      lastUpdated: 'Aug 22, 2023',
      status: 'inactive'
    },
    {
      id: 'NTPL-005',
      name: 'New Course Available',
      eventType: 'COURSE_PUBLISHED',
      channels: ['email', 'in-app'],
      lastUpdated: 'Sep 30, 2023',
      status: 'draft'
    }
  ];
  
  // Filter templates based on search query and filters
  const filteredTemplates = templates.filter(template => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply event type filter
    const matchesEventType = eventTypeFilter === 'all' || 
      (eventTypeFilter === 'user' && template.eventType.includes('USER')) ||
      (eventTypeFilter === 'course' && template.eventType.includes('COURSE')) ||
      (eventTypeFilter === 'payment' && template.eventType.includes('PAYMENT')) ||
      (eventTypeFilter === 'consultation' && template.eventType.includes('CONSULTATION'));
    
    // Apply channel filter
    const matchesChannel = channelFilter === 'all' || 
      template.channels.includes(channelFilter);
    
    return matchesSearch && matchesEventType && matchesChannel;
  });
  
  // Helper function for event type badge styling
  const getEventTypeBadgeStyles = (eventType: string) => {
    if (eventType.includes('USER')) return 'bg-blue-100 text-blue-800';
    if (eventType.includes('COURSE')) return 'bg-purple-100 text-purple-800';
    if (eventType.includes('PAYMENT')) return 'bg-green-100 text-green-800';
    if (eventType.includes('CONSULTATION')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // Helper function for status badge styling
  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function for status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-600" aria-hidden="true" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-yellow-600" aria-hidden="true" />;
      default:
        return null;
    }
  };
  
  // Handle template action (edit, preview, etc.)
  const handleTemplateAction = (action: string, templateId: string) => {
    console.log(`Performing ${action} on template ${templateId}`);
    // In a real app, this would make an API call to perform the action
  };
  
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button className="focus:ring-2 focus:ring-blue-500">
            <Bell className="h-4 w-4 mr-2" aria-hidden="true" />
            Create Template
          </Button>
          <Button 
            variant="outline"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
            Send Test Message
          </Button>
        </div>
      </div>
      
      {/* Notification stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Messages Sent (Today)</p>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs text-green-600">+15% from yesterday</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delivery Rate</p>
              <p className="text-2xl font-bold">98.7%</p>
              <p className="text-xs text-green-600">+0.2% from last week</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Rate (Email)</p>
              <p className="text-2xl font-bold">42.3%</p>
              <p className="text-xs text-amber-600">-1.5% from last week</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Eye className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Templates</p>
              <p className="text-2xl font-bold">{templates.filter(t => t.status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">of {templates.length} total</p>
            </div>
            <div className="p-2 bg-amber-100 rounded-full">
              <BellRing className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList aria-label="Notification management sections">
          <TabsTrigger value="templates">Notification Templates</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Settings</TabsTrigger>
          <TabsTrigger value="logs">Sending Logs</TabsTrigger>
          <TabsTrigger value="preferences">User Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Input
                    type="text"
                    placeholder="Search templates by name or ID..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search notification templates"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    aria-expanded={isFilterOpen}
                    aria-controls="filter-panel"
                    aria-label="Toggle filter options"
                  >
                    <Filter className="h-4 w-4" aria-hidden="true" />
                    <span>Filters</span>
                    {(eventTypeFilter !== 'all' || channelFilter !== 'all') && (
                      <Badge className="ml-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {(eventTypeFilter !== 'all' ? 1 : 0) + (channelFilter !== 'all' ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Filter panel */}
              {isFilterOpen && (
                <div id="filter-panel" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Filter options">
                  <div>
                    <label htmlFor="event-type-filter" className="block text-sm font-medium mb-1">
                      Event Type
                    </label>
                    <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                      <SelectTrigger id="event-type-filter" className="w-full">
                        <SelectValue placeholder="Filter by event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Event Types</SelectItem>
                        <SelectItem value="user">User Events</SelectItem>
                        <SelectItem value="course">Course Events</SelectItem>
                        <SelectItem value="payment">Payment Events</SelectItem>
                        <SelectItem value="consultation">Consultation Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="channel-filter" className="block text-sm font-medium mb-1">
                      Channel
                    </label>
                    <Select value={channelFilter} onValueChange={setChannelFilter}>
                      <SelectTrigger id="channel-filter" className="w-full">
                        <SelectValue placeholder="Filter by channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="in-app">In-App</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Templates table */}
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full text-sm" aria-label="Notification templates">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th scope="col" className="px-4 py-3 text-left font-medium">Template Name</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Event Type</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium hidden md:table-cell">Channel</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium hidden lg:table-cell">Last Updated</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Status</th>
                      <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          No templates found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredTemplates.map((template) => (
                        <tr key={template.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-xs text-muted-foreground">{template.id}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={getEventTypeBadgeStyles(template.eventType)}>
                              {template.eventType}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {template.channels.map(channel => (
                                <Badge key={channel} variant="outline" className="capitalize">
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                            {template.lastUpdated}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(template.status)}
                              <Badge className={getStatusBadgeStyles(template.status)}>
                                {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 focus:ring-2 focus:ring-blue-500"
                                  aria-label={`Actions for ${template.name}`}
                                >
                                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem 
                                  onClick={() => handleTemplateAction('edit', template.id)}
                                  className="focus:bg-gray-100"
                                >
                                  <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                                  Edit Template
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleTemplateAction('preview', template.id)}
                                  className="focus:bg-gray-100"
                                >
                                  <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {template.status === 'active' ? (
                                  <DropdownMenuItem 
                                    onClick={() => handleTemplateAction('deactivate', template.id)}
                                    className="focus:bg-gray-100"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                                    Deactivate
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem 
                                    onClick={() => handleTemplateAction('activate', template.id)}
                                    className="focus:bg-gray-100"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleTemplateAction('duplicate', template.id)}
                                  className="focus:bg-gray-100"
                                >
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleTemplateAction('test', template.id)}
                                  className="focus:bg-gray-100"
                                >
                                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                                  Send Test
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Delivery settings content */}
                <div className="bg-gray-50 border rounded-md p-8 text-center text-muted-foreground">
                  Configure email providers, push notification settings, and delivery rules
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Sending logs content */}
                <div className="bg-gray-50 border rounded-md p-8 text-center text-muted-foreground">
                  View detailed logs of notification delivery attempts and results
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* User preferences content */}
                <div className="bg-gray-50 border rounded-md p-8 text-center text-muted-foreground">
                  Configure default notification preferences and user subscription options
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 