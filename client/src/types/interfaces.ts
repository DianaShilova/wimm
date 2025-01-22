export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    date?: string;
    description?: string;
}

export interface WalletBalance {
  [key: string]: number;
}
  