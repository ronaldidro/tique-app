import axios from 'axios'
import { isExpired } from 'react-jwt'
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '../utils'

const apiConfig = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json'
  }
})

const setToken = () => {
  const userData = getItemFromLocalStorage('loggedTiqueAppUser', true) || null

  if (userData && isExpired(userData.token)) {
    removeItemFromLocalStorage(['loggedTiqueAppUser'])
    window.location = '/admin'
  }

  if (userData) apiConfig.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
}

const get = async pathname => {
  setToken()
  const response = await apiConfig.get(pathname)
  return response.data
}

const post = async (pathname, data) => {
  setToken()
  const response = await apiConfig.post(pathname, data)
  return response.data
}

const patch = async (pathname, data) => {
  setToken()
  const response = await apiConfig.patch(`${pathname}/${data.id}`, data)
  return response.data
}

const remove = async (pathname, data) => {
  setToken()
  const response = await apiConfig.delete(`${pathname}/${data.id}`)
  return response.data
}

export default { get, post, patch, remove }
