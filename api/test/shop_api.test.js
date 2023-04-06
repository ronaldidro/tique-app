const helper = require('./shop_test_helper')
const { setUser, getToken, api } = require('./test_helper')
const Shop = require('../models/shop')
const { connectToDatabase, closeDatabase } = require('../utils/db')

let token = ''

beforeEach(async () => {
  await connectToDatabase()

  await Shop.deleteMany({})
  await Shop.insertMany(helper.initialShop)

  await setUser()
  token = await getToken()
})

describe('when there is initially some shops saved', () => {
  test('shops are returned as json', async () => {
    await api
      .get('/api/companies')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all shops are returned', async () => {
    const response = await api.get('/api/companies')
    expect(response.body).toHaveLength(helper.initialShop.length)
  })
})

describe('viewing a specific shop', () => {
  test('succeeds with a valid id', async () => {
    const shopsAtStart = await helper.shopsInDb()
    const shopToView = shopsAtStart[0]

    const resultShop = await api
      .get(`/api/companies/${shopToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedShopToView = JSON.parse(JSON.stringify(shopToView))

    expect(resultShop.body).toEqual(processedShopToView)
  })

  test('fails with statuscode 404 if shop does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/companies/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/companies/${invalidId}`).expect(400)
  })
})

describe('addition of a new shop', () => {
  test('succeeds with valid data', async () => {
    const newShop = {
      name: 'new shop name',
      address: 'new shop address',
      placeService: 'new shop place service',
      cellPhone: '970970970'
    }

    await api
      .post('/api/companies')
      .set('Authorization', `bearer ${token}`)
      .send(newShop)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const shopsAtEnd = await helper.shopsInDb()
    expect(shopsAtEnd).toHaveLength(helper.initialShop.length + 1)

    const names = shopsAtEnd.map(shop => shop.name)
    expect(names).toContain('new shop name')
  })
})

afterAll(() => closeDatabase())
