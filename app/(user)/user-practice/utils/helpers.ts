// Helper function for difficulty colors
export const getDifficultyColor = (difficulty: string) => {
  switch(difficulty?.toLowerCase()) {
    case 'easy': return {
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      progress: 'bg-blue-500'
    };
    case 'medium': return {
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      text: 'text-blue-700',
      border: 'border-blue-600',
      bg: 'bg-blue-50',
      progress: 'bg-blue-600'
    };
    case 'hard': return {
      badge: 'bg-blue-200 text-blue-900 border-blue-300',
      text: 'text-blue-800',
      border: 'border-blue-700',
      bg: 'bg-blue-50',
      progress: 'bg-blue-700'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
      text: 'text-slate-600',
      border: 'border-slate-500',
      bg: 'bg-slate-50',
      progress: 'bg-slate-500'
    };
  }
};

// Format date utility
export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time utility (for tracking time spent on problems)
export const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
};

// Calculate completion percentage
export const calculateCompletionPercentage = (completed: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}; 