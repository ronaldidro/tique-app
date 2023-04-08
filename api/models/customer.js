const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const customerSchema = new mongoose.Schema({
  documentNumber: {
    type: String,
    minLength: 8,
    maxLength: 8,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    minLength: 3,
    required: true
  },
  lastName: {
    type: String,
    minLength: 3,
    required: true
  },
  address: String,
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
})

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

customerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Customer', customerSchema)
