import { Button } from "@/components/ui/button";
import { BrainCircuit, Plus, Sparkles } from "lucide-react";

interface AILabHeaderProps {
  onPracticeModeClick: () => void;
}

export function AILabHeader({ onPracticeModeClick }: AILabHeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <BrainCircuit className="h-5 w-5 text-blue-600" />
        <h1 className="text-lg font-medium">AI Lab</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          size="sm" 
          variant="outline" 
          className="text-xs"
          onClick={onPracticeModeClick}
        >
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Practice Mode
        </Button>
        <Button size="sm" className="gap-1 text-xs">
          <Plus className="h-3.5 w-3.5" />
          New Project
        </Button>
      </div>
    </header>
  );
} 