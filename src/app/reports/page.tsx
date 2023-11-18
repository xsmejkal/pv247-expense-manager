import { Suspense } from "react";
import BarChart from "./BarChart";
import { getAllExpenses, serverExpense } from "@/server/expense";
import PieChart from "./PieChart";
import DifferenceBarChart from "./DifferenceBarChart";

export type chartsData = {
  [categoryName: string]: number;
};

const expensesByCategory = (expenses: serverExpense[]) => {
  return expenses.reduce(
    (result: { [categoryName: string]: number }, expense) => {
      const categoryName = expense.category.name;
      if (!result[categoryName]) {
        result[categoryName] = 0;
      }
      result[categoryName] += expense.amount;
      return result;
    },
    {}
  );
};

const expensesByMonth = (expenses: serverExpense[]) => {
  return expenses.reduce(
    (result: { [month: string]: number }, expense) => {
      const expenseDate = new Date(expense.date);
      const monthKey = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`;

      if (!result[monthKey]) {
        result[monthKey] = 0;
      }

      result[monthKey] += expense.amount;
      return result;
    },
    {}
  );
};

const Reports = async () => {
  const expensesOfUser = await getAllExpenses(); // TODO change to only expenses of user
  const expensesGroupedByCategory = expensesByCategory(expensesOfUser);
  const expensesGroupedByMonth = expensesByMonth(expensesOfUser);

  return (
    <main>
      <h1>Reports</h1>
      <BarChart data={expensesGroupedByCategory} />
      <PieChart data={expensesGroupedByCategory} />
      <DifferenceBarChart data={expensesGroupedByMonth} />
    </main>
  );
};

const LoadingReports = () => {
  return <div>LOADING...</div>;
};

const ReportsPage = () => {
  return (
    <Suspense fallback={<LoadingReports />}>
      <Reports />
    </Suspense>
  );
};

export default ReportsPage;
