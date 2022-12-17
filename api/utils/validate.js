const User = require('../models/user')

const userRequestValidation = async request => {
  const { username, password } = request.body

  if (!username || !password) return 'username or password are missing'

  if (password.length < 3) return 'minimum password length must be 3'

  const existingUser = await User.findOne({ username })
  if (existingUser) return 'username must be unique'
}

module.exports = {
  userRequestValidation
}
