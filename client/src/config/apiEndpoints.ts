export const API_ENDPOINTS = {
    wallet: {
      base: '/wallet',
    },
    expenses: {
      base: '/expenses',
      byId: (id: number) => `/expenses/${id}`
    }
  };
  