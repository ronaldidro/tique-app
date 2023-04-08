const Customer = require('../models/customer')
const Shop = require('../models/shop')

const getInitialCustomers = async () => {
  const shop = await Shop.findOne({ name: 'Hatun Tech' })

  return [
    { documentNumber: '10101010', firstName: 'Jhon', lastName: 'Doe', address: 'New York', shop: shop._id },
    { documentNumber: '20202020', firstName: 'Ken', lastName: 'Smith', address: 'Manhattan', shop: shop._id }
  ]
}

const customersInDb = async () => {
  const customers = await Customer.find({})
  return customers.map(cs => cs.toJSON())
}

module.exports = {
  getInitialCustomers,
  customersInDb
}
