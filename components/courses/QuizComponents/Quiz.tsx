"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Timer, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types for quiz questions and answers
export type QuestionType = 'single' | 'multiple' | 'text';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  explanation?: string;
  options?: QuestionOption[];
  correctAnswer?: string; // For text questions
}

export interface QuizProps {
  id: string;
  title: string;
  description?: string;
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  questions: Question[];
  onComplete: (score: number, passed: boolean, answers: Record<string, any>) => void;
  className?: string;
}

const Quiz = ({
  id,
  title,
  description,
  timeLimit,
  passingScore,
  questions,
  onComplete,
  className,
}: QuizProps) => {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : 0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  
  // Handle timer
  useEffect(() => {
    if (!timeLimit || quizCompleted || showResults) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLimit, quizCompleted, showResults]);
  
  // Format remaining time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle single choice answers
  const handleSingleAnswer = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };
  
  // Handle multiple choice answers
  const handleMultipleAnswer = (optionId: string, checked: boolean) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    
    if (checked) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...currentAnswers, optionId],
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswers.filter((id: string) => id !== optionId),
      });
    }
  };
  
  // Handle text answers
  const handleTextAnswer = (text: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: text,
    });
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleCompleteQuiz();
    }
  };
  
  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };
  
  // Calculate score and complete quiz
  const handleCompleteQuiz = () => {
    let correctCount = 0;
    
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (!userAnswer) return; // Unanswered question
      
      if (question.type === 'single') {
        const correctOption = question.options?.find(option => option.isCorrect);
        if (correctOption && userAnswer === correctOption.id) {
          correctCount++;
        }
      } else if (question.type === 'multiple') {
        const correctOptions = question.options?.filter(option => option.isCorrect).map(option => option.id) || [];
        const isCorrect = 
          Array.isArray(userAnswer) && 
          correctOptions.length === userAnswer.length && 
          correctOptions.every(id => userAnswer.includes(id));
        
        if (isCorrect) {
          correctCount++;
        }
      } else if (question.type === 'text') {
        // For text questions, we might need a more sophisticated comparison
        // Here we just do a case-insensitive exact match
        if (question.correctAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
          correctCount++;
        }
      }
    });
    
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(calculatedScore);
    setQuizCompleted(true);
    setShowResults(true);
    
    // Call the onComplete handler with the results
    onComplete(
      calculatedScore,
      calculatedScore >= passingScore,
      answers
    );
  };
  
  // Reset quiz to try again
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setTimeRemaining(timeLimit ? timeLimit * 60 : 0);
  };
  
  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'single') {
      return !!answer;
    } else if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    } else if (currentQuestion.type === 'text') {
      return !!answer && answer.trim() !== '';
    }
    
    return false;
  };
  
  // Render the question based on its type
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single':
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleSingleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id}
                  className="mt-1"
                />
                <Label 
                  htmlFor={option.id} 
                  className="text-base font-normal flex-1 leading-normal cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'multiple':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={option.id}
                  checked={(answers[currentQuestion.id] || []).includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleMultipleAnswer(option.id, checked as boolean)
                  }
                  className="mt-1"
                />
                <Label 
                  htmlFor={option.id} 
                  className="text-base font-normal flex-1 leading-normal cursor-pointer"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        );
        
      case 'text':
        return (
          <Textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleTextAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[120px]"
          />
        );
        
      default:
        return null;
    }
  };
  
  // Render the results screen
  if (showResults) {
    const passed = score >= passingScore;
    
    return (
      <Card className={cn("w-full max-w-3xl mx-auto", className)}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>
            {passed 
              ? "Congratulations! You've passed the quiz." 
              : "You didn't pass this time. Review the material and try again."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center",
              passed ? "bg-green-100" : "bg-red-100"
            )}>
              {passed 
                ? <CheckCircle2 className="w-12 h-12 text-green-600" /> 
                : <AlertCircle className="w-12 h-12 text-red-600" />}
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold">Your Score</h3>
              <p className="text-3xl font-bold">{score}%</p>
              <p className="text-sm text-muted-foreground">
                Passing score: {passingScore}%
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Summary</h3>
            <p className="text-sm text-muted-foreground">
              You answered {Object.keys(answers).length} out of {totalQuestions} questions.
            </p>
            
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Your score</span>
                <span>{score}%</span>
              </div>
              <Progress 
                value={score} 
                className={cn(
                  "h-2",
                  passed ? "[&>div]:bg-green-600" : "[&>div]:bg-red-600"
                )}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleRetry}
            className="space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          
          <Button>
            Continue to Next Lesson
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Render the quiz
  return (
    <Card className={cn("w-full max-w-3xl mx-auto", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          {timeLimit && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span className="text-sm font-medium">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <h3 className="text-lg font-medium">
          {currentQuestion.text}
        </h3>
        
        {renderQuestion()}
        
        {showExplanation && currentQuestion.explanation && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-1">Explanation:</h4>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="space-x-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>
        
        <div className="flex space-x-3">
          {!showExplanation && currentQuestion.explanation && (
            <Button
              variant="ghost"
              onClick={() => setShowExplanation(true)}
            >
              Show Hint
            </Button>
          )}
          
          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button 
              onClick={handleCompleteQuiz}
              disabled={!isCurrentQuestionAnswered()}
            >
              Finish Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={!isCurrentQuestionAnswered()}
              className="space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz; 