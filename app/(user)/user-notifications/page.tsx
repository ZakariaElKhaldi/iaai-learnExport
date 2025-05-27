"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, MessageSquare, Calendar, Settings, AlertCircle, Clock, UserPlus, Award, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const [emailDigest, setEmailDigest] = useState<"daily" | "weekly" | "off">("weekly");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground">Control how and when you receive notifications</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Push Notifications</CardTitle>
            </div>
            <CardDescription>Configure desktop and mobile push notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">New Course Available</div>
                <div className="text-sm text-muted-foreground">Get notified when new courses in your interests are published</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Course Updates</div>
                <div className="text-sm text-muted-foreground">Receive notifications about updates to courses you're enrolled in</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Upcoming Live Sessions</div>
                <div className="text-sm text-muted-foreground">Get reminders about live sessions you've registered for</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">New Messages</div>
                <div className="text-sm text-muted-foreground">Receive notifications for new messages</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Email Notifications</CardTitle>
            </div>
            <CardDescription>Customize your email notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Weekly Digest</div>
                <div className="text-sm text-muted-foreground">Receive a weekly summary of platform activities and recommended courses</div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setEmailDigest("daily")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    emailDigest === "daily" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => setEmailDigest("weekly")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    emailDigest === "weekly" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setEmailDigest("off")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    emailDigest === "off" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Course Completion Reminders</div>
                <div className="text-sm text-muted-foreground">Emails to remind you about uncompleted courses</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Special Offers & Promotions</div>
                <div className="text-sm text-muted-foreground">Receive emails about discounts and special offers</div>
              </div>
              <Switch />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Account Updates</div>
                <div className="text-sm text-muted-foreground">Important updates about your account and security</div>
              </div>
              <div className="flex items-center">
                <Badge className="text-xs">Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Activity Notifications</CardTitle>
          </div>
          <CardDescription>Configure what activities you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Comments</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Replies to my comments</label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Mentions</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Events</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Session reminders</label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Webinar announcements</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Social</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">New followers</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Connection requests</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Achievements</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Badges earned</label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Certificates</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-medium">Learning</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Learning streaks</label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Quiz results</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Reviews</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Replies to reviews</label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Review requests</label>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 