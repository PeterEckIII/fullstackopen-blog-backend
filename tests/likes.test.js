const totalLikes = require('../utils/list_helper').totalLikes;

describe('Total Likes', () => {
    test('Of an empty blog list is zero', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })

    test('of an array with one item equals the likes of that item', () => {
        const blogPost = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]
        const result = totalLikes(blogPost)
        expect(result).toBe(5);
    })

    test('of an array with multiple items calculates correctly', () => {
        const blogList = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422a29gnv54a676234d17f8',
                title: 'This is a blog post',
                author: 'Kyle Hassett',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 15,
                __v: 0
            },
            {
                _id: '5a422aa71b54a6762h593hf',
                title: 'HTML5 is Great',
                author: 'Connor Leurck',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 7,
                __v: 0
            }
        ]
        const result = totalLikes(blogList)
        expect(result).toBe(27)
    })
})
