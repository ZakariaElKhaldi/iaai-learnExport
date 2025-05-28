"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Book, 
  Clock, 
  Search, 
  X, 
  BookOpen, 
  Award, 
  PlayCircle, 
  CheckCircle2, 
  LockKeyhole, 
  ChevronRight,
  Filter,
  Server
} from "lucide-react";
import { motion } from "framer-motion";
import { getDifficultyColor } from "../../utils";

interface LabExercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  category: string;
  progress: number;
  status: "completed" | "in-progress" | "not-started" | "locked";
  imageUrl?: string;
  tags: string[];
}

interface LabsListProps {
  labs: LabExercise[];
  onSelectLab: (labId: string) => void;
}

export function LabsList({ labs, onSelectLab }: LabsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredLabs, setFilteredLabs] = useState<LabExercise[]>(labs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(labs.map(lab => lab.category)))];
  
  // Apply filters
  const applyFilters = () => {
    let filtered = [...labs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lab => 
        lab.title.toLowerCase().includes(query) || 
        lab.description.toLowerCase().includes(query) ||
        lab.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(lab => lab.category === selectedCategory);
    }
    
    setFilteredLabs(filtered);
  };
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setFilteredLabs(labs);
  };
  
  // Toggle filters panel
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Debounce search
    setTimeout(() => {
      applyFilters();
    }, 300);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters();
  };
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <PlayCircle className="h-3 w-3" />
            <span>In Progress</span>
          </Badge>
        );
      case "locked":
        return (
          <Badge className="bg-slate-100 text-slate-800 flex items-center gap-1">
            <LockKeyhole className="h-3 w-3" />
            <span>Locked</span>
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-800 flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>Not Started</span>
          </Badge>
        );
    }
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
              onChange={handleSearch}
              placeholder="Search labs..."
              className="pl-9 pr-9"
              aria-label="Search lab exercises"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1.5 top-1.5 h-7 w-7"
                onClick={() => {
                  setSearchQuery("");
                  applyFilters();
                }}
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
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className="capitalize"
                      aria-pressed={selectedCategory === category}
                    >
                      {category === "all" ? "All Categories" : category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
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
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Tabs for different lab types */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>All Labs</span>
          </TabsTrigger>
          <TabsTrigger value="recommended" className="flex gap-1.5">
            <Award className="h-4 w-4" />
            <span>Recommended</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex gap-1.5">
            <PlayCircle className="h-4 w-4" />
            <span>In Progress</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredLabs.length === 0 ? (
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Server className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No labs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find lab exercises
              </p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLabs.map((lab, index) => {
                const difficultyColors = getDifficultyColor(lab.difficulty);
                return (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className={`h-full flex flex-col group hover:shadow-md transition-all border cursor-pointer ${lab.status === 'locked' ? 'opacity-75' : ''}`}
                      onClick={() => lab.status !== 'locked' && onSelectLab(lab.id)}
                      tabIndex={lab.status !== 'locked' ? 0 : -1}
                      onKeyDown={(e) => e.key === 'Enter' && lab.status !== 'locked' && onSelectLab(lab.id)}
                      aria-disabled={lab.status === 'locked'}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {lab.difficulty}
                          </Badge>
                          {renderStatusBadge(lab.status)}
                        </div>
                        <CardTitle className={`text-base ${lab.status !== 'locked' ? 'group-hover:text-blue-600' : ''} transition-colors`}>
                          {lab.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {lab.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 flex-grow">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lab.estimatedTime}</span>
                        </div>
                        
                        {lab.status !== 'not-started' && lab.status !== 'locked' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{lab.progress}%</span>
                            </div>
                            <Progress 
                              value={lab.progress} 
                              className="h-1.5" 
                              aria-label={`Lab progress: ${lab.progress}%`}
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mt-4">
                          {lab.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs font-normal bg-slate-50">
                              {tag}
                            </Badge>
                          ))}
                          {lab.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs font-normal bg-slate-50">
                              +{lab.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-blue-600 h-8"
                          disabled={lab.status === 'locked'}
                        >
                          <span className="text-sm">
                            {lab.status === 'completed' 
                              ? 'Review Lab' 
                              : lab.status === 'in-progress' 
                                ? 'Continue Lab' 
                                : lab.status === 'locked' 
                                  ? 'Locked' 
                                  : 'Start Lab'}
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLabs
              .filter(lab => lab.status !== 'completed' && lab.status !== 'locked')
              .slice(0, 6)
              .map((lab, index) => {
                const difficultyColors = getDifficultyColor(lab.difficulty);
                return (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card 
                      className="h-full flex flex-col group hover:shadow-md transition-all border cursor-pointer"
                      onClick={() => onSelectLab(lab.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {lab.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 border-blue-200">
                            Recommended
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {lab.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {lab.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 flex-grow">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lab.estimatedTime}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-blue-600 h-8"
                        >
                          <span className="text-sm">
                            {lab.status === 'in-progress' ? 'Continue Lab' : 'Start Lab'}
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLabs
              .filter(lab => lab.status === 'in-progress')
              .map((lab, index) => {
                const difficultyColors = getDifficultyColor(lab.difficulty);
                return (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card 
                      className="h-full flex flex-col group hover:shadow-md transition-all border cursor-pointer"
                      onClick={() => onSelectLab(lab.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {lab.difficulty}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                            <PlayCircle className="h-3 w-3" />
                            <span>In Progress</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {lab.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {lab.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 flex-grow">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lab.estimatedTime}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{lab.progress}%</span>
                          </div>
                          <Progress 
                            value={lab.progress} 
                            className="h-1.5" 
                            aria-label={`Lab progress: ${lab.progress}%`}
                          />
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-blue-600 h-8"
                        >
                          <span className="text-sm">Continue Lab</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLabs
              .filter(lab => lab.status === 'completed')
              .map((lab, index) => {
                const difficultyColors = getDifficultyColor(lab.difficulty);
                return (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card 
                      className="h-full flex flex-col group hover:shadow-md transition-all border cursor-pointer"
                      onClick={() => onSelectLab(lab.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge className={difficultyColors.badge}>
                            {lab.difficulty}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Completed</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                          {lab.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 h-10">
                          {lab.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 flex-grow">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{lab.estimatedTime}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span>100%</span>
                          </div>
                          <Progress 
                            value={100} 
                            className="h-1.5" 
                            aria-label="Lab progress: 100%"
                          />
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 border-t mt-auto">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between text-blue-600 h-8"
                        >
                          <span className="text-sm">Review Lab</span>
                          <ChevronRight className="h-4 w-4" />
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