import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PendingActionProps {
  label: string;
  count: number;
  href: string;
  badgeColor?: string;
  badgeTextColor?: string;
}

function PendingAction({ 
  label, 
  count, 
  href, 
  badgeColor = 'bg-orange-100', 
  badgeTextColor = 'text-orange-800' 
}: PendingActionProps) {
  return (
    <Link href={href} className="block hover:bg-gray-50 transition-colors">
      <div className="py-3 px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-medium">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`${badgeColor} ${badgeTextColor} px-2 py-0.5 rounded-full text-xs font-semibold`}>
              {count} Pending
            </span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
}

interface PendingActionsCardProps {
  actions: PendingActionProps[];
}

export function PendingActionsCard({ actions }: PendingActionsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Pending Actions</h2>
      <div className="divide-y">
        {actions.map((action, index) => (
          <PendingAction key={index} {...action} />
        ))}
      </div>
    </div>
  );
} 