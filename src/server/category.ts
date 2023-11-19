import { db } from "@/server/db";
import { getServerAuthSession } from "./auth";
import { ServerCategory } from "@/app/categories/category";

export const getAllCategories = async (): Promise<ServerCategory[]> => {
  const status = await getServerAuthSession();
  const userId = status?.user.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const categories = await db.category.findMany({
      where: {
        userId: userId,
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategory = async (
  categoryId: string
): Promise<ServerCategory> => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
