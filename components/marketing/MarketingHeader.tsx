import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SearchBox from './SearchBox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

interface MarketingHeaderProps {
  logo: React.ReactNode;
  navigation: NavigationItem[];
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onSearch?: (query: string) => void;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  className?: string;
}

const MarketingHeader: React.FC<MarketingHeaderProps> = ({
  logo,
  navigation,
  isLoggedIn = false,
  userName,
  userAvatar,
  onSearch,
  onLogin,
  onSignup,
  onLogout,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle search
  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              {logo}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item, index) => (
              item.children ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-foreground/80 hover:text-foreground transition-colors">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.children.map((child, childIndex) => (
                      <DropdownMenuItem key={childIndex} asChild>
                        <Link 
                          href={child.href}
                          target={child.isExternal ? "_blank" : undefined}
                          rel={child.isExternal ? "noopener noreferrer" : undefined}
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={index}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          
          {/* Search, Auth, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {onSearch && (
              <div className="hidden md:block w-64">
                <SearchBox 
                  onSearch={handleSearch}
                  expandable={true}
                />
              </div>
            )}
            
            {/* Auth Section */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    {userAvatar ? (
                      <img 
                        src={userAvatar} 
                        alt={userName || "User avatar"} 
                        className="rounded-full"
                      />
                    ) : (
                      <UserCircle className="h-6 w-6" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {userName || "User"}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="text-red-500 focus:text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={onLogin}
                >
                  Login
                </Button>
                <Button 
                  onClick={onSignup}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 bg-background z-40 overflow-y-auto lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-6 space-y-6">
          {/* Mobile Search */}
          {onSearch && (
            <div className="mb-6">
              <SearchBox 
                onSearch={handleSearch}
              />
            </div>
          )}
          
          {/* Mobile Navigation */}
          <nav className="space-y-4">
            {navigation.map((item, index) => (
              <div key={index} className="py-2">
                {item.children ? (
                  <div className="space-y-2">
                    <div className="font-medium">{item.label}</div>
                    <div className="pl-4 space-y-2 border-l">
                      {item.children.map((child, childIndex) => (
                        <Link 
                          key={childIndex}
                          href={child.href}
                          className="block text-foreground/80 hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                          target={child.isExternal ? "_blank" : undefined}
                          rel={child.isExternal ? "noopener noreferrer" : undefined}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href}
                    className="block font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Mobile Auth Buttons */}
          {!isLoggedIn && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  onLogin?.();
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="w-full"
                onClick={() => {
                  onSignup?.();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader; 