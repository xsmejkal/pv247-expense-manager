"use client";

import React, { useEffect, useState } from "react";
import BarChart from "./bar-chart";
import PieChart from "./pie-chart";
import DifferenceBarChart from "./difference-bar-chart";
import { ServerExpense } from "@/app/expenses/expense";

const expensesByCategory = (
  expenses: ServerExpense[],
  startDate: string,
  endDate: string
) => {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.date >= new Date(startDate) && expense.date <= new Date(endDate)
  );

  return filteredExpenses.reduce(
    (result: { [categoryName: string]: number }, expense) => {
      const categoryName = expense.category.name;
      if (!result[categoryName]) {
        result[categoryName] = 0;
      }
      result[categoryName] += expense.amount;
      return result;
    },
    {}
  );
};

const expensesByMonth = (
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
      const monthKey = `${expenseDate.getFullYear()}-${
        expenseDate.getMonth() + 1
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

type DateSelectorProps = {
  expenses: ServerExpense[];
};

const ReportsDatePickerWithGraphs: React.FC<DateSelectorProps> = ({
  expenses,
}) => {
  const [expensesGroupedByCategory, setExpensesGroupedByCategory] = useState<{
    [categoryName: string]: number;
  }>({});
  const [expensesGroupedByMonth, setExpensesGroupedByMonth] = useState<{
    [month: string]: number;
  }>({});
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    setExpensesGroupedByCategory(
      expensesByCategory(expenses, startDate, endDate)
    );
    setExpensesGroupedByMonth(expensesByMonth(expenses, startDate, endDate));
  }, [startDate, endDate, expenses]);

  return (
    <div>
      <div>
        <label htmlFor="startDatePicker">Start Date:</label>
        <input
          type="date"
          id="startDatePicker"
          name="startDatePicker"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDatePicker">End Date:</label>
        <input
          type="date"
          id="endDatePicker"
          name="endDatePicker"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      {Object.keys(expensesGroupedByCategory).length !== 0 &&
      Object.keys(expensesGroupedByMonth).length !== 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-center mb-4">Expenses</h2>

          <div className="flex justify-around items-center">
            <div>
              <BarChart data={expensesGroupedByCategory} />
            </div>
            <div>
              <PieChart data={expensesGroupedByCategory} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-center mb-4">Balance</h2>
            <DifferenceBarChart data={expensesGroupedByMonth} />
          </div>
        </div>
      ) : (
        <div>No expenses in selected date period</div>
      )}
    </div>
  );
};

export default ReportsDatePickerWithGraphs;
