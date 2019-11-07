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

describe('Blog API', () => {
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
})

afterAll(() => {
    mongoose.connection.close();
})
