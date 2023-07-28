const Category = require('../models/category')
const Customer = require('../models/customer')
const Order = require('../models/order')
const Product = require('../models/product')
const { connectToDatabase, closeDatabase } = require('../utils/db')
const { getInitialCustomers } = require('./customer_test_helper')
const helper = require('./order_test_helper')
const { getInitialCategories, getInitialProducts, productsInDb } = require('./product_test_helper')
const { shopsInDb } = require('./shop_test_helper')
const { api, getToken, setInitialModels } = require('./test_helper')

let initialOrders = []
let testOrder = {}

beforeEach(async () => {
  await connectToDatabase()

  await Order.deleteMany({})
  await Customer.deleteMany({})
  await Product.deleteMany({})
  await Category.deleteMany({})

  await setInitialModels()

  await Customer.insertMany(await getInitialCustomers())
  await Category.insertMany(await getInitialCategories())
  await Product.insertMany(await getInitialProducts())

  initialOrders = await helper.getInitialOrders()
  await Order.insertMany(initialOrders)

  const shops = await shopsInDb()
  const products = await productsInDb()

  testOrder = {
    ...helper.baseOrder,
    shop: shops[0].id,
    detail: [
      {
        product: products[0].id,
        price: 10,
        quantity: 1,
        amount: 10
      }
    ]
  }
})

describe('orders test', () => {
  test('all orders are returned', async () => {
    const token = await getToken()
    console.log('🚀 ~ file: order_api.test.js:52 ~ test ~ token:', token)
    const response = await api.get('/api/orders').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(initialOrders.length)
  })

  test('viewing a specific order with a valid id', async () => {
    const token = await getToken()
    const ordersAtStart = await helper.ordersInDb()
    const orderToView = ordersAtStart[0]

    const resultOrder = await api
      .get(`/api/orders/${orderToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedOrderToView = JSON.parse(JSON.stringify(orderToView))

    expect(resultOrder.body).toEqual(processedOrderToView)
  })

  test('deletion of a order succeeds if id is valid', async () => {
    const token = await getToken()
    const ordersAtStart = await helper.ordersInDb()
    const orderToDelete = ordersAtStart[0]

    await api.delete(`/api/orders/${orderToDelete.id}`).set('Authorization', `bearer ${token}`).expect(200)

    const ordersAtEnd = await helper.ordersInDb()
    expect(ordersAtEnd).toHaveLength(initialOrders.length - 1)

    const orderIds = ordersAtEnd.map(order => order.id)
    expect(orderIds).not.toContain(orderToDelete.id)
  })

  describe('addition of a new order', () => {
    test('succeeds with valid data', async () => {
      const newOrder = { ...testOrder, status: 'canceled' }

      await api
        .post('/api/orders')
        .send(newOrder)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const ordersAtEnd = await helper.ordersInDb()
      expect(ordersAtEnd).toHaveLength(initialOrders.length + 1)

      const status = ordersAtEnd.map(order => order.status)
      expect(status).toContain('canceled')
    })

    test('fails with status code 400 if data invalid', async () => {
      const newOrder = { ...testOrder, mode: 'other' }

      await api.post('/api/orders').send(newOrder).expect(400)

      const ordersAtEnd = await helper.ordersInDb()
      expect(ordersAtEnd).toHaveLength(initialOrders.length)
    })

    test('if the status property is missing, it will have pending by default', async () => {
      const newOrder = { ...testOrder }

      const response = await api.post('/api/orders').send(newOrder)

      expect(response.body.status).toBe('pending')
    })
  })
})

afterAll(() => closeDatabase())
