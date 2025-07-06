
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from "@/hooks/useTransactions";

interface CategoryChartProps {
  transactions: Transaction[];
}

export const CategoryChart = ({ transactions }: CategoryChartProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthExpenses = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return t.type === 'expense' && 
           transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const categoryData = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
    percentage: 0 // Will be calculated below
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);
  data.forEach(item => {
    item.percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
  });

  const COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // yellow
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f97316', // orange
    '#84cc16', // lime
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            ${data.value.toLocaleString()} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Expenses by Category</CardTitle>
        <p className="text-sm text-gray-600">This month's breakdown</p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-gray-500">
            <p>No expense data for this month</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
