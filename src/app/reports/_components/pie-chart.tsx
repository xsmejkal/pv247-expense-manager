"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type PieChartProps = {
  data: { [categoryName: string]: number };
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return;
    }

    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    d3.select(chartContainerRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pieData = Object.entries(data).map(([key, value]) => ({
      category: key,
      value,
    }));

    const pie = d3
      .pie<any>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg
      .selectAll("g.slice")
      .data(pie(pieData))
      .enter()
      .append("g")
      .attr("class", "slice");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => d3.schemeCategory10[i % 10]);

    const total = d3.sum(pieData, (d) => d.value);

    arcs
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .each(function (d) {
        const percent = ((d.data.value / total) * 100).toFixed(1);
        const node = d3.select(this);
        node
          .append("tspan")
          .attr("x", 0)
          .attr("y", "-0.6em")
          .style("font-weight", "bold")
          .text(d.data.category);
        node.append("tspan").attr("x", 0).attr("y", "1em").text(`${percent}%`);
      });
  }, [data]);

  return <div ref={chartContainerRef} id="pie-chart-container"></div>;
};

export default PieChart;
