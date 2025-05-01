"use client";

import { useGetPostsQuery } from "@/app/features/api/postSlice/postSlice";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

export default function FeaturedBlogPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useGetPostsQuery(currentPage);
  const posts = data?.posts || [];

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p className="text-gray-400 text-center py-10">লোড হচ্ছে...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center py-10">
        {error?.message || "Unknown error"}
      </p>
    );
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-xl text-gray-300 font-semibold mb-8">Blog posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-700 rounded-lg p-4 bg-gray-900"
          >
            {/* Post image */}
            {post?.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-800 rounded-md mb-3 flex items-center justify-center text-gray-500 text-sm">
                No post image
              </div>
            )}

            {/* Meta info */}
            <div className="flex items-center text-sm text-gray-400 space-x-4 mb-2">
              <span className="font-medium">{post.author.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>

            {/* Post title */}
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {post.title}
            </h3>

            {/* Content preview */}
            <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>

            {/* Likes and Comments */}
            <div className="flex items-center text-sm text-gray-400 gap-6 mb-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
                <span>{post.dislikes || 0}</span>
              </div>
            </div>

            {/* Read more */}
            <Link
              href={{
                pathname: "/post",
                query: { id: post._id },
              }}
              className="text-blue-500 font-medium hover:underline text-sm flex items-center gap-1"
            >
              Read more <span>&rarr;</span>
            </Link>
          </div>
        ))}
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
    </section>
  );
}
