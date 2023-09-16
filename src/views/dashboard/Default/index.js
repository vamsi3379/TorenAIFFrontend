import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

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
    </>
  );
};

export default Dashboard;
