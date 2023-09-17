import React from 'react';
import Chart from "react-apexcharts";
import { Flex, Grid } from "@chakra-ui/react";
import Table from './Table'

export default function TableData() {
  const totalData = [
    {
      "buildings": "10",
      "cars": "50",
      "handbags": "0",
      "people": "31",
      "timestamps": "Mon, 11 Sep 2023 18:51:38 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 18:52:39 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "13",
      "timestamps": "Mon, 11 Sep 2023 18:52:40 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "1",
      "timestamps": "Mon, 11 Sep 2023 18:56:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "100",
      "timestamps": "Mon, 11 Sep 2023 18:12:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "40",
      "timestamps": "Mon, 11 Sep 2023 18:54232:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "20",
      "timestamps": "Mon, 1132 Sep 2023 18:08:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "100",
      "timestamps": "Mon, 11 Sep 2023 18:234:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 34:55:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 18:43:40 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "50",
      "handbags": "0",
      "people": "31",
      "timestamps": "Mon, 11 Sep 2023 18:4432:38 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 18:1`:39 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "13",
      "timestamps": "Mon, 11 Sep 2023 18:213:40 GMT",
      "umbrellas": "0"
    },
    {
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "1",
      "timestamps": "Mon, 11 Sep 2023 1`2:56:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "100",
      "timestamps": "Mon, 11 Sep 2023 18:123:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "40",
      "timestamps": "Mon, 11 Sep 2023 18:1232:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "20",
      "timestamps": "Mon, 11 Sep 2023 18:21:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "100",
      "timestamps": "Mon, 11 Sep 2023 18:32:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 10:55:40 GMT",
      "umbrellas": "0"
    },{
      "buildings": "10",
      "cars": "51",
      "handbags": "0",
      "people": "10",
      "timestamps": "Mon, 11 Sep 2023 11:51:40 GMT",
      "umbrellas": "0"
    }
  ];

  return( 
    <div style={{justifyContent:"center"}}>
      <Table data={totalData}/>
    </div>
    
  
  )}



