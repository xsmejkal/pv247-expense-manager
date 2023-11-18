"use client";

import * as d3 from "d3";
import { mockDataType } from "./dataMock";
import { useEffect, useRef } from "react";

const BarChart = ({ data }: { data: mockDataType }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && data.categories.length > 0) {
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Remove existing chart before creating a new one
      d3.select("#chart-container").selectAll("*").remove();

      const svg = d3
        .select("#chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const expensesByCategory = data.expenses.reduce((result, expense) => {
        const categoryId = expense.categoryId;
        if (!result[categoryId]) {
          result[categoryId] = 0;
        }
        result[categoryId] += expense.amount;
        return result;
      }, {});

      const expensesData = Object.entries(expensesByCategory).map(
        ([categoryId, totalAmount]) => ({
          categoryId: Number(categoryId),
          totalAmount,
        })
      );

      const xScale = d3
        .scaleBand()
        .domain(expensesData.map((d) => String(d.categoryId))) // Use category ID as the domain
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(expensesData, (d) => d.totalAmount)])
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll("rect")
        .data(expensesData)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(String(d.categoryId)))
        .attr("y", (d) => yScale(d.totalAmount))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(d.totalAmount))
        .attr("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));
    }
  }, [data]);

  return <div ref={chartContainerRef} id="chart-container"></div>;
};

export default BarChart;
