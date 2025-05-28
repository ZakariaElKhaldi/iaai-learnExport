import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModelCard } from "./ModelCard";
import { 
  ArrowRight, BrainCircuit, CheckCircle, Clock, GitBranch, ListFilter, 
  Plus, Search, Users 
} from "lucide-react";

interface ModelTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: string;
  environment: string;
  lastUsed: string;
  popularity: number;
  tags: string[];
}

interface UserProject {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  createdAt: string;
  status: string;
  progress: number;
  dataset: string;
  modelType: string;
  accuracy: number | string;
  collaborators: number;
}

interface ModelsTabProps {
  templates: ModelTemplate[];
  userProjects: UserProject[];
}

export function ModelsTab({ templates, userProjects }: ModelsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("All");
  
  const categories = ["All", "Computer Vision", "NLP", "Recommender Systems", "Generative AI", "Regression"];
  const complexities = ["All", "Beginner", "Medium", "Advanced"];
  
  // Filter templates based on search, category, and complexity
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesComplexity = selectedComplexity === "All" || template.complexity === selectedComplexity;
    return matchesSearch && matchesCategory && matchesComplexity;
  });
  
  const handleUseTemplate = (id: string) => {
    console.log(`Use template: ${id}`);
    // Implementation for using a template
  };
  
  const handleOpenProject = (id: string) => {
    console.log(`Open project: ${id}`);
    // Implementation for opening a project
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
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  }
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Header and search/filter section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Model Templates</h2>
            <p className="text-muted-foreground">Pre-configured models to jumpstart your ML projects</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search models..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                {complexities.map((complexity) => (
                  <SelectItem key={complexity} value={complexity}>{complexity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <ListFilter className="h-4 w-4" />
            </Button>
            
            <Button className="shrink-0 gap-1">
              <Plus className="h-4 w-4 mr-1" />
              <span>Custom Model</span>
            </Button>
          </div>
        </div>
        
        {/* Model templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <ModelCard 
              key={template.id}
              template={template}
              onUseTemplate={handleUseTemplate}
            />
          ))}
        </div>
        
        {/* Your projects section */}
        <div className="mt-12 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Projects</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    {project.collaborators > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{project.collaborators}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="mt-1">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-3">
                  {project.progress < 100 ? (
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5" />
                    </div>
                  ) : (
                    <div className="mb-3 flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span>{project.modelType}</span>
                    </div>
                    {project.accuracy !== "N/A" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span>{typeof project.accuracy === 'number' ? `${(project.accuracy * 100).toFixed(1)}%` : project.accuracy}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground border-t">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Edited {project.lastEdited}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-blue-600"
                    onClick={() => handleOpenProject(project.id)}
                  >
                    <span>Open</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* New project card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 min-h-[260px] cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="mx-auto rounded-full bg-blue-50 p-3 w-fit mb-4">
                <BrainCircuit className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-1">Create New Project</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Start a new ML project from scratch or use a template
              </p>
              <Button>New Project</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 