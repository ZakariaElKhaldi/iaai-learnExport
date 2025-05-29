"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  Users,
  BarChart,
  Briefcase,
  HelpCircle,
  Building2,
  FileText,
  Award,
  CreditCard,
  Layers,
  MoreHorizontal,
  Code,
  Globe,
  Computer,
  Shield,
  BrainCircuit,
  Server
} from "lucide-react"
import { LucideIcon } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NavItem, NavSubItem, ProjectItem, TeamData, UserData, UserRole } from "@/types"

// Interface for the application data structure
interface AppData {
  user: UserData;
  teams: TeamData[];
  navMain: NavItem[];
  adminNav: NavItem[];
  consultantNav: NavItem[];
  creatorNav: NavItem[];
  enterpriseNav: NavItem[];
  projects: ProjectItem[];
}

// Application data
const data: AppData = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
    role: "student"
  },
  teams: [
    {
      name: "LearnExpert",
      logo: GraduationCap,
      plan: "Premium",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/user-dashboard",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "Learning",
      url: "/user-courses",
      icon: BookOpen,
      items: [
        {
          title: "My Courses",
          url: "/user-courses",
        },
        {
          title: "Explore Courses",
          url: "/user-explore",
        },
        {
          title: "Certificates",
          url: "/user-certificates",
        },
        {
          title: "Learning Path",
          url: "/user-learning-path",
        },
        {
          title: "Practice Playground",
          url: "/user-practice",
        },
      ],
    },
    {
      title: "Learning Tools",
      url: "/user-virtual-lab",
      icon: Computer,
      items: [
        {
          title: "AI Laboratory",
          url: "/user-ai-lab",
        },
        {
          title: "Virtual Lab",
          url: "/user-virtual-lab",
        },
        {
          title: "Cybersecurity Sandbox",
          url: "/user-cybersecurity-sandbox",
        }
      ],
    },
    {
      title: "Community",
      url: "/user-community",
      icon: Globe,
      items: [],
    },
    {
      title: "Consultations",
      url: "/user-consultations",
      icon: MessageSquare,
      items: [],
    },
    {
      title: "Calendar",
      url: "/user-calendar",
      icon: Calendar,
      items: [],
    },
  ],
  adminNav: [
    {
      title: "Admin",
      url: "/admin-dashboard",
      icon: BarChart,
      items: [
        {
          title: "Dashboard",
          url: "/admin-dashboard",
        },
        {
          title: "Users",
          url: "/admin-users",
        },
        {
          title: "Companies",
          url: "/admin-companies",
        },
        {
          title: "Courses",
          url: "/admin-courses",
        },
      ],
    },
  ],
  consultantNav: [
    {
      title: "Consultant",
      url: "/consultant-dashboard",
      icon: Briefcase,
      items: [
        {
          title: "Dashboard",
          url: "/consultant-dashboard",
        },
        {
          title: "Availability",
          url: "/consultant-availability",
        },
        {
          title: "Sessions",
          url: "/consultant-sessions",
        },
        {
          title: "Requests",
          url: "/consultant-requests",
        },
      ],
    },
  ],
  creatorNav: [
    {
      title: "Creator",
      url: "/creator-dashboard",
      icon: FileText,
      items: [
        {
          title: "Dashboard",
          url: "/creator-dashboard",
        },
        {
          title: "Courses",
          url: "/creator-courses",
        },
        {
          title: "Analytics",
          url: "/creator-analytics",
        },
        {
          title: "Media Library",
          url: "/creator-media-library",
        },
      ],
    },
  ],
  enterpriseNav: [
    {
      title: "Enterprise",
      url: "/enterprise-dashboard",
      icon: Building2,
      items: [
        {
          title: "Dashboard",
          url: "/enterprise-dashboard",
        },
        {
          title: "Employees",
          url: "/enterprise-employees",
        },
        {
          title: "Reports",
          url: "/enterprise-reports",
        },
        {
          title: "Assign Courses",
          url: "/assign-courses",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Help Center",
      url: "/help-center",
      icon: HelpCircle,
    },
    {
      name: "Certificates",
      url: "/user-certificates",
      icon: Award,
    },
    {
      name: "Billing",
      url: "/user-billing-history",
      icon: CreditCard,
    },
  ],
};

// Function to determine user role based on path
const getUserRole = (path: string | null): UserRole => {
  if (!path) return 'student';
  if (path.includes('/admin')) return 'admin';
  if (path.includes('/consultant')) return 'consultant';
  if (path.includes('/creator')) return 'creator';
  if (path.includes('/enterprise')) return 'enterprise';
  return 'student';
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const userRole = getUserRole(pathname);
  
  // Determine which navigation to show based on the user role
  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'admin':
        return data.adminNav;
      case 'consultant':
        return data.consultantNav;
      case 'creator':
        return data.creatorNav;
      case 'enterprise':
        return data.enterpriseNav;
      default:
        return data.navMain;
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems()} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
