// Monaco Editor code formatters

// Language-specific formatting options
export const formattingOptions = {
  // Default formatting options
  default: {
    insertSpaces: true,
    tabSize: 2,
  },
  
  // Language-specific overrides
  javascript: {
    insertSpaces: true,
    tabSize: 2,
  },
  typescript: {
    insertSpaces: true,
    tabSize: 2,
  },
  json: {
    insertSpaces: true,
    tabSize: 2,
  },
  html: {
    insertSpaces: true,
    tabSize: 2,
  },
  css: {
    insertSpaces: true,
    tabSize: 2,
  },
  python: {
    insertSpaces: true,
    tabSize: 4,
  },
  java: {
    insertSpaces: true,
    tabSize: 4,
  },
  c: {
    insertSpaces: true,
    tabSize: 4,
  },
  cpp: {
    insertSpaces: true,
    tabSize: 4,
  },
};

// Format JavaScript/TypeScript code using Prettier-like rules
export function formatJavaScript(code: string, tabSize: number = 2): string {
  try {
    // This is a simplified formatter - in a real app, you'd integrate with Prettier
    // For now, we're doing some basic formatting
    const lines = code.split('\n');
    let formattedCode = '';
    let indentLevel = 0;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Adjust indent level based on braces
      if (trimmedLine.endsWith('{')) {
        // Line ends with opening brace
        const indent = ' '.repeat(indentLevel * tabSize);
        formattedCode += `${indent}${trimmedLine}\n`;
        indentLevel++;
      } else if (trimmedLine.startsWith('}')) {
        // Line starts with closing brace
        indentLevel = Math.max(0, indentLevel - 1);
        const indent = ' '.repeat(indentLevel * tabSize);
        formattedCode += `${indent}${trimmedLine}\n`;
      } else if (trimmedLine.length > 0) {
        // Regular line
        const indent = ' '.repeat(indentLevel * tabSize);
        formattedCode += `${indent}${trimmedLine}\n`;
      } else {
        // Empty line
        formattedCode += '\n';
      }
    }
    
    return formattedCode;
  } catch (error) {
    console.error('Error formatting JavaScript:', error);
    return code; // Return original code if formatting fails
  }
}

// Format HTML with basic indentation
export function formatHTML(code: string, tabSize: number = 2): string {
  try {
    const lines = code.split('\n');
    let formattedCode = '';
    let indentLevel = 0;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('</')) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      if (trimmedLine.length > 0) {
        const indent = ' '.repeat(indentLevel * tabSize);
        formattedCode += `${indent}${trimmedLine}\n`;
      } else {
        formattedCode += '\n';
      }
      
      // Check for opening tag (but not self-closing)
      if (trimmedLine.startsWith('<') && 
          !trimmedLine.startsWith('</') && 
          !trimmedLine.endsWith('/>') && 
          !trimmedLine.match(/<(meta|link|img|br|hr|input)[^>]*>/i)) {
        indentLevel++;
      }
    }
    
    return formattedCode;
  } catch (error) {
    console.error('Error formatting HTML:', error);
    return code;
  }
}

// Format CSS with basic indentation
export function formatCSS(code: string, tabSize: number = 2): string {
  try {
    // Very basic CSS formatter
    return code
      .replace(/\s*\{\s*/g, ' {\n' + ' '.repeat(tabSize))
      .replace(/\s*\}\s*/g, '\n}\n')
      .replace(/\s*;\s*/g, ';\n' + ' '.repeat(tabSize))
      .replace(/\s*:\s*/g, ': ');
  } catch (error) {
    console.error('Error formatting CSS:', error);
    return code;
  }
}

// Get formatter for a specific language
export function getFormatterForLanguage(language: string) {
  const lang = language.toLowerCase();
  
  if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
    return formatJavaScript;
  } else if (lang === 'html') {
    return formatHTML;
  } else if (lang === 'css') {
    return formatCSS;
  }
  
  // Default formatter (just adds consistent indentation)
  return (code: string, tabSize: number = 2) => {
    try {
      const lines = code.split('\n');
      let formattedCode = '';
      let indentLevel = 0;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine.endsWith('{') || trimmedLine.endsWith('[')) {
          const indent = ' '.repeat(indentLevel * tabSize);
          formattedCode += `${indent}${trimmedLine}\n`;
          indentLevel++;
        } else if (trimmedLine.startsWith('}') || trimmedLine.startsWith(']')) {
          indentLevel = Math.max(0, indentLevel - 1);
          const indent = ' '.repeat(indentLevel * tabSize);
          formattedCode += `${indent}${trimmedLine}\n`;
        } else if (trimmedLine.length > 0) {
          const indent = ' '.repeat(indentLevel * tabSize);
          formattedCode += `${indent}${trimmedLine}\n`;
        } else {
          formattedCode += '\n';
        }
      }
      
      return formattedCode;
    } catch (error) {
      console.error(`Error formatting ${language}:`, error);
      return code;
    }
  };
} 