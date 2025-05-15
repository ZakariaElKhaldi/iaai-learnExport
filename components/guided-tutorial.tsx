"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, CheckCircle, Code as CodeIcon, Play, RefreshCw, Lightbulb } from 'lucide-react';
import { useGuidedLearning } from '@/hooks/use-guided-learning';
import { Progress } from '@/components/ui/progress';

interface GuidedTutorialProps {
  guideId: string;
}

export function GuidedTutorial({ guideId }: GuidedTutorialProps) {
  const {
    currentGuide,
    isLoading,
    error,
    loadGuide,
    nextStep,
    prevStep,
    completeCurrentStep,
    resetGuide,
    getCurrentStep
  } = useGuidedLearning();

  // Load the guide when the component mounts or the guideId changes
  useEffect(() => {
    loadGuide(guideId);
  }, [guideId]);

  // Current step
  const currentStep = getCurrentStep();
  
  // Calculate progress percentage
  const progressPercentage = currentGuide.steps.length
    ? Math.round((currentGuide.steps.filter(step => step.isCompleted).length / currentGuide.steps.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="h-40 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p>Loading tutorial...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6">
          <div className="h-40 flex items-center justify-center">
            <div className="text-center text-red-500">
              <p className="mb-4">Error loading tutorial:</p>
              <p className="text-sm">{error}</p>
              <Button onClick={() => loadGuide(guideId)} className="mt-4">
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentStep) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="h-40 flex items-center justify-center">
            <div className="text-center">
              <p className="mb-4">No tutorial steps found.</p>
              <Button onClick={() => loadGuide(guideId)}>
                Reload Tutorial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentGuide.completed) {
    return (
      <Card className="w-full border-green-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Tutorial Completed: {currentGuide.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Congratulations! You have successfully completed all steps in this tutorial.
          </p>
          <div className="flex gap-4">
            <Button onClick={resetGuide} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
            <Button asChild>
              <a href="/learn">
                Continue Learning
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{currentGuide.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={resetGuide}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Step {currentGuide.currentStepIndex + 1} of {currentGuide.steps.length}
            </span>
            <span className="font-medium">{progressPercentage}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">{currentStep.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{currentStep.description}</p>
        </div>

        {currentStep.code && (
          <Tabs defaultValue="code" className="mt-6">
            <TabsList>
              <TabsTrigger value="code" className="flex items-center">
                <CodeIcon className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="tips">
                <Lightbulb className="h-4 w-4 mr-2" />
                Tips
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-2">
              <div className="bg-slate-900 text-slate-100 rounded-md p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code>{currentStep.code}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-2">
              <div className="border rounded-md p-4 min-h-[150px] dark:bg-white dark:text-black">
                {currentStep.code && (
                  <div dangerouslySetInnerHTML={{ __html: currentStep.code }} />
                )}
              </div>
            </TabsContent>
            <TabsContent value="tips" className="mt-2">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-4">
                <h4 className="font-medium flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                  Helpful Tips
                </h4>
                <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>Try typing the code yourself for better learning</li>
                  <li>Experiment by changing values to see different results</li>
                  <li>Use online resources like MDN for more details</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="pt-0 pb-6 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentGuide.currentStepIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          variant={currentStep.isCompleted ? "outline" : "default"}
          onClick={() => {
            if (!currentStep.isCompleted) {
              completeCurrentStep();
            }
            nextStep();
          }}
          disabled={currentGuide.currentStepIndex === currentGuide.steps.length - 1 && currentStep.isCompleted}
        >
          {currentStep.isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Completed
            </>
          ) : (
            <>
              Complete & Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 