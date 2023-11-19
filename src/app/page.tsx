import { getAllExpenses } from "@/server/expense";
import { Expense } from "./expenses/expense";

export default async function Home() {
  const expenses = await getAllExpenses();
  const sortedExpenses = expenses.sort(
    (a: Expense, b: Expense) => b.date.getTime() - a.date.getTime()
  );
  const lastExpense = sortedExpenses[0];
  return (
    <main className="">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Expense Manager++</h1>

        {lastExpense && (
          <div className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Last Expense</h2>
            <p className="text-gray-600">
              <span className="font-bold">Name:</span> {lastExpense.name}
              <br />
              <span className="font-bold">Category:</span>{" "}
              {lastExpense.category.name}
              <br />
              <span className="font-bold">Amount:</span> ${lastExpense.amount}
              <br />
              <span className="font-bold">Date:</span>{" "}
              {new Date(lastExpense.date).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
