import { useEffect, useState } from 'react';

// material-ui
// import { Grid } from '@mui/material';

import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Heatmap from "./Heatmap";
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

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

  return (
    // add here shellhacks
    <>
      <FormControl component="fieldset">
      <FormLabel component="legend">Labels:</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="People"
          control={<Switch color="primary" />}
          label="People"
          labelPlacement="start"
        />
        <FormControlLabel
          value="Rain"
          control={<Switch color="primary" />}
          label="Rain"
          labelPlacement="start"
        />
        <FormControlLabel
          value="Vehicals"
          control={<Switch color="primary" />}
          label="Vehicals"
          labelPlacement="start"
        />
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Start"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>

    <Heatmap width={700} height={400} data={data} />     
    </>
  );
};

export default Dashboard;
