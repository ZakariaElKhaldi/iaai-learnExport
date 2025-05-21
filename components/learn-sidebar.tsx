"use client"

import * as React from "react"
import {
  Code,
  FileText,
  Database,
  Server,
  Home,
  Layers,
  Boxes,
  BarChart,
  Link as LinkIcon,
  GraduationCap,
  PenTool,
  Globe,
  BookOpen,
  LineChart,
  Coffee,
  Terminal,
  Shield,
  Lock,
  Zap,
  Network,
  FileCode,
  Brain,
  PieChart,
  Sparkles,
  Table,
  FileJson,
  Workflow,
  Edit,
  FileSpreadsheet,
  GitBranch,
  Rocket,
  Smartphone,
  Calendar,
  HashIcon as Hash,
  Building,
  Dumbbell,
  CheckCircle,
  Award,
  Route,
  Clock,
  Star,
  History,
  ChevronRight,
  type LucideIcon
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname, useSearchParams } from "next/navigation"
import { useLearningProgress } from "@/hooks/use-learning-progress"
import { Badge } from "@/components/ui/badge" 

// User data - this could be fetched from an API in the future
const userData = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "LearnExpert",
      logo: GraduationCap,
      plan: "Free",
    }
  ],
}

// Icon mapping for dynamic icons
const IconMap: { [key: string]: LucideIcon } = {
  Code, 
  PenTool, 
  Globe, 
  Layers, 
  Server, 
  BookOpen, 
  Database, 
  LineChart,
  FileText,
  Home,
  Boxes,
  BarChart,
  LinkIcon,
  GraduationCap,
  Coffee,
  Terminal,
  Shield,
  Lock,
  Zap,
  Network,
  FileCode,
  Brain,
  PieChart,
  Sparkles,
  Table,
  FileJson,
  Workflow,
  Edit,
  FileSpreadsheet,
  GitBranch,
  Rocket,
  Smartphone,
  Calendar,
  Hash,
  Building,
  Dumbbell,
  CheckCircle,
  Award,
  Route,
  Clock,
  Star,
  History,
  ChevronRight,
};

// Define types based on API response
type Tutorial = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  level: string;
  popular: boolean;
  category: string;
  subcategoryId: string;
};

type SubCategory = {
  id: string;
  name: string;
  icon: string;
  tutorialCount: number;
  tutorials: Tutorial[];
};

type MainTopic = {
  id: string;
  name: string;
  color?: string;
  icon: string;
  description: string;
  tutorialCount: number;
  tutorials: Tutorial[];
  subCategories: SubCategory[];
  difficulty: string;
};

// NavItem type to match what NavMain expects
type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  badge?: string;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badge?: string;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
      badge?: string;
    }[];
  }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mainTopics, setMainTopics] = React.useState<MainTopic[]>([]);
  const { progress } = useLearningProgress();
  const [recentlyViewed, setRecentlyViewed] = React.useState<Tutorial[]>([]);
  const [favorites, setFavorites] = React.useState<MainTopic[]>([]);
  const [expandedTopics, setExpandedTopics] = React.useState<string[]>([]);
  
  // Fetch topics data
  React.useEffect(() => {
    const fetchMainTopics = async () => {
      try {
        const response = await fetch('/api/learn');
        if (!response.ok) {
          throw new Error('Failed to fetch main topics');
        }
        const data = await response.json();
        setMainTopics(data);
        
        // Auto-expand the active topic if any
        const topicParam = searchParams.get('topic');
        if (topicParam) {
          setExpandedTopics([topicParam]);
        }
      } catch (err) {
        console.error('Error fetching main topics:', err);
      }
    };

    fetchMainTopics();
  }, [searchParams]);

  // Get recently viewed tutorials
  React.useEffect(() => {
    if (mainTopics.length > 0 && progress.lastVisited) {
      // Create a flat array of all tutorials
      const allTutorials = mainTopics.flatMap(topic => topic.tutorials);
      
      // Find and set the recently viewed tutorial
      const lastViewed = allTutorials.filter(
        tutorial => progress.completedTutorials.includes(tutorial.id)
      ).slice(0, 3); // Limit to top 3 for less clutter
      
      setRecentlyViewed(lastViewed);
    }
  }, [mainTopics, progress]);

  // Get favorite topics
  React.useEffect(() => {
    if (mainTopics.length > 0 && progress.favoriteTopics?.length > 0) {
      const userFavorites = mainTopics.filter(
        topic => progress.favoriteTopics.includes(topic.id)
      );
      setFavorites(userFavorites);
    }
  }, [mainTopics, progress]);
  
  // Toggle topic expansion
  const toggleTopicExpansion = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };
  
  // Simple function to check if a URL is part of the current path
  const isActive = (url: string): boolean => {
    if (!pathname) return false;
    
    // Check for exact match (learning home)
    if (url === "/learn" && pathname === "/learn" && !searchParams.has('topic')) return true;
    
    // Check for tutorial page
    if (url.startsWith("/learn/") && pathname.startsWith(url)) return true;
    
    // Check for topic query parameter
    if (url.includes('?topic=')) {
      const topicMatch = url.match(/\?topic=([^&]+)/);
      if (topicMatch && topicMatch[1]) {
        return searchParams.get('topic') === topicMatch[1];
      }
    }
    
    // Check for subcategory query parameter
    if (url.includes('?subcategory=')) {
      const subcategoryMatch = url.match(/\?subcategory=([^&]+)/);
      if (subcategoryMatch && subcategoryMatch[1]) {
        return searchParams.get('subcategory') === subcategoryMatch[1];
      }
    }
    
    return false;
  };

  // Convert API data to sidebar-compatible format
  const getNavItems = (): NavItem[] => {
    // Sidebar Items
    const navItems: NavItem[] = [
      {
        title: "Learning Home",
        url: "/learn",
        icon: Home,
        isActive: isActive("/learn") && !searchParams.has('topic'),
      },
    ]
    
    // Add recently viewed items if available
    if (recentlyViewed.length > 0) {
      navItems.push({
        title: "Recently Viewed",
        url: "#",
        icon: History,
        items: recentlyViewed.map(tutorial => ({
          title: tutorial.name,
          url: `/learn/${tutorial.slug}`,
          isActive: isActive(`/learn/${tutorial.slug}`),
          badge: getCourseCompletionStatus(tutorial.id, progress)
        }))
      });
    }
    
    // Add favorite topics if available
    if (favorites.length > 0) {
      navItems.push({
        title: "Favorites",
        url: "#",
        icon: Star,
        items: favorites.map(topic => ({
          title: topic.name,
          url: `/learn?topic=${topic.id}`,
          isActive: isActive(`/learn?topic=${topic.id}`),
          badge: `${topic.tutorialCount}`
        }))
      });
    }
    
    // Add main topics with their subcategories - more organized approach
    mainTopics.forEach(topic => {
      // Check if this topic is expanded or active
      const isTopicActive = isActive(`/learn?topic=${topic.id}`);
      const isExpanded = expandedTopics.includes(topic.id) || isTopicActive;
      
      // Get the Icon component for the main topic
      const IconName = topic.icon || "BookOpen";
      const TopicIcon = IconMap[IconName] || BookOpen;
      
      // Create subcategory navigation items - only if topic is expanded
      const subCategoryItems = isExpanded ? topic.subCategories
        .filter(subCat => subCat.tutorialCount > 0) // Only show non-empty subcategories
        .map(subCat => {
          // Get the Icon component if one has been assigned
          const subIconName = subCat.icon || "FileText";
          const SubIcon = IconMap[subIconName] || FileText;
          
          // Only show "View All" link instead of individual courses to reduce clutter
          return {
            title: subCat.name,
            url: `/learn?topic=${topic.id}&subcategory=${subCat.id}`,
            isActive: isActive(`/learn?topic=${topic.id}&subcategory=${subCat.id}`),
            badge: subCat.tutorialCount > 0 ? `${subCat.tutorialCount}` : undefined,
            icon: SubIcon
          };
        }) : [];
      
      // Add the main topic with its subcategories
      navItems.push({
        title: topic.name,
        url: `#${topic.id}`, // Use anchor to handle expansion logic
        icon: TopicIcon,
        isActive: isTopicActive && !searchParams.has('subcategory'),
        badge: `${topic.tutorialCount}`,
        items: subCategoryItems
      });
    });
    
    return navItems;
  };
  
  // Custom NavMain rendering to handle topic expansion
  const renderCustomNav = () => {
    const navItems = getNavItems();
    
    return (
      <div className="space-y-1">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <div 
              className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                item.isActive 
                  ? 'bg-muted font-medium' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => {
                // Handle main topics expansion differently
                if (item.url.startsWith('#')) {
                  const topicId = item.url.substring(1);
                  toggleTopicExpansion(topicId);
                } else {
                  window.location.href = item.url;
                }
              }}
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className={item.isActive ? 'font-medium' : ''}>{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {item.badge}
                  </Badge>
                )}
                {item.items && item.items.length > 0 && item.url.startsWith('#') && (
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    expandedTopics.includes(item.url.substring(1)) ? 'rotate-90' : ''
                  }`} />
                )}
              </div>
            </div>
            
            {/* Render subitems if this is expanded or a non-topic item */}
            {item.items && item.items.length > 0 && 
             (!item.url.startsWith('#') || expandedTopics.includes(item.url.substring(1))) && (
              <div className="ml-6 my-1 space-y-1 border-l pl-2 border-muted">
                {item.items.map((subitem, subindex) => (
                  <div 
                    key={subindex}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer ${
                      subitem.isActive 
                        ? 'bg-muted/70 font-medium' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => window.location.href = subitem.url}
                  >
                    <div className="flex items-center gap-3 text-sm">
                      {subitem.icon && <subitem.icon className="w-3.5 h-3.5" />}
                      <span>{subitem.title}</span>
                    </div>
                    {subitem.badge && (
                      <Badge variant="outline" className="text-xs font-normal">
                        {subitem.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  // Helper function to get course completion status for badges
  const getCourseCompletionStatus = (courseId: string, progressData: { 
    completedTutorials: string[]; 
    lastVisited: string | null;
    favoriteTopics: string[];
    streakDays: number;
    lastActive: string | null;
  }): string | undefined => {
    if (progressData.completedTutorials && progressData.completedTutorials.includes(courseId)) {
      return "✓";
    }
    if (progressData.lastVisited === courseId) {
      return "▶";
    }
    return undefined;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={userData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {renderCustomNav()}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 