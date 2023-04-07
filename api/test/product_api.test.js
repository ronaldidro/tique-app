const helper = require('./product_test_helper')
const { api, getToken, setInitialModels } = require('./test_helper')
const Product = require('../models/product')
const Category = require('../models/category')
const { connectToDatabase, closeDatabase } = require('../utils/db')

let initialCategories = []
let initialProducts = []
let token = ''

beforeEach(async () => {
  await connectToDatabase()

  await Category.deleteMany({})
  await Product.deleteMany({})

  await setInitialModels()

  initialCategories = await helper.getInitialCategories()
  await Category.insertMany(initialCategories)

  initialProducts = await helper.getInitialProducts()
  await Product.insertMany(initialProducts)

  token = await getToken()
})

describe('categories test', () => {
  test('all categories are returned', async () => {
    const response = await api.get('/api/categories').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(initialCategories.length)
  })

  test('viewing a specific category with a valid id', async () => {
    const categoriesAtStart = await helper.categoriesInDb()
    const categoryToView = categoriesAtStart[0]

    const resultProductCategory = await api
      .get(`/api/categories/${categoryToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedCategoryToView = JSON.parse(JSON.stringify(categoryToView))

    expect(resultProductCategory.body).toEqual(processedCategoryToView)
  })

  test('addition of a new category with valid data', async () => {
    const newCategory = { description: 'category test decription' }

    await api
      .post('/api/categories')
      .send(newCategory)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const categoriesAtEnd = await helper.categoriesInDb()
    expect(categoriesAtEnd).toHaveLength(initialCategories.length + 1)

    const descriptions = categoriesAtEnd.map(pc => pc.description)
    expect(descriptions).toContain('category test decription')
  })
})

describe('products test', () => {
  test('all products are returned', async () => {
    const response = await api.get('/api/products').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(initialProducts.length)
  })

  test('viewing a specific product with a valid id', async () => {
    const productsAtStart = await helper.productsInDb()
    const productToView = productsAtStart[0]

    const resultProduct = await api
      .get(`/api/products/${productToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedProductToView = JSON.parse(JSON.stringify(productToView))

    expect(resultProduct.body).toEqual(processedProductToView)
  })

  test('addition of a new product with valid data', async () => {
    const categoriesAtStart = await helper.categoriesInDb()

    const newProduct = {
      name: 'product test name',
      price: 50.89,
      category: categoriesAtStart[0].id
    }

    await api
      .post('/api/products')
      .set('Authorization', `bearer ${token}`)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const productsAtEnd = await helper.productsInDb()
    expect(productsAtEnd).toHaveLength(initialProducts.length + 1)

    const names = productsAtEnd.map(p => p.name)
    expect(names).toContain('product test name')
  })
})

afterAll(() => closeDatabase())
