const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

authRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    id: user._id,
    username
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '7d' })

  response.status(200).send({ token, name: user.name, shop: user.shop })
})

module.exports = authRouter
