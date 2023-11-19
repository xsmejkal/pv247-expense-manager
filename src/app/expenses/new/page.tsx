import ExpenseCategoryFieldLoader from "../_components/expense-category-field-loader";
import { ExpenseFields } from "../_components/expense-fields";
import { ExpenseFormProvider } from "../_components/expense-form-provider";

export const metadata = {
    title: "Create expense | Expense manager++",
    description: "Create a new expense!",
  };

const CreateExpensePage = () => <ExpenseFormProvider fields={
    <><ExpenseFields /><ExpenseCategoryFieldLoader /></>
} />;

export default CreateExpensePage;
