"use client";
import { useState } from "react";
import Link from "next/link";
export default function ManagementButtons() {
  const [activeTab, setActiveTab] = useState(true);

  return (
    <div className="flex flex-wrap gap-4 justify-center m-2">
      <Link href="/admindashbord/userManagement">
        <button
          onClick={() => setActiveTab(true)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          }`}
        >
          User Management
        </button>
      </Link>

      <Link href="/admindashbord/postManagement">
        <button
          onClick={() => setActiveTab(false)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            !activeTab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          }`}
        >
          Post Management
        </button>
      </Link>
    </div>
  );
}
