"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../contexts/authContext/AuthContext";
import {
  useCreateCommentMutation,
  useGetCommentsByPostQuery,
} from "../features/api/commentSlice/commentSlice";
import { useForm } from "react-hook-form";
import { usePostByIdQuery } from "../features/api/postSlice/postSlice";
import Cookies from "js-cookie";

const Page = () => {
  const searchParams = useSearchParams();
  const postID = searchParams.get("id");

  const [showAllComments, setShowAllComments] = useState(false);

  const {
    data: singelPost,
    isLoading: singelPostLoading,
    error: singelPostError,
  } = usePostByIdQuery(postID, { skip: !postID });

  const {
    data: commentData,
    isLoading: commentLoading,
    error: commentError,
  } = useGetCommentsByPostQuery(postID, { skip: !postID });

  const [createComment] = useCreateCommentMutation();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  // Set initial likes/dislikes and check cookie
  useEffect(() => {
    if (singelPost) {
      setLikes(singelPost.likes || 0);
      setDislikes(singelPost.dislikes || 0);

      const userCookie = Cookies.get("user");
      const userData = userCookie ? JSON.parse(userCookie) : null;

      if (userData) {
        setHasLiked(userData.likedPosts?.includes(postID));
        setHasDisliked(userData.dislikedPosts?.includes(postID));
      }
    }
  }, [singelPost, postID]);

  const handleLike = () => {
    if (!user?.token) return alert("Please log in to like the post.");

    const userCookie = Cookies.get("user");
    const userData = userCookie ? JSON.parse(userCookie) : {};

    if (userData.likedPosts?.includes(postID)) {
      alert("You already liked this post.");
      return;
    }

    const alreadyDisliked = userData.dislikedPosts?.includes(postID);

    const updatedLikedPosts = [...(userData.likedPosts || []), postID];
    const updatedDislikedPosts = (userData.dislikedPosts || []).filter(
      (id) => id !== postID
    );

    const updatedUser = {
      ...userData,
      likedPosts: updatedLikedPosts,
      dislikedPosts: updatedDislikedPosts,
    };

    Cookies.set("user", JSON.stringify(updatedUser));
    setHasLiked(true);
    setHasDisliked(false);
    setLikes((prev) => prev + 1);
    if (alreadyDisliked) setDislikes((prev) => Math.max(0, prev - 1));
  };

  const handleDislike = () => {
    if (!user?.token) return alert("Please log in to dislike the post.");

    const userCookie = Cookies.get("user");
    const userData = userCookie ? JSON.parse(userCookie) : {};

    if (userData.dislikedPosts?.includes(postID)) {
      alert("You already disliked this post.");
      return;
    }

    const alreadyLiked = userData.likedPosts?.includes(postID);

    const updatedDislikedPosts = [...(userData.dislikedPosts || []), postID];
    const updatedLikedPosts = (userData.likedPosts || []).filter(
      (id) => id !== postID
    );

    const updatedUser = {
      ...userData,
      likedPosts: updatedLikedPosts,
      dislikedPosts: updatedDislikedPosts,
    };

    Cookies.set("user", JSON.stringify(updatedUser));
    setHasDisliked(true);
    setHasLiked(false);
    setDislikes((prev) => prev + 1);
    if (alreadyLiked) setLikes((prev) => Math.max(0, prev - 1));
  };

  const onSubmit = async (data) => {
    const commentData = {
      postId: postID,
      content: data.comment,
    };
    await createComment(commentData).unwrap();
    reset();
  };

  if (singelPostLoading) return <p className="text-white">Loading...</p>;
  if (singelPostError || !singelPost)
    return <p className="text-red-500 text-center">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white">
      {/* Post Image */}
      {singelPost.imageUrl ? (
        <Image
          src={singelPost.imageUrl}
          alt={singelPost.title}
          width={800}
          height={400}
          className="w-full h-52 sm:h-60 md:h-72 lg:h-96 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-52 sm:h-60 bg-gray-800 rounded-md mb-4 flex items-center justify-center text-gray-400">
          No Image Provided
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        {singelPost.title}
      </h1>

      {/* Author & Date */}
      <div className="text-gray-400 mb-4 text-xs sm:text-sm">
        <span>{singelPost.author?.name || "Unknown Author"}</span> |{" "}
        <span>{new Date(singelPost.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <p className="text-gray-200 leading-relaxed mb-6 text-sm sm:text-base">
        {singelPost.content}
      </p>

      {/* Like & Dislike Buttons */}
      {user?.token ? (
        <>
          <button
            onClick={handleLike}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 sm:px-4 rounded m-4 mb-4 text-sm sm:text-base"
          >
            👍 Like ({likes})
          </button>
          <button
            onClick={handleDislike}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 sm:px-4 rounded mb-4 text-sm sm:text-base"
          >
            👎 Dislike ({dislikes})
          </button>
        </>
      ) : (
        <p className="text-gray-400 mb-4 text-sm italic">
          Please log in to like or dislike the post.
        </p>
      )}

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Comments</h2>

        {/* Comment Form */}
        {user?.token ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <textarea
              {...register("comment", { required: "Comment cannot be empty" })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-2 text-sm sm:text-base"
              rows={3}
              placeholder="Write a comment..."
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm sm:text-base"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-400 mb-4 text-sm italic">
            Please log in to post a comment.
          </p>
        )}

        {/* Comments List */}
        <div className="space-y-3">
          {(showAllComments
            ? commentData?.comments
            : commentData?.comments.slice(0, 2)
          )?.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-800 p-3 rounded text-sm text-gray-300"
            >
              <p className="font-semibold text-white">
                {comment?.author?.name || "Anonymous"}
              </p>
              <p>{comment?.content}</p>
            </div>
          ))}

          {commentData?.comments.length > 2 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="text-blue-400 hover:underline text-sm mt-2"
            >
              See more comments...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
