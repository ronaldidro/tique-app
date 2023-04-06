const http = require('http')
const app = require('./app')
const { connectToDatabase } = require('./utils/db')
const { PORT } = require('./utils/config')
const { info } = require('./utils/logger')

const server = http.createServer(app)

const start = async () => {
  await connectToDatabase()

  server.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
  })
}

start()
