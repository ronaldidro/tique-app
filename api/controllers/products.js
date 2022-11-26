const productsRouter = require('express').Router()
const Product = require('../models/product')
const ProductCategory = require('../models/product-category')
const { verifyAuth } = require('../utils/validate')

productsRouter.get('/', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const products = await Product.find({})
    .sort({ name: 1 })
    .populate({ path: 'category', select: 'description company' })
    .then(data => data.filter(product => product.category.company.toString() === user.company.toString()))

  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const product = await Product.findById(request.params.id).populate({ path: 'category', select: 'company' })

  if (!product) response.status(404).end()

  if (product.category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  response.json(product.toJSON())
})

productsRouter.post('/', async (request, response) => {
  const body = request.body
  const { name, description, price, discount, images, categoryId } = body
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const productCategory = await ProductCategory.findById(categoryId).populate('company')

  if (user.company.toString() !== productCategory.company._id.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  const product = new Product({
    name,
    description,
    price,
    discount,
    images,
    category: productCategory._id
  })

  const savedProduct = await product.save()
  productCategory.products = productCategory.products.concat(savedProduct._id)
  await productCategory.save()

  response.status(201).json(savedProduct)
})

productsRouter.patch('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const product = await Product.findById(request.params.id).populate({ path: 'category', select: 'company' })

  if (product.category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  const updatedProduct = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedProduct) response.status(404).end()
  response.json(updatedProduct)
})

module.exports = productsRouter
