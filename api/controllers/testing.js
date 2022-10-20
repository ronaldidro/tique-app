const router = require('express').Router()
const Company = require('../models/company')

router.post('/reset', async (request, response) => {
  await Company.deleteMany({})

  response.status(204).end()
})

module.exports = router
