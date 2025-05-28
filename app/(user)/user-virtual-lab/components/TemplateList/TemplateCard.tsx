"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HardDrive, Cpu, Clock, Play, BarChart } from "lucide-react";
import { getDifficultyColor } from "../../utils";
import { motion } from "framer-motion";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    difficulty: string;
    imageUrl: string;
    os: string;
    specs: {
      cpu: string;
      ram: string;
      storage: string;
    };
    deploymentTime: string;
    popular?: boolean;
  };
  onDeploy: (templateId: string) => void;
}

export function TemplateCard({ template, onDeploy }: TemplateCardProps) {
  const difficultyColors = getDifficultyColor(template.difficulty);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border group relative">
      {template.popular && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-blue-100 text-blue-800 rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md">
            Popular
          </Badge>
        </div>
      )}
      
      <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {template.imageUrl ? (
            <img 
              src={template.imageUrl} 
              alt={template.name} 
              className="max-h-24 max-w-full object-contain"
            />
          ) : (
            <div className="rounded-full bg-slate-700 p-6">
              <HardDrive className="h-8 w-8 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <div className="flex justify-between items-start mb-1">
          <Badge className={difficultyColors.badge}>
            {template.difficulty}
          </Badge>
          <Badge variant="outline" className="border-slate-200">
            {template.os}
          </Badge>
        </div>
        <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
          {template.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">
          {template.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="py-0">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center p-2 rounded-md bg-slate-50">
            <Cpu className="h-3.5 w-3.5 text-slate-600 mb-1" />
            <span className="text-center">{template.specs.cpu}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-slate-50">
            <BarChart className="h-3.5 w-3.5 text-slate-600 mb-1" />
            <span className="text-center">{template.specs.ram}</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-slate-50">
            <HardDrive className="h-3.5 w-3.5 text-slate-600 mb-1" />
            <span className="text-center">{template.specs.storage}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 pb-3 flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Ready in ~{template.deploymentTime}</span>
        </div>
        <Button 
          onClick={() => onDeploy(template.id)}
          size="sm"
          className="gap-1"
          aria-label={`Deploy ${template.name} template`}
        >
          <Play className="h-3.5 w-3.5" />
          <span>Deploy</span>
        </Button>
      </CardFooter>
      
      {/* Screen reader text */}
      <span className="sr-only">
        Template {template.name}, {template.description}.
        Difficulty: {template.difficulty}, OS: {template.os}.
        Specifications: {template.specs.cpu} CPU, {template.specs.ram} RAM, {template.specs.storage} Storage.
        Ready in approximately {template.deploymentTime}.
      </span>
    </Card>
  );
} 