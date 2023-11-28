import { ServerExpense } from "@/app/expenses/expense";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const expensesByCategory = (
  expenses: ServerExpense[],
  startDate: string,
  endDate: string
) => {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.date >= new Date(startDate) &&
      expense.date <= new Date(endDate) &&
      expense.amount < 0
  );

  return filteredExpenses.reduce(
    (result: { [categoryName: string]: number }, expense) => {
      const categoryName = expense.category.name;
      if (!result[categoryName]) {
        result[categoryName] = 0;
      }
      result[categoryName] += Math.abs(expense.amount);
      return result;
    },
    {}
  );
};

export const expensesAndIncomesByMonth = (
  expenses: ServerExpense[],
  startDate: string,
  endDate: string
) => {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.date >= new Date(startDate) && expense.date <= new Date(endDate)
  );

  return filteredExpenses.reduce(
    (result: { [month: string]: number }, expense) => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth() + 1;
      const monthKey = `${expenseDate.getFullYear()}-${
        month < 10 ? `0${month}` : month
      }`;

      if (!result[monthKey]) {
        result[monthKey] = 0;
      }

      result[monthKey] += expense.amount;
      return result;
    },
    {}
  );
};

export const exportChartsAsPDF = async (startDate: string, endDate: string) => {
  const pdf = new jsPDF();
  const chartElements = document.querySelectorAll(".chart-container");
  const descriptions = [
    "Bar chart - Expenses for selected time period: " +
      `${startDate} - ${endDate}`,
    "Pie chart - Expenses for selected time period: " +
      `${startDate} - ${endDate}`,
    "Balance for selected time period: " + `${startDate} - ${endDate}`,
  ];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  for (let i = 0; i < 3; i++) {
    const chartElement = chartElements[i] as HTMLElement;
    try {
      const canvas = await html2canvas(chartElement);
      const dataURL = canvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      pdf.text(descriptions[i], 10, 10);
      pdf.addImage(dataURL, "PNG", 10, 20, 180, 160);
    } catch (error) {
      console.error("Error exporting chart to PDF: ", error);
    }
  }

  pdf.save("charts.pdf");
};
