"use client";

import { Editor, loader } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import type * as monacoEditor from 'monaco-editor';
import { Maximize2, Minimize2, Copy, Check, RefreshCw, Play, RotateCcw, FileCode, Moon, Sun, Palette } from 'lucide-react';
import { githubLightTheme, githubDarkTheme, monokaiTheme } from '@/lib/monaco-theme';
import { formattingOptions, getFormatterForLanguage } from '@/lib/monaco-formatters';
import { languageExtensionMap, registerLanguageFeatures } from '@/lib/monaco-languages';

// Configure Monaco loader to use the CDN path for workers
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
  },
});

export interface MonacoEditorProps {
  code: string;
  language: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  defaultHeight?: string;
  onRun?: (code: string) => void;
}

// Map language names to Monaco Editor language IDs
const languageMapping: Record<string, string> = {
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'py': 'python',
  'c': 'cpp',
  'cpp': 'cpp',
  'java': 'java',
  'html': 'html',
  'css': 'css',
  'json': 'json',
  'md': 'markdown',
  'python': 'python',
  'javascript': 'javascript',
  'typescript': 'typescript',
  'unknown': 'plaintext',
};

// Available themes
const themes = [
  { id: 'github-light', name: 'GitHub Light', icon: Sun },
  { id: 'github-dark', name: 'GitHub Dark', icon: Moon },
  { id: 'monokai', name: 'Monokai', icon: Palette },
];

export function MonacoEditor({
  code,
  language,
  onChange,
  readOnly = false,
  defaultHeight = "350px",
  onRun,
}: MonacoEditorProps) {
  const [editorMounted, setEditorMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorCode, setEditorCode] = useState(code);
  const [currentTheme, setCurrentTheme] = useState('github-light');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monacoEditor | null>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  // Normalize language ID
  const getLanguageId = () => {
    const lang = language.toLowerCase();
    return languageMapping[lang] || languageExtensionMap[lang] || 'plaintext';
  };

  // Handle copy button click
  const handleCopy = () => {
    if (editorCode) {
      navigator.clipboard.writeText(editorCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Change editor theme
  const changeTheme = (themeId: string) => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(themeId);
      setCurrentTheme(themeId);
      setThemeMenuOpen(false);
    }
  };

  // Format the code
  const formatCode = () => {
    if (editorRef.current) {
      const editorModel = editorRef.current.getModel();
      if (editorModel) {
        const languageId = getLanguageId();
        const formatter = getFormatterForLanguage(languageId);
        const formattingOpts = formattingOptions as Record<string, { tabSize: number, insertSpaces: boolean }>;
        const tabSize = (formattingOpts[languageId] || formattingOpts.default).tabSize;
        
        // Get current value and format it
        const currentValue = editorModel.getValue();
        const formattedCode = formatter(currentValue, tabSize);
        
        // Replace the content
        editorModel.setValue(formattedCode);
      }
    }
  };

  // Run the code
  const runCode = () => {
    if (onRun && editorRef.current) {
      const currentCode = editorRef.current.getValue();
      onRun(currentCode);
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setEditorMounted(true);
    
    // Register custom themes
    monaco.editor.defineTheme('github-light', githubLightTheme as monacoEditor.editor.IStandaloneThemeData);
    monaco.editor.defineTheme('github-dark', githubDarkTheme as monacoEditor.editor.IStandaloneThemeData);
    monaco.editor.defineTheme('monokai', monokaiTheme as monacoEditor.editor.IStandaloneThemeData);
    
    // Apply the GitHub light theme by default
    monaco.editor.setTheme('github-light');
    
    // Register language features
    registerLanguageFeatures(monaco);
    
    // Setup Monaco environment for workers
    // @ts-ignore
    window.MonacoEnvironment = {
      getWorkerUrl: (_moduleId: string, label: string) => {
        if (label === 'json') 
          return '_next/static/json.worker.js';
        if (label === 'css' || label === 'scss' || label === 'less')
          return '_next/static/css.worker.js';
        if (label === 'html' || label === 'xml')
          return '_next/static/html.worker.js';
        if (label === 'typescript' || label === 'javascript')
          return '_next/static/ts.worker.js';
        return '_next/static/editor.worker.js';
      }
    };
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      formatCode();
    });
    
    // Add event listener for code changes
    editor.onDidChangeModelContent(() => {
      const newValue = editor.getValue();
      setEditorCode(newValue);
      if (onChange) {
        onChange(newValue);
      }
    });
    
    // Auto-format code on load
    setTimeout(() => {
      formatCode();
    }, 300);
  };

  // Handle editor will mount
  const handleEditorWillMount = (monaco: typeof monacoEditor) => {
    // Register custom themes
    monaco.editor.defineTheme('github-light', githubLightTheme as monacoEditor.editor.IStandaloneThemeData);
    monaco.editor.defineTheme('github-dark', githubDarkTheme as monacoEditor.editor.IStandaloneThemeData);
    monaco.editor.defineTheme('monokai', monokaiTheme as monacoEditor.editor.IStandaloneThemeData);
  };
  
  // Use theme from system/user preference
  useEffect(() => {
    if (editorMounted && monacoRef.current) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const setThemeBasedOnPreference = (e: MediaQueryListEvent | MediaQueryList) => {
        const theme = e.matches ? 'github-dark' : 'github-light';
        monacoRef.current?.editor.setTheme(theme);
        setCurrentTheme(theme);
      };
      
      // Set initial theme
      setThemeBasedOnPreference(darkModeQuery);
      
      // Listen for changes
      darkModeQuery.addEventListener('change', setThemeBasedOnPreference);
      
      return () => {
        darkModeQuery.removeEventListener('change', setThemeBasedOnPreference);
      };
    }
  }, [editorMounted]);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuOpen && 
          themeMenuRef.current && 
          themeButtonRef.current && 
          !themeMenuRef.current.contains(event.target as Node) &&
          !themeButtonRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeMenuOpen]);

  // Get formatting options for the current language
  const getFormattingOptions = () => {
    const languageId = getLanguageId();
    const formattingOpts = formattingOptions as Record<string, { tabSize: number, insertSpaces: boolean }>;
    return {
      tabSize: (formattingOpts[languageId] || formattingOpts.default).tabSize,
      insertSpaces: (formattingOpts[languageId] || formattingOpts.default).insertSpaces
    };
  };

  // Get current theme icon
  const getCurrentThemeIcon = () => {
    const theme = themes.find(t => t.id === currentTheme);
    const ThemeIcon = theme?.icon || Sun;
    return <ThemeIcon className="h-4 w-4" />;
  };

  return (
    <div className={`monaco-editor-container ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'relative'}`}>
      {/* Editor toolbar */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <FileCode className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
            {getLanguageId().charAt(0).toUpperCase() + getLanguageId().slice(1)} Editor
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={formatCode}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Format code (Ctrl+S)"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {onRun && (
            <button
              onClick={runCode}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Run code"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Copy code"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          
          <div className="relative">
            <button
              ref={themeButtonRef}
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Change theme"
            >
              {getCurrentThemeIcon()}
            </button>
            
            {themeMenuOpen && (
              <div 
                ref={themeMenuRef}
                className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
              >
                <ul className="py-1">
                  {themes.map((theme) => {
                    const ThemeIcon = theme.icon;
                    return (
                      <li key={theme.id}>
                        <button
                          onClick={() => changeTheme(theme.id)}
                          className={`flex items-center w-full px-3 py-2 text-sm text-left ${
                            currentTheme === theme.id
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <ThemeIcon className="h-4 w-4 mr-2" />
                          {theme.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      {/* Monaco Editor instance */}
      <Editor
        height={isFullscreen ? "calc(100vh - 48px)" : defaultHeight}
        language={getLanguageId()}
        value={code}
        options={{
          readOnly,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          ...getFormattingOptions(),
          automaticLayout: true,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
          autoIndent: 'advanced',
          formatOnPaste: true,
          formatOnType: true,
        }}
        theme={currentTheme}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      />
    </div>
  );
} 