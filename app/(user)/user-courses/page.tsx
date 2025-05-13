export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <p className="text-gray-600">Browse your enrolled courses</p>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <p className="text-gray-500">You don&apos;t have any courses yet.</p>
      </div>
    </div>
  );
} 