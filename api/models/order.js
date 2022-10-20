const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  mode: {
    type: Number,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  payMethod: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  orderDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetail'
    }
  ]
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Order', orderSchema)
