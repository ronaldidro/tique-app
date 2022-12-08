const productCategoriesRouter = require('express').Router()
const ProductCategory = require('../models/product-category')
const Company = require('../models/company')
const { verifyAuth } = require('../utils/validate')

productCategoriesRouter.get('/', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const productCategories = await ProductCategory.find({ company: user.company }).sort({
    description: 1
  })

  response.json(productCategories)
})

productCategoriesRouter.get('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const productCategory = await ProductCategory.findById(request.params.id, 'description active company')

  if (!productCategory) response.status(404).end()

  if (productCategory.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  response.json(productCategory.toJSON())
})

productCategoriesRouter.post('/', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const company = await Company.findById(user.company)

  const productCategory = new ProductCategory({ ...request.body, company: company._id })

  const savedProductCategory = await productCategory.save()
  company.productCategories = company.productCategories.concat(savedProductCategory._id)
  await company.save({ validateModifiedOnly: true })

  response.status(201).json(savedProductCategory)
})

productCategoriesRouter.patch('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const productCategory = await ProductCategory.findById(request.params.id)

  if (productCategory.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  const updatedProductCategory = await ProductCategory.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedProductCategory) response.status(404).end()
  response.json(updatedProductCategory)
})

productCategoriesRouter.delete('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const productCategory = await ProductCategory.findById(request.params.id)

  if (productCategory.company.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for product category'
    })
  }

  const deletedProductCategory = await ProductCategory.findByIdAndRemove(request.params.id)
  if (!deletedProductCategory) response.status(404).end()

  const company = await Company.findById(user.company)
  company.productCategories = company.productCategories.filter(
    id => id.toString() !== deletedProductCategory._id.toString()
  )
  await company.save()

  response.json(deletedProductCategory)
})

module.exports = productCategoriesRouter
