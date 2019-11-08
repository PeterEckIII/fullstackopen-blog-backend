const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const config = require('../utils/config');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body;

    if (body.url === undefined || body.title === undefined) {
        res.status(400).end()
    }

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes || 0
    })
    try {
        const savedPost = await blog.save();
        res.json(savedPost.toJSON())
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedPost = await Blog.findByIdAndRemove(req.params.id)
        res.json(deletedPost)
        res.status(204).end();
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body;

    const post = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    }

    const newPost = new Blog(post);

    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter;
