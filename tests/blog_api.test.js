const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');
const helper = require('./helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialPosts.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray);
})

describe('Fetching blog posts', () => {
    test('returns content in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns the correct number of blogs', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body.length).toEqual(helper.initialPosts.length)
    })

    test('contains an identifier property called id', async () => {
        const blogs = await helper.blogsInDb();
        const id = blogs[0].id;
        expect(id).toBeDefined();
    })
})

describe('Adding blog posts', () => {
    test('a valid post can be added', async () => {
        const newPost = {
            title: 'Jest is a great testing framework',
            author: 'Johnny Appleseed',
            url: 'https://www.medium.com/topics/javascript',
            likes: 7
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialPosts.length + 1)

        const title = blogsAtEnd.map(blog => blog.title)
        expect(title).toContain('Jest is a great testing framework')

        const author = blogsAtEnd.map(blog => blog.author)
        expect(author).toContain('Johnny Appleseed');
    })

    test('if likes are not included in a post then the property is set to zero', async () => {
        const newPost = {
            title: 'Using Enzyme in your React application',
            author: 'Chris Sevillijas',
            url: 'www.scotch.io',
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb();
        const likesOnAddedPost = blogs[blogs.length - 1].likes
        expect(likesOnAddedPost).toBe(0);
    })

    test('if no title or URL properties provided it returns a 400 error', async () => {
        const newPost = {
            author: "Peter Eck",
            likes: 25
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(400)
    })
})

describe('Deleting blog posts', () => {
    test("A post can be deleted", async () => {
        const blogsAtStart = await helper.blogsInDb();
        console.log(`Blogs at start of test: ${blogsAtStart}`)
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialPosts.length - 1)

        const contents = blogsAtEnd.map(blog => blog.content);
        expect(contents).not.toContain(blogToDelete)
    })
})

afterAll(() => {
    mongoose.connection.close();
})
