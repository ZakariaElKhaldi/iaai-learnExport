"use client";

import React from 'react';
import Link from 'next/link';
import { Code, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from '@/lib/utils';

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php' | 'ruby' | 'go' | 'swift';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Map of language names to display
const languageLabels: Record<CodeLanguage, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  csharp: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  go: 'Go',
  swift: 'Swift'
};

// Map of languages to syntax highlighting class prefixes
const languageClasses: Record<CodeLanguage, string> = {
  html: 'language-html',
  css: 'language-css',
  javascript: 'language-javascript',
  typescript: 'language-typescript',
  python: 'language-python',
  java: 'language-java',
  csharp: 'language-csharp',
  php: 'language-php',
  ruby: 'language-ruby',
  go: 'language-go',
  swift: 'language-swift'
};

interface CodeExampleCardProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: CodeLanguage;
  difficulty: DifficultyLevel;
  tags?: string[];
  previewImage?: string;
  className?: string;
}

const getDifficultyColor = (difficulty: DifficultyLevel) => {
  switch (difficulty) {
    case 'beginner':
      return 'border-emerald-500 text-emerald-600 bg-emerald-50';
    case 'intermediate':
      return 'border-blue-500 text-blue-600 bg-blue-50';
    case 'advanced':
      return 'border-purple-500 text-purple-600 bg-purple-50';
    default:
      return 'border-slate-500 text-slate-600 bg-slate-50';
  }
};

const CodeExampleCard: React.FC<CodeExampleCardProps> = ({
  id,
  title,
  description,
  code,
  language,
  difficulty,
  tags = [],
  previewImage,
  className,
}) => {
  // Truncate code for preview to about 5-8 lines max
  const lines = code.split('\n');
  const previewCode = lines.slice(0, Math.min(8, lines.length)).join('\n');
  const codeHasMore = lines.length > 8;
  
  // Link to code editor
  const editorLink = `/learn/editor/${id}`;
  
  // Get difficulty display
  const difficultyClass = getDifficultyColor(difficulty);
  const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
  return (
    <Card className={cn("h-full overflow-hidden hover:shadow-md transition-all", className)}>
      {previewImage && (
        <div className="w-full h-40 overflow-hidden border-b">
          <img 
            src={previewImage} 
            alt={`Preview of ${title}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge className="bg-muted hover:bg-muted text-foreground text-xs">
            {languageLabels[language]}
          </Badge>
          <Badge variant="outline" className={difficultyClass}>
            {difficultyLabel}
          </Badge>
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link href={editorLink}>
          <h3 className="text-lg font-semibold mb-2 hover:underline">{title}</h3>
        </Link>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className={`bg-slate-950 text-slate-50 rounded-md p-3 text-xs overflow-hidden ${languageClasses[language]}`}>
          <pre className="whitespace-pre-wrap break-all">
            <code>{previewCode}{codeHasMore && '\n...'}</code>
          </pre>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button asChild className="w-full">
          <Link href={editorLink} className="flex items-center justify-center">
            <Code className="h-4 w-4 mr-2" />
            Try It Yourself <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeExampleCard; 