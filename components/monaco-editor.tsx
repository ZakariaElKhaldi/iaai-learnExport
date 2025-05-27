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
  showLanguageLabel?: boolean;
}

// Map language names to Monaco Editor language IDs
const languageMapping: Record<string, string> = {
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'py': 'python',
  'c': 'c',
  'cpp': 'cpp',
  'c++': 'cpp',
  'cxx': 'cpp',
  'java': 'java',
  'html': 'html',
  'css': 'css',
  'json': 'json',
  'md': 'markdown',
  'python': 'python',
  'javascript': 'javascript',
  'typescript': 'typescript',
  'rust': 'rust',
  'rs': 'rust',
  'go': 'go',
  'sh': 'shell',
  'bash': 'shell',
  'shell': 'shell',
  'php': 'php',
  'rb': 'ruby',
  'ruby': 'ruby',
  'cs': 'csharp',
  'csharp': 'csharp',
  'scala': 'scala',
  'swift': 'swift',
  'kotlin': 'kotlin',
  'sql': 'sql',
  'yaml': 'yaml',
  'yml': 'yaml',
  'xml': 'xml',
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
  showLanguageLabel = false,
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
    const lang = language?.toLowerCase() || '';
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
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 border border-b-0 border-gray-200 dark:border-gray-700 rounded-t-md">
        <div className="flex items-center space-x-2">
          <FileCode className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          {showLanguageLabel && getLanguageId() !== 'plaintext' && (
            <span className="text-sm text-gray-600 dark:text-gray-300">{getLanguageId()}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Theme selector button */}
          <div className="relative">
            <button 
              ref={themeButtonRef}
              className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded-md text-gray-600 dark:text-gray-300"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              title="Change theme"
            >
              {getCurrentThemeIcon()}
            </button>
            
            {/* Theme dropdown menu */}
            {themeMenuOpen && (
              <div 
                ref={themeMenuRef}
                className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 min-w-[150px]"
              >
                {themes.map((theme) => {
                  const ThemeIcon = theme.icon;
                  return (
                    <button 
                      key={theme.id} 
                      className={`flex items-center px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${currentTheme === theme.id ? 'bg-gray-100 dark:bg-gray-700 text-primary' : 'text-gray-700 dark:text-gray-300'}`}
                      onClick={() => changeTheme(theme.id)}
                    >
                      <ThemeIcon className="h-4 w-4 mr-2" />
                      {theme.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Format code button */}
          <button 
            onClick={formatCode} 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded-md text-gray-600 dark:text-gray-300"
            title="Format code"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {/* Copy button */}
          <button 
            onClick={handleCopy} 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded-md text-gray-600 dark:text-gray-300"
            title="Copy code"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          
          {/* Run button (if onRun is provided) */}
          {onRun && (
            <button 
              onClick={runCode} 
              className="bg-primary text-white hover:bg-primary/90 p-1 rounded-md"
              title="Run code"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
          
          {/* Fullscreen toggle button */}
          <button 
            onClick={toggleFullscreen} 
            className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded-md text-gray-600 dark:text-gray-300"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      {/* Monaco Editor */}
      <Editor
        height={isFullscreen ? "calc(100vh - 45px)" : defaultHeight}
        defaultLanguage={getLanguageId()}
        defaultValue={code}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
          fontLigatures: true,
          wordWrap: "on",
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly: readOnly,
          ...getFormattingOptions(),
        }}
        theme={currentTheme}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
      />
    </div>
  );
} 