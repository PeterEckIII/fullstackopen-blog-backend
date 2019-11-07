const Blog = require('../models/blogs');

const initialPosts = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'This is a blog post',
        author: 'Kyle Hassett',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
    },
    {
        title: 'HTML5 is Great',
        author: 'Connor Leurck',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: "We'll remove this soon"})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialPosts,
    nonExistingId,
    blogsInDb
}
