"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Header } from "./components/Header";
import { ProblemsList } from "./components/ProblemsList";
import { ProblemDescription } from "./components/ProblemDescription";
import { CodeEditor } from "./components/CodeEditor";
import { Console } from "./components/Console";
import { TestResults } from "./components/TestResults";
import { MOCK_PROBLEMS, MOCK_LANGUAGES, MOCK_TEST_RESULTS } from "./data/mockData";

export default function UserPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const problemId = searchParams.get("id");
  
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"javascript" | "python" | "java">("javascript");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    id: number;
    input: string;
    expected: string;
    output: string;
    status: "passed" | "failed";
    hidden?: boolean;
  }>>(Array.from(MOCK_TEST_RESULTS));
  
  // Load problem data based on the URL parameter
  useEffect(() => {
    if (problemId) {
      const problem = MOCK_PROBLEMS.find(p => p.id.toString() === problemId);
      if (problem) {
        setSelectedProblem(problem);
        // Load starter code for the selected language
        setCode(problem.starterCode?.[language] || "// Your code here");
      }
    } else {
      setSelectedProblem(null);
      setCode("");
    }
  }, [problemId, language]);
  
  // Handle problem selection
  const handleSelectProblem = (problem: any) => {
    router.push(`/user-practice?id=${problem.id}`);
  };
  
  // Handle back button click
  const handleBackClick = () => {
    router.push("/user-practice");
  };
  
  // Change setLanguage to accept string and validate it
  const handleLanguageChange = (lang: string) => {
    if (lang === "javascript" || lang === "python" || lang === "java") {
      setLanguage(lang);
    }
  };
  
  // Handle code execution
  const handleRunCode = () => {
    setShowConsole(true);
    setIsRunning(true);
    setConsoleOutput("");
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setConsoleOutput(`> Running ${language} code...\n> Compiling...\n> Starting execution...\n\n// Sample output for demonstration\nconsole.log("Hello, World!");\n> Hello, World!\n\n> Execution completed in 0.25s`);
      setIsRunning(false);
    }, 1500);
  };
  
  // Handle code submission
  const handleSubmitCode = () => {
    setShowConsole(true);
    setIsSubmitting(true);
    setConsoleOutput("");
    
    // Simulate code submission with a delay
    setTimeout(() => {
      setConsoleOutput(`> Submitting solution in ${language}...\n> Running test cases...\n\n> Test case 1: Passed\n> Test case 2: Passed\n> Test case 3: Failed\n   Expected: [1, 2, 3]\n   Got: [1, 2, 4]\n\n> 2 of 3 test cases passed.\n\n> Execution completed in 0.45s`);
      setIsSubmitting(false);
      setShowTestResults(true);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header
        activeProblem={selectedProblem}
        language={language}
        setLanguage={handleLanguageChange}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        showConsole={showConsole}
        setShowConsole={setShowConsole}
        onRunCode={handleRunCode}
        onSubmitCode={handleSubmitCode}
        onBackClick={handleBackClick}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        languages={MOCK_LANGUAGES}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {selectedProblem ? (
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 overflow-hidden"
        >
          {showSidebar && (
            <>
              <ResizablePanel 
                defaultSize={40}
                minSize={30}
                maxSize={60}
                className="overflow-hidden flex flex-col border-r"
              >
                <ProblemDescription problem={selectedProblem} />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}
          
          <ResizablePanel className="overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                languages={MOCK_LANGUAGES}
              />
            </div>
            
            <TestResults 
              results={testResults} 
              isVisible={showTestResults}
              onClose={() => setShowTestResults(false)}
            />
            
            <Console 
              content={consoleOutput}
              isVisible={showConsole}
              onClose={() => setShowConsole(false)}
              onClear={() => setConsoleOutput("")}
              isProcessing={isRunning || isSubmitting}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1 overflow-hidden">
          <ProblemsList 
            problems={MOCK_PROBLEMS}
            onSelectProblem={handleSelectProblem}
            selectedProblemId={null}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      )}
    </div>
  );
}