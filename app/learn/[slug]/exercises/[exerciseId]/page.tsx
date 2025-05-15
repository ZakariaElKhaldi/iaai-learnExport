"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Copy,
  Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data - in a real app, this would come from a database
const exerciseData = {
  "html-1": {
    id: "html-1",
    title: "HTML Elements",
    description: "Practice adding basic HTML elements to a document",
    instructions: "Add a paragraph element with the text &apos;Hello World&apos; inside the body tag.",
    hints: [
      "Use the <p> tag to create a paragraph",
      "Make sure your paragraph is inside the body element",
      "Don&apos;t forget to close your tags"
    ],
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Document</title>
</head>
<body>
  <!-- Add your paragraph here -->
  
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Document</title>
</head>
<body>
  <!-- Add your paragraph here -->
  <p>Hello World</p>
</body>
</html>`,
    expectedOutput: "<p>Hello World</p>",
    difficulty: "beginner",
    category: "html",
    next: "html-2",
    prev: null
  }
};

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
  const topicSlug = params.slug as string;
  
  // In a real app, you would fetch this data from an API or database
  const exercise = exerciseData[exerciseId as keyof typeof exerciseData];
  
  const [code, setCode] = useState(exercise?.initialCode || "");
  const [output, setOutput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  if (!exercise) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Exercise not found</h1>
        <p className="mb-8">The exercise you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/learn/exercises">Back to exercises</Link>
        </Button>
      </div>
    );
  }
  
  const runCode = () => {
    // This is a simplified example. In a real app, you would:
    // 1. For HTML/CSS - Use an iframe or DOMParser to render the code
    // 2. For JavaScript - Use a sandbox, iframe with eval, or a safer evaluation method
    // 3. For backend languages - Send to a server for execution
    
    // For HTML exercises, we'll use DOMParser to extract the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "text/html");
    const bodyContent = doc.body.innerHTML;
    
    setOutput(bodyContent);
    
    // Check if the solution is correct (simplified)
    const isSuccess = bodyContent.includes(exercise.expectedOutput);
    setIsCorrect(isSuccess);
  };
  
  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const resetCode = () => {
    setCode(exercise.initialCode);
    setOutput("");
    setIsCorrect(false);
  };
  
  const navigateToExercise = (exerciseId: string | null) => {
    if (exerciseId) {
      router.push(`/learn/${topicSlug}/exercises/${exerciseId}`);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 pt-28">
      {/* Exercise Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Link href={`/learn/${topicSlug}`} className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {topicSlug.toUpperCase()}
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Link href="/learn/exercises" className="text-blue-600 hover:underline">
            All Exercises
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs px-2.5 py-0.5 rounded-full ${
            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {exercise.description}
        </p>
        
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg mb-8 border">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <p>{exercise.instructions}</p>
        </div>
      </div>
      
      {/* Code Editor and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Code Editor */}
        <div className="h-[500px] flex flex-col bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border">
          <div className="bg-slate-200 dark:bg-slate-800 p-3 flex items-center justify-between">
            <h3 className="font-medium">Editor</h3>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetCode}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyCode(code)}
                      className="h-8 w-8 p-0"
                    >
                      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCopied ? "Copied!" : "Copy code"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                      className="h-8 w-8 p-0"
                    >
                      {showSolution ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showSolution ? "Hide solution" : "Show solution"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {/* In a real app, you would use a proper code editor like Monaco Editor or CodeMirror */}
            <textarea 
              value={showSolution ? exercise.solution : code} 
              onChange={(e) => !showSolution && setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-slate-950 resize-none focus:outline-none"
              spellCheck="false"
              readOnly={showSolution}
            />
          </div>
          
          <div className="bg-slate-200 dark:bg-slate-800 p-3 flex justify-end">
            <Button onClick={runCode} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Run Code
            </Button>
          </div>
        </div>
        
        {/* Output Preview */}
        <div className="h-[500px] flex flex-col bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border">
          <div className="bg-slate-200 dark:bg-slate-800 p-3 flex items-center justify-between">
            <h3 className="font-medium">Result</h3>
            {isCorrect && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Correct!</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 bg-white dark:bg-slate-950 overflow-auto">
            {output ? (
              <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: output }} />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                <p>Run your code to see the result</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Hints Accordion */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Need help?</h3>
        <div className="space-y-2">
          {exercise.hints.map((hint, index) => (
            <details key={index} className="bg-white dark:bg-slate-800 p-3 rounded-lg border">
              <summary className="cursor-pointer font-medium">
                Hint {index + 1}
              </summary>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {hint}
              </p>
            </details>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between mt-12">
        <Button
          variant="outline"
          onClick={() => navigateToExercise(exercise.prev)}
          disabled={!exercise.prev}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Exercise
        </Button>
        
        <Button
          onClick={() => navigateToExercise(exercise.next)}
          disabled={!exercise.next}
        >
          Next Exercise
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      {/* Related Resources */}
      <div className="mt-16 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border">
        <h3 className="font-semibold mb-4">Related Resources</h3>
        <ul className="space-y-2">
          <li>
            <Link href={`/learn/${topicSlug}`} className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              {topicSlug.toUpperCase()} Tutorial
            </Link>
          </li>
          <li>
            <Link href={`/learn/${topicSlug}/reference`} className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              {topicSlug.toUpperCase()} Reference
            </Link>
          </li>
          <li>
            <Link href={`/learn/examples?tag=${topicSlug}`} className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              {topicSlug.toUpperCase()} Examples
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
} 