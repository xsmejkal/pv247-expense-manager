"use client";

import { useFormContext } from "react-hook-form";

export const ExpenseFields = () => {
  const { register } = useFormContext();

  return (
    <>
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

      <label htmlFor="amount" className="font-bold">
        Amount
      </label>
      <input
        {...register("amount", {
          setValueAs: (value) => (value === "" ? null : parseFloat(value)),
        })}
        type="number"
        step="0.01"
        id="amount"
        className="border rounded p-2"
      />

      <label htmlFor="date" className="font-bold">
        Date
      </label>
      <input
        {...register("date", {
          setValueAs: (value) => (value === "" ? null : new Date(value)),
        })}
        type="date"
        id="date"
        className="border rounded p-2"
      />
    </>
  );
};
