"use client";

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AnalyticsTabs({ activeTab, onTabChange }: AnalyticsTabsProps) {
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
        <TabsTrigger 
          value="content" 
          onClick={() => onTabChange('content')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'content' ? 'active' : 'inactive'}
        >
          Content
        </TabsTrigger>
        <TabsTrigger 
          value="students" 
          onClick={() => onTabChange('students')}
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          data-state={activeTab === 'students' ? 'active' : 'inactive'}
        >
          Students
        </TabsTrigger>
      </div>
    </TabsList>
  );
} 