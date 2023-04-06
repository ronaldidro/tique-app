const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const path = require('path')
require('express-async-errors')

const authRouter = require('./controllers/auth')
const shopsRouter = require('./controllers/shops')
const categoriesRouter = require('./controllers/categories')
const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')

const { tokenExtractor, unknownEndpoint, errorHandler } = require('./utils/middleware')

morgan.token('body', req => JSON.stringify(req.body))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
}

app.use(cors())
app.use(express.static('../app/build'))
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/auth', authRouter)
app.use('/api/companies', shopsRouter)
app.use('/api/product-categories', categoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

app.get('/info', (request, response) => {
  response.send(`
    <h1>Tique App API</h1>
    <p><em>&copy;${new Date().getFullYear()} Hatun Tech. Todos los derechos reservados.</em></p>
  `)
})

app.get('/*', (request, response) => {
  response.sendFile('index.html', { root: path.join(__dirname, '../app/build') })
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
