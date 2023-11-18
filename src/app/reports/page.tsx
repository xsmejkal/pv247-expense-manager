import { getAllCategories } from "@/server/category";
import * as d3 from "d3";
import { Suspense } from "react";
import { db } from "@/server/db";
import { Expense } from "../expenses/expense";
import { mockData } from "./dataMock";
import BarChart from "./BarChart";

// TODO MOVE it to /server/expenses file
const getExpenses = async (): Promise<
  {
    id: number;
    name: string;
    description: string;
    amount: number;
    date: Date;
    userId: string;
    categoryId: number;
  }[]
> => {
  try {
    const expenses = await db.expense.findMany();
    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// TODO use zod object for category
const expensesByCategoryId = (
  expenses: {
    id: number;
    name: string;
    description: string;
    amount: number;
    date: Date;
    userId: string;
    categoryId: number;
  }[]
) => {
  return expenses.reduce(
    (result: { [categoryId: number]: number }, expense) => {
      const id = expense.categoryId;
      if (!result[id]) {
        result[id] = 0;
      } else {
        result[id] += expense.amount;
      }
      return result;
    },
    {}
  );
};

const Reports = async () => {
  const categoriesOfUser = await getAllCategories(); // TODO Same
  const expensesOfUser = await getExpenses(); // TODO change to only expenses of user
  const groupedExpensesById = Object.entries(
    expensesByCategoryId(expensesOfUser)
  );

  const groupedExpenses = [];
  for (const [categoryId, totalAmount] of groupedExpensesById) {
    const category = categoriesOfUser.find(
      (category) => category.id.toString() === categoryId
    );
    groupedExpenses.push({ totalAmount, categoryName: category?.name });
  }

  return (
    <main>
      <h1>Reports</h1>
      <BarChart data={mockData} />
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
