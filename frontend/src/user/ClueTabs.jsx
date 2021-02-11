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
import LoadingPage from '../components/LoadingPage';
import AppBar from '@material-ui/core/AppBar';

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
  const [loading, setloading] = useState(true);
  
  const fetch = async () => {
    const result = await client.get('api/player/mission')
    if (!result.ok) {
      console.log(result.originalError, result.problem, result.status);
      return;
    }
    console.log(result.data);
    setloading(false);
    if (result.data.missions.length >= 10) {
      setOpen2(true);
    }
    if (result.data.missions.length >= 15) {
      setOpen3(true);
    }
    setLoading(false);
    setData(result.data.missions);
  }
  useEffect(() => {
    fetch();
  }, []);
  const getSet1 = () => {
    const object = {};
    if (data.length >= 5) {
     const length = (data.length/5);
     object.data=data.slice(0,3);
     object.data.push(data[3*length],data[3*length+1]);
    }
    else {
      object.data = [];
    }
    return object;
  }

  // console.log(getSet1())
  const getSet2 = () => {
    const object = {};
    if (data.length >= 10) {
      const length = (data.length/5);
      object.data=data.slice(3,6);
      object.data.push(data[3*length+2],data[3*length+3]);
    }
    else {
      object.data = [];
    }
    return object;
  }
  const getSet3 = () => {
    const object = {};
    if (data.length >= 15) {
      const length = (data.length/5);
      object.data=data.slice(6,9);
      object.data.push(data[3*length+4],data[3*length+4]);
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
<<<<<<< HEAD
    <Container className={classes.root} maxWidth="md">
=======
    <Container className={classes.root} maxWidth="md" >
>>>>>>> 76577f913dca419399f50128dd25b8253003f323
      {loading ? <LoadingPage />
      : <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        style={{ backgroundColor: "#34495E", borderRadius: 8 }}
      >
        {open1 ? <Tab label="SET 1" {...a11yProps(0)} style={{color:"whitesmoke", fontFamily:"tahoma"}}/> : <Tab label="SET 1" />}
        {open2 ? <Tab label="SET 2" {...a11yProps(1)} style={{color:"whitesmoke", fontFamily:"tahoma"}}/> : <Tab label="SET 2" disabled/>}
        {open3 ? <Tab label="SET 3" {...a11yProps(2)} style={{color:"whitesmoke", fontFamily:"tahoma"}}/> : <Tab label="SET 3" disabled/>}
        
      </Tabs>
      <TabPanel value={value} index={0}>
        {data !== [] && <Clues data={getSet1()} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {data !== [] && <Clues data={getSet2()} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {data !== [] && <Clues data={getSet3()} />}
      </TabPanel>
      </>}
    </Container>
  );
}
