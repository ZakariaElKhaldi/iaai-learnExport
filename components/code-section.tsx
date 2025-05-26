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
    <div className={containerClasses}>
      <div className={isFullscreen ? 'w-full max-w-4xl' : 'w-full'}>
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Example</span>
          </div>
          <div className="flex items-center gap-2">
            {detectedLanguage && detectedLanguage !== 'unknown' && (
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
            {canPreview && (
              <button 
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label={showPreview ? "Hide preview" : "Show preview"}
                onClick={togglePreview}
                title={showPreview ? "Hide preview" : "Show preview"}
              >
                <Eye className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        {isEditing ? (
          <MonacoEditor
            code={code}
            language={detectedLanguage || language}
            defaultHeight={isFullscreen ? "70vh" : "350px"}
            readOnly={false}
            onChange={handleEditorChange}
            onRun={handleRun}
          />
        ) : showPreview && canPreview ? (
          <div className="relative">
            <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-3">
              <div className="flex gap-1.5">
                <div key="dot-red" className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div key="dot-yellow" className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div key="dot-green" className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {language === 'html' || language === 'css' || language === 'javascript' || language === 'js' ? 'Preview' : 'Console Output'}
              </span>
            </div>
            
            {/* Show iframe for web languages, console for others */}
            {language === 'html' || language === 'css' || language === 'javascript' || language === 'js' ? (
              <div 
                className="bg-white dark:bg-slate-900 px-4 py-4 overflow-auto"
                style={{ minHeight: isFullscreen ? "70vh" : "350px" }}
              >
                <iframe
                  key={`preview-iframe-${language}`}
                  srcDoc={`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 10px; font-family: sans-serif; }
    pre { white-space: pre; overflow-x: auto; tab-size: 2; }
  </style>
</head>
<body>${isEditing ? editorCode : code}</body>
</html>`}
                  title="Code Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                  style={{ 
                    height: isFullscreen ? 'calc(100vh - 10rem)' : '350px',
                    background: 'white'
                  }}
                />
              </div>
            ) : (
              <div 
                className="bg-black text-green-400 px-4 py-4 overflow-auto font-mono text-sm"
                style={{ minHeight: isFullscreen ? "70vh" : "350px" }}
              >
                <div className="flex items-center mb-2 text-white">
                  <Terminal size={16} className="mr-2" />
                  <span>{language === 'python' ? 'Python' : language === 'java' ? 'Java' : 'C/C++'} Output</span>
                </div>
                <pre style={{ margin: 0, padding: 0, whiteSpace: "pre-wrap" }}>
                  {getSimulatedOutput().split('\n').map((line, index) => (
                    <div key={`output-line-${index}`}>{line}</div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            {/* Editor window dots UI */}
            <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
            </div>
            
            {/* Simple code display with basic syntax highlighting */}
            <div 
              className="bg-slate-50 dark:bg-slate-900 px-4 py-4 overflow-x-auto font-mono text-sm"
              style={{ 
                minHeight: isFullscreen ? "70vh" : "auto"
              }}
            >
              <pre style={{ margin: 0, padding: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <code 
                  className={`language-${detectedLanguage || language}`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </div>
          </div>
        )}
        
        {/* Add a minimal syntax highlighting stylesheet */}
        <style jsx global>{`
          .language-html .tag { color: #22863a; }
          .language-html .attr { color: #6f42c1; }
          .language-html .string { color: #032f62; }
          
          .language-css .property { color: #005cc5; }
          .language-css .value { color: #e36209; }
          .language-css .selector { color: #22863a; }
          
          .language-javascript .keyword, .language-js .keyword { color: #d73a49; }
          .language-javascript .string, .language-js .string { color: #032f62; }
          .language-javascript .number, .language-js .number { color: #005cc5; }
          .language-javascript .comment, .language-js .comment { color: #6a737d; }
          
          .language-python .keyword { color: #d73a49; }
          .language-python .string { color: #032f62; }
          .language-python .number { color: #005cc5; }
          .language-python .comment { color: #6a737d; }
          .language-python .builtin { color: #6f42c1; }
          .language-python .decorator { color: #e36209; }
          
          .language-c .keyword, .language-cpp .keyword { color: #d73a49; }
          .language-c .string, .language-cpp .string { color: #032f62; }
          .language-c .number, .language-cpp .number { color: #005cc5; }
          .language-c .comment, .language-cpp .comment { color: #6a737d; }
          .language-c .preprocessor, .language-cpp .preprocessor { color: #e36209; }
          .language-c .type, .language-cpp .type { color: #6f42c1; }
          
          .language-java .keyword { color: #d73a49; }
          .language-java .string { color: #032f62; }
          .language-java .number { color: #005cc5; }
          .language-java .comment { color: #6a737d; }
          .language-java .class { color: #6f42c1; }
          .language-java .annotation { color: #e36209; }
        `}</style>
        
        {/* Fullscreen exit button */}
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