import React,{useEffect} from "react";
import { makeStyles, Grid, Avatar, Divider } from "@material-ui/core";
import client from '../api/client'

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginLeft: '15%',
    marginRight: '10%',
    marginTop: 70,
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
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

const dummyData=['This is notification 1','This is notification 2'];

function Notifications(props) {
  const classes = useStyles();
  const [notify,setNotify] = React.useState(dummyData);
    useEffect(() => {
       const fetchData = async () => {
          const response= await client.get('api/notifications');
          if(response.data.AdminNotification[0].Notifications.length){
             setNotify(response.data.AdminNotification[0].Notifications.reverse());
          }
          // console.log(response.data.AdminNotification[0].Notifications);
       }
       fetchData();
    },[])
  return (
     <div className={classes.container}>
      <Grid container>
        {
        notify.map((element, i) => (
             
               <Grid item xs={12} key={i}>  
              <div className={classes.paper}>
                <Avatar></Avatar>
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
