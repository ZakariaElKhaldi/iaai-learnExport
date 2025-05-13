export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Course</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Course Information</h2>
        <p className="text-gray-500">Form for course details will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Curriculum Builder</h2>
        <p className="text-gray-500">Tools to create course modules and lessons will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Quiz Creator</h2>
        <p className="text-gray-500">Tools to create course quizzes will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Publish Settings</h2>
        <p className="text-gray-500">Course publishing options will be displayed here.</p>
      </div>
    </div>
  );
} 