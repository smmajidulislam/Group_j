"use client";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/app/features/api/userSlice/userSlice";
import React, { useState } from "react";

export default function UserManegment() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [
    deleteUser,
    {
      isLoading: deleteUserLoading,
      isSuccess: deleteUserSuccess,
      error: deleteUserError,
    },
  ] = useDeleteUserMutation();

  const [deletionStatus, setDeletionStatus] = useState({}); // To track deletion status for each user

  const handleDeleteUser = async (id) => {
    try {
      // Set the deletion status to loading for the specific user
      setDeletionStatus((prevState) => ({ ...prevState, [id]: "loading" }));

      const res = await deleteUser(id).unwrap();

      // Update the deletion status for the user as 'success'
      setDeletionStatus((prevState) => ({ ...prevState, [id]: "success" }));
      console.log("User deleted successfully:", res);
    } catch (err) {
      // If error occurs, update the deletion status to 'error'
      setDeletionStatus((prevState) => ({
        ...prevState,
        [id]: `error: ${err.message}`,
      }));
      console.error("Error deleting user:", err);
    }
  };
  // Handling loading and error states
  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading users!</p>
    );
  }

  return (
    <div>
      <div className="w-full max-w-5xl bg-white text-gray-900 rounded-lg shadow-lg overflow-x-auto mx-auto mt-6">
        <h2 className="text-2xl font-bold p-4 border-b">All Users</h2>
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Joined</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  {user?.name}
                </td>
                <td className="py-3 px-4">{user?.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user?.isAdmin === true
                        ? "bg-red-200 text-red-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {user?.isAdmin === true ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {user?.createdAt &&
                    new Date(user.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user?._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md"
                    disabled={deletionStatus[user?._id] === "loading"}
                  >
                    {deletionStatus[user?._id] === "loading"
                      ? "Deleting..."
                      : "🗑️"}
                  </button>
                  {deletionStatus[user?._id] === "success" && (
                    <div className="text-green-500">
                      User successfully deleted!
                    </div>
                  )}
                  {deletionStatus[user?._id]?.startsWith("error") && (
                    <div className="text-red-500">
                      Error: {deletionStatus[user?._id]}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
          Prev
        </button>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          1
        </button>
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
          2
        </button>
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
          Next
        </button>
      </div>
    </div>
  );
}
