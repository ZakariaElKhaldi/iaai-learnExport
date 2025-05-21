import { getCourseBySlug, getAllCoursesMetadata } from '@/lib/course-utils';
import { notFound } from 'next/navigation';
import CourseContentDisplay from '@/components/custom/CourseContentDisplay';

// Generate static params at build time for all courses
export async function generateStaticParams() {
  try {
    const courses = await getAllCoursesMetadata();
    return courses.map(course => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server Component to fetch and render course data
export default async function CoursePage({ params }: { params: { slug: string } }) {
  try {
    const course = await getCourseBySlug(params.slug);
    
    if (!course) {
      notFound();
    }
    
    return <CourseContentDisplay courseData={course} />;
  } catch (error) {
    console.error(`Error loading course data for slug ${params.slug}:`, error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Course</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Sorry, we couldn't load the requested course. Please try again later.
          </p>
        </div>
      </div>
    );
  }
} 