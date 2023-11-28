import React from "react";
import { Expense } from "@/app/expenses/expense";

type LastExpenseProps = {
  lastExpense: Expense;
};

const LastExpense: React.FC<LastExpenseProps> = ({ lastExpense }) => {
  return (
    <div className="border-2 border-complementary shadow-md p-4 rounded-md ">
      <h2 className="text-xl font-semibold mb-2">Last Expense</h2>
      <p className="text-gray-600">
        <span className="font-bold">Name:</span> {lastExpense.name}
        <br />
        <span className="font-bold">Category:</span> {lastExpense.category.name}
        <br />
        <span className="font-bold">Amount:</span> ${lastExpense.amount}
        <br />
        <span className="font-bold">Date:</span>{" "}
        {new Date(lastExpense.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default LastExpense;
