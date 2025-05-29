import { LucideIcon } from "lucide-react";

// User role types
export type UserRole = 'student' | 'admin' | 'consultant' | 'creator' | 'enterprise';

// User data interface
export interface UserData {
  name: string;
  email: string;
  avatar: string;
  role?: UserRole;
  notifications?: number;
}

// Navigation item types
export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items: NavSubItem[];
}

export interface NavSubItem {
  title: string;
  url: string;
}

export interface ProjectItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface TeamData {
  name: string;
  logo: LucideIcon;
  plan: string;
}

// Media types
export type MediaType = 'image' | 'video' | 'document' | 'other';

export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  fileSize: string;
  dimensions?: string;
  uploadDate: string;
  category?: string;
}

// Course types
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  status: CourseStatus;
  category: string;
  level: string;
  studentsCount: number;
  rating?: number;
  lastUpdated: string;
  progress?: number;
  revenue?: number;
} 