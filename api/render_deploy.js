const { default: axios } = require('axios')
const { RENDER_SERVICE_ID, RENDER_API_KEY } = require('./utils/config')

const renderUri = `https://api.render.com/deploy/srv-${RENDER_SERVICE_ID}?key=${RENDER_API_KEY}`

const deployToRailway = async () => {
  console.log('*** starting deploy ***')

  try {
    const response = await axios(renderUri)
    console.log('success: ', response.data)
    console.log('see logs: ', `https://dashboard.render.com/web/srv-${RENDER_SERVICE_ID}/logs`)
  } catch (error) {
    console.log('error: ', error.response.data)
  } finally {
    console.log('*** deploy finished ***')
  }
}

deployToRailway()
