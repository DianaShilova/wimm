import { configureStore } from '@reduxjs/toolkit';
import { expensesApi } from './api/transactions';
import { setupListeners } from '@reduxjs/toolkit/query';
import { walletApi } from './api/wallet';
import { categoriesApi } from './api/categories';

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expensesApi.middleware,
      walletApi.middleware,
      categoriesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
