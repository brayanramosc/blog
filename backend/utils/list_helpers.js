const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => sum = sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    return blogs.reduce((favBlog, blog) => {
        if (blog.likes > (favBlog.likes || 0)) {
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }

        return favBlog
    }, {})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const blogsByAuthor = _.toPairs(_.countBy(blogs, 'author'))
    const topAuthor = _.maxBy(blogsByAuthor, (pair) => pair[1])

    return {
        author: topAuthor[0],
        blogs: topAuthor[1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const blogsByAuthor = _.groupBy(blogs, 'author')
    const likesByAuthor = _.map(blogsByAuthor, (authorBlogs, author) => {
        const totalLikes = _.sumBy(authorBlogs, 'likes');
        return {
            author: author,
            likes: totalLikes
        };
    });

    const topAuthor = _.maxBy(likesByAuthor, 'likes');

    return topAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
