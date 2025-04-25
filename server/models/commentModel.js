const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
