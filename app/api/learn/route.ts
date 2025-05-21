import { NextResponse } from 'next/server';
import { getCoursesByCategory, CourseMetadata, getUnifiedCoursesData } from '@/lib/course-utils';

// Define types for our data structure
type Tutorial = {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    level: string;
    popular: boolean;
    category: string;
    subcategoryId?: string;
};

type SubCategory = {
    id: string;
    name: string;
    icon: string;
    tutorials: Tutorial[];
    tutorialCount?: number;
}

type MainTopicResponse = {
    id: string;
    name: string;
    description: string;
    icon: string;
    tutorialCount: number;
    tutorials: Tutorial[];
    difficulty: string;
    color?: string;
    subCategories: SubCategory[];
};

// Configuration for Main Topics and keyword mapping
const mainTopicConfigurations = [
    {
        id: "web-development",
        name: "Web Development",
        keywords: ["html", "css", "javascript", "react", "angular", "vue", "jquery", "bootstrap", "sass", 
                   "typescript", "web", "web design", "web building", "website", "ajax", "rwd", "canvas", 
                   "graphics", "icons", "xml", "svg", "w3", "learnw3", "colors", "character_sets", "learnhtml",
                   "learncss", "learnjavascript", "learnajax", "learnangularjs", "learnbootstrap", "learnjquery",
                   "learnreact", "learnsvg", "learntypescript", "learnvue", "learnicons", "learncolors", "asp", "learnasp"],
        description: "Learn everything about building modern websites and web applications, from HTML basics to advanced JavaScript frameworks.",
        icon: "Globe",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "html-css-basics", name: "HTML & CSS Basics", icon: "Code" },
            { id: "javascript", name: "JavaScript", icon: "FileCode" },
            { id: "frontend-frameworks", name: "Frontend Frameworks", icon: "Layers" },
            { id: "web-design", name: "Web Design", icon: "PenTool" }
        ]
    },
    {
        id: "c-programming-family",
        name: "C Programming Family",
        keywords: ["c", "c++", "c#", "objective-c", "objective c", "learnc"],
        description: "Master the C-family of languages, from fundamental C programming to object-oriented C++ and C#.",
        icon: "Terminal",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "c-basics", name: "C Basics", icon: "Code" },
            { id: "cpp", name: "C++", icon: "GitBranch" },
            { id: "csharp", name: "C#", icon: "Hash" }
        ]
    },
    {
        id: "cyber-security",
        name: "Cyber Security",
        keywords: ["cyber security", "cybersecurity", "ethical hacking", "network security", "cyber_security"],
        description: "Understand the principles of cyber security, protect systems, and learn about ethical hacking techniques.",
        icon: "Shield",
        difficulty: "Intermediate to Advanced",
        subCategories: [
            { id: "security-basics", name: "Security Basics", icon: "Lock" },
            { id: "ethical-hacking", name: "Ethical Hacking", icon: "Zap" },
            { id: "network-security", name: "Network Security", icon: "Network" }
        ]
    },
    {
        id: "python-programming",
        name: "Python Programming",
        keywords: ["python", "django", "flask", "pandas", "numpy", "matplotlib", "scipy", "learnpython", 
                  "learnnumpy", "learnmatplotlib", "learnpandas", "learnscipy", "learndjango"],
        description: "Explore Python for web development, data science, machine learning, and more.",
        icon: "FileCode",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "python-basics", name: "Python Basics", icon: "Code" },
            { id: "python-data-science", name: "Python for Data Science", icon: "BarChart" },
            { id: "python-web", name: "Web Development with Python", icon: "Globe" },
            { id: "python-automation", name: "Automation with Python", icon: "Workflow" }
        ]
    },
    {
        id: "java-programming",
        name: "Java Programming",
        keywords: ["java", "spring", "jsp", "learnjava"],
        description: "Dive into Java for enterprise applications, Android development, and large-scale systems.",
        icon: "Coffee",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "java-basics", name: "Java Basics", icon: "Code" },
            { id: "java-enterprise", name: "Java Enterprise", icon: "Building" },
            { id: "android-dev", name: "Android Development", icon: "Smartphone" }
        ]
    },
    {
        id: "data-science-ml",
        name: "Data Science & ML",
        keywords: ["data science", "machine learning", "artificial intelligence", "ai", "statistics", "r programming",
                   "deep learning", "tensorflow", "keras", "pytorch", "data", "learndata_science", "learnai",
                   "learnmachine_learning", "learnr", "learnchatgpt", "learngenerative_ai", "learngoogle_bard",
                   "learnstatistics"],
        description: "Unlock insights from data and build intelligent systems with machine learning and AI techniques.",
        icon: "Brain",
        difficulty: "Intermediate to Advanced",
        subCategories: [
            { id: "statistics-fundamentals", name: "Statistical Fundamentals", icon: "PieChart" },
            { id: "ml-basics", name: "Machine Learning Basics", icon: "Network" },
            { id: "deep-learning", name: "Deep Learning", icon: "Layers" },
            { id: "generative-ai", name: "Generative AI", icon: "Sparkles" }
        ]
    },
    {
        id: "databases",
        name: "Databases",
        keywords: ["sql", "mysql", "postgresql", "mongodb", "nosql", "database", "learnsql", "learnmysql",
                   "learnpostgresql", "learnmongodb"],
        description: "Learn to design, manage, and query various types of databases, both SQL and NoSQL.",
        icon: "Database",
        difficulty: "Beginner to Intermediate",
        subCategories: [
            { id: "sql-databases", name: "SQL Databases", icon: "Table" },
            { id: "nosql-databases", name: "NoSQL Databases", icon: "FileJson" },
            { id: "database-design", name: "Database Design", icon: "Workflow" }
        ]
    },
    {
        id: "php-programming",
        name: "PHP Programming",
        keywords: ["php", "laravel", "symfony", "wordpress", "learnphp"],
        description: "Develop dynamic websites and web applications using PHP and popular frameworks like Laravel.",
        icon: "FileCode",
        difficulty: "Beginner to Intermediate",
        subCategories: [
            { id: "php-basics", name: "PHP Basics", icon: "Code" },
            { id: "php-frameworks", name: "PHP Frameworks", icon: "Layers" },
            { id: "wordpress-dev", name: "WordPress Development", icon: "Edit" }
        ]
    },
    {
        id: "backend-and-tools",
        name: "Backend & Development Tools",
        keywords: ["node", "node.js", "git", "bash", "server", "learnnode_js", "learngit", "learnbash", 
                   "create_a_server", "code_editor", "learnapp"],
        description: "Master backend technologies and essential development tools for modern applications.",
        icon: "Server",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "nodejs", name: "Node.js", icon: "FileJson" },
            { id: "version-control", name: "Version Control", icon: "GitBranch" },
            { id: "devops", name: "DevOps & Deployment", icon: "Rocket" }
        ]
    },
    {
        id: "other-languages",
        name: "Other Programming Languages",
        keywords: ["go", "rust", "kotlin", "learngo", "learnrust", "learnkotlin", "learndsa", "json", "learnjson"],
        description: "Explore other modern programming languages used in various development scenarios.",
        icon: "Code",
        difficulty: "Beginner to Advanced",
        subCategories: [
            { id: "go", name: "Go Programming", icon: "FileCode" },
            { id: "rust", name: "Rust Programming", icon: "FileCode" },
            { id: "mobile-dev", name: "Mobile Development", icon: "Smartphone" }
        ]
    },
    {
        id: "productivity-tools",
        name: "Productivity & Office Tools",
        keywords: ["excel", "google sheets", "learnexcel", "learngoogle_sheets", "learnraspberry_pi"],
        description: "Learn essential productivity tools for business and data analysis.",
        icon: "FileSpreadsheet",
        difficulty: "Beginner to Intermediate",
        subCategories: [
            { id: "spreadsheets", name: "Spreadsheets", icon: "Table" },
            { id: "office-suite", name: "Office Suite", icon: "FileText" },
            { id: "productivity-apps", name: "Productivity Apps", icon: "Calendar" }
        ]
    },
    {
        id: "learning-resources",
        name: "Learning Resources",
        keywords: ["how_to", "learnhow_to", "test_your_typing_speed", "certification", "quiz", "exercises", 
                  "study_plan", "introduction", "newsletter", "join_our_newsletter"],
        description: "Various learning resources, tutorials, and skill development tools.",
        icon: "GraduationCap",
        difficulty: "All Levels",
        subCategories: [
            { id: "exercises", name: "Practice Exercises", icon: "Dumbbell" },
            { id: "quizzes", name: "Quizzes", icon: "CheckCircle" },
            { id: "certification", name: "Certifications", icon: "Award" },
            { id: "learning-paths", name: "Learning Paths", icon: "Route" }
        ]
    }
];

// Cache for categories to reduce repeated log messages
const mappedCategories = new Set<string>();

// Helper function to assign a tutorial to a subcategory based on keywords
function assignToSubcategory(tutorialTitle: string, categoryName: string, mainTopic: MainTopicResponse) {
    // Default to the first subcategory if no match is found
    const targetSubcategory = mainTopic.subCategories[0];
    
    const titleLower = tutorialTitle.toLowerCase();
    const categoryLower = categoryName.toLowerCase();
    
    // Special case mappings for specific categories/courses
    
    // C Programming Family
    if (mainTopic.id === "c-programming-family") {
        if (titleLower.includes("c++") || titleLower.includes("cpp") || categoryLower.includes("cpp")) {
            return mainTopic.subCategories.find(sc => sc.id === "cpp")?.id || targetSubcategory.id;
        }
        if (titleLower.includes("c#") || titleLower.includes("csharp") || titleLower.includes("c sharp") || 
            categoryLower.includes("csharp") || categoryLower.includes("c#")) {
            return mainTopic.subCategories.find(sc => sc.id === "csharp")?.id || targetSubcategory.id;
        }
        // If it doesn't match C++ or C#, it's likely basic C
        return mainTopic.subCategories.find(sc => sc.id === "c-basics")?.id || targetSubcategory.id;
    }
    
    // Python Programming
    if (mainTopic.id === "python-programming") {
        if (titleLower.includes("django") || categoryLower.includes("django")) {
            return mainTopic.subCategories.find(sc => sc.id === "python-web")?.id || targetSubcategory.id;
        }
        if (titleLower.includes("data") || titleLower.includes("pandas") || 
            titleLower.includes("numpy") || titleLower.includes("matplotlib") || 
            categoryLower.includes("data") || categoryLower.includes("pandas") || 
            categoryLower.includes("numpy") || categoryLower.includes("matplotlib")) {
            return mainTopic.subCategories.find(sc => sc.id === "python-data-science")?.id || targetSubcategory.id;
        }
        if (titleLower.includes("automat") || titleLower.includes("script") || 
            categoryLower.includes("automat") || categoryLower.includes("script")) {
            return mainTopic.subCategories.find(sc => sc.id === "python-automation")?.id || targetSubcategory.id;
        }
        return mainTopic.subCategories.find(sc => sc.id === "python-basics")?.id || targetSubcategory.id;
    }
    
    // Data Science & ML
    if (mainTopic.id === "data-science-ml") {
        if (titleLower.includes("statistic") || categoryLower.includes("statistic")) {
            return mainTopic.subCategories.find(sc => sc.id === "statistics-fundamentals")?.id || targetSubcategory.id;
        }
        if (titleLower.includes("deep") || titleLower.includes("neural") || 
            categoryLower.includes("deep") || categoryLower.includes("neural")) {
            return mainTopic.subCategories.find(sc => sc.id === "deep-learning")?.id || targetSubcategory.id;
        }
        if (titleLower.includes("generate") || titleLower.includes("generative") || 
            titleLower.includes("gpt") || titleLower.includes("chatgpt") || 
            titleLower.includes("bard") || categoryLower.includes("generative") || 
            categoryLower.includes("gpt") || categoryLower.includes("chatgpt") || 
            categoryLower.includes("bard")) {
            return mainTopic.subCategories.find(sc => sc.id === "generative-ai")?.id || targetSubcategory.id;
        }
        return mainTopic.subCategories.find(sc => sc.id === "ml-basics")?.id || targetSubcategory.id;
    }
    
    // For other categories, match keywords in the title or category
    for (const subCat of mainTopic.subCategories) {
        const subCategoryId = subCat.id;
        const nameParts = subCat.name.toLowerCase().split(/[\s-&]+/); // Split by spaces, dashes, or ampersand
        
        // Check if any part of the subcategory name exists in the title or category
        for (const part of nameParts) {
            if (part.length > 3 && (titleLower.includes(part) || categoryLower.includes(part))) { // Only check parts with decent length
                return subCategoryId;
            }
        }
    }
    
    // Default to first subcategory if no match
    return targetSubcategory.id;
}

function isPopularCourse(course: CourseMetadata, category: string): boolean {
    const popularCourses: { [key: string]: string[] } = {
        "web-development": [
            "html", "css", "javascript", "responsive", "bootstrap"
        ],
        "python-programming": [
            "python basics", "python intro", "introduction to python", "django"
        ],
        "java-programming": [
            "java intro", "introduction to java", "java basics"
        ],
        "data-science-ml": [
            "machine learning intro", "introduction to data science", "statistics intro"
        ],
        "databases": [
            "sql basics", "mysql", "nosql"
        ],
        "c-programming-family": [
            "c basics", "c++ intro", "c# basics"
        ],
    };
    
    // If the title contains certain popular terms for the category
    const title = course.title.toLowerCase();
    const relevantPopularTerms = popularCourses[category] || [];
    
    if (relevantPopularTerms.some(term => title.includes(term))) {
        return true;
    }
    
    // If it's a beginner level course in a core technology
    if (course.difficulty?.toLowerCase().includes('beginner') && 
        (title.includes('intro') || title.includes('basic') || title.includes('fundamental'))) {
        return true;
    }
    
    // Default to not popular
    return false;
}

export async function GET() {
    try {
        // First attempt to use the unified courses data
        const unifiedData = await getUnifiedCoursesData();
        
        if (unifiedData) {
            // Process unified data
            const mainTopicsResponse: MainTopicResponse[] = [];
            
            for (const mainConfig of mainTopicConfigurations) {
                // Find corresponding category in unified data
                const unifiedCategory = unifiedData.main_categories.find(cat => {
                    // Match by name (case-insensitive)
                    return cat.name.toLowerCase() === mainConfig.name.toLowerCase();
                });
                
                if (unifiedCategory) {
                    // Create response object for this category
                    const mainTopicResponse: MainTopicResponse = {
                        id: mainConfig.id,
                        name: mainConfig.name,
                        description: mainConfig.description,
                        icon: mainConfig.icon,
                        difficulty: mainConfig.difficulty,
                        color: getColorForCategory(mainConfig.name),
                        tutorialCount: unifiedCategory.courses_count,
                        tutorials: [],
                        subCategories: []
                    };
                    
                    // Initialize subcategories from config
                    mainTopicResponse.subCategories = mainConfig.subCategories.map(sc => ({
                        id: sc.id,
                        name: sc.name,
                        icon: sc.icon || getIconForCategory(sc.name),
                        tutorials: [],
                        tutorialCount: 0
                    }));
                    
                    // Process courses from unified subcategories
                    for (const unifiedSubcat of unifiedCategory.subcategories) {
                        // Find matching subcategory in our configuration
                        let targetSubcat = mainTopicResponse.subCategories.find(
                            sc => sc.id.toLowerCase() === unifiedSubcat.id.toLowerCase()
                        );
                        
                        // If no exact match, create a new subcategory
                        if (!targetSubcat) {
                            targetSubcat = {
                                id: unifiedSubcat.id,
                                name: unifiedSubcat.name,
                                icon: getIconForCategory(unifiedSubcat.name),
                                tutorials: [],
                                tutorialCount: 0
                            };
                            mainTopicResponse.subCategories.push(targetSubcat);
                        }
                        
                        // Add courses to this subcategory
                        for (const course of unifiedSubcat.courses) {
                            const tutorial: Tutorial = {
                                id: course.id,
                                name: course.title,
                                slug: course.slug,
                                description: course.description || `Learn about ${course.title}`,
                                level: course.difficulty || 'beginner',
                                icon: getIconForCategory(course.subcategory || ''),
                                popular: isPopularCourse(course, mainConfig.id),
                                category: course.original_category || '',
                                subcategoryId: unifiedSubcat.id
                            };
                            
                            // Add to subcategory tutorials
                            targetSubcat.tutorials.push(tutorial);
                            targetSubcat.tutorialCount = (targetSubcat.tutorialCount || 0) + 1;
                            
                            // Add popular courses to main topic's tutorials list
                            if (tutorial.popular) {
                                mainTopicResponse.tutorials.push(tutorial);
                            }
                        }
                    }
                    
                    // Add this main topic to the response
                    mainTopicsResponse.push(mainTopicResponse);
                }
            }
            
            return NextResponse.json(mainTopicsResponse);
        } else {
            // Fall back to the old method if unified data is not available
            const coursesByCategory = await getCoursesByCategory();
            const mainTopicsResponse: MainTopicResponse[] = [];
            
            for (const mainTopic of mainTopicConfigurations) {
                const mainTopicResponse: MainTopicResponse = {
                    id: mainTopic.id,
                    name: mainTopic.name,
                    description: mainTopic.description,
                    icon: mainTopic.icon,
                    difficulty: mainTopic.difficulty,
                    color: getColorForCategory(mainTopic.name),
                    tutorialCount: 0,
                    tutorials: [],
                    subCategories: mainTopic.subCategories.map(sc => ({
                        id: sc.id,
                        name: sc.name,
                        icon: sc.icon,
                        tutorials: [],
                        tutorialCount: 0
                    }))
                };
                
                // Find courses that belong to this main topic based on keywords
                const categoryKeywords = mainTopic.keywords;
                
                // Process each category and assign its courses to the appropriate main topic
                for (const [category, courses] of Object.entries(coursesByCategory)) {
                    // Check if this category belongs to this main topic
                    const categoryLower = category.toLowerCase();
                    const isMatch = categoryKeywords.some(keyword => categoryLower.includes(keyword.toLowerCase()));
                    
                    if (isMatch) {
                        // Process the courses in this category
                        processCoursesForTopic(courses, category, mainTopicResponse);
                    }
                }
                
                // Only include topics that have courses
                if (mainTopicResponse.tutorialCount > 0) {
                    mainTopicsResponse.push(mainTopicResponse);
                }
            }
            
            return NextResponse.json(mainTopicsResponse);
        }
    } catch (error) {
        console.error('Error in /api/learn route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch learning content' },
            { status: 500 }
        );
    }
}

function processCoursesForTopic(courses: CourseMetadata[], category: string, mainTopic: MainTopicResponse) {
    try {
        // Filter for unique courses only
        for (const course of courses) {
            // Create a tutorial object from the course metadata
            const subcategoryId = course.subcategory_id || assignToSubcategory(course.title, category, mainTopic);
            const isPopular = isPopularCourse(course, mainTopic.id);
            
            const tutorial: Tutorial = {
                id: course.id,
                name: course.title,
                slug: course.slug,
                description: course.description || `Learn about ${course.title}`,
                level: course.difficulty || 'beginner',
                icon: getIconForCategory(course.subcategory || ''),
                popular: isPopular,
                category: category,
                subcategoryId: subcategoryId
            };
            
            // Add to appropriate subcategory
            const subcategory = mainTopic.subCategories.find(sc => sc.id === subcategoryId);
            if (subcategory) {
                subcategory.tutorials.push(tutorial);
                subcategory.tutorialCount = (subcategory.tutorialCount || 0) + 1;
                mainTopic.tutorialCount++;
            } else if (!mappedCategories.has(category)) {
                console.log(`Could not find subcategory ${subcategoryId} for course "${course.title}" in category "${category}"`);
                mappedCategories.add(category);
            }
            
            // Add popular tutorials to main topic tutorials list
            if (isPopular) {
                mainTopic.tutorials.push(tutorial);
            }
        }
    } catch (error) {
        console.error(`Error processing courses for topic ${mainTopic.name}:`, error);
    }
}

function getColorForCategory(categoryName: string): string {
    // Map categories to specific colors for consistent UI
    const categoryColors: { [key: string]: string } = {
        "Web Development": "blue",
        "Frontend Frameworks": "sky",
        "Python": "green",
        "Java": "orange",
        "C Language": "violet",
        "Data Science & ML": "teal",
        "Databases": "amber",
        "Backend Development": "indigo",
        "Other Programming Languages": "rose",
        "Development Tools": "slate",
        "Office & Productivity": "emerald",
        "Learning Resources": "purple",
        "Cyber Security": "red",
        "Go": "cyan"
    };
    
    return categoryColors[categoryName] || "gray";
}

function getIconForCategory(categoryName: string): string {
    // Map subcategories to specific icons
    const subcategoryIcons: { [key: string]: string } = {
        "HTML": "Code",
        "CSS": "PenTool",
        "JavaScript": "FileCode",
        "TypeScript": "FileCode",
        "Python": "FileCode",
        "Java": "Coffee",
        "PHP": "FileCode",
        "C": "Terminal",
        "C++": "Terminal",
        "C#": "Hash",
        "Data Science": "BarChart",
        "Machine Learning": "Brain",
        "SQL": "Database",
        "MongoDB": "Database",
        "React": "Layers",
        "Vue": "Layers",
        "Angular": "Layers",
        "Node.js": "Server",
        "Django": "Globe"
    };
    
    return subcategoryIcons[categoryName] || "FileText";
}
