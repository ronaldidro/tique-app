import axios from 'axios'

let token = null

const setToken = newToken => (token = `bearer ${newToken}`)

const apiConfig = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    'Authorization': token,
    'Content-type': 'application/json'
  }
})

const get = async pathname => {
  const response = await apiConfig.get(pathname)
  return response.data
}

const post = async (pathname, data) => {
  const response = await apiConfig.post(pathname, data)
  return response.data
}

const patch = async (pathname, data) => {
  const response = await apiConfig.patch(`${pathname}/${data.id}`, data)
  return response.data
}

const remove = async (pathname, data) => {
  const response = await apiConfig.delete(`${pathname}/${data.id}`)
  return response.data
}

export default { get, post, patch, remove, setToken }
