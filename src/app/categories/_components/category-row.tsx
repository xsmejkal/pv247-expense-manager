"use client";

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
      router.push("/categories");
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
    <div className="mb-8 flex items-center gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">{category.name}</span>
        <span className="text-sm">{category.description}</span>
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ml-4"
        onClick={() => router.push(`/categories/${category.id}`)}
        disabled={deleting}
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(category.id)}
        disabled={deleting}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 ml-2"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};
