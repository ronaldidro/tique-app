const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('./config')
const { error } = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const verifyAuth = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).send({
      error: 'token missing or invalid'
    })
  }

  const decodedToken = jwt.verify(request.token, SECRET)
  if (!decodedToken) {
    return response.status(401).send({
      error: 'token is expired'
    })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(401).send({
      error: 'user not found'
    })
  }

  request.user = user

  next()
}

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (err.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (err.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(err)
}

const userValidation = async (request, response, next) => {
  const { username, password } = request.body

  if (!username || !password) {
    return response.status(400).send({ error: 'username or password are missing' })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: 'minimum length must be 3' })
  }

  const user = await User.findOne({ username })
  if (user) return response.status(400).send({ error: 'username must be unique' })

  next()
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  verifyAuth,
  errorHandler,
  userValidation
}
