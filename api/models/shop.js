const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  placeService: {
    type: String,
    required: true
  },
  attentionSchedule: {
    type: Array,
    default: [],
    required: true
  },
  socialNetworks: {
    type: Array,
    default: []
  },
  cellPhone: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

shopSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

shopSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Shop', shopSchema)
