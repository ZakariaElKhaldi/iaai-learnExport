"use client";

import { useState } from 'react';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Calendar,
  Clock,
  Users,
  Globe,
  Lock,
  Eye,
  EyeOff,
  DollarSign,
  Tag,
  CalendarClock,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

export interface CourseSettingsData {
  status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'private' | 'password_protected';
  password?: string;
  price: {
    type: 'free' | 'one_time' | 'subscription';
    amount: number;
  };
  enrollmentLimit?: number;
  hasEnrollmentLimit: boolean;
  startDate?: Date;
  endDate?: Date;
  hasDateRange: boolean;
  allowComments: boolean;
  requireCompletionOrder: boolean;
  certificateEnabled: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface CourseSettingsProps {
  initialData?: Partial<CourseSettingsData>;
  onSave: (data: CourseSettingsData) => void;
}

export function CourseSettings({ initialData, onSave }: CourseSettingsProps) {
  const [settings, setSettings] = useState<CourseSettingsData>({
    status: initialData?.status || 'draft',
    visibility: initialData?.visibility || 'public',
    password: initialData?.password || '',
    price: initialData?.price || {
      type: 'one_time',
      amount: 0,
    },
    enrollmentLimit: initialData?.enrollmentLimit || 0,
    hasEnrollmentLimit: initialData?.hasEnrollmentLimit || false,
    startDate: initialData?.startDate,
    endDate: initialData?.endDate,
    hasDateRange: initialData?.hasDateRange || false,
    allowComments: initialData?.allowComments ?? true,
    requireCompletionOrder: initialData?.requireCompletionOrder ?? true,
    certificateEnabled: initialData?.certificateEnabled ?? true,
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    metaKeywords: initialData?.metaKeywords || [],
  });
  
  const [keywordInput, setKeywordInput] = useState('');
  
  const handleChange = <K extends keyof CourseSettingsData>(field: K, value: CourseSettingsData[K]) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePriceChange = (field: keyof CourseSettingsData['price'], value: any) => {
    setSettings(prev => ({
      ...prev,
      price: {
        ...prev.price,
        [field]: value,
      },
    }));
  };
  
  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (!settings.metaKeywords?.includes(newKeyword)) {
        handleChange('metaKeywords', [...(settings.metaKeywords || []), newKeyword]);
      }
      setKeywordInput('');
    }
  };
  
  const removeKeyword = (keyword: string) => {
    handleChange(
      'metaKeywords',
      settings.metaKeywords?.filter(k => k !== keyword) || []
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Course Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status" className="text-base font-medium">Status</Label>
                <Select 
                  value={settings.status} 
                  onValueChange={(value: CourseSettingsData['status']) => handleChange('status', value)}
                >
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="visibility" className="text-base font-medium">Visibility</Label>
                <Select 
                  value={settings.visibility} 
                  onValueChange={(value: CourseSettingsData['visibility']) => handleChange('visibility', value)}
                >
                  <SelectTrigger id="visibility" className="mt-1">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Public</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Private (Invitation Only)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="password_protected">
                      <div className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Password Protected</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {settings.visibility === 'password_protected' && (
              <div>
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={settings.password || ''}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Enter password for course access"
                  className="mt-1"
                  required={settings.visibility === 'password_protected'}
                />
              </div>
            )}
            
            <div className="border-t pt-4">
              <h4 className="text-base font-medium mb-2">Pricing</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price-type" className="text-sm font-medium">Price Type</Label>
                  <Select 
                    value={settings.price.type} 
                    onValueChange={(value: CourseSettingsData['price']['type']) => handlePriceChange('type', value)}
                  >
                    <SelectTrigger id="price-type" className="mt-1">
                      <SelectValue placeholder="Select price type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="one_time">One-time Payment</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {settings.price.type !== 'free' && (
                  <div>
                    <Label htmlFor="price-amount" className="text-sm font-medium">
                      {settings.price.type === 'one_time' ? 'Price ($)' : 'Monthly Price ($)'}
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price-amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={settings.price.amount}
                        onChange={(e) => handlePriceChange('amount', parseFloat(e.target.value))}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-base font-medium mb-2">Enrollment Options</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enrollment-limit-toggle" className="text-sm font-medium">Limit Enrollment</Label>
                    <p className="text-xs text-muted-foreground">Set a maximum number of students</p>
                  </div>
                  <Switch
                    id="enrollment-limit-toggle"
                    checked={settings.hasEnrollmentLimit}
                    onCheckedChange={(checked) => handleChange('hasEnrollmentLimit', checked)}
                  />
                </div>
                
                {settings.hasEnrollmentLimit && (
                  <div>
                    <Label htmlFor="enrollment-limit" className="text-sm font-medium">Maximum Students</Label>
                    <div className="relative mt-1">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="enrollment-limit"
                        type="number"
                        min="1"
                        value={settings.enrollmentLimit}
                        onChange={(e) => handleChange('enrollmentLimit', parseInt(e.target.value))}
                        className="pl-9"
                        required={settings.hasEnrollmentLimit}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="date-range-toggle" className="text-sm font-medium">Set Enrollment Period</Label>
                    <p className="text-xs text-muted-foreground">Limit when students can enroll</p>
                  </div>
                  <Switch
                    id="date-range-toggle"
                    checked={settings.hasDateRange}
                    onCheckedChange={(checked) => handleChange('hasDateRange', checked)}
                  />
                </div>
                
                {settings.hasDateRange && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
                      <div className="mt-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {settings.startDate ? (
                                format(settings.startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={settings.startDate}
                              onSelect={(date) => handleChange('startDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
                      <div className="mt-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {settings.endDate ? (
                                format(settings.endDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={settings.endDate}
                              onSelect={(date) => handleChange('endDate', date)}
                              initialFocus
                              disabled={(date) => 
                                settings.startDate ? date < settings.startDate : false
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-base font-medium mb-2">Course Features</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments-toggle" className="text-sm font-medium">Allow Comments</Label>
                    <p className="text-xs text-muted-foreground">Let students discuss in comments</p>
                  </div>
                  <Switch
                    id="comments-toggle"
                    checked={settings.allowComments}
                    onCheckedChange={(checked) => handleChange('allowComments', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="completion-order-toggle" className="text-sm font-medium">Require Sequential Completion</Label>
                    <p className="text-xs text-muted-foreground">Students must complete lessons in order</p>
                  </div>
                  <Switch
                    id="completion-order-toggle"
                    checked={settings.requireCompletionOrder}
                    onCheckedChange={(checked) => handleChange('requireCompletionOrder', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="certificate-toggle" className="text-sm font-medium">Enable Completion Certificate</Label>
                    <p className="text-xs text-muted-foreground">Award certificate when course is completed</p>
                  </div>
                  <Switch
                    id="certificate-toggle"
                    checked={settings.certificateEnabled}
                    onCheckedChange={(checked) => handleChange('certificateEnabled', checked)}
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-base font-medium mb-2">SEO Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta-title" className="text-sm font-medium">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={settings.metaTitle || ''}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    placeholder="Enter SEO title"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended length: 50-60 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="meta-description" className="text-sm font-medium">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={settings.metaDescription || ''}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    placeholder="Enter SEO description"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended length: 150-160 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="meta-keywords" className="text-sm font-medium">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordAdd}
                    placeholder="Enter keywords and press Enter"
                    className="mt-1"
                  />
                  
                  {settings.metaKeywords && settings.metaKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {settings.metaKeywords.map(keyword => (
                        <div key={keyword} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center">
                          {keyword}
                          <button 
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 text-primary hover:text-primary/70"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 