import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'w3schools_cleaned_db_js';

if (!uri) {
    throw new Error('Please add your Mongo URI to .env');
}

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

interface MainTopicDataFromDB {
    _id: string; 
    category: string; 
    courses: Array<{
        id: string;
        title: string;
        slug: string;
        category: string;
        subcategory?: string;
        path: string;
        difficulty: string;
        estimated_time: number;
        description?: string; 
        icon?: string; 
        popular?: boolean; 
    }>;
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
};

// Configuration for Main Topics and keyword mapping
const mainTopicConfigurations = [
    {
        id: "web-development",
        name: "Web Development",
        keywords: ["html", "css", "javascript", "react", "angular", "vue", "jquery", "bootstrap", "sass", "typescript", "web હતું", "web design", "web building", "website"],
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
    const client = new MongoClient(uri as string);
    
    try {
        await client.connect();
        const db = client.db(dbName);

        const categoriesCollection = db.collection<MainTopicDataFromDB>('course_categories');
        const dbCategories = await categoriesCollection
            .find({})
            .toArray();

        const groupedTopics = new Map<string, MainTopicResponse>();

        mainTopicConfigurations.forEach(config => {
            groupedTopics.set(config.id, {
                ...config,
                tutorialCount: 0,
                tutorials: [],
                color: getColorForCategory(config.name), 
            });
        });

        dbCategories.forEach(dbCategory => {
            const categoryNameLower = dbCategory.category.toLowerCase();
            let matched = false;

            mainTopicConfigurations.forEach(config => {
                if (config.keywords.some(keyword => categoryNameLower.includes(keyword.toLowerCase()))) {
                    const mainTopic = groupedTopics.get(config.id);
                    if (mainTopic) {
                        if (Array.isArray(dbCategory.courses)) {
                            dbCategory.courses.forEach(course => {
                                if (!mainTopic.tutorials.find(t => t.id === course.id && t.name === course.title)) {
                                    mainTopic.tutorials.push({
                                        id: course.id,
                                        name: course.title,
                                        slug: course.slug,
                                        icon: course.icon || getIconForCategory(dbCategory.category), 
                                        description: course.description || `Learn ${course.title}.`,
                                        level: course.difficulty,
                                        popular: course.popular || false,
                                        category: dbCategory.category, 
                                    });
                                }
                            });
                        }
                        matched = true; 
                    }                    
                }            
            });

            if (!matched) {
                // console.log(`Category "${dbCategory.category}" did not match any main topic.`);
            }
        });

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
        return NextResponse.json({ message: 'Failed to fetch main topics', error: (error as Error).message }, { status: 500 });
    } finally {
        await client.close();
    }
}

function getColorForCategory(categoryName: string): string {
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
        hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - color.length) + color;
}

function getIconForCategory(categoryName: string): string {
    const lowerCategory = categoryName.toLowerCase();
    if (lowerCategory.includes('python') || lowerCategory.includes('django') || lowerCategory.includes('flask')) return 'Code'; 
    if (lowerCategory.includes('java')) return 'Code'; 
    if (lowerCategory.includes('c') || lowerCategory.includes('c++') || lowerCategory.includes('c#')) return 'Code';
    if (lowerCategory.includes('html') || lowerCategory.includes('css') || lowerCategory.includes('javascript')) return 'Globe';
    if (lowerCategory.includes('react') || lowerCategory.includes('angular') || lowerCategory.includes('vue')) return 'Layers';
    if (lowerCategory.includes('sql') || lowerCategory.includes('database') || lowerCategory.includes('mysql') || lowerCategory.includes('mongodb')) return 'Database';
    if (lowerCategory.includes('data science') || lowerCategory.includes('machine learning') || lowerCategory.includes('ai')) return 'LineChart';
    if (lowerCategory.includes('server') || lowerCategory.includes('node') || lowerCategory.includes('backend')) return 'Server';
    if (lowerCategory.includes('security') || lowerCategory.includes('cyber')) return 'Server'; 
    if (lowerCategory.includes('git') || lowerCategory.includes('version control')) return 'GitMerge'; 
    return 'BookOpen'; 
}
