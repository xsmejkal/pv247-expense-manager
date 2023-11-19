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

const expensesAndIncomesByMonth = (
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

type DateSelectorProps = {
  expenses: ServerExpense[];
};

const ReportsDatePickerWithGraphs: React.FC<DateSelectorProps> = ({
  expenses,
}) => {
  const [expensesGroupedByCategory, setExpensesGroupedByCategory] = useState<{
    [categoryName: string]: number;
  }>({});
  const [
    expensesAndIncomesGroupedByMonth,
    setExpensesAndIncomesGroupedByMonth,
  ] = useState<{
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
    setExpensesAndIncomesGroupedByMonth(
      expensesAndIncomesByMonth(expenses, startDate, endDate)
    );
  }, [startDate, endDate, expenses]);

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <label htmlFor="startDatePicker" className="w-32 mr-2">
            Start Date:
          </label>
          <input
            type="date"
            id="startDatePicker"
            name="startDatePicker"
            value={startDate}
            onChange={handleStartDateChange}
            className="border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="endDatePicker" className="w-32 mr-2">
            End Date:
          </label>
          <input
            type="date"
            id="endDatePicker"
            name="endDatePicker"
            value={endDate}
            onChange={handleEndDateChange}
            className="border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
      {Object.keys(expensesGroupedByCategory).length !== 0 &&
      Object.keys(expensesAndIncomesGroupedByMonth).length !== 0 ? (
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
            <div className="flex justify-center">
              <DifferenceBarChart data={expensesAndIncomesGroupedByMonth} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-2xl text-gray-600 mb-3">
            <span role="img" aria-label="alert">
              ⚠️
            </span>{" "}
            Attention
          </div>
          <p className="text-lg text-center font-semibold text-gray-600">
            No expenses in selected date period
          </p>
          <div className="text-gray-400 mt-2">
            <span role="img" aria-label="calendar">
              📅
            </span>
            Please select a different date range or add new expenses.
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDatePickerWithGraphs;
