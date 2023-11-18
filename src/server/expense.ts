import { db } from "@/server/db";

export const getAllExpenses = async () => {
  try {
    const expenses = await db.expense.findMany({
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

export const getExpense = async (expenseId: string) => {
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