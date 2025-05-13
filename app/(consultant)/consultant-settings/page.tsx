export default function ConsultantSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Consultant Settings</h1>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Account Settings</h2>
        <p className="text-gray-500">Manage your account preferences and security settings.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
        <p className="text-gray-500">Control when and how you receive notifications.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
        <p className="text-gray-500">Manage your payment and payout methods.</p>
      </div>
      
      <div className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
        <p className="text-gray-500">Control your data and privacy preferences.</p>
      </div>
    </div>
  );
} 