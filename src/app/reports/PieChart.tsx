"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type PieChartProps = {
  data: { [categoryName: string]: number };
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if there's no data to display
    if (Object.keys(data).length === 0) {
      return;
    }

    // Define chart dimensions
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Remove existing chart before creating a new one
    d3.select(chartContainerRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Prepare data in the format expected by d3.pie().value()
    const pieData = Object.entries(data).map(([category, value]) => ({
      category,
      value,
    }));

    // Create a pie chart layout with explicit typing
    const pie = d3
      .pie<{ category: string; value: number }>()
      .value((d) => d.value);

    // Create arcs for the pie chart
    const arc = d3
      .arc<d3.PieArcDatum<{ category: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);
      
    // Draw slices of the pie chart
    const arcs = svg
      .selectAll("path")
      .data(pie(pieData))
      .enter()
      .append("path")
      .attr("d", (d) => arc(d) as string)
      .attr("fill", (_, i) => d3.schemeCategory10[i]);
  }, [data]);

  return <div ref={chartContainerRef} id="pie-chart-container"></div>;
};

export default PieChart;
