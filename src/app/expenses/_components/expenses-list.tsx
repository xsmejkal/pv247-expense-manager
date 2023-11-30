"use client";

import { Expense } from "../expense";
import { ExpenseRow } from "./expense-row";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => (
  <>
    <h1 className="mb-6 mt-4 text-2xl font-bold flex items-center justify-center">
      Expenses
    </h1>
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {expenses.map((expense) => (
        <ExpenseRow key={expense.id} expense={expense} />
      ))}
    </div>
  </>
);

export default ExpensesList;
