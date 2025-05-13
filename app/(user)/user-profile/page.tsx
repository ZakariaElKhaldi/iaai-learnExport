export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="text-gray-600">View and manage your profile information</p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Summary Card */}
        <div className="bg-white p-6 rounded shadow-sm border md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium">John Doe</h2>
            <p className="text-gray-500">Web Developer</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Change Profile Picture
            </button>
          </div>
        </div>
        
        {/* Profile Details Card */}
        <div className="bg-white p-6 rounded shadow-sm border flex-1">
          <h2 className="text-lg font-medium mb-4">Profile Details</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="John"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="johndoe@example.com"
                readOnly
              />
              <p className="mt-1 text-xs text-gray-500">To change your email address, please contact support.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                defaultValue="Web developer with 5 years of experience specializing in front-end technologies."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="New York, USA"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input 
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="Web Developer"
              />
            </div>
            
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Sections */}
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Skills & Interests</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">JavaScript</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">React</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">CSS</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">HTML</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Node.js</span>
              <button className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm">+ Add Skill</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Learning Interests</label>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Machine Learning</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Blockchain</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Cloud Computing</span>
              <button className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm">+ Add Interest</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 