import React from "react";
import { makeStyles, Grid, Paper, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    flexDirection: 'column'
  },
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
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default Notifications;
