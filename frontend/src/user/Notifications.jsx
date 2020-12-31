import React from "react";
<<<<<<< HEAD
import { makeStyles, Grid, Paper, Avatar } from "@material-ui/core";
=======
import { makeStyles, Grid, Avatar, Divider } from "@material-ui/core";
>>>>>>> frontend

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
<<<<<<< HEAD
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    flexDirection: 'column'
  },
=======
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  }
>>>>>>> frontend
}));

let data = [];
for(let i=0; i<10; i++){
  data.push({
    teamName: `team${i+1}`,
    message: 'message'
  })
}

function Notifications(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
<<<<<<< HEAD
      <Grid container spacing={0}>
        {
        data.map((element, i) => (
            <Grid item xs={12} key={i}>  
              <Paper className={classes.paper}>
                <Avatar>{element.teamName[0]}</Avatar>
                <div>
                  <p>{element.teamName}</p>
                  <p>{element.message}</p>
                </div>
              </Paper>
=======
      <Grid container>
        {
        data.map((element, i) => (
            <Grid item xs={12} key={i}>  
              <div className={classes.paper}>
                <Avatar>{element.teamName[0]}</Avatar>
                <div style={{ marginLeft: 15 }}>
                  <p className={classes.teamName}>{element.teamName}</p>
                  <p className={classes.message}>{element.message}</p>
                </div>
              </div>
              <Divider />
>>>>>>> frontend
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default Notifications;
