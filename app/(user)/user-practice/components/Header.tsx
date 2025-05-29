"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileCode, ChevronLeft, PanelLeft, PanelRight, 
  ChevronUp, ChevronDown, Play, CheckCircle, RefreshCw,
  Search, X, Settings, HelpCircle
} from "lucide-react";
import { getDifficultyColor } from "../utils/helpers";

interface HeaderProps {
  activeProblem: any | null;
  language: string;
  setLanguage: (lang: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  showConsole: boolean;
  setShowConsole: (show: boolean) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
  onBackClick: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  languages: Array<{
    id: string;
    name: string;
    extension: string;
    icon: string;
    color: string;
  }>;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export function Header({
  activeProblem,
  language,
  setLanguage,
  showSidebar,
  setShowSidebar,
  showConsole,
  setShowConsole,
  onRunCode,
  onSubmitCode,
  onBackClick,
  isRunning,
  isSubmitting,
  languages,
  searchQuery = "",
  setSearchQuery = () => {}
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Detect scroll to add shadow to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`flex items-center justify-between border-b bg-white px-4 py-2 z-20 flex-shrink-0 sticky top-0 transition-shadow ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        {activeProblem ? (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackClick}
              className="gap-1 mr-1 text-slate-600"
              aria-label="Back to problem list"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Problems</span>
            </Button>
            <span className="text-lg font-medium truncate max-w-xs md:max-w-md">{activeProblem.title}</span>
            <Badge className={getDifficultyColor(activeProblem.difficulty).badge}>
              {activeProblem.difficulty}
            </Badge>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-slate-500 font-medium">Problems</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {activeProblem ? (
          <>
            <div className="relative">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px] h-8 text-sm" aria-label="Select programming language">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      <div className="flex items-center gap-2">
                        <span role="img" aria-label={lang.name}>{lang.icon}</span>
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
                className="h-8 text-sm gap-1"
                onClick={() => setShowConsole(!showConsole)}
                aria-label={showConsole ? "Hide console" : "Show console"}
                aria-expanded={showConsole}
              >
                {showConsole ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Console</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Console</span>
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                size="sm" 
                className="h-8 text-sm gap-1"
                onClick={onRunCode}
                disabled={isRunning}
                aria-label="Run code"
              >
                {isRunning ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">Run</span>
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                className="h-8 text-sm gap-1"
                onClick={onSubmitCode}
                disabled={isSubmitting}
                aria-label="Submit solution"
              >
                {isSubmitting ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CheckCircle className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">Submit</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSidebar(!showSidebar)}
              className="h-8 w-8 ml-2"
              aria-label={showSidebar ? "Hide problem description" : "Show problem description"}
              aria-expanded={showSidebar}
            >
              {showSidebar ? 
                <PanelRight className="h-4 w-4" /> : 
                <PanelLeft className="h-4 w-4" />
              }
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="relative md:w-[300px]">
              <Input 
                type="search" 
                placeholder="Search problems..." 
                className="pl-9 pr-9 h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search problems"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-6 w-6"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
} 