export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1">Creator Portal</h2>
          <p className="text-sm text-gray-400">Course Management</p>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="py-2 px-3 bg-gray-800 rounded">Creator Dashboard</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">My Courses</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Create Course</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Media Library</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Analytics</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 