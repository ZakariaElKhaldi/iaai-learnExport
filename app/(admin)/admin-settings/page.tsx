"use client";

import { useState } from 'react';
import { 
  Save, 
  RefreshCw,
  Settings,
  Shield,
  Mail,
  Globe,
  Database,
  FileText,
  Bell,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock save settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            aria-label="Refresh settings"
            className="focus:ring-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
            className="focus:ring-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" aria-hidden="true" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input 
                    id="platform-name" 
                    defaultValue="IAAI Learning Platform" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input 
                    id="platform-url" 
                    defaultValue="https://learn.iaai.com" 
                    className="max-w-md"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <textarea 
                  id="platform-description" 
                  className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="AI-powered learning platform for cybersecurity and technology education."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone" className="max-w-md">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format" className="max-w-md">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Content Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="default-language" className="max-w-md">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content-approval">Default Content Approval</Label>
                  <Select defaultValue="required">
                    <SelectTrigger id="content-approval" className="max-w-md">
                      <SelectValue placeholder="Select approval process" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Approval Required</SelectItem>
                      <SelectItem value="auto">Auto-Approve</SelectItem>
                      <SelectItem value="trusted">Approve from Trusted Authors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="allow-comments" defaultChecked />
                <Label htmlFor="allow-comments">Allow Comments on Content</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-translate" />
                <Label htmlFor="auto-translate">Enable Auto-Translation</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Authentication Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy" className="max-w-md">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input 
                  id="session-timeout" 
                  type="number"
                  defaultValue="30" 
                  className="max-w-md"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="mfa-required" />
                <Label htmlFor="mfa-required">Require MFA for Admin Users</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="lockout-enabled" defaultChecked />
                <Label htmlFor="lockout-enabled">Enable Account Lockout</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lockout-attempts">Failed Attempts Before Lockout</Label>
                <Input 
                  id="lockout-attempts" 
                  type="number"
                  defaultValue="5" 
                  className="max-w-md"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2 text-blue-600" />
                API Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="api-enabled" defaultChecked />
                <Label htmlFor="api-enabled">Enable API Access</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                <Input 
                  id="api-rate-limit" 
                  type="number"
                  defaultValue="100" 
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-token-expiry">API Token Expiry (days)</Label>
                <Input 
                  id="api-token-expiry" 
                  type="number"
                  defaultValue="30" 
                  className="max-w-md"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-sender">Default Sender Email</Label>
                <Input 
                  id="email-sender" 
                  defaultValue="noreply@iaai-learn.com" 
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-sender-name">Default Sender Name</Label>
                <Input 
                  id="email-sender-name" 
                  defaultValue="IAAI Learning Platform" 
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium">Admin Notifications</h3>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <Label htmlFor="notify-new-user">New User Registration</Label>
                  <Switch id="notify-new-user" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <Label htmlFor="notify-content-approval">Content Approval Requests</Label>
                  <Switch id="notify-content-approval" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <Label htmlFor="notify-subscription">New Subscription</Label>
                  <Switch id="notify-subscription" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <Label htmlFor="notify-reports">Daily Reports</Label>
                  <Switch id="notify-reports" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                SMTP Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input 
                    id="smtp-host" 
                    defaultValue="smtp.example.com" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    defaultValue="587" 
                    className="max-w-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input 
                    id="smtp-username" 
                    defaultValue="smtp_user" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input 
                    id="smtp-password" 
                    type="password"
                    defaultValue="••••••••••••" 
                    className="max-w-md"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="smtp-ssl" defaultChecked />
                <Label htmlFor="smtp-ssl">Use SSL/TLS</Label>
              </div>
              
              <Button variant="outline">
                Test SMTP Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Third-Party Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">GitHub Integration</h3>
                      <p className="text-sm text-gray-500">Connect to GitHub repositories</p>
                    </div>
                  </div>
                  <Switch id="github-enabled" />
                </div>
                
                <div className="pl-13 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="github-client-id">Client ID</Label>
                    <Input 
                      id="github-client-id" 
                      placeholder="Enter GitHub client ID" 
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github-client-secret">Client Secret</Label>
                    <Input 
                      id="github-client-secret" 
                      type="password"
                      placeholder="Enter GitHub client secret" 
                      className="max-w-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Facebook Integration</h3>
                      <p className="text-sm text-gray-500">Enable Facebook login and sharing</p>
                    </div>
                  </div>
                  <Switch id="facebook-enabled" defaultChecked />
                </div>
                
                <div className="pl-13 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-app-id">App ID</Label>
                    <Input 
                      id="facebook-app-id" 
                      defaultValue="123456789012345" 
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facebook-app-secret">App Secret</Label>
                    <Input 
                      id="facebook-app-secret" 
                      type="password"
                      defaultValue="••••••••••••••••" 
                      className="max-w-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Twitter Integration</h3>
                      <p className="text-sm text-gray-500">Enable Twitter login and sharing</p>
                    </div>
                  </div>
                  <Switch id="twitter-enabled" />
                </div>
                
                <div className="pl-13 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="twitter-api-key">API Key</Label>
                    <Input 
                      id="twitter-api-key" 
                      placeholder="Enter Twitter API key" 
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter-api-secret">API Secret</Label>
                    <Input 
                      id="twitter-api-secret" 
                      type="password"
                      placeholder="Enter Twitter API secret" 
                      className="max-w-md"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                <Input 
                  id="cache-ttl" 
                  type="number"
                  defaultValue="3600" 
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-upload-size">Max Upload Size (MB)</Label>
                <Input 
                  id="max-upload-size" 
                  type="number"
                  defaultValue="50" 
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger id="log-level" className="max-w-md">
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="debug-mode" />
                <Label htmlFor="debug-mode">Enable Debug Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enable-cors" defaultChecked />
                <Label htmlFor="enable-cors">Enable CORS</Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border border-red-200 rounded-md p-4 bg-red-50">
                <h3 className="font-medium text-red-700 mb-2">Clear System Cache</h3>
                <p className="text-sm text-red-600 mb-4">This will clear all system caches. The system may be slower until caches are rebuilt.</p>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Clear Cache
                </Button>
              </div>
              
              <div className="border border-red-200 rounded-md p-4 bg-red-50">
                <h3 className="font-medium text-red-700 mb-2">Reset All Settings</h3>
                <p className="text-sm text-red-600 mb-4">This will reset all settings to their default values. This action cannot be undone.</p>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Reset Settings
                </Button>
              </div>
              
              <div className="border border-red-200 rounded-md p-4 bg-red-50">
                <h3 className="font-medium text-red-700 mb-2">Purge All Data</h3>
                <p className="text-sm text-red-600 mb-4">This will permanently delete all data from the system. This action cannot be undone.</p>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Purge Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 