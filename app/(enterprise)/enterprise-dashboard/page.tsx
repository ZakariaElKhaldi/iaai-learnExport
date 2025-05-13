export default function EnterpriseDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enterprise Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Active Employees</h3>
            <span className="text-gray-500 text-sm">Last 30 days</span>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">245</span>
            <span className="text-green-600 text-sm">+12%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-4">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            245 of 300 seats used
          </div>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Course Completion Rate</h3>
            <span className="text-gray-500 text-sm">Last 30 days</span>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">68%</span>
            <span className="text-green-600 text-sm">+5%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-4">
            <div className="h-full bg-green-600 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Industry average: 62%
          </div>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Total Learning Hours</h3>
            <span className="text-gray-500 text-sm">Last 30 days</span>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">1,248</span>
            <span className="text-green-600 text-sm">+18%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-4">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Avg. 5.1 hours per employee
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Recent Employee Activity</h3>
          <div className="divide-y">
            <div className="py-3 flex">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Completed "Advanced Data Analysis" course</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="py-3 flex">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Michael Chen</p>
                <p className="text-xs text-gray-500">Started "Project Management Fundamentals"</p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="py-3 flex">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Emily Rodriguez</p>
                <p className="text-xs text-gray-500">Received certificate for "Leadership Skills"</p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
            <div className="py-3 flex">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="text-sm font-medium">David Kim</p>
                <p className="text-xs text-gray-500">Booked consultation with AI Expert</p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
          </div>
          <button className="text-blue-600 text-sm mt-3">View All Activity</button>
        </div>
        
        <div className="bg-white p-6 rounded shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Subscription Overview</h3>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Enterprise Plus Plan</span>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <p className="text-xs text-gray-500">Renewal Date: August 15, 2025</p>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Employee Seats</span>
              <span className="text-sm">245 / 300 used</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Consultation Hours</span>
              <span className="text-sm">32 / 50 used</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '64%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Monthly Fee</span>
              <span className="font-medium">$2,999</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Next Invoice</span>
              <span className="font-medium">August 15, 2025</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Payment Method</span>
              <span className="font-medium">VISA •••• 4242</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">
              Manage Subscription
            </button>
            <button className="border border-blue-600 text-blue-600 px-3 py-1.5 rounded text-sm">
              View Invoices
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Top Performing Courses</h3>
          <select className="border p-1 rounded text-sm">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollments
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  Data Analytics Fundamentals
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  89
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  78%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4.8/5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ↑ 12%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  Leadership & Management
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  76
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  72%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4.6/5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ↑ 8%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  Cloud Computing Essentials
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  65
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  68%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4.5/5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ↑ 15%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  Project Management Professional
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  58
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  65%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4.3/5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  ↓ 3%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 