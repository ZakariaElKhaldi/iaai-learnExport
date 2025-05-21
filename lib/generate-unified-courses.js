import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define course categorization mapping
const COURSE_CATEGORIES = {
  // Web Development
  "web_development": "Web Development",
  "web_templates": "Web Development",
  "learnhtml": "Web Development",
  "learncss": "Web Development",
  "learnjavascript": "Web Development",
  "learnajax": "Web Development",
  "learncolors": "Web Development",
  "learncharacter_sets": "Web Development",
  "learnicons": "Web Development",
  "learnrwd": "Web Development",
  "learnsvg": "Web Development",
  "learncanvas": "Web Development", 
  "learngraphics": "Web Development",
  "learnw3_css": "Web Development",
  "learnw3_js": "Web Development",
  "learnxml": "Web Development",
  "accessibility": "Web Development",

  // Frontend Frameworks
  "learnangularjs": "Frontend Frameworks",
  "learnbootstrap": "Frontend Frameworks",
  "learnsass": "Frontend Frameworks",
  "learnreact": "Frontend Frameworks",
  "learnvue": "Frontend Frameworks",
  "learnjquery": "Frontend Frameworks",
  "learntypescript": "Frontend Frameworks",
  "learnappml": "Frontend Frameworks", // Moving AppML to Frontend Frameworks

  // Backend Development
  "learnphp": "Backend Development",
  "learnnode_js": "Backend Development",
  "learnasp": "Backend Development",
  "learnbash": "Backend Development",
  "create_a_servernew": "Backend Development",
  "create_a_websitehot": "Backend Development",
  "code_editor": "Backend Development",

  // Programming Languages
  "learnpython": "Python",
  "learndjango": "Python", // Moving Django to Python category
  "learnpandas": "Python",
  "learnnumpy": "Python",
  "learnmatplotlib": "Python",
  "learnscipy": "Python",
  
  "learnjava": "Java",
  
  "learnc": "C Language",
  
  "learngo": "Go",
  
  "learnrust": "Other Programming Languages",
  "learnkotlin": "Other Programming Languages",
  
  // Data & Databases
  "learnsql": "Databases",
  "learnmysql": "Databases",
  "learnpostgresql": "Databases",
  "learnmongodb": "Databases",

  // Data Science
  "learndata_science": "Data Science & ML",
  "learnmachine_learning": "Data Science & ML",
  "learnai": "Data Science & ML",
  "learnchatgpt_3_5": "Data Science & ML",
  "learnchatgpt_4": "Data Science & ML",
  "learngenerative_ai": "Data Science & ML",
  "learngoogle_bard": "Data Science & ML",
  "learnstatistics": "Data Science & ML",
  "learnr": "Data Science & ML",

  // Tools & Utilities
  "learngit": "Development Tools",
  "learnjson": "Development Tools",
  "learndsa": "Development Tools",
  
  // Office & Productivity
  "learnexcel": "Office & Productivity",
  "learngoogle_sheets": "Office & Productivity",
  "learnraspberry_pi": "Office & Productivity",
  
  // Learning Resources
  "introduction_to_programming": "Learning Resources",
  "learnhow_to": "Learning Resources",
  "test_your_typing_speed": "Learning Resources",
  "join_our_newsletter": "Learning Resources",
  "play_a_code_game": "Learning Resources",
  "web_statistics": "Learning Resources",
  "web_certificates": "Learning Resources",
  "where_to_start": "Learning Resources",
  
  // Security
  "cyber_security": "Cyber Security"
};

// Define subcategories structure
const SUBCATEGORIES = {
  "Web Development": [
    { id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
    { id: "javascript", name: "JavaScript" },
    { id: "responsive", name: "Responsive Design" },
    { id: "web-graphics", name: "Web Graphics & Design" },
    { id: "accessibility", name: "Accessibility" },
  ],
  "Frontend Frameworks": [
    { id: "react", name: "React" },
    { id: "vue", name: "Vue.js" },
    { id: "angular", name: "Angular" },
    { id: "jquery", name: "jQuery" },
    { id: "bootstrap", name: "Bootstrap" },
    { id: "typescript", name: "TypeScript" },
    { id: "sass", name: "SASS/SCSS" },
    { id: "appml", name: "AppML" }
  ],
  "Backend Development": [
    { id: "php", name: "PHP" },
    { id: "node", name: "Node.js" },
    { id: "asp", name: "ASP.NET" },
    { id: "bash", name: "Bash & Shell" },
    { id: "server", name: "Server Setup" }
  ],
  "Python": [
    { id: "python-basics", name: "Python Basics" },
    { id: "django", name: "Django" },
    { id: "python-data", name: "Python Data Libraries" }
  ],
  "Java": [
    { id: "java-basics", name: "Java Basics" },
    { id: "java-advanced", name: "Advanced Java" }
  ],
  "C Language": [
    { id: "c-basics", name: "C Basics" },
    { id: "cpp", name: "C++" },
    { id: "csharp", name: "C#" }
  ],
  "Go": [
    { id: "go-basics", name: "Go Basics" },
    { id: "go-advanced", name: "Advanced Go" }
  ],
  "Other Programming Languages": [
    { id: "rust", name: "Rust" },
    { id: "kotlin", name: "Kotlin" }
  ],
  "Databases": [
    { id: "sql", name: "SQL" },
    { id: "mysql", name: "MySQL" },
    { id: "postgresql", name: "PostgreSQL" },
    { id: "mongodb", name: "MongoDB" }
  ],
  "Data Science & ML": [
    { id: "data-science", name: "Data Science" },
    { id: "machine-learning", name: "Machine Learning" },
    { id: "ai", name: "Artificial Intelligence" },
    { id: "statistics", name: "Statistics" }
  ],
  "Development Tools": [
    { id: "git", name: "Git & Version Control" },
    { id: "json", name: "JSON" },
    { id: "dsa", name: "Data Structures & Algorithms" }
  ],
  "Office & Productivity": [
    { id: "excel", name: "Excel" },
    { id: "google-sheets", name: "Google Sheets" },
    { id: "raspberry-pi", name: "Raspberry Pi" }
  ],
  "Learning Resources": [
    { id: "introduction", name: "Introduction to Programming" },
    { id: "how-to", name: "How-To Guides" },
    { id: "tools", name: "Learning Tools" }
  ],
  "Cyber Security": [
    { id: "security-basics", name: "Security Basics" },
    { id: "advanced-security", name: "Advanced Security" }
  ]
};

// Function to determine the correct subcategory for a course
function getSubcategoryId(course, originalCategory, mainCategory) {
  const title = (course.title || '').toLowerCase();
  const subcategory = (course.subcategory || '').toLowerCase();
  
  // First check for specific mappings based on original category
  if (originalCategory === 'learnc') {
    if (title.includes('c#') || subcategory.includes('c#') || 
        title.includes('csharp') || subcategory.includes('csharp')) {
      return 'csharp';
    }
    if (title.includes('c++') || subcategory.includes('c++') || 
        title.includes('cpp') || subcategory.includes('cpp')) {
      return 'cpp';
    }
    return 'c-basics';
  }
  
  if (originalCategory === 'learnpython') {
    if (title.includes('django') || subcategory.includes('django')) {
      return 'django';
    }
    if (title.includes('pandas') || title.includes('numpy') || 
        title.includes('matplotlib') || title.includes('scipy') ||
        subcategory.includes('pandas') || subcategory.includes('numpy') ||
        subcategory.includes('matplotlib') || subcategory.includes('scipy')) {
      return 'python-data';
    }
    return 'python-basics';
  }
  
  // For other categories, try to match with available subcategories
  const subcategories = SUBCATEGORIES[mainCategory] || [];
  
  for (const sub of subcategories) {
    const subName = sub.name.toLowerCase();
    const subId = sub.id.toLowerCase();
    
    // Try to match by subcategory name
    if (title.includes(subName) || subcategory.includes(subName) || 
        title.includes(subId) || subcategory.includes(subId) ||
        originalCategory.toLowerCase().includes(subId)) {
      return sub.id;
    }
  }
  
  // Default to first subcategory if no match
  return subcategories.length > 0 ? subcategories[0].id : null;
}

// Main function to read all courses and create unified JSON
async function generateUnifiedCoursesFile() {
  const coursesDataDir = path.join(path.dirname(__dirname), 'lib', 'course-data');
  
  // First, read the processing_stats.json to get all categories
  const statsPath = path.join(coursesDataDir, 'processing_stats.json');
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  
  // Initialize the unified course data structure
  const unifiedCourseData = {
    total_categories: 0,
    total_courses: 0,
    categories: [],
    main_categories: []
  };
  
  // Create a map of main categories with their subcategories
  const mainCategoriesMap = {};
  Object.keys(SUBCATEGORIES).forEach(mainCategory => {
    mainCategoriesMap[mainCategory] = {
      id: mainCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: mainCategory,
      subcategories: SUBCATEGORIES[mainCategory].map(sub => ({
        id: sub.id,
        name: sub.name,
        courses: []
      })),
      courses_count: 0
    };
  });
  
  // Process each category directory
  for (const category of stats.categories) {
    const categoryName = category.name;
    const categoryPath = path.join(coursesDataDir, categoryName);
    const coursesJsonPath = path.join(categoryPath, 'courses.json');
    
    // Skip if directory doesn't exist or courses.json doesn't exist
    if (!fs.existsSync(categoryPath) || !fs.existsSync(coursesJsonPath)) {
      continue;
    }
    
    try {
      const courseData = JSON.parse(fs.readFileSync(coursesJsonPath, 'utf8'));
      const mainCategory = COURSE_CATEGORIES[categoryName] || 'Learning Resources'; // Default to Learning Resources
      const mainCategoryObj = mainCategoriesMap[mainCategory];
      
      if (!mainCategoryObj) {
        console.warn(`Main category not found for ${categoryName}. Using Learning Resources.`);
        continue;
      }
      
      // Process each course
      (courseData.courses || []).forEach(course => {
        const subcategoryId = getSubcategoryId(course, categoryName, mainCategory);
        const subcategory = mainCategoryObj.subcategories.find(sub => sub.id === subcategoryId);
        
        if (subcategory) {
          subcategory.courses.push({
            ...course,
            original_category: categoryName,
            main_category: mainCategory,
            subcategory_id: subcategoryId
          });
        }
        
        // Increment counts
        mainCategoryObj.courses_count++;
      });
    } catch (error) {
      console.error(`Error processing ${categoryName}/courses.json:`, error);
    }
  }
  
  // Convert the map to an array and calculate totals
  const mainCategories = Object.values(mainCategoriesMap);
  const totalCourses = mainCategories.reduce((total, cat) => total + cat.courses_count, 0);
  
  // Create the final data structure
  unifiedCourseData.total_categories = mainCategories.length;
  unifiedCourseData.total_courses = totalCourses;
  unifiedCourseData.main_categories = mainCategories;
  
  // Write the file
  const outputPath = path.join(coursesDataDir, 'unified_courses.json');
  fs.writeFileSync(outputPath, JSON.stringify(unifiedCourseData, null, 2));
  
  console.log(`Generated unified courses file at ${outputPath}`);
  console.log(`Total main categories: ${unifiedCourseData.total_categories}`);
  console.log(`Total courses: ${unifiedCourseData.total_courses}`);
}

// Run the script
generateUnifiedCoursesFile().catch(err => {
  console.error('Error generating unified courses:', err);
  process.exit(1);
}); 