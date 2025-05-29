"use client";

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid2x2, 
  List, 
  Upload, 
  MoreVertical, 
  Image, 
  FileText, 
  Video, 
  File, 
  Trash2, 
  Download, 
  Edit,
  Link as LinkIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type MediaType = 'image' | 'video' | 'document' | 'other';

interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  fileSize: string;
  dimensions?: string;
  uploadDate: string;
  category?: string;
}

interface MediaLibraryGridProps {
  items: MediaItem[];
  isLoading?: boolean;
  onUpload?: () => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
  onCopyLink?: (id: string) => void;
}

export function MediaLibraryGrid({
  items,
  isLoading = false,
  onUpload,
  onDelete,
  onEdit,
  onDownload,
  onCopyLink
}: MediaLibraryGridProps) {
  // State for view mode, filters, and selection
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('date');
  
  // Get unique categories from items
  const categories = ['all', ...Array.from(new Set(items.filter(item => item.category).map(item => item.category as string)))];
  
  // Filter and sort items
  const filteredItems = items.filter(item => {
    // Apply search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter !== 'all' && item.type !== typeFilter) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        // This is a simplification - in reality you'd parse the file size properly
        return a.fileSize.localeCompare(b.fileSize);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'date':
      default:
        // Assuming uploadDate is in a format that can be compared
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });
  
  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };
  
  // Helper to get icon for media type
  const getMediaTypeIcon = (type: MediaType) => {
    switch(type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };
  
  // Render loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Skeleton className="h-10 w-full sm:w-64" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="w-full aspect-square" />
              <div className="p-2">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Filters and actions row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Upload Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-9 px-3 rounded-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-9 px-3 rounded-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {onUpload && (
            <Button className="gap-1 ml-auto" onClick={onUpload}>
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Selection actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between p-2 bg-muted/20 rounded-md border">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedItems.length === filteredItems.length} 
              onCheckedChange={toggleSelectAll}
              id="select-all"
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              {selectedItems.length} selected
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            {onDownload && (
              <Button variant="outline" size="sm" onClick={() => onDownload(selectedItems[0])}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(selectedItems)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden group">
              <div className="relative">
                {/* Thumbnail */}
                <div className="aspect-square bg-slate-100 relative">
                  {item.thumbnailUrl ? (
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getMediaTypeIcon(item.type)}
                    </div>
                  )}
                  
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2">
                    <Checkbox 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                      className="bg-white/90 border-slate-300"
                    />
                  </div>
                  
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {onEdit && (
                      <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => onEdit(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDownload && (
                      <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => onDownload(item.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {onCopyLink && (
                      <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => onCopyLink(item.id)}>
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* File info */}
                <div className="p-2">
                  <div className="flex items-start justify-between">
                    <div className="truncate pr-2">
                      <div className="text-sm font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>{item.fileSize}</span>
                        {item.dimensions && (
                          <>
                            <span>•</span>
                            <span>{item.dimensions}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        )}
                        {onDownload && (
                          <DropdownMenuItem onClick={() => onDownload(item.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                        )}
                        {onCopyLink && (
                          <DropdownMenuItem onClick={() => onCopyLink(item.id)}>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            <span>Copy Link</span>
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => onDelete([item.id])}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* List view */}
      {viewMode === 'list' && (
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left">
                  <Checkbox 
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0} 
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">File</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dimensions</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Uploaded</th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Checkbox 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded flex items-center justify-center mr-3">
                        {item.thumbnailUrl ? (
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          getMediaTypeIcon(item.type)
                        )}
                      </div>
                      <div className="text-sm font-medium">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Badge variant="outline" className="capitalize">{item.type}</Badge>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm">{item.fileSize}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm">{item.dimensions || '-'}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm">{item.uploadDate}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1">
                      {onEdit && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(item.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDownload && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDownload(item.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {onCopyLink && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCopyLink(item.id)}>
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => onDelete([item.id])}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Filter className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No media found</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setTypeFilter('all');
                      setCategoryFilter('all');
                      setSearchQuery('');
                    }}>
                      Clear filters
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Empty state */}
      {filteredItems.length === 0 && viewMode === 'grid' && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No media found</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button variant="outline" onClick={() => {
            setTypeFilter('all');
            setCategoryFilter('all');
            setSearchQuery('');
          }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
} 