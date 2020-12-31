import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

function Timer(props) {
    const [time, setTime] = useState({
        h:0, m:0 , sec:0
    });
    var updatedSec= time.sec, updatedM= time.m, updatedH= time.h;
    const runTimer=()=>{
    if(updatedM==60){
      updatedH++;
      updatedM=0
    }if(updatedSec==60){
      updatedM++;
      updatedSec=0
    }
    updatedSec++

    return setTime({
      h:updatedH, m:updatedM , sec:updatedSec
    })
  }

  const run=()=>{
    runTimer();
    setInterval(runTimer, 1000)
  }

    const classes = useStyles();
    return (
        <div className={classes.timer}>
            {(time.h)>= 10? time.h:"0" + time.h} : {(time.m)>= 10? time.m:"0" + time.m} : {(time.sec)>= 10? time.sec:"0" + time.sec}
        </div>
    );
}

 {/* <Button variant="contained" color="primary"  onClick={run} style={{margin:5}} >
           start hunt !
          </Button> */}

const useStyles = makeStyles({
    timer: {
     alignSelf:"center"
    },
  });

export default Timer;