import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Category } from "../category";
import { deleteCategory } from "../hooks";
import { Modal } from "./modal";

export const CategoryRow = ({ category }: { category: Category }) => {
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the category"
      );
      setIsModalOpen(true);
    },
  });

  const handleDelete = (id: number) => {
    setDeleting(true);
    setErrorMessage("");
    setIsModalOpen(false);
    removeCategory(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p className="text-red-600">{errorMessage}</p>
      </Modal>
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-sm font-bold flex items-center justify-center">
          {category.name}
        </span>
        <span className="text-sm flex items-center justify-center">
          {category.description}
        </span>
      </div>
      <div className="flex gap-2 items-center justify-center">
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
