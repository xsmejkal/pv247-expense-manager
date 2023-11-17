import { categoryFormSchema } from "@/app/categories/category";
import { db } from "@/server/db";
import { z } from "zod";
import { getServerAuthSession } from "@/server/auth";

export const POST = async (request: Request) => {
  try {
    const bodyJson = await request.json();
    const parsedCategory = categoryFormSchema.parse(bodyJson);
    const status = await getServerAuthSession();
    const userId = status?.user.id;
    console.log('userIdxxxxxxxxxxxxxxxxxxxxxxxxxx', status)

    if (!userId) {
      return new Response("Server error - could not find userId", {
        status: 500,
      });
    }

    const newCategory = await db.category.create({
      data: {
        name: parsedCategory.name,
        description: parsedCategory.description,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(newCategory), {
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
