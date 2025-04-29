const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
// exports.getPosts = async (req, res) => {
//     try {
//         const pageSize = 10;
//         const page = Number(req.query.page) || 1;

//         const count = await Post.countDocuments();

//         const posts = await Post.find()
//             .populate('author', 'name')
//             .sort({ createdAt: -1 })
//             .limit(pageSize)
//             .skip(pageSize * (page - 1));

//         console.log('post.controller.js getPosts ==>', posts);

//         res.status(200).json({
//             posts: posts.map(post => ({
//                 _id: post._id,
//                 title: post.title,
//                 content: post.content,
//                 author: {
//                     _id: post.author?._id,
//                     name: post.author?.name
//                 },
//                 createdAt: post.createdAt,
//                 updatedAt: post.updatedAt,
//                 likes: post.likes,
//                 dislikes: post.dislikes,
//                 imageUrl: post.imageUrl
//             })),
//             page,
//             pages: Math.ceil(count / pageSize)
//         });

//         // Get all posts and populate author
//         const post = await Post.find()
//             .populate({
//                 path: 'author',
//                 select: 'name email isAdmin isSuspended'
//             })
//             .sort({ createdAt: -1 });

//         // Filter out posts from suspended users
//         const visiblePosts = post.filter(pst => !pst.author.isSuspended);

//         res.status(200).json(visiblePosts);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// new code where suspended user's posts are not shown===================
// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    // Find posts with populated author info
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "name isSuspended",
      })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Filter out posts whose author is suspended
    const visiblePosts = posts.filter((post) => !post.author?.isSuspended);

    const totalPostsCount = await Post.countDocuments();

    res.status(200).json({
      posts: visiblePosts.map((post) => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        author: {
          _id: post.author?._id,
          name: post.author?.name,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
        dislikes: post.dislikes,
        imageUrl: post.imageUrl,
      })),
      page,
      pages: Math.ceil(totalPostsCount / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      _id: post._id,
      title: post.title,
      content: post.content,
      author: {
        _id: post.author._id,
        name: post.author.name,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes: post.likes,
      dislikes: post.dislikes,
      imageUrl: post.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user || user.isSuspended) {
      return res.status(403).json({
        message: "Your account is suspended. You cannot create new posts.",
      });
    }
    const post = await Post.create({
      title,
      content,
      author: req.user?._id,
      imageUrl, // ✅ Save Cloudinary URL here
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name"
    );

    res.status(201).json({
      _id: populatedPost._id,
      title: populatedPost.title,
      content: populatedPost.content,
      author: {
        _id: populatedPost.author._id,
        name: populatedPost.author.name,
      },
      createdAt: populatedPost.createdAt,
      updatedAt: populatedPost.updatedAt,
      likes: populatedPost.likes,
      dislikes: populatedPost.dislikes,
      imageUrl: populatedPost?.imageUrl,
    });
    const posts = await Post.findById(req.params.id).populate({
      path: "author",
      select: "name email isAdmin isSuspended",
    });

    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post author is suspended
    if (posts.author.isSuspended) {
      return res.status(403).json({
        message: "This post is not available",
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is post author
    if (
      post.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, content, imageUrl } = req.body;

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;

    // 👉 Update image if new imageUrl is provided
    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    const updatedPost = await post.save();
    const populatedPost = await Post.findById(updatedPost._id).populate(
      "author",
      "name"
    );

    res.status(200).json({
      _id: populatedPost._id,
      title: populatedPost.title,
      content: populatedPost.content,
      author: {
        _id: populatedPost.author._id,
        name: populatedPost.author.name,
      },
      createdAt: populatedPost.createdAt,
      updatedAt: populatedPost.updatedAt,
      likes: populatedPost.likes,
      dislikes: populatedPost.dislikes,
      imageUrl: populatedPost.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is post author or admin
    if (
      post.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete related comments
    await Comment.deleteMany({ post: post._id });

    // Delete post
    await post.deleteOne();

    res.status(200).json({ message: "Post removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  console.log("req.user == >", req.user);
  console.log("req.params == >", req.params);
  try {
    const post = await Post.findById(req.params?.id);

    console.log("post like == >", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already liked this post
    const alreadyLiked = post.likedBy.includes(req.user?._id);
    console.log("alreadyLiked == >", alreadyLiked);

    // Check if user has disliked this post
    const alreadyDisliked = post.dislikedBy.includes(req.user?._id);

    // If already disliked, remove dislike
    if (alreadyDisliked) {
      post.dislikes = post.dislikes - 1;
      post.dislikedBy = post.dislikedBy.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    }

    // Toggle like
    if (alreadyLiked) {
      // User is unliking the post
      post.likes = post.likes - 1;
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      // User is liking the post
      post.likes = post.likes + 1;
      post.likedBy.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      _id: post._id,
      likes: post.likes,
      dislikes: post.dislikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Dislike a post
// @route   PUT /api/posts/:id/dislike
// @access  Private
exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already disliked this post
    const alreadyDisliked = post.dislikedBy.includes(req.user._id);

    // Check if user has liked this post
    const alreadyLiked = post.likedBy.includes(req.user._id);

    // If already liked, remove like
    if (alreadyLiked) {
      post.likes = post.likes - 1;
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    }

    // Toggle dislike
    if (alreadyDisliked) {
      // User is undisliking the post
      post.dislikes = post.dislikes - 1;
      post.dislikedBy = post.dislikedBy.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      // User is disliking the post
      post.dislikes = post.dislikes + 1;
      post.dislikedBy.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      _id: post._id,
      likes: post.likes,
      dislikes: post.dislikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Search posts
// @route   GET /api/posts/search?q=
// @access  Public
exports.searchPosts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Please provide a search term" });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { content: { $regex: searchTerm, $options: "i" } },
      ],
    }).populate({
      path: "author",
      select: "name email isAdmin isSuspended",
    });

    // Filter out posts from suspended users
    const visiblePosts = posts.filter((post) => !post.author.isSuspended);

    res.status(200).json(visiblePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get posts by user
// @route   GET /api/posts/user/:userId
// @access  Public
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user to check if they are suspended
    const user = await User.findById(userId);

    console.log("post.controller.js getPostByUser user ==>", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isSuspended) {
      return res.status(403).json({
        message: "This user is suspended. Posts cannot be displayed.",
      });
    }

    const posts = await Post.find({ author: userId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts: posts.map((post) => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        author: {
          _id: post.author._id,
          name: post.author.name,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
        dislikes: post.dislikes,
        imageUrl: post.imageUrl,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
