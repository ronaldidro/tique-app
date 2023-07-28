const bcrypt = require('bcrypt')
const supertest = require('supertest')

const shopHelper = require('./shop_test_helper')
const app = require('../app')
const Shop = require('../models/shop')
const User = require('../models/user')

const api = supertest(app)

const setInitialModels = async () => {
  await Shop.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const shop = new Shop({ ...shopHelper.initialShop[0], users: user._id })
  await shop.save()

  user.shop = shop._id
  await user.save({ validateModifiedOnly: true })
}

const getToken = async () => {
  const {
    body: { token }
  } = await api.post('/api/auth').send({ username: 'root', password: 'sekret' })
  return token
}

module.exports = {
  api,
  setInitialModels,
  getToken
}
