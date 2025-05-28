"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Server, 
  Sparkles, 
  HardDrive, 
  ChevronLeft,
  Power,
  RefreshCw,
  TerminalSquare,
  PanelLeft,
  PanelRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "../utils";

interface HeaderProps {
  activeVM: any | null;
  onBackClick: () => void;
  onPracticeClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  isLoading: boolean;
  handleVMAction: (action: string, vmId: string) => void;
}

export function Header({
  activeVM,
  onBackClick,
  onPracticeClick,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  showSidebar,
  setShowSidebar,
  isLoading,
  handleVMAction
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 z-20 flex-shrink-0 sticky top-0">
      <div className="flex items-center gap-2">
        {activeVM ? (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackClick} 
              className="gap-1 mr-1"
              aria-label="Back to VM list"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <span className="text-lg font-medium truncate max-w-md">{activeVM.name}</span>
            <Badge className={getStatusColor(activeVM.status)}>
              {activeVM.status.charAt(0).toUpperCase() + activeVM.status.slice(1)}
            </Badge>
            
            <div className="ml-4 flex items-center text-xs">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100">
                <Server className="h-3.5 w-3.5 text-slate-700" />
                <span className="text-slate-700">{activeVM.ip}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-600" />
            <h1 className="text-xl font-semibold">Virtual Lab</h1>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {activeVM ? (
          <div className="flex items-center gap-2">
            {activeVM.status === "running" ? (
              <Button 
                size="sm" 
                variant="destructive"
                className="gap-1"
                onClick={() => handleVMAction("stop", activeVM.id)}
                disabled={isLoading}
                aria-label="Stop VM"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Power className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Stop</span>
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="default"
                className="gap-1"
                onClick={() => handleVMAction("start", activeVM.id)}
                disabled={isLoading}
                aria-label="Start VM"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Power className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Start</span>
              </Button>
            )}
            
            <Button 
              size="sm"
              variant="outline" 
              className="gap-1"
              disabled={activeVM.status !== "running" || isLoading}
              onClick={() => handleVMAction("restart", activeVM.id)}
              aria-label="Restart VM"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Restart</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 hidden md:flex"
              disabled={activeVM.status !== "running"}
              aria-label="Open console"
            >
              <TerminalSquare className="h-4 w-4" />
              <span>Console</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="ml-2"
              aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
            >
              {showSidebar ? 
                <PanelRight className="h-4 w-4" /> : 
                <PanelLeft className="h-4 w-4" />
              }
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 mr-2"
              onClick={onPracticeClick}
              aria-label="Open practice lab mode"
            >
              <Sparkles className="h-4 w-4" />
              <span>Practice Lab</span>
            </Button>
            
            <div className="relative sm:w-64">
              <Input 
                type="search" 
                placeholder="Search VMs..." 
                className="pl-8 pr-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search virtual machines"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 text-muted-foreground">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1 h-7 w-7 p-0" 
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              )}
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[130px] h-9" aria-label="Filter VMs">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All VMs</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" size="sm" className="gap-1" aria-label="Create new VM">
              <HardDrive className="h-4 w-4 mr-1" />
              <span>New VM</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
} 