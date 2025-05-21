import { NextResponse } from 'next/server';
import { getAllCoursesMetadata, getCoursesByCategory } from '@/lib/course-utils';

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
        keywords: ["html", "css", "javascript", "react", "angular", "vue", "jquery", "bootstrap", "sass", "typescript", "web", "web design", "web building", "website"],
        description: "Learn everything about building modern websites and web applications, from HTML basics to advanced JavaScript frameworks.",
        icon: "Globe",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "c-programming-family",
        name: "C Programming Family",
        keywords: ["c", "c++", "c#", "objective-c", "objective c"],
        description: "Master the C-family of languages, from fundamental C programming to object-oriented C++ and C#.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "cyber-security",
        name: "Cyber Security",
        keywords: ["cyber security", "cybersecurity", "ethical hacking", "network security"],
        description: "Understand the principles of cyber security, protect systems, and learn about ethical hacking techniques.",
        icon: "Server",
        difficulty: "Intermediate to Advanced"
    },
    {
        id: "python-programming",
        name: "Python Programming",
        keywords: ["python", "django", "flask", "pandas", "numpy", "matplotlib", "scipy"],
        description: "Explore Python for web development, data science, machine learning, and more.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "java-programming",
        name: "Java Programming",
        keywords: ["java", "spring", "jsp"],
        description: "Dive into Java for enterprise applications, Android development, and large-scale systems.",
        icon: "Code",
        difficulty: "Beginner to Advanced"
    },
    {
        id: "data-science-ml",
        name: "Data Science & ML",
        keywords: ["data science", "machine learning", "artificial intelligence", "ai", "statistics", "r programming", "deep learning", "tensorflow", "keras", "pytorch"],
        description: "Unlock insights from data and build intelligent systems with machine learning and AI techniques.",
        icon: "LineChart",
        difficulty: "Intermediate to Advanced"
    },
    {
        id: "databases",
        name: "Databases",
        keywords: ["sql", "mysql", "postgresql", "mongodb", "nosql", "database"],
        description: "Learn to design, manage, and query various types of databases, both SQL and NoSQL.",
        icon: "Database",
        difficulty: "Beginner to Intermediate"
    },
    {
        id: "php-programming",
        name: "PHP Programming",
        keywords: ["php", "laravel", "symfony", "wordpress"],
        description: "Develop dynamic websites and web applications using PHP and popular frameworks like Laravel.",
        icon: "Code",
        difficulty: "Beginner to Intermediate"
    },
];

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
            const categoryNameLower = category.toLowerCase();
            let matched = false;

            // Try to match category with a main topic
            mainTopicConfigurations.forEach(config => {
                if (config.keywords.some(keyword => categoryNameLower.includes(keyword.toLowerCase()))) {
                    const mainTopic = groupedTopics.get(config.id);
                    if (mainTopic) {
                        courses.forEach(course => {
                            if (!mainTopic.tutorials.find(t => t.id === course.id)) {
                                mainTopic.tutorials.push({
                                    id: course.id,
                                    name: course.title,
                                    slug: course.slug,
                                    icon: getIconForCategory(category),
                                    description: course.description || `Learn ${course.title}.`,
                                    level: course.difficulty,
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
                console.log(`Category "${category}" did not match any main topic.`);
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
