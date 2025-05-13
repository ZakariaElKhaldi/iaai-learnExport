export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Consultations</h1>
      <p className="text-gray-600">View your scheduled and past consultations</p>
      
      <div className="flex justify-end mb-4">
        <a 
          href="/consultations/request" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Request Consultation
        </a>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <p className="text-gray-500">You don&apos;t have any consultations yet.</p>
      </div>
    </div>
  );
} 