"use client";

import { useState, useEffect, useRef } from 'react';
import { BookOpen, CheckCircle, ChevronRight, Hash } from 'lucide-react';
import Link from 'next/link';

interface Section {
  id: string;
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4';
  isActive?: boolean;
}

interface CourseOutlineProps {
  sections: Section[];
  courseId?: string | number;
  className?: string;
}

export function CourseOutline({ sections, courseId, className = '' }: CourseOutlineProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Set up intersection observer to track which section is in view
  useEffect(() => {
    if (typeof window !== 'undefined' && sections.length > 0) {
      // Disconnect any existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Create a new IntersectionObserver
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Find the first visible section that's more than 50% visible
          const visibleEntry = entries.find(
            (entry) => entry.isIntersecting && entry.intersectionRatio > 0.5
          );
          
          if (visibleEntry) {
            setActiveSection(visibleEntry.target.id);
          } else if (entries.length > 0) {
            // If no section is sufficiently visible, use the one with the highest ratio
            const mostVisibleEntry = entries.reduce((prev, current) => 
              (prev.intersectionRatio > current.intersectionRatio) ? prev : current
            );
            
            if (mostVisibleEntry.intersectionRatio > 0) {
              setActiveSection(mostVisibleEntry.target.id);
            }
          }
        },
        {
          rootMargin: '-100px 0px -66%',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }
      );
      
      // Observe all section elements
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observerRef.current?.observe(element);
        }
      });
      
      // Clean up observer on unmount
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [sections]);
  
  // Handle scroll to section when clicking on a nav item
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Prevent the default hash behavior
      const yOffset = -100; // Account for fixed header if needed
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
  return (
    <div className={`${className} bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800`}>
      <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Course Outline
      </h3>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={
              section.level === 'h3' ? 'pl-4' : 
              section.level === 'h4' ? 'pl-6' : 
              section.level === 'h2' ? 'pl-2' : 'pl-0'
            }
          >
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick(section.id);
              }}
              className={`block py-1.5 px-2 rounded-md text-sm transition-colors ${
                activeSection === section.id 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2 mt-0.5">
                  {activeSection === section.id ? (
                    <ChevronRight className="h-3 w-3" />
                  ) : (
                    <Hash className="h-3 w-3 opacity-50" />
                  )}
                </div>
                <span>{section.text}</span>
              </div>
            </a>
          </div>
        ))}
      </nav>
      
      {sections.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          No outline available for this course.
        </p>
      )}
    </div>
  );
} 