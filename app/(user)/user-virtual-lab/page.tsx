"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Server, 
  Play, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle, 
  Book, 
  RefreshCw, 
  PanelLeft, 
  PanelRight,
  HardDrive, 
  Monitor,
  Network,
  Power,
  Download,
  Share2,
  TerminalSquare,
  Clock
} from "lucide-react";

// VM Templates
const vmTemplates = [
  {
    id: "ubuntu-server",
    name: "Ubuntu Server 22.04 LTS",
    description: "Lightweight server distribution for network services and development",
    specs: { cpu: 2, ram: 2, storage: 20 },
    image: "/images/ubuntu.png",
    category: "Linux",
    popularity: 92,
    tags: ["Server", "Development", "Network"]
  },
  {
    id: "kali-linux",
    name: "Kali Linux 2023.2",
    description: "Security-focused distribution with pentesting and security tools",
    specs: { cpu: 4, ram: 4, storage: 30 },
    image: "/images/kali.png", 
    category: "Security",
    popularity: 88,
    tags: ["Security", "Pentesting", "Forensics"]
  },
  {
    id: "windows-server",
    name: "Windows Server 2022",
    description: "Enterprise server platform for Windows-based infrastructure",
    specs: { cpu: 4, ram: 8, storage: 40 },
    image: "/images/windows-server.png",
    category: "Windows",
    popularity: 76,
    tags: ["Enterprise", "Active Directory", "Windows"]
  },
  {
    id: "debian-minimal",
    name: "Debian 11 Minimal",
    description: "Minimal installation for custom server builds",
    specs: { cpu: 1, ram: 1, storage: 10 },
    image: "/images/debian.png",
    category: "Linux",
    popularity: 70,
    tags: ["Minimal", "Server", "Custom"]
  },
  {
    id: "centos-stream",
    name: "CentOS Stream 9",
    description: "Rolling-release Linux distribution for enterprise environments",
    specs: { cpu: 2, ram: 2, storage: 20 },
    image: "/images/centos.png",
    category: "Linux",
    popularity: 65,
    tags: ["Enterprise", "Server", "Development"]
  },
  {
    id: "alpine-linux",
    name: "Alpine Linux 3.18",
    description: "Security-oriented, lightweight Linux distribution",
    specs: { cpu: 1, ram: 1, storage: 5 },
    image: "/images/alpine.png",
    category: "Linux",
    popularity: 62,
    tags: ["Lightweight", "Security", "Container"]
  }
];

// User's deployed VMs
const userVMs = [
  {
    id: "vm-164931",
    name: "Web Server Lab",
    template: "Ubuntu Server 22.04 LTS",
    status: "running", 
    uptime: "2d 7h 15m",
    ip: "10.14.32.5",
    usage: { cpu: 24, ram: 38, storage: 45 },
    createdAt: "2023-11-15T14:30:00Z"
  },
  {
    id: "vm-175632",
    name: "Security Testing Environment",
    template: "Kali Linux 2023.2",
    status: "stopped",
    uptime: "0",
    ip: "10.14.32.8", 
    usage: { cpu: 0, ram: 0, storage: 82 },
    createdAt: "2023-12-01T09:45:00Z"
  },
  {
    id: "vm-181247",
    name: "Network Practice Lab",
    template: "Alpine Linux 3.18",
    status: "paused",
    uptime: "4h 23m",
    ip: "10.14.32.12",
    usage: { cpu: 5, ram: 12, storage: 28 },
    createdAt: "2024-01-05T16:20:00Z"
  }
];

// Lab exercises 
const labExercises = [
  {
    id: "lab-101",
    title: "Linux System Administration Basics",
    description: "Learn essential commands and configuration for Linux servers",
    difficulty: "Beginner",
    estimatedTime: "3 hours",
    vm: "Ubuntu Server 22.04 LTS",
    completionRate: 82,
    modules: 5
  },
  {
    id: "lab-203",
    title: "Network Security Configuration",
    description: "Configure firewalls, intrusion detection and network monitoring",
    difficulty: "Intermediate",
    estimatedTime: "4 hours",
    vm: "Kali Linux 2023.2", 
    completionRate: 68,
    modules: 7
  },
  {
    id: "lab-312",
    title: "Web Server Hardening",
    description: "Secure web server configurations and vulnerability mitigation",
    difficulty: "Advanced",
    estimatedTime: "6 hours",
    vm: "Debian 11 Minimal",
    completionRate: 54,
    modules: 9
  }
];

// Helper function for VM status colors
const getStatusColor = (status: string) => {
  switch(status) {
    case "running": return "bg-green-100 text-green-800";
    case "stopped": return "bg-slate-100 text-slate-800";
    case "paused": return "bg-amber-100 text-amber-800";
    case "provisioning": return "bg-blue-100 text-blue-800";
    case "error": return "bg-red-100 text-red-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

// Helper function for difficulty colors
const getDifficultyColor = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'beginner': return {
      badge: 'bg-green-100 text-green-800',
      text: 'text-green-600',
      border: 'border-green-500'
    };
    case 'intermediate': return {
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-600',
      border: 'border-blue-500'
    };
    case 'advanced': return {
      badge: 'bg-purple-100 text-purple-800',
      text: 'text-purple-600',
      border: 'border-purple-500'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800',
      text: 'text-slate-600',
      border: 'border-slate-500'
    };
  }
};

export default function VirtualLabPage() {
  const [activeTab, setActiveTab] = useState("my-vms");
  const [activeVM, setActiveVM] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [headerHeight, setHeaderHeight] = useState(56);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filter, setFilter] = useState("all");
  
  // Track window resize for responsiveness
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial header height measurement
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Measure header height on resize
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate content height (viewport minus header)
  const getContentHeight = () => {
    return `calc(100vh - ${headerHeight}px)`;
  };
  
  // Determine if we should show the sidebar based on screen size
  const shouldShowSidebar = () => {
    return showSidebar && (windowWidth > 768 || !activeVM);
  };
  
  // Calculate sidebar width based on viewport
  const getSidebarWidth = () => {
    if (windowWidth <= 640) return "100%";
    if (windowWidth <= 1024) return "350px";
    return "400px";
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header 
        ref={headerRef}
        className="flex items-center justify-between border-b bg-white px-4 py-2 z-20 flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          {activeVM ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setActiveVM(null)} className="gap-1 mr-1">
                <ChevronLeft className="h-4 w-4" />
                Back
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
            <h1 className="text-xl font-semibold">Virtual Lab Environment</h1>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {activeVM ? (
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant={activeVM.status === "running" ? "destructive" : "default"}
                className="gap-1"
              >
                <Power className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {activeVM.status === "running" ? "Stop" : "Start"}
                </span>
              </Button>
              
              <Button 
                size="sm"
                variant="outline" 
                className="gap-1"
                disabled={activeVM.status !== "running"}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Restart</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 hidden md:flex"
                disabled={activeVM.status !== "running"}
              >
                <Monitor className="h-4 w-4" />
                <span>Console</span>
              </Button>
              
              <div className="border-l h-6 mx-1 hidden sm:block"></div>
              
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar ? 
                  <PanelRight className="h-4 w-4" /> : 
                  <PanelLeft className="h-4 w-4" />
                }
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative w-64 hidden sm:block">
                <Input type="search" placeholder="Search VMs and labs..." className="pl-9" />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[130px]">
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
              <Button variant="default" size="sm" className="gap-1">
                <HardDrive className="h-4 w-4" />
                <span>New VM</span>
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex overflow-hidden" style={{ height: getContentHeight() }}>
        {/* Always wrap content in Tabs to maintain context */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs for navigation when no VM is active */}
          {!activeVM && (
            <div className="w-full">
              <div className="border-b bg-white sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto">
                  <TabsList className="w-full justify-start border-b-0 rounded-none h-12 bg-transparent overflow-x-auto">
                    <TabsTrigger value="my-vms" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Server className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">My VMs</span>
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <HardDrive className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Templates</span>
                    </TabsTrigger>
                    <TabsTrigger value="labs" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Book className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Lab Exercises</span>
                    </TabsTrigger>
                    <TabsTrigger value="network" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Network className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Network</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-4">
                <div className="max-w-screen-xl mx-auto">
                  <TabsContent value="my-vms" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">My Virtual Machines</h2>
                      <Button variant="outline" size="sm" className="gap-1">
                        <HardDrive className="h-4 w-4 mr-1" />
                        Import VM
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userVMs.map((vm) => (
                        <Card 
                          key={vm.id} 
                          className={`hover:shadow-md transition-all cursor-pointer border ${vm.status === 'running' ? 'border-green-100' : ''}`}
                          onClick={() => setActiveVM(vm)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge className={getStatusColor(vm.status)}>
                                {vm.status.charAt(0).toUpperCase() + vm.status.slice(1)}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Server className="h-3.5 w-3.5" />
                                <span>{vm.ip}</span>
                              </div>
                            </div>
                            <CardTitle className="mt-2 text-base hover:text-blue-600 transition-colors">
                              {vm.name}
                            </CardTitle>
                            <CardDescription>
                              {vm.template}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            {vm.status === "running" && (
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>CPU</span>
                                    <span>{vm.usage.cpu}%</span>
                                  </div>
                                  <Progress value={vm.usage.cpu} className="h-1" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>RAM</span>
                                    <span>{vm.usage.ram}%</span>
                                  </div>
                                  <Progress value={vm.usage.ram} className="h-1" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>Storage</span>
                                    <span>{vm.usage.storage}%</span>
                                  </div>
                                  <Progress value={vm.usage.storage} className="h-1" />
                                </div>
                              </div>
                            )}
                            {vm.status !== "running" && (
                              <div className="py-2">
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
                                  <Power className="h-4 w-4" />
                                  <span>{vm.status === "stopped" ? "VM is powered off" : "VM is paused"}</span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="pt-2 border-t flex justify-between">
                            <div className="text-xs text-muted-foreground">
                              {vm.status === "running" ? (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>Uptime: {vm.uptime}</span>
                                </div>
                              ) : (
                                <span>Created {new Date(vm.createdAt).toLocaleDateString()}</span>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              // Handle VM action menu
                            }}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Empty state */}
                    {userVMs.length === 0 && (
                      <div className="text-center py-12 border rounded-lg">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                          <Server className="h-6 w-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No VMs found</h3>
                        <p className="text-muted-foreground mb-4">You haven't created any virtual machines yet.</p>
                        <Button>
                          <HardDrive className="mr-2 h-4 w-4" />
                          Create your first VM
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="templates" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">VM Templates</h2>
                      <Select defaultValue="popularity">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Most Popular</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="resources">Lowest Resources</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {vmTemplates.map((template) => (
                        <Card key={template.id} className="hover:shadow-md transition-all border">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <Badge variant="outline">{template.category}</Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>{template.popularity}% success rate</span>
                              </div>
                            </div>
                            <CardTitle className="mt-2 text-base hover:text-blue-600 transition-colors">
                              {template.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {template.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs font-normal">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex justify-between text-sm border-t pt-3">
                              <div className="flex items-center gap-2">
                                <div className="text-xs">
                                  <div className="text-muted-foreground">CPU</div>
                                  <div className="font-medium">{template.specs.cpu} Cores</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs">
                                  <div className="text-muted-foreground">RAM</div>
                                  <div className="font-medium">{template.specs.ram} GB</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs">
                                  <div className="text-muted-foreground">Storage</div>
                                  <div className="font-medium">{template.specs.storage} GB</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <Button className="w-full">Deploy VM</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="labs" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Lab Exercises</h2>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {labExercises.map((exercise) => {
                        const diffColors = getDifficultyColor(exercise.difficulty);
                        return (
                          <Card key={exercise.id} className="hover:shadow-md transition-all border">
                            <CardHeader>
                              <Badge className={`mb-2 ${diffColors.badge}`}>
                                {exercise.difficulty}
                              </Badge>
                              <CardTitle>{exercise.title}</CardTitle>
                              <CardDescription className="line-clamp-2">
                                {exercise.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Server className="h-4 w-4" />
                                  <span>Required VM: {exercise.vm}</span>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Completion Rate</span>
                                    <span className="font-medium">{exercise.completionRate}%</span>
                                  </div>
                                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        exercise.completionRate > 75 ? 'bg-green-500' :
                                        exercise.completionRate > 40 ? 'bg-blue-500' :
                                        'bg-amber-500'
                                      }`}
                                      style={{ width: `${exercise.completionRate}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{exercise.estimatedTime} • {exercise.modules} modules</span>
                                </div>
                                <Button>Start Lab</Button>
                              </div>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                  <TabsContent value="network" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Network Settings</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Network diagram placeholder */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>VM Network Topology</CardTitle>
                          <CardDescription>
                            Configure how your virtual machines connect to each other and the internet.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 border rounded-md">
                          <div className="text-center">
                            <Network className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-muted-foreground">Network diagram visualization will appear here</p>
                            <Button variant="outline" size="sm" className="mt-4">
                              Create Network
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Network settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Virtual Networks</CardTitle>
                          <CardDescription>Configure isolated networks for your VMs</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center py-6">
                          <p className="text-muted-foreground">No virtual networks configured</p>
                          <Button variant="outline" size="sm" className="mt-4">
                            Add Network
                          </Button>
                        </CardContent>
                      </Card>
                      
                      {/* Internet access */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Internet Access</CardTitle>
                          <CardDescription>Configure external connectivity settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Default Gateway</h4>
                                <p className="text-sm text-muted-foreground">10.14.32.1</p>
                              </div>
                              <Button size="sm" variant="outline">Configure</Button>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">Firewall</h4>
                                <p className="text-sm text-muted-foreground">Default rules active</p>
                              </div>
                              <Button size="sm" variant="outline">Manage Rules</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </div>
          )}
          
          {/* VM detail view - still within Tabs context */}
          {activeVM && (
            <div className="flex w-full">
              {/* VM details content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-screen-xl mx-auto space-y-6">
                  {/* VM Overview Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>VM Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Template</h4>
                            <p>{activeVM.template}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">IP Address</h4>
                            <p>{activeVM.ip}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(activeVM.status)}>
                                {activeVM.status.charAt(0).toUpperCase() + activeVM.status.slice(1)}
                              </Badge>
                              {activeVM.status === "running" && (
                                <span className="text-sm text-muted-foreground">Uptime: {activeVM.uptime}</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Created</h4>
                            <p>{new Date(activeVM.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {activeVM.status === "running" && (
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <h4 className="text-sm font-medium">CPU Usage</h4>
                                <span className="text-sm text-muted-foreground">{activeVM.usage.cpu}%</span>
                              </div>
                              <Progress value={activeVM.usage.cpu} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <h4 className="text-sm font-medium">Memory Usage</h4>
                                <span className="text-sm text-muted-foreground">{activeVM.usage.ram}%</span>
                              </div>
                              <Progress value={activeVM.usage.ram} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <h4 className="text-sm font-medium">Storage Usage</h4>
                                <span className="text-sm text-muted-foreground">{activeVM.usage.storage}%</span>
                              </div>
                              <Progress value={activeVM.usage.storage} className="h-2" />
                            </div>
                          </div>
                        )}
                        
                        {activeVM.status !== "running" && (
                          <div className="flex items-center justify-center">
                            <div className="text-center p-6">
                              <Power className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                              <p className="text-muted-foreground mb-4">
                                This VM is currently {activeVM.status === "stopped" ? "powered off" : "paused"}.
                              </p>
                              <Button>
                                <Power className="mr-2 h-4 w-4" />
                                Power On
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Terminal Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Terminal</CardTitle>
                      <Button variant="outline" size="sm" className="gap-1" disabled={activeVM.status !== "running"}>
                        <TerminalSquare className="h-4 w-4" />
                        <span>Open Terminal</span>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {activeVM.status === "running" ? (
                        <div className="bg-black text-green-500 font-mono text-sm rounded-md p-4 h-[300px] overflow-y-auto">
                          <div className="opacity-70">
                            <p>Connected to {activeVM.name} ({activeVM.ip})</p>
                            <p>Ubuntu 22.04.2 LTS</p>
                            <p>{activeVM.name} login: user</p>
                            <p>Password: </p>
                            <p>Last login: Wed Jul 5 14:32:18 2023 from 192.168.1.5</p>
                            <p>user@{activeVM.name}:~$ ls -la</p>
                            <p>total 32</p>
                            <p>drwxr-xr-x 4 user user 4096 Jul 5 14:30 .</p>
                            <p>drwxr-xr-x 3 root root 4096 Jun 12 09:15 ..</p>
                            <p>-rw-r--r-- 1 user user  220 Jun 12 09:15 .bash_logout</p>
                            <p>-rw-r--r-- 1 user user 3771 Jun 12 09:15 .bashrc</p>
                            <p>drwxr-xr-x 2 user user 4096 Jul 5 14:28 Documents</p>
                            <p>drwxr-xr-x 2 user user 4096 Jul 5 14:28 Downloads</p>
                            <p>-rw-r--r-- 1 user user  807 Jun 12 09:15 .profile</p>
                            <p>user@{activeVM.name}:~$ _</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-100 text-slate-400 font-mono text-sm rounded-md p-4 h-[300px] flex items-center justify-center">
                          <div className="text-center">
                            <TerminalSquare className="h-10 w-10 mx-auto mb-2" />
                            <p>Terminal unavailable while VM is {activeVM.status}.</p>
                            <p>Start the VM to access the terminal.</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Actions Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>VM Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1" disabled={activeVM.status !== "running"}>
                          <Monitor className="h-6 w-6" />
                          <span>Console</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1">
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1">
                          <HardDrive className="h-6 w-6" />
                          <span>Snapshots</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1">
                          <Network className="h-6 w-6" />
                          <span>Network</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1" disabled={activeVM.status === "running"}>
                          <RefreshCw className="h-6 w-6" />
                          <span>Restart</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1" disabled={activeVM.status !== "running"}>
                          <Download className="h-6 w-6" />
                          <span>Backup</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col h-auto p-4 gap-1">
                          <Share2 className="h-6 w-6" />
                          <span>Share</span>
                        </Button>
                        <Button variant="destructive" className="flex flex-col h-auto p-4 gap-1">
                          <Power className="h-6 w-6" />
                          <span>Power {activeVM.status === "running" ? "Off" : "On"}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Optional sidebar with VM info and actions */}
              {shouldShowSidebar() && (
                <div 
                  className="border-l overflow-y-auto flex-shrink-0 h-full transition-all duration-300 bg-white"
                  style={{ width: getSidebarWidth() }}
                >
                  <div className="sticky top-0 bg-slate-50 border-b p-4">
                    <h3 className="font-semibold">Resources</h3>
                  </div>
                  <div className="p-4 space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">VM Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VM ID:</span>
                          <span className="font-mono">{activeVM.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Image:</span>
                          <span>{activeVM.template}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">IP Address:</span>
                          <span className="font-mono">{activeVM.ip}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline" className="font-normal">
                            {activeVM.status.charAt(0).toUpperCase() + activeVM.status.slice(1)}
                          </Badge>
                        </div>
                        {activeVM.status === "running" && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uptime:</span>
                            <span>{activeVM.uptime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Related Resources</h4>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          <Book className="h-4 w-4 mr-2" />
                          Documentation
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Server className="h-4 w-4 mr-2" />
                          VM Templates
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Network className="h-4 w-4 mr-2" />
                          Network Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
} 