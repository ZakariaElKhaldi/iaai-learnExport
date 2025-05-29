"use client";

import { useMemo } from "react";
import { CodeHighlighter } from "./CodeHighlighter";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const processedContent = useMemo(() => {
    // Simple markdown processing for the most common elements
    let html = content
      // Process code blocks with language specification
      .replace(/```(\w+)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<div class="code-block" data-language="${lang}" data-code="${encodeURIComponent(code.trim())}"></div>`;
      })
      // Process code blocks without language specification
      .replace(/```([\s\S]*?)```/g, (_, code) => {
        return `<div class="code-block" data-code="${encodeURIComponent(code.trim())}"></div>`;
      })
      // Process inline code
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Process headers
      .replace(/### (.*)/g, '<h3 class="text-md font-bold mt-4 mb-2">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-lg font-bold mt-5 mb-3">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-xl font-bold mt-6 mb-4">$1</h1>')
      // Process bold and italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Process lists
      .replace(/^\s*-\s(.*)$/gm, '<li class="mb-1">$1</li>')
      // Process paragraphs (lines that are not headers, lists, or code blocks)
      .split('\n\n')
      .map(paragraph => {
        if (
          !paragraph.startsWith('<h1') && 
          !paragraph.startsWith('<h2') && 
          !paragraph.startsWith('<h3') && 
          !paragraph.startsWith('<li') && 
          !paragraph.startsWith('<div class="code-block"') &&
          paragraph.trim() !== ''
        ) {
          return `<p class="mb-4">${paragraph.replace(/\n/g, ' ')}</p>`;
        }
        return paragraph;
      })
      .join('\n');
    
    // Convert lists to proper HTML
    html = html
      .replace(/<li class="mb-1">(.*)<\/li>\n<li class="mb-1">/g, '<li class="mb-1">$1</li>\n<li class="mb-1">')
      .replace(/<li class="mb-1">(.*)<\/li>\n<li class="mb-1">/g, '<li class="mb-1">$1</li>\n<li class="mb-1">')
      .replace(/(<li class="mb-1">.*<\/li>(\n)?)+/g, match => {
        return `<ul class="list-disc pl-6 mb-4">${match}</ul>`;
      });
    
    return html;
  }, [content]);
  
  return (
    <div 
      className={`markdown-content ${className}`} 
      dangerouslySetInnerHTML={{ __html: processedContent }}
      ref={el => {
        if (el) {
          // Replace code block placeholders with actual CodeHighlighter components
          el.querySelectorAll('.code-block').forEach(block => {
            const codeBlock = document.createElement('div');
            const language = block.getAttribute('data-language') || '';
            const code = decodeURIComponent(block.getAttribute('data-code') || '');
            
            // Create a container for the code highlighter
            const container = document.createElement('div');
            container.className = 'my-4';
            
            // Create header
            const header = document.createElement('div');
            header.className = 'flex items-center justify-between px-4 py-1.5 bg-slate-200 rounded-t-md';
            
            const langLabel = document.createElement('div');
            langLabel.className = 'text-xs font-medium text-slate-500';
            langLabel.textContent = language || 'text';
            header.appendChild(langLabel);
            
            container.appendChild(header);
            
            // Create code content
            const codeContent = document.createElement('pre');
            codeContent.className = 'bg-slate-100 p-4 rounded-b-md overflow-x-auto font-mono text-sm';
            codeContent.textContent = code;
            container.appendChild(codeContent);
            
            codeBlock.appendChild(container);
            block.parentNode?.replaceChild(codeBlock, block);
          });
          
          // Style inline code
          el.querySelectorAll('.inline-code').forEach(inlineCode => {
            inlineCode.className = 'bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono text-sm';
          });
        }
      }}
    />
  );
} 