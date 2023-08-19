import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    // Animation
    const path = svg.select('.line');
    const pathLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', pathLength + ' ' + pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0);

    // Axes
    const xAxis = d3.axisBottom(x).tickSize(8).tickPadding(8);
    const yAxis = d3.axisLeft(y).tickSize(8).tickPadding(8);

    svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`).call(xAxis).selectAll('text').style('font-size', '14px');
    svg.append('g').attr('class', 'y-axis').call(yAxis).selectAll('text').style('font-size', '14px');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineGraph;
