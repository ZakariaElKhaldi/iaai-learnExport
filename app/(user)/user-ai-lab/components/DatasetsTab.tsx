import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DatasetCard } from "./DatasetCard";
import { Database, Search, ListFilter, Plus, Eye, ArrowRight, BookMarked } from "lucide-react";

interface Dataset {
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
  thumbnailUrl?: string;
}

interface DatasetsTabProps {
  datasets: Dataset[];
}

export function DatasetsTab({ datasets }: DatasetsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ["All", "Image Classification", "Regression", "Text Classification", "Time Series"];
  
  // Filter datasets based on search and category
  const filteredDatasets = datasets.filter((dataset: Dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dataset.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
  const handlePreviewDataset = (id: string) => {
    console.log(`Preview dataset: ${id}`);
    // Implementation for previewing dataset
  };
  
  const handleOpenDataset = (id: string) => {
    console.log(`Open dataset: ${id}`);
    // Implementation for opening dataset
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Quick action banner */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to train your AI model?</h3>
              <p className="text-sm text-muted-foreground">Import a dataset or use one from our library to get started.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2" size="sm">
                <Database className="h-4 w-4" />
                <span>Import Dataset</span>
              </Button>
              <Button variant="outline" className="gap-2" size="sm">
                <Plus className="h-4 w-4" />
                <span>Browse Library</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Header with search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Your Datasets</h2>
            <p className="text-muted-foreground">Training data for your AI models</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Search with expandable filters */}
            <div className="relative flex-grow max-w-md">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search datasets..."
                    className="pl-9 pr-20 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <ListFilter className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:inline-block">Filters</span>
                  </Button>
                </div>
                
                {/* View mode toggle */}
                <div className="flex ml-2 border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-9 px-3 rounded-none"
                    onClick={() => setViewMode('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-9 px-3 rounded-none"
                    onClick={() => setViewMode('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
              
              {/* Expandable filters */}
              {showFilters && (
                <div className="absolute z-10 mt-2 p-4 bg-white shadow-md rounded-md border w-full">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Dataset Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={category === selectedCategory ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="h-8 text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Dataset display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredDatasets.map((dataset) => (
              <DatasetCard 
                key={dataset.id} 
                dataset={dataset} 
                onPreview={handlePreviewDataset}
                onOpen={handleOpenDataset}
              />
            ))}
            
            {/* Create new dataset card */}
            <Card className="border-dashed border-2 flex items-center justify-center h-[250px] cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="text-center p-6">
                <div className="mx-auto rounded-full bg-blue-50 p-3 w-fit mb-4">
                  <Database className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">Upload New Dataset</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your own dataset or connect to external sources
                </p>
                <Button>Upload Dataset</Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Samples</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Accessed</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{dataset.name}</div>
                        {dataset.favorite && <BookMarked className="h-4 w-4 text-amber-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge>{dataset.type}</Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm">{dataset.size}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm">{dataset.samples.toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm">{dataset.lastAccessed}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handlePreviewDataset(dataset.id)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-blue-600"
                        onClick={() => handleOpenDataset(dataset.id)}
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Open</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="px-4 py-6">
                    <div className="flex items-center justify-center">
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Upload New Dataset</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 