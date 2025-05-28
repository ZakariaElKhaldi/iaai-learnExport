import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Database, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeOverlayProps {
  onStartClick: () => void;
  onPracticeModeClick: () => void;
}

export function WelcomeOverlay({ onStartClick, onPracticeModeClick }: WelcomeOverlayProps) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-white/98 z-50 p-4"
    >
      <Card className="max-w-md w-full shadow-lg border-0">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-50 mb-2">
              <BrainCircuit className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Welcome to AI Lab</CardTitle>
            <CardDescription className="text-sm">Your personal AI experimentation space</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <p className="text-sm text-center text-muted-foreground">
            Build, train, and deploy AI models without writing code
          </p>
          
          <div className="grid gap-3">
            <div className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <Database className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium">Start with data</h3>
                <p className="text-xs text-muted-foreground">Import or select datasets</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <Brain className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium">Train models</h3>
                <p className="text-xs text-muted-foreground">Build and train AI with no code</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <Zap className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium">Deploy anywhere</h3>
                <p className="text-xs text-muted-foreground">Share your AI solutions</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 pt-2">
          <Button 
            onClick={onPracticeModeClick}
            variant="outline"
            className="flex-1"
          >
            Try Practice Mode
          </Button>
          <Button 
            onClick={onStartClick}
            className="flex-1"
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 