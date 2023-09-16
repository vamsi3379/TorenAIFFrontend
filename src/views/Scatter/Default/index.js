// material-ui
// import { Grid } from '@mui/material';

import * as React from 'react';
// ==============================|| DEFAULT DASHBOARD ||============================== //
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import lottie from 'lottie-web';
import iconImage from './icon.json'; 

const data = [
  { x: 2, y: 5 },
  { x: 6, y: 7 },
  { x: 8, y: 18 },
  { x: 10, y: 15 },
  { x: 17, y: 6 },
  { x: 19, y: 13 },
  // Add more data points as needed
];

const svgRef = useRef(null);

useEffect(() => {
    // Define your margin, width, and height
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Find the maximum x and y values in your data
    const maxX = d3.max(data, (d) => d.x);
    const maxY = d3.max(data, (d) => d.y);

    // Extend the x-axis to max + 2
    const xMax = maxX + 2;
    const yMax = maxY + 5;

    // Create an SVG container for the plot
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales for x and y axes
    const xScale = d3.scaleLinear().domain([0, xMax]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    const iconSize = 10; // Reduce the size of icons

    // Create circles for each data point with Lottie animations
    svg
      .selectAll('g.animation-container')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'animation-container')
      .attr('transform', (d) => `translate(${xScale(d.x) - iconSize / 2},${yScale(d.y) - iconSize / 2}) scale(${iconSize / 100})`)
      .each(function (d) {
        const container = this;
        const animation = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: iconImage,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
          },
        });
        animation.setSpeed(1.0);
      })
      .style('fill', 'blue') // Add a fill color to the circles
      .style('filter', 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))'); // Add a drop shadow

    // Create gridlines for both x and y axes
    const xGridlines = d3.axisBottom(xScale).tickSize(-height).tickFormat('');
    const yGridlines = d3.axisLeft(yScale).tickSize(-width).tickFormat('');

    svg
      .append('g')
      .call(xGridlines)
      .attr('transform', `translate(0,${height})`)
      .selectAll('line')
      .style('opacity', 0.2)
      .style('stroke', 'gray'); // Add color to the gridlines

    svg
      .append('g')
      .call(yGridlines)
      .selectAll('line')
      .style('opacity', 0.2)
      .style('stroke', 'gray'); // Add color to the gridlines

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

  }, [data]);

  


const Dashboard = () => {
  

  return (
    // add here shellhacks
    <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
    <div>
      <svg ref={svgRef}></svg>
    </div>
    </Flex>
  );
};

export default Dashboard;
