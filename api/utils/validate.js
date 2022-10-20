const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userRequestValidation = async request => {
  const { username, password } = request.body

  if (!username || !password) return 'username or password are missing'

  if (password.length < 3) return 'minimum password length must be 3'

  const existingUser = await User.findOne({ username })
  if (existingUser) return 'username must be unique'
}

const verifyAuth = async request => {
  const response = { error: true, message: '', user: null }

  if (!request.token) return { ...response, message: 'token missing or invalid' }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) return { ...response, message: 'token expired' }

  const user = await User.findById(decodedToken.id)
  if (!user) return { ...response, message: 'user not found' }

  return { ...response, error: false, user }
}

module.exports = {
  userRequestValidation,
  verifyAuth
}
