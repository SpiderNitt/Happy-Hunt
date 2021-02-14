import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Routes from '../utils/routes';
import { Notifications, Timer } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import logo from '../assets/android-chrome-512x512.png';
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    fontWeight: 600,
    textAlign: 'left',
    color: 'white',
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: "#505050",
    border: 0,
   
  },
  button: {
    color:"white",
    fontFamily:"tahoma",
    fontSize: 15,
    padding:20
   
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [show, setShow] = useState(false)
  const [time, setTime] = useState('')
  const [date, setDate] = useState('');



  const timer = async() => {
    const response = await client.get('api/player/event');
    if(!response.ok){
      return;
    }
    setDate(response.data.endTime)
    response.data.eventOn && setShow(true);
  }
  useEffect(() => {
    timer();
  },[])

  var x = setInterval(function () {
    var now = new Date().getTime();
    const countDownDate = new Date(date).getTime();
    var distance = countDownDate - now;
    if (distance < 0) {
      clearInterval(x);
      return "Time Up";
    }
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTime(hours + "h " + minutes + "m " + seconds + "s ");
  }, 1000);

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: '#213B4B', color: 'white' }}>
        <Toolbar>
          <Typography variant="p" className={classes.title} component={Link} href={Routes.HOME}>
          <img src={logo} alt="hhc-logo" width="70" />
          </Typography>
          {show && <p>{time}</p>}
          <Button href={Routes.USER_NOTIFICATION} color="inherit">
            <Notifications />
          </Button>
          <Button href={Routes.USER_PROFILE} color="inherit">
            <AccountCircleIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

