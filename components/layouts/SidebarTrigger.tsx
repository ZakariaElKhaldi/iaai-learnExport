"use client";

import React from 'react';
import { Menu, ChevronLeft } from 'lucide-react';
import { useSidebar } from './SidebarContext';

interface SidebarTriggerProps {
  className?: string;
}

export function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { isOpen, toggleSidebar, isMobile } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground ${className || ''}`}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
    </button>
  );
}
