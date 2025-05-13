export default function ConsultantDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Consultant Dashboard</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
        <p className="text-gray-500">Your scheduled consultation sessions will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Pending Requests</h2>
        <p className="text-gray-500">Consultation requests awaiting your response will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Availability Calendar</h2>
        <p className="text-gray-500">Your availability schedule will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Session History</h2>
        <p className="text-gray-500">Your past consultation sessions will be displayed here.</p>
      </div>
    </div>
  );
} 