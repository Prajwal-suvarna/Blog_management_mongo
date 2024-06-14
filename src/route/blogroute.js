const express = require('express');
const router = new express.Router();
const blogController = require('../controller/blogController'); // Adjust the path to your blogController

// Create a new blog post
router.post('/blogs', blogController.createBlog);

// Get all blog posts
router.get('/blogs', blogController.getBlogs);

// Get a single blog post by ID
router.get('/blogs/:id', blogController.getBlogById);

// Update a blog post by ID
router.patch('/blogs/:id', blogController.updateBlog);

// Delete a blog post by ID
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
