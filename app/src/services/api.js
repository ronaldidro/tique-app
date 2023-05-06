import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isExpired } from 'react-jwt'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token

    if (token && isExpired(token)) window.location = '/admin'

    headers.set('authorization', `Bearer ${token}`)

    return headers
  }
})

export const api = createApi({
  reducerPath: 'tiqueApi',
  baseQuery,
  tagTypes: ['Shop', 'Shops', 'Category', 'Categories'],
  endpoints: () => ({})
})
