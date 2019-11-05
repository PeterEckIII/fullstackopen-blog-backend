const mostBlogs = require('../utils/list_helper').mostBlogs;

describe('Author with Most Blogs', () => {
    test('returns 0 when no authors listed', () => {
        const result = mostBlogs([]);
        expect(result).toBe(0);
    })

    test('returns the item when only one item is passed', () => {
        const author = [
            {
                "author": "Peter",
                "blogs": 10
            }
        ];
        const result = mostBlogs(author);
        expect(result).toEqual({
            "author": "Peter",
            "blogs": 10
        })
    })

    test('returns the author with the most blog posts', () => {
        const authors = [
            {
                "author": "Peter",
                "blogs": 10
            },
            {
                "author": "Carter",
                "blogs": 12
            },
            {
                "author": "Matty",
                "blogs": 4
            }
        ];
        const result = mostBlogs(authors);
        expect(result).toEqual({
            "author": "Carter",
            "blogs": 12
        })
    })
})
