"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/authContext/AuthContext";
import {
  useCreateCommentMutation,
  useGetCommentsByPostQuery,
  useUpdateCommentMutation,
} from "../features/api/commentSlice/commentSlice";
import {
  usePostByIdQuery,
  useUpdatePostMutation,
} from "../features/api/postSlice/postSlice";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  setPost,
  likePost,
  dislikePost,
  addComment,
  setComments,
  setEditingPost,
  setEditForm,
  setEditingCommentId,
  setEditCommentText,
  updatePostInState,
} from "../features/slice/publicPostSlice/publicPostSlice";
import { toast } from "react-toastify";
const Singelpost = ({ id }) => {
  const postID = id;

  const dispatch = useDispatch();
  const {
    post,
    comments,
    likes,
    dislikes,
    editingPost,
    editForm,
    editCommentText,
    editingCommentId,
  } = useSelector((state) => state.publicPost);

  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useAuth();

  const {
    data: singelPost,
    isLoading: postLoading,
    error: postError,
  } = usePostByIdQuery(postID, { skip: !postID });
  const { data: commentData } = useGetCommentsByPostQuery(postID, {
    skip: !postID,
  });

  const [createComment] = useCreateCommentMutation();
  const [updatePost] = useUpdatePostMutation();
  const [updateComment] = useUpdateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (singelPost) {
      dispatch(setPost(singelPost));
      dispatch(
        setEditForm({
          title: singelPost.title,
          content: singelPost.content,
          imageUrl: singelPost.imageUrl || "",
        })
      );

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
    if (!user?.token) return toast.success("Please log in to like the post.");
    const userCookie = Cookies.get("user");
    const userData = userCookie ? JSON.parse(userCookie) : {};
    if (userData.likedPosts?.includes(postID))
      return toast.success("Already liked.");
    const updatedLikedPosts = [...(userData.likedPosts || []), postID];
    const updatedDislikedPosts = (userData.dislikedPosts || []).filter(
      (id) => id !== postID
    );
    Cookies.set(
      "user",
      JSON.stringify({
        ...userData,
        likedPosts: updatedLikedPosts,
        dislikedPosts: updatedDislikedPosts,
      })
    );
    dispatch(likePost());
  };

  const handleDislike = () => {
    if (!user?.token)
      return toast.success("Please log in to dislike the post.");
    const userCookie = Cookies.get("user");
    const userData = userCookie ? JSON.parse(userCookie) : {};
    if (userData.dislikedPosts?.includes(postID))
      return toast.success("Already disliked.");
    const updatedDislikedPosts = [...(userData.dislikedPosts || []), postID];
    const updatedLikedPosts = (userData.likedPosts || []).filter(
      (id) => id !== postID
    );
    Cookies.set(
      "user",
      JSON.stringify({
        ...userData,
        likedPosts: updatedLikedPosts,
        dislikedPosts: updatedDislikedPosts,
      })
    );
    dispatch(dislikePost());
  };

  const onSubmit = async (data) => {
    const commentData = { postId: postID, content: data.comment };
    const res = await createComment(commentData).unwrap();
    dispatch(addComment(res));
    reset();
  };

  const handlePostUpdate = async () => {
    try {
      const updatedPost = await updatePost({
        id: postID,
        title: editForm.title,
        content: editForm.content,
        imageUrl: editForm.imageUrl,
      }).unwrap();

      dispatch(updatePostInState(updatedPost));
      dispatch(setEditingPost(false));
    } catch (error) {
      console.error("Post update failed:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setEditForm({ ...editForm, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCommentUpdate = async (commentId) => {
    const updated = await updateComment({
      id: commentId,
      commentData: { content: editCommentText },
    }).unwrap();
    const updatedComments = comments.map((comment) =>
      comment._id === commentId ? updated : comment
    );
    dispatch(setComments(updatedComments));
    dispatch(setEditingCommentId(null));
    dispatch(setEditCommentText(""));
  };

  if (postLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="bg-gray-700 h-60 w-full rounded-md"></div>
        <div className="bg-gray-700 h-6 w-3/4 rounded-md"></div>
        <div className="bg-gray-700 h-4 w-full rounded-md"></div>
        <div className="space-y-3">
          <div className="bg-gray-700 h-6 w-full rounded-md"></div>
          <div className="bg-gray-700 h-6 w-full rounded-md"></div>
        </div>
      </div>
    );
  }
  if (postError || !post)
    return <p className="text-red-500 text-center">Post not found</p>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl mx-auto px-4 py-6 text-white">
        {/* Image */}
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            priority
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

        {/* Edit Button for Post */}
        {user?.user?.name === post.author?.name && !editingPost && (
          <button
            onClick={() => dispatch(setEditingPost(true))}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded mb-4"
          >
            ✏️ Edit Post
          </button>
        )}

        {editingPost && (
          <div className="mb-6">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                dispatch(setEditForm({ ...editForm, title: e.target.value }))
              }
              placeholder="Title"
              className="w-full mb-2 p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <textarea
              value={editForm.content}
              onChange={(e) =>
                dispatch(setEditForm({ ...editForm, content: e.target.value }))
              }
              rows={4}
              placeholder="Content"
              className="w-full mb-2 p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="mb-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handlePostUpdate}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                ✅ Confirm Update
              </button>
              <button
                onClick={() => dispatch(setEditingPost(false))}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Likes & Dislikes */}
        <div className="flex gap-4 items-center mb-6">
          <button
            onClick={handleLike}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
          >
            👍 {likes}
          </button>
          <button
            onClick={handleDislike}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
          >
            👎 {dislikes}
          </button>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <textarea
              {...register("comment")}
              placeholder="Add a comment"
              className="w-full mb-2 p-2 bg-gray-800 border border-gray-600 rounded"
            />
            {errors.comment && (
              <span className="text-red-500 text-sm">
                {errors.comment.message}
              </span>
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
            >
              Submit Comment
            </button>
          </form>

          {comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b border-gray-600 py-3"
                >
                  <p>{comment.content}</p>
                  <div className="flex gap-2 mt-2">
                    {user?.user?.name === comment.author?.name && (
                      <button
                        onClick={() =>
                          dispatch(setEditingCommentId(comment._id))
                        }
                        className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded"
                      >
                        ✏️ Edit Comment
                      </button>
                    )}

                    {editingCommentId === comment._id && (
                      <div className="flex gap-2 mt-2">
                        <textarea
                          value={editCommentText}
                          onChange={(e) =>
                            dispatch(setEditCommentText(e.target.value))
                          }
                          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
                        />
                        <button
                          onClick={() => handleCommentUpdate(comment._id)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                        >
                          Confirm Update
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="text-blue-600 hover:underline mt-4"
              >
                {showAllComments ? "Show Less" : "Show All Comments"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Singelpost;
