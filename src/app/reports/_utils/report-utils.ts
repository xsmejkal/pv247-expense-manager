import { ServerExpense } from "@/app/expenses/expense";

export const expensesByCategory = (
  expenses: ServerExpense[],
  startDate: string,
  endDate: string
) => {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.date >= new Date(startDate) &&
      expense.date <= new Date(endDate) &&
      expense.amount < 0
  );

  return filteredExpenses.reduce(
    (result: { [categoryName: string]: number }, expense) => {
      const categoryName = expense.category.name;
      if (!result[categoryName]) {
        result[categoryName] = 0;
      }
      result[categoryName] += Math.abs(expense.amount);
      return result;
    },
    {}
  );
};

export const expensesAndIncomesByMonth = (
  expenses: ServerExpense[],
  startDate: string,
  endDate: string
) => {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.date >= new Date(startDate) && expense.date <= new Date(endDate)
  );

  return filteredExpenses.reduce(
    (result: { [month: string]: number }, expense) => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth() + 1;
      const monthKey = `${expenseDate.getFullYear()}-${
        month < 10 ? `0${month}` : month
      }`;

      if (!result[monthKey]) {
        result[monthKey] = 0;
      }

      result[monthKey] += expense.amount;
      return result;
    },
    {}
  );
};
