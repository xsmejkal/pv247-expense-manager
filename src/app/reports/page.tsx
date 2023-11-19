import { Suspense } from "react";
import { getAllExpenses } from "@/server/expense";
import ReportsDatePickerWithGraphs from "./_components/reports-date-picker-with-graphs";

export const metadata = {
  title: "Reports | Expense manager++",
  description: "Shows breathtaking reports graphs!",
};

const Reports = async () => {
  const expensesOfUser = await getAllExpenses(); // TODO change to only expenses of user

  return (
    <main>
      <h1>Reports</h1>
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
