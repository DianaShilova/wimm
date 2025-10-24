import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category, ServerCategory } from '../types/interfaces';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api`;

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => API_ENDPOINTS.categories.base,
      transformResponse: (response: ServerCategory[]) =>
        response.map((category) => ({
          ...category,
          id: category._id,
        })),
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: (category) => ({
        url: API_ENDPOINTS.categories.base,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (category) => ({
        url: API_ENDPOINTS.categories.byId(category.id),
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ENDPOINTS.categories.byId(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
