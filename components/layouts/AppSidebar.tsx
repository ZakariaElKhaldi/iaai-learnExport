"use client";

import React from 'react';
import { 
  Home, 
  Book, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  BarChart, 
  Briefcase,
  GraduationCap,
  HelpCircle
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  // Function to check if a link is active
  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  // Define navigation items for different user roles
  // These would be conditionally shown based on user role
  const navigationItems = [
    {
      title: "Main Navigation",
      items: [
        {
          title: "Dashboard",
          href: "/user-dashboard",
          icon: Home,
        },
        {
          title: "Courses",
          href: "/user-courses",
          icon: Book,
        },
        {
          title: "Consultations",
          href: "/user-consultations",
          icon: MessageSquare,
        },
        {
          title: "Calendar",
          href: "/calendar",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Profile",
          href: "/user-profile",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/user-settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Help Center",
          href: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ];

  // Admin specific navigation items
  const adminItems = [
    {
      title: "Administration",
      items: [
        {
          title: "User Management",
          href: "/admin-dashboard",
          icon: Users,
        },
        {
          title: "Analytics",
          href: "/admin-analytics",
          icon: BarChart,
        },
        {
          title: "Companies",
          href: "/admin-companies",
          icon: Briefcase,
        },
        {
          title: "Course Management",
          href: "/admin-courses",
          icon: GraduationCap,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-6 w-6 shrink-0 rounded bg-primary group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5"></div>
          <span className="text-lg font-medium truncate">LearnExpert</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        {navigationItems.map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isLinkActive(item.href)}
                    >
                      <a href={item.href}>
                        <item.icon className="shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        {/* Admin Items */}
        {pathname?.includes('/admin') && adminItems.map((section, index) => (
          <SidebarGroup key={`admin-${index}`}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isLinkActive(item.href)}
                    >
                      <a href={item.href}>
                        <item.icon className="shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 shrink-0 rounded-full bg-primary/80 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"></div>
          <div className="min-w-0 overflow-hidden">
            <p className="text-sm font-medium truncate">User Name</p>
            <p className="text-xs text-muted-foreground truncate">user@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
