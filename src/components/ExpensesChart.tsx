
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from "@/hooks/useTransactions";

interface ExpensesChartProps {
  transactions: Transaction[];
}

export const ExpensesChart = ({ transactions }: ExpensesChartProps) => {
  // Get data for the last 6 months
  const getMonthlyData = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = month.toLocaleDateString('en-US', { month: 'short' });
      const year = month.getFullYear();
      const monthKey = `${year}-${month.getMonth()}`;
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === month.getMonth() && 
               transactionDate.getFullYear() === month.getFullYear();
      });

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month: monthName,
        expenses,
        income,
        key: monthKey
      });
    }
    
    return months;
  };

  const data = getMonthlyData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm ${entry.dataKey === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {entry.dataKey === 'income' ? 'Income' : 'Expenses'}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="income" 
                fill="url(#incomeGradient)" 
                radius={[4, 4, 0, 0]}
                name="Income"
              />
              <Bar 
                dataKey="expenses" 
                fill="url(#expenseGradient)" 
                radius={[4, 4, 0, 0]}
                name="Expenses"
              />
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
