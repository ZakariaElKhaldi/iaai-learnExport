import React from 'react';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar?: string;
    slug?: string;
  };
  publishedAt: string; // ISO date string
  readingTimeMinutes: number;
  isFeatured?: boolean;
  className?: string;
  compact?: boolean;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  slug,
  title,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  readingTimeMinutes,
  isFeatured = false,
  className,
  compact = false,
}) => {
  const formattedDate = formatDate(publishedAt);
  const postUrl = `/blog/posts/${slug}`;
  const categoryUrl = `/blog/categories/${category.slug}`;
  const authorUrl = author.slug ? `/blog/authors/${author.slug}` : '#';
  
  const imageHeight = compact ? "h-32" : "h-48";
  const contentPadding = compact ? "p-4" : "p-5";
  
  return (
    <Card className={cn("h-full overflow-hidden hover:shadow-md transition-all", className)}>
      {featuredImage && (
        <Link href={postUrl} className="block overflow-hidden">
          <div className={`w-full ${imageHeight} overflow-hidden bg-slate-100`}>
            <img 
              src={featuredImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        </Link>
      )}
      
      <CardContent className={contentPadding}>
        <div className="flex items-center gap-2 mb-3">
          <Link href={categoryUrl}>
            <Badge variant="secondary" className="hover:bg-secondary/80">
              {category.name}
            </Badge>
          </Link>
          
          {isFeatured && (
            <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">
              Featured
            </Badge>
          )}
        </div>
        
        <Link href={postUrl} className="hover:underline block">
          <h3 className={cn("font-semibold text-foreground line-clamp-2", 
            compact ? "text-base mb-1" : "text-xl mb-2")}>
            {title}
          </h3>
        </Link>
        
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <Link href={authorUrl} className="flex items-center gap-2 group">
            <Avatar className={compact ? "h-6 w-6" : "h-8 w-8"}>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
            </Avatar>
            <span className={cn("text-muted-foreground group-hover:text-foreground transition-colors", 
              compact ? "text-xs" : "text-sm")}>
              {author.name}
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-muted-foreground">
              <Calendar className={cn("mr-1", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
              <span className={compact ? "text-xs" : "text-sm"}>{formattedDate}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Clock className={cn("mr-1", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
              <span className={compact ? "text-xs" : "text-sm"}>{readingTimeMinutes} min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard; 