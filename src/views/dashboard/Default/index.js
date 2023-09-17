import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { ChakraProvider, HStack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
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
import Heatmap from "./Heatmap";
import { useClassificationsContext } from '../../../layout/ClassificationsProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { min } from 'd3';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const nCol = 20;
const nRow = 20;

const alphabet = [
  "A",
  "B",
  "C",
  "Df",
  "Edfvfdfsvdfvdvf",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Pwsdc,kmneww,md",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

let data = [];

for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    data.push({
      x: alphabet[x],
      y: alphabet[y],
      value: Math.random() * 40
    });
  }
}

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { selectedClassifications } = useClassificationsContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fromTime, setFromTime] = React.useState(dayjs());
  const [toTime, setToTime] = React.useState(dayjs());
  const [minDateTime, setMinDateTime] = React.useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [maxDateTime, setMaxDateTime] = React.useState(dayjs().format('YYYY-MM-DDTHH:mm'));

  const fromTimeChange = (newValue) => {
    setFromTime(dayjs(newValue, "YYYY-MM-DDTHH:mm"))
};
const toTimeChange = (newValue) => {
    setToTime(dayjs(newValue, "YYYY-MM-DDTHH:mm"))
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.20.10.8:5000/api/timelines");
        console.log(response.data);
    
        // setMinDateTime(response.data.starting_date)
        // setMaxDateTime(response.data.ending_date)
        // console.log("mindatetime",minDateTime)
        // console.log("maxdatetime",maxDateTime)
        // setFromTime(dayjs(response.data.starting_date, "YYYY-MM-DDTHH:mm"))
        // setToTime(dayjs(response.data.ending_date, "YYYY-MM-DDTHH:mm"))

        
      } catch (error) {
          console.error(error);
      }
        setLoading(false);
      };
  
    fetchData();
  }, []);
  const isClassificationSelected = (classification) => {
    return selectedClassifications.includes(classification);
  };



  return (
    <>
    <Grid sx={{justifyContent:"center",alignItems:"center"}}>
    <Typography component="legend">Selected Classifications:</Typography>
        {selectedClassifications.map((classification, index) => (
          <Typography key={index}>{classification}</Typography>
        ))}
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
                            <DateTimePicker
                                    label="End Date"
                                    value={toTime}
                                    onChange={toTimeChange}
                                    
                                    minDateTime={fromTime}
                                    maxDateTime={maxDateTime}
                            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      
    <Flex sx={{justifyContent:"center",alignItems:"center", width:"100%"}}>
      <Heatmap data={data} onOpen={onOpen}/>     
    </Flex>
    
    <ChakraProvider>
    {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
            </Text>
            <Flex justifyContent="center" alignItems="center">
            <Image
              boxSize="550px"
              src="https://thistlesourcing.com/wp-content/uploads/2022/08/automotive-annotation.jpg"
              alt="CC TV frame"
            />
            </Flex>
            <Stack  direction={"col"} spacing={2}>
              <Text mb="1rem">
              <Text fontWeight="bold">Description:</Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text mb="1rem">
              <Text fontWeight="bold">Description:</Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text mb="1rem">
              <Text fontWeight="bold">Description:</Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack spacing={2} direction="row" align="center">
              <Button colorScheme="teal" variant="outline">
                <DownloadIcon />
                Download clip
              </Button>
              <Button colorScheme="teal" variant="outline">
                <RepeatClockIcon />
                Object details
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Add to card
                <ChevronDownIcon />
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
    </Grid>
    </>
  );
};

export default Dashboard;
