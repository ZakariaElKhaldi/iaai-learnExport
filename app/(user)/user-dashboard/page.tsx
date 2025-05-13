export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">My Courses</h2>
          <p className="text-gray-500">View your enrolled courses and progress</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">My Certificates</h2>
          <p className="text-gray-500">Access your earned certificates</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Upcoming Consultations</h2>
          <p className="text-gray-500">View your scheduled consultations</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Subscription</h2>
          <p className="text-gray-500">Manage your subscription details</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
          <p className="text-gray-500">Update your profile information</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Billing History</h2>
          <p className="text-gray-500">View your payment history</p>
        </div>
      </div>
    </div>
  );
} 