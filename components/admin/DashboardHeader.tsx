import Link from 'next/link';
import { Settings, Bell, Search } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  hasSearch?: boolean;
  hasNotifications?: boolean;
  hasSettings?: boolean;
}

export function DashboardHeader({ 
  title, 
  subtitle,
  hasSearch = false,
  hasNotifications = true,
  hasSettings = true
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        {hasSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        )}
        
        {hasNotifications && (
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        
        {hasSettings && (
          <Link 
            href="/admin-settings" 
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </Link>
        )}
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
            A
          </div>
        </div>
      </div>
    </div>
  );
} 