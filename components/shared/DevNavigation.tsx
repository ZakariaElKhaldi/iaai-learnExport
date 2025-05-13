"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      { path: '/user-dashboard', name: 'User Dashboard' },
      { path: '/courses', name: 'My Courses' },
      { path: '/courses/123', name: 'Course Detail Example' },
      { path: '/courses/123/learn/456', name: 'Lesson Viewer Example' },
      { path: '/courses/123/quiz/789', name: 'Quiz Page Example' },
      { path: '/courses/123/quiz-results/789', name: 'Quiz Results Example' },
      { path: '/consultations', name: 'My Consultations' },
      { path: '/consultations/request', name: 'Request Consultation' },
      { path: '/certificates', name: 'My Certificates' },
      { path: '/subscriptions', name: 'My Subscriptions' },
      { path: '/billing-history', name: 'Billing History' },
      { path: '/user-profile', name: 'User Profile' },
      { path: '/user-settings', name: 'User Settings' },
    ]
  },
  {
    name: "Enterprise",
    routes: [
      { path: '/enterprise-dashboard', name: 'Enterprise Dashboard' },
      { path: '/employees', name: 'Manage Employees' },
      { path: '/assign-courses', name: 'Assign Courses' },
      { path: '/reports', name: 'Company Reports' },
      { path: '/subscription', name: 'Company Subscription' },
      { path: '/settings', name: 'Company Settings' },
    ]
  },
  {
    name: "Creator",
    routes: [
      { path: '/creator-dashboard', name: 'Creator Dashboard' },
      { path: '/courses/create', name: 'Create Course' },
      { path: '/courses/123/edit', name: 'Edit Course Example' },
      { path: '/media-library', name: 'Media Library' },
      { path: '/analytics', name: 'Analytics', isNew: true },
    ]
  },
  {
    name: "Consultant",
    routes: [
      { path: '/consultant-dashboard', name: 'Consultant Dashboard' },
      { path: '/availability', name: 'Manage Availability' },
      { path: '/requests', name: 'Consultation Requests' },
      { path: '/sessions', name: 'Sessions', isNew: true },
      { path: '/sessions/123', name: 'Session Details Example' },
      { path: '/consultant-settings', name: 'Consultant Settings', isNew: true },
      { path: '/profile', name: 'Consultant Profile', isNew: true },
    ]
  },
  {
    name: "Admin",
    routes: [
      { path: '/admin-dashboard', name: 'Admin Dashboard' },
      { path: '/users', name: 'User Management' },
      { path: '/companies', name: 'Company Management' },
      { path: '/admin-courses', name: 'Course Management' },
      { path: '/admin-subscriptions', name: 'Subscription Management' },
      { path: '/consultation-services', name: 'Consultation Services', isNew: true },
      { path: '/notifications', name: 'Notification Management', isNew: true },
      { path: '/moderation', name: 'Content Moderation', isNew: true },
      { path: '/settings', name: 'Platform Settings' },
    ]
  }
];

const DevNavigation = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Determine the current section based on pathname
  const getCurrentSection = () => {
    if (pathname?.startsWith('/admin-') || pathname?.startsWith('/users') || 
        pathname?.startsWith('/companies') || pathname?.startsWith('/moderation') || 
        pathname?.startsWith('/notifications') || pathname?.startsWith('/consultation-services'))
      return 'Admin';
    if (pathname?.startsWith('/user-') || pathname?.startsWith('/courses') || 
        pathname?.startsWith('/consultations') || pathname?.startsWith('/certificates') || 
        pathname?.startsWith('/subscriptions') || pathname?.startsWith('/billing-history'))
      return 'User';
    if (pathname?.startsWith('/enterprise-') || pathname?.startsWith('/employees') || 
        pathname?.startsWith('/assign-courses') || pathname?.startsWith('/reports') ||
        pathname?.startsWith('/subscription') || (pathname === '/settings'))
      return 'Enterprise';
    if (pathname?.startsWith('/creator-') || pathname?.startsWith('/analytics') || 
        pathname?.startsWith('/media-library'))
      return 'Creator';
    if (pathname?.startsWith('/consultant-') || pathname?.startsWith('/availability') || 
        pathname?.startsWith('/requests') || pathname?.startsWith('/sessions') ||
        pathname?.startsWith('/profile'))
      return 'Consultant';
    if (pathname?.startsWith('/login') || pathname?.startsWith('/register') || 
        pathname?.startsWith('/forgot-password') || pathname?.startsWith('/reset-password'))
      return 'Authentication';
    return 'Main';
  };

  useEffect(() => {
    // Initialize all groups as expanded
    const initialExpandedState = devRoutes.reduce((acc, group) => {
      acc[group.name] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    
    setExpandedGroups(initialExpandedState);
  }, []);

  useEffect(() => {
    // Make sure the current section is expanded
    const currentSection = getCurrentSection();
    if (currentSection && !expandedGroups[currentSection]) {
      setExpandedGroups(prev => ({
        ...prev,
        [currentSection]: true
      }));
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'x') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const filteredRoutes = devRoutes.map(group => ({
    ...group,
    routes: group.routes.filter(route => 
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.path.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.routes.length > 0);

  if (process.env.NODE_ENV !== 'development' || (!isVisible && !isPinned)) {
    return null;
  }

  // Get current section for UI
  const currentSection = getCurrentSection();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 max-h-[75vh] w-72 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-bold">DevNavigator</h3>
          {currentSection && (
            <span className="text-xs text-gray-400">
              Current section: <span className="text-blue-400">{currentSection}</span>
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPinned(!isPinned)}
            className={`text-xs px-2 py-1 rounded ${isPinned ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            title={isPinned ? "Unpin navigator" : "Pin navigator"}
          >
            {isPinned ? "📌 Pinned" : "📌 Pin"}
          </button>
          <button 
            onClick={() => {
              setIsVisible(false);
              if (isPinned) setIsPinned(false);
            }}
            className="text-gray-400 hover:text-white"
            title="Close navigator"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search routes..."
          className="w-full px-3 py-1.5 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {filteredRoutes.map((group) => (
          <div 
            key={group.name} 
            className={`mb-1.5 ${group.name === currentSection ? 'bg-gray-700 rounded' : ''}`}
          >
            <button
              onClick={() => toggleGroup(group.name)}
              className="flex items-center justify-between w-full py-1.5 px-1 text-left font-medium text-gray-300 hover:text-white text-sm"
            >
              <span className={group.name === currentSection ? 'text-blue-400' : ''}>
                {group.name}
              </span>
              <span>{expandedGroups[group.name] ? '−' : '+'}</span>
            </button>
            
            {expandedGroups[group.name] && (
              <ul className="space-y-0.5 ml-2">
                {group.routes.map((route) => {
                  const isActive = pathname === route.path;
                  return (
                    <li key={route.path} className="flex items-center">
                      <Link 
                        href={route.path} 
                        className={`py-1 px-2 hover:bg-gray-700 text-xs rounded flex-grow flex items-center group
                          ${isActive ? 'bg-gray-600 text-white' : ''}`}
                      >
                        <span>{route.name}</span>
                        {route.isNew && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">New</span>
                        )}
                        {isActive && (
                          <span className="ml-auto mr-1">•</span>
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
      
      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        <p>Press Ctrl+X to toggle navigator</p>
      </div>
    </div>
  );
};

export default DevNavigation;
