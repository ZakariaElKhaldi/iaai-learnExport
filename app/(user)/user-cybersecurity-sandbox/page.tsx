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
  Server, 
  Shield, 
  Terminal,
  ChevronLeft, 
  ChevronRight,
  CheckCircle, 
  Book, 
  RefreshCw, 
  PanelLeft, 
  PanelRight,
  Network,
  Monitor,
  Target,
  Lock,
  ShieldAlert,
  Radar,
  BadgeDollarSign,
  File,
  FileWarning,
  Cpu,
  Award,
  Hammer,
  Clock,
  Users,
  ArrowRight,
  Search,
  Calendar,
  Bell
} from "lucide-react";
import { AttackSimulation } from "./components/AttackSimulation";
import { VulnerabilityScanner } from "./components/VulnerabilityScanner";
import { CyberRange } from "./components/CyberRange";

// Security challenge scenarios
const securityChallenges = [
  {
    id: "web-vuln-101",
    title: "Web Vulnerability Assessment",
    description: "Identify and exploit common web vulnerabilities in a controlled environment.",
    level: "Beginner",
    category: "Web Security",
    objectives: [
      "Find and exploit XSS vulnerabilities",
      "Identify SQL injection entry points",
      "Discover CSRF vulnerabilities",
      "Bypass client-side validation"
    ],
    tools: ["Burp Suite", "OWASP ZAP", "Browser Dev Tools"],
    estimatedTime: "2 hours",
    popularity: 94,
    completion: 78,
    environment: "Web Application Testing Lab"
  },
  {
    id: "network-pent-201",
    title: "Network Penetration Testing",
    description: "Learn how to scan, enumerate, and exploit network services within an isolated network.",
    level: "Intermediate",
    category: "Network Security",
    objectives: [
      "Perform network reconnaissance",
      "Identify vulnerable services",
      "Exploit vulnerable network services",
      "Establish persistence and pivot"
    ],
    tools: ["Nmap", "Metasploit", "Wireshark"],
    estimatedTime: "4 hours",
    popularity: 88,
    completion: 62,
    environment: "Virtual Network Lab"
  },
  {
    id: "crypto-303",
    title: "Cryptography Challenges",
    description: "Break various cryptographic implementations and understand common cryptographic vulnerabilities.",
    level: "Advanced",
    category: "Cryptography",
    objectives: [
      "Crack weak encryption algorithms",
      "Exploit implementation flaws",
      "Perform key recovery attacks",
      "Exploit padding oracle vulnerabilities"
    ],
    tools: ["OpenSSL", "CyberChef", "Python Cryptographic Libraries"],
    estimatedTime: "3 hours",
    popularity: 72,
    completion: 45,
    environment: "Cryptographic Analysis VM"
  }
];

// CTF-style challenges
const ctfChallenges = [
  {
    id: "ctf-webapp-1",
    title: "Flag Hunter: Web Edition",
    description: "A series of challenges requiring you to exploit web vulnerabilities to capture flags.",
    difficulty: "Medium",
    category: "Web Security",
    points: 500,
    timeLimit: "60 minutes",
    completionRate: 32,
    tags: ["SQLi", "XSS", "Authentication"]
  },
  {
    id: "ctf-forensics-2",
    title: "Digital Detective",
    description: "Analyze digital evidence to uncover clues and reveal hidden flags in various file formats.",
    difficulty: "Hard",
    category: "Digital Forensics",
    points: 750,
    timeLimit: "90 minutes",
    completionRate: 18,
    tags: ["Memory Analysis", "Steganography", "File Carving"]
  },
  {
    id: "ctf-reverse-3",
    title: "Binary Breaker",
    description: "Reverse engineer compiled programs to discover vulnerabilities and extract hidden flags.",
    difficulty: "Expert",
    category: "Reverse Engineering",
    points: 1000,
    timeLimit: "120 minutes",
    completionRate: 8,
    tags: ["Binary Analysis", "Assembly", "Debugging"]
  }
];

// User's active environments
const userEnvironments = [
  {
    id: "env-12345",
    name: "Web Testing Lab",
    type: "Web Security",
    status: "active",
    createdAt: "2023-11-10T14:30:00Z",
    expiresAt: "2023-11-17T14:30:00Z",
    progress: 65
  },
  {
    id: "env-23456",
    name: "Network Security Lab",
    type: "Network Security",
    status: "paused",
    createdAt: "2023-10-25T09:15:00Z",
    expiresAt: "2023-11-25T09:15:00Z",
    progress: 32
  }
];

// Helper function for difficulty/level colors
const getLevelColor = (level: string) => {
  switch(level.toLowerCase()) {
    case 'beginner': return {
      badge: 'bg-green-100 text-green-800',
      text: 'text-green-600',
      border: 'border-green-500'
    };
    case 'intermediate': return {
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-600',
      border: 'border-blue-500'
    };
    case 'advanced': return {
      badge: 'bg-purple-100 text-purple-800',
      text: 'text-purple-600',
      border: 'border-purple-500'
    };
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
    case 'expert': return {
      badge: 'bg-purple-100 text-purple-800',
      text: 'text-purple-600',
      border: 'border-purple-500'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800',
      text: 'text-slate-600',
      border: 'border-slate-500'
    };
  }
};

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch(status) {
    case "active": return "bg-green-100 text-green-800";
    case "paused": return "bg-amber-100 text-amber-800";
    case "expired": return "bg-red-100 text-red-800";
    case "completed": return "bg-blue-100 text-blue-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

export default function CybersecuritySandboxPage() {
  const [activeTab, setActiveTab] = useState("scenarios");
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [filterOpen, setFilterOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
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
  
  // Calculate content height (viewport minus header)
  const getContentHeight = () => {
    return `calc(100dvh - ${headerHeight}px)`;
  };
  
  // Determine if we should show the sidebar based on screen size
  const shouldShowSidebar = () => {
    return showSidebar && (windowWidth > 768 || !activeScenario);
  };
  
  // Calculate sidebar width based on viewport
  const getSidebarWidth = () => {
    if (windowWidth <= 640) return "100%";
    if (windowWidth <= 1024) return "350px";
    return "400px";
  };
  
  // Filter challenges based on selected filters and search query
  const getFilteredChallenges = () => {
    return securityChallenges.filter(challenge => {
      const matchesCategory = selectedCategory === "all" || challenge.category.toLowerCase().includes(selectedCategory);
      const matchesDifficulty = selectedDifficulty === "all" || challenge.level.toLowerCase() === selectedDifficulty;
      const matchesSearch = !searchQuery || 
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  };
  
  const filteredChallenges = getFilteredChallenges();
  
  // Helper function to display feature demo
  const openFeatureDemo = (feature: string) => {
    setActiveFeature(feature);
  };
  
  // Helper function to close feature demo
  const closeFeatureDemo = () => {
    setActiveFeature(null);
  };
  
  return (
    <div className="flex flex-col h-screen bg-white">
      <header 
        ref={headerRef}
        className="flex items-center justify-between border-b bg-white px-4 py-3 z-20 flex-shrink-0 sticky top-0"
      >
        <div className="flex items-center gap-2">
          {activeScenario ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setActiveScenario(null)} className="gap-1 mr-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-lg font-medium truncate max-w-md">{activeScenario.title}</span>
              <Badge className={getLevelColor(activeScenario.level || activeScenario.difficulty).badge}>
                {activeScenario.level || activeScenario.difficulty}
              </Badge>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Cybersecurity Sandbox</h1>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {!activeScenario && (
            <>
              <div className="relative sm:w-64">
                <Input 
                  type="search" 
                  placeholder="Search challenges..." 
                  className="pl-9 pr-8"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1 h-7 w-7 p-0" 
                    onClick={() => setSearchQuery("")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                )}
              </div>
              <Button 
                variant={filterOpen ? "default" : "outline"} 
                size="sm" 
                className="gap-1"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span className="hidden sm:inline">Filter</span>
                {(selectedCategory !== "all" || selectedDifficulty !== "all") && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-primary text-white rounded-full ml-1">
                    {(selectedCategory !== "all" ? 1 : 0) + (selectedDifficulty !== "all" ? 1 : 0)}
                  </span>
                )}
              </Button>
              <Button size="sm" className="gap-1">
                <Terminal className="h-4 w-4 mr-1" />
                <span>Start Challenge</span>
              </Button>
            </>
          )}
          {activeScenario && (
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" className="gap-1">
                <Terminal className="h-4 w-4" />
                <span className="hidden sm:inline">Start Environment</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 hidden md:flex">
                <Target className="h-4 w-4" />
                <span>Objectives</span>
              </Button>
              
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar ? 
                  <PanelRight className="h-4 w-4" /> : 
                  <PanelLeft className="h-4 w-4" />
                }
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex overflow-hidden" style={{ height: getContentHeight() }}>
        {/* Always render the Tabs component but conditionally show content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!activeScenario && (
            <div className="w-full">
              <div className="border-b bg-white sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto">
                  <TabsList className="w-full justify-start border-b-0 rounded-none h-12 bg-transparent overflow-x-auto">
                    <TabsTrigger value="scenarios" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Target className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Training Scenarios</span>
                      <span className="sm:hidden">Scenarios</span>
                    </TabsTrigger>
                    <TabsTrigger value="ctf" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Capture The Flag</span>
                      <span className="sm:hidden">CTF</span>
                    </TabsTrigger>
                    <TabsTrigger value="environments" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      <Server className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">My Environments</span>
                      <span className="sm:hidden">Envs</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-4 overflow-y-auto">
                <div className="max-w-screen-xl mx-auto">
                  {/* Filter dropdown */}
                  {filterOpen && (
                    <Card className="mb-6 border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="space-y-2 flex-1">
                            <h4 className="text-sm font-medium">Category</h4>
                            <div className="flex flex-wrap gap-2">
                              {["all", "web", "network", "crypto"].map((category) => (
                                <Button
                                  key={category}
                                  size="sm"
                                  variant={selectedCategory === category ? "default" : "outline"}
                                  className="h-8 text-xs capitalize"
                                  onClick={() => setSelectedCategory(category)}
                                >
                                  {category === "all" ? "All Categories" : `${category} Security`}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2 flex-1">
                            <h4 className="text-sm font-medium">Difficulty</h4>
                            <div className="flex flex-wrap gap-2">
                              {["all", "beginner", "intermediate", "advanced"].map((level) => (
                                <Button
                                  key={level}
                                  size="sm"
                                  variant={selectedDifficulty === level ? "default" : "outline"}
                                  className="h-8 text-xs capitalize"
                                  onClick={() => setSelectedDifficulty(level)}
                                >
                                  {level === "all" ? "All Levels" : level}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <TabsContent value="scenarios" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Training Scenarios</h2>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          {filteredChallenges.length} scenarios available
                        </div>
                      </div>
                    </div>
                    
                    {filteredChallenges.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredChallenges.map((challenge) => {
                          const levelColors = getLevelColor(challenge.level);
                          return (
                            <Card 
                              key={challenge.id} 
                              className="hover:shadow-md transition-all cursor-pointer border group"
                              onClick={() => setActiveScenario(challenge)}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <Badge className={levelColors.badge}>{challenge.level}</Badge>
                                  <Badge variant="outline">{challenge.category}</Badge>
                                </div>
                                <CardTitle className="mt-2 text-base group-hover:text-blue-600 transition-colors">
                                  {challenge.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                  {challenge.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="space-y-4">
                                  <div className="flex flex-wrap gap-2">
                                    <div className="text-xs bg-slate-100 rounded-full px-2 py-1 text-slate-700 flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {challenge.estimatedTime}
                                    </div>
                                    <div className="text-xs bg-slate-100 rounded-full px-2 py-1 text-slate-700 flex items-center">
                                      <Users className="h-3.5 w-3.5 mr-1" />
                                      {challenge.popularity}% popularity
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Completion Rate</span>
                                      <span>{challenge.completion}%</span>
                                    </div>
                                    <Progress value={challenge.completion} className="h-1" />
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="border-t pt-3 flex justify-between">
                                <div className="text-xs text-muted-foreground flex items-center">
                                  <Cpu className="h-3.5 w-3.5 mr-1" />
                                  {challenge.environment}
                                </div>
                                <Button variant="ghost" size="sm" className="gap-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ArrowRight className="h-3.5 w-3.5" />
                                  <span>Start</span>
                                </Button>
                              </CardFooter>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed rounded-lg">
                        <div className="bg-muted/50 rounded-full p-3 w-fit mx-auto mb-4">
                          <Target className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No scenarios found</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                          Try adjusting your filters or search term to find what you're looking for.
                        </p>
                        <Button onClick={() => {
                          setSelectedCategory("all");
                          setSelectedDifficulty("all");
                          setSearchQuery("");
                        }}>
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="ctf" className="mt-0">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Capture The Flag Challenges</h2>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Award className="h-4 w-4 mr-1" />
                        Leaderboard
                      </Button>
                    </div>
                    
                    {/* Featured CTF event */}
                    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                              <Award className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">Weekend CTF Challenge</h3>
                              <p className="text-sm text-muted-foreground">Compete against others in our weekly CTF event. Starts Friday at 6 PM.</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">1500 Points</Badge>
                            <Button>Register Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ctfChallenges.map((challenge) => {
                        const diffColors = getLevelColor(challenge.difficulty);
                        return (
                          <Card 
                            key={challenge.id} 
                            className="hover:shadow-md transition-all cursor-pointer border"
                            onClick={() => setActiveScenario(challenge)}
                          >
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <Badge className={diffColors.badge}>
                                  {challenge.difficulty}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs">
                                  <BadgeDollarSign className="h-3.5 w-3.5" />
                                  <span className="font-semibold">{challenge.points} pts</span>
                                </div>
                              </div>
                              <CardTitle className="mt-2">{challenge.title}</CardTitle>
                              <CardDescription className="line-clamp-2">
                                {challenge.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {challenge.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs font-normal">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Success Rate</span>
                                  <span className="font-medium">{challenge.completionRate}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      challenge.completionRate > 30 ? 'bg-green-500' :
                                      challenge.completionRate > 10 ? 'bg-amber-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${challenge.completionRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{challenge.timeLimit}</span>
                                </div>
                                <Button size="sm">
                                  Start Challenge
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                  <TabsContent value="environments" className="mt-0">
                    <p>My environments content will be implemented next</p>
                  </TabsContent>
                  <TabsContent value="tools" className="mt-0">
                    <p>Security tools content will be implemented next</p>
                  </TabsContent>
                </div>
              </div>
            </div>
          )}
          
          {/* Scenario detail view - still within Tabs context */}
          {activeScenario && (
            <div className="flex w-full">
              {/* Scenario details content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p>Scenario detail content will be implemented next</p>
              </div>
              
              {/* Optional sidebar */}
              {shouldShowSidebar() && (
                <div 
                  className="border-l overflow-y-auto flex-shrink-0 h-full transition-all duration-300 bg-white"
                  style={{ width: getSidebarWidth() }}
                >
                  <p className="p-4">Scenario sidebar content will be implemented next</p>
                </div>
              )}
            </div>
          )}
        </Tabs>
      </div>
      
      {/* Future Feature Demos */}
      {activeFeature === "attack-simulation" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <AttackSimulation onClose={closeFeatureDemo} />
        </div>
      )}
      
      {activeFeature === "vulnerability-scanner" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <VulnerabilityScanner onClose={closeFeatureDemo} />
        </div>
      )}
      
      {activeFeature === "cyber-range" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <CyberRange onClose={closeFeatureDemo} />
        </div>
      )}
      
      {/* Add Feature Preview Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Coming Soon: Advanced Cybersecurity Training Features</h2>
          <p className="text-slate-600 mb-6">
            Explore interactive previews of our upcoming cybersecurity training features that will enhance your learning experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Attack Simulation Preview */}
            <Card className="overflow-hidden">
              <CardHeader className="p-4 pb-2 bg-gradient-to-r from-red-50 to-amber-50">
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  Attack Simulation
                </CardTitle>
                <CardDescription>
                  Simulate real-world cyber attacks in a controlled environment
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4 text-sm text-slate-600">
                  Experience how attackers target networks and systems to better understand defensive strategies and incident response.
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Multi-stage attack simulations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Real-time network visualization</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Detailed attack analysis reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-slate-50 flex justify-center">
                <Button onClick={() => openFeatureDemo("attack-simulation")}>
                  Preview Feature
                </Button>
              </CardFooter>
            </Card>
            
            {/* Vulnerability Scanner Preview */}
            <Card className="overflow-hidden">
              <CardHeader className="p-4 pb-2 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Vulnerability Scanner
                </CardTitle>
                <CardDescription>
                  Find and analyze security vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4 text-sm text-slate-600">
                  Learn to identify security weaknesses in systems and applications using professional vulnerability scanning techniques.
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive scanning tools</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>CVE database integration</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Vulnerability remediation guidance</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-slate-50 flex justify-center">
                <Button onClick={() => openFeatureDemo("vulnerability-scanner")}>
                  Preview Feature
                </Button>
              </CardFooter>
            </Card>
            
            {/* Cyber Range Preview */}
            <Card className="overflow-hidden">
              <CardHeader className="p-4 pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-500" />
                  Cyber Range
                </CardTitle>
                <CardDescription>
                  Complete scenario-based cybersecurity challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4 text-sm text-slate-600">
                  Engage in realistic security scenarios designed to enhance your technical skills and decision-making in cybersecurity operations.
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Realistic enterprise environments</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Offensive and defensive scenarios</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Individual and team challenges</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-slate-50 flex justify-center">
                <Button onClick={() => openFeatureDemo("cyber-range")}>
                  Preview Feature
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Feature Release Schedule
          </h3>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                Q3 2023
              </div>
              <div>
                <h4 className="font-medium">Vulnerability Scanner</h4>
                <p className="text-sm text-slate-600">Comprehensive vulnerability scanning and reporting tools</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                Q4 2023
              </div>
              <div>
                <h4 className="font-medium">Attack Simulation Platform</h4>
                <p className="text-sm text-slate-600">Interactive attack simulation with detailed analytics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                Q1 2024
              </div>
              <div>
                <h4 className="font-medium">Cyber Range Environments</h4>
                <p className="text-sm text-slate-600">Realistic scenario-based training with advanced environments</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Bell className="mr-2 h-4 w-4" />
              Get Notified When New Features Launch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 