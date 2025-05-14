"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LearningHubHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundImage?: string;
  onSearch?: (query: string) => void;
}

const LearningHubHero: React.FC<LearningHubHeroProps> = ({
  title = "Master New Skills with Free Tutorials",
  subtitle = "Explore our comprehensive library of tutorials, examples, and resources to enhance your knowledge and skills.",
  ctaText = "Start Learning",
  ctaUrl = "/learn",
  backgroundImage = "/images/learning-hub-bg.jpg",
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {backgroundImage && (
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}
      <div className="container relative z-10 mx-auto px-4 py-20 sm:py-28 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="flex items-center max-w-2xl mx-auto mb-10 bg-white/10 p-1.5 rounded-full backdrop-blur-sm"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input 
                type="search"
                placeholder="Search tutorials, examples, or topics..." 
                className="w-full bg-transparent border-none pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus-visible:ring-offset-0 focus-visible:ring-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-8"
            >
              Search
            </Button>
          </form>
          
          <div className="flex justify-center flex-wrap gap-3 mt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-semibold rounded-full px-8"
              asChild
            >
              <a href={ctaUrl}>{ctaText}</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 font-semibold rounded-full px-8"
              asChild
            >
              <a href="/learn/examples">Browse Examples</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default LearningHubHero; 