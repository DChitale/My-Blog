const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts (with optional search and tag filters)
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};

    if (tag && tag !== 'All') {
      query.tags = { $regex: new RegExp(`^${tag}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get single post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new post
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const { title, content, img_url, tags } = req.body;
  
  if (!title || typeof title !== 'string' || title.length > 200) {
    return res.status(400).json({ message: 'Invalid title' });
  }
  if (!content || typeof content !== 'string' || content.length > 50000) {
    return res.status(400).json({ message: 'Invalid content' });
  }
  
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');

  const post = new Post({
    title,
    content,
    img_url,
    tags,
    slug
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
