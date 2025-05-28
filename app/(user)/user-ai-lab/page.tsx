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
  BarChart3, BookOpen, BrainCircuit, ChevronDown, ChevronRight, ChevronUp,
  Code, Code2, Container, Database, FileBarChart, FileCode, FileSpreadsheet, 
  Folder, FolderOpen, GitFork, Globe, Layers, LineChart, Share2, Sliders,
  Table, Table2, Play, RefreshCw, Save, Settings, Database as DatabaseIcon,
  GitBranch, BookMarked, Sparkles, SquareTerminal, TerminalSquare, Terminal,
  Check, Clock, ArrowRight, Copy, Eye, MessageSquare, ListFilter, Search,
  Shuffle, Split, Zap, Network, Workflow, Brain, FunctionSquare, CircleEqual,
  CircleDotDashed, Boxes, BadgeInfo, Bot, Plus, Users, CheckCircle, Pause, XSquare,
  FileCog2
} from "lucide-react";

// Mock datasets for AI lab
const datasets = [
  {
    id: "mnist",
    name: "MNIST Handwritten Digits",
    description: "70,000 grayscale images of handwritten digits (28x28 pixels)",
    size: "11MB",
    type: "Image Classification",
    format: "CSV",
    samples: 70000,
    features: 784,
    lastAccessed: "2 hours ago",
    favorite: true,
    thumbnailUrl: "/datasets/mnist_thumb.png"
  },
  {
    id: "cifar10",
    name: "CIFAR-10",
    description: "60,000 color images across 10 classes (32x32 pixels)",
    size: "170MB",
    type: "Image Classification",
    format: "Binary",
    samples: 60000,
    features: 3072,
    lastAccessed: "Yesterday",
    favorite: false,
    thumbnailUrl: "/datasets/cifar_thumb.png"
  },
  {
    id: "boston_housing",
    name: "Boston Housing",
    description: "Housing values in suburbs of Boston with 14 features",
    size: "57KB",
    type: "Regression",
    format: "CSV",
    samples: 506,
    features: 14,
    lastAccessed: "3 days ago",
    favorite: true,
    thumbnailUrl: "/datasets/boston_thumb.png"
  },
  {
    id: "imdb_reviews",
    name: "IMDB Movie Reviews",
    description: "50,000 movie reviews labeled by sentiment (positive/negative)",
    size: "80MB",
    type: "Text Classification",
    format: "Text",
    samples: 50000,
    features: "N/A",
    lastAccessed: "1 week ago",
    favorite: false,
    thumbnailUrl: "/datasets/imdb_thumb.png"
  },
  {
    id: "wine_quality",
    name: "Wine Quality",
    description: "Red and white wine samples with physicochemical properties",
    size: "250KB",
    type: "Classification/Regression",
    format: "CSV",
    samples: 6497,
    features: 12,
    lastAccessed: "2 weeks ago",
    favorite: false,
    thumbnailUrl: "/datasets/wine_thumb.png"
  }
];

// Mock model templates
const modelTemplates = [
  {
    id: "cnn_classification",
    name: "CNN Image Classifier",
    description: "Convolutional neural network for image classification tasks",
    category: "Computer Vision",
    complexity: "Medium",
    environment: "TensorFlow/Keras",
    lastUsed: "1 day ago",
    popularity: 94,
    tags: ["CNN", "Classification", "Images", "Keras"]
  },
  {
    id: "lstm_text",
    name: "LSTM Text Classifier",
    description: "Long Short-Term Memory network for text classification and sentiment analysis",
    category: "NLP",
    complexity: "Medium",
    environment: "PyTorch",
    lastUsed: "3 days ago",
    popularity: 87,
    tags: ["LSTM", "NLP", "Text", "Classification"]
  },
  {
    id: "recommender",
    name: "Recommendation System",
    description: "Collaborative filtering model for recommendation systems",
    category: "Recommender Systems",
    complexity: "Advanced",
    environment: "TensorFlow",
    lastUsed: "1 week ago",
    popularity: 82,
    tags: ["Recommendations", "Collaborative Filtering", "Matrix Factorization"]
  },
  {
    id: "gan_image",
    name: "GAN Image Generator",
    description: "Generative Adversarial Network for creating synthetic images",
    category: "Generative AI",
    complexity: "Advanced",
    environment: "PyTorch",
    lastUsed: "2 weeks ago",
    popularity: 92,
    tags: ["GAN", "Generative", "Images"]
  },
  {
    id: "linear_regression",
    name: "Linear Regression",
    description: "Simple linear regression model for numeric predictions",
    category: "Regression",
    complexity: "Beginner",
    environment: "Scikit-learn",
    lastUsed: "Yesterday",
    popularity: 76,
    tags: ["Regression", "Linear", "Prediction", "Scikit-learn"]
  }
];

// Mock user AI projects
const userProjects = [
  {
    id: "project1",
    name: "Customer Churn Prediction",
    description: "ML model to predict which customers are likely to leave a service",
    lastEdited: "2 hours ago",
    createdAt: "2023-04-15",
    status: "In Progress",
    progress: 65,
    dataset: "customer_data.csv",
    modelType: "XGBoost Classifier",
    accuracy: 0.87,
    collaborators: 2
  },
  {
    id: "project2",
    name: "Image Style Transfer",
    description: "Neural style transfer application to transform images into artistic styles",
    lastEdited: "Yesterday",
    createdAt: "2023-03-22",
    status: "Completed",
    progress: 100,
    dataset: "art_images_collection",
    modelType: "CNN with VGG19",
    accuracy: "N/A",
    collaborators: 0
  },
  {
    id: "project3",
    name: "Sentiment Analysis Dashboard",
    description: "Real-time sentiment analysis of product reviews",
    lastEdited: "3 days ago",
    createdAt: "2023-05-10",
    status: "In Progress",
    progress: 42,
    dataset: "amazon_reviews.csv",
    modelType: "BERT Fine-tuned",
    accuracy: 0.91,
    collaborators: 1
  }
];

// Mock training jobs
const trainingJobs = [
  {
    id: "job1",
    name: "MNIST Classification Training",
    status: "Running",
    progress: 67,
    startTime: "2023-06-10T14:30:00",
    estimatedCompletion: "2023-06-10T15:45:00",
    dataset: "mnist",
    modelType: "CNN",
    resourceUsage: {
      cpu: "4 cores",
      memory: "8GB",
      gpu: "1x NVIDIA T4"
    }
  },
  {
    id: "job2",
    name: "Sentiment Analysis Fine-tuning",
    status: "Queued",
    progress: 0,
    startTime: null,
    estimatedCompletion: null,
    dataset: "imdb_reviews",
    modelType: "BERT",
    resourceUsage: {
      cpu: "8 cores",
      memory: "16GB",
      gpu: "2x NVIDIA T4"
    }
  },
  {
    id: "job3",
    name: "Boston Housing Regression",
    status: "Completed",
    progress: 100,
    startTime: "2023-06-09T10:15:00",
    estimatedCompletion: "2023-06-09T11:20:00",
    dataset: "boston_housing",
    modelType: "Random Forest",
    resourceUsage: {
      cpu: "4 cores",
      memory: "4GB",
      gpu: "None"
    }
  }
];

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

// Dataset tab component
function DatasetsTab({ datasets }: { datasets: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Image Classification", "Regression", "Text Classification", "Time Series"];
  
  // Filter datasets based on search and category
  const filteredDatasets = datasets.filter((dataset: any) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dataset.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Header with search and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Datasets</h2>
            <p className="text-muted-foreground">Explore and manage AI/ML datasets</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search datasets..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <ListFilter className="h-4 w-4" />
            </Button>
            
            <Button className="shrink-0 gap-1">
              <Sparkles className="h-4 w-4 mr-1" />
              <span>Import Dataset</span>
            </Button>
          </div>
        </div>
        
        {/* Dataset cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge>{dataset.type}</Badge>
                  {dataset.favorite && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
                      <BookMarked className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mt-1">{dataset.name}</CardTitle>
                <CardDescription className="line-clamp-2">{dataset.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>{dataset.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileBarChart className="h-4 w-4 text-muted-foreground" />
                    <span>{dataset.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Table2 className="h-4 w-4 text-muted-foreground" />
                    <span>{dataset.samples.toLocaleString()} samples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span>{dataset.features} features</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground border-t">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{dataset.lastAccessed}</span>
                </div>
                
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>Preview</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Create new dataset card */}
        <Card className="mt-6 border-dashed border-2 flex items-center justify-center h-[250px] cursor-pointer hover:bg-slate-50/50 transition-colors">
          <div className="text-center p-6">
            <div className="mx-auto rounded-full bg-blue-50 p-3 w-fit mb-4">
              <Database className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload New Dataset</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your own dataset or connect to external sources
            </p>
            <Button>Upload Dataset</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Main AI Lab Page Component
export default function AILabPage() {
  const [activeTab, setActiveTab] = useState<string>("datasets");
  
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Laboratory</h1>
          <Badge variant="outline" className="ml-2 bg-purple-50">Beta</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 hidden md:flex">
            <BookOpen className="h-4 w-4 mr-1" />
            Documentation
          </Button>
          <Button size="sm" className="gap-1">
            <BrainCircuit className="h-4 w-4 mr-1" />
            New Project
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b bg-white">
            <div className="max-w-screen-xl mx-auto">
              <TabsList className="h-12 bg-transparent border-b-0 p-0 rounded-none w-full justify-start overflow-x-auto">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="datasets" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Datasets
                </TabsTrigger>
                <TabsTrigger 
                  value="models" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Models
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Training
                </TabsTrigger>
                <TabsTrigger 
                  value="deployments" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Deployments
                </TabsTrigger>
                <TabsTrigger 
                  value="notebooks" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  Notebooks
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {/* Tab content */}
          <TabsContent value="dashboard" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              {/* Dashboard content will go here */}
              <div className="p-8 text-center text-muted-foreground">
                <BrainCircuit className="h-16 w-16 mx-auto mb-4 text-purple-200" />
                <p className="text-lg">Dashboard content coming soon</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="datasets" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              <DatasetsTab datasets={datasets} />
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              <ModelsTab templates={modelTemplates} />
            </div>
          </TabsContent>
          
          <TabsContent value="training" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              <TrainingTab trainingJobs={trainingJobs} />
            </div>
          </TabsContent>
          
          <TabsContent value="deployments" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              <DeploymentsTab />
            </div>
          </TabsContent>
          
          <TabsContent value="notebooks" className="mt-0 h-full">
            <div className="bg-slate-50 h-full">
              <NotebooksTab />
            </div>
          </TabsContent>
          
          {/* Other tab contents will be implemented next */}
        </Tabs>
      </div>
    </div>
  )
}

// Models tab component
function ModelsTab({ templates }: { templates: any[] }) {
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
            <Card key={template.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="pb-2 relative">
                {template.popularity > 90 && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-100 text-amber-800">Popular</Badge>
                  </div>
                )}
                <Badge className={
                  template.complexity === "Beginner" 
                    ? "bg-green-100 text-green-800" 
                    : template.complexity === "Medium"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }>
                  {template.complexity}
                </Badge>
                <CardTitle className="mt-1">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="flex items-center gap-2 text-sm mb-3">
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant="outline">{template.environment}</Badge>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {template.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between items-center mb-1">
                    <span>Popularity</span>
                    <span className="font-medium">{template.popularity}%</span>
                  </div>
                  <Progress value={template.popularity} className="h-1.5" />
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground border-t">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Used {template.lastUsed}</span>
                </div>
                
                <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                  <span>Use Template</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Create custom model section */}
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
                  
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
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

// Training tab component
function TrainingTab({ trainingJobs }: { trainingJobs: any[] }) {
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
  const getTimeRemaining = (job: any) => {
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
                        <Database className="h-4 w-4" />
                        <span>{job.dataset}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BrainCircuit className="h-4 w-4" />
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

// Mock deployments data
const deployments = [
  {
    id: "deploy1",
    name: "Customer Churn Predictor API",
    status: "Active",
    type: "REST API",
    model: "XGBoost Classifier",
    version: "v1.3",
    lastDeployed: "2023-06-02T14:30:00",
    endpoint: "https://api.example.com/v1/predict/churn",
    performance: {
      availability: 99.98,
      responseTime: 120, // ms
      requestsPerMinute: 42
    },
    resources: {
      instances: 2,
      cpu: "2 cores per instance",
      memory: "4GB per instance"
    }
  },
  {
    id: "deploy2",
    name: "Image Classifier Service",
    status: "Active",
    type: "gRPC Service",
    model: "EfficientNetB4",
    version: "v2.1",
    lastDeployed: "2023-06-07T10:15:00",
    endpoint: "grpc://ml-services.example.com/image-classifier",
    performance: {
      availability: 99.95,
      responseTime: 230, // ms
      requestsPerMinute: 28
    },
    resources: {
      instances: 3,
      cpu: "4 cores per instance",
      memory: "8GB per instance"
    }
  },
  {
    id: "deploy3",
    name: "Sentiment Analysis Endpoint",
    status: "Deploying",
    type: "REST API",
    model: "BERT Fine-tuned",
    version: "v1.0",
    lastDeployed: "2023-06-10T09:45:00",
    endpoint: "https://api.example.com/v1/analyze/sentiment",
    performance: {
      availability: null,
      responseTime: null,
      requestsPerMinute: null
    },
    resources: {
      instances: 1,
      cpu: "4 cores per instance",
      memory: "8GB per instance"
    }
  },
  {
    id: "deploy4",
    name: "Recommendation Engine",
    status: "Degraded",
    type: "Batch Processing",
    model: "Matrix Factorization",
    version: "v3.2",
    lastDeployed: "2023-05-20T16:20:00",
    endpoint: "s3://batch-jobs.example.com/recommendations/",
    performance: {
      availability: 92.31,
      responseTime: 5400, // ms (batch jobs are slower)
      requestsPerMinute: 0.5
    },
    resources: {
      instances: 1,
      cpu: "8 cores per instance",
      memory: "32GB per instance"
    }
  }
];

// Deployments tab component
function DeploymentsTab() {
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
                {deployment.status === "Active" && deployment.performance.availability !== null && (
                  <div>
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Availability</span>
                          <span className={`text-xs font-medium ${
                            deployment.performance.availability > 99.9 ? 'text-green-600' : 
                            deployment.performance.availability > 99 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {deployment.performance.availability}%
                          </span>
                        </div>
                        <Progress 
                          value={deployment.performance.availability} 
                          className={`h-1.5 ${
                            deployment.performance.availability > 99.9 ? 'bg-green-500' : 
                            deployment.performance.availability > 99 ? 'bg-amber-500' : 
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
                            {deployment.performance.responseTime}ms
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
                            {deployment.performance.requestsPerMinute}/min
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

// Notebooks tab component
function NotebooksTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  
  // Mock notebooks data
  const notebooks = [
    {
      id: "nb1",
      name: "MNIST Classification Demo",
      description: "Step-by-step implementation of a CNN classifier for MNIST dataset",
      type: "Tutorial",
      lastEdited: "2023-06-08T15:30:00",
      author: "You",
      kernelStatus: "Idle",
      language: "Python",
      tags: ["CNN", "Classification", "TensorFlow"]
    },
    {
      id: "nb2",
      name: "Customer Churn Analysis",
      description: "Data exploration and feature engineering for customer churn prediction",
      type: "EDA",
      lastEdited: "2023-06-05T11:20:00",
      author: "You",
      kernelStatus: "Dead",
      language: "Python",
      tags: ["XGBoost", "Pandas", "Classification"]
    },
    {
      id: "nb3",
      name: "NLP Text Preprocessing",
      description: "Text cleaning and preprocessing techniques for NLP tasks",
      type: "Utility",
      lastEdited: "2023-05-28T09:45:00",
      author: "You",
      kernelStatus: "Running",
      language: "Python",
      tags: ["NLP", "Text", "BERT"]
    },
    {
      id: "nb4",
      name: "Image Augmentation Pipeline",
      description: "Generating augmented image datasets for improved model training",
      type: "Data Processing",
      lastEdited: "2023-05-20T14:15:00",
      author: "You",
      kernelStatus: "Idle",
      language: "Python",
      tags: ["Computer Vision", "Data Augmentation"]
    }
  ];
  
  const notebookTypes = ["All", "Tutorial", "EDA", "Utility", "Data Processing", "Model Training"];
  
  // Filter notebooks based on search and type
  const filteredNotebooks = notebooks.filter((notebook) => {
    const matchesSearch = notebook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notebook.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || notebook.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Function to get kernel status color
  const getKernelStatusColor = (status: string) => {
    switch(status) {
      case 'Running': 
        return 'bg-green-100 text-green-800';
      case 'Idle': 
        return 'bg-slate-100 text-slate-800';
      case 'Dead': 
        return 'bg-red-100 text-red-800';
      case 'Starting': 
        return 'bg-amber-100 text-amber-800';
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
            <h2 className="text-2xl font-semibold">AI Notebooks</h2>
            <p className="text-muted-foreground">Interactive Jupyter-style notebooks for data exploration and model development</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notebooks..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Notebook type" />
              </SelectTrigger>
              <SelectContent>
                {notebookTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="gap-1">
              <Code2 className="h-4 w-4 mr-1" />
              <span>New Notebook</span>
            </Button>
          </div>
        </div>
        
        {/* Notebooks environment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit">
                    <SquareTerminal className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="bg-white/80 text-blue-600 border-blue-200">
                    Default
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-1">Python Data Science</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  TensorFlow, PyTorch, scikit-learn, pandas, and other DS libraries
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge variant="secondary" className="text-xs bg-white/50">Python 3.10</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">TensorFlow 2.12</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">PyTorch 2.0</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">+20 more</Badge>
                </div>
                <Button variant="outline" className="gap-1 bg-white/80 border-blue-200">
                  <span>Launch Environment</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-100 rounded-xl w-fit">
                    <Code2 className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge variant="outline" className="bg-white/80 text-green-600 border-green-200">
                    NLP
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-1">NLP Environment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  BERT, Transformers, spaCy, NLTK, Hugging Face libraries
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge variant="secondary" className="text-xs bg-white/50">Python 3.10</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">Transformers</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">spaCy</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">+12 more</Badge>
                </div>
                <Button variant="outline" className="gap-1 bg-white/80 border-green-200">
                  <span>Launch Environment</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl w-fit">
                    <Boxes className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="bg-white/80 text-purple-600 border-purple-200">
                    Vision
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-1">Computer Vision</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  OpenCV, PIL, TorchVision, image processing tools
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge variant="secondary" className="text-xs bg-white/50">Python 3.10</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">OpenCV</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">Pillow</Badge>
                  <Badge variant="secondary" className="text-xs bg-white/50">+15 more</Badge>
                </div>
                <Button variant="outline" className="gap-1 bg-white/80 border-purple-200">
                  <span>Launch Environment</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Notebooks list */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Notebooks</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        {filteredNotebooks.length > 0 ? (
          <div className="space-y-4">
            {filteredNotebooks.map((notebook) => (
              <Card key={notebook.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline">{notebook.type}</Badge>
                      <CardTitle className="mt-1">{notebook.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{notebook.description}</CardDescription>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge className={getKernelStatusColor(notebook.kernelStatus)}>
                        <span className="flex items-center">
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            notebook.kernelStatus === 'Running' ? 'bg-green-600 animate-pulse' : 
                            'bg-current'
                          }`}></span>
                          Kernel: {notebook.kernelStatus}
                        </span>
                      </Badge>
                      
                      <div className="text-xs text-muted-foreground mt-2">
                        Last edited: {new Date(notebook.lastEdited).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {notebook.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Code2 className="h-4 w-4" />
                      <span>{notebook.language}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileCog2 className="h-4 w-4 mr-1" />
                      <span>Duplicate</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </Button>
                  </div>
                  
                  <Button className="gap-1">
                    <span>Open Notebook</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-slate-50">
            <Code2 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-1">No notebooks found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new notebook or adjust your search filters
            </p>
            <Button>Create Notebook</Button>
          </div>
        )}
        
        {/* Jupyter-style notebook preview */}
        <div className="mt-12">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle>Quick Notebook</CardTitle>
              <CardDescription>
                Start coding directly without creating a full notebook
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden mb-4">
                <div className="bg-slate-100 px-4 py-2 border-b flex justify-between items-center">
                  <span className="text-xs font-medium">Cell [1]</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-3 font-mono text-sm">
                  <pre className="text-purple-700">import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf

# Your code here
</pre>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="sm">
                  <span>Continue in Full Notebook</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 