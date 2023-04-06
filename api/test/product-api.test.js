const helper = require('./product-test-helper')
const { api, setUser, getToken } = require('./test_helper')
const Product = require('../models/product')
const ProductCategory = require('../models/product-category')
const { connectToDatabase, closeDatabase } = require('../utils/db')

let token = ''

beforeEach(async () => {
  await connectToDatabase()

  await ProductCategory.deleteMany({})
  await Product.deleteMany({})

  await ProductCategory.insertMany(helper.initialProductCategories)
  await Product.insertMany(helper.initialProducts)

  await setUser()
  token = await getToken()
})

describe('product categories test', () => {
  test('all product categories are returned', async () => {
    const response = await api.get('/api/product-categories').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialProductCategories.length)
  })

  test('viewing a specific product category with a valid id', async () => {
    const productCategoriesAtStart = await helper.productCategoriesInDb()
    const productCategoryToView = productCategoriesAtStart[0]

    const resultProductCategory = await api
      .get(`/api/product-categories/${productCategoryToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedProductCategoryToView = JSON.parse(JSON.stringify(productCategoryToView))

    expect(resultProductCategory.body).toEqual(processedProductCategoryToView)
  })

  test('addition of a new product category with valid data', async () => {
    const newProductCategory = { description: 'product category test decription' }

    await api
      .post('/api/product-categories')
      .send(newProductCategory)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const productCategoriesAtEnd = await helper.productCategoriesInDb()
    expect(productCategoriesAtEnd).toHaveLength(helper.initialProductCategories.length + 1)

    const descriptions = productCategoriesAtEnd.map(pc => pc.description)
    expect(descriptions).toContain('product category test decription')
  })
})

describe('products test', () => {
  test('all products are returned', async () => {
    const response = await api.get('/api/products').set('Authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialProducts.length)
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
    const productCategoriesAtStart = await helper.productCategoriesInDb()

    const newProduct = {
      name: 'product test name',
      price: 50.89,
      category: productCategoriesAtStart[0].id
    }

    await api
      .post('/api/products')
      .set('Authorization', `bearer ${token}`)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const productsAtEnd = await helper.productsInDb()
    expect(productsAtEnd).toHaveLength(helper.initialProducts.length + 1)

    const names = productsAtEnd.map(p => p.name)
    expect(names).toContain('product test name')
  })
})

afterAll(() => closeDatabase())
