"use client";

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  RefreshCw,
  Edit,
  Trash2,
  ShieldCheck,
  Lock,
  CheckCircle,
  XCircle
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminRolesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  
  // Mock roles data
  const roles = [
    {
      id: 'role-001',
      name: 'Administrator',
      description: 'Full access to all system features',
      usersCount: 5,
      isSystem: true,
      permissions: [
        'users:read', 'users:write', 'users:delete',
        'courses:read', 'courses:write', 'courses:delete',
        'settings:read', 'settings:write'
      ]
    },
    {
      id: 'role-002',
      name: 'Content Manager',
      description: 'Manage courses and learning content',
      usersCount: 12,
      isSystem: false,
      permissions: [
        'users:read',
        'courses:read', 'courses:write', 'courses:delete',
        'settings:read'
      ]
    },
    {
      id: 'role-003',
      name: 'Instructor',
      description: 'Create and manage own courses',
      usersCount: 28,
      isSystem: true,
      permissions: [
        'courses:read', 'courses:write',
        'settings:read'
      ]
    },
    {
      id: 'role-004',
      name: 'Student',
      description: 'Access and consume learning content',
      usersCount: 1456,
      isSystem: true,
      permissions: [
        'courses:read'
      ]
    },
    {
      id: 'role-005',
      name: 'Support Staff',
      description: 'Handle user support and moderation',
      usersCount: 8,
      isSystem: false,
      permissions: [
        'users:read',
        'courses:read',
        'settings:read'
      ]
    }
  ];
  
  // Filter roles based on search query
  const filteredRoles = roles.filter(role => {
    return searchQuery === '' || 
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // All available permissions in the system
  const allPermissions = [
    { id: 'users:read', category: 'Users', name: 'View Users' },
    { id: 'users:write', category: 'Users', name: 'Create/Edit Users' },
    { id: 'users:delete', category: 'Users', name: 'Delete Users' },
    { id: 'courses:read', category: 'Courses', name: 'View Courses' },
    { id: 'courses:write', category: 'Courses', name: 'Create/Edit Courses' },
    { id: 'courses:delete', category: 'Courses', name: 'Delete Courses' },
    { id: 'settings:read', category: 'Settings', name: 'View Settings' },
    { id: 'settings:write', category: 'Settings', name: 'Modify Settings' },
    { id: 'analytics:read', category: 'Analytics', name: 'View Analytics' },
    { id: 'notifications:read', category: 'Notifications', name: 'View Notifications' },
    { id: 'notifications:write', category: 'Notifications', name: 'Manage Notifications' },
  ];
  
  // Group permissions by category
  const permissionsByCategory = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});
  
  // Handle role action (edit, delete, etc.)
  const handleRoleAction = (action, role) => {
    console.log(`Performing ${action} on role ${role.id}`);
    if (action === 'edit') {
      setCurrentRole(role);
      setIsEditRoleOpen(true);
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
            aria-label="Download roles data"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Refresh roles list"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            onClick={() => setIsCreateRoleOpen(true)}
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Create Role
          </Button>
        </div>
      </div>
      
      {/* Role Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Roles</p>
              <p className="text-2xl font-bold">{roles.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">System Roles</p>
              <p className="text-2xl font-bold">{roles.filter(r => r.isSystem).length}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Lock className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Custom Roles</p>
              <p className="text-2xl font-bold">{roles.filter(r => !r.isSystem).length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Edit className="h-5 w-5 text-green-600" aria-hidden="true" />
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
                placeholder="Search roles by name or description..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search roles"
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
              </Button>
            </div>
          </div>
          
          {/* Filter panel */}
          {isFilterOpen && (
            <div id="filter-panel" className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Filter options">
              <div>
                <label htmlFor="role-type" className="block text-sm font-medium mb-1">
                  Role Type
                </label>
                <Select defaultValue="all">
                  <SelectTrigger id="role-type" className="w-full">
                    <SelectValue placeholder="Filter by role type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="system">System Roles</SelectItem>
                    <SelectItem value="custom">Custom Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="permission" className="block text-sm font-medium mb-1">
                  Has Permission
                </label>
                <Select defaultValue="">
                  <SelectTrigger id="permission" className="w-full">
                    <SelectValue placeholder="Filter by permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Permission</SelectItem>
                    <SelectItem value="users:write">Create/Edit Users</SelectItem>
                    <SelectItem value="courses:write">Create/Edit Courses</SelectItem>
                    <SelectItem value="settings:write">Modify Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Roles Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <table className="w-full text-sm" aria-label="Roles list">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th scope="col" className="px-4 py-3 text-left font-medium">Role</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Description</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Users</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Type</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Permissions</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No roles found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredRoles.map((role) => (
                    <tr key={role.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{role.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{role.description}</td>
                      <td className="px-4 py-3">{role.usersCount}</td>
                      <td className="px-4 py-3">
                        <Badge className={role.isSystem ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}>
                          {role.isSystem ? 'System' : 'Custom'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-blue-100 text-blue-800">
                          {role.permissions.length} permissions
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 focus:ring-2 focus:ring-blue-500"
                              aria-label={`Actions for ${role.name} role`}
                            >
                              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleRoleAction('view', role)}
                              className="focus:bg-gray-100"
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRoleAction('edit', role)}
                              className="focus:bg-gray-100"
                              disabled={role.isSystem}
                            >
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRoleAction('duplicate', role)}
                              className="focus:bg-gray-100"
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleRoleAction('delete', role)}
                              className="text-red-600 focus:bg-gray-100 focus:text-red-600"
                              disabled={role.isSystem || role.usersCount > 0}
                            >
                              Delete Role
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
      
      {/* Create Role Dialog */}
      <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Create a new role with specific permissions. Roles define what users can access and modify in the system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input id="role-name" placeholder="Enter role name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <textarea 
                id="role-description" 
                placeholder="Describe the purpose of this role"
                className="w-full min-h-[80px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-4 mt-6">
              <h4 className="text-sm font-medium">Permissions</h4>
              
              {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                <div key={category} className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">{category}</h5>
                  <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                    {permissions.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Switch id={permission.id} />
                        <Label htmlFor={permission.id}>{permission.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>Cancel</Button>
            <Button>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify role details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {currentRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role-name">Role Name</Label>
                <Input id="edit-role-name" defaultValue={currentRole.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-role-description">Description</Label>
                <textarea 
                  id="edit-role-description" 
                  defaultValue={currentRole.description}
                  className="w-full min-h-[80px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-4 mt-6">
                <h4 className="text-sm font-medium">Permissions</h4>
                
                {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">{category}</h5>
                    <div className="space-y-2 pl-2 border-l-2 border-gray-200">
                      {permissions.map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Switch 
                            id={`edit-${permission.id}`} 
                            defaultChecked={currentRole.permissions.includes(permission.id)}
                          />
                          <Label htmlFor={`edit-${permission.id}`}>{permission.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>Cancel</Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 