import { NextResponse } from 'next/server';
import { getCoursesByCategory } from '@/lib/course-utils';

export async function GET(request: Request) {
    try {
        // Get query parameters
        const url = new URL(request.url);
        const categoryParam = url.searchParams.get('category');
        
        if (categoryParam) {
            // Get courses for a specific category
            const coursesByCategory = await getCoursesByCategory();
            const categoryCourses = coursesByCategory[categoryParam] || [];
            
            return NextResponse.json(categoryCourses);
        } else {
            // Get all courses and organize them into topics
            const coursesByCategory = await getCoursesByCategory();
            
            // Transform the data for the frontend
            const mainTopics = Object.entries(coursesByCategory).map(([category, courses]) => {
                return {
                    id: category.toLowerCase(),
                    name: category.charAt(0).toUpperCase() + category.slice(1),
                    icon: getCategoryIcon(category),
                    description: `Learn about ${category}`,
                    tutorialCount: courses.length,
                    difficulty: "beginner",
                    tutorials: courses.map(course => ({
                        id: course.id,
                        name: course.title,
                        slug: course.slug,
                        icon: getCategoryIcon(category),
                        description: course.description || `Learn about ${course.title}`,
                        level: course.difficulty || 'beginner',
                        popular: false,
                        category: category
                    }))
                };
            });
            
            return NextResponse.json(mainTopics);
        }
    } catch (error) {
        console.error('Error fetching learn data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch learning content' },
            { status: 500 }
        );
    }
}

// Helper function to determine icon based on category
function getCategoryIcon(category: string): string {
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes('html')) return 'Code';
    if (lowerCategory.includes('css')) return 'PenTool';
    if (lowerCategory.includes('javascript') || lowerCategory.includes('js')) return 'Code';
    if (lowerCategory.includes('python')) return 'Code';
    if (lowerCategory.includes('react')) return 'Code';
    if (lowerCategory.includes('node')) return 'Server';
    if (lowerCategory.includes('database') || lowerCategory.includes('sql') || lowerCategory.includes('mongo')) return 'Database';
    if (lowerCategory.includes('statistics') || lowerCategory.includes('math')) return 'LineChart';
    if (lowerCategory.includes('git')) return 'Code';
    if (lowerCategory.includes('ai')) return 'Database';
    
    // Default icon
    return 'Code';
}
