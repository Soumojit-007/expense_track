// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TrendingUp, TrendingDown, PieChart, Wallet } from "lucide-react";
// import { Transaction } from "@/hooks/useTransactions";

// interface SummaryCardsProps {
//   transactions?: Transaction[]; // Make optional
//   totalIncome?: number;        // Make optional
//   totalExpenses?: number;      // Make optional
//   currentBalance?: number;     // Make optional
// }

// export const SummaryCards = ({ 
//   transactions = [], 
//   totalIncome = 0, 
//   totalExpenses = 0, 
//   currentBalance = 0 
// }: SummaryCardsProps) => {
  
//   // Initialize all values to 0 for fresh deployments
//   const initializedTotalIncome = totalIncome || 0;
//   const initializedTotalExpenses = totalExpenses || 0;
//   const initializedCurrentBalance = currentBalance || 0;

//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
  
//   const currentMonthTransactions = transactions.filter(t => {
//     try {
//       const transactionDate = new Date(t.date);
//       return transactionDate.getMonth() === currentMonth && 
//              transactionDate.getFullYear() === currentYear;
//     } catch {
//       return false; // Skip invalid dates
//     }
//   });

//   const monthlyExpenses = currentMonthTransactions
//     .filter(t => t.type === 'expense')
//     .reduce((sum, t) => sum + (t.amount || 0), 0);

//   const formatAmount = (amount: number | undefined) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount || 0); // Force 0 if undefined
//   };

//   // Calculate balance based on whether user has entered income
//   const displayBalance = initializedTotalIncome > 0 
//     ? initializedCurrentBalance 
//     : -monthlyExpenses;

//   const cards = [
//     {
//       title: "Current Balance",
//       value: formatAmount(displayBalance),
//       icon: Wallet,
//       color: displayBalance >= 0 ? "text-green-600" : "text-red-600",
//       description: initializedTotalIncome > 0 
//         ? "Total Income - Total Expenses" 
//         : "Monthly Expenses Tracking"
//     },
//     {
//       title: "Total Income",
//       value: formatAmount(initializedTotalIncome),
//       icon: TrendingUp,
//       color: "text-green-600",
//       description: "All time income"
//     },
//     {
//       title: "Total Expenses",
//       value: formatAmount(initializedTotalExpenses),
//       icon: TrendingDown,
//       color: "text-red-600",
//       description: "All time expenses"
//     },
//     {
//       title: "Monthly Expenses",
//       value: formatAmount(monthlyExpenses),
//       icon: PieChart,
//       color: "text-blue-600",
//       description: "This month's spending"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card, index) => (
//         <Card key={index} className="border-0 shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">
//               {card.title}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className={`text-2xl font-bold ${card.color}`}>
//               {card.value}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {card.description}
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };



// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TrendingUp, TrendingDown, PieChart, Wallet } from "lucide-react";
// import { Transaction } from "@/hooks/useTransactions";

// interface SummaryCardsProps {
//   transactions: Transaction[];
//   totalIncome: number;
//   totalExpenses: number;
//   currentBalance: number;
// }

// export const SummaryCards = ({ 
//   transactions = [], 
//   totalIncome = 0, 
//   totalExpenses = 0, 
//   currentBalance = 0 
// }: SummaryCardsProps) => {
  
//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();
  
//   // Filter transactions for current month (empty array by default)
//   const currentMonthTransactions = transactions?.filter(t => {
//     const transactionDate = new Date(t.date);
//     return transactionDate.getMonth() === currentMonth && 
//            transactionDate.getFullYear() === currentYear;
//   }) || [];

//   // Calculate monthly expenses (0 if no transactions)
//   const monthlyExpenses = currentMonthTransactions
//     .filter(t => t.type === 'expense')
//     .reduce((sum, t) => sum + t.amount, 0);

//   // Format amounts as $0 if no data
//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount || 0); // Ensures $0 if undefined/null
//   };

//   // Current Balance = (Income - Expenses) OR just tracks expenses if no income
//   const displayBalance = totalIncome > 0 ? currentBalance : -monthlyExpenses;

//   const cards = [
//     {
//       title: "Current Balance",
//       value: formatAmount(displayBalance),
//       icon: Wallet,
//       color: displayBalance >= 0 ? "text-green-600" : "text-red-600",
//       description: totalIncome > 0 ? "Total Income - Total Expenses" : "Monthly Expenses Tracking"
//     },
//     {
//       title: "Total Income",
//       value: formatAmount(totalIncome),
//       icon: TrendingUp,
//       color: "text-green-600",
//       description: "All time income"
//     },
//     {
//       title: "Total Expenses",
//       value: formatAmount(totalExpenses),
//       icon: TrendingDown,
//       color: "text-red-600",
//       description: "All time expenses"
//     },
//     {
//       title: "Monthly Expenses",
//       value: formatAmount(monthlyExpenses),
//       icon: PieChart,
//       color: "text-blue-600",
//       description: "This month's spending"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card, index) => (
//         <Card key={index} className="border-0 shadow-sm">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">
//               {card.title}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className={`text-2xl font-bold ${card.color}`}>
//               {card.value}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {card.description}
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };





import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, PieChart, Wallet } from "lucide-react";
import { Transaction } from "@/hooks/useTransactions";

interface SummaryCardsProps {
  transactions?: Transaction[]; // Make optional
  totalIncome?: number;        // Make optional
  totalExpenses?: number;      // Make optional
  currentBalance?: number;     // Make optional
}

export const SummaryCards = ({ 
  transactions = [], 
  totalIncome = 0, 
  totalExpenses = 0, 
  currentBalance = 0 
}: SummaryCardsProps) => {
  
  // Initialize all values to 0 for fresh deployments
  const initializedTotalIncome = totalIncome || 0;
  const initializedTotalExpenses = totalExpenses || 0;
  const initializedCurrentBalance = currentBalance || 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(t => {
    try {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    } catch {
      return false; // Skip invalid dates
    }
  });

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const formatAmount = (amount: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0); // Force 0 if undefined
  };

  // Calculate balance based on whether user has entered income
  const displayBalance = initializedTotalIncome > 0 
    ? initializedCurrentBalance 
    : -monthlyExpenses;

  const cards = [
    {
      title: "Current Balance",
      value: formatAmount(displayBalance),
      icon: Wallet,
      color: displayBalance >= 0 ? "text-green-600" : "text-red-600",
      description: initializedTotalIncome > 0 
        ? "Total Income - Total Expenses" 
        : "Monthly Expenses Tracking"
    },
    {
      title: "Total Income",
      value: formatAmount(initializedTotalIncome),
      icon: TrendingUp,
      color: "text-green-600",
      description: "All time income"
    },
    {
      title: "Total Expenses",
      value: formatAmount(initializedTotalExpenses),
      icon: TrendingDown,
      color: "text-red-600",
      description: "All time expenses"
    },
    {
      title: "Monthly Expenses",
      value: formatAmount(monthlyExpenses),
      icon: PieChart,
      color: "text-blue-600",
      description: "This month's spending"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
