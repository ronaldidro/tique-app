const bcrypt = require('bcrypt')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const setUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}

const getToken = async () => {
  const {
    body: { token }
  } = await api.post('/api/auth').send({ username: 'root', password: 'sekret' })

  return token
}

module.exports = {
  api,
  setUser,
  getToken
}
