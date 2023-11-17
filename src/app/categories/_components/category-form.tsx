"use client";

import { useFormContext } from "react-hook-form";
import { CategoryFormProvider } from "./category-form-provider";

const CategoryFields = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="font-bold">
        Name
      </label>
      <input {...register("name")} id="name" className="border rounded p-2" />

      <label htmlFor="description" className="font-bold">
        Description
      </label>
      <textarea
        {...register("description")}
        id="description"
        className="border rounded p-2"
      />
    </div>
  );
};

const CreateCategoryForm = () => {
  return (
    <CategoryFormProvider defaultValues={{ name: "", description: "" }}>
      <CategoryFields />
    </CategoryFormProvider>
  );
};

export default CreateCategoryForm;
