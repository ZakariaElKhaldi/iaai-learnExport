// Helper function for VM status colors
export const getStatusColor = (status: string) => {
  switch(status) {
    case "running": return "bg-green-100 text-green-800";
    case "stopped": return "bg-slate-100 text-slate-800";
    case "paused": return "bg-amber-100 text-amber-800";
    case "provisioning": return "bg-blue-100 text-blue-800";
    case "error": return "bg-red-100 text-red-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

// Helper function for difficulty colors
export const getDifficultyColor = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'beginner': return {
      badge: 'bg-green-100 text-green-800',
      text: 'text-green-600',
      border: 'border-green-500'
    };
    case 'intermediate': return {
      badge: 'bg-blue-100 text-blue-800',
      text: 'text-blue-600',
      border: 'border-blue-500'
    };
    case 'advanced': return {
      badge: 'bg-purple-100 text-purple-800',
      text: 'text-purple-600',
      border: 'border-purple-500'
    };
    default: return {
      badge: 'bg-slate-100 text-slate-800',
      text: 'text-slate-600',
      border: 'border-slate-500'
    };
  }
};

// Format date
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Format uptime for display
export const formatUptime = (uptime: string) => {
  return uptime || "0";
};

// Get resource status color
export const getResourceStatusColor = (percentage: number) => {
  if (percentage > 80) return "text-red-600";
  if (percentage > 60) return "text-amber-600";
  return "text-green-600";
}; 