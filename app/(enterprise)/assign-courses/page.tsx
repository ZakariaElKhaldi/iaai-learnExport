export default function AssignCoursesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assign Courses</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Select employees */}
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">1. Select Employees</h2>
          </div>
          
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <select className="p-2 border rounded">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Product</option>
                <option>HR</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 border-b">
            <div className="flex items-center mb-3">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded mr-2" id="select-all" />
              <label htmlFor="select-all" className="font-medium">Select All Visible</label>
              <span className="ml-auto text-sm text-gray-500">3 selected</span>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y">
              {[
                { name: 'Sarah Johnson', email: 'sarah@example.com', dept: 'Marketing', selected: true },
                { name: 'Michael Chen', email: 'michael@example.com', dept: 'Engineering', selected: true },
                { name: 'Emily Rodriguez', email: 'emily@example.com', dept: 'Product', selected: true },
                { name: 'David Kim', email: 'david@example.com', dept: 'Sales', selected: false },
                { name: 'Alex Thompson', email: 'alex@example.com', dept: 'HR', selected: false },
                { name: 'Jessica Lee', email: 'jessica@example.com', dept: 'Engineering', selected: false },
                { name: 'James Wilson', email: 'james@example.com', dept: 'Marketing', selected: false },
                { name: 'Olivia Martin', email: 'olivia@example.com', dept: 'Sales', selected: false },
              ].map((employee, i) => (
                <li key={i} className="p-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 rounded mr-3" 
                      defaultChecked={employee.selected}
                    />
                    <div className="flex items-center flex-1">
                      <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium">{employee.name}</div>
                        <div className="text-xs text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {employee.dept}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right column: Select courses */}
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">2. Select Courses</h2>
          </div>
          
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full p-2 border rounded"
                />
              </div>
              <select className="p-2 border rounded">
                <option>All Categories</option>
                <option>Development</option>
                <option>Business</option>
                <option>Data Science</option>
                <option>Leadership</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 border-b">
            <div className="flex items-center mb-3">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded mr-2" id="select-all-courses" />
              <label htmlFor="select-all-courses" className="font-medium">Select All Visible</label>
              <span className="ml-auto text-sm text-gray-500">2 selected</span>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y">
              {[
                { title: 'Data Analytics Fundamentals', category: 'Data Science', duration: '10 hours', selected: true },
                { title: 'Leadership & Management', category: 'Leadership', duration: '15 hours', selected: true },
                { title: 'Cloud Computing Essentials', category: 'Development', duration: '12 hours', selected: false },
                { title: 'Project Management Professional', category: 'Business', duration: '20 hours', selected: false },
                { title: 'UX Design Principles', category: 'Design', duration: '8 hours', selected: false },
                { title: 'Digital Marketing Strategy', category: 'Marketing', duration: '6 hours', selected: false },
                { title: 'Python for Data Science', category: 'Development', duration: '14 hours', selected: false },
                { title: 'Agile Methodologies', category: 'Business', duration: '8 hours', selected: false },
              ].map((course, i) => (
                <li key={i} className="p-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 rounded mr-3" 
                      defaultChecked={course.selected}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{course.title}</div>
                      <div className="flex text-xs text-gray-500 mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded mr-2">{course.category}</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Assignment Options */}
      <div className="bg-white rounded shadow-sm border overflow-hidden mt-6 p-6">
        <h2 className="text-lg font-medium mb-4">3. Assignment Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Deadline</h3>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="no-deadline" 
                  name="deadline" 
                  className="h-4 w-4 text-blue-600" 
                  defaultChecked
                />
                <label htmlFor="no-deadline" className="ml-2 text-sm">No deadline</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="set-deadline" 
                  name="deadline" 
                  className="h-4 w-4 text-blue-600" 
                />
                <label htmlFor="set-deadline" className="ml-2 text-sm">Set deadline</label>
              </div>
            </div>
            <div className="mt-2">
              <input 
                type="date" 
                className="p-2 border rounded w-full" 
                disabled 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Priority</h3>
            <select className="w-full p-2 border rounded">
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Notification</h3>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="send-notification" 
                className="h-4 w-4 text-blue-600 rounded" 
                defaultChecked
              />
              <label htmlFor="send-notification" className="ml-2 text-sm">
                Send notification to selected employees
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Custom Message (Optional)</h3>
            <textarea 
              className="w-full p-2 border rounded" 
              rows={3}
              placeholder="Add a personalized message to the assignment notification..."
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Assign Selected Courses (2) to Selected Employees (3)
        </button>
      </div>
    </div>
  );
} 