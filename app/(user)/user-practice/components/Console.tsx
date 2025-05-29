"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Copy, CopyCheck, Trash2, Terminal } from "lucide-react";

interface ConsoleProps {
  content: string;
  isVisible: boolean;
  onClose: () => void;
  onClear: () => void;
  isProcessing?: boolean;
}

export function Console({ 
  content, 
  isVisible, 
  onClose, 
  onClear, 
  isProcessing = false 
}: ConsoleProps) {
  const [isCopied, setIsCopied] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when content updates
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [content]);
  
  // Copy console output to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="h-64 bg-slate-900 text-white overflow-hidden border-t border-slate-700 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between p-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-400" />
          <div className="text-xs font-medium">Console Output</div>
          {isProcessing && (
            <div className="animate-pulse flex items-center">
              <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-1"></span>
              <span className="text-xs text-green-500">Running...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-slate-400 hover:text-white" 
            onClick={onClear}
            title="Clear console"
            aria-label="Clear console"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-slate-400 hover:text-white" 
            onClick={handleCopy}
            title={isCopied ? "Copied!" : "Copy output"}
            aria-label={isCopied ? "Copied!" : "Copy output"}
          >
            {isCopied ? (
              <CopyCheck className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-slate-400 hover:text-white" 
            onClick={onClose}
            title="Close console"
            aria-label="Close console"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div 
        ref={consoleRef}
        className="p-3 font-mono text-sm whitespace-pre-wrap h-[calc(100%-32px)] overflow-y-auto"
        aria-live="polite"
        aria-label="Console output"
      >
        {content ? (
          <div className="space-y-1">
            {content.split('\n').map((line, index) => (
              <div key={index} className={cn(
                line.includes('Error') ? 'text-red-400' :
                line.includes('Warning') ? 'text-yellow-400' :
                line.includes('Success') ? 'text-green-400' :
                line.startsWith('>') ? 'text-blue-400' :
                'text-slate-300'
              )}>
                {line}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 italic">
            Run your code to see the output here.
          </div>
        )}
        {isProcessing && (
          <div className="text-green-400 mt-2 inline-flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
} 