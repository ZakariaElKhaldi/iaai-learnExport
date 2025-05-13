export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Media Library</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">My Uploads</h2>
        <p className="text-gray-500">Your uploaded media files will appear here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Upload New Media</h2>
        <p className="text-gray-500">Media upload tool will be available here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Media Categories</h2>
        <p className="text-gray-500">Organize your media with categories.</p>
      </div>
    </div>
  );
} 