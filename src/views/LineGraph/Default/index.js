// material-ui
// import { Grid } from '@mui/material';

import React from 'react';
// import "./styles.css";

import Chart from "react-apexcharts";
// import { LineChart } from "./LineChart";
import { render } from "react-dom";
// ==============================|| DEFAULT DASHBOARD ||============================== //

// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "First dataset",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]
// };

export default function Linegraph() {
  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    },
    {
      name: "series-2",
      data: [23, 12, 54, 61, 32, 56, 81, 19]
    },
    {
      name: "series-3",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    }
  ];

  return <Chart options={options} series={series} type="area" />;
  }



