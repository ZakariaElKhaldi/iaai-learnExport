import { useState } from 'react';

export type Step = {
  id: string;
  title: string;
  description: string;
  code?: string;
  expectedOutput?: string;
  isCompleted: boolean;
};

export type LearningGuide = {
  id: string;
  title: string;
  steps: Step[];
  currentStepIndex: number;
  completed: boolean;
};

// Initial guide when none is loaded
const EMPTY_GUIDE: LearningGuide = {
  id: '',
  title: '',
  steps: [],
  currentStepIndex: 0,
  completed: false
};

export function useGuidedLearning() {
  const [currentGuide, setCurrentGuide] = useState<LearningGuide>(EMPTY_GUIDE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load a guide by ID
  const loadGuide = async (guideId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real application, this would likely be an API call to fetch the guide
      // For now, we'll simulate a delay and return a mock guide
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check localStorage first for in-progress guide
      const savedGuide = localStorage.getItem(`guide-${guideId}`);
      if (savedGuide) {
        const parsedGuide = JSON.parse(savedGuide);
        setCurrentGuide(parsedGuide);
        setIsLoading(false);
        return;
      }
      
      // If no saved guide, load a new one (mock data for now)
      const mockGuides: Record<string, Omit<LearningGuide, 'currentStepIndex' | 'completed'>> = {
        'html-basics': {
          id: 'html-basics',
          title: 'HTML Basics',
          steps: [
            {
              id: 'step-1',
              title: 'HTML Document Structure',
              description: 'Learn the basic structure of an HTML document.',
              code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
              isCompleted: false
            },
            {
              id: 'step-2',
              title: 'HTML Headings',
              description: 'Learn about the different heading elements.',
              code: '<h1>This is a level 1 heading</h1>\n<h2>This is a level 2 heading</h2>\n<h3>This is a level 3 heading</h3>',
              isCompleted: false
            },
            {
              id: 'step-3',
              title: 'HTML Paragraphs',
              description: 'Learn how to create paragraphs of text.',
              code: '<p>This is a paragraph of text.</p>\n<p>This is another paragraph.</p>',
              isCompleted: false
            }
          ]
        },
        'css-basics': {
          id: 'css-basics',
          title: 'CSS Basics',
          steps: [
            {
              id: 'step-1',
              title: 'CSS Selectors',
              description: 'Learn about different CSS selectors.',
              code: 'body {\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: blue;\n}\n\n.my-class {\n  font-size: 16px;\n}\n\n#my-id {\n  border: 1px solid black;\n}',
              isCompleted: false
            },
            {
              id: 'step-2',
              title: 'CSS Box Model',
              description: 'Learn about the CSS box model: margin, border, padding, and content.',
              code: '.box {\n  margin: 10px;\n  border: 2px solid black;\n  padding: 15px;\n  width: 200px;\n  height: 100px;\n}',
              isCompleted: false
            },
            {
              id: 'step-3',
              title: 'CSS Flexbox',
              description: 'Learn how to use CSS Flexbox for layout.',
              code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.item {\n  flex: 1;\n  padding: 10px;\n}',
              isCompleted: false
            }
          ]
        }
      };
      
      if (mockGuides[guideId]) {
        const newGuide: LearningGuide = {
          ...mockGuides[guideId],
          currentStepIndex: 0,
          completed: false
        };
        setCurrentGuide(newGuide);
      } else {
        setError(`Guide not found: ${guideId}`);
      }
    } catch (err) {
      setError(`Failed to load guide: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Move to the next step in the guide
  const nextStep = () => {
    if (!currentGuide || currentGuide.currentStepIndex >= currentGuide.steps.length - 1) {
      return;
    }
    
    setCurrentGuide(prev => {
      const updatedSteps = [...prev.steps];
      updatedSteps[prev.currentStepIndex] = {
        ...updatedSteps[prev.currentStepIndex],
        isCompleted: true
      };
      
      const nextIndex = prev.currentStepIndex + 1;
      const isLastStep = nextIndex === prev.steps.length - 1;
      
      const updatedGuide = {
        ...prev,
        steps: updatedSteps,
        currentStepIndex: nextIndex,
        completed: isLastStep && updatedSteps[nextIndex].isCompleted
      };
      
      // Save progress to localStorage
      localStorage.setItem(`guide-${prev.id}`, JSON.stringify(updatedGuide));
      
      return updatedGuide;
    });
  };

  // Move to the previous step
  const prevStep = () => {
    if (!currentGuide || currentGuide.currentStepIndex <= 0) {
      return;
    }
    
    setCurrentGuide(prev => {
      const nextIndex = prev.currentStepIndex - 1;
      
      const updatedGuide = {
        ...prev,
        currentStepIndex: nextIndex
      };
      
      // Save progress to localStorage
      localStorage.setItem(`guide-${prev.id}`, JSON.stringify(updatedGuide));
      
      return updatedGuide;
    });
  };

  // Complete the current step
  const completeCurrentStep = () => {
    if (!currentGuide || currentGuide.steps.length === 0) {
      return;
    }
    
    setCurrentGuide(prev => {
      const updatedSteps = [...prev.steps];
      updatedSteps[prev.currentStepIndex] = {
        ...updatedSteps[prev.currentStepIndex],
        isCompleted: true
      };
      
      const isLastStep = prev.currentStepIndex === prev.steps.length - 1;
      
      const updatedGuide = {
        ...prev,
        steps: updatedSteps,
        completed: isLastStep && updatedSteps.every(step => step.isCompleted)
      };
      
      // Save progress to localStorage
      localStorage.setItem(`guide-${prev.id}`, JSON.stringify(updatedGuide));
      
      return updatedGuide;
    });
  };

  // Reset the current guide
  const resetGuide = () => {
    if (!currentGuide.id) {
      return;
    }
    
    localStorage.removeItem(`guide-${currentGuide.id}`);
    loadGuide(currentGuide.id);
  };

  // Get the current step
  const getCurrentStep = (): Step | null => {
    if (!currentGuide || currentGuide.steps.length === 0) {
      return null;
    }
    
    return currentGuide.steps[currentGuide.currentStepIndex];
  };

  return {
    currentGuide,
    isLoading,
    error,
    loadGuide,
    nextStep,
    prevStep,
    completeCurrentStep,
    resetGuide,
    getCurrentStep
  };
} 