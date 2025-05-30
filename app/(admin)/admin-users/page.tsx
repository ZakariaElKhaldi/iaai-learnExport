"use client";

import { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  RefreshCw,
  Check,
  X,
  Mail,
  ShieldCheck,
  AlertTriangle
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

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock user data
  const users = [
    {
      id: 'USR-1234',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'learner',
      company: 'Individual',
      status: 'active',
      createdAt: 'Jan 15, 2023',
      avatar: 'JD'
    },
    {
      id: 'USR-5678',
      name: 'Jane Smith',
      email: 'jane.smith@techcorp.com',
      role: 'admin',
      company: 'TechCorp Inc.',
      status: 'active',
      createdAt: 'Mar 3, 2023',
      avatar: 'JS'
    },
    {
      id: 'USR-9012',
      name: 'Robert Johnson',
      email: 'robert.j@educorp.org',
      role: 'instructor',
      company: 'EduCorp',
      status: 'inactive',
      createdAt: 'May 22, 2023',
      avatar: 'RJ'
    },
    {
      id: 'USR-3456',
      name: 'Emily Davis',
      email: 'emily.d@learncorp.com',
      role: 'learner',
      company: 'LearnCorp',
      status: 'active',
      createdAt: 'Jun 5, 2023',
      avatar: 'ED'
    },
    {
      id: 'USR-7890',
      name: 'Michael Wilson',
      email: 'michael.w@techcorp.com',
      role: 'consultant',
      company: 'TechCorp Inc.',
      status: 'suspended',
      createdAt: 'Apr 12, 2023',
      avatar: 'MW'
    }
  ];
  
  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply role filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Helper function for role badge styling
  const getRoleBadgeStyles = (role: string) => {
    switch(role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'instructor':
        return 'bg-yellow-100 text-yellow-800';
      case 'consultant':
        return 'bg-green-100 text-green-800';
      case 'learner':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Helper function for status badge styling
  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function for status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <Check className="h-4 w-4 text-green-600" aria-hidden="true" />;
      case 'inactive':
        return <X className="h-4 w-4 text-gray-600" aria-hidden="true" />;
      case 'suspended':
        return <AlertTriangle className="h-4 w-4 text-red-600" aria-hidden="true" />;
      default:
        return null;
    }
  };
  
  // Handle user action (edit, activate/deactivate, etc.)
  const handleUserAction = (action: string, userId: string) => {
    console.log(`Performing ${action} on user ${userId}`);
    // In a real app, this would make an API call to perform the action
  };
  
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            aria-label="Download user data"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            aria-label="Refresh user list"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button className="focus:ring-2 focus:ring-blue-500">
            <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add User
          </Button>
        </div>
      </div>
      
      {/* User stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <UserPlus className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Suspended Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
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
                placeholder="Search users by name, email, or ID..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search users"
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
                {(roleFilter !== 'all' || statusFilter !== 'all') && (
                  <Badge className="ml-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {(roleFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              {filteredUsers.length > 0 && (
                <Button 
                  variant="outline"
                  aria-label={`Export ${filteredUsers.length} filtered users`}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export
                </Button>
              )}
            </div>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div id="filter-panel" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Filter options">
              <div>
                <label htmlFor="role-filter" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger id="role-filter" className="w-full">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="learner">Learner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Users table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <table className="w-full text-sm" aria-label="Users list">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th scope="col" className="px-4 py-3 text-left font-medium">User</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden md:table-cell">Role</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden lg:table-cell">Company</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden sm:table-cell">Status</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium hidden lg:table-cell">Created</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge className={getRoleBadgeStyles(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {user.company}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(user.status)}
                          <span className={`text-sm ${
                            user.status === 'active' ? 'text-green-700' : 
                            user.status === 'suspended' ? 'text-red-700' : 'text-gray-700'
                          }`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                        {user.createdAt}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 focus:ring-2 focus:ring-blue-500"
                              aria-label={`Actions for ${user.name}`}
                            >
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('view', user.id)}
                              className="focus:bg-gray-100"
                            >
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('edit', user.id)}
                              className="focus:bg-gray-100"
                            >
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('email', user.id)}
                              className="focus:bg-gray-100"
                            >
                              <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('deactivate', user.id)}
                                className="text-amber-600 focus:bg-gray-100 focus:text-amber-600"
                              >
                                Deactivate
                              </DropdownMenuItem>
                            ) : user.status === 'inactive' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction('activate', user.id)}
                                className="text-green-600 focus:bg-gray-100 focus:text-green-600"
                              >
                                Activate
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('delete', user.id)}
                              className="text-red-600 focus:bg-gray-100 focus:text-red-600"
                            >
                              Delete User
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
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={true}
                aria-label="Previous page"
                className="focus:ring-2 focus:ring-blue-500"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={true}
                aria-label="Next page"
                className="focus:ring-2 focus:ring-blue-500"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}