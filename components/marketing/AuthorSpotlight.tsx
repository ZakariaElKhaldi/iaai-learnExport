import React from 'react';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface AuthorSpotlightProps {
  id: string;
  slug: string;
  name: string;
  avatar?: string;
  title?: string;
  bio: string;
  expertise: string[];
  articleCount: number;
  isConsultant?: boolean;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  className?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const AuthorSpotlight: React.FC<AuthorSpotlightProps> = ({
  id,
  slug,
  name,
  avatar,
  title,
  bio,
  expertise,
  articleCount,
  isConsultant = false,
  social,
  className,
}) => {
  const authorUrl = `/blog/authors/${slug}`;
  
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start">
          <Avatar className="h-20 w-20 mb-4 sm:mb-0 sm:mr-6">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">{name}</h3>
                {title && <p className="text-sm text-muted-foreground">{title}</p>}
              </div>
              
              {isConsultant && (
                <Badge className="self-center mt-2 sm:mt-0 sm:self-start bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                  Consultant
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              {expertise.map(skill => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-center sm:justify-start mt-4 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 mr-1.5" />
              <span>{articleCount} {articleCount === 1 ? 'article' : 'articles'}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={authorUrl} className="flex items-center">
            View Profile
            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Link>
        </Button>
        
        {social && (
          <div className="flex items-center gap-2">
            {social.twitter && (
              <Link href={social.twitter} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            )}
            {social.linkedin && (
              <Link href={social.linkedin} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            )}
            {social.github && (
              <Link href={social.github} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
            )}
            {social.website && (
              <Link href={social.website} className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </Link>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthorSpotlight; 