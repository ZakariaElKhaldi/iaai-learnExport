"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Settings, 
  User, 
  LayoutDashboard,
  Users,
  Building,
  BookOpen,
  CreditCard,
  MessageSquare,
  Bell as BellIcon,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Shield,
  FileText,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const navItems = [
    { href: "/admin-dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/admin-analytics", label: "Analytics", icon: <BarChart className="h-5 w-5" /> },
    { href: "/admin-users", label: "Users", icon: <Users className="h-5 w-5" /> },
    { href: "/admin-companies", label: "Companies", icon: <Building className="h-5 w-5" /> },
    { href: "/admin-courses", label: "Courses", icon: <BookOpen className="h-5 w-5" /> },
    { href: "/admin-subscriptions", label: "Subscriptions", icon: <CreditCard className="h-5 w-5" /> },
    { href: "/admin-consultation-services", label: "Consultation", icon: <MessageSquare className="h-5 w-5" /> },
    { href: "/admin-notifications", label: "Notifications", icon: <BellIcon className="h-5 w-5" /> },
    { href: "/admin-moderation", label: "Moderation", icon: <ShieldAlert className="h-5 w-5" /> },
    { href: "/admin-roles", label: "Roles", icon: <Shield className="h-5 w-5" /> },
    { href: "/admin-audit-logs", label: "Audit Logs", icon: <FileText className="h-5 w-5" /> },
    { href: "/admin-settings", label: "Settings", icon: <Settings className="h-5 w-5" /> }
  ];
  
  const isActive = (href: string) => pathname === href;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r transition-all duration-300 flex flex-col relative",
          sidebarOpen ? "w-64" : "w-16"
        )}
        aria-label="Main navigation"
        role="navigation"
      >
        {/* Sidebar header */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          {sidebarOpen ? (
            <div className="flex items-center">
              <div className="bg-blue-600 text-white h-10 w-10 rounded flex items-center justify-center font-bold">
                A
              </div>
              <span className="font-bold text-lg ml-3">Admin</span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <button 
                onClick={toggleSidebar} 
                className={cn(
                  "h-8 w-8 border rounded-md flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "bg-gray-100 hover:bg-gray-200 border-gray-200"
                )}
                aria-label="Expand sidebar"
                aria-expanded={false}
                aria-controls="sidebar-nav"
                title="Expand sidebar"
              >
                <PanelLeftOpen size={16} />
              </button>
            </div>
          )}
          
          {sidebarOpen && (
            <button 
              onClick={toggleSidebar} 
              className={cn(
                "h-8 w-8 border rounded-md flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
              )}
              aria-label="Collapse sidebar"
              aria-expanded={true}
              aria-controls="sidebar-nav"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          )}
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 py-6 overflow-y-auto" id="sidebar-nav">
          <div className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                  isActive(item.href) 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                title={!sidebarOpen ? item.label : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                role="menuitem"
              >
                <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Sidebar footer */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-gray-600" aria-hidden="true" />
            </div>
            {sidebarOpen && (
              <div className="truncate">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}