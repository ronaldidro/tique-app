const Order = require('../models/order')
const Shop = require('../models/shop')
const { customersInDb } = require('./customer_test_helper')
const { productsInDb } = require('./product_test_helper')

const getInitialOrders = async () => {
  const shop = await Shop.findOne({ name: 'Hatun Tech' })
  const customers = await customersInDb()
  const products = await productsInDb()

  return [
    {
      mode: 'pickup',
      deadline: Date.now(),
      payMethod: 'cash',
      items: 2,
      total: 25.5,
      status: 'pending',
      customer: customers[0].id,
      shop: shop.id,
      detail: [
        {
          product: products[0].id,
          price: 10.5,
          quantity: 1,
          amount: 10.5
        },
        {
          product: products[1].id,
          price: 15,
          quantity: 1,
          amount: 15
        }
      ]
    },
    {
      mode: 'delivery',
      deadline: Date.now(),
      payMethod: 'transfer',
      items: 3,
      total: 30,
      status: 'delivered',
      customer: customers[1].id,
      shop: shop.id,
      detail: [
        {
          product: products[1].id,
          price: 10,
          quantity: 2,
          amount: 20
        },
        {
          product: products[0].id,
          price: 10,
          quantity: 1,
          amount: 10
        }
      ]
    }
  ]
}

const baseOrder = {
  mode: 'pickup',
  deadline: Date.now(),
  payMethod: 'card',
  items: 1,
  total: 10.0,
  documentNumber: '90909090',
  firstName: 'Leanne',
  lastName: 'Bret',
  address: 'Gwenborough'
}

const ordersInDb = async () => {
  const orders = await Order.find({})
  return orders.map(o => o.toJSON())
}

module.exports = {
  getInitialOrders,
  baseOrder,
  ordersInDb
}
