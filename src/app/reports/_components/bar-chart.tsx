"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type BarChartProps = {
  data: { [categoryName: string]: number };
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return;
    }

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select(chartContainerRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const categories = Object.keys(data);
    const amounts = Object.values(data);

    const xScale = d3
      .scaleBand()
      .domain(categories)
      .range([margin.left, width - margin.right])
      .padding(0.1);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(amounts) || 0])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (category) => xScale(category) || 0)
      .attr("y", (category) => yScale(data[category]))
      .attr("width", xScale.bandwidth())
      .attr(
        "height",
        (category) => height - margin.bottom - yScale(data[category])
      )
      .attr("fill", "steelblue");

    svg
      .selectAll(".label")
      .data(categories)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (category) => xScale(category)! + xScale.bandwidth() / 2)
      .attr("y", (category) => yScale(data[category]) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((category) => data[category]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 29)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Category");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -30)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Amount");
  }, [data]);

  return (
    <div className=" pb-10" ref={chartContainerRef} id="chart-container"></div>
  );
};

export default BarChart;
