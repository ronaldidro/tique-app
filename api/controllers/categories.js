const categoriesRouter = require('express').Router()
const Category = require('../models/category')
const Company = require('../models/company')
const { TEST_ENV } = require('../utils/config')
const { verifyAuth } = require('../utils/middleware')

categoriesRouter.get('/', verifyAuth, async (request, response) => {
  const { user } = request

  const productCategories = await Category.find({ company: user.company }).sort({
    description: 1
  })

  response.json(productCategories)
})

categoriesRouter.get('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const category = await Category.findById(request.params.id, 'description active company')

  if (!category) response.status(404).end()

  if (!TEST_ENV && category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  response.json(category.toJSON())
})

categoriesRouter.post('/', verifyAuth, async (request, response) => {
  const { user } = request

  const company = await Company.findById(user.company)

  const categoryData = !TEST_ENV ? { ...request.body, company: company._id } : { ...request.body }

  const category = new Category(categoryData)

  const savedCategory = await category.save()

  if (!TEST_ENV) {
    company.productCategories = company.productCategories.concat(savedCategory._id)
    await company.save({ validateModifiedOnly: true })
  }

  response.status(201).json(savedCategory)
})

categoriesRouter.patch('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const category = await Category.findById(request.params.id)

  if (category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  const updatedCategory = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedCategory) response.status(404).end()
  response.json(updatedCategory)
})

categoriesRouter.delete('/:id', verifyAuth, async (request, response) => {
  const { user } = request

  const category = await Category.findById(request.params.id)

  if (category.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  const deletedCategory = await Category.findByIdAndRemove(request.params.id)
  if (!deletedCategory) response.status(404).end()

  const company = await Company.findById(user.company)
  company.productCategories = company.productCategories.filter(id => id.toString() !== deletedCategory._id.toString())
  await company.save()

  response.json(deletedCategory)
})

module.exports = categoriesRouter
