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
        <div className="p-3 sm:p-4 md:p-6 pb-safe">
          {children}
        </div>
      </ToastProvider>
    </MainLayout>
  );
}