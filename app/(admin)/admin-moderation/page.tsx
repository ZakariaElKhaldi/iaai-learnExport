export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Moderation</h1>
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Moderation Settings
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            View Reports History
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <a href="#" className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Flagged Content
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Pending Course Reviews
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Discussion Moderation
          </a>
          <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Automatic Filters
          </a>
        </nav>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500">Awaiting Moderation</h3>
          <p className="text-2xl font-bold mt-1 text-red-600">12</p>
          <div className="flex items-center mt-2">
            <span className="text-xs font-medium text-red-600">+3 since yesterday</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending Reviews</h3>
          <p className="text-2xl font-bold mt-1">8</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500">Avg. queue time: 6 hours</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500">Auto-Filtered Today</h3>
          <p className="text-2xl font-bold mt-1 text-yellow-600">27</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500">From 845 content posts</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-medium text-gray-500">Resolved This Week</h3>
          <p className="text-2xl font-bold mt-1 text-green-600">45</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-green-600">+12% from last week</span>
          </div>
        </div>
      </div>
      
      {/* Flagged Content Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Flagged Content</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Reported
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">This course is terrible, the instructor has no idea what they&apos;re talking about...</div>
                  <div className="text-xs text-gray-500">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View Full Content</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Course Review
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Michael Smith</div>
                  <div className="text-xs text-gray-500">Course Instructor</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Inappropriate Language
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Remove</button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">Here&apos;s my contact information if anyone wants to chat outside the platform...</div>
                  <div className="text-xs text-gray-500">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View Full Content</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Discussion Comment
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">System Flagged</div>
                  <div className="text-xs text-gray-500">Auto-moderation</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    External Contact Attempt
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 14, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Remove</button>
                </td>
              </tr>
              
              <tr>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">This course contains copyrighted material from my website without attribution...</div>
                  <div className="text-xs text-gray-500">
                    <a href="#" className="text-blue-600 hover:text-blue-900">View Full Content</a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Course Content Report
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Jennifer Wilson</div>
                  <div className="text-xs text-gray-500">External Complainant</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Copyright Violation
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 13, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Investigate</button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3">Contact Parties</button>
                  <button className="text-red-600 hover:text-red-900">Suspend Content</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">12</span> items
            </div>
            <div className="flex-shrink-0 flex space-x-2">
              <button className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md">
                Previous
              </button>
              <button className="bg-blue-600 text-white hover:bg-blue-700 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pending Course Reviews */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Pending Course Reviews</h2>
          <p className="text-sm text-gray-600 mt-1">These courses are awaiting approval before being published to the platform.</p>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">Thumbnail</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Advanced Machine Learning with Python</h3>
                    <p className="text-sm text-gray-500 mt-1">By David Chen • Submitted on Oct 12, 2023</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">This comprehensive course covers advanced machine learning algorithms, neural networks, and practical applications using Python and popular libraries.</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-4">24 lessons</span>
                  <span className="mr-4">5 quizzes</span>
                  <span>Estimated duration: 15 hours</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                  Review Details
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">Thumbnail</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">UI/UX Design Principles for Developers</h3>
                    <p className="text-sm text-gray-500 mt-1">By Sarah Parker • Submitted on Oct 10, 2023</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Learn essential UI/UX design principles specifically tailored for developers looking to improve the user experience of their applications.</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="mr-4">18 lessons</span>
                  <span className="mr-4">3 quizzes</span>
                  <span>Estimated duration: 12 hours</span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                  Review Details
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 