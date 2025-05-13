"use client";

import React from 'react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* User specific layout wrapper */}
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
} 