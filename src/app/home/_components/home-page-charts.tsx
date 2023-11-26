"use client";
import React from "react";
import { ServerExpense } from "@/app/expenses/expense";
import {
  expensesAndIncomesByMonth,
  expensesByCategory,
} from "@/app/reports/_utils/report-utils";
import BarChart from "@/app/reports/_components/bar-chart";
import DifferenceBarChart from "@/app/reports/_components/difference-bar-chart";
import PieChart from "@/app/reports/_components/pie-chart";

type ExpenseGraphsProps = {
  expenses: ServerExpense[];
  startDate: string;
  endDate: string;
};

const ExpenseGraphs: React.FC<ExpenseGraphsProps> = ({
  expenses,
  startDate,
  endDate,
}) => {
  const expensesGroupedByCategory = expensesByCategory(
    expenses,
    startDate,
    endDate
  );
  const expensesAndIncomesGroupedByMonth = expensesAndIncomesByMonth(
    expenses,
    startDate,
    endDate
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-center mb-4">
            Expenses for Last 30 Days
          </h2>
          <BarChart data={expensesGroupedByCategory} />
          <PieChart data={expensesGroupedByCategory} />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-center mb-4">
            Balance in Last 30 Days
          </h2>
          <DifferenceBarChart data={expensesAndIncomesGroupedByMonth} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraphs;
