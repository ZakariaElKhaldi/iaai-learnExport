import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, BarChart3, BrainCircuit, ChevronUp, Clock, Code, Copy, 
  GitBranch, Globe, LineChart, ListFilter, Search
} from "lucide-react";

interface Deployment {
  id: string;
  name: string;
  status: string;
  type: string;
  model: string;
  version: string;
  lastDeployed: string;
  endpoint: string;
  performance?: {
    availability: number | null;
    responseTime: number | null;
    requestsPerMinute: number | null;
  };
  resources: {
    instances: number;
    cpu: string;
    memory: string;
  };
}

interface DeploymentsTabProps {
  deployments: Deployment[];
}

export function DeploymentsTab({ deployments }: DeploymentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  
  const statuses = ["All", "Active", "Degraded", "Deploying", "Failed", "Stopped"];
  
  // Filter deployments based on search and status
  const filteredDeployments = deployments.filter((dep) => {
    const matchesSearch = dep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dep.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || dep.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Function to get appropriate badge color based on status
  const getDeploymentStatusColor = (status: string) => {
    switch(status) {
      case 'Active': 
        return 'bg-green-100 text-green-800';
      case 'Degraded': 
        return 'bg-amber-100 text-amber-800';
      case 'Deploying': 
        return 'bg-blue-100 text-blue-800';
      case 'Failed': 
        return 'bg-red-100 text-red-800';
      case 'Stopped': 
        return 'bg-slate-100 text-slate-800';
      default: 
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Header with search and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Model Deployments</h2>
            <p className="text-muted-foreground">Deploy and monitor your AI models in production</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search deployments..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="gap-1">
              <Globe className="h-4 w-4 mr-1" />
              <span>Deploy Model</span>
            </Button>
          </div>
        </div>
        
        {/* Deployments overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Deployments</CardTitle>
              <div className="text-2xl font-bold">2</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span>Healthy</span>
                <span className="text-green-600">2</span>
              </div>
              <Progress value={100} className="h-1 mt-1 mb-2" />
              <div className="text-xs text-muted-foreground">All systems operational</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total API Requests</CardTitle>
              <div className="text-2xl font-bold">1.2M</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>23% from last week</span>
              </div>
              <div className="mt-4 h-10 border-l-2 border-green-500 pl-3 text-xs flex flex-col justify-center">
                <div>94.3K requests today</div>
                <div className="text-muted-foreground">70.1K avg/day</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
              <div className="text-2xl font-bold">156ms</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-amber-600">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>5% from last week</span>
              </div>
              <div className="mt-2 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span>p95</span>
                  <span className="font-medium">230ms</span>
                </div>
                <Progress value={95} className="h-1 mb-2" />
                <div className="flex items-center justify-between mb-1">
                  <span>p50</span>
                  <span className="font-medium">125ms</span>
                </div>
                <Progress value={50} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Deployments list */}
        <h3 className="text-lg font-semibold mb-4">Deployed Models</h3>
        
        <div className="space-y-4">
          {filteredDeployments.map((deployment) => (
            <Card key={deployment.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className={getDeploymentStatusColor(deployment.status)}>
                      {deployment.status}
                    </Badge>
                    <CardTitle className="mt-1">{deployment.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1.5">
                        <BrainCircuit className="h-4 w-4" />
                        <span>{deployment.model}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Code className="h-4 w-4" />
                        <span>{deployment.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GitBranch className="h-4 w-4" />
                        <span>{deployment.version}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      <span>View Metrics</span>
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <span>Manage</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Endpoint</div>
                    <div className="flex items-center gap-1.5">
                      <code className="text-sm p-1 bg-slate-100 rounded whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        {deployment.endpoint}
                      </code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Resources</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {deployment.resources.instances} {deployment.resources.instances > 1 ? 'instances' : 'instance'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{deployment.resources.cpu}</Badge>
                      <Badge variant="outline" className="text-xs">{deployment.resources.memory}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Last Deployed</div>
                    <div className="text-sm">
                      {new Date(deployment.lastDeployed).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Only show performance metrics for active deployments */}
                {deployment.status === "Active" && deployment.performance?.availability !== null && (
                  <div>
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Availability</span>
                          <span className={`text-xs font-medium ${
                            deployment.performance?.availability && deployment.performance.availability > 99.9 ? 'text-green-600' : 
                            deployment.performance?.availability && deployment.performance.availability > 99 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {deployment.performance?.availability}%
                          </span>
                        </div>
                        <Progress 
                          value={deployment.performance?.availability || 0} 
                          className={`h-1.5 ${
                            deployment.performance?.availability && deployment.performance.availability > 99.9 ? 'bg-green-500' : 
                            deployment.performance?.availability && deployment.performance.availability > 99 ? 'bg-amber-500' : 
                            'bg-red-500'
                          }`}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {deployment.performance?.responseTime}ms
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Avg. Response Time
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <LineChart className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {deployment.performance?.requestsPerMinute}/min
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Request Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="border-t pt-3 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <span>Logs</span>
                </Button>
                {deployment.status === "Active" ? (
                  <Button variant="outline" size="sm" className="text-amber-600 border-amber-200">
                    <span>Stop</span>
                  </Button>
                ) : deployment.status === "Stopped" ? (
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                    <span>Start</span>
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 