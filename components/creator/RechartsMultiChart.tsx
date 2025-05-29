"use client";

import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  ComposedChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Brush
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface Series {
  dataKey: string;
  name: string;
  color: string;
  type: 'line' | 'bar' | 'area';
}

interface RechartsMultiChartProps {
  title: string;
  data: Array<Record<string, any>>;
  series: Series[];
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  brush?: boolean;
  stacked?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

export function RechartsMultiChart({
  title,
  data,
  series,
  xAxisKey = 'name',
  height = 350,
  showGrid = true,
  tooltip = true,
  legend = true,
  brush = false,
  stacked = false,
  trend
}: RechartsMultiChartProps) {
  const [activeTab, setActiveTab] = useState<'line' | 'bar' | 'composed'>('composed');

  // Determine if we need a composed chart (mixed types) or can use a simpler chart
  const chartTypes = new Set(series.map(s => s.type));
  const needsComposedChart = chartTypes.size > 1;
  
  // If all series are the same type and not in composed mode, use the appropriate chart
  const getChartComponent = () => {
    if (activeTab === 'composed' || needsComposedChart) {
      return ComposedChart;
    }
    if (activeTab === 'line') {
      return LineChart;
    }
    return BarChart;
  };
  
  const ChartComponent = getChartComponent();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {trend && (
            <div className="flex items-center">
              <div className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                <span className="flex items-center">
                  {trend.isPositive ? '↑' : '↓'} {trend.value}%
                </span>
                {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
              </div>
            </div>
          )}
        </div>
        
        {/* Chart type selector */}
        {chartTypes.size > 1 && (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="composed">Combined</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: brush ? 30 : 5,
              }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fontSize: 12, fill: '#888888' }}
                tickLine={{ stroke: '#f0f0f0' }}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#888888' }}
                tickLine={{ stroke: '#f0f0f0' }}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              {tooltip && <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }} 
              />}
              {legend && <Legend wrapperStyle={{ paddingTop: '10px' }} />}
              
              {/* Render each series based on its type */}
              {series.map((s) => {
                // Only render the appropriate chart type when in single-type mode
                if (activeTab !== 'composed' && s.type !== activeTab) {
                  return null;
                }
                
                if (s.type === 'line') {
                  return (
                    <Line
                      key={s.dataKey}
                      type="monotone"
                      dataKey={s.dataKey}
                      name={s.name}
                      stroke={s.color}
                      strokeWidth={2}
                      dot={{ r: 3, fill: s.color, strokeWidth: 1, stroke: 'white' }}
                      activeDot={{ r: 5, fill: s.color, strokeWidth: 1, stroke: 'white' }}
                      animationDuration={1500}
                    />
                  );
                }
                
                if (s.type === 'area') {
                  return (
                    <Area
                      key={s.dataKey}
                      type="monotone"
                      dataKey={s.dataKey}
                      name={s.name}
                      stroke={s.color}
                      fill={s.color}
                      fillOpacity={0.2}
                      animationDuration={1500}
                    />
                  );
                }
                
                return (
                  <Bar
                    key={s.dataKey}
                    dataKey={s.dataKey}
                    name={s.name}
                    fill={s.color}
                    stackId={stacked ? "stack" : undefined}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                );
              })}
              
              {brush && (
                <Brush 
                  dataKey={xAxisKey} 
                  height={30} 
                  stroke="#8884d8"
                  startIndex={Math.max(0, data.length - 6)}
                />
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 