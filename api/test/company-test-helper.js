const Company = require('../models/company')

const initialCompany = [
  {
    name: 'Name Test Company',
    address: 'Address Test Company',
    placeService: 'Place Service Test Company',
    attentionSchedule: [{ Everyday: 'Open 24 hours' }]
  }
]

const nonExistingId = async () => {
  const company = new Company({
    name: 'willremovethissoon',
    address: 'willremovethissoon',
    placeService: 'willremovethissoon'
  })
  await company.save()
  await company.remove()

  return company._id.toString()
}

const companiesInDb = async () => {
  const companies = await Company.find({})
  return companies.map(company => company.toJSON())
}

module.exports = { initialCompany, nonExistingId, companiesInDb }
