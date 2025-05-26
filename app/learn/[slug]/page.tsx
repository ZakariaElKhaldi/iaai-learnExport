import { getCourseBySlug, getAllCoursesMetadata, getCoursesByCategory } from '@/lib/course-utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, BookOpen, Star, ChevronLeft, ChevronRight, Bookmark, BookOpen as BookOpenIcon, GraduationCap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CodeSection } from '@/components/code-section';
import { QuizSection } from '@/components/quiz-section';
import { CourseProgress } from '@/components/course-progress';
import { CourseOutline } from '@/components/course-outline';

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
    
    // Get next and previous courses in the same category
    const coursesByCategory = await getCoursesByCategory();
    const categoryCourses = coursesByCategory[course.metadata.category] || [];
    const currentIndex = categoryCourses.findIndex(c => c.slug === courseSlug);
    
    const prevCourse = currentIndex > 0 ? categoryCourses[currentIndex - 1] : null;
    const nextCourse = currentIndex < categoryCourses.length - 1 ? categoryCourses[currentIndex + 1] : null;
    
    // Extract learning objectives from the description if present
    const learningObjectives = extractLearningObjectives(course.metadata.description || '');
    
    // Function to render content items
    const renderContentItem = (item: any, index: number) => {
      if (!item || typeof item !== 'object') {
        console.error('Invalid content item:', item);
        return null;
      }
      
      try {
        switch (item.type) {
          case 'header':
            const HeaderTag = item.level === 'h1' ? 'h1' : 
                             item.level === 'h2' ? 'h2' : 
                             item.level === 'h3' ? 'h3' : 'h4';
            
            return (
              <div key={`header-${index}`} className="mb-4 mt-8 first:mt-0">
                {item.html ? (
                  <div dangerouslySetInnerHTML={{ __html: item.html }} className="prose dark:prose-invert max-w-none" />
                ) : item.text ? (
                  <HeaderTag id={slugify(item.text || '')} className={`font-bold ${HeaderTag === 'h1' ? 'text-2xl' : HeaderTag === 'h2' ? 'text-xl' : 'text-lg'} group flex items-center`}>
                    {item.text}
                    <a href={`#${slugify(item.text || '')}`} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-slate-400 hover:text-primary">#</span>
                    </a>
                  </HeaderTag>
                ) : null}
              </div>
            );
            
          case 'text':
            return (
              <div key={`text-${index}`} className="mb-5">
                {item.html ? (
                  <div dangerouslySetInnerHTML={{ __html: item.html }} className="prose dark:prose-invert max-w-none" />
                ) : item.text ? (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.text}</p>
                ) : null}
              </div>
            );
            
          case 'code':
            return (
              <CodeSection 
                key={`code-${index}`}
                code={item.code || ''}
                codeHtml={item.code_html}
                language={item.language || 'unknown'}
                syntax_highlighting={item.syntax_highlighting || []}
                code_classes={item.code_classes || []}
              />
            );
            
          case 'table':
            return (
              <div key={`table-${index}`} className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex items-center">
                  <h4 className="font-medium">Table</h4>
                </div>
                <div className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      {item.data && Array.isArray(item.data) && item.data.length > 0 ? (
                        <>
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                              {Array.isArray(item.data[0]) && item.data[0].map((header: string, i: number) => (
                                <th key={i} className="border border-slate-200 dark:border-slate-700 px-4 py-2 text-left">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {item.data.slice(1).map((row: string[], rowIndex: number) => (
                              Array.isArray(row) ? (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}>
                                  {row.map((cell: string, cellIndex: number) => (
                                    <td key={cellIndex} className="border border-slate-200 dark:border-slate-700 px-4 py-2">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ) : null
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <tr>
                          <td className="border border-slate-200 dark:border-slate-700 px-4 py-2">
                            No table data available
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            );
            
          case 'interactive':
            return (
              <div key={`interactive-${index}`} className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex items-center">
                  <h4 className="font-medium">Interactive Example</h4>
                </div>
                <div className="p-4">
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Use the code editor below to experiment with the code and see the results in real-time.
                  </p>
                  <CodeSection 
                    code={item.code || '// Add your code here'}
                    language={item.language || 'javascript'}
                    syntax_highlighting={item.syntax_highlighting || []}
                    code_classes={item.code_classes || []}
                  />
                </div>
              </div>
            );
            
          case 'page_quiz':
          case 'quiz':
            const quizOptions = item.options?.map((opt: any) => ({
              text: opt.text || '',
              value: opt.value || opt.text || '',
              isCorrect: opt.correct || false,
              explanation: opt.explanation || ''
            })) || [];
            
            return (
              <QuizSection
                key={`quiz-${index}`}
                quizId={`${courseSlug}-quiz-${index}`}
                courseId={String(course.id)}
                question={item.question || 'Answer the question below:'}
                options={quizOptions}
                explanation={item.explanation || ''}
                difficulty={item.difficulty || 'medium'}
              />
            );
            
          case 'exercise':
            return (
              <div key={`exercise-${index}`} className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-amber-100 dark:bg-amber-900/20 px-4 py-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <h4 className="font-medium">Exercise</h4>
                </div>
                <div className="p-4">
                  {item.html ? (
                    <div dangerouslySetInnerHTML={{ __html: item.html }} className="prose dark:prose-invert max-w-none" />
                  ) : item.text ? (
                    <p className="text-slate-700 dark:text-slate-300">{item.text}</p>
                  ) : (
                    <p>No exercise content available</p>
                  )}
                </div>
              </div>
            );
            
          case 'color':
            return (
              <div key={`color-${index}`} className="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex items-center">
                  <h4 className="font-medium">Color Sample</h4>
                </div>
                <div className="p-4">
                  <div 
                    className="w-full h-24 rounded-md"
                    style={{ backgroundColor: item.backgroundColor || item.colorValue || '#e5e5e5' }}
                  ></div>
                  <p className="mt-2">
                    <code>{item.colorValue || 'Color value not available'}</code>
                  </p>
                </div>
              </div>
            );
            
          default:
            return (
              <div key={`unknown-${index}`} className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-400">
                  <strong>Content type:</strong> {item.type || 'unknown'}
                </p>
                <p>{item.text || JSON.stringify(item)}</p>
              </div>
            );
        }
      } catch (error) {
        console.error(`Error rendering content item of type ${item.type}:`, error);
        return (
          <div key={`error-${index}`} className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-700 dark:text-red-400">
              <strong>Error:</strong> Failed to render content item
            </p>
          </div>
        );
      }
    };
    
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Back button and breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Tutorials
          </Link>
          
          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Link href="/learn" className="hover:text-primary hover:underline">Learn</Link>
            <ChevronRight className="h-3 w-3" />
            <Link 
              href={`/learn?topic=${course.metadata.category}`} 
              className="hover:text-primary hover:underline capitalize"
            >
              {course.metadata.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{course.title}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tutorial header */}
            <header className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
              
              {/* Course metadata and badges */}
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                {course.metadata?.difficulty && (
                  <Badge variant="outline" className="capitalize flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {course.metadata.difficulty}
                  </Badge>
                )}
                
                {course.metadata?.estimated_time && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.metadata.estimated_time} min
                  </Badge>
                )}
                
                {course.metadata?.category && (
                  <Badge variant="default" className="capitalize flex items-center gap-1">
                    <BookOpenIcon className="h-3 w-3" />
                    {course.metadata.category}
                  </Badge>
                )}
              </div>
              
              {/* Description */}
              {course.metadata?.description && !learningObjectives.length && (
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  {course.metadata.description}
                </p>
              )}
              
              {/* Learning objectives */}
              {learningObjectives.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-lg flex items-center gap-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc pl-5">
                    {learningObjectives.map((objective, i) => (
                      <li key={i}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}
            </header>
            
            {/* Course Progress */}
            <CourseProgress 
              courseId={String(course.id)} 
              courseName={course.title}
              estimatedTime={course.metadata?.estimated_time ? parseInt(String(course.metadata.estimated_time), 10) : undefined}
            />
            
            {/* Content */}
            {course.content && course.content.length > 0 ? (
              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                {course.content.map((item, index) => renderContentItem(item, index))}
              </div>
            ) : (
              <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-400">
                  No content available for this tutorial yet.
                </p>
              </div>
            )}
            
            {/* Next/Previous navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevCourse ? (
                <Link 
                  href={`/learn/${prevCourse.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Previous Tutorial</div>
                    <div className="font-medium">{prevCourse.title}</div>
                  </div>
                </Link>
              ) : (
                <div></div> // Empty div to maintain the grid layout
              )}
              
              {nextCourse ? (
                <Link 
                  href={`/learn/${nextCourse.slug}`}
                  className="flex items-center justify-end gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Next Tutorial</div>
                    <div className="font-medium">{nextCourse.title}</div>
                  </div>
                  <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                </Link>
              ) : (
                <div></div> // Empty div to maintain the grid layout
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Extract headers for outline */}
            {course.content && course.content.length > 0 && (
              <CourseOutline 
                sections={course.content
                  .filter(item => item.type === 'header' && item.text)
                  .map(item => ({
                    id: slugify(item.text || ''),
                    text: item.text || '',
                    level: (item.level || 'h2') as 'h1' | 'h2' | 'h3' | 'h4'
                  }))}
                courseId={String(course.id)}
                className="sticky top-6"
              />
            )}
            
            {/* Related courses in same category */}
            {categoryCourses && categoryCourses.length > 1 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  Related Courses
                </h3>
                
                <div className="space-y-2">
                  {categoryCourses
                    .filter(c => c.slug !== courseSlug)
                    .slice(0, 5)
                    .map((relatedCourse, idx) => (
                      <Link 
                        key={idx}
                        href={`/learn/${relatedCourse.slug}`}
                        className="block p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="font-medium">{relatedCourse.title}</div>
                        {relatedCourse.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {relatedCourse.description}
                          </p>
                        )}
                      </Link>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering course with slug ${courseSlug}:`, error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Course</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            There was an error loading this course. Please try again later.
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
}

// Helper function to create URL-friendly slugs from header text
function slugify(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                   // Trim leading/trailing spaces
}

// Helper function to extract learning objectives from description
function extractLearningObjectives(description: string): string[] {
  if (!description) return [];
  
  // Check if description has bullet points or numbered lists
  if (description.includes('* ') || /\d+\.\s/.test(description)) {
    return description
      .split(/\n|<br\s*\/?>/)
      .map(line => line.trim())
      .filter(line => line.startsWith('* ') || /^\d+\.\s/.test(line))
      .map(line => line.replace(/^\*\s|\d+\.\s/, '').trim());
  }
  
  // If no bullet points, try to extract sentences
  if (description.includes('. ')) {
    return description
      .split(/\.\s/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 15 && sentence.length < 150)
      .map(sentence => sentence + '.');
  }
  
  return [];
} 