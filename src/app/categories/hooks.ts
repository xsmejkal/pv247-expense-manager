'use client';

import { Category, CategoryFormSchema } from "./category";

type NewCategoryData = Omit<CategoryFormSchema, 'id'>;

export const deleteCategory = async (id: number): Promise<void> => {
    const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        let errorMsg = 'Error deleting category';
        try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
                errorMsg = errorData.error;
            }
        } catch (error) {
            console.error("Error parsing the server's response:", error);
        }
        throw new Error(errorMsg);
    }
};

export const createCategory = async (data: NewCategoryData): Promise<Category> => {
	const response = await fetch('/api/categories', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

export const updateCategory = async (data: Category): Promise<Category> => {
	const response = await fetch(`/api/categories/${data.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

