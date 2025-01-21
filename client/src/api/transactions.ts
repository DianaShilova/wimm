import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense } from '../types/interfaces';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  tagTypes: ['Expenses', 'Wallet'],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => 'expenses',
      providesTags: ['Expenses']
    }),
    addExpense: builder.mutation<Expense, Omit<Expense, 'id'>>({
      query: (expense) => ({
        url: 'expenses',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expenses']
    }),
    updateExpense: builder.mutation<void, Expense>({
      query: (expense) => ({
        url: `/expenses/${expense.id}`,
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expenses']
    }),
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expenses']
    }),
  }),});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } = expensesApi;