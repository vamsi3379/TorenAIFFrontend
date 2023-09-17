import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';


const data = [];

// Generate 10 random data points
for (let i = 0; i < 10; i++) {
  const randomX = Math.floor(Math.random() * 100); // Random x value between 0 and 99
  const randomY = Math.floor(Math.random() * 100); // Random y value between 0 and 99
  
  // Push the random data point into the data array
  data.push({ x: randomX, y: randomY });
}

const xKey="x"
const yKey="y"


const BarPlot = () => {

  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const [availableWidth, setAvailableWidth] = useState(window.innerWidth - 260);
  useEffect(() => {
    const handleResize = () => {
      setAvailableWidth(window.innerWidth - 260); // Recalculate available width
    };
    if (availableWidth < 850){
      setAvailableWidth(availableWidth+260)
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const colorScale = d3.scaleSequential(d3.interpolateRainbow)
    .domain([0, data.length]);

  useEffect(() => {

    
    const margin = { top: 40, right: 30, bottom: 60, left: 30 };
    const width = availableWidth-margin.left-margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svgWrapper = d3.select(svgRef.current);
    svgWrapper.selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(data.map((d) => d[xKey].toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d[yKey])])
      .range([height, 0]);

    const bars = svg
      .selectAll('rect')
      .data(data, (d) => d[xKey].toString());

    bars.exit()
      .transition()
      .duration(1000)
      .attr('y', height)
      .attr('height', 0)
      .remove();

    bars.transition()
      .duration(500)
      .attr('x', (d) => xScale(d[xKey].toString()))
      .attr('y', (d) => yScale(d[yKey]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d[yKey]));

    bars.enter()
      .append('rect')
      .attr('x', (d) => xScale(d[xKey].toString()))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (_, i) => colorScale(i))
      .on('mouseover', (event, d) => {
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.innerHTML = `${xKey}: ${d[xKey]}, ${yKey}: ${d[yKey]}`;
          tooltip.style.visibility = 'visible';
          tooltip.style.left = `${event.pageX + 10}px`;
          tooltip.style.top = `${event.pageY - 10}px`;
        }
      })
      .on('mousemove', (event) => {
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.left = `${event.pageX + 10}px`;
          tooltip.style.top = `${event.pageY - 10}px`;
        }
      })
      .on('mouseout', (event, d) => {
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.visibility = 'hidden';
        }
      })
      .transition()
      .duration(500)
      .attr('y', (d) => yScale(d[yKey]))
      .attr('height', (d) => height - yScale(d[yKey]));

    const xAxis = d3.axisBottom(xScale);
    svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g').call(yAxis);

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom / 2)
      .style('text-anchor', 'middle')
      .text("x-axis: " + xKey);

    svg
      .append('text')
      .attr('transform', `rotate(-90)`)
      .attr('x', -height / 2)
      .attr('y', -margin.left / 2)
      .style('text-anchor', 'middle')
      .text("y-axis: " + yKey);

  }, [data, xKey, yKey, colorScale]);

  return (
    <>
    <div style={{justifyContent:"center"}}>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          padding: '8px',
          borderRadius: '20px',
        }}
      ></div>
    </div>
    </>
  );
};

export default BarPlot;
