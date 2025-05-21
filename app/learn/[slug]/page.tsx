import { getCourseBySlug, getAllCoursesMetadata } from '@/lib/course-utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Learn
          </Link>
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
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back button */}
        <Link 
          href="/learn" 
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tutorials
        </Link>
        
        {/* Tutorial header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          
          {/* Course metadata and badges */}
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {course.metadata?.difficulty && (
              <Badge variant="outline" className="capitalize">
                {course.metadata.difficulty}
              </Badge>
            )}
            
            {course.metadata?.estimated_time && (
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.metadata.estimated_time} min read
              </div>
            )}
            
            {course.metadata?.category && (
              <Badge variant="secondary" className="capitalize">
                {course.metadata.category}
              </Badge>
            )}
          </div>
          
          {/* Description */}
          {course.metadata?.description && (
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {course.metadata.description}
            </p>
          )}
        </header>
        
        {/* Table of contents */}
        {course.content_sections && course.content_sections.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg mb-8 hidden lg:block">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Contents
            </h2>
            <nav>
              <ul className="space-y-1">
                {course.content_sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <li key={`toc-${index}`}>
                      <a 
                        href={`#section-${index}`}
                        className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {section.title || `Section ${index + 1}`}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
        )}
        
        {/* Content Sections */}
        {course.content_sections && course.content_sections.length > 0 ? (
          <div className="space-y-10">
            {course.content_sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <section 
                  key={`section-${index}`} 
                  id={`section-${index}`}
                  className="scroll-mt-20"
                >
                  {section.title && (
                    <h2 className="text-2xl font-semibold mb-4">
                      {section.title}
                    </h2>
                  )}
                  
                  <div className="prose dark:prose-invert max-w-none">
                    {/* Format content to handle line breaks */}
                    {section.content.split('\n').map((paragraph, i) => 
                      paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
                    )}
                  </div>
                  
                  {/* Display code if present */}
                  {section.code && (
                    <div className="bg-slate-900 text-slate-50 p-4 rounded-md mt-4 overflow-x-auto">
                      <pre>
                        <code className={section.language ? `language-${section.language}` : ''}>
                          {section.code}
                        </code>
                      </pre>
                    </div>
                  )}
                  
                  {/* Display explanation if present */}
                  {section.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <h4 className="font-medium mb-2">Explanation</h4>
                      <p>{section.explanation}</p>
                    </div>
                  )}
                </section>
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
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Practice Exercises
            </h2>
            
            <div className="space-y-6">
              {course.practice_exercises.map((exercise, index) => (
                <div key={`exercise-${index}`} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4">
                    <h3 className="text-xl font-medium">{exercise.title}</h3>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Difficulty: {exercise.difficulty}</div>
                  </div>
                  
                  <div className="p-4">
                    <p className="mb-4">{exercise.description}</p>
                    
                    {exercise.starter_code && (
                      <div className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
                        <pre>
                          <code>{exercise.starter_code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Quiz Questions */}
        {course.quiz && course.quiz.length > 0 && (
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Quiz</h2>
            
            <div className="space-y-6">
              {course.quiz.map((question, index) => (
                <div key={`quiz-${index}`} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4">
                    <h3 className="text-lg font-medium">Question {index + 1}</h3>
                  </div>
                  
                  <div className="p-4">
                    <p className="mb-6 font-medium">{question.question}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <label 
                          key={`option-${optIndex}`} 
                          className={`
                            flex items-start p-3 rounded-md border cursor-pointer 
                            ${optIndex === question.correct_answer ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-200 dark:border-slate-700'}
                            hover:border-slate-300 dark:hover:border-slate-600
                          `}
                        >
                          <input 
                            type="radio" 
                            name={`question-${index}`} 
                            className="mt-1 mr-3"
                            defaultChecked={optIndex === question.correct_answer}
                            disabled
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Explanation */}
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Topics */}
        {course.related_topics && course.related_topics.length > 0 && (
          <div className="mt-12 mb-4">
            <h2 className="text-xl font-semibold mb-4">Related Topics</h2>
            
            <div className="flex flex-wrap gap-2">
              {course.related_topics.map((topic, index) => (
                <Badge key={`topic-${index}`} variant="outline" className="text-sm">
                  {topic.title}
                  {topic.relationship && (
                    <span className="text-xs ml-1 opacity-70">
                      ({topic.relationship.replace('_', ' ')})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
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