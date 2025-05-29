"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { VMList } from "./components/VMList";
import { VMDetail } from "./components/VMDetail";
import { TemplateList } from "./components/TemplateList";
import { LabsList } from "./components/LabsList";
import { LabModeOverlay } from "./components/LabModeOverlay";

export default function VirtualLabPage() {
  // Main state
  const [activeTab, setActiveTab] = useState<"vms" | "templates" | "labs">("vms");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLabModeOpen, setIsLabModeOpen] = useState(false);
  
  // VM state
  const [vms, setVMs] = useState<any[]>([]);
  const [activeVM, setActiveVM] = useState<any | null>(null);
  
  // Template state
  const [templates, setTemplates] = useState<any[]>([]);
  
  // Labs state
  const [labs, setLabs] = useState<any[]>([]);
  
  // Mock data loading
  useEffect(() => {
    const fetchData = () => {
      // Simulate API call
      setTimeout(() => {
        // Mock VM data
        const mockVMs = [
          {
            id: "vm-1",
            name: "Web Server",
            template: "Ubuntu 22.04 LTS",
            status: "running",
            uptime: "2d 5h 30m",
            ip: "192.168.1.100",
            os: "linux",
            region: "US East",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "40 GB"
            },
            usage: {
              cpu: 35,
              ram: 42,
              storage: 28
            },
            createdAt: "2023-06-10T15:30:00Z"
          },
          {
            id: "vm-2",
            name: "Database Server",
            template: "CentOS 9 Stream",
            status: "running",
            uptime: "5d 12h 15m",
            ip: "192.168.1.101",
            os: "linux",
            region: "US East",
            specs: {
              cpu: "4 vCPU",
              ram: "8 GB",
              storage: "100 GB"
            },
            usage: {
              cpu: 65,
              ram: 78,
              storage: 52
            },
            createdAt: "2023-05-20T09:15:00Z"
          },
          {
            id: "vm-3",
            name: "Windows Test VM",
            template: "Windows Server 2022",
            status: "stopped",
            uptime: "",
            ip: "192.168.1.102",
            os: "windows",
            region: "US East",
            specs: {
              cpu: "4 vCPU",
              ram: "16 GB",
              storage: "120 GB"
            },
            usage: {
              cpu: 0,
              ram: 0,
              storage: 35
            },
            createdAt: "2023-07-05T11:45:00Z"
          },
          {
            id: "vm-4",
            name: "Development Environment",
            template: "Debian 12",
            status: "running",
            uptime: "12h 45m",
            ip: "192.168.1.103",
            os: "linux",
            region: "US East",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "60 GB"
            },
            usage: {
              cpu: 22,
              ram: 35,
              storage: 45
            },
            createdAt: "2023-07-10T14:20:00Z"
          }
        ];
        
        // Mock template data
        const mockTemplates = [
          {
            id: "template-1",
            name: "Ubuntu 22.04 LTS",
            description: "Latest LTS release of Ubuntu with extended support",
            difficulty: "Beginner",
            imageUrl: "/ubuntu-logo.png",
            os: "Linux",
            category: "Server",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "40 GB"
            },
            deploymentTime: "2 min",
            popular: true
          },
          {
            id: "template-2",
            name: "CentOS 9 Stream",
            description: "Enterprise-grade Linux distribution with long-term stability",
            difficulty: "Intermediate",
            imageUrl: "/centos-logo.png",
            os: "Linux",
            category: "Server",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "40 GB"
            },
            deploymentTime: "2 min"
          },
          {
            id: "template-3",
            name: "Windows Server 2022",
            description: "Microsoft's server operating system for enterprise workloads",
            difficulty: "Intermediate",
            imageUrl: "/windows-logo.png",
            os: "Windows",
            category: "Server",
            specs: {
              cpu: "4 vCPU",
              ram: "16 GB",
              storage: "120 GB"
            },
            deploymentTime: "5 min",
            popular: true
          },
          {
            id: "template-4",
            name: "Debian 12",
            description: "Stable and secure Linux distribution for servers",
            difficulty: "Beginner",
            imageUrl: "/debian-logo.png",
            os: "Linux",
            category: "Server",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "40 GB"
            },
            deploymentTime: "2 min"
          },
          {
            id: "template-5",
            name: "Alpine Linux",
            description: "Security-oriented, lightweight Linux distribution",
            difficulty: "Advanced",
            imageUrl: "/alpine-logo.png",
            os: "Linux",
            category: "Minimal",
            specs: {
              cpu: "1 vCPU",
              ram: "1 GB",
              storage: "10 GB"
            },
            deploymentTime: "1 min"
          },
          {
            id: "template-6",
            name: "Kali Linux",
            description: "Penetration testing and ethical hacking Linux distribution",
            difficulty: "Advanced",
            imageUrl: "/kali-logo.png",
            os: "Linux",
            category: "Security",
            specs: {
              cpu: "2 vCPU",
              ram: "4 GB",
              storage: "60 GB"
            },
            deploymentTime: "3 min"
          }
        ];
        
        // Mock labs data
        const mockLabs = [
          {
            id: "lab-1",
            title: "Intro to Linux Administration",
            description: "Learn the basics of Linux system administration",
            difficulty: "Beginner",
            estimatedTime: "1 hour",
            category: "Linux",
            progress: 100,
            status: "completed",
            tags: ["Linux", "CLI", "System Admin"]
          },
          {
            id: "lab-2",
            title: "Network Security Fundamentals",
            description: "Configure firewalls and secure network services",
            difficulty: "Intermediate",
            estimatedTime: "2 hours",
            category: "Security",
            progress: 60,
            status: "in-progress",
            tags: ["Security", "Firewall", "Network"]
          },
          {
            id: "lab-3",
            title: "Web Server Deployment",
            description: "Deploy and configure a production web server",
            difficulty: "Intermediate",
            estimatedTime: "1.5 hours",
            category: "Web",
            progress: 0,
            status: "not-started",
            tags: ["Apache", "Nginx", "Web Server"]
          },
          {
            id: "lab-4",
            title: "Advanced Penetration Testing",
            description: "Learn advanced penetration testing techniques",
            difficulty: "Advanced",
            estimatedTime: "3 hours",
            category: "Security",
            progress: 0,
            status: "locked",
            tags: ["Security", "Penetration Testing", "Kali Linux"]
          },
          {
            id: "lab-5",
            title: "Container Orchestration with Kubernetes",
            description: "Set up and manage a Kubernetes cluster",
            difficulty: "Advanced",
            estimatedTime: "2.5 hours",
            category: "Containers",
            progress: 25,
            status: "in-progress",
            tags: ["Kubernetes", "Containers", "DevOps"]
          },
          {
            id: "lab-6",
            title: "Database Server Configuration",
            description: "Install and configure MySQL/PostgreSQL database server",
            difficulty: "Intermediate",
            estimatedTime: "1.5 hours",
            category: "Database",
            progress: 0,
            status: "not-started",
            tags: ["MySQL", "PostgreSQL", "Database"]
          }
        ];
        
        setVMs(mockVMs);
        setTemplates(mockTemplates);
        setLabs(mockLabs);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  // Handle VM actions (start, stop, restart)
  const handleVMAction = (action: string, vmId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedVMs = vms.map(vm => {
        if (vm.id === vmId) {
          let updatedVM = { ...vm };
          
          switch (action) {
            case "start":
              updatedVM.status = "running";
              updatedVM.uptime = "0h 0m";
              break;
            case "stop":
              updatedVM.status = "stopped";
              updatedVM.uptime = "";
              break;
            case "restart":
              // No change in status since it's already running
              updatedVM.uptime = "0h 0m";
              break;
          }
          
          // Update active VM if it's the one being modified
          if (activeVM && activeVM.id === vmId) {
            setActiveVM(updatedVM);
          }
          
          return updatedVM;
        }
        return vm;
      });
      
      setVMs(updatedVMs);
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle VM selection
  const handleSelectVM = (vm: any) => {
    setActiveVM(vm);
  };
  
  // Handle going back to VM list
  const handleBackToList = () => {
    setActiveVM(null);
  };
  
  // Handle deploying a template
  const handleDeployTemplate = (templateId: string) => {
    setIsLoading(true);
    
    // Find the template
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      // Simulate API call
      setTimeout(() => {
        // Create a new VM based on the template
        const newVM = {
          id: `vm-${Date.now()}`,
          name: `New ${template.name}`,
          template: template.name,
          status: "provisioning",
          uptime: "",
          ip: `192.168.1.${Math.floor(Math.random() * 100) + 10}`,
          os: template.os.toLowerCase(),
          region: "US East",
          specs: template.specs,
          usage: {
            cpu: 0,
            ram: 0,
            storage: 5
          },
          createdAt: new Date().toISOString()
        };
        
        // Update VMs state
        setVMs([newVM, ...vms]);
        setIsLoading(false);
        
        // Switch to VMs tab and select the new VM
        setActiveTab("vms");
        setActiveVM(newVM);
        
        // Simulate VM becoming active after provisioning
        setTimeout(() => {
          setVMs(prevVMs => 
            prevVMs.map(vm => 
              vm.id === newVM.id 
                ? { ...vm, status: "running", uptime: "0h 0m" } 
                : vm
            )
          );
          
          if (activeVM && activeVM.id === newVM.id) {
            setActiveVM((prev: any) => ({ ...prev, status: "running", uptime: "0h 0m" }));
          }
        }, 5000);
      }, 1000);
    }
  };
  
  // Handle lab selection
  const handleSelectLab = (labId: string) => {
    console.log(`Selected lab: ${labId}`);
    // Would normally navigate to lab page or show lab details
  };
  
  // Refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Just toggle loading state as we're using mock data
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <Header 
        activeVM={activeVM}
        onBackClick={handleBackToList}
        onPracticeClick={() => setIsLabModeOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isLoading={isLoading}
        handleVMAction={handleVMAction}
      />
      
      <main className="flex-1 overflow-auto p-4 bg-slate-50">
        {activeVM ? (
          <VMDetail 
            vm={activeVM} 
            showSidebar={showSidebar}
            onVMAction={handleVMAction}
          />
        ) : (
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === "vms" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("vms")}
                  aria-current={activeTab === "vms" ? "page" : undefined}
                >
                  My Virtual Machines
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === "templates" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("templates")}
                  aria-current={activeTab === "templates" ? "page" : undefined}
                >
                  VM Templates
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === "labs" 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("labs")}
                  aria-current={activeTab === "labs" ? "page" : undefined}
                >
                  Lab Exercises
                </button>
              </div>
              
              {activeTab === "vms" && (
                <VMList 
                  vms={vms}
                  searchQuery={searchQuery}
                  filter={filter}
                  loading={isLoading}
                  onRefresh={handleRefresh}
                  onSelect={handleSelectVM}
                />
              )}
              
              {activeTab === "templates" && (
                <TemplateList 
                  templates={templates}
                  loading={isLoading}
                  onDeploy={handleDeployTemplate}
                />
              )}
              
              {activeTab === "labs" && (
                <LabsList 
                  labs={labs}
                  onSelectLab={handleSelectLab}
                />
              )}
            </div>
          </div>
        )}
      </main>
      
      <LabModeOverlay 
        isOpen={isLabModeOpen}
        onClose={() => setIsLabModeOpen(false)}
      />
    </div>
  );
} 