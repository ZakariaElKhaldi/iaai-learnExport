export default function ConsultantSessionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Consultation Sessions</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
        <p className="text-gray-500">Your scheduled upcoming sessions will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Past Sessions</h2>
        <p className="text-gray-500">Completed sessions history will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Session Notes</h2>
        <p className="text-gray-500">Tools to manage session notes will appear here.</p>
      </div>
    </div>
  );
} 