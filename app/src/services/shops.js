import { api } from './api'

const shopsApi = api.injectEndpoints({
  endpoints: builder => ({
    getShops: builder.query({
      query: () => '/shops',
      providesTags: ['Shops']
    }),
    getShop: builder.query({
      query: id => `/shops/${id}`,
      providesTags: ({ id }) => [{ type: 'Shop', id }]
    }),
    patchShop: builder.mutation({
      query: data => {
        return {
          url: `/shops/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ({ id }) => [{ type: 'Shop', id }]
    })
  })
})

export const { useGetShopsQuery, useGetShopQuery, usePatchShopMutation } = shopsApi
