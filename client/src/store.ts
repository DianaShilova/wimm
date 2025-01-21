import { configureStore } from '@reduxjs/toolkit';
import { expensesApi } from './api/transactions';
import { setupListeners } from '@reduxjs/toolkit/query';
import { walletApi } from './api/wallet';

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware, walletApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
