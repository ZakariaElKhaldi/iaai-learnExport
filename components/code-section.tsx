"use client";

import { useState, useEffect } from 'react';
import { Edit, Code, Copy, Check, Maximize2, Eye, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from './code-editor';
import { MonacoEditor } from './monaco-editor';

interface CodeSectionProps {
  code: string;
  codeHtml?: string;
  language: string;
  tryItLink?: string;
  expectedOutput?: string;
  syntax_highlighting?: any[];
  code_classes?: string[];
}

export function CodeSection({ 
  code, 
  codeHtml, 
  language, 
  expectedOutput,
  syntax_highlighting,
  code_classes
}: CodeSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState(code);
  const [detectedLanguage, setDetectedLanguage] = useState(language || "");
  const [editorCode, setEditorCode] = useState(code);
  
  // Function to detect language from code content
  const detectLanguageFromCode = (codeContent: string): string => {
    // Check for C/C++ patterns first (these are often misclassified as Java)
    if (codeContent.includes('#include') || 
        codeContent.match(/int\s+main\s*\(/) || 
        codeContent.includes('printf(') ||
        codeContent.includes('scanf(') ||
        codeContent.includes('malloc(') ||
        codeContent.includes('calloc(') ||
        codeContent.includes('sizeof(')) {
      return 'c';
    }
    
    // Check for JavaScript patterns
    if (codeContent.includes('function ') || 
        codeContent.match(/var\s+\w+\s*=/) ||
        codeContent.match(/let\s+\w+\s*=/) || 
        codeContent.match(/const\s+\w+\s*=/) ||
        codeContent.includes('document.') ||
        codeContent.includes('console.log')) {
      return 'javascript';
    }
    
    // Check for HTML patterns
    if (codeContent.includes('<!DOCTYPE') || 
        codeContent.match(/<html[\s>]/) || 
        (codeContent.includes('<') && codeContent.includes('</') && 
         (codeContent.includes('<div') || codeContent.includes('<p') || 
          codeContent.includes('<span') || codeContent.includes('<a')))) {
      return 'html';
    }
    
    // Check for CSS patterns
    if (codeContent.match(/[\w\-]+\s*\{[\s\S]*?\}/) && 
        codeContent.includes(':') && 
        (codeContent.includes(';') || codeContent.includes('px') || 
         codeContent.includes('rgb') || codeContent.includes('#'))) {
      return 'css';
    }
    
    // Check for Python patterns
    if (codeContent.includes('def ') || 
        codeContent.includes('import ') || 
        codeContent.includes('class ') ||
        codeContent.includes(':') && 
        (codeContent.includes('    ') || codeContent.includes('\t')) ||
        codeContent.includes('print(')) {
      return 'python';
    }
    
    // Check for Java patterns (but make sure it's not C/C++)
    if (codeContent.includes('public class ') || 
        codeContent.includes('public static void main') || 
        codeContent.includes('System.out.print')) {
      return 'java';
    }
    
    // Default fallback
    return language || 'javascript';
  };
  
  // Determine correct language from classes or code content
  const determineLanguageFromClasses = (classes: string[] = []) => {
    // First check if any class explicitly states the language
    if (classes.some(cls => cls.toLowerCase().includes('htmlhigh'))) return 'html';
    if (classes.some(cls => cls.toLowerCase().includes('csshigh'))) return 'css';
    if (classes.some(cls => cls.toLowerCase().includes('jshigh'))) return 'javascript';
    if (classes.some(cls => cls.toLowerCase() === 'language-js')) return 'javascript';
    if (classes.some(cls => cls.toLowerCase() === 'language-javascript')) return 'javascript';
    if (classes.some(cls => cls.toLowerCase() === 'language-jsx')) return 'javascript';
    if (classes.some(cls => cls.toLowerCase() === 'language-html')) return 'html';
    if (classes.some(cls => cls.toLowerCase() === 'language-css')) return 'css';
    if (classes.some(cls => cls.toLowerCase() === 'language-python')) return 'python';
    if (classes.some(cls => cls.toLowerCase() === 'language-java')) return 'java';
    if (classes.some(cls => cls.toLowerCase() === 'language-c')) return 'c';
    if (classes.some(cls => cls.toLowerCase() === 'language-cpp')) return 'cpp';
    
    // If javaHigh class is present, we need to check if it's actually C code
    // (many C examples in the course data are incorrectly marked as Java)
    if (classes.some(cls => cls.toLowerCase().includes('javahigh'))) {
      if (code.includes('#include') || 
          code.includes('printf(') || 
          code.includes('scanf(') ||
          code.match(/int\s+main\s*\(/)) {
        return 'c';
      }
      return 'java';
    }
    
    return null;
  };
  
  // Use course-provided highlighting or generate our own
  useEffect(() => {
    if (code) {
      // First try to detect language from code_classes
      const languageFromClasses = determineLanguageFromClasses(code_classes);
      let langToUse = languageFromClasses || detectedLanguage || language;
      
      // If we still don't have a language or it's unknown, detect from code
      if (!langToUse || langToUse === 'unknown') {
        langToUse = detectLanguageFromCode(code);
      }
      
      // Update the detected language
      setDetectedLanguage(langToUse);
      
      // If we have codeHtml from the course data, extract just the code content
      if (codeHtml) {
        // Extract just the code content from the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = codeHtml;
        const codeContent = tempDiv.innerText || tempDiv.textContent || code;
        
        // Highlight the extracted code
        setHighlightedCode(applySyntaxHighlighting(codeContent, langToUse));
      } else {
        // No pre-rendered HTML, highlight the code ourselves
        setHighlightedCode(applySyntaxHighlighting(code, langToUse));
      }
      
      // Also set the editor code
      setEditorCode(code);
    }
  }, [code, codeHtml, language, code_classes]);
  
  // Function to safely apply syntax highlighting classes
  const applySyntaxHighlighting = (code: string, lang: string): string => {
    if (!code) return '';
    
    // Normalize language identifier
    const normalizedLang = lang.toLowerCase();
    
    // Safe HTML escaping
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    
    // Basic highlighting patterns for different languages
    if (normalizedLang === 'html') {
      return escaped
        .replace(/(&lt;\/?)([\w\-]+)([\s\S]*?&gt;)/g, '$1<span class="tag">$2</span>$3')
        .replace(/(\s+)([\w\-]+)=(["'])/g, '$1<span class="attr">$2</span>=$3')
        .replace(/(["'])(.*?)(["'])/g, '$1<span class="string">$2</span>$3');
    } 
    else if (normalizedLang === 'css') {
      return escaped
        .replace(/([\.\#][\w\-]+\s*\{)/g, '<span class="selector">$1</span>')
        .replace(/([\w\-]+)(\s*:)/g, '<span class="property">$1</span>$2')
        .replace(/(:[\s]*)([^;{}]+)(;|$)/g, '$1<span class="value">$2</span>$3');
    } 
    else if (normalizedLang === 'javascript' || normalizedLang === 'js') {
      // For JS, we need more careful processing to handle nested patterns
      let highlighted = escaped;
      
      // Process strings first (to avoid keyword matches within strings)
      highlighted = highlighted
        .replace(/(["'])(.*?)(\1)/g, '<span class="string">$1$2$3</span>')
        .replace(/(`[\s\S]*?`)/g, '<span class="string">$1</span>');
      
      // Keywords
      const jsKeywords = [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 
        'do', 'break', 'continue', 'switch', 'case', 'default', 'try', 'catch', 
        'throw', 'finally', 'class', 'import', 'export', 'from', 'extends', 
        'implements', 'new', 'this', 'super', 'instanceof', 'typeof', 'void'
      ];
      
      // Replace keywords but avoid matches inside already highlighted spans
      highlighted = highlighted.replace(
        new RegExp(`\\b(${jsKeywords.join('|')})\\b(?![^<]*>|[^<>]*<\/)`, 'g'), 
        '<span class="keyword">$1</span>'
      );
      
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+(\.\d+)?)\b(?![^<]*>|[^<>]*<\/)/g, 
        '<span class="number">$1</span>'
      );
      
      // Comments
      highlighted = highlighted
        .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
      
      return highlighted;
    } 
    else if (normalizedLang === 'python' || normalizedLang === 'py') {
      // Python-specific highlighting
      let highlighted = escaped;
      
      // Process strings first
      highlighted = highlighted
        .replace(/(["'])(.*?)(\1)/g, '<span class="string">$1$2$3</span>')
        .replace(/("""[\s\S]*?""")/g, '<span class="string">$1</span>')
        .replace(/('''[\s\S]*?''')/g, '<span class="string">$1</span>');
      
      // Python keywords
      const pyKeywords = [
        'def', 'class', 'import', 'from', 'as', 'if', 'elif', 'else', 'for', 'while', 
        'return', 'try', 'except', 'finally', 'with', 'in', 'is', 'not', 'and', 'or', 
        'True', 'False', 'None', 'lambda', 'nonlocal', 'global', 'assert', 'raise'
      ];
      
      // Replace keywords but avoid matches inside already highlighted spans
      highlighted = highlighted.replace(
        new RegExp(`\\b(${pyKeywords.join('|')})\\b(?![^<]*>|[^<>]*<\/)`, 'g'), 
        '<span class="keyword">$1</span>'
      );
      
      // Python built-ins
      const pyBuiltins = [
        'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple',
        'map', 'filter', 'sorted', 'sum', 'max', 'min', 'abs', 'any', 'all', 'enumerate'
      ];
      
      highlighted = highlighted.replace(
        new RegExp(`\\b(${pyBuiltins.join('|')})\\b(?![^<]*>|[^<>]*<\/)`, 'g'),
        '<span class="builtin">$1</span>'
      );
      
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+(\.\d+)?)\b(?![^<]*>|[^<>]*<\/)/g,
        '<span class="number">$1</span>'
      );
      
      // Comments
      highlighted = highlighted.replace(
        /(#[^\n]*)/g,
        '<span class="comment">$1</span>'
      );
      
      // Decorators
      highlighted = highlighted.replace(
        /(@\w+)/g,
        '<span class="decorator">$1</span>'
      );
      
      return highlighted;
    } 
    else if (normalizedLang === 'c' || normalizedLang === 'cpp') {
      // C/C++ specific highlighting
      let highlighted = escaped;
      
      // Process strings first
      highlighted = highlighted.replace(/(["'])(.*?)(\1)/g, '<span class="string">$1$2$3</span>');
      
      // Preprocessor directives
      highlighted = highlighted.replace(
        /(#include|#define|#ifndef|#ifdef|#endif|#pragma|#undef|#error|#line)(\s+)(<[^>]*>|"[^"]*")?/g,
        '<span class="preprocessor">$1$2$3</span>'
      );
      
      // C/C++ keywords
      const cKeywords = [
        'int', 'char', 'float', 'double', 'void', 'long', 'short', 'struct', 'enum', 
        'typedef', 'union', 'const', 'unsigned', 'signed', 'bool', 'auto', 'static', 
        'extern', 'register', 'volatile', 'return', 'if', 'else', 'for', 'while', 
        'do', 'switch', 'case', 'break', 'continue', 'goto', 'class', 'namespace'
      ];
      
      highlighted = highlighted.replace(
        new RegExp(`\\b(${cKeywords.join('|')})\\b(?![^<]*>|[^<>]*<\/)`, 'g'),
        '<span class="keyword">$1</span>'
      );
      
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+(\.\d+)?)\b(?![^<]*>|[^<>]*<\/)/g,
        '<span class="number">$1</span>'
      );
      
      // Comments
      highlighted = highlighted
        .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
      
      return highlighted;
    } 
    else if (normalizedLang === 'java') {
      // Java-specific highlighting
      let highlighted = escaped;
      
      // Process strings first
      highlighted = highlighted.replace(/(["'])(.*?)(\1)/g, '<span class="string">$1$2$3</span>');
      
      // Java keywords
      const javaKeywords = [
        'public', 'private', 'protected', 'class', 'interface', 'abstract', 'final', 
        'static', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 
        'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 
        'throw', 'throws', 'new', 'this', 'super', 'void', 'int', 'boolean', 'char', 
        'byte', 'short', 'long', 'float', 'double', 'String', 'true', 'false', 'null'
      ];
      
      highlighted = highlighted.replace(
        new RegExp(`\\b(${javaKeywords.join('|')})\\b(?![^<]*>|[^<>]*<\/)`, 'g'),
        '<span class="keyword">$1</span>'
      );
      
      // Java classes (capitalized words)
      highlighted = highlighted.replace(
        /\b([A-Z][a-zA-Z0-9_]*)\b(?![^<]*>|[^<>]*<\/)/g,
        '<span class="class">$1</span>'
      );
      
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+(\.\d+)?)\b(?![^<]*>|[^<>]*<\/)/g,
        '<span class="number">$1</span>'
      );
      
      // Comments
      highlighted = highlighted
        .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
      
      // Annotations
      highlighted = highlighted.replace(
        /(@[a-zA-Z]+\b)/g,
        '<span class="annotation">$1</span>'
      );
      
      return highlighted;
    }
    
    // Basic highlighting for any other language
    let highlighted = escaped;
    
    // Strings for any language
    highlighted = highlighted.replace(/(["'])(.*?)(\1)/g, '<span class="string">$1$2$3</span>');
    
    // Numbers for any language
    highlighted = highlighted.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>');
    
    // Common comments
    highlighted = highlighted
      .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(/(#[^\n]*)/g, '<span class="comment">$1</span>');
    
    return highlighted;
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  const handleEditorChange = (value: string) => {
    setEditorCode(value);
  };
  
  const handleRun = () => {
    setShowPreview(true);
  };
  
  const canPreview = language === 'html' || language === 'css' || language === 'javascript' || language === 'js' || 
                     language === 'python' || language === 'c' || language === 'cpp' || language === 'java';
  
  // Get simulated output for code examples
  const getSimulatedOutput = () => {
    if (expectedOutput) {
      return expectedOutput;
    }

    // Generate example output based on language
    if (language === 'python') {
      if (code.includes('print(')) {
        return code
          .split('\n')
          .filter(line => line.trim().startsWith('print('))
          .map(line => {
            try {
              const content = line.trim().match(/print\((.*)\)/)?.[1] || '';
              // Handle simple string cases
              if (content.startsWith("'") && content.endsWith("'")) {
                return content.slice(1, -1);
              }
              if (content.startsWith('"') && content.endsWith('"')) {
                return content.slice(1, -1);
              }
              // Handle simple calculations
              if (content.match(/^\d+[\+\-\*\/]\d+$/)) {
                return "Result of calculation";
              }
              return "Output";
            } catch (e) {
              return "Output";
            }
          })
          .join('\n');
      }
      return "# Python output would appear here";
    } 
    else if (language === 'c' || language === 'cpp') {
      if (code.includes('printf(') || code.includes('cout')) {
        return "Program output would appear here";
      }
      return "/* C/C++ program output */";
    }
    else if (language === 'java') {
      if (code.includes('System.out.print')) {
        return "Java program output";
      }
      return "// Java output would appear here";
    }
    
    return "Run the code to see actual output";
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
    
    // Use detected language if available
    const languageToUse = detectedLanguage || language || 'unknown';
    
    return langMap[languageToUse.toLowerCase()] || languageToUse;
  };
  
  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 p-6 bg-white dark:bg-slate-950/95 overflow-auto flex items-center justify-center'
    : 'relative mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 group shadow-sm hover:shadow-md transition-shadow';
  
  return (
    <div className={`relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Code header */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-4 py-2">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4" />
          {expectedOutput && (
            <Badge variant="outline" className="text-xs">Expected Output</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="View code"
            >
              <Eye className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Edit code"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          
          {!isEditing && (
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          )}

          {showPreview && !isEditing && expectedOutput && (
            <button
              onClick={togglePreview}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Show output"
            >
              <Terminal className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className={`bg-slate-50 dark:bg-slate-900 ${isFullscreen ? 'h-[calc(100%-40px)]' : ''}`}>
        {isEditing ? (
          <MonacoEditor 
            code={editorCode} 
            language={detectedLanguage}
            onChange={handleEditorChange}
            defaultHeight={isFullscreen ? "calc(100vh - 100px)" : "350px"}
            showLanguageLabel={false}
            onRun={expectedOutput ? handleRun : undefined}
          />
        ) : showPreview ? (
          <div className="p-4 font-mono text-sm whitespace-pre-wrap">
            {getSimulatedOutput()}
          </div>
        ) : (
          <pre className="p-4 text-sm whitespace-pre overflow-x-auto code-editor-theme">
            <code 
              className="language-text" 
              dangerouslySetInnerHTML={{ __html: highlightedCode }} 
            />
          </pre>
        )}
      </div>
    </div>
  );
} 