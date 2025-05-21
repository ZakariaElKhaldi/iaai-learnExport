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
  type LucideIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
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
      } catch (err) {
        console.error('Error fetching main topics:', err);
      }
    };

    fetchMainTopics();
  }, []);

  // Get recently viewed tutorials
  React.useEffect(() => {
    if (mainTopics.length > 0 && progress.lastVisited) {
      // Create a flat array of all tutorials
      const allTutorials = mainTopics.flatMap(topic => topic.tutorials);
      
      // Find and set the recently viewed tutorial
      const lastViewed = allTutorials.filter(
        tutorial => progress.completedTutorials.includes(tutorial.id)
      ).slice(0, 5);
      
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
    const navItems: NavItem[] = [
      {
        title: "Learning Home",
        url: "/learn",
        icon: Home,
        isActive: isActive("/learn"),
      }
    ];

    // Add recently viewed section if available
    if (recentlyViewed.length > 0) {
      navItems.push({
        title: "Recently Viewed",
        url: "#recent",
        icon: History,
        isActive: false,
        items: recentlyViewed.map(tutorial => ({
          title: tutorial.name,
          url: `/learn/${tutorial.slug}`,
          isActive: isActive(`/learn/${tutorial.slug}`),
        }))
      });
    }

    // Add favorite topics if available
    if (favorites.length > 0) {
      navItems.push({
        title: "Favorites",
        url: "#favorites",
        icon: Star,
        isActive: false,
        items: favorites.map(topic => ({
          title: topic.name,
          url: `/learn?topic=${topic.id}`,
          isActive: isActive(`/learn?topic=${topic.id}`),
        }))
      });
    }

    // Add "Continue Learning" if there's a last visited tutorial
    if (progress.lastVisited) {
      const lastVisitedTutorial = mainTopics
        .flatMap(topic => topic.tutorials)
        .find(tutorial => tutorial.id === progress.lastVisited);

      if (lastVisitedTutorial) {
        navItems.push({
          title: "Continue Learning",
          url: `/learn/${lastVisitedTutorial.slug}`,
          icon: Clock,
          isActive: isActive(`/learn/${lastVisitedTutorial.slug}`),
          badge: "Resume",
        });
      }
    }

    // Add a section delimiter
    navItems.push({
      title: "All Topics",
      url: "#all-topics",
      icon: Layers,
      isActive: false,
    });

    // Map the main topics from API to sidebar format with subcategories
    const topicsFromApi: NavItem[] = mainTopics.map(topic => {
      // Group tutorials by subcategory
      const subCategoryItems = topic.subCategories.map(subcat => {
        // Only show subcategories with tutorials
        if (!subcat.tutorialCount) return null;
        
        return {
          title: subcat.name,
          url: `/learn?topic=${topic.id}&subcategory=${subcat.id}`,
          isActive: isActive(`/learn?topic=${topic.id}&subcategory=${subcat.id}`),
          badge: subcat.tutorialCount.toString(),
          icon: IconMap[subcat.icon] || BookOpen,
          items: subcat.tutorials.map(tutorial => ({
            title: tutorial.name,
            url: `/learn/${tutorial.slug}`,
            isActive: isActive(`/learn/${tutorial.slug}`),
            badge: progress.completedTutorials.includes(tutorial.id) ? "✓" : undefined,
          }))
        };
      }).filter(Boolean) as NavItem[];

      return {
        title: topic.name,
        url: `/learn?topic=${topic.id}`,
        icon: IconMap[topic.icon] || BookOpen,
        isActive: isActive(`/learn?topic=${topic.id}`),
        badge: topic.tutorialCount.toString(),
        items: subCategoryItems
      };
    });

    return [...navItems, ...topicsFromApi];
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={userData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 