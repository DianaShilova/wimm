export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  plannedMonthlySum: number;
}

export interface ServerCategory {
  _id: string;
  name: string;
  plannedMonthlySum: number;
}

export interface WalletBalance {
  [key: string]: number;
}
