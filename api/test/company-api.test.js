const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./company-test-helper')
const app = require('../app')

const api = supertest(app)

const Company = require('../models/company')

beforeEach(async () => {
  await Company.deleteMany({})
  await Company.insertMany(helper.initialCompany)
})

describe('when there is initially some companies saved', () => {
  test('companies are returned as json', async () => {
    await api
      .get('/api/companies')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all companies are returned', async () => {
    const response = await api.get('/api/companies')
    expect(response.body).toHaveLength(helper.initialCompany.length)
  })
})

describe('viewing a specific company', () => {
  test('succeeds with a valid id', async () => {
    const companiesAtStart = await helper.companiesInDb()
    const companyToView = companiesAtStart[0]

    const resultCompany = await api
      .get(`/api/companies/${companyToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedCompanyToView = JSON.parse(JSON.stringify(companyToView))

    expect(resultCompany.body).toEqual(processedCompanyToView)
  })

  test('fails with statuscode 404 if company does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/companies/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/companies/${invalidId}`).expect(400)
  })
})

describe('addition of a new company', () => {
  test('succeeds with valid data', async () => {
    const newCompany = {
      name: 'new company name',
      address: 'new company address',
      placeService: 'new company place service'
    }

    await api
      .post('/api/companies')
      .send(newCompany)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const CompaniesAtEnd = await helper.companiesInDb()
    expect(CompaniesAtEnd).toHaveLength(helper.initialCompany.length + 1)

    const names = CompaniesAtEnd.map(company => company.name)
    expect(names).toContain('new company name')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
