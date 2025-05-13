export default function EnterpriseSubscriptionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Company Subscription</h1>
      
      <div className="bg-white border rounded shadow-sm mb-8">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-1">Enterprise Plus Plan</h2>
              <p className="text-gray-600">Your subscription renews on August 15, 2025</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Plan Price</h3>
              <p className="text-lg font-medium">$2,999/month</p>
              <p className="text-sm text-gray-500">Annual billing ($35,988/year)</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Employee Seats</h3>
              <p className="text-lg font-medium">300 seats</p>
              <p className="text-sm text-gray-500">245 seats in use</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Next Payment</h3>
              <p className="text-lg font-medium">August 15, 2025</p>
              <p className="text-sm text-gray-500">via VISA •••• 4242</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Change Plan
            </button>
            <button className="px-4 py-2 border rounded">
              Update Payment Method
            </button>
            <button className="px-4 py-2 border rounded">
              View Billing History
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Employee Seats</h2>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold">245/300</span>
              <span className="text-sm text-gray-500">82% utilized</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <div className="mt-6 space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm">
                Add More Seats
              </button>
              <p className="text-sm text-gray-500 text-center">
                $15.00 per additional seat/month
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Consultation Hours</h2>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold">32/50</span>
              <span className="text-sm text-gray-500">64% utilized</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '64%' }}></div>
            </div>
            <div className="mt-6 space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm">
                Purchase More Hours
              </button>
              <p className="text-sm text-gray-500 text-center">
                $199 per additional hour
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Course Access</h2>
          </div>
          <div className="p-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold">Unlimited</span>
              <span className="text-sm text-gray-500">227 enrolled</span>
            </div>
            <ul className="mt-4 space-y-1 text-sm">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Access to all 450+ courses</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Premium course content</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Downloadable resources</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Business Plan</h3>
            <p className="text-2xl font-bold mb-4">$999<span className="text-sm text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Up to 100 employees</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Basic analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>15 consultation hours/month</span>
              </li>
            </ul>
            <button className="w-full px-4 py-2 border rounded">
              Downgrade
            </button>
          </div>
          
          <div className="border rounded p-6 bg-blue-50 border-blue-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
              Current Plan
            </div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Plus</h3>
            <p className="text-2xl font-bold mb-4">$2,999<span className="text-sm text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Up to 300 employees</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Advanced analytics & reporting</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>50 consultation hours/month</span>
              </li>
            </ul>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded" disabled>
              Current Plan
            </button>
          </div>
          
          <div className="border rounded p-6">
            <h3 className="text-lg font-semibold mb-2">Enterprise Ultimate</h3>
            <p className="text-2xl font-bold mb-4">$4,999<span className="text-sm text-gray-500">/month</span></p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited employees</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Custom course creation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>100 consultation hours/month</span>
              </li>
            </ul>
            <button className="w-full px-4 py-2 border rounded">
              Upgrade
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Payment Method</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="p-4 border rounded flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">VISA ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm">Edit</button>
                <button className="px-3 py-1 border rounded text-sm text-red-600 border-red-600">Remove</button>
              </div>
            </div>
          </div>
          
          <button className="px-4 py-2 border rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Payment Method
          </button>
        </div>
      </div>
    </div>
  );
} 