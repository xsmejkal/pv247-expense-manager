"use client";

import React, { useEffect, useState } from "react";
import BarChart from "./bar-chart";
import PieChart from "./pie-chart";
import DifferenceBarChart from "./difference-bar-chart";
import { ServerExpense } from "@/app/expenses/expense";
import {
  expensesAndIncomesByMonth,
  expensesByCategory,
  exportChartsAsPDF,
} from "../_utils/report-utils";

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
    localStorage.setItem("startDate", e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    localStorage.setItem("endDate", e.target.value);
  };

  useEffect(() => {
    setExpensesGroupedByCategory(
      expensesByCategory(expenses, startDate, endDate)
    );
    setExpensesAndIncomesGroupedByMonth(
      expensesAndIncomesByMonth(expenses, startDate, endDate)
    );
    setEndDate(localStorage.getItem("endDate") ?? "");
    setStartDate(localStorage.getItem("startDate") ?? "");
  }, [startDate, endDate, expenses]);

  const bothDatesSelected = startDate !== "" && endDate !== "";

  return (
    <div>
      <div className="flex mb-4 justify-center items-center">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <label htmlFor="startDatePicker" className="w-32 ">
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
            <label htmlFor="endDatePicker" className="w-32 ">
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

        <button
          onClick={() => exportChartsAsPDF(startDate, endDate)}
          disabled={!bothDatesSelected}
          className={`${
            bothDatesSelected ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300"
          } text-white font-bold py-2 ml-10 px-4 rounded shadow-lg transition ease-in-out duration-300`}
        >
          Export as PDF
        </button>
      </div>
      {Object.keys(expensesGroupedByCategory).length !== 0 &&
      Object.keys(expensesAndIncomesGroupedByMonth).length !== 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Expenses for selected time period
          </h2>

          <div className="flex justify-around items-center flex-col md:flex-row">
            <div className="chart-container">
              <BarChart data={expensesGroupedByCategory} />
            </div>
            <div
              className="chart-container pt-16"
              style={{ width: "500", height: "500px" }}
            >
              <PieChart data={expensesGroupedByCategory} />
            </div>
          </div>
          <div className="mt-8 flex flex-col overflow-clip">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Balance for selected time period
            </h2>
            <div
              className="flex justify-center chart-container"
              style={{ width: "500", height: "500px" }}
            >
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
