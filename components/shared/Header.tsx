"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex-1">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="search" 
            placeholder="Search..." 
            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-accent">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
