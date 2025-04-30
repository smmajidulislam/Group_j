export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-gray-200 font-bold mb-6">📊 User Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
