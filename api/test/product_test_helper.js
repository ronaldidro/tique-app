const Category = require('../models/category')
const Product = require('../models/product')

const initialCategories = [{ description: 'beverages' }, { description: 'desserts' }]

const initialProducts = [
  {
    name: 'cosmopolitan',
    description: 'drink prepared with vodka',
    price: 18.9,
    discount: 0.3
  },
  {
    name: 'apple cake',
    description: 'fruit cake made with a dough covered with apple',
    price: 14.75,
    discount: 0.18
  }
]

const categoriesInDb = async () => {
  const categories = await Category.find({}, 'description active shop')
  return categories.map(pc => pc.toJSON())
}

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(p => p.toJSON())
}

module.exports = { initialCategories, initialProducts, categoriesInDb, productsInDb }
