"use client";
import { useState } from "react";
import {
  useGetPostsQuery,
  useLikePostMutation,
  useDislikePostMutation,
} from "@/app/features/api/postSlice/postSlice";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Cookies from "js-cookie";

export default function FeaturedBlogPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useGetPostsQuery(currentPage);
  const posts = data?.posts || [];
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };

  const userCookie = Cookies.get("user");
  const userData = userCookie ? JSON.parse(userCookie) : null;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === data?.pages;

  const handlePageChange = (page) => setCurrentPage(page);

  const handleLike = async (postId) => {
    if (!userData) return alert("Please log in to like the post.");

    const likedPosts = userData.likedPosts || [];
    const dislikedPosts = userData.dislikedPosts || [];

    if (likedPosts.includes(postId))
      return alert("You already liked this post.");

    if (dislikedPosts.includes(postId)) {
      dislikedPosts.splice(dislikedPosts.indexOf(postId), 1);
    }

    await likePost(postId);
    Cookies.set(
      "user",
      JSON.stringify({
        ...userData,
        likedPosts: [...likedPosts, postId],
        dislikedPosts,
      })
    );
  };

  const handleDislike = async (postId) => {
    if (!userData) return alert("Please log in to dislike the post.");

    const likedPosts = userData.likedPosts || [];
    const dislikedPosts = userData.dislikedPosts || [];

    if (dislikedPosts.includes(postId))
      return alert("You already disliked this post.");

    if (likedPosts.includes(postId)) {
      likedPosts.splice(likedPosts.indexOf(postId), 1);
    }

    await dislikePost(postId);
    Cookies.set(
      "user",
      JSON.stringify({
        ...userData,
        dislikedPosts: [...dislikedPosts, postId],
        likedPosts,
      })
    );
  };

  if (isLoading) {
    return (
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <h2 className="text-xl text-gray-300 font-semibold mb-8">Blog posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col border border-gray-700 rounded-lg p-4 bg-gray-900 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-700 rounded-md mb-3" />
              <div className="h-4 bg-gray-700 w-1/2 mb-2 rounded" />
              <div className="h-4 bg-gray-700 w-3/4 mb-2 rounded" />
              <div className="h-4 bg-gray-700 w-full mb-2 rounded" />
              <div className="h-4 bg-gray-700 w-2/3 mb-4 rounded" />
              <div className="flex gap-3">
                <div className="h-8 w-20 bg-gray-700 rounded-md" />
                <div className="h-8 w-20 bg-gray-700 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
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
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col border border-gray-700 rounded-lg p-4 bg-gray-900 animate__animated animate__rotateIn animate__duration-4000 animate__delay-1s"
          >
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

            <div className="flex items-center text-sm text-gray-400 space-x-4 mb-2 ">
              <span className="font-medium">{post.author.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {post.title}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>

            <div className="flex items-center text-sm text-gray-400 gap-6 mb-4">
              <button
                className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-sm flex items-center gap-1"
                onClick={() => handleLike(post._id)}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes || 0}</span>
              </button>
              <button
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm flex items-center gap-1"
                onClick={() => handleDislike(post._id)}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{post.dislikes || 0}</span>
              </button>
            </div>

            <Link
              href={{ pathname: "/post", query: { id: post._id } }}
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
    </section>
  );
}
