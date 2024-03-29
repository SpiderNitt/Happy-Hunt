import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Lock, LockOpen } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Clues from './Clues';
import client from '../api/client';

const useStyles = makeStyles({
  root: {
    marginTop: 5,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function ClueTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [data, setData] = useState([]);
  const fetch = async () => {
    const result = await client.get('api/player/mission')
    if (!result.ok) {
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    console.log(result.data);
    if (result.data.missions.length >= 6) {
      setOpen2(true);
    }
    if (result.data.missions.length >= 9) {
      setOpen3(true);
    }
    setData(result.data.missions);
  }
  useEffect(() => {
    fetch();
  });
  const getSet1 = () => {
    const object = {};
    if (data.length >= 3) {
      object.data = data.slice(0, 3);
    }
    else {
      object.data = [];
    }
    return object;
  }
  const getSet2 = () => {
    const object = {};
    if (data.length >= 6) {
      object.data = data.slice(3, 6);
    }
    else {
      object.data = [];
    }
    return object;
  }
  const getSet3 = () => {
    const object = {};
    if (data.length >= 9) {
      object.data = data.slice(6, 9);
    }
    else {
      object.data = [];
    }
    return object;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        {open1 ? <Tab icon={<LockOpen {...a11yProps(0)} />} /> : <Tab icon={<Lock />} />}
        {open2 ? <Tab icon={<LockOpen {...a11yProps(1)} />} /> : <Tab icon={<Lock />} disabled />}
        {open3 ? <Tab icon={<LockOpen {...a11yProps(2)} />} /> : <Tab icon={<Lock />} disabled />}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Clues data={getSet1()} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Clues data={getSet2()} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Clues data={getSet3()} />
      </TabPanel>
    </Container>
  );
}
