"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ReactNode, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Expense, ExpenseFormSchema, expenseFormSchema } from "../expense";
import { createExpense, updateExpense } from "../hooks";

type MovieFormProviderProps = {
  fields: ReactNode;
  defaultValues?: Expense;
};

export const ExpenseFormProvider: React.FC<MovieFormProviderProps> = ({
  fields,
  defaultValues,
}) => {
  // TODO: fix loading default date value in edit form
  const formMethods = useForm<ExpenseFormSchema>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      amount: 0,
      date: new Date,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { mutate: createExpenseMut } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      setSubmitting(false);
      router.push("/expenses");
    },
    onError: (error) => {
      console.error("Error submitting expense form:", error);
      setSubmitting(false);
    },
  });

  const { mutate: updateExpenseMut } = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      setSubmitting(false);
      router.push("/expenses");
    },
    onError: (error) => {
      console.error("Error submitting expense form:", error);
      setSubmitting(false);
    },
  });

  const onSubmit = (data: ExpenseFormSchema) => {
    console.log("------------- onSubmit ----------------", data);
    setSubmitting(true);

    if (defaultValues?.id) {
      updateExpenseMut({ ...data, id: defaultValues.id });
    } else {
      createExpenseMut(data);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 p-4"
      >
        <div className="flex flex-col gap-2">{fields}</div>
        <button
          type="submit"
          disabled={submitting}
          className="w-96 rounded-lg bg-blue-600 px-4 py-2 text-white shadow disabled:bg-blue-300"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </FormProvider>
  );
};
