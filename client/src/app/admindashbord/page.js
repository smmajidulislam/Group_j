"use client";
import React from "react";
import { useState } from "react";
import PostManagment from "../components/admin/PostManagment";
import UserManegment from "../components/admin/UserManegment";

export default function page() {
  const [tab, setTab] = useState("user");

  // const users = [
  //   {
  //     name: "Hello User",
  //     email: "user0@example.com",
  //     role: "Admin",
  //     posts: 5,
  //     joined: "about 3 hours ago",
  //   },
  //   {
  //     name: "Hello User",
  //     email: "user1@example.com",
  //     role: "Admin",
  //     posts: 4,
  //     joined: "about 4 hours ago",
  //   },
  //   {
  //     name: "Hello User",
  //     email: "user2@example.com",
  //     role: "Admin",
  //     posts: 3,
  //     joined: "about 5 hours ago",
  //   },
  //   {
  //     name: "Hello User",
  //     email: "user3@example.com",
  //     role: "Admin",
  //     posts: 1,
  //     joined: "about 6 hours ago",
  //   },
  //   {
  //     name: "Hello User",
  //     email: "user4@example.com",
  //     role: "Admin",
  //     posts: 2,
  //     joined: "about 2 hours ago",
  //   },
  // ];

  // const posts = [
  //   {
  //     title: "How to Use Tailwind CSS",
  //     author: "Hello User",
  //     category: "Web Development",
  //     status: "Published",
  //     date: "2 hours ago",
  //   },
  //   {
  //     title: "Next.js Tips and Tricks",
  //     author: "Hello User",
  //     category: "Programming",
  //     status: "Draft",
  //     date: "5 hours ago",
  //   },
  //   {
  //     title: "Mastering React in 30 Days",
  //     author: "Hello User",
  //     category: "Frontend",
  //     status: "Published",
  //     date: "1 day ago",
  //   },
  //   {
  //     title: "Mastering Electron js in 30 Days",
  //     author: "Hello User",
  //     category: "Frontend",
  //     status: "Published",
  //     date: "1 day ago",
  //   },
  //   {
  //     title: "Mastering Tree js in 30 Days",
  //     author: "Hello User",
  //     category: "Frontend",
  //     status: "Published",
  //     date: "1 day ago",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("user")}
          className={`px-4 py-2 rounded-md font-semibold ${
            tab === "user" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setTab("post")}
          className={`px-4 py-2 rounded-md font-semibold ${
            tab === "post" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Post Management
        </button>
      </div>

      {/* Content */}
      {tab === "user" && (
        <UserManegment/>
      )}

      {tab === "post" && (
        <div className="text-center text-gray-400">
           <PostManagment/>
        </div>
      )}
    </div>
  );
}
