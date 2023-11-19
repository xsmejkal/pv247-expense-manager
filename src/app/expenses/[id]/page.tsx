import { Suspense } from 'react';
import { getExpense } from '@/server/expense';
import { ExpenseFormProvider } from '../_components/expense-form-provider';
import { ExpenseFields } from '../_components/expense-fields';
import ExpenseCategoryFieldLoader from '../_components/expense-category-field-loader';
import { Metadata } from 'next';

export const generateMetadata = async ({
    params,
  }: {
    params: { id: string };
  }): Promise<Metadata> => {
    const expense = await getExpense(params.id);
    return {
      title: `${expense.name} | Expense manager++`,
      description: expense.description,
    };
  };

const ExpenseDetailsServer = async ({ expenseId }: { expenseId: string }) => {
    const expense = await getExpense(expenseId);
    if (!expense) {
        return <div>Invalid ID. Expense not found.</div>;
    }

    return (
        <ExpenseFormProvider
            defaultValues={expense}
            fields={
                <><ExpenseFields /><ExpenseCategoryFieldLoader /></>
            }
        />
    );
};

const LoadingExpense = () => (
    <div className="flex flex-col gap-2">Loading expense...</div>
);

type ExpenseEditFormProps = {
    params: {
        id: string;
    };
};

const ExpenseEditPage = ({ params }: ExpenseEditFormProps) => (
    <div className="flex flex-col items-center p-4">
        <h1 className="mb-4 text-2xl font-bold">Edit Expense</h1>

        <Suspense fallback={<LoadingExpense />}>
            <ExpenseDetailsServer expenseId={params.id} />
        </Suspense>
    </div>
);

export default ExpenseEditPage;