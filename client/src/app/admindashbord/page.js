"use client";
import React from "react";
import { useState } from "react";
import PostManagment from "../components/admin/PostManagment";
import UserManegment from "../components/admin/UserManegment";

export default function Page() {
  const [tab, setTab] = useState("user");

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

      
      {tab === "user" && <UserManegment />}

      {tab === "post" && (
        <div className="text-center text-gray-400">
          <PostManagment />
        </div>
      )}
    </div>
  );
}
