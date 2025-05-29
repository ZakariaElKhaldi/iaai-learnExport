"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  BookOpen, 
  BarChart2, 
  Image, 
  Settings, 
  Bell,
  Search,
  HelpCircle,
  User
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserData, UserRole } from '@/types';

interface CreatorHeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  tabs?: {
    value: string;
    label: string;
    href: string;
  }[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  user?: UserData;
}

export function CreatorHeader({
  title,
  description,
  showBackButton = false,
  backHref = '/creator-dashboard',
  backLabel = 'Back to Dashboard',
  actions,
  tabs,
  activeTab,
  onTabChange,
  showSearch = false,
  onSearch,
  user
}: CreatorHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  return (
    <div className="border-b bg-background">
      <div className="container py-4">
        {/* Top bar with user and actions */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {showBackButton && (
              <Link href={backHref} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {backLabel}
              </Link>
            )}
            
            {title && (
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            )}
            
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {showSearch && (
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-9 w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}
            
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            
            {user?.notifications && user.notifications > 0 && (
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]" 
                  variant="destructive"
                >
                  {user.notifications > 9 ? '9+' : user.notifications}
                </Badge>
              </Button>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 h-9">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation tabs */}
        {tabs && tabs.length > 0 && (
          <Tabs 
            value={activeTab || pathname} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="w-full justify-start bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value}
                  asChild
                >
                  <Link href={tab.href}>
                    {tab.label}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
    </div>
  );
}

// Creator navigation items for use in sidebar
export const creatorNavItems = [
  {
    title: "Dashboard",
    href: "/creator-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/creator-courses",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/creator-analytics",
    icon: BarChart2,
  },
  {
    title: "Media Library",
    href: "/creator-media-library",
    icon: Image,
  },
]; 