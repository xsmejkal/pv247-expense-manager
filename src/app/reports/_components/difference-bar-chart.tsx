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

    const sortedDataEntries = Object.entries(data).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

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
      .domain(sortedDataEntries.map((d) => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(0, ...sortedDataEntries.map((d) => d[1])),
        Math.max(0, ...sortedDataEntries.map((d) => d[1])),
      ])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(sortedDataEntries)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]) || 0)
      .attr("y", (d) => yScale(Math.max(0, d[1])))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => Math.abs(yScale(d[1]) - yScale(0)))
      .attr("fill", (d) => (d[1] >= 0 ? "green" : "red"));

    svg
      .selectAll(".label")
      .data(sortedDataEntries)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d[0])! + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d[1]) + (d[1] >= 0 ? -5 : 15))
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d[1].toFixed(2));

    svg
      .append("g")
      .attr("transform", `translate(0, ${yScale(0)})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div ref={chartContainerRef} id="difference-bar-chart-container"></div>
  );
};

export default DifferenceBarChart;
