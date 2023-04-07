const Category = require('../models/category')
const Product = require('../models/product')
const Shop = require('../models/shop')

const getInitialCategories = async () => {
  const shop = await Shop.findOne({ name: 'Hatun Tech' })

  return [
    { description: 'beverages', shop: shop._id },
    { description: 'desserts', shop: shop._id }
  ]
}

const getInitialProducts = async () => {
  const category = await Category.findOne({ description: 'beverages' })

  return [
    {
      name: 'cosmopolitan',
      description: 'drink prepared with vodka',
      price: 18.9,
      discount: 0.3,
      category: category._id
    },
    {
      name: 'apple cake',
      description: 'fruit cake made with a dough covered with apple',
      price: 14.75,
      discount: 0.18,
      category: category._id
    }
  ]
}

const categoriesInDb = async () => {
  const categories = await Category.find({})
  return categories.map(pc => pc.toJSON())
}

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(p => p.toJSON())
}

module.exports = {
  getInitialCategories,
  getInitialProducts,
  categoriesInDb,
  productsInDb
}
