import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface StatusItemProps {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical' | 'neutral';
}

function StatusItem({ label, value, status }: StatusItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-amber-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${getStatusColor()}`}>{value}</span>
        {getStatusIcon()}
      </div>
    </div>
  );
}

interface SystemStatusCardProps {
  items: StatusItemProps[];
}

export function SystemStatusCard({ items }: SystemStatusCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      <div className="space-y-1 divide-y">
        {items.map((item, index) => (
          <StatusItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
} 