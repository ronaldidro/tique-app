const productsRouter = require('express').Router()
const Product = require('../models/product')
const Category = require('../models/category')
const { verifyAuth } = require('../utils/middleware')

productsRouter.get('/', verifyAuth, async (request, response) => {
  const products = await Product.find({})
    .sort({ name: 1 })
    .populate({ path: 'category', select: 'description shop' })
    .then(data => data.filter(product => product.category.shop.toString() === request.user.shop.toString()))

  response.json(products)
})

productsRouter.get('/:id', verifyAuth, async (request, response) => {
  const product = await Product.findById(request.params.id)

  if (!product) response.status(404).end()

  response.json(product.toJSON())
})

productsRouter.post('/', verifyAuth, async (request, response) => {
  const category = await Category.findById(request.body.category)
  const product = new Product({ ...request.body, category: category._id })
  const savedProduct = await product.save()

  category.products = category.products.concat(savedProduct._id)
  await category.save()

  response.status(201).json(savedProduct)
})

productsRouter.patch('/:id', verifyAuth, async (request, response) => {
  const product = await Product.findById(request.params.id)
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
  const deletedProduct = await Product.findByIdAndRemove(request.params.id)
  if (!deletedProduct) response.status(404).end()

  const category = await Category.findById(deletedProduct.category._id)
  category.products = category.products.filter(id => id.toString() !== deletedProduct._id.toString())
  await category.save()

  response.json(deletedProduct)
})

module.exports = productsRouter
