"use client";

import { Category } from "@/app/categories/category";
import { useFormContext } from "react-hook-form";

export const ExpenseCategoryField = ({
  categories,
}: {
  categories: Category[];
}) => {
  const { register } = useFormContext();

  return (
    <>
      <label htmlFor="category" className="font-bold">
        Category
      </label>
      <select
        {...register("categoryId", {
          setValueAs: (value) => parseInt(value, 10),
        })}
        id="category"
        className="border rounded p-2"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
