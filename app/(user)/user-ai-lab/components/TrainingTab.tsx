import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, XSquare, Pause, Zap, Clock, LineChart
} from "lucide-react";

interface TrainingJob {
  id: string;
  name: string;
  status: string;
  progress: number;
  startTime: string | null;
  estimatedCompletion: string | null;
  dataset: string;
  modelType: string;
  resourceUsage: {
    cpu: string;
    memory: string;
    gpu: string;
  };
}

interface TrainingTabProps {
  trainingJobs: TrainingJob[];
}

export function TrainingTab({ trainingJobs }: TrainingTabProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  
  // Filter jobs based on completion status if needed
  const filteredJobs = showCompleted ? trainingJobs : trainingJobs.filter(job => job.status !== "Completed");
  
  // Function to format time
  const formatTime = (timeString: string | null) => {
    if (!timeString) return "N/A";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Function to calculate time remaining
  const getTimeRemaining = (job: TrainingJob) => {
    if (job.status === "Completed") return "Completed";
    if (job.status === "Queued") return "Waiting to start";
    if (!job.estimatedCompletion) return "Calculating...";
    
    const now = new Date();
    const estimatedCompletion = new Date(job.estimatedCompletion);
    const diffMs = estimatedCompletion.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Finishing up...";
    
    const diffMins = Math.round(diffMs / 60000);
    return diffMins <= 1 ? "< 1 minute" : `~${diffMins} minutes`;
  };
  
  // Function to get appropriate badge colors based on status
  function getStatusColor(status: string) {
    switch(status.toLowerCase()) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'queued':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Header section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Model Training</h2>
            <p className="text-muted-foreground">Manage and monitor your AI model training jobs</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-completed"
                className="mr-2"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
              />
              <label htmlFor="show-completed" className="text-sm text-muted-foreground">
                Show completed jobs
              </label>
            </div>
            
            <Button className="gap-1">
              <Zap className="h-4 w-4 mr-1" />
              <span>New Training Job</span>
            </Button>
          </div>
        </div>
        
        {/* Resource allocation panel */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resource Allocation</CardTitle>
            <CardDescription>Current usage of training resources</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Utilization</span>
                  <span className="font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
                <div className="text-xs text-muted-foreground">12/16 cores in use</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
                <div className="text-xs text-muted-foreground">24GB/56GB allocated</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>GPU Allocation</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-muted-foreground">3/4 GPUs in use</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active training jobs */}
        <h3 className="text-lg font-semibold mb-4">Training Jobs</h3>
        
        <div className="space-y-4 mb-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    <CardTitle className="mt-1 text-lg">{job.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">Dataset:</span>
                        <span>{job.dataset}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">Model:</span>
                        <span>{job.modelType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {job.status === "Running" && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>View Metrics</span>
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      {job.status === "Completed" ? "View Results" : "Manage"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Start Time</div>
                    <div className="text-sm font-medium">
                      {job.startTime ? new Date(job.startTime).toLocaleString() : "Not started"}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Est. Completion</div>
                    <div className="text-sm font-medium">
                      {job.estimatedCompletion ? new Date(job.estimatedCompletion).toLocaleString() : "N/A"}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Time Remaining</div>
                    <div className="text-sm font-medium">
                      {getTimeRemaining(job)}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Resources</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{job.resourceUsage.cpu}</Badge>
                      <Badge variant="outline" className="text-xs">{job.resourceUsage.memory}</Badge>
                      <Badge variant="outline" className="text-xs">{job.resourceUsage.gpu}</Badge>
                    </div>
                  </div>
                </div>
                
                {job.status === "Running" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              
              {job.status !== "Completed" && (
                <CardFooter className="border-t pt-2 flex justify-end gap-2">
                  {job.status === "Running" && (
                    <Button variant="outline" size="sm" className="text-amber-600 border-amber-200">
                      <Pause className="h-4 w-4 mr-1" />
                      <span>Pause</span>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                    <XSquare className="h-4 w-4 mr-1" />
                    <span>Cancel</span>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        
        {/* Training history chart placeholder */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Training History</CardTitle>
            <CardDescription>Performance metrics from your recent models</CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* This would be replaced with a real chart component */}
            <div className="h-72 border border-dashed rounded-md flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                <p className="text-muted-foreground">Training history charts would be displayed here</p>
                <p className="text-xs text-muted-foreground mt-1">Accuracy, loss, and other metrics over time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 