"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import type { CourseData } from '@/lib/course-utils';

interface CourseContentDisplayProps {
  courseData: CourseData;
}

export default function CourseContentDisplay({ courseData }: CourseContentDisplayProps) {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [code, setCode] = useState<string>(
    courseData.practice_exercises && courseData.practice_exercises.length > 0
      ? courseData.practice_exercises[0].starter_code
      : ''
  );
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("learn");
  const [progress, setProgress] = useState<number>(0);

  // Exercise navigation handlers
  const handleNextExercise = () => {
    if (courseData.practice_exercises && activeExerciseIndex < courseData.practice_exercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
      setCode(courseData.practice_exercises[activeExerciseIndex + 1].starter_code);
      setShowSolution(false);
    }
  };

  const handlePrevExercise = () => {
    if (courseData.practice_exercises && activeExerciseIndex > 0) {
      setActiveExerciseIndex(activeExerciseIndex - 1);
      setCode(courseData.practice_exercises[activeExerciseIndex - 1].starter_code);
      setShowSolution(false);
    }
  };

  // Copy code handler
  const handleCopy = () => {
    if (courseData.practice_exercises && courseData.practice_exercises.length > 0) {
      const textToCopy = showSolution
        ? courseData.practice_exercises[activeExerciseIndex].solution
        : code;
      
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Extract current exercise
  const currentExercise = courseData.practice_exercises && courseData.practice_exercises.length > 0
    ? courseData.practice_exercises[activeExerciseIndex]
    : null;

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'exercises') {
      setProgress(10); // Simulate some progress when switching to exercises
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Course Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{courseData.metadata.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>{courseData.metadata.difficulty}</Badge>
          <Badge>{courseData.metadata.estimated_time} min</Badge>
          <Badge>{courseData.metadata.category}</Badge>
          {courseData.metadata.subcategory && (
            <Badge>{courseData.metadata.subcategory}</Badge>
          )}
        </div>
      </header>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="learn">Learn</TabsTrigger>
          {courseData.practice_exercises && courseData.practice_exercises.length > 0 && (
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          )}
          {courseData.quiz && courseData.quiz.length > 0 && (
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          )}
        </TabsList>

        {/* Learn Content */}
        <TabsContent value="learn" className="space-y-8">
          {/* Content Sections */}
          {courseData.content_sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{section.title || `Section ${section.order}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.type === "introduction" && (
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{section.content}</p>
                    </div>
                  )}
                  
                  {section.type === "concept" && (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">{section.content}</p>
                    </div>
                  )}
                  
                  {section.type === "code_example" && (
                    <div>
                      {section.content && <p className="mb-4">{section.content}</p>}
                      {section.code && (
                        <div className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">{section.language || "code"}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => {
                                navigator.clipboard.writeText(section.code || "");
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}
                            >
                              {copied ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                          </div>
                          <pre className="text-sm"><code>{section.code}</code></pre>
                        </div>
                      )}
                      {section.explanation && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{section.explanation}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
          {/* Summary */}
          {courseData.summary && (
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{courseData.summary}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Related Topics */}
          {courseData.related_topics && courseData.related_topics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {courseData.related_topics.map((topic) => (
                    <Link href={`/learn/${topic.title.toLowerCase().replace(/\s+/g, "-")}`} key={topic.id}>
                      <Badge className="cursor-pointer hover:bg-accent">
                        {topic.title} ({topic.relationship})
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Exercises Content */}
        {courseData.practice_exercises && courseData.practice_exercises.length > 0 && (
          <TabsContent value="exercises" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Exercise {activeExerciseIndex + 1} of {courseData.practice_exercises.length}</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevExercise}
                      disabled={activeExerciseIndex === 0}
                    >
                      <ArrowLeft size={16} className="mr-1" /> Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextExercise}
                      disabled={activeExerciseIndex === courseData.practice_exercises.length - 1}
                    >
                      Next <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
                <Progress value={((activeExerciseIndex + 1) / courseData.practice_exercises.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent>
                {currentExercise && (
                  <>
                    <h3 className="text-xl font-semibold mb-4">{currentExercise.title}</h3>
                    <p className="mb-6">{currentExercise.description}</p>
                    
                    <div className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Code Editor</span>
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                      </div>
                      {!showSolution ? (
                        <pre className="text-sm"><code>{currentExercise.starter_code}</code></pre>
                      ) : (
                        <pre className="text-sm"><code>{currentExercise.solution}</code></pre>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant={showSolution ? "default" : "outline"} 
                        onClick={() => setShowSolution(!showSolution)}
                      >
                        {showSolution ? "Hide Solution" : "Show Solution"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Quiz Content */}
        {courseData.quiz && courseData.quiz.length > 0 && (
          <TabsContent value="quiz" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {courseData.quiz.map((quizItem, index) => (
                    <AccordionItem value={`quiz-${index}`} key={index}>
                      <AccordionTrigger>Question {index + 1}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p className="font-medium whitespace-pre-line">{quizItem.question}</p>
                          <ul className="space-y-2">
                            {quizItem.options.map((option, optIndex) => (
                              <li 
                                key={optIndex}
                                className={`p-3 border rounded-md flex items-center justify-between ${
                                  optIndex === quizItem.correct_answer 
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-900/30"
                                }`}
                              >
                                <span>{option}</span>
                                {optIndex === quizItem.correct_answer && (
                                  <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                                )}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md border border-blue-100 dark:border-blue-900/50">
                            <h4 className="font-medium mb-1">Explanation:</h4>
                            <p className="text-sm">{quizItem.explanation}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
} 