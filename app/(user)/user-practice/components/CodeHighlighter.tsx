"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeHighlighter({ 
  code, 
  language = "javascript", 
  showLineNumbers = true 
}: CodeHighlighterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="relative group rounded-md overflow-hidden bg-slate-100 my-4">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-200">
        <div className="text-xs font-medium text-slate-500">
          {language}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <CopyCheck className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      
      <div className="p-4 overflow-x-auto flex">
        {showLineNumbers && (
          <div className="text-right pr-4 select-none text-slate-400 font-mono text-sm">
            {lines.map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        
        <pre className="font-mono text-sm text-slate-800 flex-1">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line || " "}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
} 