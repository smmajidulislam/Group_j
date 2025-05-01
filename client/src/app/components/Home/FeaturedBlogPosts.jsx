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

  // Get user data from cookies
  const userCookie = Cookies.get("user");
  const userData = userCookie ? JSON.parse(userCookie) : null;

  // Handling like click
  // Like handler
  const handleLike = async (postId) => {
    if (!userData) {
      alert("Please log in to like the post.");
      return;
    }

    const likedPosts = Array.isArray(userData.likedPosts)
      ? userData.likedPosts
      : [];
    const dislikedPosts = Array.isArray(userData.dislikedPosts)
      ? userData.dislikedPosts
      : [];

    const hasLiked = likedPosts.includes(postId);
    const hasDisliked = dislikedPosts.includes(postId);

    if (hasLiked) {
      alert("You already liked this post.");
      return;
    }

    // যদি আগে dislike করে থাকে তাহলে সেটা রিমুভ করো
    if (hasDisliked) {
      dislikedPosts.splice(dislikedPosts.indexOf(postId), 1);
    }

    await likePost(postId);

    const updatedUserData = {
      ...userData,
      likedPosts: [...likedPosts, postId],
      dislikedPosts: dislikedPosts, // আপডেটেড dislike list
    };

    Cookies.set("user", JSON.stringify(updatedUserData));
  };

  // Dislike handler
  const handleDislike = async (postId) => {
    if (!userData) {
      alert("Please log in to dislike the post.");
      return;
    }

    const likedPosts = Array.isArray(userData.likedPosts)
      ? userData.likedPosts
      : [];
    const dislikedPosts = Array.isArray(userData.dislikedPosts)
      ? userData.dislikedPosts
      : [];

    const hasDisliked = dislikedPosts.includes(postId);
    const hasLiked = likedPosts.includes(postId);

    if (hasDisliked) {
      alert("You already disliked this post.");
      return;
    }

    // যদি আগে like করে থাকে তাহলে সেটা রিমুভ করো
    if (hasLiked) {
      likedPosts.splice(likedPosts.indexOf(postId), 1);
    }

    await dislikePost(postId);

    const updatedUserData = {
      ...userData,
      dislikedPosts: [...dislikedPosts, postId],
      likedPosts: likedPosts, // আপডেটেড like list
    };

    Cookies.set("user", JSON.stringify(updatedUserData));
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
                <button
                  className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow-sm transition duration-200 flex items-center space-x-2"
                  onClick={() => handleLike(post._id, post.likes)}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes || 0}</span>
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full shadow-sm transition duration-200 flex items-center space-x-2"
                  onClick={() => handleDislike(post._id)}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.dislikes || 0}</span>
                </button>
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
