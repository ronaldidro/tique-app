import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isExpired } from 'react-jwt'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URI}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user?.token

    if (token && isExpired(token)) window.location = '/admin'

    headers.set('authorization', `Bearer ${token}`)

    return headers
  }
})

export const api = createApi({
  reducerPath: 'tiqueApi',
  baseQuery,
  tagTypes: ['Shop', 'Shops', 'Category', 'Product'],
  endpoints: () => ({})
})
