export default function ManageEmployeesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Employees</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Invite Employees
        </button>
      </div>
      
      <div className="bg-white p-4 rounded shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="p-2 border rounded">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Product</option>
              <option>HR</option>
            </select>
            <select className="p-2 border rounded">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Invited</option>
            </select>
            <select className="p-2 border rounded">
              <option>Sort: Name (A-Z)</option>
              <option>Name (Z-A)</option>
              <option>Date Added (Newest)</option>
              <option>Date Added (Oldest)</option>
              <option>Courses Completed (Most)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded shadow-sm border overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded mr-2" />
                    Employee
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded mr-3" />
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {i === 1 ? 'Sarah Johnson' : i === 2 ? 'Michael Chen' : i === 3 ? 'Emily Rodriguez' : i === 4 ? 'David Kim' : 'Alex Thompson'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {i === 1 ? 'sarah@example.com' : i === 2 ? 'michael@example.com' : i === 3 ? 'emily@example.com' : i === 4 ? 'david@example.com' : 'alex@example.com'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {i === 1 ? 'Marketing' : i === 2 ? 'Engineering' : i === 3 ? 'Product' : i === 4 ? 'Sales' : 'HR'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {i === 1 ? '8 / 12' : i === 2 ? '5 / 5' : i === 3 ? '3 / 10' : i === 4 ? '6 / 8' : '2 / 6'}
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ 
                          width: i === 1 ? '66%' : i === 2 ? '100%' : i === 3 ? '30%' : i === 4 ? '75%' : '33%'
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {i === 1 ? '2 hours ago' : i === 2 ? 'Just now' : i === 3 ? 'Yesterday' : i === 4 ? '3 days ago' : '1 week ago'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      i === 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {i === 5 ? 'Invited' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-blue-600 hover:text-blue-800">Assign</button>
                      <button className="text-gray-600 hover:text-gray-800">...</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 flex justify-between items-center border-t">
          <div className="text-sm text-gray-500">
            Showing 5 of 245 employees
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded text-sm">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white text-sm">1</button>
            <button className="px-3 py-1 border rounded text-sm">2</button>
            <button className="px-3 py-1 border rounded text-sm">3</button>
            <button className="px-3 py-1 border rounded text-sm">Next</button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Bulk Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm">
            Assign Courses
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm">
            Change Department
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm">
            Export Data
          </button>
          <button className="bg-white border border-red-300 text-red-700 px-3 py-1.5 rounded text-sm">
            Deactivate Selected
          </button>
        </div>
      </div>
    </div>
  );
} 