"use client";

import React from 'react';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// This type will be extended and properly typed with API responses
type SearchResult = {
  id: string;
  title: string;
  type: 'course' | 'user' | 'consultant' | 'article';
  subtitle?: string;
  url: string;
};

// Mock search results - will be fetched from API in production
const mockSearchResults: Record<string, SearchResult[]> = {
  courses: [
    { id: 'c1', title: 'React Fundamentals', type: 'course', subtitle: 'Learn the basics of React', url: '/courses/react-fundamentals' },
    { id: 'c2', title: 'Advanced JavaScript', type: 'course', subtitle: 'Master JavaScript concepts', url: '/courses/advanced-javascript' },
  ],
  people: [
    { id: 'u1', title: 'John Smith', type: 'user', subtitle: 'Course Creator', url: '/creators/john-smith' },
    { id: 'u2', title: 'Sarah Johnson', type: 'consultant', subtitle: 'Web Development Expert', url: '/consultants/sarah-johnson' },
  ],
  articles: [
    { id: 'a1', title: 'Getting Started with LearnExpert', type: 'article', url: '/articles/getting-started' },
    { id: 'a2', title: 'Best Practices for Online Learning', type: 'article', url: '/articles/best-practices' },
  ],
};

interface SearchBarProps {
  className?: string;
  buttonVariant?: 'default' | 'ghost' | 'outline';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  placeholder?: string;
}

export default function SearchBar({
  className,
  buttonVariant = 'outline',
  buttonSize = 'default',
  placeholder = 'Search...',
}: SearchBarProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  // Mock search function - will be replaced with actual API call
  const search = (searchQuery: string): Record<string, SearchResult[]> => {
    if (!searchQuery.trim()) return {};
    
    // Filter mock results based on the query
    const filteredResults: Record<string, SearchResult[]> = {};
    
    Object.entries(mockSearchResults).forEach(([category, results]) => {
      const filtered = results.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (result.subtitle && result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      if (filtered.length > 0) {
        filteredResults[category] = filtered;
      }
    });
    
    return filteredResults;
  };

  const results = search(query);
  const hasResults = Object.values(results).some(group => group.length > 0);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    router.push(result.url);
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={cn(
          buttonSize === 'icon' ? 'w-9 px-0' : 'w-auto',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 mr-2" />
        {buttonSize !== 'icon' && <span>Search</span>}
        {buttonSize !== 'icon' && (
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={placeholder}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!query.trim() ? (
            <CommandEmpty>Start typing to search...</CommandEmpty>
          ) : !hasResults ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              {results.courses && results.courses.length > 0 && (
                <CommandGroup heading="Courses">
                  {results.courses.map(course => (
                    <CommandItem
                      key={course.id}
                      onSelect={() => handleSelect(course)}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span>{course.title}</span>
                        {course.subtitle && (
                          <span className="text-xs text-muted-foreground">{course.subtitle}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {results.people && results.people.length > 0 && (
                <>
                  {results.courses && results.courses.length > 0 && <CommandSeparator />}
                  <CommandGroup heading="People">
                    {results.people.map(person => (
                      <CommandItem
                        key={person.id}
                        onSelect={() => handleSelect(person)}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex flex-col">
                          <span>{person.title}</span>
                          {person.subtitle && (
                            <span className="text-xs text-muted-foreground">{person.subtitle}</span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              
              {results.articles && results.articles.length > 0 && (
                <>
                  {(results.courses || results.people) && <CommandSeparator />}
                  <CommandGroup heading="Articles">
                    {results.articles.map(article => (
                      <CommandItem
                        key={article.id}
                        onSelect={() => handleSelect(article)}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-purple-500" />
                        </div>
                        <span>{article.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
          
          <CommandSeparator />
          <CommandGroup heading="Search">
            <CommandItem
              onSelect={() => {
                if (query.trim()) {
                  setOpen(false);
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                }
              }}
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Search for "{query}"
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 