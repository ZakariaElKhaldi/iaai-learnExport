"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Copy, Download, CopyCheck, Monitor, Sun, Moon, 
  Maximize2, Minimize2, Settings
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  theme?: "dark" | "light";
  languages: Array<{
    id: string;
    name: string;
    extension: string;
    icon: string;
    color: string;
  }>;
}

export function CodeEditor({ 
  language, 
  value, 
  onChange, 
  theme = "light",
  languages
}: CodeEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (editorRef.current?.requestFullscreen) {
        editorRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  // Handle text copy
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  // Update line and character count when code changes
  useEffect(() => {
    setLineCount(value.split('\n').length);
    setCharCount(value.length);
  }, [value]);
  
  // Handle tab key in the textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const { selectionStart, selectionEnd } = e.currentTarget;
      const newValue = 
        value.substring(0, selectionStart) + 
        '  ' + 
        value.substring(selectionEnd);
      
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 2;
          textareaRef.current.selectionEnd = selectionStart + 2;
        }
      }, 0);
    }
  };
  
  // Exit fullscreen on unmount or when tab is changing
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      
      // Exit fullscreen on unmount if needed
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error(err));
      }
    };
  }, []);
  
  const currentLanguage = languages.find(lang => lang.id === language);
  
  return (
    <TooltipProvider>
      <div 
        ref={editorRef}
        className={cn(
          "relative h-full flex flex-col border rounded-none overflow-hidden transition-all duration-200",
          isFocused ? "border-blue-500 shadow-sm" : "border-slate-200",
          theme === "dark" ? "bg-slate-900" : "bg-white",
          isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
        )}
      >
        {/* Editor Header */}
        <div className={cn(
          "flex items-center justify-between px-4 py-2 border-b text-sm",
          theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200"
        )}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <span className={currentLanguage?.color || "text-slate-400"}>
                {currentLanguage?.icon}
              </span>
              <span className="font-medium">
                main.{currentLanguage?.extension}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={() => theme === "dark" ? theme = "light" : theme = "dark"}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? (
                    <Sun className="h-3.5 w-3.5" />
                  ) : (
                    <Moon className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={handleCopy}
                  aria-label="Copy code"
                >
                  {isCopied ? (
                    <CopyCheck className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isCopied ? "Copied!" : "Copy code"}</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Code Area */}
        <div className="relative flex-1 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full h-full p-4 font-mono text-sm resize-none outline-none overflow-auto",
              theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
            )}
            placeholder="// Start coding here..."
            spellCheck={false}
            aria-label={`Code editor for ${language}`}
          />
          
          {/* Line numbers - visual only */}
          <div className={cn(
            "absolute top-0 left-0 h-full px-2 pt-4 text-right select-none font-mono text-sm opacity-40",
            theme === "dark" ? "text-slate-500" : "text-slate-400"
          )} aria-hidden="true">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="leading-[1.5]">{i + 1}</div>
            ))}
          </div>
          
          {/* Status bar */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-1 text-xs border-t",
            theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
          )}>
            <div>
              {currentLanguage?.name || language}
            </div>
            <div className="flex items-center gap-4">
              <span>{lineCount} lines</span>
              <span>{charCount} characters</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 