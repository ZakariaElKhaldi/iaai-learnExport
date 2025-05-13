export default function ConsultantAvailabilityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Availability</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Calendar View</h2>
        <p className="text-gray-500">Your availability calendar will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Recurring Availability</h2>
        <p className="text-gray-500">Set up recurring availability patterns here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Blocked Dates</h2>
        <p className="text-gray-500">Mark days when you are unavailable here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Timezone Settings</h2>
        <p className="text-gray-500">Manage your timezone preferences here.</p>
      </div>
    </div>
  );
} 