import { api } from './api'

const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }]
    }),
    getProduct: builder.query({
      query: id => `/products/${id}`,
      providesTags: ({ id }) => [{ type: 'Product', id }]
    }),
    postProduct: builder.mutation({
      query: data => {
        return {
          url: '/products',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }]
    }),
    patchProduct: builder.mutation({
      query: data => {
        return {
          url: `/products/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ({ id }) => [{ type: 'Product', id }]
    }),
    deleteProduct: builder.mutation({
      query: id => {
        return {
          url: `/products/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ({ id }) => [{ type: 'Product', id }]
    })
  })
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  usePostProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation
} = productsApi
