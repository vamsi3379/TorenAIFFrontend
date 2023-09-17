import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { ChakraProvider, HStack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  useDisclosure,
  Stack,
  Flex
} from "@chakra-ui/react";
import {
  DownloadIcon,
  RepeatClockIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
// material-ui
// import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';

import Linegraph from "../../LineGraph/Default"
import Pagination from '@mui/material/Pagination';



export default function ScatterPlot() {
  const [fromTime, setFromTime] = React.useState(dayjs());
  const [toTime, setToTime] = React.useState(dayjs());
  const [minDateTime, setMinDateTime] = React.useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [maxDateTime, setMaxDateTime] = React.useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [data, setData] = React.useState([])
  const [showData, setShowData] = React.useState(true)
  const [preData, setPreData] = React.useState([])
  const [timeData, setTimeData] = React.useState([])
  const [imgData, setImgData] = React.useState([])
  const [pageNum, setPageNum] = React.useState(1) 
  const [options,setOptions]=React.useState({})
  const [series,setSeries] = React.useState({})


  const handlePageNum = (event, value) => {
    setPageNum(value);
  };

  const fromTimeChange = (newValue) => {
    setFromTime(dayjs(newValue))
  };
  const toTimeChange = (newValue) => {
      setToTime(dayjs(newValue))
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/timelines");

        //output:{ending_time: '2023-09-11T21:25', starting_time: '2023-09-11T18:51'}
        const { starting_time, ending_time } = response.data;
        console.log(starting_time)
        setFromTime(dayjs(starting_time));
        setToTime(dayjs(ending_time));
        setMinDateTime(dayjs(starting_time))
        setMaxDateTime(dayjs(ending_time))
        
      } catch (error) {
          console.error(error);
      }
      };
  
    fetchData();
  }, []);
  const viewDataClick = () => {
    const a=fromTime
    const b=toTime
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/timepersecond?",{
          params: {
            start_timestamp: a.format("YYYY-MM-DD HH:mm"),
          end_timestamp: b.format("YYYY-MM-DD HH:mm"), 
          },
        });
        
        setPreData(response.data.slice(data.slice((pageNum-1)*50,pageNum*50)));
        console.log(response.data.length);
        const transformedData = [];

        const totalData = response.data
        
        
        let tempTimeData = []
        let tempImgData = []


        for (let i = 0; i < totalData.length; i++) {
          const timestamp = totalData[i].timestamps;
          const img_url = totalData[i].img_url;
          
          tempTimeData.push(timestamp)
          tempImgData.push(img_url)
          delete totalData[i].timestamps;
          delete totalData[i].img_url;
        
          for (let key in totalData[i]) {
            transformedData.push({
              x: timestamp,
              y: key,
              value: totalData[i][key],
              img_url: img_url
            });
          }
        }

        setTimeData(tempTimeData)
        setImgData(tempImgData)
  

    console.log(transformedData);
    console.log("sjwkmd",transformedData.length)
    console.log("ghi",transformedData)
    setData(transformedData)

    let rain = [];
  let people = [];
  let handbags = [];
  let cars = [];
  let buildings = []; //{buildings: '8.85', cars: '37.92', handbags: '0.00', people: '7.42', rain: '0.00'}
  for(let i=0;i<preData.length;i++){
    rain.push(preData[i].rain)
    people.push(preData[i].people)
    handbags.push(preData[i].handbags)
    cars.push(preData[i].cars)
    buildings.push(preData[i].buildings)
  }

  const options1 = {
    xaxis: {
      categories: timeData
    }
  };
  const series1 = [
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
  setOptions(options1)
  setSeries(series1)
  setShowData(false)
      } catch (error) {
          console.error(error);
      }
      };
  
    fetchData();
    fetchData();
  }


  return( 
  <>
  <Grid sx={{justifyContent:"center",alignItems:"center"}}>
      <Grid container sx={{ marginTop: "30px", justifyContent:"center",alignItems:"center" }}>
        <Grid item sx={{ marginRight: "16px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DateTimePicker
                    label="Start Date"
                    value={fromTime}
                    onChange={fromTimeChange}
            
                    minDateTime={minDateTime}
                    maxDateTime={maxDateTime}
            />
          </LocalizationProvider>
          </Grid>
          <Grid item sx={{ marginRight: "16px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                      label="End Date"
                      value={toTime}
                      onChange={toTimeChange}
                      
                      minDateTime={fromTime}
                      maxDateTime={maxDateTime}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={viewDataClick}>View Data</Button>
          </Grid>
      </Grid>
          {/* {!showData&&(
            <>
            <Flex sx={{marginTop:"10px", justifyContent:"center",alignItems:"center", width:"100%"}}>
              <Pagination count={Math.ceil(data.length/100)} page={pageNum} onChange={handlePageNum} showFirstButton showLastButton /> 
            </Flex>
            </>
          )} */}
    </Grid>
          
    {!showData && (<Chart series={series} options={options} type="scatter" />)}  
  </>
  )
  
  
  }



