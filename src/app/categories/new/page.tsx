import { CategoryFields } from "../_components/category-fields";
import { CategoryFormProvider } from "../_components/category-form-provider";

export const metadata = {
    title: "Create category | Expense manager++",
    description: "Create a new category!",
  };

const CreateCategoryPage = () => <CategoryFormProvider fields={<CategoryFields />} />;

export default CreateCategoryPage;
