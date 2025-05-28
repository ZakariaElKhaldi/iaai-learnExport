"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Network, HardDrive, TerminalSquare, CheckCircle, ChevronRight, Play, RotateCcw, StopCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LabModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LabModeOverlay({ isOpen, onClose }: LabModeOverlayProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOS, setSelectedOS] = useState("ubuntu");
  const [vmName, setVmName] = useState("my-practice-vm");
  const [deployProgress, setDeployProgress] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isVMRunning, setIsVMRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  
  const totalSteps = 3;
  
  // Handle VM deployment simulation
  useEffect(() => {
    if (isDeploying && deployProgress < 100) {
      const timer = setTimeout(() => {
        setDeployProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            setIsDeploying(false);
            setIsVMRunning(true);
            // Add system logs
            setTerminalOutput(prev => [
              ...prev,
              "VM deployment completed successfully.",
              "Starting virtual machine...",
              "System booting...",
              "Initializing network interfaces...",
              "Network connection established.",
              "VM is now running and ready to use."
            ]);
            return 100;
          }
          
          // Add progress logs
          if (newProgress === 25) {
            setTerminalOutput(prev => [...prev, "Allocating resources..."]);
          } else if (newProgress === 50) {
            setTerminalOutput(prev => [...prev, "Setting up virtual disks..."]);
          } else if (newProgress === 75) {
            setTerminalOutput(prev => [...prev, "Configuring network..."]);
          }
          
          return newProgress;
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDeploying, deployProgress]);
  
  // Handle terminal command simulation
  const runCommand = (command: string) => {
    if (isCommandRunning) return;
    
    setIsCommandRunning(true);
    setCurrentCommand(command);
    setTerminalOutput(prev => [...prev, `$ ${command}`]);
    
    setTimeout(() => {
      let output: string[] = [];
      
      switch (command) {
        case "ls":
          output = ["Documents  Downloads  Pictures  example.txt"];
          break;
        case "pwd":
          output = ["/home/user"];
          break;
        case "whoami":
          output = ["user"];
          break;
        case "date":
          output = [new Date().toString()];
          break;
        case "ifconfig":
        case "ip addr":
          output = [
            "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
            "        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255",
            "        inet6 fe80::216:3eff:fe00:1234  prefixlen 64  scopeid 0x20<link>",
            "        ether 00:16:3e:00:12:34  txqueuelen 1000  (Ethernet)"
          ];
          break;
        case "top":
          output = [
            "Tasks: 128 total,   1 running, 127 sleeping,   0 stopped,   0 zombie",
            "%Cpu(s):  2.0 us,  1.0 sy,  0.0 ni, 97.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st",
            "MiB Mem :   3953.4 total,   2120.5 free,    901.3 used,    931.6 buff/cache",
            "MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   2773.0 avail Mem"
          ];
          break;
        default:
          output = [`Command not found: ${command}`];
      }
      
      setTerminalOutput(prev => [...prev, ...output]);
      setIsCommandRunning(false);
      setCurrentCommand("");
    }, 1000);
  };
  
  // Reset the practice lab
  const resetLab = () => {
    setCurrentStep(1);
    setSelectedOS("ubuntu");
    setVmName("my-practice-vm");
    setDeployProgress(0);
    setIsDeploying(false);
    setIsVMRunning(false);
    setActiveTab("overview");
    setTerminalOutput([]);
    setIsCommandRunning(false);
    setCurrentCommand("");
  };
  
  // Next step handler
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Previous step handler
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Deploy VM handler
  const handleDeploy = () => {
    setIsDeploying(true);
    setTerminalOutput(["Starting VM deployment...", `Creating VM with name: ${vmName}`, `Selected OS: ${selectedOS}`]);
  };
  
  // Stop VM handler
  const handleStopVM = () => {
    setIsVMRunning(false);
    setTerminalOutput(prev => [...prev, "Stopping virtual machine...", "VM stopped successfully."]);
  };
  
  // Restart VM handler
  const handleRestartVM = () => {
    setTerminalOutput(prev => [...prev, "Restarting virtual machine...", "VM is shutting down..."]);
    setIsVMRunning(false);
    
    setTimeout(() => {
      setIsVMRunning(true);
      setTerminalOutput(prev => [...prev, "VM is starting up...", "VM restarted successfully."]);
    }, 2000);
  };

  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Practice Lab Mode</h2>
            <Badge className="bg-blue-100 text-blue-800">
              Interactive Tutorial
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
            Close
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      idx + 1 === currentStep 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : idx + 1 < currentStep 
                          ? 'border-green-600 bg-green-50 text-green-600' 
                          : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {idx + 1 < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm mt-2 ${
                    idx + 1 === currentStep 
                      ? 'text-blue-600 font-medium' 
                      : idx + 1 < currentStep 
                        ? 'text-green-600' 
                        : 'text-gray-400'
                  }`}>
                    {idx === 0 ? 'Configuration' : idx === 1 ? 'Deployment' : 'Interaction'}
                  </span>
                  
                  {idx < totalSteps - 1 && (
                    <div className={`h-0.5 w-24 mt-5 ${
                      idx + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step content */}
          <div className="mt-4">
            {/* Step 1: Configuration */}
            {currentStep === 1 && (
              <div className="space-y-6 max-w-xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Configure Your Virtual Machine</CardTitle>
                    <CardDescription>
                      Select the operating system and configure basic settings for your practice VM
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">VM Name</label>
                      <Input 
                        value={vmName}
                        onChange={(e) => setVmName(e.target.value)}
                        placeholder="Enter a name for your VM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Operating System</label>
                      <Select value={selectedOS} onValueChange={setSelectedOS}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an OS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ubuntu">Ubuntu 22.04 LTS</SelectItem>
                          <SelectItem value="centos">CentOS 9 Stream</SelectItem>
                          <SelectItem value="debian">Debian 12</SelectItem>
                          <SelectItem value="windows">Windows Server 2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resources</label>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-md">
                        <div className="flex flex-col items-center">
                          <HardDrive className="h-5 w-5 text-slate-600 mb-1" />
                          <span className="text-sm font-medium">40 GB</span>
                          <span className="text-xs text-slate-500">Storage</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Server className="h-5 w-5 text-slate-600 mb-1" />
                          <span className="text-sm font-medium">2 vCPU</span>
                          <span className="text-xs text-slate-500">Processor</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 mb-1">
                            <path d="M2 20h20"></path>
                            <path d="M5 16V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12"></path>
                            <path d="M9 12v-4"></path>
                            <path d="M13 12v-7"></path>
                            <path d="M17 12v-4"></path>
                          </svg>
                          <span className="text-sm font-medium">4 GB</span>
                          <span className="text-xs text-slate-500">Memory</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Network</label>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Network className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="text-sm font-medium">Default Network</div>
                            <div className="text-xs text-slate-500">DHCP Enabled</div>
                          </div>
                        </div>
                        <Badge>192.168.1.x</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" onClick={resetLab}>Reset</Button>
                    <Button onClick={handleNextStep}>Next Step</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 2: Deployment */}
            {currentStep === 2 && (
              <div className="space-y-6 max-w-xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Deploy Your Virtual Machine</CardTitle>
                    <CardDescription>
                      Start the deployment process for your virtual machine
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h3 className="text-sm font-medium mb-3">VM Configuration Summary</h3>
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="text-slate-600">Name:</div>
                        <div className="font-medium">{vmName}</div>
                        
                        <div className="text-slate-600">Operating System:</div>
                        <div className="font-medium">
                          {selectedOS === "ubuntu" && "Ubuntu 22.04 LTS"}
                          {selectedOS === "centos" && "CentOS 9 Stream"}
                          {selectedOS === "debian" && "Debian 12"}
                          {selectedOS === "windows" && "Windows Server 2022"}
                        </div>
                        
                        <div className="text-slate-600">Resources:</div>
                        <div className="font-medium">2 vCPU, 4 GB RAM, 40 GB Storage</div>
                        
                        <div className="text-slate-600">Network:</div>
                        <div className="font-medium">Default Network (DHCP)</div>
                      </div>
                    </div>
                    
                    {isDeploying || deployProgress === 100 ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Deployment Progress</span>
                            <span>{deployProgress}%</span>
                          </div>
                          <Progress value={deployProgress} className="h-2" />
                        </div>
                        
                        <div className="bg-black text-green-400 font-mono text-xs p-4 rounded-md h-40 overflow-auto">
                          {terminalOutput.map((line, i) => (
                            <div key={i} className="py-0.5">{line}</div>
                          ))}
                          {isDeploying && deployProgress < 100 && (
                            <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
                          )}
                        </div>
                        
                        {deployProgress === 100 && (
                          <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                              <CheckCircle className="h-5 w-5" />
                              <span className="font-medium">Deployment Complete!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-800 text-sm">
                        <div className="flex items-start gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mt-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                          </svg>
                          <div>
                            <p className="font-medium mb-1">Ready to Deploy</p>
                            <p>Click the "Deploy VM" button to start the deployment process. This will create a virtual machine based on your selected configuration.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" onClick={handlePreviousStep} disabled={isDeploying && deployProgress < 100}>
                      Previous Step
                    </Button>
                    
                    {deployProgress === 100 ? (
                      <Button onClick={handleNextStep}>
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleDeploy} 
                        disabled={isDeploying}
                      >
                        {isDeploying ? (
                          <>
                            <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Deploy VM
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 3: Interaction */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card className="h-[500px] flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle>Manage Your Virtual Machine</CardTitle>
                        <Badge className={isVMRunning ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}>
                          {isVMRunning ? "Running" : "Stopped"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {isVMRunning ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="gap-1"
                              onClick={handleRestartVM}
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span>Restart</span>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="gap-1"
                              onClick={handleStopVM}
                            >
                              <StopCircle className="h-3.5 w-3.5" />
                              <span>Stop VM</span>
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => setIsVMRunning(true)}
                          >
                            <Play className="h-3.5 w-3.5" />
                            <span>Start VM</span>
                          </Button>
                        )}
                      </div>
                    </div>
                    <CardDescription>
                      Interact with your virtual machine and practice common operations
                    </CardDescription>
                  </CardHeader>
                  
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab} 
                    className="flex-1 flex flex-col pt-1"
                  >
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="overview" className="flex gap-1.5">
                        <Server className="h-4 w-4" />
                        <span>Overview</span>
                      </TabsTrigger>
                      <TabsTrigger value="terminal" className="flex gap-1.5" disabled={!isVMRunning}>
                        <TerminalSquare className="h-4 w-4" />
                        <span>Terminal</span>
                      </TabsTrigger>
                      <TabsTrigger value="network" className="flex gap-1.5">
                        <Network className="h-4 w-4" />
                        <span>Network</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="flex-1 p-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">VM Information</h3>
                          <div className="bg-slate-50 rounded-md p-4 space-y-3">
                            <div className="grid grid-cols-2 text-sm">
                              <div className="text-slate-600">Name:</div>
                              <div className="font-medium">{vmName}</div>
                              
                              <div className="text-slate-600">Status:</div>
                              <div className="font-medium">{isVMRunning ? "Running" : "Stopped"}</div>
                              
                              <div className="text-slate-600">IP Address:</div>
                              <div className="font-medium">192.168.1.100</div>
                              
                              <div className="text-slate-600">OS:</div>
                              <div className="font-medium">
                                {selectedOS === "ubuntu" && "Ubuntu 22.04 LTS"}
                                {selectedOS === "centos" && "CentOS 9 Stream"}
                                {selectedOS === "debian" && "Debian 12"}
                                {selectedOS === "windows" && "Windows Server 2022"}
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-sm font-medium">Resources</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>CPU Usage</span>
                                <span className="text-blue-600">15%</span>
                              </div>
                              <Progress value={15} className="h-2" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Memory Usage</span>
                                <span className="text-blue-600">25%</span>
                              </div>
                              <Progress value={25} className="h-2" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Disk Usage</span>
                                <span className="text-blue-600">10%</span>
                              </div>
                              <Progress value={10} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Practice Tasks</h3>
                          <div className="bg-blue-50 rounded-md p-4 space-y-3">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                                1
                              </div>
                              <div>
                                <p className="text-sm font-medium">Start/Stop the VM</p>
                                <p className="text-xs text-slate-600">Practice starting and stopping the virtual machine</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                                2
                              </div>
                              <div>
                                <p className="text-sm font-medium">Use Terminal Commands</p>
                                <p className="text-xs text-slate-600">Try basic commands like ls, pwd, and ifconfig</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                                3
                              </div>
                              <div>
                                <p className="text-sm font-medium">Check Network Settings</p>
                                <p className="text-xs text-slate-600">View the network configuration in the Network tab</p>
                              </div>
                            </div>
                          </div>
                          
                          {isVMRunning && (
                            <Button 
                              className="w-full gap-1" 
                              onClick={() => setActiveTab("terminal")}
                            >
                              <TerminalSquare className="h-4 w-4" />
                              <span>Open Terminal</span>
                            </Button>
                          )}
                          
                          <h3 className="text-sm font-medium">System Logs</h3>
                          <div className="bg-black text-green-400 font-mono text-xs p-3 rounded-md h-36 overflow-auto">
                            {terminalOutput.slice(-7).map((line, i) => (
                              <div key={i} className="py-0.5">{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="terminal" className="flex-1 p-4">
                      <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-full overflow-auto">
                        <div className="mb-2">Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-76-generic x86_64)</div>
                        <div className="mb-4">Type 'help' to see available commands</div>
                        
                        {terminalOutput.map((line, i) => (
                          <div key={i} className="py-0.5">{line}</div>
                        ))}
                        
                        <div className="flex items-center mt-2">
                          <span className="text-green-400">user@{vmName}:~$</span>
                          <input
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-green-400 ml-2"
                            disabled={isCommandRunning || !isVMRunning}
                            value={currentCommand}
                            onChange={(e) => setCurrentCommand(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && currentCommand.trim()) {
                                e.preventDefault();
                                runCommand(currentCommand.trim());
                              }
                            }}
                            placeholder={isCommandRunning ? "Processing..." : "Type a command..."}
                          />
                          {isCommandRunning && (
                            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("ls")}>ls</Badge>
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("pwd")}>pwd</Badge>
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("whoami")}>whoami</Badge>
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("date")}>date</Badge>
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("ip addr")}>ip addr</Badge>
                        <Badge className="cursor-pointer bg-slate-100 hover:bg-slate-200 transition-colors" onClick={() => runCommand("top")}>top</Badge>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="network" className="flex-1 p-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Network Configuration</h3>
                          <div className="bg-slate-50 rounded-md p-4 space-y-3">
                            <div className="grid grid-cols-2 text-sm">
                              <div className="text-slate-600">IP Address:</div>
                              <div className="font-medium">192.168.1.100</div>
                              
                              <div className="text-slate-600">Subnet Mask:</div>
                              <div className="font-medium">255.255.255.0</div>
                              
                              <div className="text-slate-600">Gateway:</div>
                              <div className="font-medium">192.168.1.1</div>
                              
                              <div className="text-slate-600">DNS:</div>
                              <div className="font-medium">8.8.8.8, 8.8.4.4</div>
                              
                              <div className="text-slate-600">MAC Address:</div>
                              <div className="font-medium">00:16:3e:00:12:34</div>
                              
                              <div className="text-slate-600">Network Type:</div>
                              <div className="font-medium">Default Network (NAT)</div>
                            </div>
                          </div>
                          
                          <h3 className="text-sm font-medium">Interface Status</h3>
                          <div className="bg-slate-50 rounded-md p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Network className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">eth0</span>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Connected</Badge>
                            </div>
                            <div className="text-xs text-slate-600">
                              Primary network interface
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Network Activity</h3>
                          <div className="bg-slate-50 rounded-md p-4 h-40 flex items-center justify-center">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
                                <Network className="h-8 w-8 text-blue-600" />
                              </div>
                              <p className="text-sm font-medium">Network Traffic</p>
                              <p className="text-xs text-slate-500">Minimal network activity</p>
                            </div>
                          </div>
                          
                          <h3 className="text-sm font-medium">Open Ports</h3>
                          <div className="bg-slate-50 rounded-md p-4">
                            <div className="text-sm space-y-2">
                              <div className="flex items-center justify-between py-1 border-b border-slate-200">
                                <div>22/tcp</div>
                                <div className="text-slate-600">SSH</div>
                              </div>
                              <div className="flex items-center justify-between py-1 border-b border-slate-200">
                                <div>80/tcp</div>
                                <div className="text-slate-600">HTTP</div>
                              </div>
                              <div className="flex items-center justify-between py-1">
                                <div>443/tcp</div>
                                <div className="text-slate-600">HTTPS</div>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => runCommand("ip addr")}
                            disabled={!isVMRunning}
                          >
                            View Network Details in Terminal
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous Step
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetLab}>
                      Reset Lab
                    </Button>
                    <Button onClick={onClose}>
                      Finish Practice
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 