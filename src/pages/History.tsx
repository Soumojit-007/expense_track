
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { Link } from "react-router-dom";

const History = () => {
  const { transactions } = useTransactions();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const incomeTransactions = sortedTransactions.filter(t => t.type === 'income');
  const expenseTransactions = sortedTransactions.filter(t => t.type === 'expense');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Transaction History
            </h1>
            <p className="text-gray-600 mt-2">Complete ledger of all your financial activities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income History */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center text-green-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                Income History
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({incomeTransactions.length} entries)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incomeTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No income entries yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {incomeTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-green-50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-green-600 text-lg">
                          +{formatAmount(transaction.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Expense History */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center text-red-600">
                <TrendingDown className="w-5 h-5 mr-2" />
                Expense History
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({expenseTransactions.length} entries)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenseTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No expense entries yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {expenseTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-red-50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-red-600 text-lg">
                          -{formatAmount(transaction.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
