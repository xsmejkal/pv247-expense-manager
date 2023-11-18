"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { chartsData } from "./page";

type BarChartProps = {
  data: chartsData;
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if there's no data to display
    if (Object.keys(data).length === 0) {
      return;
    }

    // Define chart dimensions
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Remove existing chart before creating a new one
    d3.select(chartContainerRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Extract category names and amounts from the data
    const categories = Object.keys(data);
    const amounts = Object.values(data);

    // Create scales for x and y axes
    const xScale = d3
      .scaleBand()
      .domain(categories)
      .range([margin.left, width - margin.right])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(amounts) || 10])
      .range([height - margin.bottom, margin.top]);

    // Draw bars
    svg
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (category) => xScale(category) || 0)
      .attr("y", (category) => yScale(data[category]) || 0)
      .attr("width", xScale.bandwidth())
      .attr(
        "height",
        (category) => height - margin.bottom - yScale(data[category]) || 0
      )
      .attr("fill", "steelblue");

    // Draw x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 29)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .text("Category");

    // Draw y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -30)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .text("Amount");
  }, [data]);

  return <div ref={chartContainerRef} id="chart-container"></div>;
};

export default BarChart;
