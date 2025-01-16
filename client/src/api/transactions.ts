import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  endpoints: (builder) => ({
    getExpenses: builder.query<any[], void>({
      query: () => '/expenses',
    }),
    addExpense: builder.mutation<void, any>({
      query: (expense) => ({
        url: '/expenses',
        method: 'POST',
        body: expense,
      }),
    }),
    updateExpense: builder.mutation<void, any>({
      query: (expense) => ({
        url: `/expenses/${expense.id}`,
        method: 'PUT',
        body: expense,
      }),
    }),
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } = expensesApi;