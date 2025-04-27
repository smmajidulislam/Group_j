"use client";
import { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/app/features/api/postSlice/postSlice";

export default function PostManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetPostsQuery(currentPage);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);
  console.log(posts);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Disable 'Prev' button on the first page and 'Next' on the last page
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="min-h-screen bg-gray-900 rounded-lg text-white p-3 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold">All posts</h2>
        </div>

        {/* Table */}
        <div className="w-full max-w-6xl rounded-lg overflow-x-auto">
          <table className="min-w-[900px] text-left bg-white text-gray-900 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">Title</th>
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
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="py-3 px-4 whitespace-nowrap">{post?.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {post?.author?.name}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {post.createdAt &&
                      new Date(post.createdAt).toLocaleString()}
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
    </div>
  );
}
