"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ThumbsUp, Users, BarChart3, Heart, Share2, 
  Lightbulb, ChevronDown, ChevronUp, Calendar,
  Clock, Copy, BookOpen, MessageSquare
} from "lucide-react";
import { getDifficultyColor } from "../utils/helpers";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ProblemDescriptionProps {
  problem: any;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("description");
  const [showHints, setShowHints] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const diffColors = getDifficultyColor(problem.difficulty);
  
  // Handle copying examples
  const copyExample = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* Problem Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 break-words">
              {problem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <Badge className={diffColors.badge}>
                {problem.difficulty}
              </Badge>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1" title="Likes">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{problem.likes?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1" title="Number of users who solved this problem">
                  <Users className="h-4 w-4" />
                  <span>{problem.completedBy?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1" title="Acceptance rate">
                  <BarChart3 className="h-4 w-4" />
                  <span>{problem.acceptance}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              aria-label={problem.isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              aria-pressed={problem.isBookmarked}
            >
              <Heart className={cn(
                "h-4 w-4",
                problem.isBookmarked ? "fill-red-500 text-red-500" : ""
              )} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              aria-label="Share problem"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Companies section with toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowCompanies(!showCompanies)}
            className="flex items-center gap-1 text-sm text-slate-700 mb-2 hover:text-slate-900"
            aria-expanded={showCompanies}
          >
            <span className="font-medium">Companies</span>
            {showCompanies ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {showCompanies && (
            <div className="flex flex-wrap gap-2 mt-2 mb-3 animate-in fade-in duration-200">
              {problem.companies?.map((company: string) => (
                <Badge key={company} variant="outline" className="text-xs bg-white">
                  {company}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Problem metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs text-slate-700">
          <div className="flex flex-col">
            <span className="text-slate-500">Time Complexity</span>
            <span className="font-mono">{problem.time_complexity || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500">Space Complexity</span>
            <span className="font-mono">{problem.space_complexity || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500">Submissions</span>
            <span>{problem.submissions?.toLocaleString() || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500">Solutions</span>
            <div className="flex items-center gap-1">
              {problem.solution_approaches?.length || 0}
              <span className="text-slate-400">approaches</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {problem.tags?.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Content Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="border-b overflow-x-auto scrollbar-hide bg-white">
          <TabsList className="px-2 h-auto bg-transparent">
            <TabsTrigger 
              value="description" 
              className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 py-3 px-4 text-sm"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="examples" 
              className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 py-3 px-4 text-sm"
            >
              Examples
            </TabsTrigger>
            <TabsTrigger 
              value="constraints" 
              className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 py-3 px-4 text-sm"
            >
              Constraints
            </TabsTrigger>
            <TabsTrigger 
              value="hints" 
              className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 py-3 px-4 text-sm"
            >
              Hints
            </TabsTrigger>
            <TabsTrigger 
              value="discuss" 
              className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 py-3 px-4 text-sm"
            >
              Discuss
              <Badge variant="outline" className="ml-2 text-xs">
                {24}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="description" className="p-6 min-h-full mt-0">
            <div className="prose prose-slate max-w-none">
              <MarkdownRenderer 
                content={problem.description}
                className="text-slate-700 leading-relaxed break-words"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="p-6 min-h-full mt-0">
            <div className="space-y-6">
              {problem.examples?.map((example: any, index: number) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">Example {index + 1}:</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0" 
                      onClick={() => copyExample(`${example.input}\n${example.output}`)}
                      aria-label={`Copy example ${index + 1}`}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex flex-col">
                      <strong className="text-xs text-slate-500">Input:</strong>
                      <code className="bg-slate-200 px-2 py-1 rounded mt-1 overflow-x-auto whitespace-pre">
                        {example.input}
                      </code>
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-xs text-slate-500">Output:</strong>
                      <code className="bg-slate-200 px-2 py-1 rounded mt-1 overflow-x-auto whitespace-pre">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div className="text-slate-600 mt-2">
                        <strong className="text-xs text-slate-500 block">Explanation:</strong>
                        <MarkdownRenderer
                          content={example.explanation}
                          className="mt-1 text-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="constraints" className="p-6 min-h-full mt-0">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Constraints</h3>
              <ul className="space-y-2">
                {problem.constraints?.map((constraint: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <MarkdownRenderer
                      content={constraint}
                      className="text-sm"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="hints" className="p-6 min-h-full mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Hints</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setShowHints(!showHints)}
                  aria-expanded={showHints}
                  aria-controls="hints-list"
                >
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span>{showHints ? "Hide Hints" : "Show Hints"}</span>
                </Button>
              </div>
              
              {showHints ? (
                <div 
                  id="hints-list"
                  className="space-y-3 animate-in fade-in duration-200"
                >
                  {problem.hints?.map((hint: string, index: number) => (
                    <div key={index} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <h4 className="font-medium text-amber-800 mb-1 flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4" />
                        Hint {index + 1}
                      </h4>
                      <MarkdownRenderer
                        content={hint}
                        className="text-amber-700"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border rounded-lg p-6 text-center">
                  <Lightbulb className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <h4 className="font-medium text-slate-800 mb-1">Hints Available</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Need some help? Click the button above to reveal hints for this problem.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="discuss" className="min-h-full mt-0">
            <div className="flex flex-col h-full">
              <div className="border-b p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Discussion</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Solutions</span>
                    </Button>
                    <Button size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>New Post</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white hover:bg-slate-100 cursor-pointer">
                    All Topics
                  </Badge>
                  <Badge variant="outline" className="bg-white hover:bg-slate-100 cursor-pointer">
                    Solutions
                  </Badge>
                  <Badge variant="outline" className="bg-white hover:bg-slate-100 cursor-pointer">
                    Questions
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-8 flex-1">
                <MessageSquare className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">Join the Discussion</h3>
                <p className="text-slate-600 text-center max-w-sm mb-4">
                  Share your solutions, ask questions, and learn from others in the community.
                </p>
                <Button className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Start a New Topic</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 