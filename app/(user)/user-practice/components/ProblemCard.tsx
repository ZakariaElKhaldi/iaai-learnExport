"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, Users } from "lucide-react";
import { getDifficultyColor } from "../utils/helpers";

interface ProblemCardProps {
  problem: any;
  onClick: () => void;
  isActive: boolean;
}

export function ProblemCard({ problem, onClick, isActive }: ProblemCardProps) {
  const diffColors = getDifficultyColor(problem.difficulty);
  
  return (
    <div 
      className={cn(
        "flex flex-col gap-2 p-4 border rounded-lg transition-all cursor-pointer hover:border-blue-400 hover:shadow-sm",
        isActive ? "ring-1 ring-blue-500 bg-blue-50" : "bg-white"
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
          e.preventDefault();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-slate-900 text-base">{problem.title}</h3>
        {problem.isBookmarked && (
          <svg className="h-4 w-4 text-amber-500 fill-amber-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        )}
      </div>
      
      <div className="flex items-center flex-wrap gap-2">
        <Badge className={diffColors.badge}>
          {problem.difficulty}
        </Badge>
        
        {problem.isPremium && (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
            Premium
          </Badge>
        )}
        
        {problem.isFeatured && (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-800 border-indigo-200">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="text-xs text-slate-600 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" title="Number of users who solved this problem">
            <Users className="h-3.5 w-3.5" />
            <span>{problem.completedBy?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title="Acceptance rate">
            <Check className="h-3.5 w-3.5" />
            <span>{problem.acceptance}%</span>
          </div>
        </div>
        
        {problem.completed && (
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-none">
            Completed
          </Badge>
        )}
      </div>
      
      {problem.started && !problem.completed && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>In Progress</span>
            <span>{problem.progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full" 
              style={{ width: `${problem.progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
} 