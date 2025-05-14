"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Footer from '@/components/shared/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Check if the current path is a landing page or auth page
  // Add more paths as needed
  const isExcludedPath = 
    pathname === '/' || 
    pathname?.startsWith('/auth') ||
    pathname?.includes('/login') ||
    pathname?.includes('/register') ||
    pathname?.includes('/forgot-password');

  // If it's a landing page or auth page, just render the children without the main layout
  if (isExcludedPath) {
    return <>{children}</>;
  }

  // Get the current page title from the pathname
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard';
    
    const path = pathname.split('/');
    const lastSegment = path[path.length - 1];
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get the parent section from the pathname
  const getParentSection = () => {
    if (!pathname) return '';
    
    if (pathname.includes('user')) return 'User';
    if (pathname.includes('admin')) return 'Admin';
    if (pathname.includes('creator')) return 'Creator';
    if (pathname.includes('consultant')) return 'Consultant';
    if (pathname.includes('enterprise')) return 'Enterprise';
    
    return '';
  };

  // For all other pages, apply the sidebar layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {getParentSection() && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {getParentSection()}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
