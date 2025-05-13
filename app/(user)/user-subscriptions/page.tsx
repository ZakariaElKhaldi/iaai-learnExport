export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Subscriptions</h1>
      <p className="text-gray-600">Manage your subscription plans</p>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Basic Plan</h3>
              <p className="text-gray-500">$9.99/month</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">Next billing date: January 15, 2024</p>
            <p className="text-sm text-gray-600">Payment method: Visa ending in 4242</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800">
              Change Plan
            </button>
            <button className="text-red-600 hover:text-red-800">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 