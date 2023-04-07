const categoriesRouter = require('express').Router()
const Category = require('../models/category')
const Shop = require('../models/shop')
const { verifyAuth } = require('../utils/middleware')

categoriesRouter.get('/', verifyAuth, async (request, response) => {
  const categories = await Category.find({ shop: request.user.shop }).sort({ description: 1 })
  response.json(categories)
})

categoriesRouter.get('/:id', verifyAuth, async (request, response) => {
  const category = await Category.findById(request.params.id)

  if (!category) response.status(404).end()

  response.json(category.toJSON())
})

categoriesRouter.post('/', verifyAuth, async (request, response) => {
  const shop = await Shop.findById(request.user.shop)
  const category = new Category({ ...request.body, shop: shop._id })
  const savedCategory = await category.save()

  shop.categories = shop.categories.concat(savedCategory._id)
  await shop.save({ validateModifiedOnly: true })

  response.status(201).json(savedCategory)
})

categoriesRouter.patch('/:id', verifyAuth, async (request, response) => {
  const updatedCategory = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true })

  if (!updatedCategory) response.status(404).end()

  response.json(updatedCategory)
})

categoriesRouter.delete('/:id', verifyAuth, async (request, response) => {
  const deletedCategory = await Category.findByIdAndRemove(request.params.id)
  if (!deletedCategory) response.status(404).end()

  const shop = await Shop.findById(request.user.shop)
  shop.categories = shop.categories.filter(id => id.toString() !== deletedCategory._id.toString())
  await shop.save()

  response.json(deletedCategory)
})

module.exports = categoriesRouter
