import { useState, useEffect } from 'react';

type LearningProgress = {
  completedTutorials: string[];
  lastVisited: string | null;
  favoriteTopics: string[];
  streakDays: number;
  lastActive: string | null;
}

const DEFAULT_PROGRESS: LearningProgress = {
  completedTutorials: [],
  lastVisited: null,
  favoriteTopics: [],
  streakDays: 0,
  lastActive: null
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const loadProgress = () => {
      try {
        const savedProgress = localStorage.getItem('learning-progress');
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setProgress(parsedProgress);
        }
      } catch (error) {
        console.error('Failed to load learning progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('learning-progress', JSON.stringify(progress));
    }
  }, [progress, isLoading]);

  // Mark a tutorial as completed
  const markTutorialCompleted = (tutorialId: string) => {
    setProgress(prev => {
      if (prev.completedTutorials.includes(tutorialId)) {
        return prev;
      }
      return {
        ...prev,
        completedTutorials: [...prev.completedTutorials, tutorialId]
      };
    });
  };

  // Set last visited tutorial
  const setLastVisited = (tutorialId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProgress(prev => {
      // Check if this is a new day for streak calculation
      const isNewDay = prev.lastActive !== today;
      
      return {
        ...prev,
        lastVisited: tutorialId,
        lastActive: today,
        // Increment streak if it's a new day
        streakDays: isNewDay ? prev.streakDays + 1 : prev.streakDays
      };
    });
  };

  // Toggle favorite status of a topic
  const toggleFavoriteTopic = (topicId: string) => {
    setProgress(prev => {
      const isFavorite = prev.favoriteTopics.includes(topicId);
      return {
        ...prev,
        favoriteTopics: isFavorite 
          ? prev.favoriteTopics.filter(id => id !== topicId)
          : [...prev.favoriteTopics, topicId]
      };
    });
  };

  // Reset progress
  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  // Check if a tutorial is completed
  const isTutorialCompleted = (tutorialId: string) => {
    return progress.completedTutorials.includes(tutorialId);
  };

  // Check if a topic is favorite
  const isTopicFavorite = (topicId: string) => {
    return progress.favoriteTopics.includes(topicId);
  };

  // Get completion percentage
  const getCompletionPercentage = (totalTutorials: number) => {
    if (totalTutorials === 0) return 0;
    return Math.round((progress.completedTutorials.length / totalTutorials) * 100);
  };

  return {
    progress,
    isLoading,
    markTutorialCompleted,
    setLastVisited,
    toggleFavoriteTopic,
    resetProgress,
    isTutorialCompleted,
    isTopicFavorite,
    getCompletionPercentage
  };
} 