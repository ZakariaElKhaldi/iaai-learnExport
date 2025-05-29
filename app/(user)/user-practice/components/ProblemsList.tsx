"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Search, Users, Trophy, Star, Filter, X, FolderClosed, BookOpen, ClipboardCheck } from "lucide-react";
import { getDifficultyColor, calculateCompletionPercentage } from "../utils/helpers";
import { cn } from "@/lib/utils";
import { ProblemCard } from "./ProblemCard";

interface ProblemsListProps {
  problems: any[];
  onSelectProblem: (problem: any) => void;
  selectedProblemId?: string | number | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ProblemsList({ 
  problems, 
  onSelectProblem, 
  selectedProblemId,
  searchQuery,
  setSearchQuery
}: ProblemsListProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [sort, setSort] = useState("title-asc");
  const [showFilters, setShowFilters] = useState(false);
  
  // Unique tags from all problems
  const allTags = Array.from(new Set(problems.flatMap(p => p.tags || [])));
  
  // Calculate completion stats
  const totalProblems = problems.length;
  const completedProblems = problems.filter(p => p.completed).length;
  const easyProblems = problems.filter(p => p.difficulty === "Easy").length;
  const easyCompleted = problems.filter(p => p.difficulty === "Easy" && p.completed).length;
  const mediumProblems = problems.filter(p => p.difficulty === "Medium").length;
  const mediumCompleted = problems.filter(p => p.difficulty === "Medium" && p.completed).length;
  const hardProblems = problems.filter(p => p.difficulty === "Hard").length;
  const hardCompleted = problems.filter(p => p.difficulty === "Hard" && p.completed).length;
  
  const completionPercentage = calculateCompletionPercentage(completedProblems, totalProblems);
  
  // Filter and sort problems
  useEffect(() => {
    let result = [...problems];
    
    // Filter by tab
    if (activeTab === "todo") {
      result = result.filter(p => !p.completed);
    } else if (activeTab === "completed") {
      result = result.filter(p => p.completed);
    } else if (activeTab === "premium") {
      result = result.filter(p => p.isPremium);
    } else if (activeTab === "featured") {
      result = result.filter(p => p.isFeatured);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply difficulty filters
    if (difficultyFilter.length > 0) {
      result = result.filter(p => difficultyFilter.includes(p.difficulty));
    }
    
    // Apply status filters
    if (statusFilter.length > 0) {
      result = result.filter(p => {
        if (statusFilter.includes("completed") && p.completed) return true;
        if (statusFilter.includes("todo") && !p.completed && !p.started) return true;
        if (statusFilter.includes("in-progress") && p.started && !p.completed) return true;
        return false;
      });
    }
    
    // Apply tags filters
    if (tagsFilter.length > 0) {
      result = result.filter(p => 
        p.tags?.some((tag: string) => tagsFilter.includes(tag))
      );
    }
    
    // Apply sorting
    if (sort === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "difficulty-asc") {
      const difficultyRank = { "Easy": 1, "Medium": 2, "Hard": 3 };
      result.sort((a, b) => difficultyRank[a.difficulty as keyof typeof difficultyRank] - difficultyRank[b.difficulty as keyof typeof difficultyRank]);
    } else if (sort === "difficulty-desc") {
      const difficultyRank = { "Easy": 1, "Medium": 2, "Hard": 3 };
      result.sort((a, b) => difficultyRank[b.difficulty as keyof typeof difficultyRank] - difficultyRank[a.difficulty as keyof typeof difficultyRank]);
    } else if (sort === "acceptance-asc") {
      result.sort((a, b) => a.acceptance - b.acceptance);
    } else if (sort === "acceptance-desc") {
      result.sort((a, b) => b.acceptance - a.acceptance);
    }
    
    setFilteredProblems(result);
  }, [problems, activeTab, searchQuery, difficultyFilter, statusFilter, tagsFilter, sort]);
  
  // Toggle difficulty filter
  const toggleDifficulty = (difficulty: string) => {
    if (difficultyFilter.includes(difficulty)) {
      setDifficultyFilter(difficultyFilter.filter(d => d !== difficulty));
    } else {
      setDifficultyFilter([...difficultyFilter, difficulty]);
    }
  };
  
  // Toggle status filter
  const toggleStatus = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };
  
  // Toggle tag filter
  const toggleTag = (tag: string) => {
    if (tagsFilter.includes(tag)) {
      setTagsFilter(tagsFilter.filter(t => t !== tag));
    } else {
      setTagsFilter([...tagsFilter, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setDifficultyFilter([]);
    setStatusFilter([]);
    setTagsFilter([]);
    setSearchQuery("");
    setSort("title-asc");
  };
  
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Progress Overview */}
      <div className="bg-white text-slate-800 p-4 sm:p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-slate-500 text-sm mb-1">Your Progress</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{completedProblems}/{totalProblems} completed</span>
              <span className="text-sm text-slate-500">({completionPercentage}%)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="w-full bg-slate-100 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${completionPercentage}% of problems completed`}
            ></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-white rounded p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500 font-medium">Easy</div>
                <div className="text-xs font-medium">
                  {easyCompleted}/{easyProblems}
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1">
                <div 
                  className="bg-blue-400 h-1 rounded-full" 
                  style={{ width: `${calculateCompletionPercentage(easyCompleted, easyProblems)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white rounded p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500 font-medium">Medium</div>
                <div className="text-xs font-medium">
                  {mediumCompleted}/{mediumProblems}
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full" 
                  style={{ width: `${calculateCompletionPercentage(mediumCompleted, mediumProblems)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white rounded p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500 font-medium">Hard</div>
                <div className="text-xs font-medium">
                  {hardCompleted}/{hardProblems}
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${calculateCompletionPercentage(hardCompleted, hardProblems)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs and Filters */}
      <div className="border-b bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="h-9 grid-cols-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="todo" className="text-xs sm:text-sm">
                To Do
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm">
                Completed
              </TabsTrigger>
              <TabsTrigger value="featured" className="text-xs sm:text-sm">
                Featured
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 md:ml-auto">
            <div className="relative w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-9 md:w-[240px] text-sm"
                aria-label="Search problems"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "h-9 gap-1.5",
                (difficultyFilter.length > 0 || statusFilter.length > 0 || tagsFilter.length > 0) && 
                "border-blue-500 text-blue-600"
              )}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filters-panel"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {(difficultyFilter.length > 0 || statusFilter.length > 0 || tagsFilter.length > 0) && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-500 text-white">
                  {difficultyFilter.length + statusFilter.length + tagsFilter.length}
                </Badge>
              )}
            </Button>
            
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 w-[130px] sm:w-[180px] text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                <SelectItem value="difficulty-asc">Difficulty (Easy-Hard)</SelectItem>
                <SelectItem value="difficulty-desc">Difficulty (Hard-Easy)</SelectItem>
                <SelectItem value="acceptance-asc">Acceptance (Low-High)</SelectItem>
                <SelectItem value="acceptance-desc">Acceptance (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div id="filters-panel" className="border-t p-4 bg-slate-50 animate-in slide-in-from-top duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900">Filters</h3>
              {(difficultyFilter.length > 0 || statusFilter.length > 0 || tagsFilter.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {["Easy", "Medium", "Hard"].map((difficulty) => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`difficulty-${difficulty}`} 
                        checked={difficultyFilter.includes(difficulty)}
                        onCheckedChange={() => toggleDifficulty(difficulty)}
                      />
                      <Label 
                        htmlFor={`difficulty-${difficulty}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Status</h4>
                <div className="space-y-2">
                  {[
                    { id: "todo", label: "To Do" },
                    { id: "in-progress", label: "In Progress" },
                    { id: "completed", label: "Completed" }
                  ].map((status) => (
                    <div key={status.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status.id}`} 
                        checked={statusFilter.includes(status.id)}
                        onCheckedChange={() => toggleStatus(status.id)}
                      />
                      <Label 
                        htmlFor={`status-${status.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {status.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 12).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className={cn(
                        "cursor-pointer hover:bg-slate-100",
                        tagsFilter.includes(tag) && "bg-blue-50 border-blue-200 text-blue-800"
                      )}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Problems List */}
      <div className="flex-1 overflow-auto p-4 bg-slate-50">
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard 
                key={problem.id} 
                problem={problem} 
                onClick={() => onSelectProblem(problem)}
                isActive={selectedProblemId === problem.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            {searchQuery || difficultyFilter.length > 0 || statusFilter.length > 0 || tagsFilter.length > 0 ? (
              <>
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No matching problems found</h3>
                <p className="text-slate-600 max-w-md mb-4">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-3 mb-4">
                  <FolderClosed className="h-12 w-12 text-slate-300" />
                  <BookOpen className="h-12 w-12 text-slate-300" />
                  <ClipboardCheck className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No problems available</h3>
                <p className="text-slate-600 max-w-md">
                  Check back later for new problems or try a different category.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 