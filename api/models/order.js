const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    payMethod: {
      type: String,
      enum: ['cash', 'card', 'transfer'],
      required: true
    },
    items: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'delivered', 'canceled'],
      default: 'pending'
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop'
    },
    detail: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        attributes: [Object],
        price: {
          type: Number,
          required: true
        },
        discount: {
          type: Number,
          default: 0
        },
        discountedPrice: {
          type: Number,
          default: 0
        },
        quantity: {
          type: Number,
          required: true
        },
        amount: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Order', orderSchema)
