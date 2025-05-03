"use client";
import { useState, useEffect } from "react";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/app/features/api/postSlice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  setCurrentPage,
  setEditingPost,
  resetEditingPost,
  setDeleteLoading,
  deletePostFromList,
} from "@/app/features/slice/postMangementSlice/postMangementSlice";

export default function PostManagement() {
  const dispatch = useDispatch();
  const { posts, currentPage, editingPost, deleteLoading } = useSelector(
    (state) => state.postManagement
  );

  const { data, error, isLoading } = useGetPostsQuery(currentPage);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (data && data.posts) {
      dispatch(setPosts(data.posts));
    }
  }, [data, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleEditClick = (post) => {
    dispatch(setEditingPost(post._id));
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleEditSave = async () => {
    try {
      await updatePost({
        id: editingPost,
        title: editTitle,
        content: editContent,
      }).unwrap();
      dispatch(resetEditingPost());
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteClick = async (postId) => {
    dispatch(setDeleteLoading(true));
    try {
      await deletePost(postId).unwrap();
      dispatch(deletePostFromList(postId));
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      dispatch(setDeleteLoading(false));
    }
  };

  const handleCancelEdit = () => {
    dispatch(resetEditingPost());
    setEditTitle("");
    setEditContent("");
  };

  const truncateText = (text, wordLimit) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  const renderPostSkeleton = () => {
    return (
      <div className="w-full max-w-6xl overflow-x-auto animate-pulse">
        <table className="min-w-full text-left bg-white text-gray-900 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 px-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-48 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="h-4 w-28 bg-gray-300 mx-auto rounded"></div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <div className="h-8 w-12 bg-gray-300 rounded-md"></div>
                    <div className="h-8 w-12 bg-gray-300 rounded-md"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading || deleteLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            All posts
          </h2>
        </div>
        {renderPostSkeleton()}
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          All posts
        </h2>
      </div>

      <div className="w-full max-w-6xl rounded-lg overflow-x-auto">
        <table className="min-w-full text-left bg-white text-gray-900 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="py-3 px-4">
                  {editingPost === post._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    truncateText(post?.title, 100)
                  )}
                </td>
                <td className="py-3 px-4">
                  {editingPost === post._id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    truncateText(post?.content, 10)
                  )}
                </td>
                <td className="py-3 px-4">{post?.author?.name}</td>
                <td className="py-3 px-4 text-center">
                  {post.createdAt && new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-2 flex-wrap">
                  {editingPost === post._id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-md"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 p-2 rounded-md"
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(post)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-md"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md"
                  >
                    {deleteLoading ? "Deleting..." : "🗑️ Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 flex-wrap gap-2">
        <button
          className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md ${
            isPrevDisabled ? "cursor-not-allowed opacity-50" : ""
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
                page === currentPage ? "bg-blue-600" : "bg-blue-500"
              } hover:bg-blue-700`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md ${
            isNextDisabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => !isNextDisabled && handlePageChange(currentPage + 1)}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
