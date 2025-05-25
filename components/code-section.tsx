"use client";

import { useState } from 'react';
import { Edit, Code, Copy, Check, Maximize2 } from 'lucide-react';
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
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
  
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 group shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          <span className="font-medium">Example</span>
        </div>
        <div className="flex items-center gap-2">
          {language && language !== 'unknown' && (
            <Badge variant="outline" className="text-xs">{getLanguageLabel()}</Badge>
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
        </div>
      </div>
      
      <div className="p-0">
        {isEditing ? (
          <CodeEditor 
            code={code} 
            language={language} 
          />
        ) : (
          <>
            {codeHtml ? (
              <div 
                dangerouslySetInnerHTML={{ __html: codeHtml }} 
                className="bg-slate-950 text-slate-50 p-4 overflow-x-auto font-mono text-sm" 
              />
            ) : code ? (
              <pre className="bg-slate-950 text-slate-50 p-4 overflow-x-auto font-mono text-sm">
                <code className={language ? `language-${language}` : ''}>
                  {code}
                </code>
              </pre>
            ) : (
              <div className="bg-slate-900 text-slate-50 p-4">No code available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 