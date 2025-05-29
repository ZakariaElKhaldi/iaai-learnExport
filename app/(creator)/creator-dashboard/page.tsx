"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DashboardTabs } from '@/components/creator/DashboardTabs';
import { DashboardOverview } from '@/components/creator/DashboardOverview';
import { DashboardRevenue } from '@/components/creator/DashboardRevenue';
import { DashboardCourses } from '@/components/creator/DashboardCourses';
import { DashboardEngagement } from '@/components/creator/DashboardEngagement';

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-4">
      {/* Header with action button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Creator Portal</h1>
        <Button asChild>
          <Link href="/creator-courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Link>
        </Button>
      </div>
      
      <Tabs value={activeTab} className="space-y-4">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TabsContent value="overview" className="mt-0">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="courses" className="mt-0">
          <DashboardCourses />
        </TabsContent>
      
        <TabsContent value="revenue" className="mt-0">
          <DashboardRevenue />
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-0">
          <DashboardEngagement />
        </TabsContent>
      </Tabs>
    </div>
  );
} 