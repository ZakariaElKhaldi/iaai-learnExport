export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Certificates</h1>
      <p className="text-gray-600">View and download your earned certificates</p>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <p className="text-gray-500">You haven&apos;t earned any certificates yet.</p>
      </div>
    </div>
  );
} 