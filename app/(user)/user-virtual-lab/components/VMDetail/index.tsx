"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HardDrive, 
  Cpu, 
  LineChart, 
  Activity, 
  Clock, 
  Calendar, 
  Settings, 
  Trash2,
  TerminalSquare,
  FileCog,
  Network,
  Shield,
  Download,
  DownloadCloud
} from "lucide-react";
import { formatDate, getResourceStatusColor, getStatusColor } from "../../utils";
import NetworkSettings from "../NetworkSettings";

interface VMDetailProps {
  vm: any;
  showSidebar: boolean;
  onVMAction: (action: string, vmId: string) => void;
}

export function VMDetail({ vm, showSidebar, onVMAction }: VMDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Connected to " + vm.name + " (" + vm.ip + ")",
    "Last login: Wed Jul 5 14:32:18 2023 from 192.168.1.5",
    "$ "
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Format date
  const createdDate = new Date(vm.createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Handle VM action (start, stop, restart)
  const handleAction = (action: string) => {
    onVMAction(action, vm.id);
  };
  
  // Execute terminal command
  const executeCommand = (command: string) => {
    if (!command.trim()) return;
    
    // Add command to terminal output
    setTerminalOutput([...terminalOutput, `$ ${command}`]);
    setTerminalInput("");
    setIsProcessing(true);
    
    // Simulate command execution
    setTimeout(() => {
      let output: string[] = [];
      
      // Generate output based on command
      switch (command) {
        case "ls":
          output = ["Documents  Downloads  Projects  test.txt"];
          break;
        case "pwd":
          output = ["/home/user"];
          break;
        case "ps":
          output = [
            "  PID TTY          TIME CMD",
            " 1234 pts/0    00:00:00 bash",
            " 5678 pts/0    00:00:00 ps"
          ];
          break;
        case "date":
          output = [new Date().toString()];
          break;
        case "uptime":
          output = [` ${new Date().toLocaleTimeString()}  up ${vm.uptime},  1 user,  load average: 0.08, 0.03, 0.01`];
          break;
        case "ifconfig":
        case "ip addr":
          output = [
            "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
            `        inet ${vm.ip}  netmask 255.255.255.0  broadcast 192.168.1.255`,
            "        inet6 fe80::215:5dff:fe00:201  prefixlen 64  scopeid 0x20<link>",
            "        ether 00:15:5d:00:20:01  txqueuelen 1000  (Ethernet)",
            "        RX packets 874  bytes 1140247 (1.1 MB)",
            "        RX errors 0  dropped 0  overruns 0  frame 0",
            "        TX packets 536  bytes 61553 (61.5 KB)",
            "        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"
          ];
          break;
        case "free -h":
          output = [
            "              total        used        free      shared  buff/cache   available",
            "Mem:          3.9Gi       901Mi       2.1Gi        13Mi       931Mi       2.8Gi",
            "Swap:         2.0Gi          0B       2.0Gi"
          ];
          break;
        case "df -h":
          output = [
            "Filesystem      Size  Used Avail Use% Mounted on",
            "udev            1.9G     0  1.9G   0% /dev",
            "tmpfs           394M  1.1M  393M   1% /run",
            "/dev/sda1        40G   10G   28G  27% /",
            "tmpfs           2.0G     0  2.0G   0% /dev/shm",
            "tmpfs           5.0M     0  5.0M   0% /run/lock"
          ];
          break;
        case "hostname":
          output = [vm.name];
          break;
        case "clear":
          setTerminalOutput(["$ "]);
          setIsProcessing(false);
          return;
        default:
          if (command.startsWith("echo ")) {
            output = [command.substring(5)];
          } else {
            output = [`Command not found: ${command}`];
          }
      }
      
      // Add output to terminal
      setTerminalOutput([...terminalOutput, `$ ${command}`, ...output, "$ "]);
      setIsProcessing(false);
    }, 500);
  };
  
  return (
    <div className={`container mx-auto ${showSidebar ? 'pr-64' : ''} transition-all duration-200`}>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              {vm.name}
              <Badge className={getStatusColor(vm.status)}>
                {vm.status.charAt(0).toUpperCase() + vm.status.slice(1)}
              </Badge>
            </h1>
            <div className="text-muted-foreground text-sm">
              {vm.template} • IP: {vm.ip}
            </div>
          </div>
          
          <div className="flex gap-2">
            {vm.status === "running" ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAction("restart")}
                  className="gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M16 21h5v-5"></path>
                  </svg>
                  <span>Restart</span>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleAction("stop")}
                  className="gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <rect x="9" y="9" width="6" height="6"></rect>
                  </svg>
                  <span>Stop</span>
                </Button>
              </>
            ) : vm.status === "stopped" ? (
              <Button 
                size="sm"
                onClick={() => handleAction("start")}
                className="gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span>Start</span>
              </Button>
            ) : (
              <Button 
                size="sm"
                disabled
                className="gap-1"
              >
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span>Provisioning...</span>
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview" className="flex gap-1.5">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="console" className="flex gap-1.5">
              <TerminalSquare className="h-4 w-4" />
              <span>Console</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex gap-1.5">
              <Network className="h-4 w-4" />
              <span>Network</span>
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex gap-1.5">
              <HardDrive className="h-4 w-4" />
              <span>Storage</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-1.5">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resource usage */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resource Usage</CardTitle>
                    <CardDescription>
                      Real-time resource utilization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span>CPU Usage</span>
                        </div>
                        <span className={getResourceStatusColor(vm.usage.cpu)}>
                          {vm.usage.cpu}%
                        </span>
                      </div>
                      <Progress value={vm.usage.cpu} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <LineChart className="h-4 w-4 text-muted-foreground" />
                          <span>Memory Usage</span>
                        </div>
                        <span className={getResourceStatusColor(vm.usage.ram)}>
                          {vm.usage.ram}%
                        </span>
                      </div>
                      <Progress value={vm.usage.ram} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>Storage Usage</span>
                        </div>
                        <span className={getResourceStatusColor(vm.usage.storage)}>
                          {vm.usage.storage}%
                        </span>
                      </div>
                      <Progress value={vm.usage.storage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Activity</CardTitle>
                    <CardDescription>
                      Recent events and logs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 pl-4 py-1 border-blue-500">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                          </svg>
                          <span>VM Started</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          2 hours ago
                        </div>
                      </div>
                      
                      <div className="border-l-2 pl-4 py-1 border-amber-500">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span>High CPU Usage Detected</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          6 hours ago
                        </div>
                      </div>
                      
                      <div className="border-l-2 pl-4 py-1 border-slate-500">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span>System Update Completed</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          1 day ago
                        </div>
                      </div>
                      
                      <div className="border-l-2 pl-4 py-1 border-green-500">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                          <span>VM Created</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formattedDate}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* VM info and quick actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">VM Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="text-sm font-medium">
                        <Badge className={getStatusColor(vm.status)}>
                          {vm.status.charAt(0).toUpperCase() + vm.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">Template</div>
                      <div className="text-sm font-medium">{vm.template}</div>
                      
                      <div className="text-sm text-muted-foreground">Region</div>
                      <div className="text-sm font-medium">{vm.region}</div>
                      
                      <div className="text-sm text-muted-foreground">IP Address</div>
                      <div className="text-sm font-medium">{vm.ip}</div>
                      
                      {vm.status === "running" && (
                        <>
                          <div className="text-sm text-muted-foreground">Uptime</div>
                          <div className="text-sm font-medium">{vm.uptime}</div>
                        </>
                      )}
                      
                      <div className="text-sm text-muted-foreground">Created</div>
                      <div className="text-sm font-medium">{formattedDate}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-md">
                        <Cpu className="h-5 w-5 text-slate-600 mb-1" />
                        <div className="text-sm font-medium">{vm.specs.cpu}</div>
                        <div className="text-xs text-muted-foreground">vCPU</div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-md">
                        <LineChart className="h-5 w-5 text-slate-600 mb-1" />
                        <div className="text-sm font-medium">{vm.specs.ram}</div>
                        <div className="text-xs text-muted-foreground">RAM</div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-md">
                        <HardDrive className="h-5 w-5 text-slate-600 mb-1" />
                        <div className="text-sm font-medium">{vm.specs.storage}</div>
                        <div className="text-xs text-muted-foreground">Storage</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("console")}
                    >
                      <TerminalSquare className="h-4 w-4" />
                      <span>Open Console</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("network")}
                    >
                      <Network className="h-4 w-4" />
                      <span>Network Settings</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Create Snapshot</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete VM</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="console" className="space-y-4">
            <Card className="min-h-[400px] flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Terminal Console</CardTitle>
                  <Badge variant="outline">
                    {vm.ip}
                  </Badge>
                </div>
                <CardDescription>
                  Interactive shell access to your virtual machine
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="bg-black text-green-500 font-mono p-4 rounded-md h-96 flex flex-col">
                  <div className="flex-grow overflow-auto whitespace-pre-wrap">
                    {terminalOutput.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                    {isProcessing && (
                      <div className="animate-pulse">Processing...</div>
                    )}
                  </div>
                  
                  {vm.status === "running" ? (
                    <div className="flex items-center mt-2 border-t border-gray-800 pt-2">
                      <span>$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            executeCommand(terminalInput);
                          }
                        }}
                        className="flex-grow bg-transparent border-none outline-none text-green-500 ml-2"
                        placeholder="Type command..."
                        disabled={isProcessing}
                      />
                    </div>
                  ) : (
                    <div className="text-yellow-500 mt-4 text-center border border-yellow-800 bg-yellow-950 p-2 rounded">
                      VM is not running. Start the VM to access the console.
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("ls")}
                  >
                    ls
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("pwd")}
                  >
                    pwd
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("date")}
                  >
                    date
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("uptime")}
                  >
                    uptime
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("free -h")}
                  >
                    free -h
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("df -h")}
                  >
                    df -h
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("ps")}
                  >
                    ps
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("ip addr")}
                  >
                    ip addr
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => executeCommand("clear")}
                  >
                    clear
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <NetworkSettings vm={vm} />
          </TabsContent>
          
          <TabsContent value="storage" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Storage Volumes</CardTitle>
                <CardDescription>
                  Manage attached storage devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-slate-600" />
                        <div>
                          <div className="text-sm font-medium">Primary Disk</div>
                          <div className="text-xs text-muted-foreground">Boot Volume</div>
                        </div>
                      </div>
                      <Badge>Root</Badge>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Size</span>
                        <span>{vm.specs.storage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Used</span>
                        <span>{vm.usage.storage}%</span>
                      </div>
                      <div className="space-y-1">
                        <Progress value={vm.usage.storage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0 GB</span>
                          <span>{parseInt(vm.specs.storage)} GB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Attach New Volume</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Snapshots</CardTitle>
                <CardDescription>
                  Point-in-time copies of your disk
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-8">
                    <DownloadCloud className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Snapshots Available</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      Create a snapshot to save the current state of your VM for backup or migration purposes.
                    </p>
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      <span>Create Snapshot</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">VM Settings</CardTitle>
                <CardDescription>
                  Configure VM properties and options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">VM Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={vm.name}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CPU</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>1 vCPU</option>
                        <option selected={vm.specs.cpu === "2 vCPU"}>2 vCPU</option>
                        <option selected={vm.specs.cpu === "4 vCPU"}>4 vCPU</option>
                        <option>8 vCPU</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Memory</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>1 GB</option>
                        <option>2 GB</option>
                        <option selected={vm.specs.ram === "4 GB"}>4 GB</option>
                        <option selected={vm.specs.ram === "8 GB"}>8 GB</option>
                        <option selected={vm.specs.ram === "16 GB"}>16 GB</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Boot Mode</label>
                      <select className="w-full p-2 border rounded-md">
                        <option selected>UEFI</option>
                        <option>Legacy BIOS</option>
                      </select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Add tags separated by commas"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      Cancel
                    </Button>
                    <Button>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Destructive actions for your VM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-destructive/20 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Delete Virtual Machine</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Permanently remove this VM and all associated resources
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete VM
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-destructive/20 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Reset Virtual Machine</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Reset to factory settings, all data will be lost
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Reset VM
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 