export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Company Reports</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Learning Progress Overview</h2>
        <p className="text-gray-500">Employee learning metrics will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Course Completion Rates</h2>
        <p className="text-gray-500">Course completion analytics will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Department Performance</h2>
        <p className="text-gray-500">Department-level metrics will be displayed here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Export Options</h2>
        <p className="text-gray-500">Report export tools will be available here.</p>
      </div>
    </div>
  );
} 