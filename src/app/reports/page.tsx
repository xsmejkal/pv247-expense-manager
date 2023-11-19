import { Suspense } from "react";
import { getAllExpenses } from "@/server/expense";
import ReportsDatePickerWithGraphs from "./_components/reports-date-picker-with-graphs";

export const metadata = {
  title: "Reports | Expense manager++",
  description: "Shows breathtaking reports graphs!",
};

const Reports = async () => {
  const expensesOfUser = await getAllExpenses();

  return (
    <main>
    <h1 className="mb-6 text-2xl font-bold flex items-center justify-center">
      Reports
    </h1>
      <ReportsDatePickerWithGraphs expenses={expensesOfUser} />
    </main>
  );
};

const LoadingReports = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
      <div className="mt-2">LOADING...</div>
    </div>
  );
};

const ReportsPage = () => {
  return (
    <Suspense fallback={<LoadingReports />}>
      <Reports />
    </Suspense>
  );
};

export default ReportsPage;
