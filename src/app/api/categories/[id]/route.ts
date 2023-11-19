import { db } from "@/server/db";

export const DELETE = async (request: Request) => {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id && isNaN(id))
    return Response.json({ error: "Provide valid Id number" }, { status: 400 });

  try {
    const relatedExpenses = await db.expense.findMany({
      where: { categoryId: id },
      select: { id: true },
    });

    if (relatedExpenses.length > 0) {
      return new Response(JSON.stringify({ error: "Cannot delete category as it has associated expenses" }), { status: 400 });
    }

    const deletedCategory = await db.category.delete({
      where: { id },
    });

    return Response.json(deletedCategory);
  } catch (e) {
    return Response.json(
      { error: `Category with Id "${id}" not found` },
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
    const updatedCategory = await db.category.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return new Response(JSON.stringify(updatedCategory), { status: 201 });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", { status: 500 });
  }
};
