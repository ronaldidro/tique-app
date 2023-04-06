const mongoose = require('mongoose')
const { info, error } = require('./logger')
const { MONGODB_URI } = require('./config')

const connectToDatabase = async () => {
  info('Connecting to', MONGODB_URI)

  mongoose
    .connect(MONGODB_URI)
    .then(() => info('Connected to MongoDB'))
    .catch(err => error('Error connection to MongoDB:', err.message))

  return null
}

const closeDatabase = () => mongoose.connection.close()

module.exports = {
  connectToDatabase,
  closeDatabase
}
