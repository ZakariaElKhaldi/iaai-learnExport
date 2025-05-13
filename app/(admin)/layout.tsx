import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <header className="pb-4 border-b">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="mt-4">
            <ul className="flex space-x-6">
              <li><a href="/admin-dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</a></li>
              <li><a href="/users" className="text-blue-600 hover:text-blue-800">Users</a></li>
              <li><a href="/companies" className="text-blue-600 hover:text-blue-800">Companies</a></li>
              <li><a href="/admin-courses" className="text-blue-600 hover:text-blue-800">Courses</a></li>
              <li><a href="/admin-subscriptions" className="text-blue-600 hover:text-blue-800">Subscriptions</a></li>
              <li><a href="/consultation-services" className="text-blue-600 hover:text-blue-800">Consultation Services</a></li>
              <li><a href="/notifications" className="text-blue-600 hover:text-blue-800">Notifications</a></li>
              <li><a href="/moderation" className="text-blue-600 hover:text-blue-800">Moderation</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
} 