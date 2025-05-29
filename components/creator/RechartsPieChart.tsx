"use client";

import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Sector
} from 'recharts';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RechartsPieChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  nameKey?: string;
  height?: number;
  colors?: string[];
  tooltip?: boolean;
  legend?: boolean;
  donut?: boolean;
  activeIndex?: number;
  interactive?: boolean;
}

// Custom active shape for interactive pie segments
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" fontSize={16}>
        {payload.name}
      </text>
      <text x={cx} y={cy} textAnchor="middle" fill="#333" fontSize={24} fontWeight="bold">
        {value}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#999" fontSize={14}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
    </g>
  );
};

// Generate colors for pie segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export function RechartsPieChart({
  title,
  data,
  dataKey,
  nameKey = 'name',
  height = 300,
  colors = COLORS,
  tooltip = true,
  legend = true,
  donut = false,
  activeIndex: initialActiveIndex,
  interactive = true
}: RechartsPieChartProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const onPieEnter = (_: any, index: number) => {
    if (interactive) {
      setActiveIndex(index);
    }
  };

  // Calculate total for center label
  const total = data.reduce((sum, entry) => sum + (entry[dataKey] || 0), 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={donut ? 60 : 0}
                outerRadius={80}
                dataKey={dataKey}
                nameKey={nameKey}
                activeIndex={activeIndex}
                activeShape={interactive ? renderActiveShape : undefined}
                onMouseEnter={onPieEnter}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              {tooltip && <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                formatter={(value) => [`${value}`, dataKey]}
              />}
              {legend && <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '10px'
                }}
              />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        {donut && !interactive && (
          <div className="text-center mt-[-50px]">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 