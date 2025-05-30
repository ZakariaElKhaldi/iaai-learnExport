"use client";

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for audit logs
const auditLogs = [
  {
    id: 'log-001',
    timestamp: new Date('2023-10-15T08:23:45'),
    user: {
      id: 'user-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Administrator'
    },
    action: 'USER_LOGIN',
    description: 'User logged in successfully',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'auth',
      id: null
    }
  },
  {
    id: 'log-002',
    timestamp: new Date('2023-10-15T09:12:30'),
    user: {
      id: 'user-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Administrator'
    },
    action: 'COURSE_CREATE',
    description: 'Created new course "Introduction to Cybersecurity"',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'course',
      id: 'course-123'
    }
  },
  {
    id: 'log-003',
    timestamp: new Date('2023-10-15T10:45:12'),
    user: {
      id: 'user-002',
      name: 'Content Manager',
      email: 'content@example.com',
      role: 'Content Manager'
    },
    action: 'COURSE_UPDATE',
    description: 'Updated course "Advanced Python Programming"',
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'course',
      id: 'course-456'
    }
  },
  {
    id: 'log-004',
    timestamp: new Date('2023-10-15T11:23:05'),
    user: {
      id: 'user-003',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student'
    },
    action: 'USER_PASSWORD_RESET',
    description: 'Password reset requested',
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    status: 'success',
    resource: {
      type: 'user',
      id: 'user-003'
    }
  },
  {
    id: 'log-005',
    timestamp: new Date('2023-10-15T12:11:33'),
    user: {
      id: 'user-004',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Instructor'
    },
    action: 'CONTENT_UPLOAD',
    description: 'Uploaded new lecture video',
    ipAddress: '198.51.100.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'content',
      id: 'content-789'
    }
  },
  {
    id: 'log-006',
    timestamp: new Date('2023-10-15T13:45:22'),
    user: {
      id: 'user-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Administrator'
    },
    action: 'USER_ROLE_UPDATE',
    description: 'Updated role for user "Jane Smith" from "Student" to "Instructor"',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'user',
      id: 'user-004'
    }
  },
  {
    id: 'log-007',
    timestamp: new Date('2023-10-15T14:22:18'),
    user: {
      id: 'system',
      name: 'System',
      email: null,
      role: 'System'
    },
    action: 'SYSTEM_BACKUP',
    description: 'Automated system backup completed',
    ipAddress: 'localhost',
    userAgent: 'System Service',
    status: 'success',
    resource: {
      type: 'system',
      id: null
    }
  },
  {
    id: 'log-008',
    timestamp: new Date('2023-10-15T15:10:45'),
    user: {
      id: 'user-005',
      name: 'Unknown User',
      email: 'unknown@example.com',
      role: 'Guest'
    },
    action: 'USER_LOGIN_FAILED',
    description: 'Failed login attempt - incorrect password',
    ipAddress: '203.0.113.5',
    userAgent: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
    status: 'error',
    resource: {
      type: 'auth',
      id: null
    }
  },
  {
    id: 'log-009',
    timestamp: new Date('2023-10-15T16:30:12'),
    user: {
      id: 'user-002',
      name: 'Content Manager',
      email: 'content@example.com',
      role: 'Content Manager'
    },
    action: 'COURSE_DELETE',
    description: 'Deleted course "Outdated Course Material"',
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'warning',
    resource: {
      type: 'course',
      id: 'course-789'
    }
  },
  {
    id: 'log-010',
    timestamp: new Date('2023-10-15T17:45:33'),
    user: {
      id: 'user-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Administrator'
    },
    action: 'SYSTEM_SETTINGS_UPDATE',
    description: 'Updated system email settings',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success',
    resource: {
      type: 'settings',
      id: 'email-settings'
    }
  }
];

// Group logs by date for the timeline view
const groupLogsByDate = (logs) => {
  return logs.reduce((groups, log) => {
    const date = format(log.timestamp, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {});
};

export default function AdminAuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [activeTab, setActiveTab] = useState('table');
  
  // Filter logs based on search query and filters
  const filteredLogs = auditLogs.filter(log => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filter
    const matchesDate = !selectedDate || 
      format(log.timestamp, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    
    // Action filter
    const matchesAction = !selectedAction || log.action === selectedAction;
    
    // Status filter
    const matchesStatus = !selectedStatus || log.status === selectedStatus;
    
    // User filter
    const matchesUser = !selectedUser || log.user.id === selectedUser;
    
    return matchesSearch && matchesDate && matchesAction && matchesStatus && matchesUser;
  });
  
  // Get unique actions for filter dropdown
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  
  // Get unique users for filter dropdown
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user.id))].map(userId => {
    const user = auditLogs.find(log => log.user.id === userId).user;
    return { id: user.id, name: user.name };
  });
  
  // Group logs by date for timeline view
  const groupedLogs = groupLogsByDate(filteredLogs);
  
  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" aria-hidden="true" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" aria-hidden="true" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Download audit logs"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Refresh audit logs"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      
      {/* Audit Log Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Logs</p>
              <p className="text-2xl font-bold">{filteredLogs.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <FileText className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">User Actions</p>
              <p className="text-2xl font-bold">{filteredLogs.filter(log => log.user.id !== 'system').length}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <User className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Events</p>
              <p className="text-2xl font-bold">{filteredLogs.filter(log => log.user.id === 'system').length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Clock className="h-5 w-5 text-green-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search logs by description, action, or user..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search logs"
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-1 ${selectedDate ? 'border-blue-500 text-blue-600' : ''}`}
                    aria-label="Filter by date"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Date'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="p-2 border-t flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedDate(null)}
                        className="text-sm"
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              
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
              </Button>
            </div>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div id="filter-panel" className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4" role="region" aria-label="Filter options">
              <div>
                <label htmlFor="action-filter" className="block text-sm font-medium mb-1">
                  Action Type
                </label>
                <Select 
                  value={selectedAction} 
                  onValueChange={setSelectedAction}
                >
                  <SelectTrigger id="action-filter" className="w-full">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Actions</SelectItem>
                    {uniqueActions.map(action => (
                      <SelectItem key={action} value={action}>{action.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select 
                  value={selectedStatus} 
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger id="status-filter" className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="user-filter" className="block text-sm font-medium mb-1">
                  User
                </label>
                <Select 
                  value={selectedUser} 
                  onValueChange={setSelectedUser}
                >
                  <SelectTrigger id="user-filter" className="w-full">
                    <SelectValue placeholder="Filter by user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Users</SelectItem>
                    {uniqueUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Toggle */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-[200px]">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        {/* Table View */}
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full text-sm" aria-label="Audit logs">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th scope="col" className="px-4 py-3 text-left font-medium">Timestamp</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">User</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Action</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Description</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">Status</th>
                      <th scope="col" className="px-4 py-3 text-left font-medium">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          No audit logs found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            {format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{log.user.name}</div>
                            <div className="text-xs text-muted-foreground">{log.user.role}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {log.action.replace(/_/g, ' ')}
                          </td>
                          <td className="px-4 py-3">{log.description}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(log.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(log.status)}
                                <span>{log.status.charAt(0).toUpperCase() + log.status.slice(1)}</span>
                              </span>
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{log.ipAddress}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Timeline View */}
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {Object.keys(groupedLogs).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No audit logs found matching your filters.
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedLogs)
                    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                    .map(([date, logs]) => (
                      <div key={date} className="space-y-4">
                        <h3 className="font-medium text-lg">{format(new Date(date), 'EEEE, MMMM d, yyyy')}</h3>
                        <div className="border-l-2 border-gray-200 pl-4 space-y-6">
                          {logs
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((log) => (
                              <div key={log.id} className="relative pb-6">
                                <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-gray-300"></div>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-muted-foreground">
                                      {format(log.timestamp, 'HH:mm:ss')}
                                    </span>
                                    <Badge className={getStatusColor(log.status)}>
                                      <span className="flex items-center gap-1">
                                        {getStatusIcon(log.status)}
                                        <span>{log.status.charAt(0).toUpperCase() + log.status.slice(1)}</span>
                                      </span>
                                    </Badge>
                                  </div>
                                  <div className="font-medium">{log.action.replace(/_/g, ' ')}</div>
                                  <p>{log.description}</p>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <User className="h-3 w-3" aria-hidden="true" />
                                    <span>{log.user.name} ({log.user.role})</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 