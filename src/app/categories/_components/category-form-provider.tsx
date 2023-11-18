import { useForm, FormProvider } from "react-hook-form";
import { ReactNode, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { Category, CategoryFormSchema, categoryFormSchema } from "../category";

type MovieFormProviderProps = {
	fields: ReactNode;
	defaultValues?: Category;
};

export const CategoryFormProvider:
React.FC<MovieFormProviderProps> = ({
	fields,
	defaultValues
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
    // TODO import/create createCategory
    mutationFn: createCategory,
    onSuccess: () => {
        setSubmitting(false);
        router.push('/categories');
    },
    onError: (error) => {
        console.error('Error submitting category form:', error);
        setSubmitting(false);
    }
});

  const onSubmit = (data: CategoryFormSchema) => {
    setSubmitting(true);
    createCategoryMut(data);
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
function zodResolver(categoryFormSchema: any): import("react-hook-form").Resolver<CategoryFormSchema, any> | undefined {
    throw new Error("Function not implemented.");
}

