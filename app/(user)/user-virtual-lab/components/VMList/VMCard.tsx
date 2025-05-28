"use client";

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HardDrive, Clock, ArrowRight } from "lucide-react";
import { formatDate, getStatusColor, getResourceStatusColor } from "../../utils";
import { cn } from "@/lib/utils";

interface VMCardProps {
  vm: {
    id: string;
    name: string;
    template: string;
    status: string;
    uptime: string;
    ip: string;
    usage: {
      cpu: number;
      ram: number;
      storage: number;
    };
    createdAt: string;
  };
  onClick: () => void;
}

export function VMCard({ vm, onClick }: VMCardProps) {
  const isRunning = vm.status === 'running';
  
  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-all cursor-pointer border group overflow-hidden relative focus:outline-blue-600 focus:outline-2",
        isRunning ? 'border-l-4 border-l-green-500 border-y-gray-200 border-r-gray-200' : ''
      )}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      aria-label={`VM ${vm.name}, status: ${vm.status}`}
    >
      {/* Status indicator - more visible */}
      <div className="absolute top-0 right-0 w-3 h-full">
        <div 
          className={`h-full ${isRunning ? 'bg-green-100' : vm.status === 'paused' ? 'bg-amber-100' : 'bg-slate-100'}`}
        />
      </div>
      
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(vm.status)}>
            {vm.status.charAt(0).toUpperCase() + vm.status.slice(1)}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{isRunning ? `Uptime: ${vm.uptime}` : 'Stopped'}</span>
          </div>
        </div>
        <CardTitle className="mt-2 text-base group-hover:text-blue-600 transition-colors">
          {vm.name}
        </CardTitle>
        <CardDescription className="line-clamp-1">
          {vm.template}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          {isRunning && (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">CPU</span>
                  <span className={getResourceStatusColor(vm.usage.cpu)}>{vm.usage.cpu}%</span>
                </div>
                <Progress 
                  value={vm.usage.cpu} 
                  className="h-1" 
                  aria-label={`CPU usage: ${vm.usage.cpu}%`}
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Memory</span>
                  <span className={getResourceStatusColor(vm.usage.ram)}>{vm.usage.ram}%</span>
                </div>
                <Progress 
                  value={vm.usage.ram} 
                  className="h-1" 
                  aria-label={`Memory usage: ${vm.usage.ram}%`}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z"></path>
                <path d="M12 7v10"></path>
                <path d="M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5"></path>
              </svg>
              <span>{vm.ip}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{formatDate(vm.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-2 flex justify-between items-center bg-slate-50/50">
        <div className="text-xs flex items-center gap-1.5">
          <HardDrive className="h-3.5 w-3.5 text-slate-600" />
          <span className={`${getResourceStatusColor(vm.usage.storage)}`}>
            {vm.usage.storage}% Storage
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 text-blue-600 h-7 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          tabIndex={-1}
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="text-xs">Manage</span>
        </Button>
      </CardFooter>
      
      {/* Screen reader text */}
      <span className="sr-only">
        VM {vm.name} is {vm.status}, with IP address {vm.ip}. 
        {isRunning ? `CPU usage: ${vm.usage.cpu}%, Memory usage: ${vm.usage.ram}%` : ''}
        Storage usage: {vm.usage.storage}%.
      </span>
    </Card>
  );
} 