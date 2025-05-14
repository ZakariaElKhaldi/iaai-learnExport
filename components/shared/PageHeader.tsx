"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export interface ActionButton extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: {
    title: string;
    href?: string;
  }[];
  actions?: ActionButton[];
  children?: React.ReactNode;
  className?: string;
  separated?: boolean;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  className,
  separated = true,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-1 md:gap-2">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.title}>
                {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                {breadcrumb.href ? (
                  <a
                    href={breadcrumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {breadcrumb.title}
                  </a>
                ) : (
                  <span>{breadcrumb.title}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground md:text-base">
                {description}
              </p>
            )}
          </div>
          {actions && actions.length > 0 && (
            <div className="flex flex-col gap-2 sm:flex-row">
              {actions.map((action, index) => {
                const { label, icon, ...props } = action;
                return (
                  <Button key={index} {...props}>
                    {icon}
                    {label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        {children}
      </div>
      {separated && <Separator />}
    </div>
  );
} 