
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { Transaction } from "@/hooks/useTransactions";

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Other Income'],
  expense: ['Food', 'Housing', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Utilities', 'Other']
};

interface TransactionFormProps {
  transaction?: Transaction | null;
  onSubmit: (transaction: Omit<Transaction, 'id'> | Transaction) => void;
  onCancel: () => void;
}

export const TransactionForm = ({ transaction, onSubmit, onCancel }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'expense' as 'income' | 'expense'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount.toString(),
        description: transaction.description,
        date: transaction.date,
        category: transaction.category,
        type: transaction.type
      });
    }
  }, [transaction]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (transaction) {
      onSubmit({ ...transactionData, id: transaction.id });
    } else {
      onSubmit(transactionData);
    }
  };

  const handleTypeChange = (newType: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: '' // Reset category when type changes
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup 
              value={formData.type} 
              onValueChange={handleTypeChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense" className="text-red-600">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income" className="text-green-600">Income</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES[formData.type].map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
