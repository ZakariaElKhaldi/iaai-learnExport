"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShieldAlert,
  Globe,
  Server,
  Cpu,
  Users,
  Clock,
  Award,
  Activity,
  Laptop,
  Layers,
  RefreshCw,
  PlayCircle,
  MonitorCheck,
  Terminal,
  Upload,
  DownloadCloud,
  Network,
  BarChart,
  Lock,
  CheckCircle,
  XCircle,
  Trophy
} from "lucide-react";

interface CyberRangeProps {
  onClose: () => void;
}

export function CyberRange({ onClose }: CyberRangeProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for cyber range environments
  const environments = [
    {
      id: "env-1",
      name: "Corporate Network Defense",
      description: "Defend a corporate network against various attack vectors",
      difficulty: "Intermediate",
      duration: "4 hours",
      participants: 1,
      type: "Defense",
      status: "Ready",
      progress: 0,
      scenarios: [
        "Detect and prevent phishing attacks",
        "Configure network firewall rules",
        "Identify and mitigate malware infections",
        "Implement security controls for sensitive data"
      ],
      resources: {
        networks: 2,
        servers: 5,
        workstations: 8,
        routers: 2
      }
    },
    {
      id: "env-2",
      name: "Web Application Hacking",
      description: "Exploit vulnerabilities in web applications to find security flaws",
      difficulty: "Advanced",
      duration: "3 hours",
      participants: 1,
      type: "Offense",
      status: "Ready",
      progress: 0,
      scenarios: [
        "Perform SQL injection attacks",
        "Exploit XSS vulnerabilities",
        "Bypass authentication mechanisms",
        "Test for CSRF vulnerabilities"
      ],
      resources: {
        networks: 1,
        servers: 3,
        workstations: 2,
        routers: 1
      }
    },
    {
      id: "env-3",
      name: "Incident Response",
      description: "Investigate and respond to a security breach in progress",
      difficulty: "Expert",
      duration: "5 hours",
      participants: 2,
      type: "Defense",
      status: "In Progress",
      progress: 45,
      scenarios: [
        "Identify compromised systems",
        "Analyze malware samples",
        "Contain the breach",
        "Recover affected systems",
        "Document the incident"
      ],
      resources: {
        networks: 3,
        servers: 7,
        workstations: 12,
        routers: 3
      }
    }
  ];
  
  // Mock data for user's achievements
  const achievements = [
    {
      id: "ach-1",
      name: "First Blood",
      description: "Complete your first cyber range scenario",
      completed: true,
      date: "2023-06-15"
    },
    {
      id: "ach-2",
      name: "Network Defender",
      description: "Successfully defend a network against all attack vectors",
      completed: true,
      date: "2023-07-22"
    },
    {
      id: "ach-3",
      name: "Bug Hunter",
      description: "Find 10 vulnerabilities in web applications",
      completed: false,
      progress: 70
    },
    {
      id: "ach-4",
      name: "Incident Master",
      description: "Successfully handle 5 major security incidents",
      completed: false,
      progress: 40
    },
    {
      id: "ach-5",
      name: "Forensics Expert",
      description: "Complete all forensics analysis challenges",
      completed: false,
      progress: 20
    }
  ];
  
  // Mock data for leaderboard
  const leaderboard = [
    { rank: 1, name: "SecurityNinja", points: 15750, badges: 12 },
    { rank: 2, name: "HackMaster", points: 14200, badges: 10 },
    { rank: 3, name: "CyberDefender", points: 13800, badges: 11 },
    { rank: 4, name: "NetworkWizard", points: 12600, badges: 9 },
    { rank: 5, name: "CurrentUser", points: 10800, badges: 8, isCurrentUser: true },
    { rank: 6, name: "CodeBreaker", points: 9500, badges: 7 },
    { rank: 7, name: "SecureShield", points: 8900, badges: 6 },
    { rank: 8, name: "FirewallPro", points: 7200, badges: 5 }
  ];
  
  // Difficulty color mapping
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-lg max-w-5xl w-full mx-auto overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-slate-50">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Cyber Range Platform</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      
      <div className="border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start px-4 pt-2 bg-transparent">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="environments" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
              Environments
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white data-[state=active]:shadow-none">
              Leaderboard
            </TabsTrigger>
          </TabsList>
      
      <div className="p-4">
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-500">Overall Completion</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-xs text-slate-500">Scenarios Completed</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">8,600</div>
                      <div className="text-xs text-slate-500">Points Earned</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">Last activity: 2 days ago</span>
                    </div>
                    <Badge>Rank #5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Next Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="bg-blue-100 p-2 rounded">
                      <ShieldAlert className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Malware Analysis Lab</h4>
                      <p className="text-xs text-slate-500">Analyze and reverse engineer malware samples</p>
                    </div>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="bg-purple-100 p-2 rounded">
                      <Lock className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cryptography Challenges</h4>
                      <p className="text-xs text-slate-500">Solve encryption and decryption puzzles</p>
                    </div>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div className="bg-amber-100 p-2 rounded">
                      <Server className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Cloud Security</h4>
                      <p className="text-xs text-slate-500">Identify and fix cloud infrastructure vulnerabilities</p>
                    </div>
                    <Badge variant="outline">Expert</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  View All Challenges
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-green-100 p-2 h-fit rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Network Defense Challenge</span> completed successfully
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-green-50">
                        +350 points
                      </Badge>
                      <span className="text-xs text-slate-500">2 days ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-amber-100 p-2 h-fit rounded-full">
                    <Award className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm">
                      Achievement unlocked: <span className="font-medium">Network Defender</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-amber-50">
                        +500 points
                      </Badge>
                      <span className="text-xs text-slate-500">5 days ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-red-100 p-2 h-fit rounded-full">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Web Exploitation Challenge</span> failed
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-red-50">
                        0 points
                      </Badge>
                      <span className="text-xs text-slate-500">1 week ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 h-fit rounded-full">
                    <PlayCircle className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm">
                      Started <span className="font-medium">Incident Response Scenario</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="environments" className="mt-0">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Available Environments</h3>
            <Button>
              <PlayCircle className="mr-2 h-4 w-4" />
              Launch New Environment
            </Button>
          </div>
          
          <div className="space-y-4">
            {environments.map((env) => (
              <Card key={env.id} className="overflow-hidden">
                <div className="border-l-4 border-blue-500">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{env.name}</CardTitle>
                        <CardDescription>{env.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(env.difficulty)}>
                        {env.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div className="text-sm">
                          <span className="text-slate-500">Duration:</span> {env.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <div className="text-sm">
                          <span className="text-slate-500">Participants:</span> {env.participants}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-slate-400" />
                        <div className="text-sm">
                          <span className="text-slate-500">Type:</span> {env.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={env.status === "In Progress" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                        >
                          {env.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {env.status === "In Progress" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-500">Progress</span>
                          <span className="text-sm font-medium">{env.progress}%</span>
                        </div>
                        <Progress value={env.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Scenarios</h4>
                        <ul className="space-y-1">
                          {env.scenarios.map((scenario, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="rounded-full bg-slate-200 text-slate-600 w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span>{scenario}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Resources</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                            <Network className="h-4 w-4 text-blue-500" />
                            <div className="text-sm">
                              <span className="text-slate-500">Networks:</span> {env.resources.networks}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                            <Server className="h-4 w-4 text-purple-500" />
                            <div className="text-sm">
                              <span className="text-slate-500">Servers:</span> {env.resources.servers}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                            <Laptop className="h-4 w-4 text-green-500" />
                            <div className="text-sm">
                              <span className="text-slate-500">Workstations:</span> {env.resources.workstations}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                            <Layers className="h-4 w-4 text-amber-500" />
                            <div className="text-sm">
                              <span className="text-slate-500">Routers:</span> {env.resources.routers}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    {env.status === "Ready" ? (
                      <Button>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Launch Environment
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline">
                          <Terminal className="mr-2 h-4 w-4" />
                          Access Console
                        </Button>
                        <Button>
                          <MonitorCheck className="mr-2 h-4 w-4" />
                          Continue Session
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">8</h3>
                  <p className="text-sm text-slate-600">Achievements Earned</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-3">
                    <BarChart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">8,600</h3>
                  <p className="text-sm text-slate-600">Total Points</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-3">
                    <Trophy className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Intermediate</h3>
                  <p className="text-sm text-slate-600">Current Rank</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((ach) => (
                  <div key={ach.id} className="border rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${ach.completed ? 'bg-green-100' : 'bg-slate-100'}`}>
                        {ach.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Award className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{ach.name}</h4>
                          {ach.completed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Completed {ach.date}
                            </Badge>
                          ) : (
                            <Badge variant="outline">In Progress</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{ach.description}</p>
                        
                        {!ach.completed && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-slate-500">Progress</span>
                              <span className="text-xs font-medium">{ach.progress}%</span>
                            </div>
                            <Progress value={ach.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Global Leaderboard</CardTitle>
                <select className="text-sm border rounded p-1">
                  <option>All Time</option>
                  <option>This Month</option>
                  <option>This Week</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-medium text-slate-500">Rank</th>
                      <th className="text-left p-2 text-sm font-medium text-slate-500">User</th>
                      <th className="text-right p-2 text-sm font-medium text-slate-500">Points</th>
                      <th className="text-right p-2 text-sm font-medium text-slate-500">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user) => (
                      <tr 
                        key={user.rank} 
                        className={`border-b hover:bg-slate-50 ${user.isCurrentUser ? 'bg-blue-50' : ''}`}
                      >
                        <td className="p-2 text-sm">
                          {user.rank <= 3 ? (
                            <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full 
                              ${user.rank === 1 ? 'bg-amber-100 text-amber-800' : 
                                user.rank === 2 ? 'bg-slate-100 text-slate-800' : 
                                'bg-orange-100 text-orange-800'}`}
                            >
                              {user.rank}
                            </div>
                          ) : (
                            user.rank
                          )}
                        </td>
                        <td className="p-2 text-sm font-medium">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge className="ml-2 text-xs" variant="outline">You</Badge>
                          )}
                        </td>
                        <td className="p-2 text-sm text-right">{user.points.toLocaleString()}</td>
                        <td className="p-2 text-sm text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Award className="h-4 w-4 text-amber-500" />
                            {user.badges}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline">
                  View Full Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="p-4 border-t bg-slate-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500">
            Realistic environments to practice and improve your cybersecurity skills.
          </div>
          <Button variant="outline" size="sm">
            Schedule Training
          </Button>
        </div>
      </div>
    </div>
  );
} 