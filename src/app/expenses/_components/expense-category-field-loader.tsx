import { getAllCategories } from "@/server/category";
import { ExpenseCategoryField } from "./expense-category-field";
import { Suspense } from "react";

const LoadingCategories = () => (
  <>
    <label htmlFor="category" className="font-bold">
      Category
    </label>
    <select id="category" className="border rounded p-2">
      <option>Loading...</option>
    </select>
  </>
);

const FetchAndRenderExpenseCategoryField  = async () => {
  const categories = await getAllCategories();
  return <ExpenseCategoryField categories={categories} />;
};

const ExpenseCategoryFieldLoader = () => (
  <Suspense fallback={<LoadingCategories />}>
    <FetchAndRenderExpenseCategoryField  />
  </Suspense>
);

export default ExpenseCategoryFieldLoader;
