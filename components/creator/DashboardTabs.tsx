"use client";

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <TabsList className="w-full border-b bg-transparent p-0">
      <div className="flex overflow-x-auto">
        <TabsTrigger 
          value="overview" 
          onClick={() => onTabChange('overview')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'overview' ? 'active' : 'inactive'}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="courses" 
          onClick={() => onTabChange('courses')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'courses' ? 'active' : 'inactive'}
        >
          Courses
        </TabsTrigger>
        <TabsTrigger 
          value="revenue" 
          onClick={() => onTabChange('revenue')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'revenue' ? 'active' : 'inactive'}
        >
          Revenue
        </TabsTrigger>
        <TabsTrigger 
          value="engagement" 
          onClick={() => onTabChange('engagement')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'engagement' ? 'active' : 'inactive'}
        >
          Engagement
        </TabsTrigger>
      </div>
    </TabsList>
  );
} 