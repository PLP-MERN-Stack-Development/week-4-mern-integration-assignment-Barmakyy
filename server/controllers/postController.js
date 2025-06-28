const Post = require('../models/Post');

// Get all posts with pagination and search
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const skip = (page - 1) * limit;

    // Build search query
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('category')
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category').populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = new Post({ 
      title, 
      content, 
      category,
      author: req.user._id // Add the authenticated user as author
    });
    await post.save();
    
    // Populate author info before sending response
    await post.populate('author', 'username');
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    // Find post and check if user is the author
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to edit this post' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    ).populate('author', 'username');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    // Find post and check if user is the author
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
