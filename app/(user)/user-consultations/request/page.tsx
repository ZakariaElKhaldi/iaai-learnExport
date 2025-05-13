export default function ConsultationRequestPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Request Consultation</h1>
      <p className="text-gray-600">Fill out the form to request a consultation with an expert</p>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Consultation Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Career Guidance</option>
              <option>Technical Review</option>
              <option>Project Planning</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder="Describe what you need help with..."
            />
          </div>
          
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 