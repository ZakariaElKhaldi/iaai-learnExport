import { NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/course-utils';

export async function GET(request: Request) {
  try {
    // Get the slug from the query parameters
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Get the course data
    const course = await getCourseBySlug(slug);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Return a simplified version of the course data for the sidebar
    return NextResponse.json({
      id: course.id,
      title: course.title,
      slug: course.slug,
      category: course.metadata.category,
      subcategory: course.metadata.subcategory,
      difficulty: course.metadata.difficulty
    });
  } catch (error) {
    console.error('Error in course API:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching course data' },
      { status: 500 }
    );
  }
} 