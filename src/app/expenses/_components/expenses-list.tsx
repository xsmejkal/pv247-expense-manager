'use client';

import { Expense } from "../expense";
import { ExpenseRow } from "./expense-row";

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="mb-6 text-2xl font-bold">Expenses</h1>
    {expenses.map((expense) => (
      <ExpenseRow key={expense.id} expense={expense} />
    ))}
  </div>
);

export default ExpensesList;
