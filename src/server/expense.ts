import { db } from "@/server/db";
import { getServerAuthSession } from "./auth";

export type serverExpense = {
  category: {
    id: number;
    name: string;
    description: string;
    userId: string;
  };
} & {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: Date;
  userId: string;
  categoryId: number;
};

export const getAllExpenses = async (): Promise<serverExpense[]> => {
  const status = await getServerAuthSession();
  const userId = status?.user.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const expenses = await db.expense.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
      },
    });
    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const getExpense = async (expenseId: string): Promise<serverExpense> => {
  try {
    const expense = await db.expense.findUnique({
      where: {
        id: parseInt(expenseId),
      },
      include: {
        category: true,
      },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    return expense;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error;
  }
};
