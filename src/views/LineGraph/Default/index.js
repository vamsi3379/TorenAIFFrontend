import React from 'react';
import Chart from "react-apexcharts";
import { Flex, Grid } from "@chakra-ui/react";


export default function Linegraph(data, setTimeData) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$")
  let rain = [];
  let people = [];
  let handbags = [];
  let cars = [];
  let buildings = []; //{buildings: '8.85', cars: '37.92', handbags: '0.00', people: '7.42', rain: '0.00'}
  for(let i=0;i<data.data.length;i++){
    rain.push(data.data[i].rain)
    people.push(data.data[i].people)
    handbags.push(data.data[i].handbags)
    cars.push(data.data[i].cars)
    buildings.push(data.data[i].buildings)
  }

  const options = {
    xaxis: {
      categories: data.timeData
    }
  };
  const series = [
    {
      name: "rain",
      data: rain
    },
    {
      name: "people",
      data: people
    },
    {
      name: "handbags",
      data: handbags
    },
    {
      name: "cars",
      data: cars
    },
    {
      name: "buildings",
      data: buildings
    }
  ];

  return( 
    <div style={{justifyContent:"center"}}>
      <Chart options={options} series={series} type="area" />;  
    </div>
    
  
  )}



