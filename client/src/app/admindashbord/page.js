"use client";
import React, { useState } from "react";
import PostManagment from "../components/admin/PostManagment";
import UserManegment from "../components/admin/UserManegment";

export default function Page() {
  const [tab, setTab] = useState("user");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-8 md:px-6 lg:px-12">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setTab("user")}
          className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
            tab === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setTab("post")}
          className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
            tab === "post"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
        >
          Post Management
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-screen-lg">
        {tab === "user" && <UserManegment />}
        {tab === "post" && (
          <div className="text-gray-300">
            <PostManagment />
          </div>
        )}
      </div>
    </div>
  );
}
