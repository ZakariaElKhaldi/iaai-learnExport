// Monaco Editor language configurations

// Language mapping for file extensions
export const languageExtensionMap: Record<string, string> = {
  // JavaScript family
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  
  // Web
  'html': 'html',
  'css': 'css',
  'scss': 'scss',
  'less': 'less',
  'json': 'json',
  'xml': 'xml',
  
  // Backend
  'py': 'python',
  'python': 'python',
  'rb': 'ruby',
  'go': 'go',
  'java': 'java',
  'php': 'php',
  'cs': 'csharp',
  
  // Systems
  'c': 'cpp',
  'cpp': 'cpp',
  'h': 'cpp',
  'hpp': 'cpp',
  'rs': 'rust',
  
  // Data & Config
  'md': 'markdown',
  'yaml': 'yaml',
  'yml': 'yaml',
  'toml': 'toml',
  'sql': 'sql',
  
  // Shell
  'sh': 'shell',
  'bash': 'shell',
  'zsh': 'shell',
  'ps1': 'powershell',
};

// Extra language features config for each supported language
export const languageFeatures: Record<string, any> = {
  javascript: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
      { open: '`', close: '`', notIn: ['string', 'comment'] },
    ],
  },
  
  typescript: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
      { open: '`', close: '`', notIn: ['string', 'comment'] },
    ],
  },
  
  html: {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      blockComment: ['<!--', '-->'],
    },
    brackets: [
      ['<!--', '-->'],
      ['<', '>'],
      ['{', '}'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: '<!--', close: '-->' },
    ],
    surroundingPairs: [
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' },
    ],
  },
  
  css: {
    wordPattern: /(#?-?\d*\.\d\w*%?)|(::?[\w-]*(?=[^,{;]*[,{]))|(([@#.!])?[\w-?]+%?|[@#!.])/g,
    comments: {
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
  },
  
  python: {
    comments: {
      lineComment: '#',
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
      { open: "'''", close: "'''", notIn: ['string', 'comment'] },
      { open: '"""', close: '"""', notIn: ['string', 'comment'] },
    ],
  },
  
  java: {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
  },
  
  cpp: {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
  },
};

// Register languages with Monaco
export function registerLanguageFeatures(monaco: any) {
  // Register TypeScript/JavaScript extras
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  });
  
  // Add extra library declarations for JavaScript and TypeScript
  const libSource = `
    declare class Console {
      log(...data: any[]): void;
      info(...data: any[]): void;
      warn(...data: any[]): void;
      error(...data: any[]): void;
      debug(...data: any[]): void;
    }
    
    interface Document {
      getElementById(elementId: string): HTMLElement | null;
      createElement(tagName: string): HTMLElement;
      body: HTMLElement;
    }
    
    interface Window {
      document: Document;
      console: Console;
    }
    
    declare var console: Console;
    declare var document: Document;
    declare var window: Window;
  `;
  
  // Add libraries to JavaScript and TypeScript
  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, 'ts:browser.d.ts');
  
  // Register language features for HTML
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model: any, position: any) => {
      return {
        suggestions: [
          {
            label: '!doctype',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<!DOCTYPE html>',
            detail: 'HTML5 Document Type',
          },
          {
            label: 'html',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<html>\n\t${0}\n</html>',
            detail: 'HTML root element',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'head',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<head>\n\t${0}\n</head>',
            detail: 'Document head',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'body',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<body>\n\t${0}\n</body>',
            detail: 'Document body',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'div',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<div>${0}</div>',
            detail: 'Division',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'p',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<p>${0}</p>',
            detail: 'Paragraph',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ]
      };
    }
  });
  
  // Register language features for CSS
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: (model: any, position: any) => {
      return {
        suggestions: [
          {
            label: 'display',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'display: ${1:block};$0',
            detail: 'CSS display property',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'flex',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'display: flex;$0',
            detail: 'CSS flex display',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'grid',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'display: grid;$0',
            detail: 'CSS grid display',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ]
      };
    }
  });
} 