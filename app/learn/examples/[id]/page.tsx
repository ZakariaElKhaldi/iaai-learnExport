"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink,
  Columns,
  SquareSplitVertical,
  Code
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Define categories (same as in examples page)
const categories = [
  { id: "html", name: "HTML", color: "#E44D26" },
  { id: "css", name: "CSS", color: "#264de4" },
  { id: "javascript", name: "JavaScript", color: "#F7DF1E" },
  { id: "python", name: "Python", color: "#3776AB" },
  { id: "sql", name: "SQL", color: "#F29111" },
];

// Sample examples data (should match the data in the examples page)
const examples = [
  {
    id: "html-1",
    title: "Basic HTML Document",
    description: "A simple HTML document with basic elements",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>`,
    category: "html",
    tags: ["html", "basics", "structure"],
    difficulty: "beginner"
  },
  {
    id: "html-2",
    title: "HTML Images",
    description: "How to display images in HTML",
    code: `<!DOCTYPE html>
<html>
<body>
  <h2>HTML Images</h2>
  <img src="example.jpg" alt="Example Image" width="500" height="333">
  <p>The image above is 500px wide and 333px high.</p>
</body>
</html>`,
    category: "html",
    tags: ["html", "images", "elements"],
    difficulty: "beginner"
  },
  // More examples from the examples page would be here
];

export default function TryItYourselfPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Find the example by ID
  const example = examples.find(ex => ex.id === id);
  
  const [code, setCode] = useState(example?.code || "");
  const [output, setOutput] = useState("");
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [isCopied, setIsCopied] = useState(false);
  
  // Set up initial output on load
  useEffect(() => {
    if (example) {
      setCode(example.code);
      runCode(example.code);
    }
  }, [example]);
  
  // If example not found, show error
  if (!example) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Example not found</h1>
        <p className="mb-8">The example you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/learn/examples">Back to examples</Link>
        </Button>
      </div>
    );
  }
  
  // Function to run/render the code
  const runCode = (codeToRun: string) => {
    // For HTML/CSS examples, just set the output to render in the iframe
    setOutput(codeToRun);
  };
  
  // Function to reset the code
  const resetCode = () => {
    setCode(example.code);
    runCode(example.code);
  };
  
  // Function to copy the code
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Function to download the code
  const downloadCode = () => {
    // Create a file with the code
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    
    // Set filename based on example category
    let extension = "txt";
    if (example.category === "html") extension = "html";
    if (example.category === "css") extension = "css";
    if (example.category === "javascript") extension = "js";
    if (example.category === "python") extension = "py";
    if (example.category === "sql") extension = "sql";
    
    element.download = `example.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/learn/examples" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Examples
            </Link>
          </Button>
          
          <Separator orientation="vertical" className="h-4" />
          
          <Button asChild variant="ghost" size="sm">
            <Link href={`/learn/${example.category}`} className="flex items-center gap-1">
              <Code className="h-4 w-4" />
              {categories.find(c => c.id === example.category)?.name} Tutorial
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{example.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1 mb-2">
              {example.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {example.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLayout(layout === "horizontal" ? "vertical" : "horizontal")}
            >
              {layout === "horizontal" ? (
                <SquareSplitVertical className="h-4 w-4 mr-2" />
              ) : (
                <Columns className="h-4 w-4 mr-2" />
              )}
              {layout === "horizontal" ? "Vertical Layout" : "Horizontal Layout"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Editor and Output */}
      <div className={`grid gap-6 mb-6 ${
        layout === "horizontal" 
          ? "grid-cols-1 lg:grid-cols-2" 
          : "grid-cols-1"
      }`}>
        {/* Code Editor */}
        <div className="h-[500px] flex flex-col bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border">
          <div className="bg-slate-200 dark:bg-slate-800 p-3 flex items-center justify-between">
            <h3 className="font-medium">Editor</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetCode}
                className="h-8 w-8 p-0"
                title="Reset code"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={copyCode}
                className="h-8 w-8 p-0"
                title={isCopied ? "Copied!" : "Copy code"}
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={downloadCode}
                className="h-8 w-8 p-0"
                title="Download code"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {/* In a production app, you would use a real code editor like Monaco Editor or CodeMirror */}
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-slate-950 resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
          
          <div className="bg-slate-200 dark:bg-slate-800 p-3 flex justify-end">
            <Button onClick={() => runCode(code)} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Run
            </Button>
          </div>
        </div>
        
        {/* Output Preview */}
        <div className="h-[500px] flex flex-col bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border">
          <div className="bg-slate-200 dark:bg-slate-800 p-3">
            <h3 className="font-medium">Result</h3>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-950 overflow-auto">
            {/* Use an iframe for HTML/CSS examples */}
            {(example.category === "html" || example.category === "css") && (
              <iframe
                srcDoc={output}
                title="Output"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-modals"
              />
            )}
            
            {/* For other languages, may need different output formats */}
            {(example.category !== "html" && example.category !== "css") && (
              <div className="p-4">
                <p className="text-slate-600 dark:text-slate-400">
                  This is a code example. In a real application, this would be executed on a server.
                </p>
                <pre className="mt-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-md overflow-auto">
                  <code>{code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabs for related examples */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-bold mb-4">Related Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples
            .filter(ex => ex.category === example.category && ex.id !== example.id)
            .slice(0, 3)
            .map(ex => (
              <Link 
                key={ex.id} 
                href={`/learn/examples/${ex.id}`}
                className="block p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border hover:border-primary transition-colors"
              >
                <h3 className="font-bold">{ex.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {ex.description}
                </p>
                <div className="flex items-center mt-2 text-primary text-sm font-medium">
                  Try it yourself <ExternalLink className="h-3 w-3 ml-1" />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
} 