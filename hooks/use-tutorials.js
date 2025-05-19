"use client";

import { useState, useEffect } from 'react';

export function useTutorials(category = null, limit = 10) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    hasMore: false,
    skip: 0,
    limit: limit
  });

  useEffect(() => {
    async function fetchTutorials() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        params.append('limit', String(pagination.limit));
        params.append('skip', String(pagination.skip));
        
        const response = await fetch(`/api/tutorials?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tutorials');
        }
        
        const data = await response.json();
        setTutorials(data.tutorials);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTutorials();
  }, [category, pagination.skip, pagination.limit]);

  const loadMore = () => {
    if (pagination.hasMore) {
      setPagination(prev => ({
        ...prev,
        skip: prev.skip + prev.limit
      }));
    }
  };

  // Map database tutorial objects to the format expected by the UI
  const mappedTutorials = tutorials.map(tutorial => ({
    id: tutorial.id,
    name: tutorial.title,
    icon: getIconForCategory(tutorial.metadata.category),
    description: tutorial.summary || tutorial.metadata.description,
    level: tutorial.metadata.difficulty.toLowerCase(),
    popular: tutorial.metadata.difficulty === 'Beginner', // Mark beginner tutorials as popular
    slug: tutorial.slug
  }));

  return {
    tutorials: mappedTutorials,
    loading,
    error,
    pagination,
    loadMore,
  };
}

// Helper function to map category to an icon component name
function getIconForCategory(category) {
  const categoryIconMap = {
    'HTML': 'Code',
    'CSS': 'PenTool',
    'JavaScript': 'Code',
    'Python': 'Code',
    'SQL': 'Database',
    'PHP': 'Code',
    'React': 'Layers',
    'Angular': 'Layers',
    'Vue': 'Layers',
    'Node.js': 'Server',
    'Express': 'Server',
    'MongoDB': 'Database',
    'Data Science': 'LineChart',
    'Machine Learning': 'BookOpen',
    // Add more mappings as needed
  };
  
  return categoryIconMap[category] || 'Code'; // Default to 'Code' icon
}

export function useTutorial(slug) {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    async function fetchTutorial() {
      try {
        setLoading(true);
        const response = await fetch(`/api/tutorials/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Tutorial not found');
          }
          throw new Error('Failed to fetch tutorial');
        }
        
        const data = await response.json();
        setTutorial(data.tutorial);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTutorial();
  }, [slug]);

  // Map database tutorial to the format expected by the UI
  const mappedTutorial = tutorial ? {
    title: tutorial.title,
    description: tutorial.summary || tutorial.metadata.description,
    introduction: tutorial.content_sections[0]?.content || '',
    color: getCategoryColor(tutorial.metadata.category),
    chapters: tutorial.content_sections.map((section, index) => ({
      id: `section-${index}`,
      title: section.title,
      path: `/learn/${tutorial.slug}/${section.title.toLowerCase().replace(/\s+/g, '-')}`
    })),
    exercises: tutorial.practice_exercises?.map((exercise, index) => ({
      id: `ex${index + 1}`,
      question: exercise.description,
      startingCode: exercise.starter_code,
      solution: exercise.solution,
      hint: "Try looking at the examples from the tutorial."
    })) || [],
    example: tutorial.content_sections.find(s => s.code)?.code || '',
    content: tutorial.content_sections.map(s => s.content).join('\n\n')
  } : null;

  return {
    tutorial: mappedTutorial,
    loading,
    error
  };
}

// Helper function to get color for category
function getCategoryColor(category) {
  const categoryColorMap = {
    'HTML': '#E44D26',
    'CSS': '#264de4',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'SQL': '#4479A1',
    'PHP': '#777BB4',
    'React': '#61DAFB',
    'Angular': '#DD0031',
    'Vue': '#4FC08D',
    'Node.js': '#339933',
    'Express': '#000000',
    'MongoDB': '#47A248',
    'Data Science': '#4CAF50',
    'Machine Learning': '#9C27B0',
    // Add more mappings as needed
  };
  
  return categoryColorMap[category] || '#333333'; // Default color
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Map database categories to the format expected by the UI
  const mappedCategories = categories.map(cat => ({
    id: cat.category.toLowerCase().replace(/\s+/g, '-'),
    name: cat.category,
    color: getCategoryColor(cat.category),
    tutorials: cat.courses.map(course => ({
      id: course.id,
      name: course.title,
      icon: getIconForCategory(course.category),
      description: course.title,
      level: course.difficulty.toLowerCase(),
      popular: course.difficulty === 'Beginner'
    }))
  }));

  return {
    categories: mappedCategories,
    loading,
    error
  };
}