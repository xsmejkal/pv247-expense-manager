"use client";

import { Category } from "../category";
import { CategoryRow } from "./category-row";

const CategoriesList = ({ categories }: { categories: Category[] }) => (
  <>
    <h1 className="mb-6 mt-4 text-2xl font-bold flex items-center justify-center">
      Categories
    </h1>
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </div>
  </>
);

export default CategoriesList;
