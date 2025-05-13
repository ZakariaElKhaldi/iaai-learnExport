export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Administration</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">1,243</p>
          <p className="text-green-500 text-sm">+12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Active Companies</h3>
          <p className="text-2xl font-bold">28</p>
          <p className="text-green-500 text-sm">+3 from last month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Course Enrollments</h3>
          <p className="text-2xl font-bold">5,428</p>
          <p className="text-green-500 text-sm">+24% from last month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Platform Revenue</h3>
          <p className="text-2xl font-bold">$48,290</p>
          <p className="text-green-500 text-sm">+18% from last month</p>
        </div>
      </div>
      
      {/* System Status */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Server Uptime</span>
            <span className="text-green-500 font-medium">99.9%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Database Status</span>
            <span className="text-green-500 font-medium">Healthy</span>
          </div>
          <div className="flex justify-between items-center">
            <span>API Response Time</span>
            <span className="text-green-500 font-medium">120ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Last Backup</span>
            <span className="text-gray-600 font-medium">Today, 03:00 AM</span>
          </div>
        </div>
      </div>
      
      {/* Pending Actions */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Pending Actions</h2>
        <div className="divide-y">
          <div className="py-3">
            <div className="flex justify-between">
              <span className="font-medium">Course Approvals</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">8 Pending</span>
            </div>
          </div>
          <div className="py-3">
            <div className="flex justify-between">
              <span className="font-medium">User Verifications</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">12 Pending</span>
            </div>
          </div>
          <div className="py-3">
            <div className="flex justify-between">
              <span className="font-medium">Content Moderation</span>
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">3 Flagged</span>
            </div>
          </div>
          <div className="py-3">
            <div className="flex justify-between">
              <span className="font-medium">Support Tickets</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">5 Open</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Platform Activities */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Platform Activities</h2>
        <div className="divide-y">
          <div className="py-3">
            <p className="font-medium">New company registered: TechSolutions Inc.</p>
            <p className="text-sm text-gray-500">Today, 10:23 AM</p>
          </div>
          <div className="py-3">
            <p className="font-medium">New course published: Advanced React Patterns</p>
            <p className="text-sm text-gray-500">Yesterday, 4:17 PM</p>
          </div>
          <div className="py-3">
            <p className="font-medium">Payment gateway configuration updated</p>
            <p className="text-sm text-gray-500">Yesterday, 11:05 AM</p>
          </div>
          <div className="py-3">
            <p className="font-medium">System update deployed: v2.4.0</p>
            <p className="text-sm text-gray-500">Oct 12, 2023, 2:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
} 