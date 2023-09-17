import React from 'react';
import Chart from "react-apexcharts";
import { Flex, Grid } from "@chakra-ui/react";


export default function Linegraph(data) {
  console.log(data)
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$")
  let timestaps = [];
  let rain = [];
  let people = [];
  let handbags = [];
  let cars = [];
  let buildings = [];
  for(let i=0;i<data.length;i++){
    timestaps.push(data[i].x)
  }

  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  };
  const series = [
    {
      name: "rain",
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    },
    {
      name: "people",
      data: [23, 12, 54, 61, 32, 56, 81, 19]
    },
    {
      name: "handbags",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    },
    {
      name: "cars",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    },
    {
      name: "buildings",
      data: [24, 20, 5, 75, 42, 79, 72, 35]
    }
  ];

  return( 
    <div style={{justifyContent:"center"}}>
      <Chart options={options} series={series} type="area" />;  
    </div>
    
  
  )}



