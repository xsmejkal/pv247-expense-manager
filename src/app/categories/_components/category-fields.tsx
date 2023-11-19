"use client";
import { useFormContext } from "react-hook-form";

export const CategoryFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const renderErrorMessage = (error: (typeof errors)["name"]) => {
    if (error && typeof error.message === "string") {
      return <p className="text-red-500">{error.message}</p>;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="font-bold">
        Name
      </label>
      <input {...register("name")} id="name" className="border rounded p-2" />
      {renderErrorMessage(errors.name)}

      <label htmlFor="description" className="font-bold">
        Description
      </label>
      <textarea
        {...register("description")}
        id="description"
        className="border rounded p-2"
      />
      {renderErrorMessage(errors.description)}
    </div>
  );
};
