const shopsRouter = require('express').Router()
const Shop = require('../models/shop')
const { verifyAuth } = require('../utils/middleware')

shopsRouter.get('/', async (request, response) => {
  const shops = await Shop.find({ active: true }, 'name address placeService images').sort({ name: 1 })
  response.json(shops)
})

shopsRouter.get('/:id', async (request, response) => {
  const shop = await Shop.findById(request.params.id).populate({
    path: 'categories',
    select: 'description',
    match: { active: true },
    options: {
      sort: { description: 1 }
    },
    populate: {
      path: 'products',
      select: 'name description price discount images attributes',
      match: { active: true },
      options: {
        sort: { name: 1 }
      }
    }
  })

  if (shop) {
    response.json(shop.toJSON())
  } else {
    response.status(404).end()
  }
})

shopsRouter.post('/', verifyAuth, async (request, response) => {
  const { user } = request
  const shop = new Shop({ ...request.body, users: user._id })
  const savedShop = await shop.save()

  user.shop = shop._id
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(savedShop)
})

shopsRouter.patch('/:id', verifyAuth, async (request, response) => {
  const currentShop = await Shop.findById(request.params.id)

  if (currentShop._id.toString() !== request.user.shop.toString()) {
    return response.status(401).json({
      error: 'wrong user for shop'
    })
  }

  const updatedShop = await Shop.findByIdAndUpdate(request.params.id, request.body, { new: true })
  if (!updatedShop) response.status(404).end()
  response.json(updatedShop)
})

module.exports = shopsRouter
