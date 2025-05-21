"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Star } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

export type NavItemProps = {
  title: string
  url: string
  icon?: React.ElementType
  isActive?: boolean
  badge?: string
  popular?: boolean
  items?: {
    title: string
    url: string
    icon?: React.ElementType
    isActive?: boolean
    badge?: string
    popular?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
      badge?: string
      popular?: boolean
    }[]
  }[]
}

interface NavMainProps {
  items: NavItemProps[]
}

export function NavMain({ items }: NavMainProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  
  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    );
  };
  
  // Check if any child or grandchild is active to keep parent expanded
  React.useEffect(() => {
    const newExpanded: string[] = [];
    
    items.forEach(item => {
      if (item.isActive || item.items?.some(subItem => 
        subItem.isActive || subItem.items?.some(grandChild => grandChild.isActive)
      )) {
        newExpanded.push(item.title);
      }
      
      item.items?.forEach(subItem => {
        if (subItem.isActive || subItem.items?.some(grandChild => grandChild.isActive)) {
          newExpanded.push(subItem.title);
        }
      });
    });
    
    setExpandedItems(prev => [...prev, ...newExpanded.filter(item => !prev.includes(item))]);
  }, [items]);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        {items.map((item, i) => {
          const isExpanded = expandedItems.includes(item.title);
          
          if (item.url.startsWith("#") && !item.items) {
            // Section header without items
            return (
              <SidebarGroupLabel key={i} className="mt-4 mb-1">
                {item.icon && <item.icon className="mr-2 size-4" />}
                <span>{item.title}</span>
              </SidebarGroupLabel>
            );
          }
          
          return (
            <SidebarMenuItem key={i}>
              {item.items?.length ? (
                <div>
                  <SidebarMenuButton
                    isActive={item.isActive || isExpanded}
                    onClick={() => toggleExpanded(item.title)}
                    className="justify-between"
                  >
                    <div className="flex items-center flex-1">
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      <span className="flex-1">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="mx-2 text-xs bg-sidebar-accent/30 rounded px-1.5 py-0.5">
                        {item.badge}
                      </span>
                    )}
                    {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </SidebarMenuButton>
                  
                  {isExpanded && (
                    <SidebarMenuSub>
                      {item.items.map((subItem, j) => {
                        const isSubExpanded = expandedItems.includes(subItem.title);
                        
                        return (
                          <div key={`${i}-${j}`} className="relative">
                            {subItem.items?.length ? (
                              <div>
                                <SidebarMenuButton
                                  isActive={subItem.isActive || isSubExpanded}
                                  size="sm"
                                  onClick={() => toggleExpanded(subItem.title)}
                                  className="w-full justify-between"
                                >
                                  <div className="flex items-center flex-1">
                                    {subItem.icon && <subItem.icon className="mr-2 size-3.5" />}
                                    <span className="flex-1">{subItem.title}</span>
                                  </div>
                                  {subItem.badge && (
                                    <span className="mx-2 text-xs bg-sidebar-accent/30 rounded px-1.5 py-0.5">
                                      {subItem.badge}
                                    </span>
                                  )}
                                  {isSubExpanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                                </SidebarMenuButton>
                                
                                {isSubExpanded && (
                                  <div className="pl-4 ml-2 border-l border-sidebar-border flex flex-col gap-1 py-1">
                                    {subItem.items.map((grandChild, k) => (
                                      <div key={`${i}-${j}-${k}`} className="relative">
                                        <SidebarMenuButton
                                          isActive={grandChild.isActive}
                                          size="sm"
                                          asChild
                                        >
                                          <Link 
                                            href={grandChild.url} 
                                            className="flex items-center justify-between"
                                          >
                                            <span className="flex-1">{grandChild.title}</span>
                                            {grandChild.badge && (
                                              <span className="ml-2 text-xs bg-sidebar-accent/30 rounded px-1.5 py-0.5">
                                                {grandChild.badge}
                                              </span>
                                            )}
                                          </Link>
                                        </SidebarMenuButton>
                                        {grandChild.popular && (
                                          <Star className="absolute right-1 top-1/2 -translate-y-1/2 size-3 text-yellow-400" />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <SidebarMenuButton
                                isActive={subItem.isActive}
                                size="sm"
                                asChild
                              >
                                <Link 
                                  href={subItem.url} 
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center flex-1">
                                    {subItem.icon && <subItem.icon className="mr-2 size-3.5" />}
                                    <span>{subItem.title}</span>
                                  </div>
                                  {subItem.badge && (
                                    <span className="ml-2 text-xs bg-sidebar-accent/30 rounded px-1.5 py-0.5">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </SidebarMenuButton>
                            )}
                            {subItem.popular && (
                              <Star className="absolute right-1 top-1/2 -translate-y-1/2 size-3 text-yellow-400" />
                            )}
                          </div>
                        )
                      })}
                    </SidebarMenuSub>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <SidebarMenuButton
                    isActive={item.isActive}
                    asChild
                    tooltip={item.title}
                  >
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        {item.icon && <item.icon className="mr-2 size-4" />}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="ml-2 text-xs bg-sidebar-accent/30 rounded px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {item.popular && (
                    <Star className="absolute right-1 top-1/2 -translate-y-1/2 size-3 text-yellow-400" />
                  )}
                </div>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
