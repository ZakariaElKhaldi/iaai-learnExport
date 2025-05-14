"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Book, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  HelpCircle
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: Book,
    },
    {
      title: "Consultations",
      href: "/consultations",
      icon: MessageSquare,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  // Function to check if a link is active
  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 rounded-md p-2 bg-primary text-primary-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <Link href="/" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>
                LearnExpert Connect
              </Link>
            </div>
            <nav className="flex-1 overflow-auto">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 rounded-md ${
                        isLinkActive(item.href) 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto border-t pt-4">
              <div className="flex items-center gap-3 p-3">
                <div className="h-10 w-10 rounded-full bg-primary"></div>
                <div>
                  <p className="font-medium">User Name</p>
                  <p className="text-sm text-muted-foreground">user@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
