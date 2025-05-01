"use client";
import Image from "next/image";
import { useState } from "react";

const dummyComments = [
  { id: 1, text: "Great post!", author: "Alice" },
  { id: 2, text: "Thanks for sharing.", author: "Bob" },
  { id: 3, text: "Very helpful!", author: "Charlie" },
  { id: 4, text: "Loved it.", author: "David" },
];
const Page = ({ searchParams }) => {
  const id = searchParams.id;
  const [likes, setLikes] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        author: "You",
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  if (!post) {
    return <div className="text-center text-red-500 mt-10">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white">
      {/* Post Image */}
      {post.imageUrl ? (
        <Image
          src={post.imageUrl}
          alt={post.title}
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
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{post.title}</h1>

      {/* Author & Date */}
      <div className="text-gray-400 mb-4 text-xs sm:text-sm">
        <span>{post.author?.name || "Unknown Author"}</span> |{" "}
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <p className="text-gray-200 leading-relaxed mb-6 text-sm sm:text-base">
        {post.content}
      </p>

      {/* Likes */}
      <button
        onClick={handleLike}
        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 sm:px-4 rounded mb-4 text-sm sm:text-base"
      >
        👍 Like ({likes})
      </button>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-2 text-sm sm:text-base"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm sm:text-base"
          >
            Post Comment
          </button>
        </form>

        {/* Comments Display */}
        <div className="space-y-3">
          {(showAllComments ? comments : comments.slice(0, 2)).map(
            (comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 p-3 rounded text-sm text-gray-300"
              >
                <p className="font-semibold text-white">{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            )
          )}

          {/* See more button */}
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
