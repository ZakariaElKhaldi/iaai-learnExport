export default function EnterpriseSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Company Settings</h1>
      
      <div className="mb-8">
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button className="py-4 px-6 border-b-2 border-blue-600 text-blue-600 font-medium">
                Company Profile
              </button>
              <button className="py-4 px-6 text-gray-500 hover:text-gray-700">
                Branding
              </button>
              <button className="py-4 px-6 text-gray-500 hover:text-gray-700">
                Certificates
              </button>
              <button className="py-4 px-6 text-gray-500 hover:text-gray-700">
                Integrations
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            <form className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company-name">
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      id="company-name" 
                      className="w-full p-2 border rounded" 
                      defaultValue="Acme Corporation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="industry">
                      Industry
                    </label>
                    <select 
                      id="industry" 
                      className="w-full p-2 border rounded"
                      defaultValue="technology"
                    >
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company-address">
                    Company Address
                  </label>
                  <textarea 
                    id="company-address" 
                    className="w-full p-2 border rounded" 
                    rows={3}
                    defaultValue="123 Tech Plaza, Suite 400, San Francisco, CA 94105, USA"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company-email">
                      Company Email
                    </label>
                    <input 
                      type="email" 
                      id="company-email" 
                      className="w-full p-2 border rounded" 
                      defaultValue="hr@acmecorp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company-phone">
                      Company Phone
                    </label>
                    <input 
                      type="tel" 
                      id="company-phone" 
                      className="w-full p-2 border rounded" 
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Primary Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-name">
                      Contact Name
                    </label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      className="w-full p-2 border rounded" 
                      defaultValue="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-title">
                      Job Title
                    </label>
                    <input 
                      type="text" 
                      id="contact-title" 
                      className="w-full p-2 border rounded" 
                      defaultValue="HR Director"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-email">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      className="w-full p-2 border rounded" 
                      defaultValue="jane.smith@acmecorp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact-phone">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      id="contact-phone" 
                      className="w-full p-2 border rounded" 
                      defaultValue="+1 (555) 987-6543"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Departments</h3>
                <div className="mb-4">
                  <div className="border rounded p-4 mb-4">
                    <div className="space-y-3">
                      {['Engineering', 'Marketing', 'Sales', 'Product', 'HR'].map((dept, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span>{dept}</span>
                          <button className="text-red-600 text-sm">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Add new department" 
                      className="flex-1 p-2 border rounded-l" 
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r">
                      Add
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Admin Users</h2>
          <p className="text-sm text-gray-500">Manage which employees have administrative access to your company account.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div className="text-sm font-medium text-gray-900">
                      Jane Smith
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  jane.smith@acmecorp.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Super Admin
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Full Access
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div className="text-sm font-medium text-gray-900">
                      Michael Johnson
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  michael.johnson@acmecorp.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Department Admin
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Engineering Only
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div className="text-sm font-medium text-gray-900">
                      Alex Thompson
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  alex.thompson@acmecorp.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Reports Viewer
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  View Reports Only
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Admin User
          </button>
        </div>
      </div>
    </div>
  );
} 