const ProductCategory = require('../models/product-category')
const Product = require('../models/product')

const initialProductCategories = [{ description: 'beverages' }, { description: 'desserts' }]

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

const productCategoriesInDb = async () => {
  const productCategories = await ProductCategory.find({})
  return productCategories.map(pc => pc.toJSON())
}

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(p => p.toJSON())
}

module.exports = { initialProductCategories, initialProducts, productCategoriesInDb, productsInDb }
