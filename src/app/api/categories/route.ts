import { db } from "@/server/db";

export const POST = async (request: Request) => {
    const { searchParams } = new URL(request.url);
  
    const newTodo = await db.category.create({
      data: {
        name: searchParams.get('title') ?? 'New catepgory',
        description: searchParams.get('description') ?? 'No description',
      }
    });
  
    return Response.json(newTodo);
  };