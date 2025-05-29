"use client";

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  Upload, 
  File, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

interface CourseContentUploaderProps {
  onFileUploaded?: (fileUrl: string, fileType: string, fileName: string) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  className?: string;
}

export function CourseContentUploader({
  onFileUploaded,
  maxFileSize = 100, // Default 100MB
  allowedFileTypes = ['image/*', 'video/*', 'application/pdf', '.doc', '.docx', '.ppt', '.pptx', '.zip'],
  className = '',
}: CourseContentUploaderProps) {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const generateId = () => `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const newUploads = files.map(file => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum file size of ${maxFileSize}MB.`,
          variant: "destructive",
        });
        return null;
      }
      
      // Check file type
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()}`;
      const isAllowed = allowedFileTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });
      
      if (!isAllowed) {
        toast({
          title: "File type not allowed",
          description: `${file.name} is not an allowed file type.`,
          variant: "destructive",
        });
        return null;
      }
      
      return {
        id: generateId(),
        file,
        progress: 0,
        status: 'pending' as const,
      };
    }).filter(Boolean) as FileUpload[];
    
    setUploads(prev => [...prev, ...newUploads]);
    
    // Start uploading the new files
    newUploads.forEach(upload => {
      simulateUpload(upload.id);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  // This is a simulation of file upload - in a real app, this would be replaced with actual API calls
  const simulateUpload = useCallback((id: string) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id ? { ...upload, status: 'uploading' } : upload
    ));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        // Simulate a small chance of error
        const success = Math.random() > 0.1;
        
        setUploads(prev => prev.map(upload => {
          if (upload.id === id) {
            if (success) {
              // Generate a fake URL for the uploaded file
              const url = `https://example.com/uploads/${upload.file.name}`;
              
              // Notify parent component
              onFileUploaded?.(url, upload.file.type, upload.file.name);
              
              return {
                ...upload,
                progress: 100,
                status: 'success',
                url,
              };
            } else {
              return {
                ...upload,
                progress: 100,
                status: 'error',
                error: 'Failed to upload file. Please try again.',
              };
            }
          }
          return upload;
        }));
      } else {
        setUploads(prev => prev.map(upload => 
          upload.id === id ? { ...upload, progress } : upload
        ));
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [onFileUploaded]);

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  const retryUpload = (id: string) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id ? { ...upload, progress: 0, status: 'pending', error: undefined } : upload
    ));
    
    simulateUpload(id);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />;
    } else if (fileType.startsWith('video/')) {
      return <Video className="h-6 w-6 text-purple-500" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (fileType.includes('document') || fileType.includes('msword')) {
      return <FileText className="h-6 w-6 text-blue-600" />;
    } else if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
      return <FileText className="h-6 w-6 text-orange-500" />;
    } else if (fileType.includes('zip') || fileType.includes('compressed')) {
      return <File className="h-6 w-6 text-yellow-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upload Course Materials</CardTitle>
        <CardDescription>
          Upload files for your course. Supported formats include images, videos, PDFs, documents, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <div className="mb-4">
            <h3 className="text-lg font-medium">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse your computer
            </p>
          </div>
          <div>
            <Label htmlFor="file-upload" className="sr-only">
              Choose files
            </Label>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept={allowedFileTypes.join(',')}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select Files
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Maximum file size: {maxFileSize}MB
          </p>
        </div>

        {uploads.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Uploaded Files</h3>
            <div className="space-y-3">
              {uploads.map(upload => (
                <div key={upload.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getFileIcon(upload.file.type)}
                      <div>
                        <p className="font-medium text-sm truncate max-w-[200px]">
                          {upload.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {upload.status === 'success' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(upload.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {upload.status === 'error' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => retryUpload(upload.id)}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeUpload(upload.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress value={upload.progress} className="h-1" />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {upload.status === 'uploading' && (
                          <span className="text-muted-foreground">Uploading... {Math.round(upload.progress)}%</span>
                        )}
                        {upload.status === 'success' && (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Upload complete
                          </span>
                        )}
                        {upload.status === 'error' && (
                          <span className="text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" /> {upload.error}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 