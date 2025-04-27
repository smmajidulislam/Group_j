import React from 'react'

export default function UserManegment() {

    const users = [
        {
          name: "Hello User",
          email: "user0@example.com",
          role: "Admin",
          posts: 5,
          joined: "about 3 hours ago",
        },
        {
          name: "Hello User",
          email: "user1@example.com",
          role: "Admin",
          posts: 4,
          joined: "about 4 hours ago",
        },
        {
          name: "Hello User",
          email: "user2@example.com",
          role: "Admin",
          posts: 3,
          joined: "about 5 hours ago",
        },
        {
          name: "Hello User",
          email: "user3@example.com",
          role: "Admin",
          posts: 1,
          joined: "about 6 hours ago",
        },
        {
          name: "Hello User",
          email: "user4@example.com",
          role: "Admin",
          posts: 2,
          joined: "about 2 hours ago",
        },
      ];

  return (
      <div>
          <div className="w-full max-w-5xl bg-white text-gray-900 rounded-lg shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-bold p-4 border-b">All Users</h2>
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Posts</th>
                  <th className="py-3 px-4 text-center">Joined</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">{user.posts}</td>
                    <td className="py-3 px-4 text-center">{user.joined}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
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
  )
}
