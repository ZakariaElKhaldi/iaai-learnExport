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
};

type MainTopicResponse = {
    id: string;
    name: string;
    description: string;
    icon: string;
    tutorialCount: number;
    tutorials: Tutorial[];
    difficulty: string;
    color?: string;
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
        difficulty: "Beginner to Advanced"
    },
    {
        id: "c-programming-family",
        name: "C Programming Family",
        keywords: ["c", "c++", "c#", "objective-c", "objective c", "learnc"],
        description: "Master the C-family of languages, from fundamental C programming to object-oriented C++ and C#.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "cyber-security",
        name: "Cyber Security",
        keywords: ["cyber security", "cybersecurity", "ethical hacking", "network security", "cyber_security"],
        description: "Understand the principles of cyber security, protect systems, and learn about ethical hacking techniques.",
        icon: "Server",
        difficulty: "Intermediate to Advanced"
    },
    {
        id: "python-programming",
        name: "Python Programming",
        keywords: ["python", "django", "flask", "pandas", "numpy", "matplotlib", "scipy", "learnpython", 
                  "learnnumpy", "learnmatplotlib", "learnpandas", "learnscipy", "learndjango"],
        description: "Explore Python for web development, data science, machine learning, and more.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "java-programming",
        name: "Java Programming",
        keywords: ["java", "spring", "jsp", "learnjava"],
        description: "Dive into Java for enterprise applications, Android development, and large-scale systems.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "data-science-ml",
        name: "Data Science & ML",
        keywords: ["data science", "machine learning", "artificial intelligence", "ai", "statistics", "r programming",
                   "deep learning", "tensorflow", "keras", "pytorch", "data", "learndata_science", "learnai",
                   "learnmachine_learning", "learnr", "learnchatgpt", "learngenerative_ai", "learngoogle_bard",
                   "learnstatistics"],
        description: "Unlock insights from data and build intelligent systems with machine learning and AI techniques.",
        icon: "LineChart",
        difficulty: "Intermediate to Advanced"
    },
    {
        id: "databases",
        name: "Databases",
        keywords: ["sql", "mysql", "postgresql", "mongodb", "nosql", "database", "learnsql", "learnmysql",
                   "learnpostgresql", "learnmongodb"],
        description: "Learn to design, manage, and query various types of databases, both SQL and NoSQL.",
        icon: "Database",
        difficulty: "Beginner to Intermediate"
    },
    {
        id: "php-programming",
        name: "PHP Programming",
        keywords: ["php", "laravel", "symfony", "wordpress", "learnphp"],
        description: "Develop dynamic websites and web applications using PHP and popular frameworks like Laravel.",
        icon: "Code",
        difficulty: "Beginner to Intermediate"
    },
    {
        id: "backend-and-tools",
        name: "Backend & Development Tools",
        keywords: ["node", "node.js", "git", "bash", "server", "learnnode_js", "learngit", "learnbash", 
                   "create_a_server", "code_editor", "learnapp"],
        description: "Master backend technologies and essential development tools for modern applications.",
        icon: "Server",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "other-languages",
        name: "Other Programming Languages",
        keywords: ["go", "rust", "kotlin", "learngo", "learnrust", "learnkotlin", "learndsa", "json", "learnjson"],
        description: "Explore other modern programming languages used in various development scenarios.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "productivity-tools",
        name: "Productivity & Office Tools",
        keywords: ["excel", "google sheets", "learnexcel", "learngoogle_sheets", "learnraspberry_pi"],
        description: "Learn essential productivity tools for business and data analysis.",
        icon: "FileSpreadsheet",
        difficulty: "Beginner to Intermediate"
    },
    {
        id: "learning-resources",
        name: "Learning Resources",
        keywords: ["how_to", "learnhow_to", "test_your_typing_speed", "certification", "quiz", "exercises", 
                  "study_plan", "introduction", "newsletter", "join_our_newsletter"],
        description: "Various learning resources, tutorials, and skill development tools.",
        icon: "GraduationCap",
        difficulty: "All Levels"
    }
];

// Cache for categories to reduce repeated log messages
const mappedCategories = new Set<string>();

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
                            
                            if (!mainTopic.tutorials.find(t => t.id === course.id)) {
                                mainTopic.tutorials.push({
                                    id: course.id,
                                    name: course.title || `Unnamed Course`,
                                    slug: course.slug || course.id,
                                    icon: getIconForCategory(category),
                                    description: course.description || `Learn ${course.title || 'this topic'}.`,
                                    level: course.difficulty || 'beginner',
                                    popular: false, // We could determine this based on certain criteria
                                    category: category,
                                });
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
                    
                    courses.forEach(course => {
                        if (!course || !course.id || !course.title) return;
                        
                        if (!fallbackTopic.tutorials.find(t => t.id === course.id)) {
                            fallbackTopic.tutorials.push({
                                id: course.id,
                                name: course.title,
                                slug: course.slug || course.id,
                                icon: getIconForCategory(category),
                                description: course.description || `Learn ${course.title}.`,
                                level: course.difficulty || 'beginner',
                                popular: false,
                                category: category,
                            });
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
                responseTopics.push(topic);
            }
        });

        responseTopics.sort((a, b) => a.name.localeCompare(b.name));

        return NextResponse.json(responseTopics);
    } catch (error) {
        console.error('Failed to fetch main topics:', error);
        return NextResponse.json(
            { message: 'Failed to fetch main topics', error: (error as Error).message },
            { status: 500 }
        );
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
