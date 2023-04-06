const productsRouter = require('express').Router()
const Product = require('../models/product')
const Category = require('../models/category')
const { TEST_ENV } = require('../utils/config')
const { verifyAuth } = require('../utils/middleware')

productsRouter.get('/', verifyAuth, async (request, response) => {
  const { user } = request

  const products = !TEST_ENV
    ? await Product.find({})
        .sort({ name: 1 })
        .populate({ path: 'category', select: 'description company' })
        .then(data => data.filter(product => product.category.company.toString() === user.company.toString()))
    : await Product.find({})

  response.json(products)
})

productsRouter.get('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const product = await Product.findById(request.params.id).populate({ path: 'category', select: 'company' })

  if (!product) response.status(404).end()

  if (!TEST_ENV && product.category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  response.json(product.toJSON())
})

productsRouter.post('/', verifyAuth, async (request, response) => {
  const {
    body: { name, description, price, discount, images, category },
    user
  } = request

  const productCategory = await Category.findById(category).populate('company')

  if (!TEST_ENV && user.company.toString() !== productCategory.company._id.toString()) {
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

productsRouter.patch('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const product = await Product.findById(request.params.id).populate({ path: 'category', select: 'company' })

  if (product.category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  const updatedProduct = await Product.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedProduct) response.status(404).end()

  if (product.category._id.toString() !== request.body.category) {
    const oldCategory = await Category.findById(product.category._id)
    oldCategory.products = oldCategory.products.filter(id => id.toString() !== product._id.toString())
    await oldCategory.save()

    const newCategory = await Category.findById(request.body.category)
    newCategory.products = newCategory.products.concat(product._id)
    await newCategory.save()
  }

  response.json(updatedProduct)
})

productsRouter.delete('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const product = await Product.findById(request.params.id).populate({ path: 'category', select: 'company' })

  if (product.category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product'
    })
  }

  const deletedProduct = await Product.findByIdAndRemove(request.params.id)
  if (!deletedProduct) response.status(404).end()

  const category = await Category.findById(product.category._id)
  category.products = category.products.filter(id => id.toString() !== deletedProduct._id.toString())
  await category.save()

  response.json(deletedProduct)
})

module.exports = productsRouter
