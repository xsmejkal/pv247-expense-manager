"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Expense } from "../expense";
import { deleteExpense } from "../hooks";

export const ExpenseRow = ({ expense }: { expense: Expense }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const { mutate: removeExpense } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      setDeleting(false);
      router.push("/expenses");
    },
    onError: (error) => {
      console.error("Error deleting expense:", error);
      setDeleting(false);
    },
  });

  const handleDelete = (id: number) => {
    setDeleting(true);
    removeExpense(id);
    router.refresh();
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-lg font-bold">{expense.name}</span>
        <span className="text-sm text-gray-700">{expense.description}</span>
        <span className="text-sm text-gray-700">
          Amount: ${expense.amount.toFixed(2)}
        </span>
        <span className="text-sm text-gray-700">
          Date: {new Date(expense.date).toLocaleDateString("en-US")}
        </span>
        <span className="text-sm text-gray-700">
          Category: {expense.category.name}
        </span>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => router.push(`/expenses/${expense.id}`)}
          disabled={deleting}
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(expense.id)}
          disabled={deleting}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
