import React from 'react'

export default function PostManagment() {
    const posts = [
        {
          title: "How to Use Tailwind CSS",
          author: "Hello User",
          category: "Web Development",
          status: "Published",
          date: "2 hours ago",
        },
        {
          title: "Next.js Tips and Tricks",
          author: "Hello User",
          category: "Programming",
          status: "Draft",
          date: "5 hours ago",
        },
        {
          title: "Mastering React in 30 Days",
          author: "Hello User",
          category: "Frontend",
          status: "Published",
          date: "1 day ago",
        },
        {
          title: "Mastering Electron js in 30 Days",
          author: "Hello User",
          category: "Frontend",
          status: "Published",
          date: "2 day ago",
        },
        {
          title: "Mastering Tree js in 30 Days",
          author: "Hello User",
          category: "Frontend",
          status: "Published",
          date: "5 day ago",
        },
      ];
  return (
    <div>
      <div className="min-h-screen bg-gray-900 rounded-lg text-white p-3 flex flex-col items-center">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-6 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold">All posts</h2>
            </div>

            {/* Proper Responsive Table */}
            <div className="w-full max-w-6xl rounded-lg overflow-x-auto">
              <table className="min-w-[900px] text-left bg-white text-gray-900 rounded-lg shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Author
                    </th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">
                      Date
                    </th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-3 px-4 whitespace-nowrap">
                        {post.title}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {post.author}
                      </td>
                      
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {post.date}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap flex justify-center gap-2">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-md">
                          ✏️
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-3 space-x-2">
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md">
                Prev
              </button>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md">
                1
              </button>
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md">
                2
              </button>
              <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md">
                Next
              </button>
            </div>
          </div>
    </div>
  )
}
