import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock } from "lucide-react";

interface ModelTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: string;
  environment: string;
  lastUsed: string;
  popularity: number;
  tags: string[];
}

interface ModelCardProps {
  template: ModelTemplate;
  onUseTemplate: (id: string) => void;
}

export function ModelCard({ template, onUseTemplate }: ModelCardProps) {
  // Function to get badge color based on complexity
  const getComplexityColor = (complexity: string) => {
    switch(complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="pb-2 relative">
        {template.popularity > 90 && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-100 text-amber-800">Popular</Badge>
          </div>
        )}
        <Badge className={getComplexityColor(template.complexity)}>
          {template.complexity}
        </Badge>
        <CardTitle className="mt-1">{template.name}</CardTitle>
        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-sm mb-3">
          <Badge variant="outline">{template.category}</Badge>
          <Badge variant="outline">{template.environment}</Badge>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {template.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between items-center mb-1">
            <span>Popularity</span>
            <span className="font-medium">{template.popularity}%</span>
          </div>
          <Progress value={template.popularity} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground border-t">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>Used {template.lastUsed}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-blue-600"
          onClick={() => onUseTemplate(template.id)}
        >
          <span>Use Template</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
} 