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
      totalItems: 2,
      totalAmount: 25.5,
      status: 'pending',
      customer: customers[0].id,
      shop: shop.id,
      detail: [
        {
          product: products[0].id,
          price: 10.5,
          items: 1,
          amount: 10.5
        },
        {
          product: products[1].id,
          price: 15,
          items: 1,
          amount: 15
        }
      ]
    },
    {
      mode: 'delivery',
      deadline: Date.now(),
      payMethod: 'transfer',
      totalItems: 2,
      totalAmount: 30,
      status: 'delivered',
      customer: customers[1].id,
      shop: shop.id,
      detail: [
        {
          product: products[1].id,
          price: 10,
          items: 2,
          amount: 20
        },
        {
          product: products[0].id,
          price: 10,
          items: 1,
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
  totalItems: 1,
  totalAmount: 10.0,
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
