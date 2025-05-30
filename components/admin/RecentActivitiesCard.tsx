import { Activity } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  timestamp: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

function ActivityItem({ title, timestamp, icon, iconColor = 'text-blue-500' }: ActivityItemProps) {
  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconColor}`}>
          {icon || <Activity className="h-4 w-4" />}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}

interface RecentActivitiesCardProps {
  activities: ActivityItemProps[];
  viewAllLink?: string;
}

export function RecentActivitiesCard({ activities, viewAllLink }: RecentActivitiesCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Platform Activities</h2>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            View All
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
      <div className="divide-y">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
} 