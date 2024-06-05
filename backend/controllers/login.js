const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const isCorrectPassword = (user === null)
        ? false
        : await bcrypt.compare(password, user.password)

    if (!(user && isCorrectPassword)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const credentials = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(credentials, process.env.SECRET)
    
    response
        .status(200)
        .send({
            token, username: user.username, name: user.name
        })
})

module.exports = loginRouter
