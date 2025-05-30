import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon?: React.ReactNode;
  bgColor?: string;
}

export function MetricsCard({ title, value, change, icon, bgColor = 'bg-white' }: MetricsCardProps) {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
              {change.positive ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-gray-100">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
} 