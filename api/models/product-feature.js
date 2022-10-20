const mongoose = require('mongoose')

const productFeatureSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})

productFeatureSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ProductFeature', productFeatureSchema)
