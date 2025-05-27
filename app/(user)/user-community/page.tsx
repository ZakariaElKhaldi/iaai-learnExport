"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageSquare, Users, TrendingUp, BookOpen, Zap, Calendar, Heart, MessageCircle, Clock, Code, Share2, AlertCircle, HelpCircle, ThumbsUp, Bookmark, Globe, Filter, User, Plus, ChevronRight } from "lucide-react";

// Mock categories data
const categories = [
  {
    id: 1,
    name: "General Discussion",
    description: "Talk about anything related to programming and development",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
    posts: 1452,
    threads: 248
  },
  {
    id: 2,
    name: "Help & Questions",
    description: "Get help with specific programming problems",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-600",
    posts: 3287,
    threads: 765
  },
  {
    id: 3,
    name: "Project Showcase",
    description: "Share your projects and get feedback from the community",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
    posts: 876,
    threads: 132
  },
  {
    id: 4,
    name: "Learning Resources",
    description: "Share and discover helpful learning materials",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
    posts: 2134,
    threads: 389
  },
  {
    id: 5,
    name: "Career & Jobs",
    description: "Discuss career development, job hunting, and interviews",
    icon: <Briefcase className="h-5 w-5" />,
    color: "bg-cyan-100 text-cyan-600",
    posts: 1654,
    threads: 294
  },
  {
    id: 6,
    name: "Events & Meetups",
    description: "Find and share upcoming tech events and meetups",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-rose-100 text-rose-600",
    posts: 543,
    threads: 98
  }
];

// Mock trending topics
const trendingTopics = [
  {
    id: 1,
    title: "How to structure a React project for scalability?",
    category: "React",
    replies: 34,
    views: 1287,
    lastActive: "23 minutes ago",
    hot: true
  },
  {
    id: 2,
    title: "Best practices for responsive design in 2023",
    category: "CSS",
    replies: 28,
    views: 942,
    lastActive: "1 hour ago",
    hot: true
  },
  {
    id: 3,
    title: "Understanding async/await in JavaScript",
    category: "JavaScript",
    replies: 45,
    views: 2165,
    lastActive: "3 hours ago",
    hot: false
  },
  {
    id: 4,
    title: "How to debug memory leaks in Node.js applications",
    category: "Node.js",
    replies: 19,
    views: 763,
    lastActive: "5 hours ago",
    hot: false
  }
];

// Mock recent discussions
const recentDiscussions = [
  {
    id: 101,
    title: "Which CSS framework is best for a new project in 2023?",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/user.jpg",
      role: "Frontend Developer"
    },
    category: "CSS",
    tags: ["frameworks", "tailwind", "bootstrap"],
    replies: 28,
    views: 756,
    posted: "2 days ago",
    excerpt: "I'm starting a new project and trying to decide between TailwindCSS, Bootstrap 5, or just going with vanilla CSS. What are your experiences with each?",
    solved: false
  },
  {
    id: 102,
    title: "Help with TypeScript generics in React components",
    author: {
      name: "David Chen",
      avatar: "/avatars/user.jpg",
      role: "Full Stack Developer"
    },
    category: "TypeScript",
    tags: ["react", "generics", "types"],
    replies: 14,
    views: 432,
    posted: "1 day ago",
    excerpt: "I'm trying to create a reusable component that can accept different data types. I'm struggling with the TypeScript generics syntax. Here's what I've tried so far...",
    solved: true
  },
  {
    id: 103,
    title: "Best practices for API error handling",
    author: {
      name: "Miguel Rodriguez",
      avatar: "/avatars/user.jpg",
      role: "Backend Developer"
    },
    category: "API",
    tags: ["error-handling", "rest", "best-practices"],
    replies: 23,
    views: 689,
    posted: "3 days ago",
    excerpt: "What are the best practices for handling API errors consistently? I'm building a REST API and want to ensure a good developer experience.",
    solved: false
  },
  {
    id: 104,
    title: "How to optimize Docker images for production",
    author: {
      name: "Priya Patel",
      avatar: "/avatars/user.jpg",
      role: "DevOps Engineer"
    },
    category: "DevOps",
    tags: ["docker", "optimization", "production"],
    replies: 19,
    views: 547,
    posted: "4 days ago",
    excerpt: "I'm looking for strategies to reduce the size of our Docker images for production. Currently, our images are over 1GB which is causing slow deployments.",
    solved: true
  }
];

// Mock online users
const onlineUsers = [
  { name: "Alex Morgan", avatar: "/avatars/user.jpg", status: "active" },
  { name: "Jamie Lee", avatar: "/avatars/user.jpg", status: "active" },
  { name: "Taylor Swift", avatar: "/avatars/user.jpg", status: "active" },
  { name: "Jordan Peterson", avatar: "/avatars/user.jpg", status: "active" },
  { name: "Casey Neistat", avatar: "/avatars/user.jpg", status: "idle" }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">Connect, share and learn with fellow developers</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search discussions..." className="pl-9" />
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>
      
      {/* Community Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Discussions</p>
              <p className="text-2xl font-bold">2,458</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Community Members</p>
              <p className="text-2xl font-bold">18,932</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Replies Today</p>
              <p className="text-2xl font-bold">342</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Online Now</p>
              <p className="text-2xl font-bold">247</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">All</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">React</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">JavaScript</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">CSS</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Node.js</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">TypeScript</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                  <Filter className="h-3 w-3 mr-1" />
                  More Filters
                </Badge>
              </div>
              
              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-sm transition-all border">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={discussion.author.avatar} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-base hover:text-blue-600 cursor-pointer">
                                  {discussion.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                  <span className="font-medium text-slate-700">{discussion.author.name}</span>
                                  <span>·</span>
                                  <span>{discussion.posted}</span>
                                  <span>·</span>
                                  <Badge variant="outline" className="font-normal text-xs">
                                    {discussion.category}
                                  </Badge>
                                  {discussion.solved && (
                                    <Badge className="bg-green-100 text-green-800 text-xs">Solved</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {discussion.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {discussion.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs font-normal">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{discussion.views} views</span>
                          </div>
                          <div className="ml-auto flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-xs">Like</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-xs">Reply</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Discussions</Button>
              </div>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4 flex gap-4">
                      <div className={`p-3 rounded-lg ${category.color} self-start`}>
                        {category.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium hover:text-blue-600">{category.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                          <span>{category.threads} threads</span>
                          <span>•</span>
                          <span>{category.posts} posts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-4">
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-sm transition-all cursor-pointer border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="font-normal text-xs">
                              {topic.category}
                            </Badge>
                            {topic.hot && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Hot</Badge>
                            )}
                          </div>
                          <h3 className="font-medium hover:text-blue-600">{topic.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span>{topic.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              <span>{topic.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>Active {topic.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "javascript", "react", "css", "typescript", "node.js", 
                    "python", "design", "api", "nextjs", "frontend", 
                    "backend", "database", "docker", "aws", "testing"
                  ].map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-slate-100 py-1.5"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start gap-2 h-auto py-2">
                <Plus className="h-4 w-4" />
                New Discussion
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-auto py-2">
                <HelpCircle className="h-4 w-4" />
                Ask Question
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-auto py-2">
                <Share2 className="h-4 w-4" />
                Share Project
              </Button>
              <Button variant="outline" className="justify-start gap-2 h-auto py-2">
                <AlertCircle className="h-4 w-4" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
          
          {/* Online Users */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Online Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 py-0">
              {onlineUsers.map((user, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-md cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                    } ring-1 ring-white`}></span>
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-center">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All Members
                <ChevronRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Ask a Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ask a Question</CardTitle>
              <CardDescription>Get help from the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Question title" />
              <Textarea placeholder="Describe your question in detail..." className="min-h-[100px]" />
              <div className="pt-2">
                <Button className="w-full">Post Question</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Community Guidelines */}
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Be respectful and kind to other members</p>
              <p>• Search before asking to avoid duplicates</p>
              <p>• Provide code examples when relevant</p>
              <p>• Use appropriate tags for better visibility</p>
              <p>• Follow our <span className="text-blue-600 hover:underline cursor-pointer">code of conduct</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Eye, Briefcase } from "lucide-react"; 