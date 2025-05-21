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

// Interface for individual course metadata
export interface CourseMetadata {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  difficulty: string;
  description: string;
}

// Interface for course in courses.json file
export interface CourseEntry {
  id: string;
  title: string;
  slug: string;
  category?: string;
  subcategory?: string;
  path?: string;
  difficulty?: string;
  estimated_time?: number;
  description?: string;
}

// Interface for courses.json file structure
export interface CoursesFile {
  category: string;
  courses_count: number;
  courses: CourseEntry[];
}

// Function to recursively find all JSON files in the course data directory
export async function getAllCourseFiles(): Promise<string[]> {
  const results: string[] = [];
  
  async function walk(dir: string) {
    try {
      const entries = await fsPromises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        // Skip node_modules directory and other non-course directories
        if (entry.isDirectory()) {
          // Skip node_modules and .git directories
          if (entry.name === 'node_modules' || entry.name === '.git') {
            continue;
          }
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          // Only include course-related JSON files
          // Skip non-course files like tsconfig.json, package.json, etc.
          const fileName = entry.name.toLowerCase();
          if (!fileName.includes('tsconfig') && 
              !fileName.includes('package-lock') && 
              !fileName.includes('package.json')) {
            results.push(fullPath);
          }
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
  if (!slug) return null;
  
  try {
    // First, get all the JSON files
    const files = await getAllCourseFiles();
    
    // Look for direct match in individual course files
    for (const file of files) {
      try {
        const content = await fsPromises.readFile(file, 'utf8');
        const data = JSON.parse(content);
        
        // Check if this is an individual course file with matching slug
        if (data.slug === slug && data.title && data.id) {
          console.log(`Found course with slug "${slug}" in file: ${file}`);
          return data as CourseData;
        }
        
        // Check if this is a courses.json file containing the course with this slug
        if (data.courses && Array.isArray(data.courses)) {
          // Look through the courses array for a matching slug
          const matchingCourse = data.courses.find((course: CourseEntry) => course.slug === slug);
          
          if (matchingCourse) {
            console.log(`Found course with slug "${slug}" in courses.json: ${file}`);
            
            // If matching course has a path, try to load the full content
            if (matchingCourse.path) {
              // Resolve the path relative to the course-data directory
              const coursePath = path.join(COURSE_DATA_DIR, matchingCourse.path);
              console.log(`Loading full course data from: ${coursePath}`);
              
              try {
                const courseContent = await fsPromises.readFile(coursePath, 'utf8');
                const fullCourseData = JSON.parse(courseContent) as CourseData;
                return fullCourseData;
              } catch (pathError) {
                console.error(`Error loading course from path ${matchingCourse.path}:`, pathError);
                // If we can't load from path, return the basic course entry as backup
                return {
                  id: matchingCourse.id,
                  title: matchingCourse.title,
                  slug: matchingCourse.slug,
                  metadata: {
                    description: matchingCourse.description || `Learn about ${matchingCourse.title}`,
                    keywords: [],
                    difficulty: matchingCourse.difficulty || 'beginner',
                    prerequisites: [],
                    estimated_time: matchingCourse.estimated_time || 5,
                    category: matchingCourse.category || data.category || '',
                    subcategory: matchingCourse.subcategory || '',
                  },
                  content_sections: [],
                  practice_exercises: [],
                  related_topics: [],
                  quiz: [],
                  summary: `This is a tutorial about ${matchingCourse.title}.`
                };
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
    
    // If we get here, no course was found
    console.error(`No course found with slug: ${slug}`);
    return null;
  } catch (error) {
    console.error(`Error finding course with slug ${slug}:`, error);
    return null;
  }
}

// Function to get all courses with basic metadata
export async function getAllCoursesMetadata(): Promise<CourseMetadata[]> {
  try {
    const files = await getAllCourseFiles();
    const coursesMetadata: CourseMetadata[] = [];
    
    for (const file of files) {
      try {
        const content = await fsPromises.readFile(file, 'utf8');
        
        // More robust JSON parsing
        let courseData;
        try {
          courseData = JSON.parse(content);
        } catch (parseError) {
          console.error(`Error parsing JSON in file ${file}:`, parseError);
          continue; // Skip this file if JSON parsing fails
        }
        
        // Extract folder name as fallback category from path
        const pathParts = file.split('/');
        const dirName = pathParts[pathParts.length - 2] || "";
        const rootDirName = file.includes('/lib/course-data/') ? 
          file.split('/lib/course-data/')[1]?.split('/')[0] || "" : "";
        
        // Handle both formats:
        // 1. Individual course files with metadata property
        // 2. Directory-level courses.json files that have direct properties
        const metadata = courseData.metadata || {}; // Default to empty object if no metadata
        
        // Detect if this is a courses.json file listing multiple courses
        if (courseData.courses && Array.isArray(courseData.courses)) {
          // This is a directory-level courses.json file
          // Process each course in the array
          courseData.courses.forEach((course: CourseEntry) => {
            if (course && course.id && course.title) {
              coursesMetadata.push({
                id: course.id,
                title: course.title,
                slug: course.slug || "",
                category: course.category || courseData.category || rootDirName,
                subcategory: course.subcategory || "",
                difficulty: course.difficulty || "beginner",
                description: course.description || `Learn about ${course.title}`,
              });
            }
          });
        } else if (courseData.id && courseData.title) { // Make sure we have the minimum required fields
          // This is an individual course file
          coursesMetadata.push({
            id: courseData.id,
            title: courseData.title,
            slug: courseData.slug || "",
            category: metadata.category || courseData.category || rootDirName,
            subcategory: metadata.subcategory || courseData.subcategory || dirName,
            difficulty: metadata.difficulty || courseData.difficulty || "beginner",
            description: metadata.description || courseData.description || `Learn about ${courseData.title}`,
          });
        }
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
export async function getCoursesByCategory(): Promise<Record<string, CourseMetadata[]>> {
  try {
    const allCourses = await getAllCoursesMetadata();
    const coursesByCategory: Record<string, CourseMetadata[]> = {};
    
    for (const course of allCourses) {
      if (!course.category) continue;
      
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