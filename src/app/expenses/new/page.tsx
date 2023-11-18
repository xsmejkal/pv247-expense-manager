import ExpenseCategoryFieldLoader from "../_components/expense-category-field-loader";
import { ExpenseFields } from "../_components/expense-fields";
import { ExpenseFormProvider } from "../_components/expense-form-provider";

const CreateExpensePage = () => <ExpenseFormProvider fields={
    <><ExpenseFields /><ExpenseCategoryFieldLoader /></>
} />;

export default CreateExpensePage;
