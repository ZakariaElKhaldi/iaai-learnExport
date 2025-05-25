"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle, Star, ChevronDown, ChevronUp, RefreshCw, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuizOption {
  text: string;
  value: string;
  isCorrect?: boolean;
  explanation?: string;
}

interface QuizSectionProps {
  quizId?: string;
  courseId?: string | number;
  question: string;
  options: QuizOption[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export function QuizSection({ 
  quizId = 'quiz-' + Math.random().toString(36).substring(2, 9),
  courseId,
  question, 
  options, 
  explanation,
  difficulty = 'medium' 
}: QuizSectionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<{totalAttempts: number; correctAttempts: number; successRate: number} | null>(null);
  const [showStats, setShowStats] = useState(false);
  
  const handleOptionSelect = (value: string) => {
    if (!isSubmitted) {
      setSelectedOption(value);
    }
  };
  
  const handleSubmit = async () => {
    if (!selectedOption) return;
    
    setIsLoading(true);
    
    // Check if the selected option is correct
    const option = options.find(opt => opt.value === selectedOption);
    const isCorrect = option?.isCorrect === true;
    
    try {
      // Submit the attempt to the API
      if (courseId) {
        await fetch('/api/learn/quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quizId,
            courseId: String(courseId),
            selectedOption,
            isCorrect,
          }),
        });
      }
    } catch (error) {
      console.error('Failed to record quiz attempt:', error);
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
      setIsExplanationVisible(true);
    }
  };
  
  const resetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsExplanationVisible(false);
  };
  
  const fetchStats = async () => {
    if (!courseId) return;
    
    try {
      const response = await fetch(`/api/learn/quiz?courseId=${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch quiz statistics:', error);
    }
  };
  
  const toggleStats = () => {
    if (!showStats && !stats) {
      fetchStats();
    }
    setShowStats(!showStats);
  };
  
  const isCorrectAnswer = () => {
    if (!selectedOption || !isSubmitted) return false;
    const option = options.find(opt => opt.value === selectedOption);
    return option?.isCorrect === true;
  };
  
  const getCorrectAnswer = () => {
    return options.find(opt => opt.isCorrect)?.text || 'No correct answer defined';
  };
  
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/20';
      case 'hard': return 'bg-red-100 dark:bg-red-900/20';
      default: return 'bg-amber-100 dark:bg-amber-900/20';
    }
  };
  
  const getDifficultyTextColor = () => {
    switch(difficulty) {
      case 'easy': return 'text-green-500';
      case 'hard': return 'text-red-500';
      default: return 'text-amber-500';
    }
  };
  
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 group shadow-sm hover:shadow transition-all duration-200">
      <div className={`px-4 py-2 flex items-center justify-between ${getDifficultyColor()}`}>
        <div className="flex items-center gap-2">
          <Star className={`h-4 w-4 ${getDifficultyTextColor()}`} />
          <span className="font-medium">Quiz</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">{difficulty}</Badge>
          {courseId && (
            <button 
              onClick={toggleStats}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              title="View quiz statistics"
            >
              <BarChart className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {showStats && stats && (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 text-sm border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-slate-600 dark:text-slate-400">Attempts: </span>
              <span className="font-medium">{stats.totalAttempts}</span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">Success rate: </span>
              <span className={`font-medium ${stats.successRate > 70 ? 'text-green-600 dark:text-green-400' : stats.successRate > 40 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                {Math.round(stats.successRate)}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-white dark:bg-slate-900">
        <h3 className="text-lg font-medium mb-4">{question}</h3>
        
        <div className="space-y-2 mb-4">
          {options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleOptionSelect(option.value)}
              className={`
                flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors
                ${selectedOption === option.value ? 'border-primary' : 'border-slate-200 dark:border-slate-700'}
                ${isSubmitted ? (
                  option.isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : selectedOption === option.value && !option.isCorrect
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'hover:border-slate-300 dark:hover:border-slate-600'
                ) : 'hover:border-slate-300 dark:hover:border-slate-600'}
              `}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isSubmitted ? (
                  option.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : selectedOption === option.value && !option.isCorrect ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  )
                ) : (
                  <div className={`
                    w-5 h-5 rounded-full border-2 transition-colors
                    ${selectedOption === option.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-slate-300 dark:border-slate-600'
                    }
                  `}>
                    {selectedOption === option.value && (
                      <div className="w-3 h-3 mx-auto mt-0.5 rounded-full bg-primary" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`
                  ${isSubmitted && option.isCorrect ? 'font-medium' : ''}
                `}>{option.text}</p>
                
                {isSubmitted && option.explanation && selectedOption === option.value && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {option.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {isSubmitted ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-md ${isCorrectAnswer() ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
              <p className={`font-medium ${isCorrectAnswer() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isCorrectAnswer() 
                  ? 'Correct! Well done.' 
                  : `Incorrect. The correct answer is: ${getCorrectAnswer()}`
                }
              </p>
            </div>
            
            {explanation && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                <button
                  onClick={() => setIsExplanationVisible(!isExplanationVisible)}
                  className="w-full flex items-center justify-between p-3 text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span className="font-medium">Explanation</span>
                  </div>
                  {isExplanationVisible ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {isExplanationVisible && (
                  <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300">{explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || isLoading}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2
              ${selectedOption && !isLoading
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? 'Submitting...' : 'Submit Answer'}
          </button>
        )}
      </div>
    </div>
  );
} 