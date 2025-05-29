"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RechartsBarChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  horizontal?: boolean;
  showValues?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

export function RechartsBarChart({
  title,
  data,
  dataKey,
  xAxisKey = 'name',
  height = 300,
  color = "#3b82f6",
  showGrid = true,
  tooltip = true,
  legend = false,
  horizontal = false,
  showValues = false,
  trend
}: RechartsBarChartProps) {
  // Generate lighter and darker shades of the base color for a gradient effect
  const generateColorShades = (baseColor: string, index: number, total: number) => {
    // This is a simple implementation - for production, use a proper color library
    const opacity = 0.5 + (index / total) * 0.5;
    return baseColor + Math.floor(opacity * 255).toString(16).padStart(2, '0');
  };

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
            <BarChart
              data={data}
              layout={horizontal ? 'horizontal' : 'vertical'}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
              <XAxis 
                dataKey={horizontal ? xAxisKey : undefined}
                type={horizontal ? 'category' : 'number'}
                tick={{ fontSize: 12, fill: '#888888' }}
                tickLine={{ stroke: '#f0f0f0' }}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                dataKey={!horizontal ? xAxisKey : undefined}
                type={!horizontal ? 'category' : 'number'}
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
                formatter={(value) => [`${value}`, dataKey]}
                labelFormatter={(label) => `${xAxisKey}: ${label}`}
              />}
              {legend && <Legend />}
              <Bar 
                dataKey={dataKey} 
                fill={color}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                label={showValues ? {
                  position: 'top',
                  fill: '#888888',
                  fontSize: 12,
                } : false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={generateColorShades(color, index, data.length)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 