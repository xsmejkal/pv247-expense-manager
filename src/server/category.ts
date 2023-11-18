import { db } from "@/server/db";

export const getAllCategories = async () => {
  try {
    const categories = await db.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategory = async (categoryId: string) => {
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