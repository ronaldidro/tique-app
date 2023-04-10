const customersRouter = require('express').Router()
const Customer = require('../models/customer')
const Shop = require('../models/shop')
const { verifyAuth } = require('../utils/middleware')

customersRouter.get('/', async (request, response) => {
  const filter = request.query ? request.query : { shop: request.user.shop }
  const customers = await Customer.find(filter).sort({ lastName: 1 })
  response.json(customers)
})

customersRouter.get('/:id', verifyAuth, async (request, response) => {
  const customer = await Customer.findById(request.params.id)

  if (!customer) response.status(404).end()

  response.json(customer.toJSON())
})

customersRouter.post('/', verifyAuth, async (request, response) => {
  const shop = await Shop.findById(request.user.shop)
  const customer = new Customer({ ...request.body, shop: shop._id })
  const savedCustomer = await customer.save()

  shop.customers = shop.customers.concat(savedCustomer._id)
  await shop.save({ validateModifiedOnly: true })

  response.status(201).json(savedCustomer)
})

customersRouter.patch('/:id', verifyAuth, async (request, response) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(request.params.id, request.body, { new: true })

  if (!updatedCustomer) response.status(404).end()

  response.json(updatedCustomer)
})

customersRouter.delete('/:id', verifyAuth, async (request, response) => {
  const deletedCustomer = await Customer.findByIdAndRemove(request.params.id)
  if (!deletedCustomer) response.status(404).end()

  const shop = await Shop.findById(request.user.shop)
  shop.customers = shop.customers.filter(id => id.toString() !== deletedCustomer._id.toString())
  await shop.save()

  response.json(deletedCustomer)
})

module.exports = customersRouter
