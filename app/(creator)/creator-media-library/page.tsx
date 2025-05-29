"use client";

import { useState } from 'react';
import { 
  Upload, 
  Image, 
  Video, 
  FileText,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaLibraryGrid } from '@/components/creator/MediaLibraryGrid';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MediaItem, UserData } from '@/types';

// Mock media data
const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'course-thumbnail.jpg',
    type: 'image',
    url: '/placeholders/media/image-1.jpg',
    thumbnailUrl: '/placeholders/media/image-1.jpg',
    fileSize: '2.4 MB',
    dimensions: '1920x1080',
    uploadDate: '2 days ago',
    category: 'Thumbnails',
  },
  {
    id: '2',
    name: 'intro-video.mp4',
    type: 'video',
    url: '/placeholders/media/video-1.mp4',
    thumbnailUrl: '/placeholders/media/video-1.jpg',
    fileSize: '24.8 MB',
    dimensions: '1920x1080',
    uploadDate: '1 week ago',
    category: 'Course Videos',
  },
  {
    id: '3',
    name: 'react-cheatsheet.pdf',
    type: 'document',
    url: '/placeholders/media/document-1.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2 weeks ago',
    category: 'Resources',
  },
  {
    id: '4',
    name: 'javascript-basics.jpg',
    type: 'image',
    url: '/placeholders/media/image-2.jpg',
    thumbnailUrl: '/placeholders/media/image-2.jpg',
    fileSize: '1.8 MB',
    dimensions: '1600x900',
    uploadDate: '3 weeks ago',
    category: 'Slides',
  },
  {
    id: '5',
    name: 'css-demo.mp4',
    type: 'video',
    url: '/placeholders/media/video-2.mp4',
    thumbnailUrl: '/placeholders/media/video-2.jpg',
    fileSize: '18.5 MB',
    dimensions: '1280x720',
    uploadDate: '1 month ago',
    category: 'Course Videos',
  },
  {
    id: '6',
    name: 'course-materials.zip',
    type: 'other',
    url: '/placeholders/media/other-1.zip',
    fileSize: '45.2 MB',
    uploadDate: '1 month ago',
    category: 'Resources',
  },
  {
    id: '7',
    name: 'node-tutorial.jpg',
    type: 'image',
    url: '/placeholders/media/image-3.jpg',
    thumbnailUrl: '/placeholders/media/image-3.jpg',
    fileSize: '2.1 MB',
    dimensions: '1920x1080',
    uploadDate: '2 months ago',
    category: 'Thumbnails',
  },
  {
    id: '8',
    name: 'database-schema.jpg',
    type: 'image',
    url: '/placeholders/media/image-4.jpg',
    thumbnailUrl: '/placeholders/media/image-4.jpg',
    fileSize: '1.5 MB',
    dimensions: '1600x900',
    uploadDate: '2 months ago',
    category: 'Slides',
  },
];

export default function MediaLibraryPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  
  const handleUpload = () => {
    console.log('Uploading media...');
    setIsUploadDialogOpen(false);
  };
  
  const handleDeleteMedia = (ids: string[]) => {
    console.log(`Deleting media with IDs: ${ids.join(', ')}`);
  };
  
  const handleEditMedia = (id: string) => {
    console.log(`Editing media with ID: ${id}`);
  };
  
  const handleDownloadMedia = (id: string) => {
    console.log(`Downloading media with ID: ${id}`);
  };
  
  const handleCopyLink = (id: string) => {
    console.log(`Copying link for media with ID: ${id}`);
    // In a real app, you would copy the URL to clipboard
    alert(`Link copied to clipboard!`);
  };
  
  return (
    <div className="space-y-6">
      {/* Portal Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Creator Portal</h1>
      </div>
      
      {/* Media Library Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Media Library</h2>
          <p className="text-muted-foreground">Manage your images, videos, and other media files</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>
                  Upload images, videos, documents, or other files to your media library.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="file" className="mt-4">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                  <TabsTrigger value="url">From URL</TabsTrigger>
                  <TabsTrigger value="library">From Library</TabsTrigger>
                </TabsList>
                
                <TabsContent value="file" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium mb-1">Drag and drop your files here</p>
                    <p className="text-xs text-muted-foreground mb-4">Supports images, videos, documents up to 100MB</p>
                    <Button size="sm">Browse Files</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="file-name">File Name</Label>
                        <Input id="file-name" placeholder="Enter file name" />
                      </div>
                      <div>
                        <Label htmlFor="file-category">Category</Label>
                        <Input id="file-category" placeholder="Select category" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="file-description">Description (optional)</Label>
                      <Input id="file-description" placeholder="Add a description" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="media-url">Media URL</Label>
                      <Input id="media-url" placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="url-file-name">File Name</Label>
                        <Input id="url-file-name" placeholder="Enter file name" />
                      </div>
                      <div>
                        <Label htmlFor="url-file-category">Category</Label>
                        <Input id="url-file-category" placeholder="Select category" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="library" className="space-y-4">
                  <p className="text-sm text-muted-foreground">Browse your existing media library to reuse content.</p>
                  <div className="h-[200px] border rounded-md bg-muted/20 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Media browser will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleUpload}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <MediaLibraryGrid 
            items={mockMediaItems}
            onUpload={() => setIsUploadDialogOpen(true)}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
            onDownload={handleDownloadMedia}
            onCopyLink={handleCopyLink}
          />
        </TabsContent>
        
        <TabsContent value="images">
          <MediaLibraryGrid 
            items={mockMediaItems.filter(item => item.type === 'image')}
            onUpload={() => setIsUploadDialogOpen(true)}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
            onDownload={handleDownloadMedia}
            onCopyLink={handleCopyLink}
          />
        </TabsContent>
        
        <TabsContent value="videos">
          <MediaLibraryGrid 
            items={mockMediaItems.filter(item => item.type === 'video')}
            onUpload={() => setIsUploadDialogOpen(true)}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
            onDownload={handleDownloadMedia}
            onCopyLink={handleCopyLink}
          />
        </TabsContent>
        
        <TabsContent value="documents">
          <MediaLibraryGrid 
            items={mockMediaItems.filter(item => item.type === 'document')}
            onUpload={() => setIsUploadDialogOpen(true)}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
            onDownload={handleDownloadMedia}
            onCopyLink={handleCopyLink}
          />
        </TabsContent>
        
        <TabsContent value="other">
          <MediaLibraryGrid 
            items={mockMediaItems.filter(item => item.type === 'other')}
            onUpload={() => setIsUploadDialogOpen(true)}
            onDelete={handleDeleteMedia}
            onEdit={handleEditMedia}
            onDownload={handleDownloadMedia}
            onCopyLink={handleCopyLink}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 