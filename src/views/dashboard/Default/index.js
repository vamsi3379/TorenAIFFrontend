import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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

import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Heatmap from "./Heatmap";
import { useClassificationsContext } from '../../../layout/ClassificationsProvider'; // Import the context
// ==============================|| DEFAULT DASHBOARD ||============================== //

const nCol = 10;
const nRow = 5;

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
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
  "P",
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
  useEffect(() => {
    setLoading(false);
  }, []);
  const isClassificationSelected = (classification) => {
    return selectedClassifications.includes(classification);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();



  return (
    // add here shellhacks
    <>
    <Typography component="legend">Selected Classifications:</Typography>
        {selectedClassifications.map((classification, index) => (
          <Typography key={index}>{classification}</Typography>
        ))}
      

    <Heatmap width={700} height={400} data={data} onOpen={onOpen}/>     
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
    </>
  );
};

export default Dashboard;
