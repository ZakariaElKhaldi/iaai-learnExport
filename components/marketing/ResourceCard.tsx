import React from 'react';
import Link from 'next/link';
import { Download, FileText, FileImage, FileCode, File, Lock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from '@/lib/utils';

export type ResourceType = 'pdf' | 'image' | 'code' | 'archive' | 'document' | 'spreadsheet' | 'presentation' | 'other';
export type ResourceSize = 'kb' | 'mb' | 'gb';

interface ResourceCardProps {
  id: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  fileSize?: number;
  fileSizeUnit?: ResourceSize;
  isPremium?: boolean;
  categorySlug?: string;
  resourceId?: string;
  downloadUrl?: string;
  thumbnailUrl?: string;
  className?: string;
}

const getResourceTypeIcon = (type: ResourceType) => {
  switch (type) {
    case 'pdf':
    case 'document':
      return <FileText className="h-10 w-10 text-red-500" />;
    case 'image':
      return <FileImage className="h-10 w-10 text-blue-500" />;
    case 'code':
      return <FileCode className="h-10 w-10 text-emerald-500" />;
    case 'presentation':
      return <FileText className="h-10 w-10 text-orange-500" />;
    case 'spreadsheet':
      return <FileText className="h-10 w-10 text-green-500" />;
    default:
      return <File className="h-10 w-10 text-slate-500" />;
  }
};

const formatFileSize = (size: number, unit: ResourceSize) => {
  return `${size} ${unit.toUpperCase()}`;
};

const getFileExtension = (type: ResourceType) => {
  switch (type) {
    case 'pdf':
      return 'PDF';
    case 'image':
      return 'IMG';
    case 'code':
      return 'ZIP';
    case 'archive':
      return 'ZIP';
    case 'document':
      return 'DOC';
    case 'spreadsheet':
      return 'XLS';
    case 'presentation':
      return 'PPT';
    default:
      return 'FILE';
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  description,
  resourceType,
  fileSize,
  fileSizeUnit = 'kb',
  isPremium = false,
  categorySlug,
  resourceId,
  downloadUrl,
  thumbnailUrl,
  className,
}) => {
  const formattedFileSize = fileSize ? formatFileSize(fileSize, fileSizeUnit) : null;
  const resourceTypeIcon = getResourceTypeIcon(resourceType);
  const fileExtension = getFileExtension(resourceType);
  
  const href = categorySlug && resourceId 
    ? `/learn/resources/${categorySlug}/${resourceId}`
    : downloadUrl || '#';

  return (
    <Card className={cn("h-full overflow-hidden hover:shadow-md transition-all", className)}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-slate-100 rounded-lg">
            {resourceTypeIcon}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {fileExtension}
                </Badge>
                {isPremium && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    Premium
                  </Badge>
                )}
              </div>
              
              {formattedFileSize && (
                <span className="text-xs text-muted-foreground">{formattedFileSize}</span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button 
          asChild={!isPremium}
          variant={isPremium ? "outline" : "default"}
          className={cn("w-full", isPremium && "border-primary/50 text-primary hover:bg-primary/5")}
        >
          {isPremium ? (
            <div className="flex items-center justify-center">
              <Lock className="h-4 w-4 mr-2" />
              Login to Download
            </div>
          ) : (
            <Link href={href} className="flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              Download Resource
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard; 