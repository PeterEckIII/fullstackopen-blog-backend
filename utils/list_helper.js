const dummy = blogs => {
    return 1;
}

const totalLikes = blogs => {
    if (!blogs) {
        return 0
    } else {
        const likes = blogs.map(blog => blog.likes)
        if (!likes) {
            return 0
        } else {
            return likes.reduce((acc, next) => acc += next, 0)
        }
    }
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return 0;
    }
    else if (blogs.length === 1) {
        return blogs[0];
    } else {
        const likes = blogs.map(blog => blog.likes);
        const mostLikes = Math.max(...likes)
        const post = blogs.find(blog => blog.likes === mostLikes)
        return post;
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
