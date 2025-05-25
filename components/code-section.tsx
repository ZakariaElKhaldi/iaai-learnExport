"use client";

import { useState } from 'react';
import { Edit, Code, Copy, Check, Maximize2, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from './code-editor';

interface CodeSectionProps {
  code: string;
  codeHtml?: string;
  language: string;
  tryItLink?: string;
}

export function CodeSection({ code, codeHtml, language }: CodeSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const getLanguageLabel = () => {
    const langMap: Record<string, string> = {
      'js': 'JavaScript',
      'javascript': 'JavaScript',
      'jsx': 'React JSX',
      'ts': 'TypeScript',
      'tsx': 'React TSX',
      'html': 'HTML',
      'css': 'CSS',
      'python': 'Python',
      'py': 'Python',
      'java': 'Java',
      'c': 'C',
      'cpp': 'C++',
      'csharp': 'C#',
      'ruby': 'Ruby',
      'php': 'PHP',
      'go': 'Go',
      'rust': 'Rust',
      'json': 'JSON',
      'xml': 'XML',
      'sql': 'SQL',
    };
    
    return langMap[language.toLowerCase()] || language;
  };
  
  const containerClasses = `${isFullscreen ? 'fixed inset-0 z-50 p-6 bg-white dark:bg-slate-950/95 overflow-auto flex items-center justify-center' : 'relative'} mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 group shadow-sm hover:shadow-md transition-shadow`;
  
  return (
    <div className={containerClasses}>
      <div className={`${isFullscreen ? 'w-full max-w-4xl' : 'w-full'}`}>
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Example</span>
          </div>
          <div className="flex items-center gap-2">
            {language && language !== 'unknown' && (
              <Badge variant="outline" className="text-xs capitalize bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{getLanguageLabel()}</Badge>
            )}
            <button 
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Copy code"
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <button 
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={isEditing ? "View code" : "Edit code"}
              onClick={() => setIsEditing(!isEditing)}
              title={isEditing ? "View code" : "Edit code"}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="p-0">
          {isEditing ? (
            <CodeEditor 
              code={code} 
              language={language} 
              defaultHeight={isFullscreen ? "70vh" : "350px"}
            />
          ) : (
            <div className={`relative ${isFullscreen ? 'min-h-[70vh]' : ''}`}>
              {/* Add dots UI to mimic a code editor window */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-3 z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
              </div>
              
              {codeHtml ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: codeHtml }} 
                  className="bg-[var(--code-bg)] text-[var(--code-fg)] pt-10 pb-4 px-4 overflow-x-auto font-mono text-sm code-editor-theme"
                  style={{ minHeight: isFullscreen ? "70vh" : "350px" }}
                />
              ) : code ? (
                <pre 
                  className="bg-[var(--code-bg)] text-[var(--code-fg)] pt-10 pb-4 px-4 overflow-x-auto font-mono text-sm code-editor-theme"
                  style={{ minHeight: isFullscreen ? "70vh" : "350px" }}
                >
                  <code className={language ? `language-${language}` : ''}>
                    {code}
                  </code>
                </pre>
              ) : (
                <div className="bg-[var(--code-bg)] text-[var(--code-fg)] p-4 code-editor-theme" style={{ minHeight: isFullscreen ? "70vh" : "350px" }}>
                  No code available
                </div>
              )}
            </div>
          )}
        </div>
        
        {isFullscreen && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-md flex items-center gap-2"
            >
              Exit Fullscreen
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 