const productFeaturesRouter = require('express').Router()
const ProductFeature = require('../models/product-feature')
const Product = require('../models/product')
const Company = require('../models/company')

productFeaturesRouter.get('/', async (request, response) => {
  const productFeatures = await ProductFeature.find({})
  response.json(productFeatures)
})

productFeaturesRouter.get('/:id', async (request, response) => {
  const productFeature = await ProductFeature.findById(request.params.id)

  if (productFeature) {
    response.json(productFeature.toJSON())
  } else {
    response.status(404).end()
  }
})

productFeaturesRouter.post('/', async (request, response) => {
  const body = request.body
  const { description, required, type, options, productId } = body
  const { user } = request

  const product = await Product.findById(productId).populate({
    path: 'category',
    populate: { path: 'company' }
  })

  if (user.id !== product.category.company.user.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const productFeature = new ProductFeature({
    description,
    required,
    type,
    options,
    product: product._id
  })

  const savedProductFeature = await productFeature.save()
  product.features = product.features.concat(savedProductFeature._id)
  await product.save()

  response.status(201).json(savedProductFeature)
})

productFeaturesRouter.patch('/:id', async (request, response) => {
  const { user } = request

  const {
    product: {
      category: { company: companyId }
    }
  } = await ProductFeature.findById(request.params.id).populate({
    path: 'product',
    populate: { path: 'category' }
  })

  const company = await Company.findById(companyId)

  if (user.id !== company.user.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const updatedProductFeature = await ProductFeature.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedProductFeature) response.status(404).end()
  response.json(updatedProductFeature)
})

module.exports = productFeaturesRouter
