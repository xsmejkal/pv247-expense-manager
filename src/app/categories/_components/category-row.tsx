'use client';

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Category } from "../category";
import { deleteCategory } from "../hooks";

export const CategoryRow = ({ category }: { category: Category }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const { mutate: removeCategory } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      setDeleting(false);
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      setDeleting(false);
    },
  });

  const handleDelete = (id: number) => {
    setDeleting(true);
    removeCategory(id);
  };

  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Name</span>
          <span className="text-sm font-bold">Description</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm">{category.name}</span>
          <span className="text-sm">{category.description}</span>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => router.push(`/categories/${category.id}`)}
          disabled={deleting}
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(category.id)}
          disabled={deleting}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
