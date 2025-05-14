import React from 'react';
import Link from 'next/link';
import { Mail, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface FooterItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumnProps {
  title: string;
  items: FooterItem[];
}

interface FooterProps {
  logo: React.ReactNode;
  tagline?: string;
  columns: FooterColumnProps[];
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  showSocial?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  copyrightText?: string;
  className?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="space-y-4">
    <h4 className="font-medium text-base">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          <Link 
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC<FooterProps> = ({
  logo,
  tagline,
  columns,
  showNewsletter = true,
  newsletterTitle = "Subscribe to our newsletter",
  newsletterDescription = "Get the latest updates and resources delivered to your inbox.",
  showSocial = true,
  socialLinks = {},
  copyrightText = `© ${new Date().getFullYear()} LearnExpert Connect. All rights reserved.`,
  className,
}) => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    // This would typically involve a call to an API
    console.log('Newsletter subscription submitted');
  };
  
  return (
    <footer className={cn("bg-card border-t", className)}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <div className="mb-6">{logo}</div>
            {tagline && <p className="text-muted-foreground text-sm">{tagline}</p>}
            
            {/* Social Links */}
            {showSocial && (Object.values(socialLinks).some(Boolean)) && (
              <div className="flex space-x-4 mt-6">
                {socialLinks.twitter && (
                  <Link 
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks.linkedin && (
                  <Link 
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks.github && (
                  <Link 
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                )}
                {socialLinks.youtube && (
                  <Link 
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
          </div>
          
          {/* Footer Columns */}
          {columns.map((column, index) => (
            <FooterColumn key={index} title={column.title} items={column.items} />
          ))}
          
          {/* Newsletter */}
          {showNewsletter && (
            <div className="lg:col-span-4 mt-8 lg:mt-12 border-t pt-8">
              <div className="max-w-xl">
                <h4 className="font-medium text-lg mb-2">{newsletterTitle}</h4>
                <p className="text-sm text-muted-foreground mb-4">{newsletterDescription}</p>
                
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-grow">
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="flex-shrink-0">
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
        
        {/* Copyright and Legal Links */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>{copyrightText}</p>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 