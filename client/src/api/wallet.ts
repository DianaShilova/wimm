import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { WalletBalance } from '../types/interfaces';

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api`;

export const walletApi = createApi({
    reducerPath: 'walletApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['Wallet'],
    endpoints: (builder) => ({
        getWallet: builder.query<WalletBalance[], void>({
            query: () => API_ENDPOINTS.wallet.base,
            providesTags: ['Wallet'],
        }),
        addToWallet: builder.mutation<WalletBalance, { amount: number, account: string }>({
            query: (data) => ({
                url: API_ENDPOINTS.wallet.base,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Wallet'],
        }),
    }),
});


export const { useGetWalletQuery, useAddToWalletMutation } = walletApi;