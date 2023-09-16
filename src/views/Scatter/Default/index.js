import React from 'react';
import Chart from "react-apexcharts";

export default function ScatterPlot() {
  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };
  const series = [
    {
      name: "Rainy",
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    },
    {
      name: "Cloudy",
      data: [23, 12, 54, 61, 32, 56, 81, 19]
    },
    {
      name: "Sunny",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    }
  ];

  return <Chart options={options} series={series} type="scatter" />;
  }



