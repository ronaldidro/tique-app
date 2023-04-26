import axios from 'axios'
import { isExpired } from 'react-jwt'
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '../utils'

const apiConfig = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

const setToken = () => {
  const userData = getItemFromLocalStorage('loggedTiqueAppUser') || null

  if (userData && isExpired(userData.token)) {
    removeItemFromLocalStorage(['loggedTiqueAppUser'])
    window.location = '/admin'
  }

  if (userData) apiConfig.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
}

export const request = async (url, method, data) => {
  setToken()
  const response = await apiConfig.request({ url, method, data })
  return response.data
}
