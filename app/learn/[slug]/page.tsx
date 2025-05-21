import { getCourseBySlug, getAllCoursesMetadata } from '@/lib/course-utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static params at build time for all courses
export async function generateStaticParams() {
  try {
    const courses = await getAllCoursesMetadata();
    
    // Log what we're generating for debugging
    console.log(`Generating static params for ${courses.length} courses`);
    
    return courses.map(course => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Server Component to fetch and render course data
export default async function CoursePage({
  params
}: {
  params: { slug: string }
}) {
  const courseSlug = params.slug;
  
  // Add more detailed logging to help debug routing issues
  console.log(`[CoursePage] Received request for slug: "${courseSlug}"`);
  
  // If no slug, show error
  if (!courseSlug) {
    console.error("[CoursePage] No slug provided in params");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Missing Course ID</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            No course identifier was provided.
          </p>
        </div>
      </div>
    );
  }

  try {
    console.log(`Loading course with slug: ${courseSlug}`);
    
    // Fetch the course data
    const course = await getCourseBySlug(courseSlug);
    
    if (!course) {
      console.log(`Course not found with slug: ${courseSlug}`);
      notFound();
    }
    
    // We have the course, render it
    console.log(`Successfully loaded course: ${course.title} (slug: ${courseSlug})`);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
        
        {/* Display course metadata */}
        {course.metadata && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-gray-700 dark:text-gray-300"><strong>Difficulty:</strong> {course.metadata.difficulty}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Category:</strong> {course.metadata.category}</p>
            {course.metadata.description && (
              <p className="text-gray-700 dark:text-gray-300 mt-2">{course.metadata.description}</p>
            )}
          </div>
        )}
        
        {/* Summary */}
        {course.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Summary</h2>
            <div className="prose dark:prose-invert max-w-none">{course.summary}</div>
          </div>
        )}
        
        {/* Content Sections */}
        {course.content_sections && course.content_sections.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Content</h2>
            
            {course.content_sections.map((section, index) => (
              <div key={`section-${index}`} className="mb-6 border-b pb-4">
                <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                <div className="whitespace-pre-line">{section.content}</div>
                
                {/* Display code if present */}
                {section.code && (
                  <div className="bg-gray-800 text-white p-4 rounded-md mt-3 overflow-x-auto">
                    <pre>
                      <code>{section.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-700 dark:text-yellow-400">
              No content sections available for this tutorial yet.
            </p>
          </div>
        )}
        
        {/* Practice Exercises */}
        {course.practice_exercises && course.practice_exercises.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Practice Exercises</h2>
            
            {course.practice_exercises.map((exercise, index) => (
              <div key={`exercise-${index}`} className="mb-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-2">{exercise.title}</h3>
                <p className="mb-3">{exercise.description}</p>
                
                {exercise.starter_code && (
                  <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                    <pre>
                      <code>{exercise.starter_code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Quiz Questions */}
        {course.quiz && course.quiz.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Quiz</h2>
            
            {course.quiz.map((question, index) => (
              <div key={`quiz-${index}`} className="mb-6 bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Question {index + 1}</h3>
                <p className="mb-4">{question.question}</p>
                
                <div className="ml-4">
                  {question.options.map((option, optIndex) => (
                    <div key={`option-${optIndex}`} className="mb-2">
                      <label className="flex items-start">
                        <input 
                          type="radio" 
                          name={`question-${index}`} 
                          className="mt-1 mr-2"
                          disabled
                        />
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Related Topics */}
        {course.related_topics && course.related_topics.length > 0 && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-3">Related Topics</h2>
            <ul className="list-disc ml-6">
              {course.related_topics.map((topic, index) => (
                <li key={`topic-${index}`} className="mb-1">
                  {topic.title} ({topic.relationship.replace('_', ' ')})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Error loading course data for slug "${courseSlug}":`, error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg mx-auto p-6 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Error Loading Course</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Sorry, we could not load the requested course. Please try again later.
          </p>
          <p className="text-sm text-red-500 mb-4">
            Error: {error instanceof Error ? error.message : String(error)}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/learn" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Go back to Learn
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
} 