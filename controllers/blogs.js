const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const config = require('../utils/config');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    })
    try {
        const savedPost = await blog.save();
        res.json(savedPost.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter;
