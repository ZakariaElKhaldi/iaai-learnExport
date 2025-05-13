export default function ConsultantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1">Consultant Portal</h2>
          <p className="text-sm text-gray-400">Expert Services</p>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="py-2 px-3 bg-gray-800 rounded">Dashboard</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Availability</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Requests</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Sessions</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Profile</li>
            <li className="py-2 px-3 hover:bg-gray-800 rounded">Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
} 