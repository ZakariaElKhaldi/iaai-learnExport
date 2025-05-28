"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Code, FileCode, Filter, CheckCircle, Clock, Cpu, 
  Play, Save, Settings, ChevronLeft, ChevronRight, 
  CheckSquare, XSquare, AlertCircle, Search, Eye, 
  Book, BarChart3, Users, RefreshCw, Trophy, 
  BookOpen, HelpCircle, ListChecks, Server, ArrowRight,
  Zap, Languages, ArrowUpRight, PanelLeft, PanelRight,
  LayoutGrid, List, Briefcase, Calendar as CalendarIcon,
  Lock, Bookmark, Star, Target, Flame, Award,
  TrendingUp, MessageSquare, ThumbsUp, Share2,
  Download, Upload, Copy, Terminal, Maximize2,
  Minimize2, Split, RotateCcw, Volume2, VolumeX,
  Sun, Moon, Monitor, GitBranch, Heart, Lightbulb,
  ChevronUp, ChevronDown, X
} from "lucide-react";

// Enhanced helper function for difficulty colors
const getDifficultyColor = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'easy': return {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      text: 'text-emerald-600',
      border: 'border-emerald-500',
      bg: 'bg-emerald-50',
      progress: 'bg-emerald-500'
    };
    case 'medium': return {
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      text: 'text-amber-600',
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      progress: 'bg-amber-500'
    };
    case 'hard': return {
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      text: 'text-rose-600',
      border: 'border-rose-500',
      bg: 'bg-rose-50',
      progress: 'bg-rose-500'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
      text: 'text-slate-600',
      border: 'border-slate-500',
      bg: 'bg-slate-50',
      progress: 'bg-slate-500'
    };
  }
};

// Enhanced languages with icons
const languages = [
  { id: "javascript", name: "JavaScript", extension: "js", icon: "🟨", color: "text-yellow-600" },
  { id: "python", name: "Python", extension: "py", icon: "🐍", color: "text-blue-600" },
  { id: "java", name: "Java", extension: "java", icon: "☕", color: "text-orange-600" },
  { id: "cpp", name: "C++", extension: "cpp", icon: "⚡", color: "text-blue-700" },
  { id: "typescript", name: "TypeScript", extension: "ts", icon: "🔷", color: "text-blue-500" },
  { id: "go", name: "Go", extension: "go", icon: "🐹", color: "text-cyan-600" },
  { id: "rust", name: "Rust", extension: "rs", icon: "🦀", color: "text-orange-700" },
  { id: "ruby", name: "Ruby", extension: "rb", icon: "💎", color: "text-red-600" },
];

// Enhanced mock coding challenges
const challenges = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    hints: [
      "Try using a hash map to store the complement of each number.",
      "For each number, check if its complement exists in the hash map.",
      "The complement of a number x with target t is t - x."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your solution here
    
}`,
      python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        
    }
}`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]", hidden: false },
      { input: "[3,2,4], 6", expected: "[1,2]", hidden: false },
      { input: "[3,3], 6", expected: "[0,1]", hidden: false },
      { input: "[1,5,8,10], 18", expected: "[2,3]", hidden: true }
    ],
    tags: ["Array", "Hash Table", "Two Pointers"],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Meta"],
    acceptance: 49.7,
    submissions: 13482945,
    completedBy: 2789451,
    likes: 45231,
    dislikes: 1534,
    isBookmarked: false,
    difficulty_level: 1,
    time_complexity: "O(n)",
    space_complexity: "O(n)",
    solution_approaches: ["Hash Map", "Brute Force", "Two Pointers"]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy", 
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s[i] is a printable ASCII character."
    ],
    hints: [
      "Use two pointers, one at the beginning and one at the end.",
      "Swap characters and move pointers toward each other.",
      "Stop when pointers meet in the middle."
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your solution here
    
};`,
      python: `def reverseString(s):
    """
    Do not return anything, modify s in-place instead.
    """
    # Your solution here
    pass`
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', hidden: false },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]', hidden: false }
    ],
    tags: ["Two Pointers", "String", "Recursion"],
    companies: ["Amazon", "Apple", "Microsoft", "Google"],
    acceptance: 74.2,
    submissions: 2563148,
    completedBy: 1903249,
    likes: 3421,
    dislikes: 892,
    isBookmarked: true,
    difficulty_level: 1,
    time_complexity: "O(n)",
    space_complexity: "O(1)",
    solution_approaches: ["Two Pointers", "Recursion", "Built-in Methods"]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack data structure to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      "The string is valid if the stack is empty at the end."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your solution here
    
}`,
      python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your solution here
    pass`
    },
    testCases: [
      { input: '"()"', expected: 'true', hidden: false },
      { input: '"()[]{}"', expected: 'true', hidden: false },
      { input: '"(]"', expected: 'false', hidden: false },
      { input: '"([)]"', expected: 'false', hidden: true }
    ],
    tags: ["Stack", "String", "Data Structure"],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Apple"],
    acceptance: 40.1,
    submissions: 4521032,
    completedBy: 1812748,
    likes: 15634,
    dislikes: 724,
    isBookmarked: false,
    difficulty_level: 1,
    time_complexity: "O(n)",
    space_complexity: "O(n)",
    solution_approaches: ["Stack", "Counter", "Recursion"]
  }
];

// Enhanced Code Editor Component with syntax highlighting simulation
function CodeEditor({ language, value, onChange, theme = "dark" }: any) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={cn(
      "relative h-full border rounded-lg overflow-hidden transition-all duration-200",
      isFocused ? "border-blue-500 shadow-md" : "border-slate-300",
      theme === "dark" ? "bg-slate-900" : "bg-white"
    )}>
      {/* Editor Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-2 border-b text-sm",
        theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200"
      )}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 font-medium">main.{languages.find(l => l.id === language)?.extension}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Copy className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Code Area */}
      <div className="relative h-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full h-full p-4 font-mono text-sm resize-none outline-none",
            theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
          )}
          placeholder="// Start coding here..."
          spellCheck={false}
          style={{ minHeight: "400px" }}
        />
        
        {/* Enhanced features overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <div className={cn(
            "text-xs px-2 py-1 rounded",
            theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
          )}>
            Lines: {value.split('\n').length}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Problem Description Component
function ProblemDescription({ problem }: any) {
  const [activeTab, setActiveTab] = useState("description");
  const [showHints, setShowHints] = useState(false);
  const diffColors = getDifficultyColor(problem.difficulty);
  
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Problem Header */}
      <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{problem.title}</h1>
            <div className="flex items-center gap-3">
              <Badge className={diffColors.badge}>{problem.difficulty}</Badge>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{problem.likes?.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{problem.completedBy?.toLocaleString()} solved</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>{problem.acceptance}% acceptance</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Heart className={problem.isBookmarked ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Companies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.companies?.slice(0, 4).map((company: string) => (
            <Badge key={company} variant="outline" className="text-xs bg-white">
              {company}
            </Badge>
          ))}
          {problem.companies?.length > 4 && (
            <Badge variant="outline" className="text-xs bg-white">
              +{problem.companies.length - 4} more
            </Badge>
          )}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b">
          <div className="flex items-center gap-6 px-6">
            {["description", "examples", "constraints", "hints", "discuss"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-3 px-1 text-sm font-medium border-b-2 transition-colors capitalize",
                  activeTab === tab 
                    ? "border-blue-500 text-blue-600" 
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                {tab}
                {tab === "discuss" && (
                  <Badge variant="outline" className="ml-2 text-xs">24</Badge>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "description" && (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {problem.description}
              </div>
            </div>
          )}
          
          {activeTab === "examples" && (
            <div className="space-y-6">
              {problem.examples?.map((example: any, index: number) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border">
                  <h4 className="font-semibold text-slate-900 mb-3">Example {index + 1}:</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div><strong>Input:</strong> <code className="bg-slate-200 px-2 py-1 rounded">{example.input}</code></div>
                    <div><strong>Output:</strong> <code className="bg-slate-200 px-2 py-1 rounded">{example.output}</code></div>
                    {example.explanation && (
                      <div className="text-slate-600 mt-2">
                        <strong>Explanation:</strong> {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "constraints" && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Constraints</h3>
              <ul className="space-y-2">
                {problem.constraints?.map((constraint: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {constraint}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === "hints" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Hints</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showHints ? "Hide Hints" : "Show Hints"}
                </Button>
              </div>
              
              {showHints && (
                <div className="space-y-3">
                  {problem.hints?.map((hint: string, index: number) => (
                    <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-slate-700">{hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "discuss" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Discussion</h3>
                <Button variant="default" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  New Discussion
                </Button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        U{i}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-slate-900">user{i}23</span>
                          <Badge variant="outline" className="text-xs">
                            {i === 1 ? "Solution" : i === 2 ? "Question" : "Approach"}
                          </Badge>
                          <span className="text-xs text-slate-500">{i} hours ago</span>
                        </div>
                        <p className="text-slate-700 text-sm">
                          {i === 1 ? "Here's an optimized O(n) solution using HashMap..." : 
                           i === 2 ? "Can someone explain why this approach works?" :
                           "Alternative approach using two pointers..."}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="h-3 w-3" />
                            {12 - i * 3}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageSquare className="h-3 w-3" />
                            {5 - i}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Test Results Component
function TestResults({ results, isVisible }: any) {
  if (!isVisible || !results.length) return null;
  
  const passedTests = results.filter((r: any) => r.status === "passed").length;
  const totalTests = results.length;
  
  return (
    <div className="border-t bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Test Results</h3>
          <Badge 
            variant={passedTests === totalTests ? "default" : "destructive"}
            className="gap-1"
          >
            {passedTests === totalTests ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <XSquare className="h-3 w-3" />
            )}
            {passedTests}/{totalTests} Passed
          </Badge>
        </div>
        
        <div className="space-y-3">
          {results.map((result: any, index: number) => (
            <div 
              key={index}
              className={cn(
                "border rounded-lg p-3 transition-all",
                result.status === "passed" 
                  ? "border-green-200 bg-green-50" 
                  : "border-red-200 bg-red-50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result.status === "passed" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XSquare className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium text-sm">
                    Test Case {index + 1} {result.hidden && "(Hidden)"}
                  </span>
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded",
                  result.status === "passed" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                )}>
                  {result.status.toUpperCase()}
                </span>
              </div>
              
              {!result.hidden && (
                <div className="space-y-1 text-xs font-mono">
                  <div className="text-slate-600">
                    <span className="font-semibold">Input:</span> {result.input}
                  </div>
                  <div className="text-slate-600">
                    <span className="font-semibold">Expected:</span> {result.expected}
                  </div>
                  <div className={result.status === "passed" ? "text-green-700" : "text-red-700"}>
                    <span className="font-semibold">Output:</span> {result.output}
                  </div>
                  {result.status === "failed" && result.error && (
                    <div className="text-red-600 mt-2">
                      <span className="font-semibold">Error:</span> {result.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Problem List Component
function ProblemListView({ challenges, onSelectProblem }: any) {
  const [filters, setFilters] = useState({
    difficulty: "All",
    tag: "All",
    company: "All",
    status: "All"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  
  // Get unique values for filters
  const allTags = ["All", ...Array.from(new Set(challenges.flatMap((c: any) => c.tags || [])))];
  const allCompanies = ["All", ...Array.from(new Set(challenges.flatMap((c: any) => c.companies || [])))];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const statuses = ["All", "Solved", "Attempted", "Todo"];
  
  // Filter and search logic
  const filteredChallenges = challenges.filter((challenge: any) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filters.difficulty === "All" || challenge.difficulty === filters.difficulty;
    const matchesTag = filters.tag === "All" || (challenge.tags && challenge.tags.includes(filters.tag));
    const matchesCompany = filters.company === "All" || (challenge.companies && challenge.companies.includes(filters.company));
    
    return matchesSearch && matchesDifficulty && matchesTag && matchesCompany;
  });
  
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Enhanced Stats Dashboard */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs">Problems Solved</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">16%</div>
                  <div className="text-xs">Completion Rate</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs">Day Streak</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">120</div>
                  <div className="text-xs">Total Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Problem filtering and search */}
      <div className="p-6 border-b">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={filters.difficulty} onValueChange={(value) => setFilters({...filters, difficulty: value})}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty: string) => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.tag} onValueChange={(value) => setFilters({...filters, tag: value})}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag: any) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filters.company} onValueChange={(value) => setFilters({...filters, company: value})}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  {allCompanies.map((company: any) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search problems..." 
                className="pl-10 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Problem list */}
      <div className="p-6">
        <div className="max-w-screen-xl mx-auto">
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge: any) => {
                const diffColors = getDifficultyColor(challenge.difficulty);
                return (
                  <Card 
                    key={challenge.id} 
                    className={cn(
                      "overflow-hidden hover:shadow-md transition-all cursor-pointer border",
                      diffColors.bg
                    )}
                    onClick={() => onSelectProblem(challenge)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={diffColors.badge}>{challenge.difficulty}</Badge>
                        {challenge.isBookmarked && (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <CardTitle className="mt-2 group-hover:text-primary transition-colors">
                        {challenge.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {challenge.description.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {challenge.tags?.slice(0, 3).map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                        {challenge.tags?.length > 3 && (
                          <Badge variant="outline" className="text-xs font-normal">
                            +{challenge.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Acceptance Rate</span>
                          <span>{challenge.acceptance}%</span>
                        </div>
                        <Progress value={challenge.acceptance} className={cn("h-1", diffColors.progress)} />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2 border-t flex justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{challenge.completedBy?.toLocaleString()} solved</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <ArrowRight className="h-3.5 w-3.5" />
                        <span>Solve</span>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <div className="bg-slate-100 rounded-full p-3 w-fit mx-auto mb-4">
                <FileCode className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No problems found</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <Button onClick={() => {
                setFilters({
                  difficulty: "All",
                  tag: "All",
                  company: "All",
                  status: "All"
                });
                setSearchQuery("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Practice Page Component
export default function PracticePage() {
  const [activeTab, setActiveTab] = useState("problems");
  const [activeProblem, setActiveProblem] = useState<any>(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [headerHeight, setHeaderHeight] = useState(56);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Track window resize for responsiveness
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial header height measurement
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Measure header height on resize
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set default problem on initial load
  useEffect(() => {
    if (challenges.length > 0 && !activeProblem) {
      handleProblemSelect(challenges[0]);
    }
  }, [activeProblem]);
  
  // Update code when language changes
  useEffect(() => {
    if (activeProblem && activeProblem.starterCode && activeProblem.starterCode[language]) {
      setCode(activeProblem.starterCode[language]);
    }
  }, [language, activeProblem]);
  
  // Determine if we should show the sidebar based on screen size
  const shouldShowSidebar = () => {
    return showSidebar && (windowWidth > 768 || !activeProblem);
  };
  
  // Calculate content height (viewport minus header)
  const getContentHeight = () => {
    return `calc(100dvh - ${headerHeight}px)`;
  };
  
  const handleProblemSelect = (problem: any) => {
    setActiveProblem(problem);
    
    // Set the default starter code based on selected language
    if (problem.starterCode && problem.starterCode[language]) {
      setCode(problem.starterCode[language]);
    }
    
    // Reset console output and test results
    setConsoleOutput("");
    setTestResults([]);
    
    // On mobile, hide sidebar when selecting a problem
    if (windowWidth <= 768) {
      setShowSidebar(false);
    }
  };
  
  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Running code...");
    setShowConsole(true);
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setConsoleOutput("Code executed successfully!\n> console.log output would appear here");
      setIsRunning(false);
    }, 1500);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    setConsoleOutput("Testing solution against all test cases...");
    setShowConsole(true);
    
    // Simulate test case validation with a delay
    setTimeout(() => {
      // Mock test results - in a real app would come from backend execution
      const mockResults = activeProblem.testCases.map((test: any, index: number) => ({
        id: index + 1,
        input: test.input,
        expected: test.expected,
        output: index < 2 ? test.expected : (index === 2 ? "Incorrect output" : test.expected),
        status: index < 2 || index === 3 ? "passed" : "failed",
        hidden: test.hidden
      }));
      
      setTestResults(mockResults);
      setConsoleOutput("Test cases executed. See results above.");
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-dvh overflow-hidden">
      {/* Header with problem info */}
      <header 
        ref={headerRef}
        className="flex items-center justify-between border-b bg-white px-4 py-3 z-20 flex-shrink-0 sticky top-0"
      >
        <div className="flex items-center gap-2">
          {activeProblem ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setActiveProblem(null)} className="gap-1 mr-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-lg font-medium truncate max-w-xs md:max-w-md">{activeProblem.title}</span>
              <Badge className={getDifficultyColor(activeProblem.difficulty).badge}>
                {activeProblem.difficulty}
              </Badge>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Coding Practice</h1>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeProblem ? (
            <>
              <div className="relative">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        <div className="flex items-center gap-2">
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowConsole(!showConsole)}
                >
                  {showConsole ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span className="hidden sm:inline">Hide Console</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span className="hidden sm:inline">Show Console</span>
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm" 
                  className="gap-1"
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Run</span>
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="gap-1"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
              
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)} className="ml-2">
                {showSidebar ? 
                  <PanelRight className="h-4 w-4" /> : 
                  <PanelLeft className="h-4 w-4" />
                }
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Search..." className="w-[200px] h-9" />
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex overflow-hidden" style={{ height: getContentHeight() }}>
        {/* Problem List or Code Editor */}
        <div className="flex-1 flex overflow-hidden">
          {!activeProblem ? (
            <ProblemListView 
              challenges={challenges} 
              onSelectProblem={handleProblemSelect} 
            />
          ) : (
            <div className="flex flex-col w-full overflow-hidden">
              {/* Code editor */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={setCode}
                />
              </div>
              
              {/* Console panel (expandable) */}
              {showConsole && (
                <div className="h-64 bg-slate-900 text-white overflow-hidden border-t border-slate-700">
                  <div className="flex items-center justify-between p-2 bg-slate-800 border-b border-slate-700">
                    <div className="text-xs font-medium">Console Output</div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowConsole(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 font-mono text-sm whitespace-pre-wrap h-full overflow-y-auto">
                    {consoleOutput || "Run your code to see the output here."}
                  </div>
                </div>
              )}
              
              {/* Test results panel */}
              <TestResults results={testResults} isVisible={testResults.length > 0} />
            </div>
          )}
        </div>
        
        {/* Problem description sidebar */}
        {activeProblem && shouldShowSidebar() && (
          <div className="border-l w-[450px] overflow-y-auto flex-shrink-0 bg-white">
            <ProblemDescription problem={activeProblem} />
          </div>
        )}
      </div>
    </div>
  );
}