import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BookMarked, 
  Clock, 
  Database, 
  Eye, 
  FileBarChart, 
  Layers, 
  Table2 
} from "lucide-react";

interface DatasetCardProps {
  dataset: {
    id: string;
    name: string;
    description: string;
    type: string;
    size: string;
    format: string;
    samples: number;
    features: number | string;
    lastAccessed: string;
    favorite: boolean;
  };
  onPreview: (id: string) => void;
  onOpen: (id: string) => void;
}

export function DatasetCard({ dataset, onPreview, onOpen }: DatasetCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge>{dataset.type}</Badge>
          {dataset.favorite && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
              <BookMarked className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardTitle className="mt-1">{dataset.name}</CardTitle>
        <CardDescription className="line-clamp-2">{dataset.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span>{dataset.size}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
            <span>{dataset.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            <span>{dataset.samples.toLocaleString()} samples</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span>{dataset.features} features</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground border-t">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{dataset.lastAccessed}</span>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onPreview(dataset.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            <span>Preview</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-blue-600"
            onClick={() => onOpen(dataset.id)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 