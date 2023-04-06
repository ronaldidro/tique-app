const router = require('express').Router()
const Shop = require('../models/shop')
const Product = require('../models/product')
const Category = require('../models/category')

router.post('/reset', async (request, response) => {
  await Shop.deleteMany({})
  await Category.deleteMany({})
  await Product.deleteMany({})

  response.status(204).end()
})

module.exports = router
