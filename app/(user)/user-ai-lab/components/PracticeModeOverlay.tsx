import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Brain, Play, MessageSquare, BarChart3, LineChart, StopCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface PracticeModeOverlayProps {
  onExitClick: () => void;
}

export function PracticeModeOverlay({ onExitClick }: PracticeModeOverlayProps) {
  // Training configuration state
  const [selectedDataset, setSelectedDataset] = useState("mnist");
  const [selectedModel, setSelectedModel] = useState("cnn");
  const [epochs, setEpochs] = useState("10");
  const [batchSize, setBatchSize] = useState("32");
  const [learningRate, setLearningRate] = useState("0.001");
  
  // Training state
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingMetrics, setTrainingMetrics] = useState<Array<{epoch: number, accuracy: number, loss: number}>>([]);
  const [trainingComplete, setTrainingComplete] = useState(false);
  
  // Handle training button click
  const handleStartTraining = () => {
    if (isTraining) return; // Prevent multiple starts
    
    // Reset state
    setProgress(0);
    setCurrentEpoch(0);
    setTrainingMetrics([]);
    setTrainingComplete(false);
    setIsTraining(true);
  };
  
  // Handle stop training
  const handleStopTraining = () => {
    setIsTraining(false);
  };
  
  // Handle reset
  const handleReset = () => {
    setIsTraining(false);
    setProgress(0);
    setCurrentEpoch(0);
    setTrainingMetrics([]);
    setTrainingComplete(false);
  };
  
  // Simulate training progress
  useEffect(() => {
    if (!isTraining) return;
    
    const totalEpochs = parseInt(epochs, 10);
    const interval = setInterval(() => {
      setCurrentEpoch(prevEpoch => {
        const nextEpoch = prevEpoch + 1;
        
        // Generate random metrics for this epoch
        const baseAccuracy = selectedModel === "cnn" ? 0.85 : 0.75;
        const accuracy = Math.min(baseAccuracy + (nextEpoch / totalEpochs) * 0.1 + Math.random() * 0.02, 0.99);
        const loss = Math.max(0.6 - (nextEpoch / totalEpochs) * 0.5 - Math.random() * 0.05, 0.05);
        
        setTrainingMetrics(prev => [
          ...prev, 
          { epoch: nextEpoch, accuracy, loss }
        ]);
        
        // Update overall progress
        const newProgress = (nextEpoch / totalEpochs) * 100;
        setProgress(newProgress);
        
        // Check if training is complete
        if (nextEpoch >= totalEpochs) {
          setIsTraining(false);
          setTrainingComplete(true);
          clearInterval(interval);
        }
        
        return nextEpoch;
      });
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [isTraining, epochs, selectedModel]);
  
  // Generate chart SVG based on training metrics
  const generateChart = () => {
    if (trainingMetrics.length === 0) return null;
    
    const width = 300;
    const height = 150;
    const padding = 30;
    
    const maxEpoch = parseInt(epochs, 10);
    
    // Scale functions
    const xScale = (epoch: number) => (epoch / maxEpoch) * (width - padding * 2) + padding;
    const yScaleAccuracy = (value: number) => height - (value * (height - padding * 2) + padding);
    const yScaleLoss = (value: number) => height - ((value / 1) * (height - padding * 2) + padding);
    
    // Generate paths
    const accuracyPath = trainingMetrics.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(point.epoch)} ${yScaleAccuracy(point.accuracy)}`
    ).join(' ');
    
    const lossPath = trainingMetrics.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(point.epoch)} ${yScaleLoss(point.loss)}`
    ).join(' ');
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mt-2">
        {/* X and Y axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ddd" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ddd" />
        
        {/* Accuracy path */}
        <path d={accuracyPath} fill="none" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Loss path */}
        <path d={lossPath} fill="none" stroke="#ef4444" strokeWidth="2" />
        
        {/* Legend */}
        <circle cx={width - 100} cy={20} r="4" fill="#3b82f6" />
        <text x={width - 90} y={24} fontSize="10" fill="#666">Accuracy</text>
        
        <circle cx={width - 100} cy={40} r="4" fill="#ef4444" />
        <text x={width - 90} y={44} fontSize="10" fill="#666">Loss</text>
        
        {/* X-axis label */}
        <text x={width / 2} y={height - 5} fontSize="10" textAnchor="middle" fill="#666">Epochs</text>
      </svg>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-white/98 z-50 p-4"
    >
      <Card className="max-w-4xl w-full shadow-lg border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-50">
                <BrainCircuit className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Practice Mode</CardTitle>
                <CardDescription className="text-sm">Learn AI concepts without using your credits</CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onExitClick}
            >
              Exit Practice
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Tabs defaultValue="image" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="image">Image Classification</TabsTrigger>
              <TabsTrigger value="text">Text Analysis</TabsTrigger>
              <TabsTrigger value="prediction">Prediction</TabsTrigger>
            </TabsList>
            
            <TabsContent value="image" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium mb-2">1. Select sample dataset</h3>
                    <Select value={selectedDataset} onValueChange={setSelectedDataset} disabled={isTraining}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dataset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mnist">MNIST Handwritten Digits</SelectItem>
                        <SelectItem value="cifar10">CIFAR-10 Images</SelectItem>
                        <SelectItem value="fashion">Fashion MNIST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium mb-2">2. Choose model architecture</h3>
                    <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isTraining}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnn">Convolutional Neural Network</SelectItem>
                        <SelectItem value="mobilenet">MobileNet (Transfer Learning)</SelectItem>
                        <SelectItem value="resnet">ResNet-18 (Transfer Learning)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-slate-50">
                    <h3 className="font-medium mb-2">3. Configure training</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Epochs</label>
                          <Input 
                            type="number" 
                            value={epochs}
                            onChange={(e) => setEpochs(e.target.value)}
                            className="h-8" 
                            disabled={isTraining}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Batch Size</label>
                          <Input 
                            type="number" 
                            value={batchSize}
                            onChange={(e) => setBatchSize(e.target.value)}
                            className="h-8" 
                            disabled={isTraining}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Learning Rate</label>
                        <Select value={learningRate} onValueChange={setLearningRate} disabled={isTraining}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Learning rate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.01">0.01 (Faster learning)</SelectItem>
                            <SelectItem value="0.001">0.001 (Recommended)</SelectItem>
                            <SelectItem value="0.0001">0.0001 (Slower learning)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {!isTraining && !trainingComplete ? (
                    <Button 
                      className="w-full" 
                      onClick={handleStartTraining}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Training
                    </Button>
                  ) : isTraining ? (
                    <Button 
                      className="w-full" 
                      variant="destructive"
                      onClick={handleStopTraining}
                    >
                      <StopCircle className="mr-2 h-4 w-4" />
                      Stop Training
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset & Train Again
                    </Button>
                  )}
                </div>
                
                <div className="border rounded-lg flex flex-col">
                  <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                    <h3 className="font-medium">Training Visualization</h3>
                    <Badge variant="outline">Practice Mode</Badge>
                  </div>
                  <div className="flex-1 p-6 flex items-center justify-center bg-slate-100/50">
                    {!isTraining && trainingMetrics.length === 0 ? (
                      <div className="text-center">
                        <Brain className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Select dataset and model, then start training</p>
                        <p className="text-xs text-muted-foreground">Visualizations will appear here</p>
                      </div>
                    ) : (
                      <div className="w-full">
                        {/* Training progress */}
                        <div className="mb-4 w-full">
                          <div className="flex justify-between mb-1 text-sm">
                            <div>
                              <span className="font-medium">
                                {isTraining ? 'Training in progress' : 'Training complete'}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Epoch {currentEpoch}/{epochs}</span>
                            </div>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        {/* Training metrics */}
                        {trainingMetrics.length > 0 && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Training Metrics</h4>
                              
                              {/* Training charts */}
                              <div className="flex justify-center">
                                {generateChart()}
                              </div>
                              
                              {/* Latest metrics */}
                              {trainingMetrics.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                  <div className="p-3 bg-blue-50 rounded-md">
                                    <p className="text-xs text-muted-foreground">Current Accuracy</p>
                                    <p className="text-xl font-bold text-blue-700">
                                      {(trainingMetrics[trainingMetrics.length - 1].accuracy * 100).toFixed(2)}%
                                    </p>
                                  </div>
                                  <div className="p-3 bg-red-50 rounded-md">
                                    <p className="text-xs text-muted-foreground">Current Loss</p>
                                    <p className="text-xl font-bold text-red-700">
                                      {trainingMetrics[trainingMetrics.length - 1].loss.toFixed(4)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {trainingComplete && (
                              <div className="p-3 bg-green-50 rounded-md">
                                <h4 className="text-sm font-medium text-green-700 mb-1">Training Complete</h4>
                                <p className="text-xs text-muted-foreground">
                                  Model trained successfully with final accuracy of{' '}
                                  <span className="font-medium">
                                    {(trainingMetrics[trainingMetrics.length - 1].accuracy * 100).toFixed(2)}%
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4 mt-0">
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium mb-1">Text Analysis Practice</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Learn how to train models for sentiment analysis, text classification, and more
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="prediction" className="space-y-4 mt-0">
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium mb-1">Prediction Models Practice</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Learn how to build regression models for numeric predictions
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
} 