"use client";
import { useState } from "react";
import CreatePostButton from "../components/dashbord/CreatePostButton";
import ProfileSummary from "../components/dashbord/ProfileSummary";
import Link from "next/link";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
} from "../features/api/postSlice/postSlice";
import Image from "next/image";
import { useAuth } from "../contexts/authContext/AuthContext";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const userId = user?.user?._id;
  const { data, isLoading, isError } = useGetPostByIdQuery(userId, {
    skip: !userId,
  });
  const [deletePost] = useDeletePostMutation();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id).unwrap();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto p-4">
        <ProfileSummary />
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-200 font-bold">My Posts</h2>
            <CreatePostButton />
          </div>

          {/* Handling Loading State with Skeleton Loader */}
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-5 bg-gray-200 rounded-xl shadow-sm animate-pulse"
                >
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-600">
              <p>Error loading posts. Please try again later.</p>
            </div>
          ) : data?.posts.length === 0 ? (
            <p className="text-gray-200">No posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.posts.map((post) => {
                const content = post?.content || "";
                const isLong = content.length > 20;
                const shortContent = isLong
                  ? content.slice(0, 25) + "..."
                  : content;

                return (
                  <div
                    key={post._id}
                    className="animate__animated animate__fadeIn animate__duration-1500"
                  >
                    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
                      <h3 className="text-xl font-semibold mb-2 truncate">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{shortContent}</p>

                      {post?.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt="Post Image"
                          width={400}
                          height={300}
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-gray-400 text-sm">
                          Please add an image
                        </div>
                      )}

                      {/* Responsive Button Container */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Link
                          href={{ pathname: `/post/${post._id}` }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-100 transition-all"
                        >
                          Edit
                        </Link>

                        <button
                          className="text-red-600 hover:text-red-800 text-sm font-medium px-4 py-2 rounded-md border border-red-600 hover:bg-red-100 transition-all"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Delete
                        </button>

                        {isLong && (
                          <span className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-100 transition-all">
                            Read more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-3 space-x-2">
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
