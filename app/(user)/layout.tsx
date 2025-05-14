"use client";

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      <div className="p-1">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        {children}
      </div>
    </MainLayout>
  );
}