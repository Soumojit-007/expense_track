
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, History } from "lucide-react";
import { Link } from "react-router-dom";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { ExpensesChart } from "@/components/ExpensesChart";
import { CategoryChart } from "@/components/CategoryChart";
import { SummaryCards } from "@/components/SummaryCards";
import { useTransactions } from "@/hooks/useTransactions";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { transactions, addTransaction, updateTransaction, deleteTransaction, totalIncome, totalExpenses, currentBalance } = useTransactions();

  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);
    setShowForm(false);
  };

  const handleEditTransaction = (transaction) => {
    updateTransaction(transaction);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Finance Tracker
            </h1>
            <p className="text-gray-600 mt-2">Take control of your personal finances</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/history">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <History className="w-4 h-4 mr-2" />
                View History
              </Button>
            </Link>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards 
          transactions={transactions} 
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          currentBalance={currentBalance}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpensesChart transactions={transactions} />
          <CategoryChart transactions={transactions} />
        </div>

        {/* Recent Transactions */}
        <TransactionList 
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
        />

        {/* Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <TransactionForm
                transaction={editingTransaction}
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                onCancel={() => {
                  setShowForm(false);
                  setEditingTransaction(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
