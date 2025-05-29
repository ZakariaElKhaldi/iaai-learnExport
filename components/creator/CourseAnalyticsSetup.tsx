"use client";

import { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  Info,
  ExternalLink,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export interface AnalyticsSettings {
  googleAnalyticsId?: string;
  enableGoogleAnalytics: boolean;
  trackEnrollments: boolean;
  trackCompletions: boolean;
  trackVideoEngagement: boolean;
  trackQuizAttempts: boolean;
  trackDownloads: boolean;
  customEventTracking?: string;
}

interface CourseAnalyticsSetupProps {
  initialData?: Partial<AnalyticsSettings>;
  onSave: (data: AnalyticsSettings) => void;
}

export function CourseAnalyticsSetup({ initialData, onSave }: CourseAnalyticsSetupProps) {
  const [settings, setSettings] = useState<AnalyticsSettings>({
    googleAnalyticsId: initialData?.googleAnalyticsId || '',
    enableGoogleAnalytics: initialData?.enableGoogleAnalytics ?? false,
    trackEnrollments: initialData?.trackEnrollments ?? true,
    trackCompletions: initialData?.trackCompletions ?? true,
    trackVideoEngagement: initialData?.trackVideoEngagement ?? true,
    trackQuizAttempts: initialData?.trackQuizAttempts ?? true,
    trackDownloads: initialData?.trackDownloads ?? true,
    customEventTracking: initialData?.customEventTracking || '',
  });
  
  const [isGAVerified, setIsGAVerified] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("setup");
  
  const handleChange = <K extends keyof AnalyticsSettings>(field: K, value: AnalyticsSettings[K]) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const verifyGoogleAnalytics = () => {
    // In a real implementation, this would verify the GA ID
    // For now, we'll just simulate verification
    if (settings.googleAnalyticsId && settings.googleAnalyticsId.startsWith('G-')) {
      setIsGAVerified(true);
    } else {
      setIsGAVerified(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Course Analytics Setup
        </CardTitle>
        <CardDescription>
          Configure analytics tracking for your course to gain insights into student behavior and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="events">Event Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ga-toggle" className="text-base font-medium">
                    Google Analytics 4
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 inline-block text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            Google Analytics 4 helps you track user interactions and gain insights into how students engage with your course.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable Google Analytics tracking for this course</p>
                </div>
                <Switch
                  id="ga-toggle"
                  checked={settings.enableGoogleAnalytics}
                  onCheckedChange={(checked) => handleChange('enableGoogleAnalytics', checked)}
                />
              </div>
              
              {settings.enableGoogleAnalytics && (
                <div className="space-y-2">
                  <Label htmlFor="ga-id" className="text-sm font-medium">
                    Google Analytics Measurement ID
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="ga-id"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      className="flex-1"
                    />
                    <Button type="button" onClick={verifyGoogleAnalytics} variant="secondary">
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter your Google Analytics 4 Measurement ID (starts with G-)
                  </p>
                  
                  {isGAVerified === true && (
                    <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                      <Check className="h-4 w-4" />
                      <AlertTitle>Verification Successful</AlertTitle>
                      <AlertDescription>
                        Google Analytics ID verified successfully.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {isGAVerified === false && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Verification Failed</AlertTitle>
                      <AlertDescription>
                        Please check your Google Analytics ID and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href="https://support.google.com/analytics/answer/9539598" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        How to find your Measurement ID
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <h4 className="text-base font-medium mb-2">Analytics Dashboard</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Course analytics data will be available in your creator dashboard once students start engaging with your content.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <LineChart className="mr-2 h-4 w-4" />
                        Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Track student progress, video views, and time spent
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <PieChart className="mr-2 h-4 w-4" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Monitor quiz scores and completion rates
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Track sales, conversions, and revenue metrics
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h4 className="text-base font-medium">Event Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Configure which events to track for this course
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-enrollments" className="text-sm font-medium">
                      Enrollment Events
                    </Label>
                    <p className="text-xs text-muted-foreground">Track when students enroll in your course</p>
                  </div>
                  <Switch
                    id="track-enrollments"
                    checked={settings.trackEnrollments}
                    onCheckedChange={(checked) => handleChange('trackEnrollments', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-completions" className="text-sm font-medium">
                      Completion Events
                    </Label>
                    <p className="text-xs text-muted-foreground">Track when students complete lessons or the entire course</p>
                  </div>
                  <Switch
                    id="track-completions"
                    checked={settings.trackCompletions}
                    onCheckedChange={(checked) => handleChange('trackCompletions', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-video" className="text-sm font-medium">
                      Video Engagement
                    </Label>
                    <p className="text-xs text-muted-foreground">Track video plays, pauses, and completion rates</p>
                  </div>
                  <Switch
                    id="track-video"
                    checked={settings.trackVideoEngagement}
                    onCheckedChange={(checked) => handleChange('trackVideoEngagement', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-quiz" className="text-sm font-medium">
                      Quiz Attempts
                    </Label>
                    <p className="text-xs text-muted-foreground">Track quiz starts, completions, and scores</p>
                  </div>
                  <Switch
                    id="track-quiz"
                    checked={settings.trackQuizAttempts}
                    onCheckedChange={(checked) => handleChange('trackQuizAttempts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="track-downloads" className="text-sm font-medium">
                      Resource Downloads
                    </Label>
                    <p className="text-xs text-muted-foreground">Track when students download course materials</p>
                  </div>
                  <Switch
                    id="track-downloads"
                    checked={settings.trackDownloads}
                    onCheckedChange={(checked) => handleChange('trackDownloads', checked)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Label htmlFor="custom-events" className="text-sm font-medium">
                  Custom Event Tracking (Advanced)
                </Label>
                <Textarea
                  id="custom-events"
                  value={settings.customEventTracking}
                  onChange={(e) => handleChange('customEventTracking', e.target.value)}
                  placeholder="// Add custom event tracking code here"
                  className="font-mono text-xs h-32 mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add custom JavaScript code to track specific events (optional)
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSubmit}>Save Analytics Settings</Button>
      </CardFooter>
    </Card>
  );
} 