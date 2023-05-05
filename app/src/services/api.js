import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token

    if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  }
})

export const api = createApi({
  reducerPath: 'tiqueApi',
  baseQuery,
  tagTypes: ['Shop', 'Shops'],
  endpoints: () => ({})
})
