import { Suspense } from 'react';
import { CategoryFormProvider } from '../_components/category-form-provider';
import { CategoryFields } from '../_components/category-fields';
import { getCategory } from '@/server/category';
import { Metadata } from 'next';

export const generateMetadata = async ({
    params,
}: {
    params: { id: string };
  }): Promise<Metadata> => {
    const category = await getCategory(params.id);
    return {
      title: `${category.name} | Expense manager++`,
      description: category.description,
    };
};

const CategoryDetailsServer = async ({ categoryId }: { categoryId: string }) => {
    const category = await getCategory(categoryId);
    if (!category) {
        return <div>Invalid ID. Category not found.</div>;
    }

    return (
        <CategoryFormProvider
            defaultValues={category}
            fields={<CategoryFields />}
        />
    );
};

const LoadingCategory = () => (
    <div className="flex flex-col gap-2">Loading category...</div>
);

type CategoryEditFormProps = {
    params: {
        id: string;
    };
};

const CategoryEditPage = ({ params }: CategoryEditFormProps) => (
    <div className="flex flex-col items-center p-4">
        <h1 className="mb-4 text-2xl font-bold">Edit Category</h1>

        <Suspense fallback={<LoadingCategory />}>
            <CategoryDetailsServer categoryId={params.id} />
        </Suspense>
    </div>
);

export default CategoryEditPage;