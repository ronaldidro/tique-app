const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { verifyAuth } = require('../utils/middleware')
const { userRequestValidation } = require('../utils/validate')
const saltRounds = 10

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

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.patch('/:id', verifyAuth, async (request, response) => {
  let passwordHash = ''

  if (request.user.id !== request.params.id) {
    return response.status(401).json({
      error: 'wrong user for request'
    })
  }

  if (request.body.password) passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const updatedUser = await User.findByIdAndUpdate(
    request.params.id,
    request.body.password ? { ...request.body, passwordHash } : request.body,
    { new: true }
  )

  if (!updatedUser) response.status(404).end()
  response.json(updatedUser)
})

module.exports = usersRouter
