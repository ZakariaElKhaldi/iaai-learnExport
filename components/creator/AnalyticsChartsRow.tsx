"use client";

import { ChartCard, MockLineChart, MockBarChart } from '@/components/creator/ChartCard';

interface AnalyticsChartsRowProps {
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
  onDownloadChart: () => void;
}

export function AnalyticsChartsRow({
  selectedTimeRange,
  onTimeRangeChange,
  onDownloadChart
}: AnalyticsChartsRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="Revenue Growth"
        chart={<MockLineChart />}
        timeRanges={['7d', '30d', '90d', '1y', 'all']}
        defaultTimeRange={selectedTimeRange}
        onTimeRangeChange={onTimeRangeChange}
        value="$2,450"
        trend={{ value: 15, isPositive: true, label: "vs last month" }}
        onDownload={onDownloadChart}
      />
      
      <ChartCard
        title="Student Enrollment"
        chart={<MockBarChart />}
        timeRanges={['7d', '30d', '90d', '1y', 'all']}
        defaultTimeRange={selectedTimeRange}
        onTimeRangeChange={onTimeRangeChange}
        value="345"
        trend={{ value: 8, isPositive: true, label: "vs last month" }}
        tabs={[
          { value: 'new', label: 'New Students' },
          { value: 'active', label: 'Active Students' }
        ]}
        defaultTab="new"
        onDownload={onDownloadChart}
      />
    </div>
  );
} 