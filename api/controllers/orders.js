const ordersRouter = require('express').Router()
const Customer = require('../models/customer')
const Order = require('../models/order')
const Shop = require('../models/shop')
const { verifyAuth } = require('../utils/middleware')

ordersRouter.get('/', verifyAuth, async (request, response) => {
  const orders = await Order.find({ shop: request.user.shop })
  response.json(orders)
})

ordersRouter.get('/:id', verifyAuth, async (request, response) => {
  const order = await Order.findById(request.params.id)

  if (!order) response.status(404).end()

  response.json(order.toJSON())
})

ordersRouter.post('/', async (request, response) => {
  const { documentNumber, firstName, lastName, address, shop: shopId } = request.body

  let customer = await Customer.findOne({ documentNumber })

  if (!customer) {
    customer = new Customer({ documentNumber, firstName, lastName, address, shop: shopId })
    await customer.save()
  }
  const shop = await Shop.findById(shopId)
  const order = new Order({ ...request.body, customer: customer._id })
  const savedOrder = await order.save()

  shop.orders = shop.orders.concat(savedOrder._id)
  await shop.save({ validateModifiedOnly: true })

  customer.orders = customer.orders.concat(savedOrder._id)
  await customer.save({ validateModifiedOnly: true })

  response.status(201).json(savedOrder)
})

ordersRouter.delete('/:id', verifyAuth, async (request, response) => {
  const deletedOrder = await Order.findByIdAndRemove(request.params.id)
  if (!deletedOrder) response.status(404).end()

  const shop = await Shop.findById(request.user.shop)
  shop.orders = shop.orders.filter(id => id.toString() !== deletedOrder._id.toString())
  await shop.save()

  const customer = await Customer.findById(deletedOrder.customer)
  customer.orders = customer.orders.filter(id => id.toString() !== deletedOrder._id.toString())
  await customer.save()

  response.json(deletedOrder)
})

module.exports = ordersRouter
