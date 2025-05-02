"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/authContext/AuthContext";
import {
  useCreateCommentMutation,
  useGetCommentsByPostQuery,
} from "../features/api/commentSlice/commentSlice";
import { usePostByIdQuery } from "../features/api/postSlice/postSlice";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  setPost,
  likePost,
  dislikePost,
  addComment,
  setComments,
} from "../features/slice/publicPostSlice/publicPostSlice";

const Page = () => {
  const searchParams = useSearchParams();
  const postID = searchParams.get("id");

  const dispatch = useDispatch();
  const { post, comments, likes, dislikes, hasLiked, hasDisliked } =
    useSelector((state) => state.publicPost);

  const [showAllComments, setShowAllComments] = useState(false);

  const {
    data: singelPost,
    isLoading: postLoading,
    error: postError,
  } = usePostByIdQuery(postID, { skip: !postID });
  const { data: commentData, isLoading: commentLoading } =
    useGetCommentsByPostQuery(postID, { skip: !postID });

  const [createComment] = useCreateCommentMutation();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Set post and comment data to Redux
  useEffect(() => {
    if (singelPost) {
      dispatch(setPost(singelPost));

      const userCookie = Cookies.get("user");
      const userData = userCookie ? JSON.parse(userCookie) : null;

      if (userData) {
        if (userData.likedPosts?.includes(postID)) dispatch(likePost());
        if (userData.dislikedPosts?.includes(postID)) dispatch(dislikePost());
      }
    }

    if (commentData?.comments) {
      dispatch(setComments(commentData.comments));
    }
  }, [singelPost, commentData, dispatch, postID]);

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
    dispatch(likePost());
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
    dispatch(dislikePost());
  };

  const onSubmit = async (data) => {
    const commentData = {
      postId: postID,
      content: data.comment,
    };
    const res = await createComment(commentData).unwrap();
    dispatch(addComment(res)); // New comment added
    reset();
  };

  if (postLoading) return <p className="text-white">Loading...</p>;
  if (postError || !post)
    return <p className="text-red-500 text-center">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-white">
      {/* Image */}
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-60 bg-gray-800 rounded-md mb-4 flex items-center justify-center text-gray-400">
          No Image Provided
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* Author & Date */}
      <div className="text-gray-400 mb-4 text-sm">
        <span>{post.author?.name || "Unknown Author"}</span> |{" "}
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <p className="text-gray-200 mb-6">{post.content}</p>

      {/* Like/Dislike */}
      {user?.token ? (
        <>
          <button
            onClick={handleLike}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2"
          >
            👍 Like ({likes})
          </button>
          <button
            onClick={handleDislike}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
          >
            👎 Dislike ({dislikes})
          </button>
        </>
      ) : (
        <p className="text-gray-400 mb-4 italic">
          Please log in to like or dislike the post.
        </p>
      )}

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {/* Comment Form */}
        {user?.token ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <textarea
              {...register("comment", { required: "Comment cannot be empty" })}
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded mb-2"
              rows={3}
              placeholder="Write a comment..."
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-400 mb-4 italic">
            Please log in to post a comment.
          </p>
        )}

        {/* Comment List */}
        <div className="space-y-3">
          {(showAllComments ? comments : comments.slice(0, 2))?.map(
            (comment) => (
              <div
                key={comment._id}
                className="bg-gray-800 p-3 rounded text-sm text-gray-300"
              >
                <p className="font-semibold text-white">
                  {comment.author?.name || "Anonymous"}
                </p>
                <p>{comment.content}</p>
              </div>
            )
          )}
          {comments.length > 2 && !showAllComments && (
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
