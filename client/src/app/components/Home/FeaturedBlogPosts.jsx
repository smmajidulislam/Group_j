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

  const handleLike = async (postId) => {
    if (!userData) return alert("Please log in to like the post.");
    const likedPosts = Array.isArray(userData.likedPosts)
      ? userData.likedPosts
      : [];
    const dislikedPosts = Array.isArray(userData.dislikedPosts)
      ? userData.dislikedPosts
      : [];

    if (likedPosts.includes(postId))
      return alert("You already liked this post.");
    if (dislikedPosts.includes(postId))
      dislikedPosts.splice(dislikedPosts.indexOf(postId), 1);

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
    const likedPosts = Array.isArray(userData.likedPosts)
      ? userData.likedPosts
      : [];
    const dislikedPosts = Array.isArray(userData.dislikedPosts)
      ? userData.dislikedPosts
      : [];

    if (dislikedPosts.includes(postId))
      return alert("You already disliked this post.");
    if (likedPosts.includes(postId))
      likedPosts.splice(likedPosts.indexOf(postId), 1);

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
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl p-4 space-y-4 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-700 rounded-lg"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center py-10 text-sm sm:text-base">
        {error?.message || "Something went wrong!"}
      </p>
    );
  }

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-200 mb-8 text-center">
        Featured Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col border border-gray-700 rounded-xl p-4 bg-gray-900 animate__animated animate__rotateIn animate__duration-4000 animate__delay-1s"
          >
            {post?.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                No image
              </div>
            )}

            <div className="text-sm text-gray-400 flex items-center justify-between mb-2">
              <span className="font-medium">{post.author.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {post.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {post.content}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-1 text-blue-600 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-full text-sm"
              >
                <ThumbsUp className="w-4 h-4" />
                {post.likes || 0}
              </button>
              <button
                onClick={() => handleDislike(post._id)}
                className="flex items-center gap-1 text-red-600 bg-red-100 hover:bg-red-200 px-2 py-1 rounded-full text-sm"
              >
                <ThumbsDown className="w-4 h-4" />
                {post.dislikes || 0}
              </button>
            </div>

            <Link
              href={`/post/${post._id}`}
              className="text-blue-400 hover:underline text-sm"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>

        {Array.from({ length: data?.pages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === data?.pages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 ${
            currentPage === data?.pages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
}
