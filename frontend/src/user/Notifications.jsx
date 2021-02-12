import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Avatar, Divider } from "@material-ui/core";
import client from "../api/client";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingTop: 10,
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
    // color: theme.palette.text.secondary,
    wordWrap: 'break-word',
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
  const [data,setData] = useState([]);
  const getNotifications = async() => {
    const response = await client.get('/api/notifications');
    if(!response.ok){
      console.log(response);
      console.log(response.status, response.originalError);
      return;
    }
    console.log(response.data.TeamsNotification.Notifications);
    setData(response.data.TeamsNotification.Notifications);
  }

  useEffect(() => {
    getNotifications();
  },[])

  return (
    <div className={classes.container}>
      <Grid container>
        {
        data.map((element, i) => (
            <Grid item xs={12} key={i}>  
              <div className={classes.paper}>
                {/* <Avatar>{element[0]}</Avatar> */}
                <div style={{ marginLeft: 15 }}>
                  <p className={classes.message}>{element}</p>
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
