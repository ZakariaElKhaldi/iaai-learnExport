"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RechartsLineChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  gradient?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

export function RechartsLineChart({
  title,
  data,
  dataKey,
  xAxisKey = 'name',
  height = 300,
  color = "#3b82f6",
  showGrid = true,
  tooltip = true,
  legend = false,
  gradient = true,
  trend
}: RechartsLineChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {trend && (
          <div className="flex items-center justify-end">
            <div className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
              <span className="flex items-center">
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </span>
              {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
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
              {legend && <Legend />}
              {gradient && (
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              )}
              {gradient && (
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  fillOpacity={1} 
                  fill="url(#colorGradient)" 
                />
              )}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3, fill: color, strokeWidth: 1, stroke: 'white' }}
                activeDot={{ r: 5, fill: color, strokeWidth: 1, stroke: 'white' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 