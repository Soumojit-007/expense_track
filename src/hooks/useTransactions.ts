
import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

const STORAGE_KEY = 'finance-tracker-transactions';

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Salary',
    date: '2024-01-15',
    category: 'Income',
    type: 'income'
  },
  {
    id: '2',
    amount: 850,
    description: 'Rent',
    date: '2024-01-01',
    category: 'Housing',
    type: 'expense'
  },
  {
    id: '3',
    amount: 120,
    description: 'Groceries',
    date: '2024-01-10',
    category: 'Food',
    type: 'expense'
  },
  {
    id: '4',
    amount: 45,
    description: 'Gas',
    date: '2024-01-08',
    category: 'Transportation',
    type: 'expense'
  }
];

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      setTransactions(defaultTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Calculate totals and balance
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    currentBalance
  };
};
