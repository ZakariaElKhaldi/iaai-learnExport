"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILabHeader } from "./components/AILabHeader";
import { WelcomeOverlay } from "./components/WelcomeOverlay";
import { PracticeModeOverlay } from "./components/PracticeModeOverlay";
import { DatasetsTab } from "./components/DatasetsTab";
import { ModelsTab } from "./components/ModelsTab";
import { TrainingTab } from "./components/TrainingTab";
import { DeploymentsTab } from "./components/DeploymentsTab";
import { 
  Database, Brain, Zap, Globe
} from "lucide-react";

// Mock data imports
import { datasets } from "./data/datasets";
import { modelTemplates } from "./data/modelTemplates";
import { userProjects } from "./data/userProjects";
import { trainingJobs } from "./data/trainingJobs";
import { deployments } from "./data/deployments";

// Main AI Lab Page Component
export default function AILabPage() {
  const [activeTab, setActiveTab] = useState<string>("datasets");
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  
  return (
    <div className="flex flex-col min-h-dvh bg-white relative">
      {showWelcomeScreen && (
        <WelcomeOverlay 
          onStartClick={() => setShowWelcomeScreen(false)}
          onPracticeModeClick={() => {
            setShowPracticeMode(true);
            setShowWelcomeScreen(false);
          }}
        />
      )}
      
      {showPracticeMode && (
        <PracticeModeOverlay 
          onExitClick={() => setShowPracticeMode(false)}
        />
      )}
      
      <AILabHeader 
        onPracticeModeClick={() => setShowPracticeMode(true)}
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b bg-white">
            <div className="max-w-screen-xl mx-auto px-6">
              <TabsList className="h-10 bg-transparent border-b-0 p-0 rounded-none w-full justify-start overflow-x-auto">
                <TabsTrigger 
                  value="datasets" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-sm"
                >
                  <Database className="h-4 w-4 mr-2" />
                  <span>Datasets</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="models" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-sm"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  <span>Models</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-sm"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  <span>Training</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="deployments" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-10 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-sm"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span>Deployments</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {/* Tab content */}
          <TabsContent value="datasets" className="mt-0 h-full">
            <div className="bg-white h-full">
              <DatasetsTab datasets={datasets} />
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="mt-0 h-full">
            <div className="bg-white h-full">
              <ModelsTab templates={modelTemplates} userProjects={userProjects} />
            </div>
          </TabsContent>
          
          <TabsContent value="training" className="mt-0 h-full">
            <div className="bg-white h-full">
              <TrainingTab trainingJobs={trainingJobs} />
            </div>
          </TabsContent>
          
          <TabsContent value="deployments" className="mt-0 h-full">
            <div className="bg-white h-full">
              <DeploymentsTab deployments={deployments} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 