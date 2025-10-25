import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense } from '../types/interfaces';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api`
console.log(API_URL)

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Expenses', 'Wallet'],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => API_ENDPOINTS.expenses.base,
      providesTags: ['Expenses']
    }),
    addExpense: builder.mutation<Expense, Omit<Expense, 'id'>>({
      query: (expense) => ({
        url: API_ENDPOINTS.expenses.base,
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expenses']
    }),
    updateExpense: builder.mutation<void, Expense>({
      query: (expense) => ({
        url: API_ENDPOINTS.expenses.byId(expense.id),
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expenses']
    }),
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.expenses.byId(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Expenses']
    }),
  }),});

export const { useGetExpensesQuery, useAddExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation } = expensesApi;