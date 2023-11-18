import { db } from "@/server/db";

export const DELETE = async (request: Request) => {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id && isNaN(id))
    return Response.json({ error: "Provide valid Id number" }, { status: 400 });

  try {
    const deletedExpense = await db.expense.delete({
      where: { id },
    });

    return Response.json(deletedExpense);
  } catch (e) {
    return Response.json(
      { error: `Expense with Id "${id}" not found` },
      { status: 404 }
    );
  }
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response("No ID provided", { status: 400 });
  }

  try {
    const data = await req.json();
    const updatedExpense = await db.expense.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return new Response(JSON.stringify(updatedExpense), { status: 201 });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", { status: 500 });
  }
};
