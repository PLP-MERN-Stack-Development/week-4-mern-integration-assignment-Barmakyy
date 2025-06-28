// Import the Post model
const Post = require('../models/Post');

// Get all posts, including their category details
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category'); // Populate category field
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single post by its ID, including category details
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    // Destructure fields from request body
    const { title, content, category } = req.body;
    // Create a new Post instance
    const post = new Post({ title, content, category });
    await post.save(); // Save to database
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing post by ID
exports.updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    // Find post by ID and update with new data
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true } // Return the updated document
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    // Find post by ID and delete
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 