import { Eye, Trash } from "lucide-react";

export default function PostsTable() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Posts</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-2">TITLE</th>
            <th className="p-2">AUTHOR</th>
            <th className="p-2">DATE</th>
            <th className="p-2">STATS</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">Post {i + 1} by Admin</td>
              <td className="p-2 flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                  M
                </div>
                Mijanur Rahman
              </td>
              <td className="p-2">about 2 hours ago</td>
              <td className="p-2 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye size={16} /> 1
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} /> 0
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} /> 0
                </span>
              </td>
              {/* ACTIONS column starts here */}
              <td className="p-2 ">
                <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                  <Eye size={16} />
                </button>
                <button className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200">
                  <Trash size={16} />
                </button>
              </td>
              {/* ACTIONS column ends here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
