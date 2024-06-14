const Blog = require('../models/blogModel'); // Adjust the path to your Blog model

// Create a new blog post
exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
    const _id = req.params.id;

    try {
        const blog = await Blog.findById(_id);

        if (!blog) {
            return res.status(404).send();
        }

        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'body', 'authorId', 'tags', 'category', 'subcategory', 'deletedAt', 'isDeleted', 'publishedAt', 'isPublished'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).send();
        }

        updates.forEach(update => blog[update] = req.body[update]);
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).send();
        }

        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};
