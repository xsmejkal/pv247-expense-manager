import { CategoryFields } from "../_components/category-fields";
import { CategoryFormProvider } from "../_components/category-form-provider";

const CreateCategoryPage = () => <CategoryFormProvider fields={<CategoryFields />} />;

export default CreateCategoryPage;
