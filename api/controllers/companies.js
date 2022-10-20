const companiesRouter = require('express').Router()
const Company = require('../models/company')
const { verifyAuth } = require('../utils/validate')

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
      },
      populate: {
        path: 'features',
        select: 'description required type options',
        match: { active: true },
        options: {
          sort: { description: 1 }
        }
      }
    }
  })

  if (company) {
    response.json(company.toJSON())
  } else {
    response.status(404).end()
  }
})

companiesRouter.post('/', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const company = new Company({ ...request.body, user: user._id })
  const savedCompany = await company.save()
  user.companies = user.companies.concat(savedCompany._id)
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(savedCompany)
})

companiesRouter.patch('/:id', async (request, response) => {
  const { error, message, user } = await verifyAuth(request)

  if (error) {
    return response.status(401).json({
      error: message
    })
  }

  const currentCompany = await Company.findById(request.params.id)
  if (user.id !== currentCompany.user.toString()) {
    return response.status(401).json({
      error: 'wrong user for company'
    })
  }

  const updatedCompany = await Company.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedCompany) response.status(404).end()
  response.json(updatedCompany)
})

module.exports = companiesRouter
