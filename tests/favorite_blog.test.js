const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('Favorite Blog', () => {
    
    test('returns 0 if no blogs listed', () => {
        const result = favoriteBlog([]);
        expect(result).toEqual(0);
    })

    test('returns the post if there is one item', () => {
        const blogPost = [
            {
                "name": "React is great",
                "author": "Peter Eck",
                "likes": 15
            }
        ]
        const result = favoriteBlog(blogPost)
        expect(result).toEqual({ "author": "Peter Eck", "likes": 15, "name": "React is great" })
    })

    test('returns the most liked post when more than one item', () => {
        const blogPosts = [
            {
                "name": "Hello",
                "author": "Peter",
                "likes": 5
            },
            {
                "name": "Wow",
                "author": "Connor",
                "likes": 3
            },
            {
                "name": "Cool!",
                "author": "Kyle",
                "likes": 10
            }
        ];
        const result = favoriteBlog(blogPosts)
        expect(result).toEqual(blogPosts[2]);
    })
})
