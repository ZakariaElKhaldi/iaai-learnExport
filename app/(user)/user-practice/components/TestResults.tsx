"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckSquare, XSquare, AlertCircle, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

interface TestResult {
  id: number;
  input: string;
  expected: string;
  output: string;
  status: "passed" | "failed";
  hidden?: boolean;
}

interface TestResultsProps {
  results: TestResult[];
  isVisible: boolean;
  onClose?: () => void;
}

export function TestResults({ results, isVisible, onClose }: TestResultsProps) {
  const [expandedTests, setExpandedTests] = useState<number[]>([]);
  
  // Toggle expanded state for a test case
  const toggleExpand = (id: number) => {
    if (expandedTests.includes(id)) {
      setExpandedTests(expandedTests.filter(testId => testId !== id));
    } else {
      setExpandedTests([...expandedTests, id]);
    }
  };
  
  // Calculate test statistics
  const totalTests = results.length;
  const passedTests = results.filter(result => result.status === "passed").length;
  const hiddenTests = results.filter(result => result.hidden).length;
  
  const isAllPassed = passedTests === totalTests;
  
  if (!isVisible || results.length === 0) return null;
  
  return (
    <div className="border-t bg-white overflow-hidden animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between p-3 bg-slate-50 border-b">
        <div className="flex items-center gap-2">
          {isAllPassed ? (
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckSquare className="h-4 w-4" />
              <span className="font-medium">All Tests Passed</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-600">
              <XSquare className="h-4 w-4" />
              <span className="font-medium">
                {passedTests} / {totalTests} Tests Passed
              </span>
            </div>
          )}
          
          <span className="text-sm text-slate-500">
            {hiddenTests > 0 && `(${hiddenTests} hidden test${hiddenTests > 1 ? 's' : ''})`}
          </span>
        </div>
        
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-7 w-7 p-0"
            aria-label="Close test results"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        <div className="divide-y">
          {results.map((result) => {
            const isExpanded = expandedTests.includes(result.id);
            
            return (
              <div key={result.id} className="flex flex-col">
                <div 
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50",
                    isExpanded && "bg-slate-50"
                  )}
                  onClick={() => toggleExpand(result.id)}
                >
                  <div className="flex items-center gap-2">
                    {result.status === "passed" ? (
                      <CheckSquare className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XSquare className="h-4 w-4 text-rose-600" />
                    )}
                    <div className="text-sm font-medium">
                      Test Case {result.id}
                    </div>
                    {result.hidden && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <EyeOff className="h-3 w-3" />
                        <span>Hidden</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className={cn(
                        "text-xs font-medium rounded-full px-2 py-0.5",
                        result.status === "passed" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : "bg-rose-100 text-rose-800"
                      )}
                    >
                      {result.status === "passed" ? "Passed" : "Failed"}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="p-3 bg-slate-50 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-500">Input</div>
                        <pre className="bg-slate-100 p-2 rounded overflow-x-auto text-xs font-mono">
                          {result.input}
                        </pre>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-500">Expected Output</div>
                        <pre className="bg-slate-100 p-2 rounded overflow-x-auto text-xs font-mono">
                          {result.hidden ? "[Hidden]" : result.expected}
                        </pre>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-500">Your Output</div>
                        <pre className={cn(
                          "p-2 rounded overflow-x-auto text-xs font-mono",
                          result.status === "passed" 
                            ? "bg-emerald-50 border border-emerald-100" 
                            : "bg-rose-50 border border-rose-100"
                        )}>
                          {result.output}
                        </pre>
                      </div>
                    </div>
                    
                    {result.status === "failed" && (
                      <div className="mt-3 p-2 bg-rose-50 border border-rose-100 rounded text-rose-700 text-xs flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Test Failed</div>
                          <p>Your output doesn't match the expected output for this test case.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 