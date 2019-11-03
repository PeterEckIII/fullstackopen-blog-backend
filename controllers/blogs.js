const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const config = require('../utils/config');

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs.map(blog => blog.toJSON()))
        })
})

blogsRouter.post('/', (req, res) => {
    const body = req.body;

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    })

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

module.exports = blogsRouter;
