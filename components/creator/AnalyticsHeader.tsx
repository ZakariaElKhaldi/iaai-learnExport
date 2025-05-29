"use client";

import { Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsHeaderProps {
  selectedDateRange: string;
  onDateRangeChange: (value: string) => void;
  onDownloadReport: () => void;
}

export function AnalyticsHeader({
  selectedDateRange,
  onDateRangeChange,
  onDownloadReport
}: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Yesterday">Yesterday</SelectItem>
            <SelectItem value="This week">This week</SelectItem>
            <SelectItem value="This month">This month</SelectItem>
            <SelectItem value="Last 3 months">Last 3 months</SelectItem>
            <SelectItem value="This year">This year</SelectItem>
            <SelectItem value="All time">All time</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" onClick={onDownloadReport} className="w-full md:w-auto">
        <Download className="mr-2 h-4 w-4" />
        Download Report
      </Button>
    </div>
  );
} 