import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isExpired } from 'react-jwt'
import { getItemFromLocalStorage, removeItemFromLocalStorage } from '../utils'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: headers => {
    const userData = getItemFromLocalStorage('loggedTiqueAppUser') || null

    if (!userData) return

    if (isExpired(userData.token)) {
      removeItemFromLocalStorage(['loggedTiqueAppUser'])
      window.location = '/admin'
    }

    headers.set('authentication', `Bearer ${userData.token}`)

    return headers
  }
})

export const api = createApi({
  reducerPath: 'tiqueApi',
  baseQuery,
  tagTypes: ['Shops'],
  endpoints: () => ({})
})
