const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogRouter
