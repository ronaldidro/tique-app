const router = require('express').Router()
const Company = require('../models/company')
const Product = require('../models/product')
const ProductCategory = require('../models/product-category')

router.post('/reset', async (request, response) => {
  await Company.deleteMany({})
  await ProductCategory.deleteMany({})
  await Product.deleteMany({})

  response.status(204).end()
})

module.exports = router
