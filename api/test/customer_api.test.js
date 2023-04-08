const helper = require('./customer_test_helper')
const Customer = require('../models/customer')
const { api, getToken, setInitialModels } = require('./test_helper')
const { connectToDatabase, closeDatabase } = require('../utils/db')

let initialCustomers = []
let token = ''

beforeEach(async () => {
  await connectToDatabase()

  await Customer.deleteMany({})

  await setInitialModels()

  initialCustomers = await helper.getInitialCustomers()
  await Customer.insertMany(initialCustomers)

  token = await getToken()
})

describe('customers test', () => {
  test('all customers are returned', async () => {
    const response = await api.get('/api/customers').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(initialCustomers.length)
  })

  test('viewing a specific customer with a valid id', async () => {
    const customersAtStart = await helper.customersInDb()
    const customerToView = customersAtStart[0]

    const resultCustomer = await api
      .get(`/api/customers/${customerToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedCustomerToView = JSON.parse(JSON.stringify(customerToView))

    expect(resultCustomer.body).toEqual(processedCustomerToView)
  })

  test('addition of a new customer with valid data', async () => {
    const newCustomer = { documentNumber: '30303030', firstName: 'Kenny', lastName: 'West', address: 'Montana' }

    await api
      .post('/api/customers')
      .send(newCustomer)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const customersAtEnd = await helper.customersInDb()
    expect(customersAtEnd).toHaveLength(initialCustomers.length + 1)

    const firstNames = customersAtEnd.map(cs => cs.firstName)
    expect(firstNames).toContain('Kenny')
  })

  describe('updation of a customer', () => {
    test('fails when token is not sent', async () => {
      const customersAtStart = await helper.customersInDb()
      const customerToUpdate = customersAtStart[0]
      const newCustomerData = { firstName: 'Janette' }

      await api.patch(`/api/customers/${customerToUpdate.id}`).send(newCustomerData).expect(401)
    })

    test('succeeds with data and id valid', async () => {
      const customersAtStart = await helper.customersInDb()
      const customerToUpdate = customersAtStart[1]
      const newCustomerData = { firstName: 'Ariana' }

      await api
        .patch(`/api/customers/${customerToUpdate.id}`)
        .send(newCustomerData)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
    })
  })

  test('deletion of a customer succeeds if id is valid', async () => {
    const customersAtStart = await helper.customersInDb()
    const customerToDelete = customersAtStart[0]

    await api.delete(`/api/customers/${customerToDelete.id}`).set('Authorization', `bearer ${token}`).expect(200)

    const customersAtEnd = await helper.customersInDb()
    expect(customersAtEnd).toHaveLength(initialCustomers.length - 1)

    const lastNames = customersAtEnd.map(cs => cs.lastName)
    expect(lastNames).not.toContain(customerToDelete.lastName)
  })
})

afterAll(() => closeDatabase())
