import { api } from './api'

const categoriesApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Category', id })), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }]
    }),
    getCategory: builder.query({
      query: id => `/categories/${id}`,
      providesTags: ({ id }) => [{ type: 'Category', id }]
    }),
    postCategory: builder.mutation({
      query: data => {
        return {
          url: '/categories',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: [{ type: 'Category', id: 'LIST' }]
    }),
    patchCategory: builder.mutation({
      query: data => {
        return {
          url: `/categories/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ({ id }) => [{ type: 'Category', id }]
    }),
    deleteCategory: builder.mutation({
      query: id => {
        return {
          url: `/categories/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ({ id }) => [{ type: 'Category', id }]
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  usePostCategoryMutation,
  usePatchCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApi
