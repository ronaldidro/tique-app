const Shop = require('../models/shop')
const User = require('../models/user')

const initialShop = [
  {
    name: 'Hatun Tech',
    address: 'Av. Ignacio Merino',
    placeService: 'Lince',
    attentionSchedule: [{ Everyday: 'Open 24 hours' }],
    cellPhone: '990990990'
  }
]

const nonExistingId = async () => {
  const shop = new Shop({
    name: 'willremovethissoon',
    address: 'willremovethissoon',
    placeService: 'willremovethissoon',
    cellPhone: 'willremovethissoon'
  })

  await shop.save()
  await shop.remove()

  return shop._id.toString()
}

const shopsInDb = async () => {
  const shops = await Shop.find({})
  return shops.map(shop => shop.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialShop,
  nonExistingId,
  shopsInDb,
  usersInDb
}
