import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import client from '../api/client';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:74,
    flexGrow: 1,
  },
  appbar: {
    backgroundColor:"#F8BA37"
  },
  title: {
    display:"flex",
    justifyContent:"center"
  },
}));

export default function ScoreNav() {
  const classes = useStyles();
  const [score, setScore]= useState("");

  const fetch = async () => {
    const result = await client.get('api/team/score')
    console.log(result.data.score.points);
    setScore(result.data.score.points);

    }
    useEffect(()=>{
        fetch();
    });
    console.log(score)

    return (
        <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.title}>     
          <Typography variant="p" style={{color:"#303030", fontWeight:"lighter", fontFamily:"tahoma", fontSize:22}}>
          My Score :
            <span style={{color:"#303030", fontFamily:"tahoma", fontWeight:"bold", fontSize:23}}>  {score}</span>   
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}