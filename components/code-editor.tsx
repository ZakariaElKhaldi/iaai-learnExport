"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Copy, Check, Maximize2, Minimize2, Download, RefreshCw } from 'lucide-react';

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
  const editorRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setCode(initialCode);
    setShowPreview(language === 'html');
    if (language === 'html') {
      setPreviewHtml(initialCode);
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
      if (language === 'html' && showPreview) {
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
    } else if (language === 'html') {
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
    if (language === 'html') {
      setPreviewHtml(initialCode);
    }
  };

  // Create a sanitized and highlighted version of the code
  const getSyntaxHighlightedCode = () => {
    if (!code) return '';
    
    // Common replacements
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Language-specific highlighting
    if (language === 'html') {
      highlighted = highlighted
        .replace(/(&lt;[\/]?[a-zA-Z0-9]+)(\s|&gt;)/g, '<span class="tag">$1</span>$2')
        .replace(/(&lt;[^&]*?&gt;)/g, '<span class="tag">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
    } 
    else if (language === 'css') {
      highlighted = highlighted
        .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="property">$1</span>')
        .replace(/(#[a-fA-F0-9]{3,6}|rgba?\([^)]+\))/g, '<span class="color">$1</span>')
        .replace(/(@[a-zA-Z-]+)/g, '<span class="keyword">$1</span>')
        .replace(/([\.\#][a-zA-Z-_0-9]+)(?=[^-_a-zA-Z0-9])/g, '<span class="selector">$1</span>');
    } 
    else if (language === 'javascript' || language === 'js' || language === 'jsx' || language === 'ts' || language === 'tsx') {
      highlighted = highlighted
        .replace(/\b(var|let|const|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|super|extends|static|get|set)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="builtin">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
        .replace(/`([^`]*)`/g, '<span class="string">`$1`</span>')
        .replace(/\b([0-9]+)\b/g, '<span class="number">$1</span>')
        .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
    }
    else if (language === 'python') {
      highlighted = highlighted
        .replace(/\b(def|class|if|elif|else|for|while|import|from|return|try|except|with|as|pass|break|continue|True|False|None)\b/g, '<span class="keyword">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
        .replace(/\b([0-9]+)\b/g, '<span class="number">$1</span>')
        .replace(/#.*$/gm, '<span class="comment">$&</span>');
    }
    
    return highlighted;
  };

  const containerClasses = `code-editor-container ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : 'relative'}`;
  
  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center p-2 bg-slate-800 text-white rounded-t-md">
        <span className="text-xs uppercase font-semibold">{language}</span>
        <div className="flex gap-2">
          <button 
            onClick={resetCode} 
            className="p-1 hover:bg-slate-700 rounded"
            title="Reset code"
          >
            <RefreshCw size={16} />
          </button>
          
          <button 
            onClick={handleCopy} 
            className="p-1 hover:bg-slate-700 rounded"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          
          <button 
            onClick={toggleFullscreen} 
            className="p-1 hover:bg-slate-700 rounded"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          
          {!readOnly && language === 'html' && (
            <button 
              onClick={handleRun} 
              className="p-1 hover:bg-slate-700 rounded"
              title="Run code"
            >
              <Play size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className={`flex flex-col ${showPreview ? 'md:flex-row' : 'w-full'} ${isFullscreen ? 'h-[calc(100%-4rem)]' : ''}`}>
        <div className={`${showPreview ? 'md:w-1/2' : 'w-full'} h-full relative border-x border-b border-slate-700`}>
          <textarea
            ref={editorRef}
            value={code}
            onChange={handleCodeChange}
            className={`w-full h-full p-4 bg-slate-950 text-slate-300 focus:outline-none resize-none ${readOnly ? 'cursor-default' : ''}`}
            readOnly={readOnly}
            spellCheck="false"
            style={{ 
              minHeight: isFullscreen ? '100%' : defaultHeight,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: 1.5
            }}
          />
          <pre 
            className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none overflow-auto"
            style={{ 
              fontFamily: 'inherit',
              margin: 0,
              lineHeight: 1.5
            }}
            dangerouslySetInnerHTML={{ __html: getSyntaxHighlightedCode() }}
          />
        </div>
        
        {showPreview && (
          <div className={`${showPreview ? 'md:w-1/2' : 'w-full'} h-full border-x border-b border-slate-700 ${!isFullscreen ? 'border-t md:border-t-0' : ''}`}>
            <div className="bg-slate-800 p-2 text-white text-xs uppercase font-semibold">
              Preview
            </div>
            <div 
              className="w-full h-full bg-white dark:bg-slate-900 overflow-auto"
              style={{ 
                minHeight: isFullscreen ? 'calc(100% - 2rem)' : defaultHeight
              }}
            >
              <iframe 
                srcDoc={previewHtml}
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
        .string { color: #a8ff60; }
        .tag { color: #ff8383; }
        .property { color: #66d9ef; }
        .color { color: #ff9d9d; }
        .selector { color: #a6e22e; }
        .keyword { color: #ff8383; }
        .builtin { color: #ff8383; }
        .number { color: #ffcc66; }
        .comment { color: #75715e; }
      `}</style>
    </div>
  );
} 