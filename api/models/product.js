const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0.0
  },
  images: [
    {
      type: {
        type: String,
        enum: ['root', 'other'],
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  attributes: [
    {
      description: {
        type: String,
        required: true
      },
      values: {
        type: [String],
        required: true
      }
    }
  ],
  active: {
    type: Boolean,
    default: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)
