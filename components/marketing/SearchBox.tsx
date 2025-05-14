import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Code, FileText, BookOpen, Command, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

export type SearchScopeType = 'all' | 'tutorials' | 'examples' | 'blog' | 'resources';

interface SearchSuggestion {
  id: string;
  text: string;
  type: SearchScopeType;
  url?: string;
}

interface SearchBoxProps {
  onSearch: (query: string, scope: SearchScopeType) => void;
  placeholder?: string;
  initialQuery?: string;
  initialScope?: SearchScopeType;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  popularSearches?: string[];
  className?: string;
  expandable?: boolean;
  showFilterDropdown?: boolean;
}

const getScopeIcon = (scope: SearchScopeType) => {
  switch (scope) {
    case 'tutorials':
      return <BookOpen className="h-4 w-4" />;
    case 'examples':
      return <Code className="h-4 w-4" />;
    case 'blog':
      return <FileText className="h-4 w-4" />;
    case 'resources':
      return <FileText className="h-4 w-4" />;
    default:
      return <Search className="h-4 w-4" />;
  }
};

const getScopeName = (scope: SearchScopeType) => {
  switch (scope) {
    case 'tutorials':
      return 'Tutorials';
    case 'examples':
      return 'Examples';
    case 'blog':
      return 'Blog';
    case 'resources':
      return 'Resources';
    default:
      return 'All Content';
  }
};

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = "Search tutorials, examples, or blog posts...",
  initialQuery = "",
  initialScope = "all",
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  className,
  expandable = false,
  showFilterDropdown = false,
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [scope, setScope] = useState<SearchScopeType>(initialScope);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(!expandable);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Filter suggestions based on input
  const filteredSuggestions = query.trim() !== "" 
    ? suggestions.filter(
        suggestion => suggestion.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, scope);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.url) {
      // Navigate directly if URL is available
      window.location.href = suggestion.url;
    } else {
      // Otherwise run search with the suggestion
      setQuery(suggestion.text);
      onSearch(suggestion.text, suggestion.type);
    }
    setShowSuggestions(false);
  };
  
  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        inputRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Expand search box when focused
  useEffect(() => {
    if (expandable && isFocused) {
      setIsExpanded(true);
    }
  }, [expandable, isFocused]);
  
  return (
    <div className={cn("relative", className)}>
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <div className={cn(
          "relative flex-grow transition-all duration-300",
          expandable && !isExpanded ? "w-12" : "w-full"
        )}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            
            <Input 
              ref={inputRef}
              type="search"
              placeholder={isExpanded ? placeholder : ""}
              className={cn(
                "pl-10", 
                expandable && !isExpanded ? "w-12 px-0 cursor-pointer" : "w-full"
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                if (expandable && query === "") {
                  setTimeout(() => setIsExpanded(false), 200);
                }
              }}
              onClick={() => {
                if (expandable && !isExpanded) {
                  setIsExpanded(true);
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 10);
                }
              }}
            />
            
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && isExpanded && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 py-2 bg-card border rounded-md shadow-md z-50"
            >
              {filteredSuggestions.length > 0 && (
                <>
                  <div className="px-3 py-1.5 text-xs text-muted-foreground">Suggestions</div>
                  {filteredSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id}
                      className="flex items-center px-3 py-1.5 hover:bg-accent cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="mr-2 text-muted-foreground">
                        {getScopeIcon(suggestion.type)}
                      </div>
                      <span>{suggestion.text}</span>
                    </div>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}
              
              {query === "" && (
                <>
                  {recentSearches.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 text-xs text-muted-foreground">Recent Searches</div>
                      {recentSearches.slice(0, 3).map((search, index) => (
                        <div 
                          key={`recent-${index}`}
                          className="flex items-center px-3 py-1.5 hover:bg-accent cursor-pointer"
                          onClick={() => {
                            setQuery(search);
                            onSearch(search, scope);
                            setShowSuggestions(false);
                          }}
                        >
                          <Command className="mr-2 h-3 w-3 text-muted-foreground" />
                          <span>{search}</span>
                        </div>
                      ))}
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {popularSearches.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 text-xs text-muted-foreground">Popular Searches</div>
                      {popularSearches.slice(0, 3).map((search, index) => (
                        <div 
                          key={`popular-${index}`}
                          className="flex items-center px-3 py-1.5 hover:bg-accent cursor-pointer"
                          onClick={() => {
                            setQuery(search);
                            onSearch(search, scope);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="mr-2 text-muted-foreground">
                            {index === 0 ? (
                              <span className="text-xs font-medium">1</span>
                            ) : index === 1 ? (
                              <span className="text-xs font-medium">2</span>
                            ) : (
                              <span className="text-xs font-medium">3</span>
                            )}
                          </div>
                          <span>{search}</span>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Search Scope Filter */}
        {showFilterDropdown && isExpanded && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{getScopeName(scope)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setScope('all')}>
                <Search className="h-4 w-4 mr-2" />
                <span>All Content</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScope('tutorials')}>
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Tutorials</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScope('examples')}>
                <Code className="h-4 w-4 mr-2" />
                <span>Examples</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScope('blog')}>
                <FileText className="h-4 w-4 mr-2" />
                <span>Blog</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setScope('resources')}>
                <FileText className="h-4 w-4 mr-2" />
                <span>Resources</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {isExpanded && (
          <Button type="submit" className="flex-shrink-0">
            Search
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchBox; 