"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Copy, Check, Maximize2, Minimize2, Download, RefreshCw, Split, Columns, RotateCcw, ExternalLink } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  defaultHeight?: string;
  onRun?: (code: string) => void;
  readOnly?: boolean;
}

export function CodeEditor({
  code: initialCode,
  language,
  defaultHeight = "300px",
  onRun,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(language === 'html');
  const [previewHtml, setPreviewHtml] = useState('');
  const [layoutMode, setLayoutMode] = useState<'split' | 'vertical' | 'horizontal'>('split');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setCode(initialCode);
    if (language === 'html' || language === 'css' || language === 'javascript' || language === 'js') {
      setShowPreview(true);
      setPreviewHtml(initialCode);
    } else {
      setShowPreview(false);
    }
  }, [initialCode, language]);

  useEffect(() => {
    // Add escape key handler for fullscreen mode
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      const newCode = e.target.value;
      setCode(newCode);
      if ((language === 'html' || language === 'css' || language === 'javascript' || language === 'js') && showPreview) {
        setPreviewHtml(newCode);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (onRun) {
      onRun(code);
    } else if (language === 'html' || language === 'css' || language === 'javascript' || language === 'js') {
      setShowPreview(true);
      setPreviewHtml(code);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Focus the editor after toggling fullscreen
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 10);
  };
  
  const resetCode = () => {
    setCode(initialCode);
    if (language === 'html' || language === 'css' || language === 'javascript' || language === 'js') {
      setPreviewHtml(initialCode);
    }
  };

  const toggleLayout = () => {
    if (layoutMode === 'split') {
      setLayoutMode('vertical');
    } else if (layoutMode === 'vertical') {
      setLayoutMode('horizontal');
    } else {
      setLayoutMode('split');
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Create a sanitized and highlighted version of the code
  const getSyntaxHighlightedCode = () => {
    if (!code) return '';
    
    // Common replacements
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\t/g, '  '); // Convert tabs to 2 spaces for consistent display
      
    // Language-specific highlighting - improved with more detailed syntax
    if (language === 'html') {
      highlighted = highlighted
        .replace(/(&lt;[\/]?[a-zA-Z0-9]+)(\s|&gt;)/g, '<span class="tag">$1</span>$2')
        .replace(/(&lt;[^&]*?&gt;)/g, '<span class="tag">$1</span>')
        .replace(/(\s+[a-zA-Z-]+)=["']/g, '<span class="attribute">$1</span>=<span class="punctuation">"</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
    } 
    else if (language === 'css') {
      highlighted = highlighted
        .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="property">$1</span>')
        .replace(/(#[a-fA-F0-9]{3,6}|rgba?\([^)]+\))/g, '<span class="color">$1</span>')
        .replace(/(@[a-zA-Z-]+)/g, '<span class="keyword">$1</span>')
        .replace(/([\.\#][a-zA-Z-_0-9]+)(?=[^-_a-zA-Z0-9])/g, '<span class="selector">$1</span>')
        .replace(/(\{|\}|\;|\:)/g, '<span class="punctuation">$1</span>');
    } 
    else if (language === 'javascript' || language === 'js' || language === 'jsx' || language === 'ts' || language === 'tsx') {
      highlighted = highlighted
        .replace(/\b(var|let|const|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|super|extends|static|get|set)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="builtin">$1</span>')
        .replace(/\b(console|window|document|Array|Object|String|Number|Boolean|Map|Set|Promise|Math)\b/g, '<span class="global">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
        .replace(/`([^`]*)`/g, '<span class="string">`$1`</span>')
        .replace(/\b([0-9]+\.?[0-9]*|0x[0-9a-fA-F]+)\b/g, '<span class="number">$1</span>')
        .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
        .replace(/(\{|\}|\(|\)|\[|\]|\;|\,|\.|=&gt;|=|\+|-|\*|\/|%|\?|:)/g, '<span class="punctuation">$1</span>');
    }
    else if (language === 'python') {
      highlighted = highlighted
        .replace(/\b(def|class|if|elif|else|for|while|import|from|return|try|except|with|as|pass|break|continue|True|False|None|and|or|not|in|is)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(self|cls|super|print|len|range|dict|list|tuple|set|int|str|float|bool)\b/g, '<span class="builtin">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
        .replace(/\b([0-9]+\.?[0-9]*)\b/g, '<span class="number">$1</span>')
        .replace(/#.*$/gm, '<span class="comment">$&</span>')
        .replace(/(\{|\}|\(|\)|\[|\]|\;|\,|\.|:)/g, '<span class="punctuation">$1</span>');
    }
    else if (language === 'c' || language === 'cpp') {
      highlighted = highlighted
        .replace(/\b(auto|int|char|double|float|void|unsigned|signed|short|long|struct|enum|class|namespace|template|typedef|const|static|extern|return|if|else|for|while|do|switch|case|break|continue|try|catch|throw|new|delete|nullptr|NULL|true|false)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(printf|scanf|malloc|free|iostream|vector|string|map|set)\b/g, '<span class="builtin">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
        .replace(/\b([0-9]+\.?[0-9]*)\b/g, '<span class="number">$1</span>')
        .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
        .replace(/(\{|\}|\(|\)|\[|\]|\;|\,|\.|->|::|=|\+|-|\*|\/|%|&lt;|&gt;|&amp;|\||\^|!|\?|:)/g, '<span class="punctuation">$1</span>');
    }
    
    return highlighted;
  };

  const getLayoutClasses = () => {
    if (!showPreview) return 'w-full';
    switch (layoutMode) {
      case 'split':
        return 'md:flex-row';
      case 'vertical':
        return 'flex-col';
      case 'horizontal':
        return 'md:flex-row';
      default:
        return 'md:flex-row';
    }
  };

  const containerClasses = `code-editor-container ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-950 p-4' : 'relative'} border border-gray-200 dark:border-gray-700 rounded-md shadow-sm`;
  
  return (
    <div className={containerClasses}>
      <div className={`flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-t-md`}>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-semibold text-gray-600 dark:text-gray-400">{language}</span>
          {(language === 'html' || language === 'css' || language === 'javascript' || language === 'js') && (
            <button 
              onClick={togglePreview} 
              className={`p-1.5 text-xs rounded ${showPreview ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              title={showPreview ? "Hide preview" : "Show preview"}
            >
              Preview
            </button>
          )}
        </div>
        <div className="flex gap-1">
          {showPreview && (
            <button 
              onClick={toggleLayout} 
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
              title="Change layout"
            >
              <Columns size={16} />
            </button>
          )}
          
          <button 
            onClick={resetCode} 
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
            title="Reset code"
          >
            <RotateCcw size={16} />
          </button>
          
          <button 
            onClick={handleCopy} 
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          
          <button 
            onClick={toggleFullscreen} 
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          
          {!readOnly && (language === 'html' || language === 'css' || language === 'javascript' || language === 'js') && (
            <button 
              onClick={handleRun} 
              className="p-1 bg-gray-700 hover:bg-gray-800 rounded text-white"
              title="Run code"
            >
              <Play size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className={`flex ${getLayoutClasses()} ${isFullscreen ? 'h-[calc(100%-4rem)]' : ''}`}>
        <div className={`${showPreview ? (layoutMode === 'split' ? 'md:w-1/2' : layoutMode === 'horizontal' ? 'md:w-1/2' : 'w-full') : 'w-full'} h-full relative border border-gray-200 dark:border-gray-700 bg-[var(--code-bg)]`}>
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
          <textarea
            ref={editorRef}
            value={code}
            onChange={handleCodeChange}
            className={`w-full h-full pt-10 pb-4 px-4 bg-[var(--code-bg)] text-[var(--code-fg)] focus:outline-none resize-none ${readOnly ? 'cursor-default' : ''}`}
            readOnly={readOnly}
            spellCheck="false"
            style={{ 
              minHeight: isFullscreen ? '100%' : defaultHeight,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: 1.5,
              tabSize: 2,
              whiteSpace: "pre",
              overflowWrap: "normal"
            }}
          />
          <pre 
            className="absolute top-0 left-0 w-full h-full pt-10 pb-4 px-4 pointer-events-none overflow-auto"
            style={{ 
              fontFamily: 'inherit',
              margin: 0,
              lineHeight: 1.5,
              tabSize: 2,
              whiteSpace: "pre",
              overflowWrap: "normal"
            }}
            dangerouslySetInnerHTML={{ __html: getSyntaxHighlightedCode() }}
          />
        </div>
        
        {showPreview && (
          <div className={`${layoutMode === 'split' ? 'md:w-1/2' : layoutMode === 'horizontal' ? 'md:w-1/2' : 'w-full'} h-full border border-gray-200 dark:border-gray-700 ${!isFullscreen && layoutMode === 'vertical' ? 'border-t' : 'md:border-t-0'}`}>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 px-3 text-gray-700 dark:text-gray-300 text-xs font-semibold flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">PREVIEW</span>
              <button 
                onClick={handleRun} 
                className="p-1 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Refresh preview"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <div 
              className="w-full h-full bg-white dark:bg-[#1e222a] overflow-auto relative"
              style={{ 
                minHeight: isFullscreen ? 'calc(100% - 2rem)' : defaultHeight
              }}
            >
              <iframe 
                srcDoc={`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 10px; font-family: sans-serif; }
    pre { 
      white-space: pre;
      word-wrap: normal;
      overflow-x: auto;
      tab-size: 2;
      font-family: monospace;
    }
  </style>
</head>
<body>${previewHtml}</body>
</html>`}
                title="Code Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
                style={{ 
                  height: isFullscreen ? 'calc(100vh - 10rem)' : defaultHeight,
                  background: 'white'
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .string { color: var(--code-string); }
        .tag { color: var(--code-tag); }
        .attribute { color: var(--code-attribute); }
        .property { color: var(--code-property); }
        .color { color: var(--code-color); }
        .selector { color: var(--code-selector); }
        .keyword { color: var(--code-keyword); }
        .builtin { color: var(--code-builtin); }
        .global { color: var(--code-global); }
        .number { color: var(--code-number); }
        .comment { color: var(--code-comment); }
        .punctuation { color: var(--code-punctuation); }
        .function { color: var(--code-function); }
        .operator { color: var(--code-operator); }
        
        /* Ensure code doesn't wrap incorrectly */
        pre, code {
          white-space: pre;
          overflow-wrap: normal;
          overflow-x: auto;
          tab-size: 2;
        }
      `}</style>
    </div>
  );
} 