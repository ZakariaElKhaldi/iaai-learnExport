"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShieldAlert,
  AlertTriangle,
  Server,
  Laptop,
  Router,
  Network,
  Globe,
  Lock,
  Terminal,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  FileText,
  Share2,
  ArrowRight
} from "lucide-react";

interface AttackSimulationProps {
  onClose: () => void;
}

export function AttackSimulation({ onClose }: AttackSimulationProps) {
  const [attackProgress, setAttackProgress] = useState(0);
  const [attackState, setAttackState] = useState<"ready" | "running" | "paused" | "completed">("ready");
  const [currentStep, setCurrentStep] = useState(0);
  const [logEntries, setLogEntries] = useState<string[]>([]);
  
  const attackSteps = [
    { name: "Reconnaissance", description: "Gathering information about the target network", duration: 5 },
    { name: "Scanning", description: "Identifying potential vulnerabilities", duration: 8 },
    { name: "Exploitation", description: "Attempting to exploit discovered vulnerabilities", duration: 12 },
    { name: "Persistence", description: "Establishing persistent access", duration: 7 },
    { name: "Post-Exploitation", description: "Analyzing impact and generating report", duration: 6 }
  ];
  
  const totalDuration = attackSteps.reduce((sum, step) => sum + step.duration, 0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (attackState === "running") {
      timer = setInterval(() => {
        setAttackProgress(prev => {
          const newProgress = prev + 0.5;
          
          // Add log entries at specific progress points
          if (Math.floor(newProgress) % 5 === 0 && Math.floor(newProgress) !== Math.floor(prev)) {
            addLogEntry();
          }
          
          // Update current step
          const progressPercentage = (newProgress / totalDuration) * 100;
          let stepsSum = 0;
          for (let i = 0; i < attackSteps.length; i++) {
            stepsSum += attackSteps[i].duration;
            if ((stepsSum / totalDuration) * 100 > progressPercentage) {
              setCurrentStep(i);
              break;
            }
          }
          
          // Check if attack is complete
          if (newProgress >= totalDuration) {
            setAttackState("completed");
            clearInterval(timer);
            addLogEntry("Attack simulation completed. Report generated.");
            return totalDuration;
          }
          
          return newProgress;
        });
      }, 500);
    }
    
    return () => clearInterval(timer);
  }, [attackState]);
  
  const startAttack = () => {
    setAttackState("running");
    addLogEntry("Attack simulation started");
  };
  
  const pauseAttack = () => {
    setAttackState("paused");
    addLogEntry("Attack simulation paused");
  };
  
  const resumeAttack = () => {
    setAttackState("running");
    addLogEntry("Attack simulation resumed");
  };
  
  const resetAttack = () => {
    setAttackState("ready");
    setAttackProgress(0);
    setCurrentStep(0);
    setLogEntries([]);
  };
  
  const addLogEntry = (customMessage?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    let message = customMessage;
    
    if (!message) {
      const messages = [
        "Scanning port 80...",
        "Detected open SSH port (22)",
        "Found potential SQL injection point",
        "Analyzing web server response headers",
        "Checking for default credentials",
        "Testing WAF bypass techniques",
        "Identified outdated software version",
        "Attempting to exploit CVE-2023-XXXX",
        "Checking for sensitive data exposure",
        "Analyzing network traffic patterns",
        "Testing for misconfigured services",
        "Examining authentication mechanisms"
      ];
      message = messages[Math.floor(Math.random() * messages.length)];
    }
    
    setLogEntries(prev => [...prev, `[${timestamp}] ${message}`]);
  };
  
  const getProgressPercentage = () => {
    return (attackProgress / totalDuration) * 100;
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-lg max-w-5xl w-full mx-auto overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-slate-50">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold">Advanced Attack Simulation</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={attackState === "running" ? "bg-green-100 text-green-800" : 
                      attackState === "paused" ? "bg-amber-100 text-amber-800" :
                      attackState === "completed" ? "bg-blue-100 text-blue-800" :
                      "bg-slate-100 text-slate-800"}
          >
            {attackState === "running" ? "Running" : 
             attackState === "paused" ? "Paused" :
             attackState === "completed" ? "Completed" : "Ready"}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 p-4 border-r">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Attack Progress</h3>
            <div className="flex items-center gap-2 mb-2">
              <Progress value={getProgressPercentage()} className="h-2" />
              <span className="text-sm text-slate-600 min-w-[45px] text-right">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
            
            <div className="grid grid-cols-5 gap-1 mb-6">
              {attackSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`text-center p-2 rounded border text-xs ${
                    index < currentStep ? "bg-blue-50 border-blue-200 text-blue-800" :
                    index === currentStep ? "bg-blue-100 border-blue-300 text-blue-800 font-medium" :
                    "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  {step.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <Tabs defaultValue="network" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="network">Network Map</TabsTrigger>
                <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
                <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="network" className="mt-0">
                <Card>
                  <CardContent className="p-4">
                    <div className="w-full h-[300px] bg-slate-100 rounded-lg flex items-center justify-center relative">
                      {/* Network visualization mockup */}
                      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <Globe className="h-12 w-12 text-blue-500" />
                      </div>
                      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Router className="h-10 w-10 text-amber-500" />
                      </div>
                      <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <Server className="h-10 w-10 text-purple-500" />
                      </div>
                      <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                        <Server className="h-10 w-10 text-purple-500" />
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <Laptop className="h-10 w-10 text-green-500" />
                      </div>
                      
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                        <line x1="25%" y1="25%" x2="50%" y2="33%" stroke={attackProgress > 5 ? "#ff4d4d" : "#e2e8f0"} strokeWidth="2" />
                        <line x1="50%" y1="33%" x2="33%" y2="67%" stroke={attackProgress > 10 ? "#ff4d4d" : "#e2e8f0"} strokeWidth="2" />
                        <line x1="50%" y1="33%" x2="67%" y2="67%" stroke={attackProgress > 15 ? "#ff4d4d" : "#e2e8f0"} strokeWidth="2" />
                        <line x1="33%" y1="67%" x2="67%" y2="67%" stroke={attackProgress > 20 ? "#ff4d4d" : "#e2e8f0"} strokeWidth="2" />
                        <line x1="67%" y1="67%" x2="75%" y2="75%" stroke={attackProgress > 25 ? "#ff4d4d" : "#e2e8f0"} strokeWidth="2" />
                      </svg>
                      
                      {attackProgress > 15 && (
                        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                          <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                        </div>
                      )}
                      
                      {attackProgress > 25 && (
                        <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                          <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="traffic" className="mt-0">
                <Card>
                  <CardContent className="p-4">
                    <div className="w-full h-[300px] bg-slate-100 rounded-lg p-3 overflow-hidden">
                      <div className="font-mono text-xs text-slate-700 h-full overflow-y-auto">
                        {[...Array(20)].map((_, index) => (
                          <div 
                            key={index} 
                            className={`py-1 ${index % 2 === 0 ? 'bg-slate-50' : ''} ${
                              attackProgress > 10 && index === 5 ? 'bg-red-50 text-red-800' : ''
                            } ${
                              attackProgress > 15 && index === 12 ? 'bg-red-50 text-red-800' : ''
                            }`}
                          >
                            {index === 5 && attackProgress > 10 ? 
                              '192.168.1.100:4455 → 10.0.0.5:80 [HTTP] POST /admin/login.php (Suspicious Payload)' :
                              index === 12 && attackProgress > 15 ?
                              '192.168.1.100:4455 → 10.0.0.5:22 [SSH] Connection attempt (Brute Force)' :
                              `192.168.1.${Math.floor(Math.random() * 255)}:${Math.floor(Math.random() * 60000) + 1024} → 10.0.0.${Math.floor(Math.random() * 10)}:${[80, 443, 22, 25, 53][Math.floor(Math.random() * 5)]} [${['HTTP', 'HTTPS', 'DNS', 'SMTP'][Math.floor(Math.random() * 4)]}]`}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vulnerabilities" className="mt-0">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className={`p-3 border rounded-lg ${attackProgress > 10 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${attackProgress > 10 ? 'text-red-500' : 'text-slate-400'}`} />
                            <span className={`font-medium ${attackProgress > 10 ? 'text-red-800' : 'text-slate-600'}`}>SQL Injection Vulnerability</span>
                          </div>
                          <Badge variant="outline" className={attackProgress > 10 ? 'bg-red-100 text-red-800' : 'bg-slate-100'}>
                            {attackProgress > 10 ? 'Detected' : 'Scanning...'}
                          </Badge>
                        </div>
                        {attackProgress > 10 && (
                          <p className="text-xs text-red-700 mt-1">Found in: /admin/login.php</p>
                        )}
                      </div>
                      
                      <div className={`p-3 border rounded-lg ${attackProgress > 15 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${attackProgress > 15 ? 'text-amber-500' : 'text-slate-400'}`} />
                            <span className={`font-medium ${attackProgress > 15 ? 'text-amber-800' : 'text-slate-600'}`}>Weak SSH Credentials</span>
                          </div>
                          <Badge variant="outline" className={attackProgress > 15 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100'}>
                            {attackProgress > 15 ? 'Detected' : 'Scanning...'}
                          </Badge>
                        </div>
                        {attackProgress > 15 && (
                          <p className="text-xs text-amber-700 mt-1">Server: 10.0.0.5:22</p>
                        )}
                      </div>
                      
                      <div className={`p-3 border rounded-lg ${attackProgress > 20 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${attackProgress > 20 ? 'text-amber-500' : 'text-slate-400'}`} />
                            <span className={`font-medium ${attackProgress > 20 ? 'text-amber-800' : 'text-slate-600'}`}>Outdated Software</span>
                          </div>
                          <Badge variant="outline" className={attackProgress > 20 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100'}>
                            {attackProgress > 20 ? 'Detected' : 'Scanning...'}
                          </Badge>
                        </div>
                        {attackProgress > 20 && (
                          <p className="text-xs text-amber-700 mt-1">Apache 2.4.34 (CVE-2023-XXXX)</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Current Activity</h3>
            <Card className="bg-black text-white overflow-hidden">
              <CardContent className="p-0">
                <div className="font-mono text-xs h-[400px] overflow-y-auto p-3">
                  {logEntries.length === 0 && (
                    <div className="text-slate-400 italic">
                      Waiting to start attack simulation...
                    </div>
                  )}
                  {logEntries.map((entry, index) => (
                    <div key={index} className="py-1">
                      {entry}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col gap-2">
            {attackState === "ready" && (
              <Button className="w-full" onClick={startAttack}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Attack Simulation
              </Button>
            )}
            
            {attackState === "running" && (
              <Button variant="outline" className="w-full" onClick={pauseAttack}>
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause Simulation
              </Button>
            )}
            
            {attackState === "paused" && (
              <Button className="w-full" onClick={resumeAttack}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Resume Simulation
              </Button>
            )}
            
            {attackState === "completed" && (
              <>
                <Button variant="outline" className="w-full" onClick={resetAttack}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Simulation
                </Button>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Report
                </Button>
              </>
            )}
            
            {(attackState === "running" || attackState === "paused") && (
              <Button variant="outline" className="w-full" onClick={resetAttack}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Simulation
              </Button>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Simulation Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Target:</span>
                <span className="font-medium">Corporate Network</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Attack Type:</span>
                <span className="font-medium">Multi-stage Penetration</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Difficulty:</span>
                <span className="font-medium">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Duration:</span>
                <span className="font-medium">{totalDuration} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-slate-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500">
            This is a simulated environment for educational purposes only.
          </div>
          <div>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 