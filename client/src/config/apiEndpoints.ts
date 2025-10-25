export const API_ENDPOINTS = {
  wallet: {
    base: '/wallet',
  },
  expenses: {
    base: '/expenses',
    byId: (id: number) => `/expenses/${id}`,
  },
  categories: {
    base: '/categories',
    byId: (id: string) => `/categories/${id}`,
  },
};
