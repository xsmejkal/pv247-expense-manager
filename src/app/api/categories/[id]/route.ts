import { db } from "@/server/db";

export const DELETE = async (request: Request) => {
    const url = new URL(request.url);
	const id = Number(url.pathname.split('/').pop());
  
    if (!id && isNaN(id))
      return Response.json({ error: 'Provide valid Id number' }, { status: 400 });
  
    try {
      const deletedCategory = await db.category.delete({
        where: { id }
      });
  
      return Response.json(deletedCategory);
    } catch (e) {
      return Response.json(
        { error: `Category with Id "${id}" not found` },
        { status: 404 }
      );
    }
  };