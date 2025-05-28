"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MonacoEditor } from "@/components/monaco-editor";
import { 
  Code, FileCode, Filter, CheckCircle, Clock, Cpu, 
  Play, Save, Settings, ChevronLeft, ChevronRight, 
  CheckSquare, XSquare, AlertCircle, Search, Eye, 
  Book, BarChart3, Users, RefreshCw, Trophy, 
  BookOpen, HelpCircle, ListChecks, Server, ArrowRight,
  Zap, Languages, ArrowUpRight, PanelLeft, PanelRight,
  LayoutGrid, List, Briefcase, Calendar as CalendarIcon,
  Lock, Bookmark
} from "lucide-react";

// Helper function for difficulty colors
const getDifficultyColor = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'easy': return {
      badge: 'bg-green-100 text-green-800',
      text: 'text-green-600',
      border: 'border-green-500'
    };
    case 'medium': return {
      badge: 'bg-yellow-100 text-yellow-800',
      text: 'text-yellow-600',
      border: 'border-yellow-500'
    };
    case 'hard': return {
      badge: 'bg-red-100 text-red-800',
      text: 'text-red-600',
      border: 'border-red-500'
    };
    case 'advanced': return {
      badge: 'bg-purple-100 text-purple-800',
      text: 'text-purple-600',
      border: 'border-purple-500'
    };
    case 'intermediate': return {
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-600',
      border: 'border-blue-500'
    };
    case 'beginner': return {
      badge: 'bg-green-100 text-green-800',
      text: 'text-green-600',
      border: 'border-green-500'
    };
    case 'mixed': return {
      badge: 'bg-amber-100 text-amber-800',
      text: 'text-amber-600',
      border: 'border-amber-500'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800',
      text: 'text-slate-600',
      border: 'border-slate-500'
    };
  }
};

// Mock code execution languages
const languages = [
  { id: "javascript", name: "JavaScript", extension: "js", default: true },
  { id: "python", name: "Python 3", extension: "py" },
  { id: "java", name: "Java", extension: "java" },
  { id: "cpp", name: "C++", extension: "cpp" },
  { id: "csharp", name: "C#", extension: "cs" },
  { id: "go", name: "Go", extension: "go" },
  { id: "ruby", name: "Ruby", extension: "rb" },
  { id: "typescript", name: "TypeScript", extension: "ts" },
  { id: "rust", name: "Rust", extension: "rs" },
  { id: "php", name: "PHP", extension: "php" },
];

// Mock coding challenges
const challenges = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
    <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
    <p>You can return the answer in any order.</p>`,
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
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
      { input: "[1,5,8,10], 18", expected: "[2,3]" }
    ],
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    acceptance: 49.7,
    submissions: 13482945,
    completedBy: 2789451
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    description: `<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
    <p>You must do this by modifying the input array <strong>in-place</strong> with O(1) extra memory.</p>`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Write your code here
};`,
      python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        # Write your code here
        pass`
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' }
    ],
    tags: ["Two Pointers", "String"],
    companies: ["Amazon", "Apple", "Microsoft"],
    acceptance: 74.2,
    submissions: 2563148,
    completedBy: 1903249
  }
];

// Common practice problems for the Practice Exercises tab
const exercises = [
  {
    id: 1,
    title: "Valid Parentheses",
    description: "Determine if a string of parentheses is valid.",
    difficulty: "Easy",
    category: "Stacks",
    estimatedTime: "20 mins",
    completionRate: 68,
    tags: ["Stacks", "Strings", "Validation"],
  },
  {
    id: 2,
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists into one sorted list.",
    difficulty: "Easy",
    category: "Linked Lists",
    estimatedTime: "25 mins",
    completionRate: 62,
    tags: ["Linked Lists", "Recursion", "Iteration"],
  },
  {
    id: 3,
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    estimatedTime: "30 mins",
    completionRate: 49,
    tags: ["Arrays", "Dynamic Programming", "Algorithms"],
  },
  {
    id: 4,
    title: "Binary Tree Level Order Traversal",
    description: "Traverse a binary tree in level order (breadth-first).",
    difficulty: "Medium",
    category: "Trees",
    estimatedTime: "35 mins",
    completionRate: 56,
    tags: ["Trees", "BFS", "Queue"],
  },
  {
    id: 5,
    title: "Climbing Stairs",
    description: "Count the number of ways to climb a staircase.",
    difficulty: "Easy",
    category: "Dynamic Programming",
    estimatedTime: "20 mins",
    completionRate: 70,
    tags: ["DP", "Recursion", "Memoization"],
  },
  {
    id: 6,
    title: "Course Schedule",
    description: "Determine if it's possible to finish all courses given prerequisites.",
    difficulty: "Medium",
    category: "Graphs",
    estimatedTime: "40 mins",
    completionRate: 44,
    tags: ["Graphs", "Topological Sort", "DFS"],
  }
];

// Coding competitions
const competitions = [
  {
    id: 101,
    title: "Weekly Coding Challenge",
    description: "Solve 5 algorithm problems in 90 minutes",
    participants: 8742,
    deadline: "Starts in 2 days",
    difficulty: "Mixed",
    progress: 0,
    isRegistered: false
  },
  {
    id: 102,
    title: "Frontend Hackathon",
    description: "Build a responsive UI component based on specifications",
    participants: 5423,
    deadline: "Ongoing - 16 hours left",
    difficulty: "Intermediate",
    progress: 65,
    isRegistered: true
  },
  {
    id: 103,
    title: "Database Challenge",
    description: "Optimize SQL queries for performance",
    participants: 3218,
    deadline: "5 days left",
    difficulty: "Advanced",
    progress: 0,
    isRegistered: false
  }
];

// Problem List View Component
function ProblemListView({ challenges, onSelectProblem, view, setView }: any) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  
  // Get all unique tags from challenges
  const allTags = ['All', ...Array.from(new Set(challenges.flatMap((c: any) => c.tags || []).filter(Boolean))) as string[]];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  // Filter challenges based on selected filters
  const filteredChallenges = challenges.filter((challenge: any) => {
    const matchesDifficulty = selectedDifficulty === 'All' || 
                             challenge.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'All' || 
                      (challenge.tags && challenge.tags.includes(selectedTag));
    return matchesDifficulty && matchesTag;
  });
  
  return (
    <div className="flex-1 overflow-y-auto">
      {/* LeetCode/HackerRank style filter panel */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto p-4">
          {/* Problem solving stats */}
          <div className="mb-4 flex flex-wrap gap-4">
            <div className="flex-1 flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-green-100 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Solved</div>
                <div className="text-lg font-semibold">24/150</div>
              </div>
              <div className="ml-auto">
                <div className="text-xs text-muted-foreground">Easy</div>
                <div className="font-medium text-green-600">16 <span className="text-xs text-muted-foreground">/ 60</span></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Medium</div>
                <div className="font-medium text-yellow-600">7 <span className="text-xs text-muted-foreground">/ 65</span></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Hard</div>
                <div className="font-medium text-red-600">1 <span className="text-xs text-muted-foreground">/ 25</span></div>
              </div>
            </div>
            
            <div className="flex-1 p-3 border rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Difficulty Distribution</div>
              <div className="flex h-4 rounded-md overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '40%' }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: '43%' }}></div>
                <div className="bg-red-500 h-full" style={{ width: '17%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Easy (60)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span>Medium (65)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Hard (25)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Problems</h2>
              <Badge variant="outline" className="ml-2">{filteredChallenges.length} problems</Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search problems..." className="pl-9" />
              </div>
              
              <Select defaultValue="All" onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select defaultValue="All" onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="bg-slate-100 p-1 rounded-md flex">
                <Button 
                  size="icon" 
                  variant={view === "grid" ? "default" : "ghost"} 
                  className="h-8 w-8" 
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant={view === "list" ? "default" : "ghost"} 
                  className="h-8 w-8" 
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto p-4 pt-6">
        {/* Problems grid/list view */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge: any) => {
              const diffColors = getDifficultyColor(challenge.difficulty);
              return (
                <Card 
                  key={challenge.id} 
                  className="hover:shadow-md transition-all cursor-pointer border"
                  onClick={() => onSelectProblem(challenge)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={diffColors.badge}>{challenge.difficulty}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{challenge.completedBy?.toLocaleString()} solved</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2 text-base hover:text-blue-600 transition-colors">
                      {challenge.title}
                    </CardTitle>
                    <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {challenge.description.replace(/<[^>]*>/g, '')}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {challenge.tags?.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Acceptance: {challenge.acceptance}%</span>
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <ArrowRight className="h-3.5 w-3.5" />
                        <span className="text-blue-600 font-medium">Solve Challenge</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Problem</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Acceptance</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Tags</th>
                  <th className="px-4 py-3 text-left text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredChallenges.map((challenge: any) => {
                  const diffColors = getDifficultyColor(challenge.difficulty);
                  return (
                    <tr 
                      key={challenge.id} 
                      className="hover:bg-slate-50 cursor-pointer"
                      onClick={() => onSelectProblem(challenge)}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{challenge.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={diffColors.badge}>{challenge.difficulty}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{challenge.acceptance}%</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {challenge.tags?.slice(0, 2).map((tag: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs font-normal">
                              {tag}
                            </Badge>
                          ))}
                          {challenge.tags?.length > 2 && (
                            <Badge variant="outline" className="text-xs font-normal">
                              +{challenge.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <ArrowRight className="h-3.5 w-3.5" />
                          <span>Solve</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Exercises Tab Component
function ExercisesTab({ exercises }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Practice Exercises</h2>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="data-structures">Data Structures</SelectItem>
                <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                <SelectItem value="graphs">Graphs</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise: any) => {
            const diffColors = getDifficultyColor(exercise.difficulty);
            return (
              <Card key={exercise.id} className="hover:shadow-md transition-all cursor-pointer border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={diffColors.badge}>{exercise.difficulty}</Badge>
                    <Badge variant="outline">{exercise.category}</Badge>
                  </div>
                  <CardTitle className="mt-2 text-base hover:text-blue-600 transition-colors">
                    {exercise.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exercise.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{exercise.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    <span>{exercise.completionRate}% completion rate</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Competitions Tab Component
function CompetitionsTab({ competitions }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Coding Competitions</h2>
          <Button variant="outline" size="sm" className="gap-1">
            View all competitions
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition: any) => {
            const diffColors = getDifficultyColor(competition.difficulty);
            return (
              <Card key={competition.id} className="hover:shadow-md transition-all border">
                <CardHeader>
                  <Badge className={`mb-2 ${diffColors.badge}`}>
                    {competition.difficulty}
                  </Badge>
                  <CardTitle className="text-xl">{competition.title}</CardTitle>
                  <CardDescription>{competition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competition.isRegistered && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{competition.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              competition.progress > 75 ? 'bg-green-500' :
                              competition.progress > 40 ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`}
                            style={{ width: `${competition.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{competition.deadline}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{competition.participants.toLocaleString()} participants</span>
                    </div>
                    <Button variant={competition.isRegistered ? "outline" : "default"}>
                      {competition.isRegistered ? "Continue" : "Register"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Host Your Own Competition</h3>
                  <p className="text-sm text-muted-foreground">Create custom challenges for your team or organization</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Playground Tab Component
function PlaygroundTab() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Code Playground</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-all cursor-pointer border">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-amber-100 w-fit">
                  <FileCode className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Web Development</h3>
                  <p className="text-sm text-muted-foreground">HTML, CSS, and JavaScript editor with live preview</p>
                </div>
                <Button variant="outline" className="bg-white/80 mt-2">Launch Editor</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer border">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-blue-100 w-fit">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Algorithm Playground</h3>
                  <p className="text-sm text-muted-foreground">Test algorithms with multiple languages and test cases</p>
                </div>
                <Button variant="outline" className="bg-white/80 mt-2">Launch Editor</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all cursor-pointer border">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-purple-100 w-fit">
                  <Cpu className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Full Stack Playground</h3>
                  <p className="text-sm text-muted-foreground">Build complete applications with multiple files</p>
                </div>
                <Button variant="outline" className="bg-white/80 mt-2">Launch Editor</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Playground Sessions</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Two Sum Algorithm Solution",
                  lastEdited: "2 hours ago",
                  language: "JavaScript",
                  icon: <Code className="h-4 w-4" />
                },
                {
                  title: "React Todo App",
                  lastEdited: "Yesterday",
                  language: "TypeScript",
                  icon: <FileCode className="h-4 w-4" />
                },
                {
                  title: "Binary Search Implementation",
                  lastEdited: "3 days ago",
                  language: "Python",
                  icon: <Code className="h-4 w-4" />
                }
              ].map((session, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-md">
                      {session.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-xs text-muted-foreground">Last edited: {session.lastEdited}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{session.language}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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
  const [problemListView, setProblemListView] = useState("grid"); // "grid" or "list"
  const [consoleHeight, setConsoleHeight] = useState(200); // Default console height
  
  // Set default problem on initial load
  useEffect(() => {
    if (challenges.length > 0 && !activeProblem) {
      handleProblemSelect(challenges[0]);
    }
  }, []);
  
  // Update code when language changes
  useEffect(() => {
    if (activeProblem && activeProblem.starterCode && activeProblem.starterCode[language]) {
      setCode(activeProblem.starterCode[language]);
    }
  }, [language, activeProblem]);
  
  const handleProblemSelect = (problem: any) => {
    setActiveProblem(problem);
    
    // Set the default starter code based on selected language
    if (problem.starterCode && problem.starterCode[language]) {
      setCode(problem.starterCode[language]);
    }
    
    // Reset console output and test results
    setConsoleOutput("");
    setTestResults([]);
  };
  
  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Running code...");
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setConsoleOutput("Code executed successfully!\n> console.log output would appear here");
      setIsRunning(false);
    }, 1500);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    setConsoleOutput("Testing solution against all test cases...");
    
    // Simulate test case validation with a delay
    setTimeout(() => {
      // Mock test results - in a real app would come from backend execution
      const mockResults = activeProblem.testCases.map((test: any, index: number) => ({
        id: index + 1,
        input: test.input,
        expected: test.expected,
        output: index < 2 ? test.expected : (index === 2 ? "Incorrect output" : test.expected),
        status: index < 2 || index === 3 ? "passed" : "failed"
      }));
      
      setTestResults(mockResults);
      setConsoleOutput("Test cases executed. See results above.");
      setIsSubmitting(false);
    }, 2000);
  };
  
  // Handle console resize
  const handleConsoleResize = (e: React.MouseEvent) => {
    const startY = e.clientY;
    const startHeight = consoleHeight;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.max(120, Math.min(window.innerHeight * 0.6, startHeight + deltaY));
      setConsoleHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header with problem info */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-2 z-20 flex-shrink-0">
        <div className="flex items-center gap-2">
          {activeTab === "problems" && activeProblem ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setActiveProblem(null)} className="gap-1 mr-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-lg font-medium truncate max-w-md">{activeProblem.title}</span>
              <Badge className={getDifficultyColor(activeProblem.difficulty).badge}>
                {activeProblem.difficulty}
              </Badge>
              
              {/* Add HackerRank/LeetCode style progress indicator */}
              <div className="ml-4 flex items-center text-xs">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-slate-700">2/4 test cases</span>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-xl font-semibold">Coding Practice</h1>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {activeTab === "problems" && activeProblem && (
            <>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* LeetCode/HackerRank style action buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="gap-1"
                  onClick={handleRunCode}
                  disabled={isRunning || isSubmitting}
                >
                  {isRunning ? 
                    <RefreshCw className="h-4 w-4 animate-spin" /> : 
                    <Play className="h-4 w-4" />
                  }
                  Run
                </Button>
                
                <Button 
                  size="sm"
                  className="gap-1"
                  onClick={handleSubmit}
                  disabled={isRunning || isSubmitting}
                >
                  {isSubmitting ? 
                    <RefreshCw className="h-4 w-4 animate-spin" /> : 
                    <CheckSquare className="h-4 w-4" />
                  }
                  Submit
                </Button>
                
                <div className="border-l h-6 mx-1"></div>
                
                <Button variant="ghost" size="sm" className="gap-1">
                  <HelpCircle className="h-4 w-4" />
                  Hint
                </Button>
                
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Solution
                </Button>
                
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                  {showSidebar ? 
                    <PanelRight className="h-4 w-4" /> : 
                    <PanelLeft className="h-4 w-4" />
                  }
                </Button>
              </div>
            </>
          )}
          
          {!activeProblem && (
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search problems..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content - fixed height, no scrolling */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabs for navigation */}
        {!activeProblem && (
          <div className="border-b bg-white sticky top-0 z-10">
            <div className="max-w-screen-xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b-0 rounded-none h-12 bg-transparent">
                  <TabsTrigger value="problems" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                    <ListChecks className="h-4 w-4 mr-2" />
                    Problems
                  </TabsTrigger>
                  <TabsTrigger value="exercises" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Exercises
                  </TabsTrigger>
                  <TabsTrigger value="competitions" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                    <Trophy className="h-4 w-4 mr-2" />
                    Competitions
                  </TabsTrigger>
                  <TabsTrigger value="playground" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                    <Code className="h-4 w-4 mr-2" />
                    Playground
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}
        
        {/* Show problem list or problem + editor */}
        {activeTab === "problems" && !activeProblem ? (
          <ProblemListView 
            challenges={challenges} 
            onSelectProblem={handleProblemSelect}
            view={problemListView}
            setView={setProblemListView}
          />
        ) : activeTab === "problems" && activeProblem ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Problem description sidebar with independent scrolling */}
            {showSidebar && (
              <div className="w-[400px] border-r overflow-y-auto flex-shrink-0 h-full">
                {/* LeetCode/HackerRank style info panel */}
                <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-2 sticky top-0 z-10">
                  <span className="text-sm font-medium">Problem Description</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="description" className="flex-1 flex flex-col">
                  <div className="border-b sticky top-[40px] bg-white z-10">
                    <TabsList className="h-10 w-full justify-start rounded-none bg-transparent px-4">
                      <TabsTrigger value="description" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                        Description
                      </TabsTrigger>
                      <TabsTrigger value="solution" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                        Solution
                      </TabsTrigger>
                      <TabsTrigger value="submissions" className="h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                        Submissions
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="description" className="flex-1 overflow-y-auto p-0 m-0">
                    <div className="p-4 space-y-4">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{activeProblem.title}</h2>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className={getDifficultyColor(activeProblem.difficulty).badge}>
                            {activeProblem.difficulty}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            Acceptance: {activeProblem.acceptance}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Submissions: {activeProblem.submissions?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: activeProblem.description }}></div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Examples:</h3>
                        <div className="space-y-3">
                          {activeProblem.examples.map((example: any, i: number) => (
                            <div key={i} className="rounded-md border overflow-hidden">
                              <div className="bg-slate-50 px-3 py-1 text-xs font-medium border-b">
                                Example {i + 1}
                              </div>
                              <div className="p-3 space-y-2 text-sm">
                                <div>
                                  <div className="font-medium text-xs text-muted-foreground">Input:</div>
                                  <pre className="mt-1 rounded bg-slate-100 p-2 text-xs">{example.input}</pre>
                                </div>
                                <div>
                                  <div className="font-medium text-xs text-muted-foreground">Output:</div>
                                  <pre className="mt-1 rounded bg-slate-100 p-2 text-xs">{example.output}</pre>
                                </div>
                                {example.explanation && (
                                  <div>
                                    <div className="font-medium text-xs text-muted-foreground">Explanation:</div>
                                    <div className="mt-1 text-xs">{example.explanation}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Constraints:</h3>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                          {activeProblem.constraints.map((constraint: string, i: number) => (
                            <li key={i}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {activeProblem.tags && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Tags:</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProblem.tags.map((tag: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs font-normal">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeProblem.companies && (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Companies:</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProblem.companies.map((company: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="solution" className="flex-1 overflow-y-auto p-0 m-0">
                    <div className="p-4">
                      <div className="rounded-lg border bg-amber-50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-5 w-5 text-amber-600" />
                          <h3 className="font-medium">Premium Content</h3>
                        </div>
                        <p className="text-sm mb-3">
                          Detailed solution with multiple approaches is available for premium members.
                        </p>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">Upgrade to Pro</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="submissions" className="flex-1 overflow-y-auto p-0 m-0">
                    <div className="p-4">
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                          <FileCode className="h-6 w-6 text-slate-500" />
                        </div>
                        <h3 className="font-medium mb-1">No submissions yet</h3>
                        <p className="text-sm text-muted-foreground">Submit your solution to see your results here</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Fixed position editor container - Contains both editor and console in fixed view */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex flex-col">
                {/* Editor section - adjusts height based on console height */}
                <div className="flex-1" style={{ height: `calc(100% - ${consoleHeight}px)` }}>
                  <MonacoEditor 
                    code={code}
                    language={language}
                    onChange={(value) => setCode(value)}
                    onRun={handleRunCode}
                  />
                </div>
                
                {/* Resizer handle */}
                <div 
                  className="h-1 bg-slate-200 hover:bg-blue-400 cursor-ns-resize"
                  onMouseDown={handleConsoleResize}
                />
                
                {/* Console panel with controlled height */}
                <div 
                  className="border-t flex flex-col bg-gray-900" 
                  style={{ height: `${consoleHeight}px` }}
                >
                  <Tabs defaultValue="console" className="flex flex-col h-full">
                    <div className="bg-slate-100 border-b px-3 py-1.5 flex items-center justify-between">
                      <TabsList className="h-8">
                        <TabsTrigger value="testcases" className="h-7 text-xs font-medium">
                          Test Cases {testResults.length > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-slate-200">
                              {testResults.filter((t: any) => t.status === 'passed').length}/{testResults.length}
                            </span>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="console" className="h-7 text-xs font-medium">
                          Console {consoleOutput && <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>}
                        </TabsTrigger>
                      </TabsList>
                      
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => {
                        setConsoleOutput("");
                        setTestResults([]);
                      }}>
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        Clear
                      </Button>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                      <TabsContent value="testcases" className="p-0 m-0 h-full bg-white">
                        {testResults.length > 0 ? (
                          <div className="divide-y">
                            {testResults.map((result: any) => (
                              <div key={result.id} className="flex p-3 hover:bg-slate-50 transition-colors">
                                <div className="w-8 flex-shrink-0 flex items-start justify-center pt-0.5">
                                  {result.status === 'passed' ? (
                                    <div className="rounded-full bg-green-100 p-1">
                                      <CheckCircle className="text-green-600 h-4 w-4" />
                                    </div>
                                  ) : (
                                    <div className="rounded-full bg-red-100 p-1">
                                      <XSquare className="text-red-600 h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium flex items-center">
                                    Test Case {result.id}
                                    {result.status === 'passed' ? (
                                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800">Passed</span>
                                    ) : (
                                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-800">Failed</span>
                                    )}
                                  </div>
                                  <div className="mt-2 space-y-2">
                                    <div className="text-xs rounded-md bg-slate-50 p-2">
                                      <span className="font-medium text-slate-700 block mb-1">Input:</span>
                                      <code className="text-slate-800 font-mono">{result.input}</code>
                                    </div>
                                    <div className="text-xs rounded-md bg-slate-50 p-2">
                                      <span className="font-medium text-slate-700 block mb-1">Expected:</span>
                                      <code className="text-slate-800 font-mono">{result.expected}</code>
                                    </div>
                                    {result.status !== 'passed' && (
                                      <div className="text-xs rounded-md bg-red-50 p-2">
                                        <span className="font-medium text-red-700 block mb-1">Your Output:</span>
                                        <code className="text-red-800 font-mono">{result.output}</code>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="text-center">
                              <div className="rounded-full bg-slate-100 p-3 mx-auto mb-3 w-fit">
                                <AlertCircle className="h-6 w-6 text-slate-400" />
                              </div>
                              <p className="font-medium text-slate-600">Run your code to see test results</p>
                              <p className="text-xs text-slate-500 mt-1">Test results will appear here after you run or submit your code</p>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="console" className="p-0 m-0 h-full">
                        <div className="h-full flex flex-col">
                          <div className="flex-1 overflow-auto bg-gray-900 text-green-400 font-mono text-sm">
                            <pre className="p-4 whitespace-pre-wrap">
                              {consoleOutput || '> Console output will appear here\n> Run your code to see the results'}
                            </pre>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "exercises" ? (
          <ExercisesTab exercises={exercises} />
        ) : activeTab === "competitions" ? (
          <CompetitionsTab competitions={competitions} />
        ) : (
          <PlaygroundTab />
        )}
      </div>
    </div>
  );
}

// ... existing component definitions ..."