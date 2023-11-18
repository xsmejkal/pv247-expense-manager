import { db } from "@/server/db";
import { z } from "zod";
import { getServerAuthSession } from "@/server/auth";
import { expenseFormSchema } from "@/app/expenses/expense";

export const POST = async (request: Request) => {
  try {
    const bodyJson = await request.json();
    console.log('bodyJson', bodyJson);
    const parsedExpense = expenseFormSchema.parse(bodyJson);
    const status = await getServerAuthSession();
    const userId = status?.user.id;

    if (!userId) {
      return new Response("Server error - could not find userId", {
        status: 500,
      });
    }

    const newExpense = await db.expense.create({
      data: {
        name: parsedExpense.name,
        description: parsedExpense.description,
        amount: parsedExpense.amount,
        categoryId: parsedExpense.categoryId,
        date: parsedExpense.date,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(newExpense), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("Server error", { status: 500 });
  }
};
