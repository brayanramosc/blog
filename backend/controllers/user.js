const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (body.password.length < 3) {
        return response.status(400).json({
            error: 'User validation failed: password: must have more than 3 characters'
        })
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password: encryptedPassword
    })

    const savedUser = await user.save()
    return response.status(201).json(savedUser)
})

module.exports = userRouter
