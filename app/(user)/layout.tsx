"use client";

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { ToastProvider } from '@/components/ui/use-toast';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      <ToastProvider>
        <div className="p-1">
          {children}
        </div>
      </ToastProvider>
    </MainLayout>
  );
}