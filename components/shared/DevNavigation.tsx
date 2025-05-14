"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Pin, Search, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

type RouteType = {
  path: string;
  name: string;
  isNew?: boolean;
};

type RouteGroupType = {
  name: string;
  routes: RouteType[];
};

const devRoutes: RouteGroupType[] = [
  {
    name: "Main",
    routes: [
      { path: '/', name: 'Landing Page' },
    ]
  },
  {
    name: "Authentication",
    routes: [
      { path: '/login', name: 'Login' },
      { path: '/register', name: 'Register' },
      { path: '/forgot-password', name: 'Forgot Password' },
      { path: '/reset-password', name: 'Reset Password' },
    ]
  },
  {
    name: "User",
    routes: [
      { path: '/user-dashboard', name: 'Dashboard' },
      { path: '/user-courses', name: 'My Courses' },
      // Remove dynamic routes that don't exist yet
      // { path: '/user-courses/123', name: 'Course Detail' },
      // { path: '/user-courses/123/learn/456', name: 'Lesson Viewer' },
      // { path: '/user-courses/123/quiz/789', name: 'Quiz Page' },
      // { path: '/user-courses/123/quiz-results/789', name: 'Quiz Results' },
      { path: '/user-consultations', name: 'Consultations' },
      { path: '/user-consultations/request', name: 'Request Consultation' },
      { path: '/user-certificates', name: 'Certificates' },
      { path: '/user-subscriptions', name: 'Subscriptions' },
      { path: '/user-billing-history', name: 'Billing' },
      { path: '/user-profile', name: 'Profile' },
      { path: '/user-settings', name: 'Settings' },
    ]
  },
  {
    name: "Enterprise",
    routes: [
      { path: '/enterprise-dashboard', name: 'Dashboard' },
      { path: '/enterprise-employees', name: 'Employees' },
      { path: '/assign-courses', name: 'Assign Courses' },
      { path: '/enterprise-reports', name: 'Reports' },
      { path: '/enterprise-subscription', name: 'Subscription' },
      { path: '/enterprise-settings', name: 'Settings' },
    ]
  },
  {
    name: "Creator",
    routes: [
      { path: '/creator-dashboard', name: 'Dashboard' },
      { path: '/creator-courses/create', name: 'Create Course' },
      { path: '/creator-courses/123/edit', name: 'Edit Course' },
      { path: '/creato-rmedia-library', name: 'Media Library' }, // Note: There's a typo in the folder name
      { path: '/creator-analytics', name: 'Analytics', isNew: true },
    ]
  },
  {
    name: "Consultant",
    routes: [
      { path: '/consultant-dashboard', name: 'Dashboard' },
      { path: '/consultant-availability', name: 'Availability' },
      { path: '/consultant-requests', name: 'Requests' },
      { path: '/consultant-sessions', name: 'Sessions', isNew: true },
      { path: '/consultant-sessions/123', name: 'Session Details' },
      { path: '/consultant-settings', name: 'Settings', isNew: true },
      { path: '/consultant-profile', name: 'Profile', isNew: true },
    ]
  },
  {
    name: "Admin",
    routes: [
      { path: '/admin-dashboard', name: 'Dashboard' },
      { path: '/admin-users', name: 'Users' },
      { path: '/admin-companies', name: 'Companies' },
      { path: '/admin-courses', name: 'Courses' },
      { path: '/admin-subscriptions', name: 'Subscriptions' },
      { path: '/admin-consultation-services', name: 'Consultation Services', isNew: true },
      { path: '/admin-notifications', name: 'Notifications', isNew: true },
      { path: '/admin-moderation', name: 'Moderation', isNew: true },
      { path: '/admin-settings', name: 'Settings' },
    ]
  }
];

const DevNavigation = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [position, setPosition] = useState<'bottom-right' | 'top-right' | 'top-left' | 'bottom-left'>('bottom-right');

  // Determine the current section based on pathname - memoized for performance
  const getCurrentSection = useMemo(() => {
    if (!pathname) return 'Main';
    
    if (pathname.startsWith('/admin-')) return 'Admin';
    if (pathname.startsWith('/user-')) return 'User';
    if (pathname.startsWith('/enterprise-') || pathname === '/assign-courses') return 'Enterprise';
    if (pathname.startsWith('/creator-') || pathname === '/creato-rmedia-library') return 'Creator';
    if (pathname.startsWith('/consultant-')) return 'Consultant';
    if (pathname.startsWith('/login') || pathname.startsWith('/register') || 
        pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password')) return 'Authentication';
    return 'Main';
  }, [pathname]);

  useEffect(() => {
    // Initialize with only the current section expanded
    const currentSection = getCurrentSection;
    const initialExpandedState = devRoutes.reduce((acc, group) => {
      acc[group.name] = group.name === currentSection;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setExpandedGroups(initialExpandedState);
    
    // Try to load saved position from localStorage
    const savedPosition = localStorage.getItem('devNavPosition');
    if (savedPosition) {
      setPosition(savedPosition as any);
    }
    
    // Try to load saved pinned state from localStorage
    const savedPinned = localStorage.getItem('devNavPinned');
    if (savedPinned === 'true') {
      setIsPinned(true);
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Make sure the current section is expanded
    const currentSection = getCurrentSection;
    if (currentSection && !expandedGroups[currentSection]) {
      setExpandedGroups(prev => ({
        ...prev,
        [currentSection]: true
      }));
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+D to toggle DevNavigation
      if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);
  
  // Save pinned state to localStorage
  useEffect(() => {
    localStorage.setItem('devNavPinned', isPinned.toString());
  }, [isPinned]);
  
  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem('devNavPosition', position);
  }, [position]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };
  
  // Toggle all groups
  const toggleAllGroups = (expanded: boolean) => {
    const newState = devRoutes.reduce((acc, group) => {
      acc[group.name] = expanded;
      return acc;
    }, {} as {[key: string]: boolean});
    setExpandedGroups(newState);
  };
  
  // Change position of the DevNavigation
  const cyclePosition = () => {
    const positions: Array<'bottom-right' | 'top-right' | 'top-left' | 'bottom-left'> = [
      'bottom-right', 'top-right', 'top-left', 'bottom-left'
    ];
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    setPosition(positions[nextIndex]);
  };

  // Memoize filtered routes for performance
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return devRoutes;
    
    return devRoutes.map(group => ({
      ...group,
      routes: group.routes.filter(route => 
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.path.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.routes.length > 0);
  }, [searchQuery]);

  if (process.env.NODE_ENV !== 'development' || (!isVisible && !isPinned)) {
    return null;
  }

  // Get position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4'
  }[position];

  return (
    <div className={`fixed ${positionClasses} bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 max-h-[80vh] w-72 overflow-hidden flex flex-col transition-all duration-200`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-base font-bold flex items-center">
            <span className="bg-blue-500 h-3 w-3 rounded-full mr-2"></span>
            DevNav
          </h3>
          <span className="text-xs text-gray-400">
            Section: <span className="text-blue-400">{getCurrentSection}</span>
          </span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={cyclePosition}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
            title="Change position"
          >
            <ExternalLink size={14} />
          </button>
          <button 
            onClick={() => setIsPinned(!isPinned)}
            className={`p-1 rounded ${isPinned ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            title={isPinned ? "Unpin navigator" : "Pin navigator"}
          >
            <Pin size={14} />
          </button>
          <button 
            onClick={() => {
              setIsVisible(false);
              if (isPinned) setIsPinned(false);
            }}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
            title="Close navigator"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Search and Controls */}
      <div className="mb-2 flex gap-1">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes..."
            className="w-full pl-7 pr-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={() => toggleAllGroups(true)}
          className="text-xs px-1.5 py-1 bg-gray-700 hover:bg-gray-600 rounded"
          title="Expand all"
        >
          +All
        </button>
        <button 
          onClick={() => toggleAllGroups(false)}
          className="text-xs px-1.5 py-1 bg-gray-700 hover:bg-gray-600 rounded"
          title="Collapse all"
        >
          -All
        </button>
      </div>
      
      {/* Routes */}
      <div className="overflow-y-auto flex-grow">
        {filteredRoutes.map((group) => (
          <div 
            key={group.name} 
            className={`mb-1 rounded overflow-hidden ${group.name === getCurrentSection ? 'bg-gray-700' : ''}`}
          >
            <button
              onClick={() => toggleGroup(group.name)}
              className="flex items-center justify-between w-full py-1.5 px-2 text-left font-medium text-gray-300 hover:text-white text-xs"
            >
              <span className={group.name === getCurrentSection ? 'text-blue-400 font-semibold' : ''}>
                {group.name} ({group.routes.length})
              </span>
              {expandedGroups[group.name] ? 
                <ChevronDown size={14} className="text-gray-400" /> : 
                <ChevronRight size={14} className="text-gray-400" />
              }
            </button>
            
            {expandedGroups[group.name] && (
              <ul className="space-y-0.5 pl-2 pr-1 pb-1">
                {group.routes.map((route) => {
                  const isActive = pathname === route.path;
                  return (
                    <li key={route.path}>
                      <Link 
                        href={route.path} 
                        className={`py-1 px-2 hover:bg-gray-600 text-xs rounded flex items-center group transition-colors
                          ${isActive ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'}`}
                        onClick={() => {
                          console.log('Navigating to:', route.path);
                          // Close the navigation if not pinned
                          if (!isPinned) {
                            setIsVisible(false);
                          }
                        }}
                      >
                        <span className="truncate">{route.name}</span>
                        {route.isNew && (
                          <span className="ml-1.5 px-1 py-0.5 text-[10px] bg-blue-500 text-white rounded-full">New</span>
                        )}
                        {isActive && (
                          <span className="ml-auto mr-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-2 pt-1.5 border-t border-gray-700 text-[10px] text-gray-400 flex justify-between items-center">
        <p>Press Ctrl+D to toggle</p>
        <span className="text-blue-400">{filteredRoutes.reduce((acc, group) => acc + group.routes.length, 0)} routes</span>
      </div>
    </div>
  );
};

export default DevNavigation;