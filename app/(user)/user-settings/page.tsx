export default function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-600">Manage your account settings and preferences</p>
      
      <div className="bg-white rounded shadow-sm border overflow-hidden">
        <div className="divide-y divide-gray-200">
          {/* Account Settings Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value="johndoe@example.com"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button className="mt-1 text-blue-600 hover:text-blue-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                  <p className="text-xs text-gray-500">Receive emails about your account activity</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" defaultChecked id="toggle1" className="sr-only" />
                  <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Course Reminders</span>
                  <p className="text-xs text-gray-500">Get reminded about upcoming courses</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" defaultChecked id="toggle2" className="sr-only" />
                  <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Display Settings */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Display Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 