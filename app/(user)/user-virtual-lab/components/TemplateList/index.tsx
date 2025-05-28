"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HardDrive, 
  Server, 
  Search, 
  X, 
  Filter, 
  Cpu, 
  BarChart, 
  Clock, 
  ArrowRight, 
  Play
} from "lucide-react";
import { motion } from "framer-motion";
import { getDifficultyColor } from "../../utils";

interface Template {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  imageUrl: string;
  os: string;
  category: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
  };
  deploymentTime: string;
  popular?: boolean;
}

interface TemplateListProps {
  templates: Template[];
  loading: boolean;
  onDeploy: (templateId: string) => void;
}

export function TemplateList({ templates, loading, onDeploy }: TemplateListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOS, setSelectedOS] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique OS types
  const osTypes = ["all", ...Array.from(new Set(templates.map(template => template.os)))];
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(templates.map(template => template.category)))];
  
  // Get unique difficulty levels
  const difficultyLevels = ["all", ...Array.from(new Set(templates.map(template => template.difficulty)))];
  
  // Update filtered templates when templates change
  useEffect(() => {
    setFilteredTemplates(templates);
  }, [templates]);
  
  // Apply filters
  const applyFilters = () => {
    let filtered = [...templates];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(query) || 
        template.description.toLowerCase().includes(query)
      );
    }
    
    // Apply OS filter
    if (selectedOS !== "all") {
      filtered = filtered.filter(template => 
        template.os.toLowerCase() === selectedOS.toLowerCase()
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(template => 
        template.category === selectedCategory
      );
    }
    
    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(template => 
        template.difficulty === selectedDifficulty
      );
    }
    
    setFilteredTemplates(filtered);
  };
  
  // Handle filter changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedOS, selectedCategory, selectedDifficulty, templates]);
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedOS("all");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
  };
  
  // Toggle filters panel
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search box */}
          <div className="relative flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-9 pr-9"
              aria-label="Search VM templates"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1.5 top-1.5 h-7 w-7"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          
          {/* Filter button */}
          <Button
            variant="outline"
            className="md:w-auto gap-2 h-10"
            onClick={toggleFilters}
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
            aria-label="Toggle filters"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        
        {/* Filter panel */}
        {isFilterOpen && (
          <motion.div
            id="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-slate-50 rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* OS filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Operating System</h3>
                <Select value={selectedOS} onValueChange={setSelectedOS}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS" />
                  </SelectTrigger>
                  <SelectContent>
                    {osTypes.map(os => (
                      <SelectItem key={os} value={os}>
                        {os === "all" ? "All Operating Systems" : os}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Category filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Difficulty filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Difficulty Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
                aria-label="Clear all filters"
              >
                <X className="h-3.5 w-3.5" />
                <span>Clear Filters</span>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Tabs for different template views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
          <TabsTrigger value="windows">Windows</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Server className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find templates
              </p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template, index) => {
                const difficultyColors = getDifficultyColor(template.difficulty);
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col group hover:shadow-md transition-all border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 capitalize">
                            {template.os}
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {template.name}
                          {template.popular && (
                            <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4 flex-grow">
                        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-md mb-3">
                          <div className="flex flex-col items-center">
                            <Cpu className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.cpu}</div>
                              <div className="text-xs text-muted-foreground">CPU</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <BarChart className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.ram}</div>
                              <div className="text-xs text-muted-foreground">RAM</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <HardDrive className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.storage}</div>
                              <div className="text-xs text-muted-foreground">Storage</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Deployment Time: {template.deploymentTime}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          className="w-full justify-between"
                          onClick={() => onDeploy(template.id)}
                          disabled={loading}
                        >
                          <div className="flex items-center gap-1.5">
                            <Play className="h-3.5 w-3.5" />
                            <span>Deploy VM</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates
              .filter(template => template.popular)
              .map((template, index) => {
                const difficultyColors = getDifficultyColor(template.difficulty);
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col group hover:shadow-md transition-all border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 capitalize">
                            {template.os}
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {template.name}
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4 flex-grow">
                        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-md mb-3">
                          <div className="flex flex-col items-center">
                            <Cpu className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.cpu}</div>
                              <div className="text-xs text-muted-foreground">CPU</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <BarChart className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.ram}</div>
                              <div className="text-xs text-muted-foreground">RAM</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <HardDrive className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.storage}</div>
                              <div className="text-xs text-muted-foreground">Storage</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Deployment Time: {template.deploymentTime}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          className="w-full justify-between"
                          onClick={() => onDeploy(template.id)}
                          disabled={loading}
                        >
                          <div className="flex items-center gap-1.5">
                            <Play className="h-3.5 w-3.5" />
                            <span>Deploy VM</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </TabsContent>
        
        <TabsContent value="linux">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates
              .filter(template => template.os.toLowerCase() === "linux")
              .map((template, index) => {
                const difficultyColors = getDifficultyColor(template.difficulty);
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col group hover:shadow-md transition-all border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 capitalize">
                            {template.os}
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {template.name}
                          {template.popular && (
                            <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4 flex-grow">
                        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-md mb-3">
                          <div className="flex flex-col items-center">
                            <Cpu className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.cpu}</div>
                              <div className="text-xs text-muted-foreground">CPU</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <BarChart className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.ram}</div>
                              <div className="text-xs text-muted-foreground">RAM</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <HardDrive className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.storage}</div>
                              <div className="text-xs text-muted-foreground">Storage</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Deployment Time: {template.deploymentTime}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          className="w-full justify-between"
                          onClick={() => onDeploy(template.id)}
                          disabled={loading}
                        >
                          <div className="flex items-center gap-1.5">
                            <Play className="h-3.5 w-3.5" />
                            <span>Deploy VM</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </TabsContent>
        
        <TabsContent value="windows">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates
              .filter(template => template.os.toLowerCase() === "windows")
              .map((template, index) => {
                const difficultyColors = getDifficultyColor(template.difficulty);
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col group hover:shadow-md transition-all border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {template.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 capitalize">
                            {template.os}
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {template.name}
                          {template.popular && (
                            <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-4 flex-grow">
                        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-md mb-3">
                          <div className="flex flex-col items-center">
                            <Cpu className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.cpu}</div>
                              <div className="text-xs text-muted-foreground">CPU</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <BarChart className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.ram}</div>
                              <div className="text-xs text-muted-foreground">RAM</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <HardDrive className="h-4 w-4 text-slate-600 mb-1" />
                            <div className="text-center">
                              <div className="text-xs font-medium">{template.specs.storage}</div>
                              <div className="text-xs text-muted-foreground">Storage</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Deployment Time: {template.deploymentTime}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          className="w-full justify-between"
                          onClick={() => onDeploy(template.id)}
                          disabled={loading}
                        >
                          <div className="flex items-center gap-1.5">
                            <Play className="h-3.5 w-3.5" />
                            <span>Deploy VM</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 