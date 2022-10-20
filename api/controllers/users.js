const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userRequestValidation } = require('../utils/validate')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({ active: true }, 'username name')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const message = await userRequestValidation(request)

  if (message) {
    return response.status(400).json({
      error: message
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
