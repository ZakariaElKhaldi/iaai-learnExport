export default function ConsultantProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Consultant Profile</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Personal Information</h2>
        <p className="text-gray-500">Edit your personal information and contact details here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Expertise & Specializations</h2>
        <p className="text-gray-500">Manage your areas of expertise and specializations here.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Consultation Pricing</h2>
        <p className="text-gray-500">Set your rates and pricing options for different types of consultations.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Profile Visibility</h2>
        <p className="text-gray-500">Control how your profile appears to potential clients.</p>
      </div>
    </div>
  );
} 