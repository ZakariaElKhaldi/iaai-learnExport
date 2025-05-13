export default function ConsultationRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Consultation Requests</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Pending Requests</h2>
        <p className="text-gray-500">Requests awaiting your approval will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Approved Requests</h2>
        <p className="text-gray-500">Scheduled consultation requests will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Declined Requests</h2>
        <p className="text-gray-500">Previously declined requests will appear here.</p>
      </div>
    </div>
  );
} 