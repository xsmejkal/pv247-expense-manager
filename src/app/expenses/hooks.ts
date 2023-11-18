'use client';

import { Expense, ExpenseFormSchema } from "./expense";

type NewExpenseData = Omit<ExpenseFormSchema, 'id'>;
type UpdateExpenseData = Omit<Expense, 'category'>;

export const deleteExpense = async (id: number): Promise<void> => {
    const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error deleting expense');
    }
};

export const createExpense = async (data: NewExpenseData): Promise<Expense> => {
	const response = await fetch('/api/expenses', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

export const updateExpense = async (data: UpdateExpenseData): Promise<Expense> => {
	const response = await fetch(`/api/expenses/${data.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

