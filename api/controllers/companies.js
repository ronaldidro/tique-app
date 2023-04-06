const companiesRouter = require('express').Router()
const Company = require('../models/company')
const { verifyAuth } = require('../utils/middleware')

companiesRouter.get('/', async (request, response) => {
  const companies = await Company.find({ active: true }, 'name address placeService images').sort({ name: 1 })
  response.json(companies)
})

companiesRouter.get('/:id', async (request, response) => {
  const company = await Company.findById(request.params.id).populate({
    path: 'productCategories',
    select: 'description',
    match: { active: true },
    options: {
      sort: { description: 1 }
    },
    populate: {
      path: 'products',
      select: 'name description price discount images',
      match: { active: true },
      options: {
        sort: { name: 1 }
      }
    }
  })

  if (company) {
    response.json(company.toJSON())
  } else {
    response.status(404).end()
  }
})

companiesRouter.post('/', verifyAuth, async (request, response) => {
  const { user } = request
  const company = new Company({ ...request.body, users: user._id })
  const savedCompany = await company.save()

  user.company = company._id
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(savedCompany)
})

companiesRouter.patch('/:id', verifyAuth, async (request, response) => {
  const { user } = request
  const currentCompany = await Company.findById(request.params.id)

  if (currentCompany._id.toString() !== user.company.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const updatedCompany = await Company.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedCompany) response.status(404).end()
  response.json(updatedCompany)
})

module.exports = companiesRouter
