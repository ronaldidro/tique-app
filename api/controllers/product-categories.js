const productCategoriesRouter = require('express').Router()
const ProductCategory = require('../models/product-category')
const Company = require('../models/company')
const { verifyAuth } = require('../utils/validate')

productCategoriesRouter.get('/', async (request, response) => {
  const productCategories = await ProductCategory.find({ active: true }, 'description company')
  response.json(productCategories)
})

productCategoriesRouter.get('/:id', async (request, response) => {
  const productCategory = await ProductCategory.findById(request.params.id).populate('products', {
    name: 1,
    description: 1,
    price: 1,
    discount: 1
  })

  if (productCategory) {
    response.json(productCategory.toJSON())
  } else {
    response.status(404).end()
  }
})

productCategoriesRouter.post('/', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)
  const body = request.body

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const company = await Company.findById(body.companyId)
  if (user.id !== company.user.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const productCategory = new ProductCategory({
    description: body.description,
    company: company._id
  })

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

  const { company } = await ProductCategory.findById(request.params.id).populate('company')
  if (user.id !== company.user.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const updatedProductCategory = await ProductCategory.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedProductCategory) response.status(404).end()
  response.json(updatedProductCategory)
})

module.exports = productCategoriesRouter
