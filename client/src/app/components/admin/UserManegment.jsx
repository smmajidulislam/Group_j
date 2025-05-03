"use client";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/app/features/api/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setDeletionStatus,
  setEditMode,
  setEditData,
  resetEditData,
} from "@/app/features/slice/userMangementSlice/userMangementSlice";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { currentPage, deletionStatus, editMode, editData } = useSelector(
    (state) => state.userMangement
  );

  const { data, error, isLoading } = useGetUsersQuery(currentPage);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handlePageChange = (page) => dispatch(setCurrentPage(page));

  const handleDeleteUser = async (id) => {
    try {
      dispatch(setDeletionStatus({ id, status: "loading" }));
      await deleteUser(id).unwrap();
      dispatch(setDeletionStatus({ id, status: "success" }));
    } catch (err) {
      dispatch(setDeletionStatus({ id, status: `error: ${err.message}` }));
    }
  };

  const handleEditClick = (user) => {
    dispatch(setEditMode({ id: user._id, value: true }));
    dispatch(setEditData({ name: user.name, isAdmin: user.isAdmin }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setEditData({
        ...editData,
        [name]: name === "isAdmin" ? value === "true" : value,
      })
    );
  };

  const handleEditSave = async (id) => {
    try {
      await updateUser({ id, ...editData }).unwrap();
      dispatch(setEditMode({ id, value: false }));
      dispatch(resetEditData());
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const isNextDisabled = currentPage === data?.pages;
  const isPrevDisabled = currentPage === 1;

  return (
    <div className="px-2 md:px-4 lg:px-6">
      <div className="w-full max-w-7xl mx-auto bg-white text-gray-900 rounded-lg shadow-lg overflow-x-auto mt-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold p-4 border-b">
          All Users
        </h2>

        {isLoading ? (
          <table className="w-full min-w-[600px] animate-pulse">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Email", "Role", "Joined", "Actions"].map((head) => (
                  <th
                    key={head}
                    className="py-2 px-4 text-left text-gray-500 text-sm md:text-base"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">Error loading users!</p>
        ) : (
          <table className="w-full min-w-[600px] text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left">Name</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left">Email</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left">Role</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-center">
                  Joined
                </th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-2 md:py-3 md:px-4 flex items-center gap-2 md:gap-3">
                    <div className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    {editMode[user._id] ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded-md w-full"
                      />
                    ) : (
                      user?.name
                    )}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4">{user?.email}</td>
                  <td className="py-2 px-2 md:py-3 md:px-4">
                    {editMode[user._id] ? (
                      <select
                        name="isAdmin"
                        value={editData?.isAdmin}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded-md w-full"
                      >
                        <option value="true">Admin</option>
                        <option value="false">User</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user?.isAdmin
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {user?.isAdmin ? "Admin" : "User"}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center">
                    {user?.createdAt &&
                      new Date(user.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                    {editMode[user._id] ? (
                      <>
                        <button
                          onClick={() => handleEditSave(user._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              setEditMode({ id: user._id, value: false })
                            )
                          }
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-md"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md"
                          disabled={deletionStatus[user._id] === "loading"}
                        >
                          {deletionStatus[user._id] === "loading"
                            ? "Deleting..."
                            : "🗑️"}
                        </button>
                      </>
                    )}
                    {deletionStatus[user._id] === "success" && (
                      <div className="text-green-500 text-xs">Deleted!</div>
                    )}
                    {deletionStatus[user._id]?.startsWith("error") && (
                      <div className="text-red-500 text-xs">
                        {deletionStatus[user._id]}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !error && (
        <div className="flex justify-center mt-4 flex-wrap gap-2">
          <button
            className={`px-3 py-1 bg-gray-700 text-white rounded-md ${
              isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isPrevDisabled && handlePageChange(currentPage - 1)}
            disabled={isPrevDisabled}
          >
            Prev
          </button>

          {Array.from({ length: data?.pages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-blue-200 text-blue-900"
                } hover:bg-blue-500`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className={`px-3 py-1 bg-gray-700 text-white rounded-md ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => !isNextDisabled && handlePageChange(currentPage + 1)}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
