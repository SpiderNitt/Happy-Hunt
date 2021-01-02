import React from "react";
import { makeStyles, Grid, Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default Notifications;
