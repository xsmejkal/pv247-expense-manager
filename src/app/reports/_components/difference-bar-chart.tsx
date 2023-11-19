"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type DifferenceBarChartProps = {
  data: { [month: string]: number };
};

const DifferenceBarChart: React.FC<DifferenceBarChartProps> = ({ data }) => {
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

    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(0, ...Object.values(data)),
        Math.max(0, ...Object.values(data)),
      ])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(Object.entries(data))
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]) || 0)
      .attr("y", (d) => (d[1] >= 0 ? yScale(d[1]) : yScale(0)))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(0) - yScale(d[1])))
      .attr("fill", (d) => (d[1] >= 0 ? "green" : "red"));

    svg
      .append("g")
      .attr("transform", `translate(0, ${yScale(0)})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div ref={chartContainerRef} id="difference-bar-chart-container"></div>
  );
};

export default DifferenceBarChart;
