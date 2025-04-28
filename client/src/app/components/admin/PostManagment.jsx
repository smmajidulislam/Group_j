"use client";
import { useState, useEffect } from "react";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/app/features/api/postSlice/postSlice";

export default function PostManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetPostsQuery(currentPage);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (post) => {
    setEditingPost(post._id);
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
      setEditingPost(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteClick = async (postId) => {
    setDeleteLoading(true);
    try {
      await deletePost(postId).unwrap();
      setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditContent("");
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  if (isLoading || deleteLoading) return <div>Loading...</div>;
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
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Content</th>
              <th className="py-3 px-4 text-left">Author</th>
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
                    post?.title
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
                    post?.content
                  )}
                </td>
                <td className="py-3 px-4">{post?.author?.name}</td>
                <td className="py-3 px-4 text-center">
                  {post.createdAt && new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
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

      <div className="flex justify-center mt-3 space-x-2">
        <button
          className={`px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md ${
            isPrevDisabled ? "cursor-not-allowed" : ""
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
            isNextDisabled ? "cursor-not-allowed" : ""
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
