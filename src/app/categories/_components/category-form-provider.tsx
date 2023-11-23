"use client";

import { useForm, FormProvider } from "react-hook-form";
import { ReactNode, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Category, CategoryFormSchema, categoryFormSchema } from "../category";
import { createCategory, updateCategory } from "../hooks";

type MovieFormProviderProps = {
  fields: ReactNode;
  defaultValues?: Category;
};

export const CategoryFormProvider: React.FC<MovieFormProviderProps> = ({
  fields,
  defaultValues,
}) => {
  const formMethods = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { mutate: createCategoryMut } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setSubmitting(false);
      router.push("/categories");
      router.refresh();
    },
    onError: (error) => {
      console.error("Error submitting category form:", error);
      setSubmitting(false);
    },
  });

  const { mutate: updateCategoryMut } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      setSubmitting(false);
      router.push("/categories");
      router.refresh();
    },
    onError: (error) => {
      console.error("Error submitting category form:", error);
      setSubmitting(false);
    },
  });

  const onSubmit = (data: CategoryFormSchema) => {
    setSubmitting(true);

    if (defaultValues?.id) {
      updateCategoryMut({ ...data, id: defaultValues.id });
    } else {
      createCategoryMut(data);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 p-4"
      >
        {fields}
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
