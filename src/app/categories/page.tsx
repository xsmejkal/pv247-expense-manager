import { getAllCategories } from "@/server/category";
import { Suspense } from "react";
import CategoriesList from "./_components/categories-list";

export const metadata = {
  title: "Categories | Expense manager++",
  description: "List of your categories!",
};

const LoadingCategories = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="loader" />
    <p>Loading categories...</p>
  </div>
);
const AsyncCategoriesPage = async () => {
  const categories = await getAllCategories();
  return <CategoriesList categories={categories} />;
};

const CategoriesPage = () => (
  <Suspense fallback={<LoadingCategories />}>
    <AsyncCategoriesPage />
  </Suspense>
);

export default CategoriesPage;
