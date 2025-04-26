export default function AccountSettings() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">⚙️ Account Settings</h3>
      <button className="text-blue-600 hover:underline">Update Profile</button>
      <span className="mx-2">|</span>
      <button className="text-blue-600 hover:underline">Change Password</button>
    </div>
  );
}
