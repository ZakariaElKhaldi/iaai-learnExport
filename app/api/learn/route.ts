import { NextResponse } from 'next/server';
import { getCoursesByCategory } from '@/lib/course-utils';

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
    let targetSubcategory = mainTopic.subCategories[0];
    
    const titleLower = tutorialTitle.toLowerCase();
    const categoryLower = categoryName.toLowerCase();
    
    for (const subcat of mainTopic.subCategories) {
        // Create a simple keyword mapping for subcategories based on their names
        const subcatKeywords = subcat.name.toLowerCase().split(/[^\w]+/);
        
        // Check if title or category contains any of the subcategory keywords
        if (subcatKeywords.some(keyword => 
            titleLower.includes(keyword) || 
            categoryLower.includes(keyword))) {
            targetSubcategory = subcat;
            break;
        }
    }
    
    return targetSubcategory.id;
}

export async function GET() {
    try {
        // Get courses grouped by category
        const coursesByCategory = await getCoursesByCategory();
        
        const groupedTopics = new Map<string, MainTopicResponse>();

        // Initialize main topics
        mainTopicConfigurations.forEach(config => {
            groupedTopics.set(config.id, {
                ...config,
                tutorialCount: 0,
                tutorials: [],
                color: getColorForCategory(config.name),
                subCategories: config.subCategories.map(sc => ({
                    ...sc,
                    tutorials: []
                }))
            });
        });

        // Process each course category
        Object.entries(coursesByCategory).forEach(([category, courses]) => {
            // Skip empty categories or undefined categories
            if (!category || !courses || courses.length === 0) {
                return;
            }
            
            const categoryNameLower = category.toLowerCase();
            let matched = false;

            // Try to match category with a main topic
            mainTopicConfigurations.forEach(config => {
                // Check if any keyword matches the category name
                if (config.keywords.some(keyword => 
                    categoryNameLower.includes(keyword.toLowerCase()) || 
                    keyword.toLowerCase().includes(categoryNameLower)
                )) {
                    const mainTopic = groupedTopics.get(config.id);
                    if (mainTopic) {
                        courses.forEach(course => {
                            // Skip courses without necessary data
                            if (!course || !course.id || !course.title) {
                                return;
                            }
                            
                            // Choose appropriate subcategory for this course
                            const subcategoryId = assignToSubcategory(course.title, category, mainTopic);
                            
                            // Find the subcategory object
                            const subcategory = mainTopic.subCategories.find((sc: SubCategory) => sc.id === subcategoryId);
                            
                            if (subcategory && !subcategory.tutorials.find((t: Tutorial) => t.id === course.id)) {
                                const tutorialObject: Tutorial = {
                                    id: course.id,
                                    name: course.title || `Unnamed Course`,
                                    slug: course.slug || course.id,
                                    icon: getIconForCategory(category),
                                    description: course.description || `Learn ${course.title || 'this topic'}.`,
                                    level: course.difficulty || 'beginner',
                                    popular: false,
                                    category: category,
                                    subcategoryId: subcategoryId
                                };
                                
                                // Add to subcategory
                                subcategory.tutorials.push(tutorialObject);
                                
                                // Also add to main category (for backward compatibility)
                                if (!mainTopic.tutorials.find((t: Tutorial) => t.id === course.id)) {
                                    mainTopic.tutorials.push(tutorialObject);
                                }
                            }
                        });
                        matched = true;
                    }
                }
            });

            if (!matched) {
                // If no match was found, try to place it in the most appropriate fallback category
                let fallbackCategory = "web-development"; // default fallback
                
                // Try to determine a better fallback based on the category name
                if (categoryNameLower.includes("learn") || 
                    categoryNameLower.includes("introduction") ||
                    categoryNameLower.includes("how_to") ||
                    categoryNameLower.includes("start")) {
                    fallbackCategory = "learning-resources";
                }
                
                const fallbackTopic = groupedTopics.get(fallbackCategory);
                if (fallbackTopic) {
                    // Only log if we haven't seen this category before
                    if (!mappedCategories.has(category)) {
                        console.log(`Category "${category}" assigned to fallback topic: ${fallbackTopic.name}`);
                        mappedCategories.add(category);
                    }
                    
                    // Choose a default subcategory for this fallback
                    const defaultSubcategory = fallbackTopic.subCategories[0];
                    
                    courses.forEach(course => {
                        if (!course || !course.id || !course.title) return;
                        
                        const tutorialObject: Tutorial = {
                            id: course.id,
                            name: course.title,
                            slug: course.slug || course.id,
                            icon: getIconForCategory(category),
                            description: course.description || `Learn ${course.title}.`,
                            level: course.difficulty || 'beginner',
                            popular: false,
                            category: category,
                            subcategoryId: defaultSubcategory.id
                        };
                        
                        // Add to default subcategory
                        defaultSubcategory.tutorials.push(tutorialObject);
                        
                        // Also add to main category (for backward compatibility)
                        if (!fallbackTopic.tutorials.find((t: Tutorial) => t.id === course.id)) {
                            fallbackTopic.tutorials.push(tutorialObject);
                        }
                    });
                }
            }
        });

        // Prepare response
        const responseTopics: MainTopicResponse[] = [];
        groupedTopics.forEach(topic => {
            if (topic.tutorials.length > 0) {
                topic.tutorialCount = topic.tutorials.length;
                
                // Update subcategory counts
                topic.subCategories = topic.subCategories.map((sc: SubCategory) => ({
                    ...sc,
                    tutorialCount: sc.tutorials ? sc.tutorials.length : 0
                }));
                
                responseTopics.push(topic);
            }
        });

        responseTopics.sort((a, b) => a.name.localeCompare(b.name));

        // Return the topics as JSON
        return NextResponse.json(responseTopics);
    } catch (error) {
        console.error('Error generating topics:', error);
        return NextResponse.json({ error: 'Failed to generate topics' }, { status: 500 });
    }
}

function getColorForCategory(categoryName: string): string {
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
        hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
}

function getIconForCategory(categoryName: string): string {
    const categoryLower = categoryName.toLowerCase();
    
    if (categoryLower.includes('javascript') || categoryLower.includes('js')) return 'Code';
    if (categoryLower.includes('html')) return 'Code';
    if (categoryLower.includes('css')) return 'PenTool';
    if (categoryLower.includes('python')) return 'Code';
    if (categoryLower.includes('data')) return 'LineChart';
    if (categoryLower.includes('sql') || categoryLower.includes('database')) return 'Database';
    
    return 'BookOpen';
}
