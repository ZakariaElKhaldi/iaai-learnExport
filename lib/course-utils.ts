import path from 'path';
import { promises as fsPromises } from 'fs';

const COURSE_DATA_DIR = path.join(process.cwd(), 'lib', 'course-data');

// Types to match the JSON structure from processed data
export interface ContentItem {
  type: string;
  metadata?: any;
  text?: string;
  html?: string;
  level?: string;
  code?: string;
  code_html?: string;
  language?: string;
  tryItLink?: string;
  data?: any[][];
  options?: { text: string; value: string }[];
  question?: string;
  colorValue?: string;
  backgroundColor?: string;
  link?: string;
  buttonText?: string;
}

export interface ProcessedCourseData {
  title: string;
  url: string;
  metadata: Record<string, string>;
  content: ContentItem[];
}

// Original types for backward compatibility
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
  
  // New fields for processed data
  url?: string;
  content?: ContentItem[];
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
  original_category?: string;
  main_category?: string;
  subcategory_id?: string;
  url?: string;
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

// Interface for the unified courses data structure
export interface UnifiedSubcategory {
  id: string;
  name: string;
  courses: CourseMetadata[];
}

export interface UnifiedMainCategory {
  id: string;
  name: string;
  subcategories: UnifiedSubcategory[];
  courses_count: number;
}

export interface UnifiedCoursesData {
  total_categories: number;
  total_courses: number;
  categories: string[];
  main_categories: UnifiedMainCategory[];
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

// Function to get all categories from the directory structure
export async function getAllCategories(): Promise<string[]> {
  try {
    const entries = await fsPromises.readdir(COURSE_DATA_DIR, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && !['node_modules', '.git', 'metadata'].includes(entry.name))
      .map(dir => dir.name);
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// Function to generate a slug from a filename
function generateSlugFromFilename(filename: string): string {
  // Remove extension and convert to lowercase
  return filename.replace('.json', '').toLowerCase();
}

// Function to get course data by slug
export async function getCourseBySlug(slug: string): Promise<CourseData | null> {
  if (!slug) return null;
  
  try {
    // Get all categories
    const categories = await getAllCategories();
    console.log(`Searching for course with slug "${slug}" in ${categories.length} categories`);
    
    // Search in each category directory
    for (const category of categories) {
      try {
        const categoryDir = path.join(COURSE_DATA_DIR, category);
        const files = await fsPromises.readdir(categoryDir);
        
        // Find a file that matches the slug
        for (const file of files) {
          if (file.endsWith('.json')) {
            const fileSlug = generateSlugFromFilename(file);
            
            if (fileSlug === slug.toLowerCase()) {
              const filePath = path.join(categoryDir, file);
              console.log(`Found matching file at ${filePath}`);
              
              const content = await fsPromises.readFile(filePath, 'utf8');
              let processedData;
              
              try {
                processedData = JSON.parse(content) as ProcessedCourseData;
                console.log(`Successfully parsed JSON for ${slug}`);
                
                // Log content structure for debugging
                if (processedData.content) {
                  console.log(`Content array length: ${processedData.content.length}`);
                  // Log the types of content items
                  const contentTypes = processedData.content.map(item => item.type);
                  console.log(`Content types: ${contentTypes.join(', ')}`);
                  
                  // Check for any potential problematic items
                  const problemItems = processedData.content.filter(item => 
                    !item || !item.type || (item.type === 'header' && !item.html && !item.text) ||
                    (item.type === 'text' && !item.html && !item.text)
                  );
                  
                  if (problemItems.length > 0) {
                    console.warn(`Found ${problemItems.length} potentially problematic content items`);
                    console.warn('First problematic item:', JSON.stringify(problemItems[0]).substring(0, 200) + '...');
                  }
                } else {
                  console.warn(`No content array found in ${slug}`);
                }
              } catch (parseError) {
                console.error(`Error parsing JSON from ${filePath}:`, parseError);
                continue;
              }
              
              // Convert from processed format to CourseData format
              const courseData: CourseData = {
                id: slug,
                title: processedData.title,
                slug: slug,
                url: processedData.url,
                content: processedData.content,
                metadata: {
                  description: processedData.metadata?.Description || `Learn about ${processedData.title}`,
                  keywords: processedData.metadata?.Keywords?.split(',').map(k => k.trim()) || [],
                  difficulty: 'beginner',
                  prerequisites: [],
                  estimated_time: 10,
                  category: category,
                  subcategory: ''
                },
                content_sections: [],
                practice_exercises: [],
                related_topics: [],
                quiz: [],
                summary: `This is a tutorial about ${processedData.title}.`
              };
              
              return courseData;
            }
          }
        }
      } catch (error) {
        console.error(`Error searching in category ${category}:`, error);
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
    const categories = await getAllCategories();
    const allCourses: CourseMetadata[] = [];
    
    for (const category of categories) {
      try {
        const categoryDir = path.join(COURSE_DATA_DIR, category);
        const files = await fsPromises.readdir(categoryDir);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            try {
              const filePath = path.join(categoryDir, file);
              const content = await fsPromises.readFile(filePath, 'utf8');
              const processedData = JSON.parse(content) as ProcessedCourseData;
              
              const slug = generateSlugFromFilename(file);
              
              allCourses.push({
                id: slug,
                title: processedData.title,
                slug: slug,
                category: category,
                subcategory: '',
                difficulty: 'beginner',
                description: processedData.metadata?.Description || `Learn about ${processedData.title}`,
                url: processedData.url
              });
            } catch (error) {
              console.error(`Error processing file ${file}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Error reading category ${category}:`, error);
      }
    }
    
    return allCourses;
  } catch (error) {
    console.error('Error getting all courses metadata:', error);
    return [];
  }
}

// Function to get courses by category
export async function getCoursesByCategory(): Promise<Record<string, CourseMetadata[]>> {
  try {
    const courses = await getAllCoursesMetadata();
    const coursesByCategory: Record<string, CourseMetadata[]> = {};
    
    for (const course of courses) {
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

// Generate a unified courses data structure
export async function generateUnifiedCoursesData(): Promise<UnifiedCoursesData> {
  try {
    const coursesByCategory = await getCoursesByCategory();
    
    const mainCategories: UnifiedMainCategory[] = Object.entries(coursesByCategory).map(([category, courses]) => {
      return {
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: category.charAt(0).toUpperCase() + category.slice(1),
        subcategories: [
          {
            id: category.toLowerCase().replace(/\s+/g, '-'),
            name: category.charAt(0).toUpperCase() + category.slice(1),
            courses: courses
          }
        ],
        courses_count: courses.length
      };
    });
    
    const totalCourses = mainCategories.reduce((total, category) => total + category.courses_count, 0);
    
    return {
      total_categories: mainCategories.length,
      total_courses: totalCourses,
      categories: mainCategories.map(cat => cat.name),
      main_categories: mainCategories
    };
  } catch (error) {
    console.error('Error generating unified courses data:', error);
    return {
      total_categories: 0,
      total_courses: 0,
      categories: [],
      main_categories: []
    };
  }
} 