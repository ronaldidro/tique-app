const Shop = require('../models/shop')

const initialShop = [
  {
    name: 'Name Test Shop',
    address: 'Address Test Shop',
    placeService: 'Place Service Test Shop',
    attentionSchedule: [{ Everyday: 'Open 24 hours' }],
    cellPhone: '990990990'
  }
]

const nonExistingId = async () => {
  const shop = new Shop({
    name: 'willremovethissoon',
    address: 'willremovethissoon',
    placeService: 'willremovethissoon',
    cellPhone: '980980980'
  })

  await shop.save()
  await shop.remove()

  return shop._id.toString()
}

const shopsInDb = async () => {
  const shops = await Shop.find({})
  return shops.map(shop => shop.toJSON())
}

module.exports = { initialShop, nonExistingId, shopsInDb }
