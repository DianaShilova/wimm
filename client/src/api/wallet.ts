import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const walletApi = createApi({
    reducerPath: 'walletApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
    }),
    tagTypes: ['Wallet'],
    endpoints: (builder) => ({
        getWallet: builder.query<number, void>({
            query: () => '/wallet',
            providesTags: ['Wallet'],
        }),
        addToWallet: builder.mutation<number, number>({
            query: (amount) => ({
                url: '/wallet',
                method: 'POST',
                body: { amount },
            }),
            invalidatesTags: ['Wallet'],
        }),
    }),
});


export const { useGetWalletQuery, useAddToWalletMutation } = walletApi;