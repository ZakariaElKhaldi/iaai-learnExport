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
  GraduationCap
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
import { usePathname } from "next/navigation"

// Learning sidebar data
const data = {
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
  navMain: [
    {
      title: "Learning",
      url: "/learn",
      icon: Home,
      isActive: true,
      items: [],
    },
    {
      title: "HTML & CSS",
      url: "/learn/html-css",
      icon: Code,
      items: [
        {
          title: "HTML",
          url: "/learn/html",
        },
        {
          title: "CSS",
          url: "/learn/css",
        },
        {
          title: "Bootstrap",
          url: "/learn/bootstrap",
        },
        {
          title: "Responsive Web Design",
          url: "/learn/responsive",
        }
      ],
    },
    {
      title: "JavaScript",
      url: "/learn/javascript-category",
      icon: FileText,
      items: [
        {
          title: "JavaScript Basics",
          url: "/learn/javascript",
        },
        {
          title: "JavaScript Advanced",
          url: "/learn/javascript-advanced",
        },
        {
          title: "DOM Manipulation",
          url: "/learn/dom",
        },
        {
          title: "ES6+",
          url: "/learn/es6",
        },
        {
          title: "TypeScript",
          url: "/learn/typescript",
        },
      ],
    },
    {
      title: "Frontend Frameworks",
      url: "/learn/frontend",
      icon: Layers,
      items: [
        {
          title: "React",
          url: "/learn/react",
        },
        {
          title: "Angular",
          url: "/learn/angular",
        },
        {
          title: "Vue",
          url: "/learn/vue",
        },
        {
          title: "Next.js",
          url: "/learn/nextjs",
        },
      ],
    },
    {
      title: "Backend",
      url: "/learn/backend",
      icon: Server,
      items: [
        {
          title: "Node.js",
          url: "/learn/nodejs",
        },
        {
          title: "Express.js",
          url: "/learn/express",
        },
        {
          title: "PHP",
          url: "/learn/php",
        },
        {
          title: "Django",
          url: "/learn/django",
        },
      ],
    },
    {
      title: "Databases",
      url: "/learn/databases",
      icon: Database,
      items: [
        {
          title: "SQL",
          url: "/learn/sql",
        },
        {
          title: "MongoDB",
          url: "/learn/mongodb",
        },
        {
          title: "Firebase",
          url: "/learn/firebase",
        },
      ],
    },
    {
      title: "DevOps",
      url: "/learn/devops",
      icon: Boxes,
      items: [
        {
          title: "Git & GitHub",
          url: "/learn/git",
        },
        {
          title: "Docker",
          url: "/learn/docker",
        },
        {
          title: "CI/CD",
          url: "/learn/cicd",
        },
      ],
    },
    {
      title: "Data Science",
      url: "/learn/data-science",
      icon: BarChart,
      items: [
        {
          title: "Python",
          url: "/learn/python",
        },
        {
          title: "Data Analysis",
          url: "/learn/data-analysis",
        },
        {
          title: "Machine Learning",
          url: "/learn/machine-learning",
        },
      ],
    },
    {
      title: "Quick Links",
      url: "/learn/quick-links",
      icon: LinkIcon,
      items: [
        {
          title: "Exercises",
          url: "/learn/exercises",
        },
        {
          title: "Examples",
          url: "/learn/examples",
        },
        {
          title: "Settings",
          url: "/user-settings",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  
  // Simple function to check if a URL is part of the current path
  const isActive = (url: string): boolean => {
    if (!pathname) return false;
    if (url === "/learn" && pathname === "/learn") return true;
    if (url !== "/learn" && pathname.startsWith(url)) return true;
    return false;
  };

  // Set active items based on current path
  const getNavItems = () => {
    return data.navMain.map(item => ({
      ...item,
      isActive: item.url ? isActive(item.url) : item.items?.some(subItem => isActive(subItem.url)) || false,
      items: item.items?.map(subItem => ({
        ...subItem,
        isActive: isActive(subItem.url)
      }))
    }));
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItems()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 