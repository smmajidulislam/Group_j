import { Trash } from "lucide-react";

export default function UsersTable() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-2">NAME</th>
            <th className="p-2">EMAIL</th>
            <th className="p-2">ROLE</th>
            <th className="p-2">POSTS</th>
            <th className="p-2">JOINED</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {[...Array(3)].map((_, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                  H
                </div>
                Hello User
              </td>
              <td className="p-2">user{i}@example.com</td>
              <td className="p-2">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  Admin
                </span>
              </td>
              <td className="p-2">5</td>
              <td className="p-2">about 2 hours ago</td>
              <td className="p-2">
                <button className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
