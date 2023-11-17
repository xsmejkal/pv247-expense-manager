'use client';

import { Category } from "@prisma/client";
import { CategoryRow } from "./category-row";

const CategoriesList = ({ categories }: { categories: Category[] }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="mb-6 text-2xl font-bold">Categories</h1>
    {categories.map((category) => (
      <CategoryRow key={category.id} category={category} />
    ))}
  </div>
);

export default CategoriesList;
