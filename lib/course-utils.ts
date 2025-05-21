import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

const COURSE_DATA_DIR = path.join(process.cwd(), 'lib', 'course-data');

// Types to match the JSON structure
export interface CourseSectionContent {
  type: string;
  title: string;
  content: string;
  order: number;
  code: string | null;
  language: string | null;
  explanation: string | null;
}

export interface PracticeExercise {
  title: string;
  description: string;
  difficulty: string;
  starter_code: string;
  solution: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface RelatedTopic {
  id: string;
  title: string;
  relationship: string;
}

export interface CourseData {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description: string;
    keywords: string[];
    difficulty: string;
    prerequisites: string[];
    estimated_time: number;
    category: string;
    subcategory: string;
  };
  content_sections: CourseSectionContent[];
  practice_exercises: PracticeExercise[];
  related_topics: RelatedTopic[];
  quiz: QuizQuestion[];
  summary: string;
}

// Function to recursively find all JSON files in the course data directory
export async function getAllCourseFiles(): Promise<string[]> {
  const results: string[] = [];
  
  async function walk(dir: string) {
    try {
      const entries = await fsPromises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          results.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
  }
  
  await walk(COURSE_DATA_DIR);
  return results;
}

// Function to get course data by slug
export async function getCourseBySlug(slug: string): Promise<CourseData | null> {
  try {
    // Convert slug to potential paths
    const files = await getAllCourseFiles();
    
    for (const file of files) {
      try {
        const content = await fsPromises.readFile(file, 'utf8');
        const courseData = JSON.parse(content) as CourseData;
        
        if (courseData.slug === slug) {
          return courseData;
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error finding course with slug ${slug}:`, error);
  }
  
  return null;
}

// Function to get all courses with basic metadata
export async function getAllCoursesMetadata(): Promise<{
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  difficulty: string;
  description: string;
}[]> {
  try {
    const files = await getAllCourseFiles();
    const coursesMetadata = [];
    
    for (const file of files) {
      try {
        const content = await fsPromises.readFile(file, 'utf8');
        const courseData = JSON.parse(content) as CourseData;
        
        coursesMetadata.push({
          id: courseData.id,
          title: courseData.title,
          slug: courseData.slug,
          category: courseData.metadata.category,
          subcategory: courseData.metadata.subcategory,
          difficulty: courseData.metadata.difficulty,
          description: courseData.metadata.description,
        });
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }
    
    return coursesMetadata;
  } catch (error) {
    console.error('Error getting all courses metadata:', error);
    return [];
  }
}

// Function to get courses grouped by category
export async function getCoursesByCategory(): Promise<Record<string, any[]>> {
  try {
    const allCourses = await getAllCoursesMetadata();
    const coursesByCategory: Record<string, any[]> = {};
    
    for (const course of allCourses) {
      if (!coursesByCategory[course.category]) {
        coursesByCategory[course.category] = [];
      }
      coursesByCategory[course.category].push(course);
    }
    
    return coursesByCategory;
  } catch (error) {
    console.error('Error getting courses by category:', error);
    return {};
  }
} 