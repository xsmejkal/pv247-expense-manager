import { getAllExpenses } from "@/server/expense";
import { Suspense } from "react";
import ExpensesList from "./_components/expenses-list";

const LoadingExpenses = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="loader" />
    <p>Loading expenses...</p>
  </div>
);
const AsyncExpensesPage = async () => {
  const expenses = await getAllExpenses();
  return <ExpensesList expenses={expenses} />;
};

const ExpensesPage = () => (
  <Suspense fallback={<LoadingExpenses />}>
    <AsyncExpensesPage />
  </Suspense>
);

export default ExpensesPage;
