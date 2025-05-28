"use client";

import { useState, useEffect } from "react";
import { VMCard } from "./VMCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, CircleX } from "lucide-react";
import { motion } from "framer-motion";

interface VM {
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
  os: string;
}

interface VMListProps {
  vms: VM[];
  searchQuery: string;
  filter: string;
  loading: boolean;
  onRefresh: () => void;
  onSelect: (vm: VM) => void;
}

export function VMList({ vms, searchQuery, filter, loading, onRefresh, onSelect }: VMListProps) {
  const [filteredVMs, setFilteredVMs] = useState<VM[]>(vms);

  useEffect(() => {
    // Apply search and filters
    let filtered = [...vms];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(vm => 
        vm.name.toLowerCase().includes(query) || 
        vm.template.toLowerCase().includes(query) ||
        vm.ip.includes(query)
      );
    }
    
    // Status/OS filter
    if (filter && filter !== 'all') {
      if (filter === 'running' || filter === 'stopped' || filter === 'paused') {
        filtered = filtered.filter(vm => vm.status === filter);
      } else if (filter === 'linux' || filter === 'windows') {
        filtered = filtered.filter(vm => vm.os.toLowerCase() === filter);
      }
    }
    
    setFilteredVMs(filtered);
  }, [vms, searchQuery, filter]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
          <p className="text-muted-foreground">Loading virtual machines...</p>
        </div>
      </div>
    );
  }
  
  // No results state
  if (filteredVMs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 px-4 py-8 text-center">
        <CircleX className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium text-lg">No virtual machines found</h3>
        <p className="text-muted-foreground mb-4">
          {searchQuery || filter !== 'all' 
            ? "Try adjusting your search or filters"
            : "You don't have any virtual machines yet"}
        </p>
        {searchQuery || filter !== 'all' ? (
          <Button variant="outline" onClick={() => onRefresh()}>
            Clear filters
          </Button>
        ) : (
          <Button>Create your first VM</Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing {filteredVMs.length} virtual machine{filteredVMs.length !== 1 ? 's' : ''}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 h-8"
          onClick={onRefresh}
          aria-label="Refresh VM list"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="text-xs">Refresh</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVMs.map((vm, index) => (
          <motion.div
            key={vm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <VMCard vm={vm} onClick={() => onSelect(vm)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 