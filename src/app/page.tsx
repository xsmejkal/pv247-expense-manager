import { getAllExpenses } from "@/server/expense";
import { Expense } from "./expenses/expense";
import ExpenseGraphs from "./home/_components/home-page-charts";
import LastExpense from "./home/_components/last-expense";

export default async function Home() {
  const expenses = await getAllExpenses();
  const sortedExpenses = expenses.sort(
    (a: Expense, b: Expense) => b.date.getTime() - a.date.getTime()
  );
  const lastExpense = sortedExpenses[0];

  const today = new Date();
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

  const last30DaysExpenses = expenses.filter(
    (expense) => new Date(expense.date) >= thirtyDaysAgo
  );

  return (
    <main className="flex justify-center h-full w-full">
      <div className="text-center p-8 h-full overflow-x-hidden">
        <h1 className="text-4xl font-bold mb-16">Expense Manager++</h1>

        <div className="flex flex-col justify-around items-middle space-x-4">
          {lastExpense && (
            <div className="flex-1 mb-16">
              <LastExpense lastExpense={lastExpense} />
            </div>
          )}

          <div className="flex-1">
            <ExpenseGraphs
              expenses={last30DaysExpenses}
              startDate={thirtyDaysAgo.toISOString()}
              endDate={new Date().toISOString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
